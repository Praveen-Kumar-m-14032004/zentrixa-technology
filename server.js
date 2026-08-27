/**
 * server.js — Zentrixa Technologies Backend
 * ─────────────────────────────────────────
 * Public website + protected admin dashboard.
 *
 * Public:
 *   POST /api/objects/:type
 *
 * Admin:
 *   /admin-login.html
 *   /admin.html
 *   GET/PUT/DELETE /api/objects/:type...
 *
 * Required environment variables:
 *   MONGO_URI
 *   ADMIN_USERNAME
 *   ADMIN_PASSWORD
 *   SESSION_SECRET
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

// ─── Config ───────────────────────────────────────────────────────────────────
// ─── Config ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const SESSION_SECRET = process.env.SESSION_SECRET;

const SESSION_COOKIE = 'zentrixa_admin_session';

const SESSION_MAX_AGE = 8 * 60 * 60 * 1000; // 8 hours


// ─── Required Environment Variables ──────────────────────────────────────────

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not configured.');
    console.error(
        'Set MONGODB_URI in Azure App Service Environment Variables.'
    );
    process.exit(1);
}

if (!ADMIN_USERNAME) {
    console.error('❌ ADMIN_USERNAME is not configured.');
    process.exit(1);
}

if (!ADMIN_PASSWORD) {
    console.error('❌ ADMIN_PASSWORD is not configured.');
    process.exit(1);
}

if (!SESSION_SECRET) {
    console.error('❌ SESSION_SECRET is not configured.');
    process.exit(1);
}

// ─── Express App ──────────────────────────────────────────────────────────────

const app = express();

app.use(cors());

app.use(express.json());


// ─── Cookie Helpers ───────────────────────────────────────────────────────────

function parseCookies(req) {

    const header = req.headers.cookie || '';

    const cookies = {};

    for (const part of header.split(';')) {

        const index = part.indexOf('=');

        if (index === -1) {
            continue;
        }

        const key = part.slice(0, index).trim();

        const value = part.slice(index + 1).trim();

        try {

            cookies[key] = decodeURIComponent(value);

        } catch {

            cookies[key] = value;

        }
    }

    return cookies;
}


// ─── Create Admin Session ─────────────────────────────────────────────────────

function createSessionToken() {

    const payload = {

        exp: Date.now() + SESSION_MAX_AGE

    };

    const encodedPayload = Buffer
        .from(JSON.stringify(payload))
        .toString('base64url');

    const signature = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(encodedPayload)
        .digest('base64url');

    return `${encodedPayload}.${signature}`;
}


// ─── Validate Admin Session ───────────────────────────────────────────────────

function isValidSession(token) {

    if (!token || !token.includes('.')) {
        return false;
    }

    const [encodedPayload, signature] = token.split('.');

    const expectedSignature = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(encodedPayload)
        .digest('base64url');

    if (signature.length !== expectedSignature.length) {
        return false;
    }

    if (
        !crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        )
    ) {
        return false;
    }

    try {

        const payload = JSON.parse(
            Buffer
                .from(encodedPayload, 'base64url')
                .toString('utf8')
        );

        return (
            Number.isFinite(payload.exp) &&
            payload.exp > Date.now()
        );

    } catch {

        return false;

    }
}


// ─── Set Session Cookie ───────────────────────────────────────────────────────

function setSessionCookie(res) {

    const secure =
        process.env.NODE_ENV === 'production';

    res.setHeader(
        'Set-Cookie',

        `${SESSION_COOKIE}=${encodeURIComponent(
            createSessionToken()
        )}; ` +

        `Max-Age=${SESSION_MAX_AGE / 1000}; ` +

        `Path=/; ` +

        `HttpOnly; ` +

        `SameSite=Lax` +

        `${secure ? '; Secure' : ''}`
    );
}


// ─── Clear Session Cookie ─────────────────────────────────────────────────────

function clearSessionCookie(res) {

    const secure =
        process.env.NODE_ENV === 'production';

    res.setHeader(
        'Set-Cookie',

        `${SESSION_COOKIE}=; ` +

        `Max-Age=0; ` +

        `Path=/; ` +

        `HttpOnly; ` +

        `SameSite=Lax` +

        `${secure ? '; Secure' : ''}`
    );
}


// ─── Admin Authentication Middleware ─────────────────────────────────────────

function requireAdmin(req, res, next) {

    const cookies = parseCookies(req);

    const token = cookies[SESSION_COOKIE];

    if (!isValidSession(token)) {

        // If user directly opens admin.html,
        // redirect them to login page.

        if (req.path === '/admin.html') {

            return res.redirect(
                '/admin-login.html'
            );

        }

        // API requests get 401 instead.

        return res.status(401).json({

            message: 'Authentication required.'

        });
    }

    next();
}


// ─── Admin Login ──────────────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {

    const {
        username,
        password
    } = req.body || {};


    if (
        typeof username !== 'string' ||
        typeof password !== 'string'
    ) {

        return res.status(400).json({

            message:
                'Username and password are required.'

        });
    }


    // Compare username safely

    const usernameMatches =

        username.length ===
            ADMIN_USERNAME.length &&

        crypto.timingSafeEqual(
            Buffer.from(username),
            Buffer.from(ADMIN_USERNAME)
        );


    // Compare password safely

    const passwordMatches =

        password.length ===
            ADMIN_PASSWORD.length &&

        crypto.timingSafeEqual(
            Buffer.from(password),
            Buffer.from(ADMIN_PASSWORD)
        );


    if (!usernameMatches || !passwordMatches) {

        console.warn(
            `[Auth] Failed admin login attempt: ${username}`
        );

        return res.status(401).json({

            message:
                'Invalid username or password.'

        });
    }


    // Login successful

    setSessionCookie(res);


    console.log(
        `[Auth] Admin login successful: ${username}`
    );


    return res.json({

        success: true,

        message:
            'Login successful.'

    });

});


// ─── Check Current Login ──────────────────────────────────────────────────────

app.get('/api/admin/me', (req, res) => {

    const cookies = parseCookies(req);

    const token = cookies[SESSION_COOKIE];


    if (!isValidSession(token)) {

        return res.status(401).json({

            authenticated: false

        });
    }


    return res.json({

        authenticated: true

    });

});


// ─── Admin Logout ─────────────────────────────────────────────────────────────

app.post('/api/admin/logout', (req, res) => {

    clearSessionCookie(res);

    console.log('[Auth] Admin logged out.');

    return res.json({

        success: true

    });

});


// ─── Protected Admin HTML ─────────────────────────────────────────────────────

app.get('/admin.html', requireAdmin, (req, res) => {

    res.sendFile(
        path.join(__dirname, 'admin.html')
    );

});


// ─── Static Website Files ─────────────────────────────────────────────────────
//
// IMPORTANT:
// The /admin.html route above is protected first.
// Other website files remain public.
//

app.use(express.static(__dirname));


// ─── MongoDB Schema ───────────────────────────────────────────────────────────

const objectSchema = new mongoose.Schema(

    {

        type: {

            type: String,

            required: true,

            index: true

        },

        objectData: {

            type:
                mongoose.Schema.Types.Mixed,

            required: true

        }

    },

    {

        timestamps: true

    }

);


const ZentrixaObject =
    mongoose.model(
        'ZentrixaObject',
        objectSchema
    );


// ─── Convert MongoDB Document ─────────────────────────────────────────────────

function docToObject(doc) {

    return {

        objectId: doc._id,

        objectData: doc.objectData,

        createdAt: doc.createdAt

    };

}


// ─── PUBLIC CREATE API ─────────────────────────────────────────────────────────
//
// Website visitors use this endpoint to submit:
//   inquiry
//   client_review
//

app.post(
    '/api/objects/:type',
    async (req, res) => {

        try {

            const { type } = req.params;

            const data = req.body;


            // Only allow these public record types

            if (
                ![
                    'inquiry',
                    'client_review'
                ].includes(type)
            ) {

                return res.status(400).json({

                    message:
                        'Invalid object type.'

                });
            }


            if (
                !data ||
                typeof data !== 'object' ||
                Array.isArray(data)
            ) {

                return res.status(400).json({

                    message:
                        'Body must be a JSON object.'

                });
            }


            const doc =
                await ZentrixaObject.create({

                    type,

                    objectData: data

                });


            // ─── Review Logging ─────────────────────

            if (type === 'client_review') {

                console.log(
                    '\n⭐ New Review received'
                );

                console.log(
                    `   Name    : ${data.Name}`
                );

                console.log(
                    `   Rating  : ${
                        '★'.repeat(
                            data.Rating || 5
                        )
                    }`
                );

                console.log(
                    `   Category: ${data.Category}\n`
                );

            }


            // ─── Inquiry Logging ────────────────────

            if (type === 'inquiry') {

                console.log(
                    '\n📩 New Inquiry received'
                );

                console.log(
                    `   Name    : ${data.Name}`
                );

                console.log(
                    `   Email   : ${data.Email}`
                );

                console.log(
                    `   Service : ${data.Service}`
                );

                console.log(
                    `   Category: ${data.Category}\n`
                );

            }


            return res.status(201).json(
                docToObject(doc)
            );


        } catch (err) {

            console.error(
                '[POST]',
                err.message
            );


            return res.status(500).json({

                message:
                    'Internal server error.'

            });

        }

    }
);


// ─── PROTECTED LIST API ───────────────────────────────────────────────────────

app.get(
    '/api/objects/:type',
    requireAdmin,
    async (req, res) => {

        try {

            const { type } = req.params;


            if (
                ![
                    'inquiry',
                    'client_review'
                ].includes(type)
            ) {

                return res.status(400).json({

                    message:
                        'Invalid object type.'

                });
            }


            const limit =
                Math.min(
                    parseInt(
                        req.query.limit
                    ) || 100,

                    500
                );


            const sort =
                req.query.desc === 'false'
                    ? 1
                    : -1;


            const docs =
                await ZentrixaObject

                    .find({ type })

                    .sort({
                        createdAt: sort
                    })

                    .limit(limit);


            return res.json({

                items:
                    docs.map(
                        docToObject
                    )

            });


        } catch (err) {

            console.error(
                '[GET]',
                err.message
            );


            return res.status(500).json({

                message:
                    'Internal server error.'

            });

        }

    }
);


// ─── PROTECTED UPDATE API ─────────────────────────────────────────────────────

app.put(
    '/api/objects/:type/:id',
    requireAdmin,
    async (req, res) => {

        try {

            const {
                type,
                id
            } = req.params;

            const data = req.body;


            if (
                ![
                    'inquiry',
                    'client_review'
                ].includes(type)
            ) {

                return res.status(400).json({

                    message:
                        'Invalid object type.'

                });
            }


            if (
                !data ||
                typeof data !== 'object' ||
                Array.isArray(data)
            ) {

                return res.status(400).json({

                    message:
                        'Body must be a JSON object.'

                });
            }


            const doc =
                await ZentrixaObject.findOneAndUpdate(

                    {
                        _id: id,

                        type
                    },

                    {
                        $set: {
                            objectData: data
                        }
                    },

                    {
                        new: true
                    }

                );


            if (!doc) {

                return res.status(404).json({

                    message:
                        `Record ${id} not found.`

                });
            }


            console.log(

                `[Admin] Updated ${type} → ${id} | ` +
                `IsHidden: ${data.IsHidden ?? 'n/a'}`

            );


            return res.json(
                docToObject(doc)
            );


        } catch (err) {

            console.error(
                '[PUT]',
                err.message
            );


            return res.status(500).json({

                message:
                    'Internal server error.'

            });

        }

    }
);


// ─── PROTECTED DELETE API ─────────────────────────────────────────────────────

app.delete(
    '/api/objects/:type/:id',
    requireAdmin,
    async (req, res) => {

        try {

            const {
                type,
                id
            } = req.params;


            if (
                ![
                    'inquiry',
                    'client_review'
                ].includes(type)
            ) {

                return res.status(400).json({

                    message:
                        'Invalid object type.'

                });
            }


            const doc =
                await ZentrixaObject.findOneAndDelete({

                    _id: id,

                    type

                });


            if (!doc) {

                return res.status(404).json({

                    message:
                        `Record ${id} not found.`

                });
            }


            console.log(
                `[Admin] Deleted ${type} → ${id}`
            );


            return res.json({

                success: true

            });


        } catch (err) {

            console.error(
                '[DELETE]',
                err.message
            );


            return res.status(500).json({

                message:
                    'Internal server error.'

            });

        }

    }
);


// ─── 404 Handler ──────────────────────────────────────────────────────────────

app.use(
    (req, res) => {

        res.status(404).json({

            message:
                'Route not found.'

        });

    }
);


// ─── MongoDB Connection + Server Start ────────────────────────────────────────

mongoose

    .connect(MONGODB_URI)

    .then(() => {

        console.log(
            '🍃 MongoDB connected successfully.'
        );


        app.listen(
            PORT,
            () => {

                console.log(
                    '\n=============================================='
                );

                console.log(
                    '      Zentrixa Technologies Server'
                );

                console.log(
                    '=============================================='
                );

                console.log(
                    `Port: ${PORT}`
                );

                console.log(
                    'Public website: /index.html'
                );

                console.log(
                    'Admin login:    /admin-login.html'
                );

                console.log(
                    'Admin panel:    /admin.html (protected)'
                );

                console.log(
                    'MongoDB:        connected'
                );

                console.log(
                    '==============================================\n'
                );

                console.log(
                    'Waiting for requests...\n'
                );

            }
        );

    })

    .catch((err) => {

        console.error(
            '❌ MongoDB connection failed:',
            err.message
        );

        process.exit(1);

    });