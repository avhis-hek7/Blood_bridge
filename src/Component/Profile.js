// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";
// import {
//   FaEnvelope,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaUserTie,
//   FaClock,
//   FaHourglassHalf,
//   FaCheckCircle,
//   FaTimesCircle,
// } from "react-icons/fa";
// import UserTimeout from "./UserTimeout";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [currentParticipation, setCurrentParticipation] = useState(null);
//   const [participationHistory, setParticipationHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [authToken] = useState(localStorage.getItem("authToken"));
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const [nextEligibleDate, setNextEligibleDate] = useState(null);
//   const [eligibilityData, setEligibilityData] = useState(null);
//   const [eventDurations, setEventDurations] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!authToken) {
//       navigate("/");
//     } else {
//       fetchUserData();
//     }

//     const eligibility = localStorage.getItem("eligibility");
//     if (eligibility) {
//       try {
//         setEligibilityData(JSON.parse(eligibility));
//       } catch (error) {
//         console.error("Invalid eligibility data in localStorage");
//       }
//     }
//   }, [authToken, navigate]);

//   const fetchUserData = async () => {
//     try {
//       const userResponse = await axios.post(
//         "http://localhost:5000/api/auth/getuser",
//         {},
//         { headers: { "auth-token": authToken } }
//       );
//       const userData = userResponse.data;
//       setUser(userData);

//       const [historyResponse, durationResponse] = await Promise.all([
//         axios.post(
//           "http://localhost:5000/api/participation/get-all-participations",
//           { email: userData.email },
//           { headers: { "auth-token": authToken } }
//         ),
//         axios.get("http://localhost:5000/api/authevent"),
//       ]);

//       const allDurations = durationResponse.data || [];
//       setEventDurations(allDurations);

//       // Attach durations and enrich history
//       const enrichedHistory = (historyResponse.data || []).map((record) => {
//         const matched = allDurations.find(
//           (e) => e.title === record.event.title
//         );
//         record.event.duration = matched?.duration || { hours: 1, minutes: 0 };
//         return record;
//       });

//       // Find current participation (ongoing or upcoming)
//       const current = enrichedHistory.find((record) => {
//         const status = getEventStatus(record.event);
//         return status === "ongoing" || status === "upcoming";
//       });
//       setCurrentParticipation(current);

//       // Filter only completed events for history
//       const pastEvents = enrichedHistory
//         .filter((record) => getEventStatus(record.event) === "completed")
//         .sort(
//           (a, b) => new Date(b.participatedAt) - new Date(a.participatedAt)
//         );
//       setParticipationHistory(pastEvents);

//       // Set eligibility countdown based on most recent participation
//       const mostRecentParticipation = enrichedHistory[0];
//       if (mostRecentParticipation?.participatedAt) {
//         const lastDonationDate = new Date(
//           mostRecentParticipation.participatedAt
//         );
//         const eligibleDate = new Date(lastDonationDate);
//         eligibleDate.setDate(eligibleDate.getDate() + 90);
//         setNextEligibleDate(eligibleDate);
//         startCountdown(eligibleDate);
//       }
//     } catch (err) {
//       console.error("Error fetching user or participation data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startCountdown = (eligibleDate) => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const diff = eligibleDate - now;
//       if (diff <= 0) {
//         clearInterval(interval);
//         setTimeRemaining("✅ You are now eligible to participate again!");
//       } else {
//         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((diff / (1000 * 60)) % 60);
//         const seconds = Math.floor((diff / 1000) % 60);
//         setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//       }
//     }, 1000);
//   };

//   const getEventStatus = (event) => {
//     if (!event?.date) return "completed";

//     const now = new Date().getTime();
//     const start = new Date(event.date).getTime();

//     const durationHours = parseInt(event.duration?.hours || 0);
//     const durationMinutes = parseInt(event.duration?.minutes || 0);
//     const durationMs = (durationHours * 60 + durationMinutes) * 60 * 1000;

//     const end = start + durationMs;

//     if (now < start) return "upcoming";
//     if (now >= start && now < end) return "ongoing";
//     return "completed";
//   };

//   if (loading) {
//     return (
//       <div className="text-center profile-loading">
//         <div className="spinner-border text-primary" role="status" />
//         <p className="mt-3">Loading your profile...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="alert alert-danger profile-alert">
//         ❌ User data not found. Please log in again.
//       </div>
//     );
//   }

//   const getCurrentEventStatus = () => {
//     if (!currentParticipation) return null;
//     return getEventStatus(currentParticipation.event);
//   };

//   const currentEventStatus = getCurrentEventStatus();

//   return (
//     <div className="container mt-5 profile-container animate-fade-slide">
//       <UserTimeout />
//       <div className="row">
//         <div className="col-12">
//           <h2 className="profile-heading">My Profile</h2>
//           {statusMessage && (
//             <div className="alert alert-info">{statusMessage}</div>
//           )}

