function Services() {
    const [selectedService, setSelectedService] = React.useState(null);

    // Mouse movement handler for spotlight effect
    const handleMouseMove = (e) => {
        const cards = document.getElementsByClassName("spotlight-card");
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    // Business/Corporate Services
    const businessServices = [
        {
            icon: 'smartphone',
            title: 'Mobile App Development',
            desc: 'Native and cross-platform mobile applications designed for performance and scalability.',
            model: 'Agile Sprint Model',
            expandedDesc: 'We build high-performance mobile applications that run seamlessly on both iOS and Android devices. Using frameworks like React Native and Flutter, we ensure your app delivers a native experience with code reusability.',
            features: ['iOS & Android Compatible', 'Offline Functionality', 'Push Notifications', 'App Store Optimization']
        },
        {
            icon: 'globe',
            title: 'Enterprise Web Solutions',
            desc: 'Custom, high-performance websites and web applications built for business growth.',
            model: 'Full Lifecycle Development',
            expandedDesc: 'From simple landing pages to complex SaaS platforms, we architect web solutions that are secure, scalable, and SEO-friendly. Our stack includes React, Node.js, and modern cloud infrastructure.',
            features: ['Responsive Design', 'SEO Optimized', 'Fast Load Speeds', 'CMS Integration']
        },
        {
            icon: 'palette',
            title: 'UI/UX Design',
            desc: 'User-centric interface design and prototyping to ensure intuitive digital experiences.',
            model: 'Design Thinking Workshop',
            expandedDesc: 'Design is not just about looks; it is about how it works. We create wireframes, prototypes, and high-fidelity mockups that focus on user journey and conversion optimization.',
            features: ['Wireframing', 'Interactive Prototypes', 'User Research', 'Brand Consistency']
        },
        {
            icon: 'box',
            title: '3D Art & Visualization',
            desc: 'High-quality 3D modeling and photorealistic rendering for product showcases.',
            model: 'Iterative Rendering Pipeline',
            expandedDesc: 'Visualize your products before they are manufactured. We create hyper-realistic 3D assets for marketing, e-commerce, and virtual reality experiences.',
            features: ['Product Modeling', 'Architectural Visualization', '3D Animation', 'VR Ready Assets']
        },
        {
            icon: 'clapperboard',
            title: 'VFX & Motion Graphics',
            desc: 'Engaging visual effects and motion graphics for digital content and marketing.',
            model: 'Creative Storytelling',
            expandedDesc: 'Bring your brand story to life with dynamic motion graphics and visual effects. Perfect for explainer videos, social media ads, and brand intros.',
            features: ['Logo Animation', 'Explainer Videos', 'Green Screen Removal', 'Special Effects']
        },
        {
            icon: 'gamepad-2',
            title: 'Game Development',
            desc: 'Interactive game design and development using industry-standard engines like Unity.',
            model: 'Game Loop Architecture',
            expandedDesc: 'We develop immersive 2D and 3D games for mobile and PC platforms. From concept art to programming mechanics, we handle the full game development lifecycle.',
            features: ['Unity & Unreal Engine', 'Multiplayer Support', 'Physics Simulation', 'Asset Optimization']
        },
        {
            icon: 'wrench',
            title: 'IT Support & Maintenance',
            desc: 'Reliable technical support for hardware, software, and infrastructure maintenance.',
            model: 'SLA-Based Support',
            expandedDesc: 'Ensure your business operations never stop. We provide ongoing support for server management, software updates, and troubleshooting technical issues.',
            features: ['24/7 Monitoring', 'Server Management', 'Bug Fixes', 'Performance Tuning']
        },
        {
            icon: 'shield-check',
            title: 'Cybersecurity Audit',
            desc: 'Comprehensive security assessments to protect business data and infrastructure.',
            model: 'Zero Trust Framework',
            expandedDesc: 'Identify vulnerabilities before hackers do. We conduct penetration testing and security audits to safeguard your sensitive business data.',
            features: ['Penetration Testing', 'Vulnerability Assessment', 'Data Encryption', 'Compliance Check']
        }
    ];

    // Student/College Workshops
    const workshopServices = [
        {
            icon: 'network',
            title: 'Networking',
            desc: 'Hands-on training in network configuration, Cisco Packet Tracer, and infrastructure security.',
            model: 'Hands-on Simulation',
            expandedDesc: 'A comprehensive workshop designed for students to understand the fundamentals of computer networking. Participants will get hands-on experience with Cisco Packet Tracer to simulate real-world network topologies.',
            features: ['Subnetting & IP Addressing', 'Routing Protocols (OSPF/EIGRP)', 'VLAN Configuration', 'Network Security Basics'],
            isWorkshop: true
        },
        {
            icon: 'cloud',
            title: 'Cloud (AWS)',
            desc: 'Deep dive into Amazon Web Services, cloud architecture, and server management.',
            model: 'Cloud Lab Bootcamp',
            expandedDesc: 'Learn how to deploy and manage applications in the cloud. This bootcamp covers core AWS services like EC2, S3, RDS, and IAM, preparing students for cloud certification paths.',
            features: ['EC2 Instance Management', 'S3 Storage Solutions', 'Cloud Security (IAM)', 'Serverless Computing (Lambda)'],
            isWorkshop: true
        },
        {
            icon: 'code',
            title: 'Website Development',
            desc: 'Full-stack web development bootcamps covering HTML, CSS, React, and Backend technologies.',
            model: 'Project-Based Learning',
            expandedDesc: 'From zero to hero in web development. Students will build a complete project from scratch, learning frontend design with React and backend logic with Node.js.',
            features: ['React.js Fundamentals', 'Tailwind CSS Styling', 'API Integration', 'Deployment & Hosting'],
            isWorkshop: true
        },
        {
            icon: 'brain-circuit',
            title: 'Aptitude Training',
            desc: 'Intensive logical reasoning and quantitative aptitude sessions for placement preparation.',
            model: 'Mock Test & Analysis',
            expandedDesc: 'Crack your placement interviews with confidence. Our aptitude training covers shortcuts, logical reasoning puzzles, and quantitative problems frequently asked by top MNCs.',
            features: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Mock Tests'],
            isWorkshop: true
        },
        {
            icon: 'settings',
            title: 'OS Installation',
            desc: 'Practical workshop on installing, configuring, and troubleshooting Windows, Linux, and macOS.',
            model: 'Live Demo & Practice',
            expandedDesc: 'Stop fearing system formats. Learn how to create bootable drives, partition hard disks, and install multiple operating systems (Dual Boot) safely.',
            features: ['Bootable USB Creation', 'Dual Boot Configuration', 'Driver Installation', 'Troubleshooting Boot Errors'],
            isWorkshop: true
        },
        {
            icon: 'users',
            title: 'Skill Development',
            desc: 'Soft skills, resume building, and personality development programs to enhance employability.',
            model: 'Interactive Group Session',
            expandedDesc: 'Technical skills get you the interview; soft skills get you the job. We focus on communication, body language, and resume crafting to make you corporate-ready.',
            features: ['Resume Review', 'Mock Interviews', 'Group Discussions', 'Presentation Skills'],
            isWorkshop: true
        }
    ];

    return (
        <section id="services" className="section-padding relative" onMouseMove={handleMouseMove} data-name="Services" data-file="components/Services.js">
            <div className="max-w-7xl mx-auto">
                
                {/* Section 1: Business Services */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-2 block">What We Do</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="heading-gradient">Services</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Scalable digital solutions designed to help your business grow.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {businessServices.map((service, idx) => (
                            <div 
                                key={idx} 
                                className="spotlight-card group cursor-pointer h-full flex flex-col"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                                    <div className={`icon-${service.icon} text-3xl text-cyan-400`}></div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors font-['Outfit']">{service.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow font-['Plus_Jakarta_Sans']">{service.desc}</p>
                                
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{service.model}</span>
                                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                                        <div className="icon-arrow-right w-4 h-4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Workshops & Bootcamps */}
                <div className="relative">
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-purple-500/5 blur-3xl -z-10 rounded-full"></div>

                    <div className="text-center mb-16">
                        <span className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-2 block">For Students & Colleges</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Outfit']">Workshop & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Bootcamp</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Industry-standard training programs designed to bridge the gap between academia and industry.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workshopServices.map((workshop, idx) => (
                            <div 
                                key={idx} 
                                className="group relative overflow-hidden rounded-2xl bg-[#0f0f16] border border-purple-500/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 p-8 cursor-pointer h-full flex flex-col"
                                onClick={() => setSelectedService(workshop)}
                            >
                                {/* Gradient Background on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-all group-hover:bg-purple-500/10"></div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.1)] border border-purple-500/10">
                                        <div className={`icon-${workshop.icon} text-3xl text-purple-400`}></div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors font-['Outfit']">{workshop.title}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6 text-sm flex-grow font-['Plus_Jakarta_Sans']">{workshop.desc}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{workshop.model}</span>
                                        <div className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors group/link">
                                            Details 
                                            <div className="icon-arrow-right w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ServiceModal 
                    service={selectedService} 
                    isOpen={!!selectedService} 
                    onClose={() => setSelectedService(null)} 
                />

            </div>
        </section>
    );
}