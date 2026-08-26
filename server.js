/**
 * server.js — Zentrixa Technologies Backend
 * ─────────────────────────────────────────
 * MongoDB + Express backend that serves:
 *   • index.html  (public website)  → http://localhost:3000
 *   • admin.html  (review admin)    → http://localhost:3000/admin.html
 *
 * API routes:
 *   POST   /api/objects/:type          → create a record
 *   GET    /api/objects/:type          → list records
 *   PUT    /api/objects/:type/:id      → update a record
 *   DELETE /api/objects/:type/:id      → delete a record
 *
 * Types used: inquiry | client_review
 */

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────
const PORT      = process.env.PORT      || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zentrixa';

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));   // serves all HTML/JS/CSS files

// ─── Schema ───────────────────────────────────────────────────────────────────
const objectSchema = new mongoose.Schema(
    {
        type:       { type: String, required: true, index: true },
        objectData: { type: mongoose.Schema.Types.Mixed, required: true }
    },
    { timestamps: true }
);

const ZentrixaObject = mongoose.model('ZentrixaObject', objectSchema);

// ─── Helper ───────────────────────────────────────────────────────────────────
function docToObject(doc) {
    return {
        objectId:   doc._id,
        objectData: doc.objectData,
        createdAt:  doc.createdAt
    };
}

// ─── API Routes ───────────────────────────────────────────────────────────────

/** CREATE — POST /api/objects/:type */
app.post('/api/objects/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const data = req.body;

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return res.status(400).json({ message: 'Body must be a JSON object.' });
        }

        const doc = await ZentrixaObject.create({ type, objectData: data });

        // ── Live console feedback ──────────────────────────────────────────
        if (type === 'client_review') {
            console.log(`\n⭐  New Review received`);
            console.log(`   Name    : ${data.Name}`);
            console.log(`   Rating  : ${'★'.repeat(data.Rating || 5)}`);
            console.log(`   Category: ${data.Category}`);
            console.log(`   → visible in Admin panel at http://localhost:${PORT}/admin.html\n`);
        } else if (type === 'inquiry') {
            console.log(`\n📩  New Inquiry received`);
            console.log(`   Name    : ${data.Name}`);
            console.log(`   Email   : ${data.Email}`);
            console.log(`   Service : ${data.Service}`);
            console.log(`   Category: ${data.Category}\n`);
        }

        return res.status(201).json(docToObject(doc));
    } catch (err) {
        console.error('[POST]', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

/** LIST — GET /api/objects/:type?limit=100&desc=true */
app.get('/api/objects/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const limit    = Math.min(parseInt(req.query.limit) || 100, 500);
        const sort     = req.query.desc === 'false' ? 1 : -1;

        const docs = await ZentrixaObject
            .find({ type })
            .sort({ createdAt: sort })
            .limit(limit);

        return res.json({ items: docs.map(docToObject) });
    } catch (err) {
        console.error('[GET]', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

/** UPDATE — PUT /api/objects/:type/:id */
app.put('/api/objects/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
        const data = req.body;

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return res.status(400).json({ message: 'Body must be a JSON object.' });
        }

        const doc = await ZentrixaObject.findOneAndUpdate(
            { _id: id, type },
            { $set: { objectData: data } },
            { new: true }
        );

        if (!doc) {
            return res.status(404).json({ message: `Record ${id} not found.` });
        }

        console.log(`[Admin] Updated ${type} → ${id} | IsHidden: ${data.IsHidden ?? 'n/a'}`);
        return res.json(docToObject(doc));
    } catch (err) {
        console.error('[PUT]', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

/** DELETE — DELETE /api/objects/:type/:id */
app.delete('/api/objects/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;

        const doc = await ZentrixaObject.findOneAndDelete({ _id: id, type });

        if (!doc) {
            return res.status(404).json({ message: `Record ${id} not found.` });
        }

        console.log(`[Admin] Deleted ${type} → ${id}`);
        return res.json({ success: true });
    } catch (err) {
        console.error('[DELETE]', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

// ─── Connect & Start ──────────────────────────────────────────────────────────
mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('\n╔══════════════════════════════════════════════╗');
            console.log('║       Zentrixa Technologies — Server         ║');
            console.log('╠══════════════════════════════════════════════╣');
            console.log(`║  ✅ Zentrixa server running                  ║`);
            console.log(`║     http://localhost:${PORT}                    ║`);
            console.log('║                                              ║');
            console.log(`║  🌐 Public Website                           ║`);
            console.log(`║     http://localhost:${PORT}/index.html         ║`);
            console.log('║                                              ║');
            console.log(`║  🔐 Admin Server running                     ║`);
            console.log(`║     http://localhost:${PORT}/admin.html         ║`);
            console.log('║                                              ║');
            console.log(`║  🍃 MongoDB connected                        ║`);
            console.log(`║     ${MONGO_URI.padEnd(42)}║`);
            console.log('╚══════════════════════════════════════════════╝\n');
            console.log('Waiting for requests...\n');
        });
    })
    .catch((err) => {
        console.error('❌  MongoDB connection failed:', err.message);
        console.error('    Make sure MongoDB is running: mongod');
        process.exit(1);
    });