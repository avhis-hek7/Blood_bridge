import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Navbar from "./Component/Navbar"; 
import Donate from "./Component/Donate";
import BloodBank from "./Component/BloodBank";// Optional: Create a navbar for navigation

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
