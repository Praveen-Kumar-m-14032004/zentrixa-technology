function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-sm" data-name="Footer" data-file="components/Footer.js">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <a href="#" aria-label="Zentrixa Home" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Z</span>
                            </div>
                            <span>ZENTRIXA</span>
                        </a>
                        <p className="text-gray-400 max-w-sm">
                            Transforming Ideas into Scalable Digital Solutions. StartupTN Registered IT Company delivering Web, Mobile & Digital Innovation.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#about" className="hover:text-cyan-400">About Us</a></li>
                            <li><a href="#services" className="hover:text-cyan-400">Services</a></li>
                            <li><a href="#portfolio" className="hover:text-cyan-400">Portfolio</a></li>
                            <li><a href="#contact" className="hover:text-cyan-400">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-cyan-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-cyan-400">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-500 pt-8 border-t border-white/5">
                    <p>&copy; {new Date().getFullYear()} Zentrixa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}