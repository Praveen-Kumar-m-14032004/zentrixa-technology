function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Process', href: '#process' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`} data-name="Navbar" data-file="components/Navbar.js">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
                <a href="#" aria-label="Zentrixa Home" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        <span className="text-white font-bold text-lg">Z</span>
                    </div>
                    <span className="font-['Space_Grotesk'] tracking-wide">ZENTRIXA</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors uppercase tracking-wide relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <a href="#contact" className="btn btn-primary py-2 px-5 text-sm shadow-none hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                        Get a Quote
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    <div className={`icon-${isOpen ? 'x' : 'menu'} text-2xl`}></div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-[#050507] border-b border-white/10 transition-all duration-300 origin-top overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            className="text-gray-300 hover:text-cyan-400 hover:bg-white/5 py-3 px-4 rounded-lg block text-center transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}