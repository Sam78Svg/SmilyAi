import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/support", label: "Support" },
    { path: "/chat", label: "Chat" },
]

function isActivePath(pathname: string, path: string) {
    return pathname.toLowerCase() === path
}

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
    const { pathname } = useLocation()

    return (
        <>
            {navigationItems.map(({ path, label }) => {
                const isActive = isActivePath(pathname, path)

                return (
                    <Link
                        key={path}
                        to={path}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-lg px-2 py-2 font-medium underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0] ${
                            isActive
                                ? "text-[#8FE3B0] underline"
                                : "text-[#ECEDEF] hover:text-[#8FE3B0] hover:underline"
                        }`}
                    >
                        {label}
                    </Link>
                )
            })}
        </>
    )
}

function AccountLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <>
            <Link
                to="/login"
                onClick={onNavigate}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-white/85 transition hover:border-white/35 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
            >
                Log in
            </Link>
            <Link
                to="/signup"
                onClick={onNavigate}
                className="rounded-xl bg-[#8FE3B0] px-4 py-2.5 text-center text-sm font-semibold text-[#10231A] transition hover:bg-[#A7F0C3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
            >
                Sign up
            </Link>
        </>
    )
}

export default function Navigationbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <nav
            aria-label="Main navigation"
            className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#080D1C]/75 px-4 shadow-lg backdrop-blur-xl sm:px-6"
        >
            <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4">
                <Link
                    to="/"
                    className="shrink-0 rounded-lg text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8FE3B0]"
                    aria-label="SmilyAI home"
                >
                    <span className="text-xl font-semibold tracking-tight">SmilyAI</span>
                </Link>

                <div className="hidden items-center gap-3 text-sm md:flex">
                    <NavigationLinks />
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <AccountLinks />
                </div>

                <button
                    type="button"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0] md:hidden"
                >
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    >
                        {menuOpen ? (
                            <path d="m6 6 12 12M18 6 6 18" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-white/10 bg-[#080D1C]/95 px-2 pb-5 pt-3 md:hidden"
                >
                    <div className="flex flex-col gap-1 text-sm">
                        <NavigationLinks onNavigate={() => setMenuOpen(false)} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                        <AccountLinks onNavigate={() => setMenuOpen(false)} />
                    </div>
                </div>
            )}
.
        </nav>
    )
}
