function Portfolio() {
    const [filter, setFilter] = React.useState('All');
    const [selectedProject, setSelectedProject] = React.useState(null);

    const projects = [
        {
            title: "Cisco Networking Topology",
            category: "Web",
            tags: ["Networking", "Cisco Packet Tracer"],
            image: "https://app.trickle.so/storage/public/images/usr_1c182d1b28000001/a476587a-39c5-43b4-ae88-f2aa7dc28108.jpeg",
            desc: "Enterprise-grade network infrastructure simulation ensuring redundant connectivity.",
            details: {
                challenge: "Designing a fault-tolerant network for a multi-branch enterprise with strict security policies and bandwidth requirements.",
                solution: "Implemented OSPF multi-area architecture with VLAN segmentation and ACLs to isolate departmental traffic.",
                results: ["99.99% simulated uptime", "Optimized routing paths", "Enhanced security via port security"],
                stack: ["Cisco Packet Tracer", "IPv4/IPv6", "OSPF", "VLANs", "ACL"],
                client: "Technical Institute",
                duration: "2 Weeks"
            }
        },
        {
            title: "DevOps Database Automation",
            category: "App",
            tags: ["DevOps", "Automation"],
            image: "https://app.trickle.so/storage/public/images/usr_1c182d1b28000001/87c0c6e4-af84-45e0-9c47-ac2a580cd48c.jpeg",
            desc: "Automated database provisioning pipeline reducing deployment time by 60%.",
            details: {
                challenge: "Manual database deployments were error-prone and time-consuming, leading to production delays.",
                solution: "Created a CI/CD pipeline using Jenkins and Ansible to automate schema migrations and backups.",
                results: ["Zero manual errors", "Deployment time cut by 60%", "Automated rollback capabilities"],
                stack: ["Jenkins", "Docker", "MySQL", "Ansible", "Linux"],
                client: "SaaS Startup",
                duration: "3 Weeks"
            }
        },
        {
            title: "Aora Bakes Brand Identity",
            category: "Web",
            tags: ["Web Design", "Branding"],
            image: "https://app.trickle.so/storage/public/images/usr_1c182d1b28000001/41fc412f-d3a0-4dd6-b4fb-49f14baae792.jpeg",
            desc: "Premium digital storefront for a boutique bakery with custom order management.",
            details: {
                challenge: "The client needed a visually appetizing website that could handle custom cake orders and showcase their portfolio.",
                solution: "Designed a minimal, image-first UI with a custom form builder for complex cake customization requests.",
                results: ["40% increase in online inquiries", "Brand visibility boost", "Mobile-first responsive design"],
                stack: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
                client: "Aora Bakes",
                duration: "4 Weeks"
            }
        },
        {
            title: "AWS Cloud Architecture",
            category: "Web",
            tags: ["AWS", "Cloud Computing"],
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Scalable 3-tier web architecture designed for high availability and fault tolerance.",
            details: {
                challenge: "Migrating a legacy monolithic application to a scalable cloud environment without downtime.",
                solution: "Architected a 3-tier VPC setup with Auto Scaling Groups, Application Load Balancers, and RDS Multi-AZ.",
                results: ["Auto-scaling based on traffic", "High availability across zones", "Enhanced security groups"],
                stack: ["AWS EC2", "VPC", "RDS", "Route53", "S3"],
                client: "FinTech Corp",
                duration: "5 Weeks"
            }
        },
        {
            title: "Alumni Connect App",
            category: "App",
            tags: ["Mobile App", "Social"],
            image: "https://app.trickle.so/storage/public/images/usr_1c182d1b28000001/9f7c392a-172b-40bd-80e0-45cdb177254e.jpeg",
            desc: "Cross-platform mobile application for managing university alumni networks.",
            details: {
                challenge: "University needed a centralized platform to connect 10,000+ alumni, track careers, and manage events.",
                solution: "Developed a React Native app with real-time chat, event ticketing, and a searchable alumni directory.",
                results: ["5,000+ active users in month 1", "Seamless event registration", "Real-time networking"],
                stack: ["React Native", "Firebase", "Node.js", "Express"],
                client: "State University",
                duration: "8 Weeks"
            }
        },
        {
            title: "Hyper-Realistic 3D Render",
            category: "3D",
            tags: ["3D Modeling", "Product Design"],
            image: "https://app.trickle.so/storage/public/images/usr_1c182d1b28000001/d8bb1088-9011-4549-b856-0c86be30beaa.jpeg",
            desc: "Photorealistic product visualization for a next-gen consumer electronics brand.",
            details: {
                challenge: "Creating marketing assets for a product that hadn't been manufactured yet.",
                solution: "Modeled high-fidelity 3D assets in Blender with physically based rendering (PBR) textures.",
                results: ["Used in national ad campaign", "Reduced photography costs", "Ultra-realistic lighting"],
                stack: ["Blender", "Cycles Render", "Adobe Photoshop"],
                client: "Tech Gadgets Inc",
                duration: "1 Week"
            }
        }
    ];

    const categories = ['All', 'Web', 'App', '3D'];

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.category === filter || (filter === 'Web' && p.category === 'Web') || (filter === 'App' && p.category === 'App'));

    return (
        <section id="portfolio" className="section-padding bg-black/20" data-name="Portfolio" data-file="components/Portfolio.js">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-2 block">Our Work</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="heading-gradient">Projects</span></h2>
                        <p className="text-gray-400 max-w-lg">
                            We don't just write code; we solve problems. Explore how we've helped our partners achieve their digital goals.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wide border ${
                                    filter === cat 
                                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredProjects.map((project, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedProject(project)}
                            className="group relative rounded-2xl overflow-hidden bg-[#0f0f16] border border-white/5 aspect-[4/3] cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Image Background */}
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300"></div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex gap-2 mb-3">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 backdrop-blur-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 group-hover:text-gray-300">
                                        {project.desc}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <span>VIEW CASE STUDY</span>
                                        <div className="icon-arrow-right w-4 h-4 text-cyan-400 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Border Glow Effect on Hover */}
                            <div className="absolute inset-0 border border-white/10 group-hover:border-cyan-500/50 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-4">Want to see more?</p>
                    <a 
                        href="https://f386ocqt4pp7.trickle.host" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline inline-flex"
                    >
                        Explore Full Portfolio
                    </a>
                </div>
            </div>

            <ProjectDetailModal 
                project={selectedProject} 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
}