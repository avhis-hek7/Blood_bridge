
import "./CSS/Home.css";
import "./CSS/Footer.css";
import "./CSS/Navbar.css";
import "./CSS/Contact.css";
import "./CSS/About.css";
import "./CSS/Blog.css";
import "./CSS/Donate.css";
import "./CSS/Events.css";
import "./CSS/Foots.css";
import "./CSS/Pelegibilty.css";
import "./CSS/Blood-bank.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

import Home from "./Component/Home";
import About from "./Component/About";
import Events from "./Component/Events";
import Donate from "./Component/Donate";
import BloodBank from "./Component/BloodBank";
import Blog from "./Component/Blog";
import Contact from "./Component/Contact";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import AdminDashboard from './Component/AdminDashboard';
import AddEvent from './Component/AddEvent';
import Egibility from "./Component/Egibility";
import Terms from "./Component/Terms";
import Security from "./Component/Security";
import Profile from "./Component/Profile";
import Participantselegibility from "./Component/Participantselegibility";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <PageWrapper setProgress={setProgress} />
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
      {/* Render Navbar only for non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/bloodbank" element={<BloodBank />} />
        <Route path="/egibility" element={<Egibility />} />
        <Route path="/termscondition" element={<Terms />} />
        <Route path="/security" element={<Security />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Participantselegibility" element={<Participantselegibility />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AddEvent />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/donors" element={<AdminDashboard />} />
        <Route path="/admin/hospitals" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Render Footer only for non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
