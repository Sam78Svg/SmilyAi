import Navigationbar from './components/Navigationbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlassFold from './components/Background'
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
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </Router >
    </GlassFold>
  );
}

export default App
