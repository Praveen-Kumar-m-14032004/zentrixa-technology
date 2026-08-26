function ProjectDetailModal({ project, isOpen, onClose }) {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" data-name="ProjectDetailModal" data-file="components/ProjectDetailModal.js">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
            
            <div className="relative w-full max-w-5xl bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-[float_0.3s_ease-out]">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    aria-label="Close project details"
                    className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                >
                    <div className="icon-x text-xl"></div>
                </button>

                {/* Hero Section */}
                <div className="relative h-64 md:h-96 shrink-0 group">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <div className="flex flex-wrap gap-3 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 backdrop-blur-md uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white font-['Space_Grotesk'] leading-tight mb-2">{project.title}</h2>
                        <p className="text-xl text-gray-400 max-w-2xl font-light">{project.desc}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0f]">
                    <div className="p-8 md:p-12 grid md:grid-cols-12 gap-12">
                        
                        {/* Main Narrative (Left) */}
                        <div className="md:col-span-8 space-y-12">
                            {/* Challenge */}
                            <div className="relative pl-6 border-l-2 border-white/10">
                                <h3 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">The Challenge</h3>
                                <p className="text-gray-300 leading-relaxed text-lg font-light">
                                    {project.details?.challenge}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="relative pl-6 border-l-2 border-cyan-500">
                                <h3 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">Our Solution</h3>
                                <p className="text-gray-300 leading-relaxed text-lg font-light">
                                    {project.details?.solution}
                                </p>
                            </div>

                            {/* Impact / Results */}
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk']">Business Impact</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {(project.details?.results || []).map((res, i) => (
                                        <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start gap-3 hover:bg-white/10 transition-colors">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                                <div className="icon-check text-green-500 text-xs"></div>
                                            </div>
                                            <span className="text-gray-300 font-medium">{res}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Right) */}
                        <div className="md:col-span-4 space-y-10">
                            
                            {/* Technologies */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {(project.details?.stack || []).map(tech => (
                                        <div key={tech} className="px-4 py-2 bg-[#151520] rounded-lg text-sm text-gray-300 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default">
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Box */}
                            <div className="bg-gradient-to-b from-[#151520] to-[#0f0f16] p-6 rounded-2xl border border-white/5 text-center">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <div className="icon-sparkles text-cyan-400"></div>
                                </div>
                                <h4 className="font-bold text-white mb-2">Inspired by this project?</h4>
                                <p className="text-sm text-gray-400 mb-6">Let's discuss how we can build something similar for you.</p>
                                <a href="#contact" onClick={onClose} className="btn btn-primary w-full py-3 text-sm">
                                    Start Your Project
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}