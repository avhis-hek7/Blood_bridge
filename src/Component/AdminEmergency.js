import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminEmergencyManager = () => {
  const [requests, setRequests] = useState([]);
  const [notes, setNotes] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/api/emergency", {
        headers: { "auth-token": token },
      });
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching emergency requests:", error);
    }
  };

  const handleNoteChange = (id, note) => {
    setNotes((prev) => ({ ...prev, [id]: note }));
  };

  const respondToRequest = async (id) => {
    try {
      setLoadingId(id);
      const token = localStorage.getItem("authToken");
      const adminNote = notes[id];

      const res = await axios.put(
        `http://localhost:5000/api/emergency/${id}/respond`,
        { adminNote },
        { headers: { "auth-token": token } }
      );

      alert(res.data.msg);
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error("Error responding to request:", error);
      alert("Error responding to request.");
    } finally {
      setLoadingId(null);
    }
  };

  const markAsCollected = async (id) => {
    try {
      setLoadingId(id);
      const token = localStorage.getItem("authToken");

      const res = await axios.put(
        `http://localhost:5000/api/emergency/${id}/mark-collected`,
        {},
        { headers: { "auth-token": token } }
      );

      alert(res.data.msg);
      fetchRequests();
    } catch (error) {
      console.error("Error marking as collected:", error);
      alert("Error marking request as collected.");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/emergency/${id}`, {
        headers: { "auth-token": token },
      });
      alert("Request deleted successfully.");
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
      alert("Error deleting request.");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="content p-4 w-100" style={{ marginLeft: "16rem" }}>
        <h2 className="text-center mb-4 text-danger">Emergency Requests</h2>
        {requests.length === 0 ? (
          <p>No emergency requests found.</p>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              className="bg-white border p-4 rounded shadow mb-4"
            >
              <p>
                <strong>User Email:</strong> {req.email}
              </p>
              <p>
                <strong>Blood Type:</strong> {req.bloodType}
              </p>
              <p>
                <strong>Units Required:</strong> {req.unitsRequired}
              </p>
              <p>
                <strong>Reason:</strong> {req.reason || "N/A"}
              </p>
              <p>
                <strong>Contact:</strong> {req.contactNumber}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ms-2 badge bg-${
                    req.status === "available"
                      ? "success"
                      : req.status === "not available"
                      ? "danger"
                      : "secondary"
                  }`}
                >
                  {req.status}
                </span>
              </p>
              {req.adminNote && (
                <p>
                  <strong>Admin Note:</strong> {req.adminNote}
                </p>
              )}

              <div className="mt-3">
                {/* Respond button is always visible */}
                <button
                  className="btn btn-warning me-2"
                  disabled={loadingId === req._id || req.status !== "pending"}
                  onClick={() => respondToRequest(req._id)}
                >
                  {loadingId === req._id ? "Responding..." : "Respond"}
                </button>

                {/* Mark Collected only if status is 'available' */}
                <button
                  className="btn btn-success me-2"
                  disabled={loadingId === req._id || req.status !== "available"}
                  onClick={() => markAsCollected(req._id)}
                >
                  {loadingId === req._id ? "Marking..." : "Mark Collected"}
                </button>

                {/* Delete Request only if status is 'collected' */}
                <button
                  className="btn btn-danger"
                  disabled={loadingId === req._id || req.status !== "collected"}
                  onClick={() => deleteRequest(req._id)}
                >
                  Delete Request
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminEmergencyManager;
