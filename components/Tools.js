function Tools() {
    const tools = [
        { name: "Java", category: "Backend" },
        { name: "Python", category: "Language" },
        { name: "HTML", category: "Frontend" },
        { name: "CSS", category: "Frontend" },
        { name: "JavaScript", category: "Language" },
        { name: "React", category: "Framework" },
        { name: "Node.js", category: "Backend" },
        { name: "MySQL", category: "Database" },
        { name: "AWS", category: "Cloud" },
        { name: "Android Studio", category: "Mobile" },
        { name: "Figma", category: "Design" },
        { name: "Blender", category: "3D" },
        { name: "Maya", category: "3D" }
    ];

    return (
        <section className="section-padding bg-black/30 border-y border-white/5 relative" data-name="Tools" data-file="components/Tools.js">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">Technologies <span className="text-cyan-400">We Use</span></h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {tools.map((tool, idx) => (
                        <div key={idx} className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-2">
                            {/* Dot indicator for category */}
                            <div className={`w-1.5 h-1.5 rounded-full ${
                                tool.category === 'Frontend' ? 'bg-blue-400' :
                                tool.category === 'Backend' ? 'bg-green-400' :
                                tool.category === 'Database' ? 'bg-yellow-400' :
                                tool.category === 'Cloud' ? 'bg-orange-400' :
                                tool.category === 'Mobile' ? 'bg-purple-400' :
                                tool.category === 'Design' ? 'bg-pink-400' :
                                tool.category === '3D' ? 'bg-red-400' :
                                'bg-gray-400'
                            }`}></div>
                            <span className="font-semibold text-gray-300 group-hover:text-white">{tool.name}</span>
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-lg bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}