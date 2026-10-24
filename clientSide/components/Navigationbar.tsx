export default function Navigationbar() {
    return (
        <header>
            <nav className="flex items-center justify-between flex-wrap bg-white /10 backdrop-blur-xl border border-white/20 p-6 rounded-sm shadow-lg fixed top-0 left-0 w-full z-50">
                <div className="flex items-center flex-shrink-0 text-black mr-6">
                    <span className="font-semibold text-xl tracking-tight">SmilyAI</span>
                </div>
            </nav>
        </header>
    ); 
}