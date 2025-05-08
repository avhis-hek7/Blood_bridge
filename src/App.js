import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./Component/AdminDashboard";
import AddEvent from "./Component/AddEvent";
import UserManagement from "./Component/UserManagement";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import Home from "./Component/Home";
import Events from "./Component/Events";
import Profile from "./Component/Profile";
import About from "./Component/About";
import Navbar from "./Component/Navbar";
import Donate from "./Component/Donate";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import Blog from "./Component/Blog";
import BloodBank from "./Component/BloodBank";
import AdminBloodBank from "./Component/AdminBloodBank";
import AdminNotification from "./Component/AdminNotification";
import Notification from "./Component/Notification";
import AdminSetting from "./Component/AdminSetting";
import AdminContact from "./Component/AdminContact";
import AdminInventory from "./Component/AdminInventory";
import BloodInventory from "./Component/BloodInventory";

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
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, [location, setProgress]);

  return (
    <div className={isAdminRoute ? "background2" : "background1"}>
      {/* Navbar should only be shown for public routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/bloodbank" element={<BloodBank />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/bloodinventory" element={<BloodInventory />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AddEvent />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/bloodbank" element={<AdminBloodBank />} />
        <Route path="/admin/notification" element={<AdminNotification />} />
        <Route path="/admin/settings" element={<AdminSetting />} />
        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer should only be shown for public routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
