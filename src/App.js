import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Events from "./Component/Events";
import About from "./Component/About";
import Navbar from "./Component/Navbar";
import Donate from "./Component/Donate";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import Blog from "./Component/Blog";
import BloodBank from "./Component/BloodBank"; // Optional: Create a navbar for navigation

function App() {
  return (
    <Router>
      <div className="background1">
        <Navbar /> {/* Add a navigation bar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/bloodbank" element={<BloodBank />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
