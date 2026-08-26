function ServiceModal({ service, isOpen, onClose }) {
    if (!isOpen || !service) return null;

    // Determine theme based on service type (Workshop vs Business)
    const isWorkshop = service.isWorkshop;
    const themeColor = isWorkshop ? 'purple' : 'cyan';
    const themeText = isWorkshop ? 'text-purple-400' : 'text-cyan-400';
    const themeBg = isWorkshop ? 'bg-purple-500' : 'bg-cyan-500';
    const themeBorder = isWorkshop ? 'border-purple-500' : 'border-cyan-500';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-name="ServiceModal" data-file="components/ServiceModal.js">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-300" onClick={onClose}></div>
            
            <div className={`relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-[float_0.3s_ease-out] hover:border-${themeColor}-500/30 transition-colors`}>
                
                {/* Decorative Top Line */}
                <div className={`h-1 w-full ${themeBg}`}></div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    aria-label="Close service modal"
                    className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
                >
                    <div className="icon-x text-lg"></div>
                </button>

                <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
                    
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-8">
                        <div className={`w-20 h-20 rounded-2xl ${themeBg}/10 flex items-center justify-center shrink-0 border border-${themeColor}-500/20`}>
                            <div className={`icon-${service.icon} text-4xl ${themeText}`}></div>
                        </div>
                        <div>
                            <div className={`inline-block px-3 py-1 rounded-full ${themeBg}/10 border border-${themeColor}-500/20 text-[10px] font-bold uppercase tracking-widest ${themeText} mb-3`}>
                                {isWorkshop ? 'Workshop Module' : 'Professional Service'}
                            </div>
                            <h2 className="text-3xl font-bold text-white leading-tight font-['Outfit']">{service.title}</h2>
                            <div className="mt-2 text-gray-400 text-sm font-medium flex items-center gap-2">
                                <span className="opacity-50">Model:</span>
                                <span className="text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">{service.model || 'Standard Engagement'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 font-['Plus_Jakarta_Sans']">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${themeBg}`}></div>
                                Overview
                            </h4>
                            <p className="text-gray-200 text-lg leading-relaxed font-light">
                                {service.desc}
                            </p>
                        </div>

                        {service.expandedDesc && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Engagement Details</h4>
                                <p className="text-gray-400 leading-relaxed text-base border-l-2 border-white/10 pl-4">
                                    {service.expandedDesc}
                                </p>
                            </div>
                        )}

                        {service.features && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Key Features</h4>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className={`icon-check ${themeText} text-sm shrink-0`}></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
                        <a 
                            href="#contact" 
                            onClick={onClose}
                            className={`btn ${isWorkshop ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'btn-primary'} shadow-lg w-full md:w-auto`}
                        >
                            <div className="icon-calendar-check"></div>
                            {isWorkshop ? 'Book This Workshop' : 'Request Service'}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}