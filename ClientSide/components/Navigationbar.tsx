import { Link, useLocation } from "react-router-dom"

const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/support", label: "Support" },
    { path: "/chat", label: "Chat" },
]

export default function Navigationbar() {
    const { pathname } = useLocation()

    return (
        <nav
            aria-label="Main navigation"
            className="fixed left-0 top-0 z-50 flex w-full flex-wrap items-center justify-between border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl"
        >
            <div className="mr-6 flex shrink-0 items-center text-white">
                <span className="text-xl font-semibold tracking-tight">SmilyAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
                {navigationItems.map(({ path, label }) => {
                    const isActive = pathname.toLowerCase() === path

                    return (
                        <Link
                            key={path}
                            to={path}
                            aria-current={isActive ? "page" : undefined}
                            className={`font-medium transition-colors underline-offset-4 ${
                                isActive
                                    ? "text-[#8FE3B0] underline"
                                    : "text-[#ECEDEF] hover:text-[#8FE3B0]"
                            }`}
                        >
                            {label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
