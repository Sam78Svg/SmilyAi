import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlassFold from './components/Background';
import { lazy, Suspense } from "react";

//RouteImports  
const ChatInerFace = lazy(() => import("./components/ChatInterFace"));
const About = lazy(() => import('./components/About'));
const Home = lazy(() => import('./components/Home'));

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
        <Routes>
          <Route path="/" index={true} element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* a temporary page for loading animation*/}
        <Suspense fallback={<div> Loading Page .....</div>}>
          <Routes>
            <Route path="/Chat" element={<ChatInerFace />} />
          </Routes>
        </Suspense>
      </Router>
    </GlassFold>
  );
}

export default App
