import "./CSS/Home.css";
import "./CSS/Footer.css";
import "./CSS/Navbar.css";
import "./CSS/Contact.css";
import "./CSS/About.css";
import "./CSS/Blog.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Navbar from "./Component/Navbar"; 
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import Blog from "./Component/Blog";
import Events from "./Component/Events";
import Donate from "./Component/Donate";
import BloodBank from "./Component/BloodBank";


function App() {
  return (
    <Router>
      <div className="background1">
        <Navbar /> {/* Add a navigation bar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/bloodbank" element={<BloodBank />} />
          
        </Routes>
        <Footer/>
      </div>
      
    </Router>
  );
}

export default App;






