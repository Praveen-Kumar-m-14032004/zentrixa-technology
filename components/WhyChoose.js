function WhyChoose() {
    const reasons = [
        "StartupTN Registered",
        "End-to-End Project Handling",
        "Modern Tech Stack",
        "Scalable Architecture",
        "Dedicated Support",
        "Affordable for Startups"
    ];

    return (
        <section className="section-padding bg-gradient-to-br from-gray-900 to-black relative overflow-hidden" data-name="WhyChoose" data-file="components/WhyChoose.js">
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose <span className="text-cyan-400">Zentrixa?</span></h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        We don't just build websites; we build digital assets that drive growth. Our StartupTN registration guarantees credibility, while our technical expertise ensures scalability.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                                <div className="icon-circle-check text-cyan-400"></div>
                                <span className="font-semibold text-sm">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-white/10 text-center">
                    <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
                    <p className="text-gray-400 mb-6">Get a free consultation for your next big idea.</p>
                    <a href="#contact" className="btn btn-primary w-full md:w-auto inline-flex justify-center">
                        Schedule a Call
                    </a>
                </div>
            </div>
        </section>
    );
}