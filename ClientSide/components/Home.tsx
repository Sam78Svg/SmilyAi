import Navigationbar from "./Navigationbar"
import FooterSection from "./FooterSection"

export default function Home() {
    return (
        <div>
            <header>
                <Navigationbar />
            </header>
                <main className="relative z-10 pt-24 text-center text-white">
                    <h1 className="text-4xl font-semibold">
                        Welcome to the Smily AI
                    </h1>
                </main>
            <footer>
                <FooterSection />
            </footer>
        </div>
    )
}