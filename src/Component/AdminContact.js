// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form } from "react-bootstrap";
// import { toast } from "react-toastify";
// import AdminSidebar from './AdminSidebar';
// import './AdminContact.css'; // Optional: external CSS for custom styles

// function AdminContact() {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [responseText, setResponseText] = useState("");
//   const [status, setStatus] = useState("responded");
//   const [showModal, setShowModal] = useState(false);

//   const fetchContacts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/contact");
//       setContacts(res.data);
//     } catch (err) {
//       toast.error("Failed to load contacts");
//     }
//   };

//   const handleRespond = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/contact/${selectedContact._id}/respond`, {
//         response: responseText,
//         status
//       });

//       toast.success("Response sent and contact updated");
//       fetchContacts();
//       setShowModal(false);
//     } catch (err) {
//       toast.error("Failed to send response");
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   return (
//     <div className="d-flex">
//       {/* Sidebar */}
//       <div style={{ minWidth: "250px" }}>
//         <AdminSidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-grow-1 p-4">
//         <h3>Contact Submissions</h3>
//         <table className="table table-striped mt-4">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Message</th>
//               <th>Status</th>
//               <th>Respond</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((contact) => (
//               <tr key={contact._id}>
//                 <td>{contact.name}</td>
//                 <td>{contact.email}</td>
//                 <td>{contact.message}</td>
//                 <td>{contact.status || 'pending'}</td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     onClick={() => {
//                       setSelectedContact(contact);
//                       setResponseText(contact.response || "");
//                       setStatus(contact.status || "responded");
//                       setShowModal(true);
//                     }}
//                   >
//                     Respond
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Modal for response */}
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Respond to {selectedContact?.name}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group>
//                 <Form.Label>Response Message</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={4}
//                   value={responseText}
//                   onChange={(e) => setResponseText(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group className="mt-2">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
//                   <option value="pending">Pending</option>
//                   <option value="responded">Responded</option>
//                   <option value="resolved">Resolved</option>
//                 </Form.Select>
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="success" onClick={handleRespond}>
//               Send Response
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default AdminContact;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminSidebar from './AdminSidebar';
import './AdminContact.css'; // Optional: external CSS for custom styles

function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [status, setStatus] = useState("responded");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // for confirmation modal
  const [contactToDelete, setContactToDelete] = useState(null); // contact to delete

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data);
    } catch (err) {
      toast.error("Failed to load contacts");
    }
  };

  const handleRespond = async () => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${selectedContact._id}/respond`, {
        response: responseText,
        status
      });

      toast.success("Response sent and contact updated");
      fetchContacts();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to send response");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${contactToDelete._id}`);
      toast.success("Contact deleted successfully");
      fetchContacts();
      setShowDeleteModal(false); // Close delete modal
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div style={{ minWidth: "250px" }}>
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <h3>Contact Submissions</h3>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Respond</th>
              <th>Delete</th> {/* New Delete column */}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>{contact.status || 'pending'}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedContact(contact);
                      setResponseText(contact.response || "");
                      setStatus(contact.status || "responded");
                      setShowModal(true);
                    }}
                  >
                    Respond
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setContactToDelete(contact); // Set contact to delete
                      setShowDeleteModal(true); // Show delete confirmation modal
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for response */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Respond to {selectedContact?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Response Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="responded">Responded</option>
                  <option value="resolved">Resolved</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleRespond}>
              Send Response
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this contact submission?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Contact
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminContact;
