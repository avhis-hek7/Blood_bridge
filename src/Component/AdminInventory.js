import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminInventory.css";
import AdminSidebar from "./AdminSidebar";

const AdminInventoryPanel = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    bloodType: "",
    quantity: "",
    hospitalName: "",
    hospitalLocation: "",
  });
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/inventory", {
        headers: { "auth-token": localStorage.getItem("authToken") },
      })
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.bloodType ||
      !form.quantity ||
      !form.hospitalName ||
      !form.hospitalLocation
    ) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      if (editingItem) {
        // Update
        await axios.put(
          `http://localhost:5000/api/inventory/${editingItem._id}`,
          form,
          {
            headers: { "auth-token": token },
          }
        );
        setEditingItem(null);
      } else {
        // Add
        await axios.post("http://localhost:5000/api/inventory", form, {
          headers: { "auth-token": token },
        });
      }

      fetchData();
      setForm({
        bloodType: "",
        quantity: "",
        hospitalName: "",
        hospitalLocation: "",
      });
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`, {
        headers: { "auth-token": localStorage.getItem("authToken") },
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      bloodType: item.bloodType,
      quantity: item.quantity,
      hospitalName: item.hospitalName,
      hospitalLocation: item.hospitalLocation,
    });
  };

  const handleCancelEdit = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel editing?"
    );
    if (!confirmCancel) return;

    setEditingItem(null);
    setForm({
      bloodType: "",
      quantity: "",
      hospitalName: "",
      hospitalLocation: "",
    });
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="content p-4 w-100">
        <h1 className="text-center mb-4 text-danger">
          Admin Blood Inventory Management
        </h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Blood Type"
              value={form.bloodType}
              onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Hospital Name"
              value={form.hospitalName}
              onChange={(e) =>
                setForm({ ...form, hospitalName: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Hospital Location"
              value={form.hospitalLocation}
              onChange={(e) =>
                setForm({ ...form, hospitalLocation: e.target.value })
              }
            />
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Update Inventory" : "Add Blood Inventory"}
              </button>
              {editingItem && (
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Blood Type</th>
                <th>Quantity</th>
                <th>Hospital</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td>{item.bloodType}</td>
                  <td>{item.quantity} units</td>
                  <td>{item.hospitalName}</td>
                  <td>{item.hospitalLocation}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-danger btn-sm ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryPanel;
