import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlassFold from './components/Background'
import About from './components/About'
import Home from './components/Home'
import './App.css'

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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router >
    </GlassFold>
  );
}

export default App