//           {/* User Info Card */}
//           <div className="card profile-card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{user.name}</h5>
//               <p className="card-text">
//                 <FaEnvelope className="me-2 text-primary" />
//                 <strong>Email:</strong> {user.email}
//               </p>
//             </div>
//           </div>

//           {/* Eligibility Info */}
//           {eligibilityData && (
//             <div className="card profile-card mb-4">
//               <div className="card-body">
//                 <h5 className="card-title">Eligibility Info</h5>
//                 <p className="card-text">
//                   <strong>Age:</strong> {eligibilityData.age}
//                 </p>
//                 <p className="card-text">
//                   <strong>Weight:</strong> {eligibilityData.weight} kg
//                 </p>
//                 <p className="card-text">
//                   <strong>Last Donation Date:</strong>{" "}
//                   {eligibilityData.lastDonationDate
//                     ? new Date(
//                         eligibilityData.lastDonationDate
//                       ).toLocaleDateString()
//                     : "N/A"}
//                 </p>
//                 <p className="card-text">
//                   <strong>Health Status:</strong>{" "}
//                   {eligibilityData.healthStatus || "N/A"}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Current Event (Ongoing or Upcoming) */}
//           {currentParticipation ? (
//             <div className="mt-4">
//               <h4 className="section-heading">
//                 {currentEventStatus === "ongoing"
//                   ? "Current Event (Ongoing)"
//                   : "Current Event (Upcoming)"}
//               </h4>
//               <div
//                 className={`card profile-card mb-4 ${
//                   currentEventStatus === "ongoing"
//                     ? "border-warning"
//                     : "border-success"
//                 }`}
//               >
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     {currentParticipation.event.title || "Untitled Event"}
//                   </h5>
//                   <p className="card-text">
//                     <FaCalendarAlt className="me-2 text-success" />
//                     <strong>Event Date:</strong>{" "}
//                     {currentParticipation.event.date
//                       ? new Date(
//                           currentParticipation.event.date
//                         ).toLocaleString()
//                       : "N/A"}
//                   </p>
//                   <p className="card-text">
//                     <FaMapMarkerAlt className="me-2 text-danger" />
//                     <strong>Location:</strong>{" "}
//                     {currentParticipation.event.location || "N/A"}
//                   </p>
//                   <p className="card-text">
//                     <FaUserTie className="me-2 text-warning" />
//                     <strong>Organizer:</strong>{" "}
//                     {currentParticipation.event.organizer || "N/A"}
//                   </p>
//                   <p className="card-text">
//                     <FaClock className="me-2 text-secondary" />
//                     <strong>Registration Date:</strong>{" "}
//                     {currentParticipation.participatedAt
//                       ? new Date(
//                           currentParticipation.participatedAt
//                         ).toLocaleString()
//                       : "N/A"}
//                   </p>

//                   {nextEligibleDate && (
//                     <>
//                       <p className="card-text">
//                         <FaHourglassHalf className="me-2 text-info" />
//                         <strong>Next Eligible Date:</strong>{" "}
//                         {new Date(nextEligibleDate).toLocaleString()}
//                       </p>
//                       <p className="card-text text-danger fw-bold">
//                         ⏳ {timeRemaining}
//                       </p>
//                     </>
//                   )}

//                   <p
//                     className={`card-text fw-bold mt-3 ${
//                       currentEventStatus === "ongoing"
//                         ? "text-warning"
//                         : "text-success"
//                     }`}
//                   >
//                     {currentEventStatus === "ongoing" ? (
//                       <>
//                         <FaHourglassHalf className="me-1" /> Ongoing Event
//                       </>
//                     ) : (
//                       <>
//                         <FaCheckCircle className="me-1" /> Upcoming Event
//                       </>
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="alert alert-warning profile-alert mt-4 mb-4">
//               You have no current events (ongoing or upcoming).
//             </div>
//           )}

//           {/* Past Events History */}
//           <div className="mt-5">
//             <h4 className="section-heading">Past Events</h4>
//             {participationHistory.length === 0 ? (
//               <div className="alert alert-info profile-alert">
//                 No past events yet.
//               </div>
//             ) : (
//               participationHistory.map((record, index) => (
//                 <div
//                   key={index}
//                   className="card profile-card mb-3 border-secondary"
//                 >
//                   <div className="card-body">
//                     <h5 className="card-title">{record.event.title}</h5>
//                     <p className="card-text">
//                       <FaCalendarAlt className="me-2" />
//                       <strong>Event Date:</strong>{" "}
//                       {record.event.date
//                         ? new Date(record.event.date).toLocaleString()
//                         : "N/A"}
//                     </p>
//                     <p className="card-text">
//                       <FaMapMarkerAlt className="me-2" />
//                       <strong>Location:</strong>{" "}
//                       {record.event.location || "N/A"}
//                     </p>
//                     <p className="card-text">
//                       <FaClock className="me-2" />
//                       <strong>Participated At:</strong>{" "}
//                       {record.participatedAt
//                         ? new Date(record.participatedAt).toLocaleString()
//                         : "N/A"}
//                     </p>

