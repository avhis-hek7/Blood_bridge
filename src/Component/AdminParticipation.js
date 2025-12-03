// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminSidebar from "./AdminSidebar";
// import AdminTimeout from "./AdminTimeout";
// import styles from "./AdminParticipation.module.css"; // Import the CSS module

// const AdminParticipation = () => {
//   const [participations, setParticipations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [confirmingId, setConfirmingId] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);
//   const [checkboxStates, setCheckboxStates] = useState({});

//   const fetchParticipations = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/participation");
//       setParticipations(res.data.data);

//       const savedStates =
//         JSON.parse(localStorage.getItem("checkboxStates")) || {};
//       const defaultStates = res.data.data.reduce((acc, p) => {
//         acc[p._id] = savedStates[p._id] || false;
//         return acc;
//       }, {});
//       setCheckboxStates(defaultStates);
//     } catch (err) {
//       console.error("Error fetching participations:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmParticipation = async (id) => {
//     try {
//       setConfirmingId(id);
//       await axios.put(`http://localhost:5000/api/participation/confirm/${id}`);
//       setParticipations((prev) =>
//         prev.map((p) => (p._id === id ? { ...p, confirmed: true } : p))
//       );

//       const updatedStates = { ...checkboxStates };
//       delete updatedStates[id];
//       setCheckboxStates(updatedStates);
//       localStorage.setItem("checkboxStates", JSON.stringify(updatedStates));
//     } catch (err) {
//       console.error("Error confirming participation:", err);
//     } finally {
//       setConfirmingId(null);
//     }
//   };

//   const deleteParticipation = async (id) => {
//     try {
//       setDeletingId(id);
//       await axios.delete(`http://localhost:5000/api/participation/${id}`);
//       setParticipations((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Error deleting participation:", err);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchParticipations();
//   }, []);

//   const groupByEventTitle = (data) => {
//     return data.reduce((acc, p) => {
//       const title = p.event.title;
//       if (!acc[title]) acc[title] = { event: p.event, participants: [] };
//       acc[title].participants.push(p);
//       return acc;
//     }, {});
//   };

//   const groupedByTitle = groupByEventTitle(participations);

//   return (
//     <div className="adminPage">
//       <AdminSidebar />
//       <div className="d-flex">
//         <AdminTimeout />
//         <div
//           className={`flex-grow-1 background2 p-4 ${styles.container}`}
//           style={{ marginLeft: "250px" }}
//         >
//           <div className="mb-4">
//             <h2 className={styles.sectionHeader}>Participant Information</h2>
//           </div>

