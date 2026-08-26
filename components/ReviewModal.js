function ReviewModal({ isOpen, onClose }) {
    const [formData, setFormData] = React.useState({
        name: '',
        role: '',
        rating: 5,
        content: '',
        category: 'Project' // 'Project' or 'Workshop'
    });
    const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRating = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleCategoryChange = (cat) => {
        setFormData(prev => ({ ...prev, category: cat }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await trickleCreateObject('client_review', {
                Name: formData.name,
                Role: formData.role,
                Rating: parseInt(formData.rating),
                Content: formData.content,
                Date: new Date().toISOString(),
                Category: formData.category
            });

            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', role: '', rating: 5, content: '', category: 'Project' });
                onClose();
            }, 2000);
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300" data-name="ReviewModal" data-file="components/ReviewModal.js">
            <div className={`bg-[#0f0f16] border rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-[float_0.3s_ease-out] relative transition-colors duration-500 ${formData.category === 'Workshop' ? 'border-purple-500/30' : 'border-cyan-500/30'}`}>
                
                {/* Decorative glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-colors duration-500 ${formData.category === 'Workshop' ? 'bg-purple-500 shadow-purple-500/80' : 'bg-cyan-500 shadow-cyan-500/80'}`}></div>

                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk']">
                        <div className={`icon-star ${formData.category === 'Workshop' ? 'text-purple-400' : 'text-cyan-400'}`}></div>
                        Write a Review
                    </h3>
                    <button onClick={onClose} aria-label="Close review modal" className="text-gray-400 hover:text-white transition-colors">
                        <div className="icon-x text-2xl"></div>
                    </button>
                </div>
                
                <div className="p-8">
                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <div className="icon-check text-green-500 text-4xl"></div>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2">Thank You!</h4>
                            <p className="text-gray-400">Your review has been submitted successfully.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Category Switcher */}
                            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                                <button
                                    type="button"
                                    onClick={() => handleCategoryChange('Project')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${formData.category === 'Project' ? 'bg-cyan-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Project Review
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCategoryChange('Workshop')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${formData.category === 'Workshop' ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Workshop Review
                                </button>
                            </div>

                            <div className="text-center">
                                <label className="block text-sm font-medium text-gray-400 mb-2">How would you rate your experience?</label>
                                <div className="flex gap-3 justify-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRating(star)}
                                            aria-label={`Rate ${star} stars`}
                                            className="focus:outline-none transition-transform hover:scale-125 duration-200"
                                        >
                                            <div className={`icon-star text-3xl ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-gray-700'}`}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-colors placeholder-gray-600 ${formData.category === 'Workshop' ? 'focus:border-purple-500' : 'focus:border-cyan-500'}`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        {formData.category === 'Project' ? 'Role / Company' : 'College / Department'}
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-colors placeholder-gray-600 ${formData.category === 'Workshop' ? 'focus:border-purple-500' : 'focus:border-cyan-500'}`}
                                        placeholder={formData.category === 'Project' ? "CEO, TechCorp" : "Student, Dept of CSE"}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Your Review</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-colors resize-none placeholder-gray-600 ${formData.category === 'Workshop' ? 'focus:border-purple-500' : 'focus:border-cyan-500'}`}
                                    placeholder={formData.category === 'Project' ? "Share your experience working with us..." : "How was the workshop? What did you learn?"}
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center text-sm flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-2 font-bold">
                                        <div className="icon-circle-alert"></div>
                                        Submission Failed
                                    </div>
                                    <span className="text-xs opacity-80">Please ensure the "client_review" table has Public Create permissions enabled in the Database settings.</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full btn py-3 ${formData.category === 'Project' ? 'btn-primary' : 'bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'}`}
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : 'Submit Review'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}