//                     <p className="card-text fw-bold mt-3 text-muted">
//                       <FaTimesCircle className="me-1" /> Past Event
//                     </p>

//                     {!record.certificateIssued && (
//                       <button
//                         className="btn btn-outline-primary mt-2"
//                         onClick={async () => {
//                           try {
//                             const res = await axios.post(
//                               "http://localhost:5000/api/participation/issue-certificate",
//                               {
//                                 email: user.email,
//                                 eventTitle: record.event.title,
//                               },
//                               { headers: { "auth-token": authToken } }
//                             );
//                             alert(
//                               res.data.message ||
//                                 "Certificate issued successfully!"
//                             );
//                             fetchUserData(); // Refresh data
//                           } catch (err) {
//                             console.error("Certificate issue failed:", err);
//                             alert(
//                               err.response?.data?.error ||
//                                 "Failed to issue certificate. Please try again."
//                             );
//                           }
//                         }}
//                       >
//                         🧾 Get Certificate
//                       </button>
//                     )}

//                     {record.certificateIssued && (
//                       <p className="text-success mt-2 fw-bold">
//                         🟢 Certificate already issued.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
  FaClock,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import UserTimeout from "./UserTimeout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentParticipation, setCurrentParticipation] = useState(null);
  const [participationHistory, setParticipationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [nextEligibleDate, setNextEligibleDate] = useState(null);
  const [eligibilityData, setEligibilityData] = useState(null);
  const [eventDurations, setEventDurations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    } else {
      fetchUserData();
    }

    const eligibility = localStorage.getItem("eligibility");
    if (eligibility) {
      try {
        setEligibilityData(JSON.parse(eligibility));
      } catch (error) {
        console.error("Invalid eligibility data in localStorage");
      }
    }
  }, [authToken, navigate]);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.post(
        "http://localhost:5000/api/auth/getuser",
        {},
        { headers: { "auth-token": authToken } }
      );
      const userData = userResponse.data;
      setUser(userData);

      const [historyResponse, durationResponse] = await Promise.all([
        axios.post(
          "http://localhost:5000/api/participation/get-all-participations",
          { email: userData.email },
          { headers: { "auth-token": authToken } }
        ),
        axios.get("http://localhost:5000/api/authevent"),
      ]);

      const allDurations = durationResponse.data || [];
      setEventDurations(allDurations);

      const enrichedHistory = (historyResponse.data || []).map((record) => {
        const matched = allDurations.find(
          (e) => e.title === record.event.title
        );
        record.event.duration = matched?.duration || { hours: 1, minutes: 0 };
        return record;
      });

      const current = enrichedHistory.find((record) => {
        const status = getEventStatus(record.event);
        return status === "ongoing" || status === "upcoming";
      });
      setCurrentParticipation(current);

      const pastEvents = enrichedHistory
        .filter((record) => getEventStatus(record.event) === "completed")
        .sort(
          (a, b) => new Date(b.participatedAt) - new Date(a.participatedAt)
        );
      setParticipationHistory(pastEvents);

      const mostRecentParticipation = enrichedHistory[0];
      if (mostRecentParticipation?.participatedAt) {
        const lastDonationDate = new Date(
          mostRecentParticipation.participatedAt
        );
        const eligibleDate = new Date(lastDonationDate);
        eligibleDate.setDate(eligibleDate.getDate() + 90);
        setNextEligibleDate(eligibleDate);
        startCountdown(eligibleDate);
      }
    } catch (err) {
      console.error("Error fetching user or participation data:", err);
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = (eligibleDate) => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eligibleDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining("✅ You are now eligible to participate again!");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  const getEventStatus = (event) => {
    if (!event?.date) return "completed";

    const now = new Date().getTime();
    const start = new Date(event.date).getTime();

    const durationHours = parseInt(event.duration?.hours || 0);
    const durationMinutes = parseInt(event.duration?.minutes || 0);
    const durationMs = (durationHours * 60 + durationMinutes) * 60 * 1000;

    const end = start + durationMs;

    if (now < start) return "upcoming";
    if (now >= start && now < end) return "ongoing";
    return "completed";
  };

  if (loading) {
    return (
      <div className="text-center profile-loading">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-danger profile-alert">
        ❌ User data not found. Please log in again.
      </div>
    );
  }

  const getCurrentEventStatus = () => {
    if (!currentParticipation) return null;
    return getEventStatus(currentParticipation.event);
  };

  const currentEventStatus = getCurrentEventStatus();

  return (
    <div className="container mt-5 profile-container animate-fade-slide">
      <UserTimeout />
      <div className="row">
        <div className="col-12">
          <h2 className="profile-heading">My Profile</h2>
          {statusMessage && (
            <div className="alert alert-info">{statusMessage}</div>
          )}

          {/* User Info Card */}
          <div className="card profile-card mb-4">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          {/* Eligibility Info */}
          {eligibilityData && (
            <div className="card profile-card mb-4">
              <div className="card-body">
                <h5 className="card-title">Eligibility Info</h5>
                <p className="card-text">
                  <strong>Age:</strong> {eligibilityData.age}
                </p>
                <p className="card-text">
                  <strong>Weight:</strong> {eligibilityData.weight} kg
                </p>
                <p className="card-text">
                  <strong>Last Donation Date:</strong>{" "}
                  {eligibilityData.lastDonationDate
                    ? new Date(
                        eligibilityData.lastDonationDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="card-text">
                  <strong>Health Status:</strong>{" "}
                  {eligibilityData.healthStatus || "N/A"}
                </p>
              </div>
            </div>
          )}

          {/* Current Event (Ongoing or Upcoming) */}
          {currentParticipation ? (
            <div className="mt-4">
              <h4 className="section-heading">
                {currentEventStatus === "ongoing"
                  ? "Current Event (Ongoing)"
                  : "Current Event (Upcoming)"}
              </h4>
              <div
                className={`card profile-card mb-4 ${
                  currentEventStatus === "ongoing"
                    ? "border-warning"
                    : "border-success"
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {currentParticipation.event.title || "Untitled Event"}
                  </h5>
                  <p className="card-text">
                    <FaCalendarAlt className="me-2 text-success" />
                    <strong>Event Date:</strong>{" "}
                    {currentParticipation.event.date
                      ? new Date(
                          currentParticipation.event.date
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                  <p className="card-text">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    <strong>Location:</strong>{" "}
                    {currentParticipation.event.location || "N/A"}
                  </p>
                  <p className="card-text">
                    <FaUserTie className="me-2 text-warning" />
                    <strong>Organizer:</strong>{" "}
                    {currentParticipation.event.organizer || "N/A"}
                  </p>
                  <p className="card-text">
                    <FaClock className="me-2 text-secondary" />
                    <strong>Registration Date:</strong>{" "}
                    {currentParticipation.participatedAt
                      ? new Date(
                          currentParticipation.participatedAt
                        ).toLocaleString()
                      : "N/A"}
                  </p>

                  {nextEligibleDate && (
                    <>
                      <p className="card-text">
                        <FaHourglassHalf className="me-2 text-info" />
                        <strong>Next Eligible Date:</strong>{" "}
                        {new Date(nextEligibleDate).toLocaleString()}
                      </p>
                      <p className="card-text text-danger fw-bold">
                        ⏳ {timeRemaining}
                      </p>
                    </>
                  )}

                  <p
                    className={`card-text fw-bold mt-3 ${
                      currentEventStatus === "ongoing"
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {currentEventStatus === "ongoing" ? (
                      <>
                        <FaHourglassHalf className="me-1" /> Ongoing Event
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="me-1" /> Upcoming Event
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning profile-alert mt-4 mb-4">
              You have no current events (ongoing or upcoming).
            </div>
          )}

          {/* Past Events History */}
          <div className="mt-5">
            <h4 className="section-heading">Past Events</h4>
            {participationHistory.length === 0 ? (
              <div className="alert alert-info profile-alert">
                No past events yet.
              </div>
            ) : (
              participationHistory.map((record, index) => (
                <div
                  key={index}
                  className="card profile-card mb-3 border-secondary"
                >
                  <div className="card-body">
                    <h5 className="card-title">{record.event.title}</h5>
                    <p className="card-text">
                      <FaCalendarAlt className="me-2" />
                      <strong>Event Date:</strong>{" "}
                      {record.event.date
                        ? new Date(record.event.date).toLocaleString()
                        : "N/A"}
                    </p>
                    <p className="card-text">
                      <FaMapMarkerAlt className="me-2" />
                      <strong>Location:</strong>{" "}
                      {record.event.location || "N/A"}
                    </p>
                    <p className="card-text">
                      <FaClock className="me-2" />
                      <strong>Participated At:</strong>{" "}
                      {record.participatedAt
                        ? new Date(record.participatedAt).toLocaleString()
                        : "N/A"}
                    </p>

                    <p className="card-text fw-bold mt-3 text-muted">
                      <FaTimesCircle className="me-1" /> Past Event
                    </p>

                    {record.certificateIssued && (
                      <p className="text-success mt-2 fw-bold">
                        🟢 Certificate already issued.
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
