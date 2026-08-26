function About() {
    const founders = [
        {
            name: "RAKESH S",
            role: "Founder & Visionary",
            desc: "Driving the strategic direction and innovation culture at Zentrixa.",
            color: "cyan",
            icon: "brain-circuit"
        },
        {
            name: "SRIVISHNU SR",
            role: "Co-Founder & Tech Lead",
            desc: "Architecting scalable digital solutions and technical excellence.",
            color: "purple",
            icon: "code"
        }
    ];

    return (
        <section id="about" className="section-padding relative overflow-hidden" data-name="About" data-file="components/About.js">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#050507]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[600px] bg-gradient-to-tr from-cyan-900/10 to-purple-900/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Who We Are</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
                        Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Future</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Zentrixa is a <span className="text-cyan-400 font-semibold">StartupTN Registered</span> IT company bridging the gap between complex problems and elegant digital solutions.
                    </p>
                </div>

                {/* Main Partition Layout */}
                <div className="grid lg:grid-cols-12 gap-6">
                    
                    {/* Left Partition: Company Stats & Vision */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Vision Card */}
                        <div className="bg-[#0f0f16]/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <div className="icon-globe text-9xl text-white"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                            <p className="text-gray-400 leading-relaxed relative z-10">
                                We exist at the intersection of creativity and technology. We don't just build software; we architect digital ecosystems. From robust enterprise platforms to immersive mobile experiences, our mission is to translate complex business challenges into scalable technological solutions.
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-[#0f0f16]/80 backdrop-blur-sm border border-white/5 p-6 rounded-2xl flex items-center gap-4 group hover:border-cyan-500/30 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                    <div className="icon-rocket text-2xl"></div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white font-['Space_Grotesk']">100%</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Success Rate</div>
                                </div>
                            </div>
                            <div className="bg-[#0f0f16]/80 backdrop-blur-sm border border-white/5 p-6 rounded-2xl flex items-center gap-4 group hover:border-purple-500/30 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                    <div className="icon-users text-2xl"></div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white font-['Space_Grotesk']">50+</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Happy Clients</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Partition: Leadership / Individuals */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-gradient-to-b from-[#151520] to-[#0f0f16] border border-white/10 rounded-2xl p-1 h-full">
                            <div className="h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 absolute inset-0 pointer-events-none"></div>
                            
                            <div className="p-6 pb-2">
                                <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2">
                                    <div className="icon-crown text-yellow-500"></div>
                                    Leadership
                                </h3>
                            </div>

                            <div className="space-y-2 p-2">
                                {founders.map((founder, idx) => (
                                    <div key={idx} className="relative group overflow-hidden p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300">
                                        <div className={`absolute top-0 left-0 w-1 h-full bg-${founder.color}-500 transition-all duration-300 group-hover:h-full h-0`}></div>
                                        
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full bg-${founder.color}-500/10 flex items-center justify-center shrink-0 border border-${founder.color}-500/20 group-hover:border-${founder.color}-500/50 transition-colors`}>
                                                <div className={`icon-${founder.icon} text-${founder.color}-400 text-xl`}></div>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{founder.name}</h4>
                                                <p className={`text-xs font-bold text-${founder.color}-400 mb-1 uppercase tracking-wide`}>{founder.role}</p>
                                                <p className="text-sm text-gray-400 leading-snug">{founder.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-6 mt-auto">
                                <div className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20 text-center">
                                    <p className="text-sm text-cyan-200 italic">"Technology is best when it brings people together."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}