import React from "react";
import { FaUserCircle, FaPhone, FaEnvelope, FaBirthdayCake, FaTint, FaVenusMars, FaMapMarkerAlt } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 234 567 890",
    email: "john@example.com",
    dob: "1990-05-15",
    bloodGroup: "O+",
    gender: "Male",
    address: "123 Main St, New York, NY",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 987 654 321",
    email: "jane@example.com",
    dob: "1995-09-22",
    bloodGroup: "A-",
    gender: "Female",
    address: "456 Elm St, Los Angeles, CA",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 987 654 321",
    email: "jane@example.com",
    dob: "1995-09-22",
    bloodGroup: "A-",
    gender: "Female",
    address: "456 Elm St, Los Angeles, CA",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 987 654 321",
    email: "jane@example.com",
    dob: "1995-09-22",
    bloodGroup: "A-",
    gender: "Female",
    address: "456 Elm St, Los Angeles, CA",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 987 654 321",
    email: "jane@example.com",
    dob: "1995-09-22",
    bloodGroup: "A-",
    gender: "Female",
    address: "456 Elm St, Los Angeles, CA",
  },
];

const ProfileCard = ({ user }) => {
  return (
    <div className="col-md-6 ">
      <div className="card hcard shadow-sm">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center bg-light">
            <FaUserCircle size={80} className="text-secondary" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">
                <FaPhone className="text-danger me-2" /> {user.phone} <br />
                <FaEnvelope className="text-info me-2" /> {user.email} <br />
                <FaBirthdayCake className="text-warning me-2" /> {user.dob} <br />
                <FaTint className="text-danger me-2" /> Blood Group: {user.bloodGroup} <br />
                <FaVenusMars className="text-pink me-2" /> Gender: {user.gender} <br />
                <FaMapMarkerAlt className="text-success me-2" /> {user.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">User Profiles</h1>
      <div className="row g-4">
        {users.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
