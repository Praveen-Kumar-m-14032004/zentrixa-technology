function Hero({ onOpenReview }) {
    const [typedText, setTypedText] = React.useState('');
    const fullText = "Digital Reality";
    
    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.substring(0, index));
            index++;
            if (index > fullText.length) {
                clearInterval(interval);
            }
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-name="Hero" data-file="components/Hero.js">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a2e_0%,_#050507_100%)]"></div>
                <div className="absolute inset-0 cyber-grid opacity-20 animate-[pulse_4s_infinite]"></div>
                
                {/* Floating glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-float-delayed"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left pt-10 md:pt-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm font-bold tracking-wider backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        STARTUP TN REGISTERED IT COMPANY
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white tracking-tight font-['Space_Grotesk']">
                        Transforming <br className="hidden md:block"/> Ideas into <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                            {typedText}<span className="animate-pulse">|</span>
                        </span>
                    </h1>
                    
                    <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        We design, develop, and deploy high-performance digital innovations tailored for startups and enterprises.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
                        <a href="#contact" className="btn btn-primary group">
                            <span className="relative z-10 flex items-center gap-2">
                                <div className="icon-rocket"></div>
                                Get a Quote
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>
                        <a href="https://f386ocqt4pp7.trickle.host" target="_blank" rel="noopener noreferrer" className="btn btn-outline backdrop-blur-sm bg-black/20">
                            <div className="icon-briefcase"></div>
                            Portfolio
                        </a>
                        <button onClick={onOpenReview} className="btn border border-purple-500 text-purple-400 hover:bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 backdrop-blur-sm bg-black/20">
                            <div className="icon-star"></div>
                            Review Us
                        </button>
                    </div>
                </div>

                <div className="relative hidden md:block h-[500px] perspective-1000">
                    {/* 3D Floating Composition */}
                    <div className="relative w-full h-full animate-float">
                        
                        {/* Center Sphere */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-md border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.2)] animate-pulse-glow"></div>
                        
                        {/* Orbit Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]" style={{transformStyle: 'preserve-3d', transform: 'rotateX(60deg)'}}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" style={{transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateY(45deg)'}}></div>

                        {/* Floating Cards */}
                        <div className="absolute top-20 right-10 glass-card p-4 w-48 animate-[float_4s_ease-in-out_infinite] shadow-xl bg-black/60 border-cyan-500/30">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center">
                                    <div className="icon-code text-cyan-400"></div>
                                </div>
                                <div className="text-sm font-bold text-white">Web Dev</div>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded mb-1.5"></div>
                            <div className="h-1.5 w-2/3 bg-cyan-500/40 rounded"></div>
                        </div>

                        <div className="absolute bottom-20 left-10 glass-card p-4 w-48 animate-[float_5s_ease-in-out_infinite_reverse] shadow-xl bg-black/60 border-purple-500/30">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                                    <div className="icon-smartphone text-purple-400"></div>
                                </div>
                                <div className="text-sm font-bold text-white">App Dev</div>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded mb-1.5"></div>
                            <div className="h-1.5 w-2/3 bg-purple-500/40 rounded"></div>
                        </div>

                        {/* Decorative Icons */}
                        <div className="absolute top-10 left-20 w-12 h-12 glass-card flex items-center justify-center animate-bounce text-yellow-400 shadow-lg border-yellow-500/30">
                            <div className="icon-zap"></div>
                        </div>
                        <div className="absolute bottom-40 right-0 w-12 h-12 glass-card flex items-center justify-center animate-bounce delay-700 text-pink-400 shadow-lg border-pink-500/30">
                            <div className="icon-heart"></div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}