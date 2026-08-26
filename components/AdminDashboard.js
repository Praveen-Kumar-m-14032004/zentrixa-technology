function AdminDashboard() {
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('All'); // All, Visible, Hidden
    const [errorMsg, setErrorMsg] = React.useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const response = await trickleListObjects('client_review', 100, true);
            if (response && response.items) {
                setReviews(response.items);
            }
        } catch (error) {
            setErrorMsg(error.toString());
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchReviews();
    }, []);

    const toggleVisibility = async (review) => {
        try {
            const newStatus = !review.objectData.IsHidden;
            
            // Optimistic update
            setReviews(prev => prev.map(r => 
                r.objectId === review.objectId 
                    ? { ...r, objectData: { ...r.objectData, IsHidden: newStatus } }
                    : r
            ));

            await trickleUpdateObject('client_review', review.objectId, {
                ...review.objectData,
                IsHidden: newStatus
            });
            
        } catch (error) {
            setErrorMsg("Failed to update review visibility.");
            fetchReviews(); // Revert on error
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        try {
            await trickleDeleteObject('client_review', id);
            setReviews(prev => prev.filter(r => r.objectId !== id));
        } catch (error) {
            setErrorMsg("Failed to delete review.");
        }
    };

    const filteredReviews = reviews.filter(r => {
        if (filter === 'Visible') return !r.objectData.IsHidden;
        if (filter === 'Hidden') return r.objectData.IsHidden;
        return true;
    });

    return (
        <div className="min-h-screen bg-[#050507] text-white p-4 md:p-8" data-name="AdminDashboard" data-file="components/AdminDashboard.js">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-['Outfit'] mb-1">Review Moderator</h1>
                        <p className="text-gray-400 text-sm">Manage visibility of client testimonials</p>
                    </div>
                    <div className="flex gap-4">
                        <a href="index.html" className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
                            <div className="icon-external-link w-4 h-4"></div>
                            View Live Site
                        </a>
                        <button onClick={fetchReviews} className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors text-sm flex items-center gap-2">
                            <div className="icon-refresh-cw w-4 h-4"></div>
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {['All', 'Visible', 'Hidden'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                                filter === f 
                                ? 'bg-white text-black' 
                                : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                        >
                            {f} <span className="opacity-50 ml-1 text-xs">
                                ({reviews.filter(r => {
                                    if (f === 'Visible') return !r.objectData.IsHidden;
                                    if (f === 'Hidden') return r.objectData.IsHidden;
                                    return true;
                                }).length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                {errorMsg && (
                    <div className="mb-6 p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="icon-circle-alert text-2xl"></div>
                            <h3 className="text-lg font-bold">Access Denied (NoPermission)</h3>
                        </div>
                        {errorMsg.includes('NoPermission') ? (
                            <div className="text-sm text-gray-300 space-y-3 bg-black/40 p-4 rounded-lg border border-red-500/20">
                                <p className="font-semibold text-red-300">Your Trickle Database tables are currently set to private. To fix this error, please follow these steps:</p>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Go to the <strong>Database</strong> section in your Trickle Workspace.</li>
                                    <li>Find and select the <strong>client_review</strong> table.</li>
                                    <li>Click on <strong>Settings</strong> or <strong>Permissions</strong> for this table.</li>
                                    <li>Enable <strong>Public Read</strong> (so the website can fetch reviews) and <strong>Public Create/Write</strong> (so users can submit new reviews).</li>
                                    <li>Repeat the same process for the <strong>inquiry</strong> table.</li>
                                    <li>Come back here and click the <strong>Refresh</strong> button.</li>
                                </ol>
                            </div>
                        ) : (
                            <p className="text-sm opacity-80">{errorMsg}</p>
                        )}
                    </div>
                )}
                
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredReviews.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10">
                                <p className="text-gray-500">No reviews found.</p>
                            </div>
                        ) : (
                            filteredReviews.map((review) => {
                                const data = review.objectData;
                                const isHidden = data.IsHidden;
                                
                                return (
                                    <div 
                                        key={review.objectId} 
                                        className={`p-6 rounded-xl border transition-all duration-300 flex flex-col md:flex-row gap-6 ${
                                            isHidden 
                                            ? 'bg-red-500/5 border-red-500/20 opacity-75' 
                                            : 'bg-[#0f0f16] border-white/10 hover:border-cyan-500/30'
                                        }`}
                                    >
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-black text-xs ${
                                                        data.Category === 'Workshop' ? 'bg-purple-400' : 'bg-cyan-400'
                                                    }`}>
                                                        {data.Name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white flex items-center gap-2">
                                                            {data.Name}
                                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                                                data.Category === 'Workshop' 
                                                                ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' 
                                                                : 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
                                                            }`}>
                                                                {data.Category || 'Project'}
                                                            </span>
                                                        </h3>
                                                        <p className="text-xs text-gray-500">{data.Role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`icon-star w-3 h-3 ${i < data.Rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`}></div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-300 text-sm mt-3 bg-black/20 p-3 rounded-lg border border-white/5 italic">
                                                "{data.Content}"
                                            </p>
                                            
                                            <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
                                                <span>📅 {new Date(data.Date || review.createdAt).toLocaleDateString()}</span>
                                                <span className="font-mono">ID: {review.objectId.slice(-6)}</span>
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col gap-2 shrink-0 justify-center md:border-l border-white/10 md:pl-6">
                                            <button 
                                                onClick={() => toggleVisibility(review)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-colors w-full justify-center ${
                                                    isHidden
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                                                }`}
                                            >
                                                {isHidden ? (
                                                    <>
                                                        <div className="icon-eye w-4 h-4"></div>
                                                        Show
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="icon-eye-off w-4 h-4"></div>
                                                        Hide
                                                    </>
                                                )}
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleDelete(review.objectId)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 border border-white/5 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20 transition-colors text-xs w-full justify-center"
                                            >
                                                <div className="icon-trash-2 w-4 h-4"></div>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}