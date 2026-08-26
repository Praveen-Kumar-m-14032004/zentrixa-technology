function Testimonials() {
    const [reviews, setReviews] = React.useState([]);
    const [filteredReviews, setFilteredReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('All'); // 'All', 'Project', 'Workshop'

    const defaultReviews = [
        {
            name: "Rajesh Kumar",
            role: "CEO, TechFlow",
            content: "Zentrixa delivered our project ahead of schedule with exceptional quality. Their team is highly skilled and responsive.",
            rating: 5,
            category: "Project"
        },
        {
            name: "Sarah Williams",
            role: "Founder, GreenEarth",
            content: "The 3D visualizations provided by Zentrixa helped us secure our funding. Truly world-class work!",
            rating: 5,
            category: "Project"
        },
        {
            name: "Priya S.",
            role: "Student, Anna University",
            content: "The Networking workshop was incredibly hands-on. I finally understand packet tracer!",
            rating: 5,
            category: "Workshop"
        }
    ];

    React.useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Fetch reviews from DB
                const response = await trickleListObjects('client_review', 100, true);
                if (response && response.items && response.items.length > 0) {
                    // Filter out hidden reviews
                    const visibleReviews = response.items
                        .filter(item => !item.objectData.IsHidden)
                        .map(item => ({
                            name: item.objectData.Name,
                            role: item.objectData.Role,
                            content: item.objectData.Content,
                            rating: item.objectData.Rating || 5,
                            category: item.objectData.Category || 'Project'
                        }));
                    
                    if (visibleReviews.length > 0) {
                        setReviews(visibleReviews);
                    } else {
                        setReviews(defaultReviews);
                    }
                } else {
                    setReviews(defaultReviews);
                }
            } catch (error) {
                setReviews(defaultReviews);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    React.useEffect(() => {
        if (activeTab === 'All') {
            setFilteredReviews(reviews);
        } else {
            setFilteredReviews(reviews.filter(r => r.category === activeTab));
        }
    }, [activeTab, reviews]);

    return (
        <section id="testimonials" className="section-padding relative overflow-hidden" data-name="Testimonials" data-file="components/Testimonials.js">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/5 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-900/5 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        Voices of <span className="heading-gradient">Trust</span>
                    </h2>
                    <p className="text-gray-400">See what our clients and students have to say.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    {['All', 'Project', 'Workshop'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                                activeTab === tab
                                    ? tab === 'Workshop'
                                        ? 'bg-white/10 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                        : 'bg-white/10 text-white border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    : 'bg-transparent text-gray-500 border-white/5 hover:text-white hover:border-white/20'
                            }`}
                        >
                            {tab} Reviews
                        </button>
                    ))}
                </div>

                {loading ? (
                     <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                     </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredReviews.map((review, idx) => (
                            <div key={idx} className="group glass-card p-8 relative flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-cyan-500/30">
                                {/* Decorative badge */}
                                <div className={`absolute top-4 right-4 text-[10px] uppercase font-bold px-2 py-1 rounded border ${
                                    review.category === 'Workshop' 
                                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' 
                                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                }`}>
                                    {review.category || 'Project'}
                                </div>

                                <div className="mb-4">
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`icon-star text-sm ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-800'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6 italic leading-relaxed flex-grow text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity">
                                    "{review.content}"
                                </p>
                                
                                <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-lg shrink-0 ${
                                        review.category === 'Workshop' 
                                        ? 'bg-gradient-to-br from-purple-400 to-pink-500' 
                                        : 'bg-gradient-to-br from-cyan-400 to-blue-600'
                                    }`}>
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{review.role || (review.category === 'Workshop' ? 'Student' : 'Client')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {filteredReviews.length === 0 && !loading && (
                    <div className="text-center text-gray-500 py-16 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <div className="icon-message-square-off text-4xl mb-3 opacity-50"></div>
                        <p>No {activeTab !== 'All' ? activeTab : ''} reviews found yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}