//           {loading ? (
//             <div className="text-center py-5">
//               <div
//                 className={`spinner-border text-primary ${styles.loadingSpinner}`}
//                 role="status"
//               >
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : participations.length === 0 ? (
//             <div className="text-center py-5">
//               <p className="text-muted">No participations yet.</p>
//             </div>
//           ) : (
//             Object.entries(groupedByTitle).map(
//               ([title, { event, participants }]) => (
//                 <div key={event._id || title} className="mb-5">
//                   <h5
//                     className={`mb-3 ${styles.eventTitle} ${styles.sectionHeader}`}
//                   >
//                     {title} — {new Date(event.date).toLocaleString()} @{" "}
//                     {event.location}
//                   </h5>

//                   <div className={`table-responsive ${styles.tableContainer}`}>
//                     <table
//                       className={`table table-hover align-middle table-bordered ${styles.table}`}
//                     >
//                       <thead className="table-dark">
//                         <tr>
//                           <th>#</th>
//                           <th>User Name</th>
//                           <th>Email</th>
//                           <th>Participated</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {participants.map((p, index) => (
//                           <tr key={p._id}>
//                             <td data-label="#">{index + 1}</td>
//                             <td data-label="User Name">{p.user.name}</td>
//                             <td data-label="Email">{p.user.email}</td>
//                             <td data-label="Participated">
//                               {p.confirmed ? (
//                                 <span
//                                   className={`text-success fw-bold ${styles.confirmedText}`}
//                                 >
//                                   Participation Confirmed
//                                 </span>
//                               ) : (
//                                 <div
//                                   className={`form-check ${styles.checkboxContainer}`}
//                                 >
//                                   <input
//                                     className={`form-check-input ${styles.checkboxInput}`}
//                                     type="checkbox"
//                                     id={`checkbox-${p._id}`}
//                                     checked={checkboxStates[p._id] || false}
//                                     onChange={(e) => {
//                                       const updated = {
//                                         ...checkboxStates,
//                                         [p._id]: e.target.checked,
//                                       };
//                                       setCheckboxStates(updated);
//                                       localStorage.setItem(
//                                         "checkboxStates",
//                                         JSON.stringify(updated)
//                                       );
//                                     }}
//                                   />
//                                   <label
//                                     className={`form-check-label ${styles.checkboxLabel}`}
//                                     htmlFor={`checkbox-${p._id}`}
//                                   >
//                                     Participated
//                                   </label>
//                                 </div>
//                               )}
//                             </td>
//                             <td data-label="Actions">
//                               <div className="d-flex gap-2">
//                                 {p.confirmed ? (
//                                   <>
//                                     <span
//                                       className={`badge bg-success ${styles.badge}`}
//                                     >
//                                       Confirmed
//                                     </span>
//                                     <button
//                                       className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
//                                       onClick={() => deleteParticipation(p._id)}
//                                       disabled={deletingId === p._id}
//                                     >
//                                       {deletingId === p._id ? (
//                                         <span
//                                           className={`spinner-border spinner-border-sm ${styles.loadingSpinner}`}
//                                           role="status"
//                                           aria-hidden="true"
//                                         ></span>
//                                       ) : (
//                                         "Delete"
//                                       )}
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <button
//                                     className={`btn btn-sm btn-outline-success ${styles.actionButton}`}
//                                     onClick={() => confirmParticipation(p._id)}
//                                     disabled={
//                                       !checkboxStates[p._id] ||
//                                       confirmingId === p._id
//                                     }
//                                   >
//                                     {confirmingId === p._id
//                                       ? "Confirming..."
//                                       : "Issue Certificate"}
//                                   </button>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminParticipation;

import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminTimeout from "./AdminTimeout";
import * as XLSX from "xlsx";
import styles from "./AdminParticipation.module.css";

const AdminParticipation = () => {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});

  const fetchParticipations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/participation");
      setParticipations(res.data.data);

      const savedStates =
        JSON.parse(localStorage.getItem("checkboxStates")) || {};
      const defaultStates = res.data.data.reduce((acc, p) => {
        acc[p._id] = savedStates[p._id] || false;
        return acc;
      }, {});
      setCheckboxStates(defaultStates);
    } catch (err) {
      console.error("Error fetching participations:", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmParticipation = async (id) => {
    try {
      setConfirmingId(id);
      await axios.put(`http://localhost:5000/api/participation/confirm/${id}`);
      setParticipations((prev) =>
        prev.map((p) => (p._id === id ? { ...p, confirmed: true } : p))
      );

      const updatedStates = { ...checkboxStates };
      delete updatedStates[id];
      setCheckboxStates(updatedStates);
      localStorage.setItem("checkboxStates", JSON.stringify(updatedStates));
    } catch (err) {
      console.error("Error confirming participation:", err);
    } finally {
      setConfirmingId(null);
    }
  };

  const deleteParticipation = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/participation/${id}`);
      setParticipations((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting participation:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const exportToExcel = () => {
    const exportData = participations.map((p, index) => ({
      "#": index + 1,
      "Event Title": p.event.title,
      "Event Date": new Date(p.event.date).toLocaleString(),
      "Event Location": p.event.location,
      "User Name": p.user.name,
      "User Email": p.user.email,
      "Participation Status": p.confirmed
        ? "Confirmed"
        : checkboxStates[p._id]
        ? "Marked (Not Confirmed)"
        : "Not Participated",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participations");
    XLSX.writeFile(
      workbook,
      `participations_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  useEffect(() => {
    fetchParticipations();
  }, []);

  const groupByEventTitle = (data) => {
    return data.reduce((acc, p) => {
      const title = p.event.title;
      if (!acc[title]) acc[title] = { event: p.event, participants: [] };
      acc[title].participants.push(p);
      return acc;
    }, {});
  };

  const groupedByTitle = groupByEventTitle(participations);

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="d-flex">
        <AdminTimeout />
        <div
          className={`flex-grow-1 background2 p-4 ${styles.container}`}
          style={{ marginLeft: "250px" }}
        >
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h2 className={styles.sectionHeader}>Participant Information</h2>
            {!loading && participations.length > 0 && (
              <button
                onClick={exportToExcel}
                className={`btn btn-success ${styles.exportButton}`}
              >
                Export to Excel
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                className={`spinner-border text-primary ${styles.loadingSpinner}`}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : participations.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No participations yet.</p>
            </div>
          ) : (
            Object.entries(groupedByTitle).map(
              ([title, { event, participants }]) => (
                <div key={event._id || title} className="mb-5">
                  <h5
                    className={`mb-3 ${styles.eventTitle} ${styles.sectionHeader}`}
                  >
                    {title} — {new Date(event.date).toLocaleString()} @{" "}
                    {event.location}
                  </h5>

                  <div className={`table-responsive ${styles.tableContainer}`}>
                    <table
                      className={`table table-hover align-middle table-bordered ${styles.table}`}
                    >
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>User Name</th>
                          <th>Email</th>
                          <th>Participated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((p, index) => (
                          <tr key={p._id}>
                            <td data-label="#">{index + 1}</td>
                            <td data-label="User Name">{p.user.name}</td>
                            <td data-label="Email">{p.user.email}</td>
                            <td data-label="Participated">
                              {p.confirmed ? (
                                <span
                                  className={`text-success fw-bold ${styles.confirmedText}`}
                                >
                                  Participation Confirmed
                                </span>
                              ) : (
                                <div
                                  className={`form-check ${styles.checkboxContainer}`}
                                >
                                  <input
                                    className={`form-check-input ${styles.checkboxInput}`}
                                    type="checkbox"
                                    id={`checkbox-${p._id}`}
                                    checked={checkboxStates[p._id] || false}
                                    onChange={(e) => {
                                      const updated = {
                                        ...checkboxStates,
                                        [p._id]: e.target.checked,
                                      };
                                      setCheckboxStates(updated);
                                      localStorage.setItem(
                                        "checkboxStates",
                                        JSON.stringify(updated)
                                      );
                                    }}
                                  />
                                  <label
                                    className={`form-check-label ${styles.checkboxLabel}`}
                                    htmlFor={`checkbox-${p._id}`}
                                  >
                                    Participated
                                  </label>
                                </div>
                              )}
                            </td>
                            <td data-label="Actions">
                              <div className="d-flex gap-2">
                                {p.confirmed ? (
                                  <>
                                    <span
                                      className={`badge bg-success ${styles.badge}`}
                                    >
                                      Confirmed
                                    </span>
                                    <button
                                      className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
                                      onClick={() => deleteParticipation(p._id)}
                                      disabled={deletingId === p._id}
                                    >
                                      {deletingId === p._id ? (
                                        <span
                                          className={`spinner-border spinner-border-sm ${styles.loadingSpinner}`}
                                          role="status"
                                          aria-hidden="true"
                                        ></span>
                                      ) : (
                                        "Delete"
                                      )}
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className={`btn btn-sm btn-outline-success ${styles.actionButton}`}
                                    onClick={() => confirmParticipation(p._id)}
                                    disabled={
                                      !checkboxStates[p._id] ||
                                      confirmingId === p._id
                                    }
                                  >
                                    {confirmingId === p._id
                                      ? "Confirming..."
                                      : "Issue Certificate"}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminParticipation;
