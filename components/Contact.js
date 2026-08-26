function Contact() {
    const [category, setCategory] = React.useState('Project'); // 'Project' or 'Workshop'
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        service: '',
        message: '',
        duration: 'Half Day'
    });
    const [attachments, setAttachments] = React.useState([]);
    const [voiceBlob, setVoiceBlob] = React.useState(null);
    const [voiceUrl, setVoiceUrl]   = React.useState(null); // object URL for download
    const [status, setStatus] = React.useState('idle'); // idle, loading, success, error
    const fileInputRef = React.useRef(null);

    // Initialize default service when category changes
    React.useEffect(() => {
        setFormData(prev => ({
            ...prev,
            service: category === 'Project' ? 'Web Development' : 'Web Development Workshop'
        }));
    }, [category]);

    // Clean up object URLs to avoid memory leaks
    React.useEffect(() => {
        return () => {
            attachments.forEach(file => {
                if (file.preview) URL.revokeObjectURL(file.preview);
            });
            if (voiceUrl) URL.revokeObjectURL(voiceUrl);
        };
    }, [attachments, voiceUrl]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileSelect = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map(file => ({
                file,
                name: file.name,
                type: file.type,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
            }));
            setAttachments(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index) => {
        setAttachments(prev => {
            const newFiles = [...prev];
            if (newFiles[index].preview) URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleVoiceRecording = (blob) => {
        if (voiceUrl) URL.revokeObjectURL(voiceUrl); // clean up previous
        const url = URL.createObjectURL(blob);
        setVoiceBlob(blob);
        setVoiceUrl(url);
    };

    // ── Download voice note so user can manually attach it in WhatsApp ──
    const downloadVoiceNote = () => {
        if (!voiceUrl) return;
        const a = document.createElement('a');
        a.href = voiceUrl;
        a.download = 'voice-note.webm';
        a.click();
    };

    // ── Build a clean WhatsApp message (no raw emoji, safe ASCII icons) ──
    const buildWhatsAppText = () => {
        const line = '-----------------------------';
        let text = `*New ${category} Inquiry*\n${line}\n`;
        text += `*Name:* ${formData.name}\n`;
        text += `*Email:* ${formData.email}\n`;
        text += `*Service:* ${formData.service}\n`;

        if (category === 'Workshop') {
            text += `*Duration:* ${formData.duration}\n`;
        }

        text += `\n*Message:*\n${formData.message}\n`;

        if (attachments.length > 0) {
            text += `\n*Files to attach (${attachments.length}):*\n`;
            attachments.forEach((a, i) => {
                const kind = a.type.startsWith('image/')
                    ? 'Image'
                    : a.type.startsWith('video/')
                    ? 'Video'
                    : 'Document';
                text += `${i + 1}. ${a.name} [${kind}]\n`;
            });
            text += `_Please send the above file(s) in this chat._\n`;
        }

        if (voiceBlob) {
            text += `\n*Voice Note:* 1 recording saved to your Downloads folder.\n`;
            text += `_Please attach the file "voice-note.webm" in this chat._\n`;
        }

        return text;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields.');
            }

            // Build attachment summary for DB
            const attachmentParts = [];
            if (attachments.length > 0) {
                attachmentParts.push(`Files: ${attachments.map(a => a.name).join(', ')}`);
            }
            if (voiceBlob) attachmentParts.push('Voice Note: Included');
            const attachmentString = attachmentParts.join(' | ');

            // Save inquiry to server (MongoDB via server.js)
            const payload = {
                Name:           formData.name,
                Email:          formData.email,
                Category:       category,
                Service:        formData.service,
                Message:        formData.message,
                Date:           new Date().toISOString(),
                AttachmentInfo: attachmentString
            };
            if (category === 'Workshop') payload.Duration = formData.duration;

            await trickleCreateObject('inquiry', payload);

            // If there's a voice note, download it first so the user can attach it
            if (voiceBlob) downloadVoiceNote();

            // Open WhatsApp with clean, properly encoded message
            const whatsappNumber = '918667344881';
            const text  = buildWhatsAppText();
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                service: category === 'Project' ? 'Web Development' : 'Web Development Workshop',
                message: '',
                duration: 'Half Day'
            });
            setAttachments([]);
            setVoiceBlob(null);
            setVoiceUrl(null);
            setTimeout(() => setStatus('idle'), 6000);

        } catch (error) {
            console.error('Contact submit error:', error);
            setStatus('error');
        }
    };

    const projectServices = [
        'Web Development',
        'Mobile App Development',
        'Cloud & AWS Setup',
        'Networking Solutions',
        'UI/UX Design',
        'Game Development',
        '3D Art & Visualization',
        'VFX & Motion Graphics',
        'IT Support'
    ];

    const workshopTopics = [
        'Web Development Workshop',
        'AWS Cloud Bootcamp',
        'Networking & Cisco Packet Tracer',
        'Aptitude & Skill Development',
        'OS Installation & Troubleshooting',
        'Cybersecurity Basics',
        'Mobile App Bootcamp'
    ];

    return (
        <section id="contact" className="section-padding relative" data-name="Contact" data-file="components/Contact.js">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Get in <span className="text-cyan-400">Touch</span></h2>
                        <p className="text-gray-400 mb-8">Whether you need a digital solution for your business or training for your students, we are here to help.</p>
                        
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                    <div className="icon-map-pin text-cyan-400"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold">Location</h4>
                                    <p className="text-gray-400">India</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                    <div className="icon-mail text-cyan-400"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-gray-400 break-all">contact.zentrixa@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                    <div className="icon-phone text-cyan-400"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone / WhatsApp</h4>
                                    <div className="text-gray-400 flex flex-col gap-1">
                                        <a href="tel:+919384164588" className="hover:text-cyan-400 transition-colors">+91 93841 64588</a>
                                        <a href="tel:+918667344881" className="hover:text-cyan-400 transition-colors">+91 86673 44881</a>
                                        <a href="tel:+919080239903" className="hover:text-cyan-400 transition-colors">+91 90802 39903</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                    <div className="icon-instagram text-cyan-400"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold">Instagram</h4>
                                    <a href="https://instagram.com/zentrixa.digital" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                        @zentrixa.digital
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-1">
                        {/* Tab Switcher */}
                        <div className="flex mb-6 bg-black/40 rounded-t-xl p-1">
                            <button 
                                onClick={() => setCategory('Project')}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${category === 'Project' ? 'bg-cyan-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Project Inquiry
                            </button>
                            <button 
                                onClick={() => setCategory('Workshop')}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${category === 'Workshop' ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
                            >
                                Workshop Booking
                            </button>
                        </div>

                        <form className="space-y-6 p-7 pt-2" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" 
                                        placeholder="Your Name" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" 
                                        placeholder="your@email.com" 
                                    />
                                </div>
                            </div>
                            
                            <div className={category === 'Workshop' ? 'grid md:grid-cols-2 gap-6' : ''}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        {category === 'Project' ? 'Service Interested In' : 'Workshop / Bootcamp Topic'}
                                    </label>
                                    <select 
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-colors ${category === 'Workshop' ? 'focus:border-purple-500' : 'focus:border-cyan-500'}`}
                                    >
                                        {(category === 'Project' ? projectServices : workshopTopics).map(svc => (
                                            <option key={svc} value={svc}>{svc}</option>
                                        ))}
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {category === 'Workshop' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
                                        <select 
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                        >
                                            <option value="Half Day">Half Day</option>
                                            <option value="1 Day">1 Day</option>
                                            <option value="2 Days">2 Days</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white h-32 focus:outline-none transition-colors resize-none ${category === 'Workshop' ? 'focus:border-purple-500' : 'focus:border-cyan-500'}`}
                                    placeholder={category === 'Project' ? 'Tell us about your project requirements...' : 'Tell us about your college, student count, and expected dates...'}
                                ></textarea>
                            </div>

                            {/* Media Attachments Section */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex flex-col gap-2">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                                        Attachments
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${category === 'Workshop' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>Max 5</span>
                                    </div>

                                    {/* ── How attachments work notice ── */}
                                    <p className="text-[11px] text-gray-500 leading-relaxed">
                                        Images and documents will be <span className="text-gray-300 font-semibold">listed in your WhatsApp message</span> — attach them manually in the chat after it opens.
                                        Voice notes are <span className="text-gray-300 font-semibold">downloaded to your device</span> automatically so you can send the file in WhatsApp.
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        {/* File Upload Button */}
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className={`group flex flex-col items-center justify-center w-24 h-24 bg-white/5 border border-dashed border-white/20 rounded-xl transition-all ${category === 'Workshop' ? 'hover:border-purple-500 hover:bg-purple-500/5' : 'hover:border-cyan-500 hover:bg-cyan-500/5'}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1 transition-colors ${category === 'Workshop' ? 'group-hover:bg-purple-500/20' : 'group-hover:bg-cyan-500/20'}`}>
                                                <div className={`icon-plus text-gray-400 ${category === 'Workshop' ? 'group-hover:text-purple-400' : 'group-hover:text-cyan-400'}`}></div>
                                            </div>
                                            <span className={`text-[10px] text-gray-400 ${category === 'Workshop' ? 'group-hover:text-purple-300' : 'group-hover:text-cyan-300'}`}>Add File</span>
                                        </button>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileSelect} 
                                            multiple 
                                            className="hidden" 
                                            accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        />

                                        {/* Voice Recorder */}
                                        <div className="flex-1 min-w-[200px]">
                                            <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
                                        </div>
                                    </div>
                                </div>

                                {/* Voice note download hint */}
                                {voiceBlob && (
                                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="icon-mic text-green-400 shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-green-400 font-semibold">Voice note recorded</p>
                                            <p className="text-[10px] text-gray-400">It will download as <span className="text-white">voice-note.webm</span> when you submit. Attach it in WhatsApp.</p>
                                        </div>
                                        <button type="button" onClick={downloadVoiceNote} className="text-[10px] text-green-400 underline shrink-0">Save now</button>
                                    </div>
                                )}

                                {/* File Preview Grid */}
                                {attachments.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                        {attachments.map((item, idx) => (
                                            <div key={idx} className="relative group bg-black/40 border border-white/10 rounded-lg p-2 flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                                                    {item.preview ? (
                                                        <img src={item.preview} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className={`icon-${item.type.includes('video') ? 'video' : 'file-text'} text-gray-400`}></div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-gray-300 truncate">{item.name}</p>
                                                    <p className="text-[10px] text-gray-500 truncate uppercase">{item.type.split('/')[1] || 'FILE'}</p>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeFile(idx)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500/10 rounded-full text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                                >
                                                    <div className="icon-x w-3 h-3"></div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className={`btn w-full mt-4 ${category === 'Project' ? 'btn-primary' : 'bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'} ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <div className="icon-message-circle"></div>
                                        {category === 'Project' ? 'Send via WhatsApp' : 'Book via WhatsApp'}
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-left">
                                    <div className="flex items-center gap-2 mb-1 text-green-400 font-bold">
                                        <div className="icon-circle-check"></div>
                                        <span>WhatsApp opened!</span>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Your inquiry details are pre-filled in WhatsApp.
                                        {attachments.length > 0 && (
                                            <><br /><span className="text-white font-semibold">Attach your {attachments.length} file(s) in the WhatsApp chat to complete your request.</span></>
                                        )}
                                        {voiceBlob && (
                                            <><br /><span className="text-white font-semibold">Your voice note was saved — attach "voice-note.webm" in the chat too.</span></>
                                        )}
                                    </p>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center text-sm">
                                    Failed to submit. Please ensure server.js is running on port 3000.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}