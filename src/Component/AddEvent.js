import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminTimeout from "./AdminTimeout";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });

  const [status, setStatus] = useState("");
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/participation");
        console.log("Participation response:", res.data);
        setParticipations(res.data.data);
      } catch (err) {
        console.error("Error fetching participations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setStatus("❌ Auth token not found. Please log in as admin.");
        return;
      }

      await axios.post("http://localhost:5000/api/authevent", formData, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      setStatus("✅ Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        organizer: "",
      });
    } catch (err) {
      console.error("Event creation error:", err);
      setStatus(
        "❌ " + (err.response?.data?.message || "Failed to create event.")
      );
    }

    hideStatusAfterDelay();
  };

  const hideStatusAfterDelay = () => {
    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <div className="container-fluid">
      <AdminTimeout />
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light min-vh-100 p-0">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <div className="card shadow-sm mb-4">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#c0392b" }}
            >
              <h2 className="mb-0">Create New Event</h2>
            </div>
            <div className="card-body">
              {status && (
                <div
                  className={`alert ${
                    status.includes("✅")
                      ? "alert-success"
                      : status.includes("❌")
                      ? "alert-danger"
                      : "alert-info"
                  } mb-3 fade show`}
                  role="alert"
                >
                  {status}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control form-control-lg"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().slice(0, 16)} // Prevent past date & time
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control form-control-lg"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Location</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Organizer</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="organizer"
                      value={formData.organizer}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="submit"
                    className="btn btn-lg text-white px-4"
                    style={{ backgroundColor: "#c0392b" }}
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#c0392b" }}
            >
              <h2 className="mb-0">Participant Information</h2>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : participations.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No participations yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Event Title</th>
                        <th>Event Date</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participations.map((p, index) => (
                        <tr key={p._id || index}>
                          <td>{index + 1}</td>
                          <td>{p.user.name}</td>
                          <td>{p.user.email}</td>
                          <td>{p.event.title}</td>
                          <td>{new Date(p.event.date).toLocaleString()}</td>
                          <td>{p.event.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
