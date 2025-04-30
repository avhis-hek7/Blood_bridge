import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaUserCheck } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminSidebar from "./AdminSidebar";
import AdminTimeout from "./AdminTimeout";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [eventData, setEventData] = useState([]);
  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6666",
    "#AA336A",
    "#00BFFF",
    "#A28CFE",
  ];

  const getAuthToken = () => localStorage.getItem("authToken");

  const userApi = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: { "Content-Type": "application/json" },
  });

  const eventApi = axios.create({
    baseURL: "http://localhost:5000/api/authevent",
    headers: { "Content-Type": "application/json" },
  });

  const participationApi = axios.create({
    baseURL: "http://localhost:5000/api/participation",
    headers: { "Content-Type": "application/json" },
  });
  const applyInterceptors = (apiInstance) => {
    apiInstance.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) config.headers["auth-token"] = token;
        else delete config.headers["auth-token"];
        return config;
      },
      (error) => Promise.reject(error)
    );

    apiInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAdmin");
          navigate("/admin-login");
        }
        return Promise.reject(err);
      }
    );
  };

  applyInterceptors(userApi);
  applyInterceptors(eventApi);
  applyInterceptors(participationApi);
  useEffect(() => {
    const token = getAuthToken();
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!token || !isAdmin) {
      navigate("/admin-login");
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const animateCount = (finalValue, setter) => {
    let current = 0;
    const step = Math.ceil(finalValue / 100);
    const interval = setInterval(() => {
      if (current < finalValue) {
        current += step;
        setter(current > finalValue ? finalValue : current);
      } else {
        setter(finalValue);
        clearInterval(interval);
      }
    }, 70);
  };
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetching blood group data without authentication (since it's public)
      const bloodGroupRes = await userApi.get("/bloodgroup");
      console.log("Blood Group Data:", bloodGroupRes.data); // Check the structure of the response
      if (bloodGroupRes.data && Array.isArray(bloodGroupRes.data)) {
        setBloodGroupData(bloodGroupRes.data); // Update state with valid data
      } else {
        console.error("Blood group data is not in the expected format.");
        setError("Failed to fetch blood group data.");
      }

      // Other data fetching logic
      const userRes = await userApi.get("/users/count");
      const eventRes = await eventApi.get("/events/summary");
      const participantRes = await participationApi.get("/count");

      // Set total values
      setTotalUsers(userRes.data.count);
      setTotalEvents(eventRes.data.count);
      setTotalParticipants(participantRes.data.count);
      //animate count
      animateCount(userRes.data.count, setTotalUsers);
      animateCount(eventRes.data.count, setTotalEvents);
      animateCount(participantRes.data.count, setTotalParticipants);

      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        "Failed to fetch dashboard data: " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="adminPage"><AdminSidebar />
    <div className="d-flex">
      <AdminTimeout />
      <div
        className="flex-grow-1 background1 p-4"
        style={{ marginLeft: "250px" }}
      >
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="row g-4 mb-4">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card bg-primary text-white shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="mb-0">Total Users</h6>
                      <h2 className="mb-0">{totalUsers}</h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <FaUsers size={30} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="card bg-success text-white shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="mb-0">Total Events</h6>
                      <h2 className="mb-0">{totalEvents}</h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <FaCalendarAlt size={30} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="card bg-warning text-white shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="mb-0">Total Participants</h6>
                      <h2 className="mb-0">{totalParticipants}</h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <FaUserCheck size={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blood Group Pie Chart */}
            <div className="mt-5 pie-chart-container">
              <h4 className="mb-3">Blood Group Distribution</h4>
              {bloodGroupData.length > 0 ? (
                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={bloodGroupData}
                        dataKey="count"
                        nameKey="bloodGroup"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                      >
                        {bloodGroupData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div>No blood group data available.</div>
              )}
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </>
        )}
      </div>
    </div>
    </div>
    </>
  );
}

export default AdminDashboard;
