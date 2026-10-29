import Navigationbar from "./Navigationbar"
import FooterSection from "./FooterSection"

export default function Home() {
    return (
        <div>
            <header>
                <nav>
                    <Navigationbar />
                </nav>
            </header>
            <main className="border-4 border-white/40 bg-black/40 text-whitek">
                <div className="bg-black ">
                    hellow world
                    welcome to my website
                </div>
            </main>
            <footer>
                <FooterSection />
            </footer>
        </div>
    )
}