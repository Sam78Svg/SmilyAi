import { Link } from "react-router-dom"

const linkStyle =
    "inline-flex w-fit rounded-md text-sm text-white/60 transition hover:text-[#A7F0C3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"

export default function FooterSection() {
    return (
        <div className="relative z-10 border-t border-white/10 bg-[#070B16]/75 px-5 py-12 text-white backdrop-blur-xl sm:px-8 sm:py-14">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <section className="col-span-2 sm:col-span-3 lg:col-span-1">
                    <Link
                        to="/"
                        className="inline-flex rounded-lg text-lg font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8FE3B0]"
                    >
                        SmilyAI<span className="text-[#8FE3B0]">.</span>
                    </Link>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                        Your models, media tools, and AI workflows—together in one
                        workspace.
                    </p>
                </section>

                <nav aria-labelledby="footer-explore">
                    <h2 id="footer-explore" className="mb-4 text-sm font-semibold text-white/90">
                        Explore
                    </h2>
                    <ul className="space-y-3">
                        <li><Link className={linkStyle} to="/about">About SmilyAI</Link></li>
                        <li><Link className={linkStyle} to="/chat">Workspace</Link></li>
                        <li><Link className={linkStyle} to="/support">Support</Link></li>
                    </ul>
                </nav>

                <nav aria-labelledby="footer-tools">
                    <h2 id="footer-tools" className="mb-4 text-sm font-semibold text-white/90">
                        Workspace
                    </h2>
                    <ul className="space-y-3">
                        <li><Link className={linkStyle} to="/chat">AI chat</Link></li>
                        <li><Link className={linkStyle} to="/chat">Image generation</Link></li>
                        <li><Link className={linkStyle} to="/chat">Video creation</Link></li>
                    </ul>
                </nav>

                <nav aria-labelledby="footer-account">
                    <h2 id="footer-account" className="mb-4 text-sm font-semibold text-white/90">
                        Account
                    </h2>
                    <ul className="space-y-3">
                        <li><Link className={linkStyle} to="/login">Log in</Link></li>
                        <li><Link className={linkStyle} to="/signup">Create an account</Link></li>
                        <li><Link className={linkStyle} to="/forgot-password">Reset password</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
                <p>&copy; {new Date().getFullYear()} SmilyAI. All rights reserved.</p>
                <p>One workspace for the way you use AI.</p>
            </div>
        </div>
    )
}
