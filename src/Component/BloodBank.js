import React from "react";

const BloodBankList = () => {
  // Sample blood bank data (can be replaced with API data later)
  const bloodBanks = [
    {
      name: "Red Cross Blood Bank",
      address: "123 Main Street, Kathmandu",
      landmark: "Near City Hospital",
      city: "Kathmandu",
      email: "redcross@bloodbank.com",
      mobile: "+977-9812345678",
      image: "logo1.jpg"
    },
    {
      name: "LifeCare Blood Bank",
      address: "45 New Road, Pokhara",
      landmark: "Opposite Pokhara Mall",
      city: "Pokhara",
      email: "lifecare@bloodbank.com",
      mobile: "+977-9801234567",
      image: "logo1.jpg"
    },
    {
      name: "Health First Blood Bank",
      address: "78 Lakeside, Chitwan",
      landmark: "Near Bharatpur Hospital",
      city: "Chitwan",
      email: "healthfirst@bloodbank.com",
      mobile: "+977-9823456789",
      image: "logo1.jpg"
    },
        {
      name: "Health First Blood Bank",
      address: "78 Lakeside, Chitwan",
      landmark: "Near Bharatpur Hospital",
      city: "Chitwan",
      email: "healthfirst@bloodbank.com",
      mobile: "+977-9823456789",
      image: "logo1.jpg"
    },
        {
      name: "Health First Blood Bank",
      address: "78 Lakeside, Chitwan",
      landmark: "Near Bharatpur Hospital",
      city: "Chitwan",
      email: "healthfirst@bloodbank.com",
      mobile: "+977-9823456789",
      image: "logo1.jpg"
    },
        {
      name: "Health First Blood Bank",
      address: "78 Lakeside, Chitwan",
      landmark: "Near Bharatpur Hospital",
      city: "Chitwan",
      email: "healthfirst@bloodbank.com",
      mobile: "+977-9823456789",
      image: "logo1.jpg"
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Blood Bank Information</h2>
      <div className="row">
        {bloodBanks.map((bank, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={bank.image} className="img-fluid rounded-start" alt={bank.name} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{bank.name}</h5>
                    <p className="card-text"><strong>Address:</strong> {bank.address}</p>
                    <p className="card-text"><strong>Landmark:</strong> {bank.landmark}</p>
                    <p className="card-text"><strong>City:</strong> {bank.city}</p>
                    <p className="card-text"><strong>Email:</strong> {bank.email}</p>
                    <p className="card-text"><strong>Mobile:</strong> {bank.mobile}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodBankList;
