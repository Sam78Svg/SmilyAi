export default function FooterSection() {
    return (
        <div className="border-t border-white/20 bg-black/20 px-6 py-10 text-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <section aria-labelledby="footer-sponsors">
                    <h2 id="footer-sponsors" className="mb-3 text-xl font-semibold transition-transform duration-200 hover:scale-105 hover:font-bold hover:underline hover:underline-offset-4">
                        Sponsors
                    </h2>
                </section>

                <section aria-labelledby="footer-help">
                    <h2 id="footer-help" className="mb-3 text-xl font-semibold transition-transform duration-200 hover:scale-105 hover:font-bold hover:underline hover:underline-offset-4">
                        Help
                    </h2>
                    <p className="text-sm text-white/70">
                        Need a hand? We’re here to help.
                    </p>
                </section>

                <section aria-labelledby="footer-documentation">
                    <h2 id="footer-documentation" className="mb-3 text-xl font-semibold transition-transform duration-200 hover:scale-105 hover:font-bold hover:underline hover:underline-offset-4">
                        Documentation
                    </h2>
                    <p className="text-sm text-white/70">
                        Find guides and information about SmilyAI.
                    </p>
                </section>

                <section aria-labelledby="footer-feedback">
                    <h2 id="footer-feedback" className="mb-3 text-xl font-semibold transition-transform duration-200 hover:scale-105 hover:font-bold hover:underline hover:underline-offset-4">
                        Feedback
                    </h2>
                    <form>
                        <label htmlFor="footer-feedback-message" className="sr-only">
                            Your feedback
                        </label>
                        <textarea
                            id="footer-feedback-message"
                            name="feedback"
                            rows={3}
                            className="w-full resize-y rounded-md border border-white/30 bg-white/10 p-3 text-sm text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                            placeholder="Share your feedback..."
                        />
                        <button
                            type="button"
                            className="mt-3 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Send
                        </button>
                    </form>
                </section>
            </div>
            <p className="relative z-10 m-0 mt-10 px-4 text-center text-sm text-white/80">
                &copy; {new Date().getFullYear()} SmilyAI
            </p>
        </div>
    )
}