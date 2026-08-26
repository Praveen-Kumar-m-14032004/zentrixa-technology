function Process() {
    const steps = [
        { num: '01', title: 'Analysis', desc: 'Understanding your requirements', icon: 'search' },
        { num: '02', title: 'Design', desc: 'Creating intuitive UI/UX', icon: 'pen-tool' },
        { num: '03', title: 'Develop', desc: 'Writing clean, scalable code', icon: 'code' },
        { num: '04', title: 'Deploy', desc: 'Launching to the world', icon: 'rocket' },
        { num: '05', title: 'Support', desc: 'Ensuring 24/7 reliability', icon: 'headset' },
    ];

    return (
        <section id="process" className="section-padding bg-black/40 relative overflow-hidden" data-name="Process" data-file="components/Process.js">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-2 block">How We Work</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="heading-gradient">Process</span></h2>
                    <p className="text-gray-400">A systematic approach to delivering excellence.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-900 to-transparent"></div>
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-cyan-500/50 blur-[2px]"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                                {/* Number Badge */}
                                <div className="w-20 h-20 rounded-full bg-[#050507] border-4 border-[#0f0f16] group-hover:border-cyan-500 flex items-center justify-center mb-6 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] relative z-10 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                                    <div className={`icon-${step.icon} text-2xl text-gray-500 group-hover:text-cyan-400 transition-colors duration-300`}></div>
                                </div>
                                
                                {/* Card Content */}
                                <div className="bg-white/5 border border-white/5 p-6 rounded-xl w-full hover:bg-white/10 transition-colors duration-300 group-hover:-translate-y-2">
                                    <div className="text-4xl font-bold text-white/5 absolute -top-4 left-1/2 -translate-x-1/2 select-none group-hover:text-cyan-500/10 transition-colors">{step.num}</div>
                                    <h3 className="font-bold text-lg mb-2 text-white">{step.title}</h3>
                                    <p className="text-xs text-gray-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}