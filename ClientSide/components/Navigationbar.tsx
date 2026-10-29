import { Link } from 'react-router-dom'


export default function Navigationbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-sm shadow-lg fixed top-0 left-0 w-full z-50">
                <div className="flex items-center shrink-0 text-black mr-6">
                    <span className="font-semibold text-xl tracking-tight">SmilyAI</span>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">
                            Home
                        </Link>
                        <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-500 mr-4">
                            About
                        </Link>
                    </div>
                </div>
        </nav>
    );
}