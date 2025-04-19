import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AdminDashboard from './Component/AdminDashboard';
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import Home from "./Component/Home";
import Events from "./Component/Events";
import About from "./Component/About";
import Navbar from "./Component/Navbar";
import Donate from "./Component/Donate";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import Dashboard from "./Component/Dashboard";
import Blog from "./Component/Blog";
import BloodBank from "./Component/BloodBank";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <PageWrapper setProgress={setProgress} style={{ height: "10px" }} />
    </Router>
  );
}

function PageWrapper({ setProgress }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, [location, setProgress]);

  return (
    <div className="background1">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/bloodbank" element={<BloodBank />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
