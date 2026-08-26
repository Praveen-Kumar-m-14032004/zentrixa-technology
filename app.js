// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h1>
            <p className="text-gray-400 mb-6">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isReviewOpen, setIsReviewOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white selection:bg-cyan-500 selection:text-black" data-name="app" data-file="app.js">
      <Navbar />
      <main>
        <Hero onOpenReview={() => setIsReviewOpen(true)} />
        <About />
        <Tools />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <WhyChoose />
        <Contact />
      </main>
      <Footer />
      
      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);