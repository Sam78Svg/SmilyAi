import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import GlassFold from "./components/Background"
import FooterSection from "./components/FooterSection"
import Navigationbar from "./components/Navigationbar"

const ChatInterface = lazy(() => import("./components/ChatInterFace"))
const About = lazy(() => import("./components/About"))
const Home = lazy(() => import("./components/Home"))
const Support = lazy(() => import("./components/Support"))

function SiteLayout() {
    return (
        <div className="min-h-screen">
            <header>
                <Navigationbar />
            </header>
            <Outlet />
            <footer>
                <FooterSection />
            </footer>
        </div>
    )
}

function App() {
    const cssProps = {
        color1: "#1e3cc8",
        color2: "#06081e",
        color3: "#96d7ff",
        speed: 0.5,
        scale: 1,
        noise: 0.15,
    }

    return (
        <GlassFold {...cssProps}>
            <Router>
                <Suspense fallback={<div>Loading page...</div>}>
                    <Routes>
                        <Route element={<SiteLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/support" element={<Support />} />
                        </Route>
                        <Route path="/chat" element={<ChatInterface />} />
                    </Routes>
                </Suspense>
            </Router>
        </GlassFold>
    )
}

export default App
