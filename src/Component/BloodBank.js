import React from "react";

const BloodBankList = () => {
  // Blood banks available in Nepal
  const bloodBanks = [
    {
      name: "Red Cross Blood Bank",
      address: "123 Main Street, Kathmandu",
      landmark: "Near City Hospital",
      city: "Kathmandu",
      email: "redcross@bloodbank.com",
      mobile: "+977-9812345678",
      image: "logo1.jpg",
      website: "https://www.redcross.org"
    },
    {
      name: "LifeCare Blood Bank",
      address: "45 New Road, Pokhara",
      landmark: "Opposite Pokhara Mall",
      city: "Pokhara",
      email: "lifecare@bloodbank.com",
      mobile: "+977-9801234567",
      image: "logo1.jpg",
      website: "https://www.lifecarebloodbank.com"
    },
    {
      name: "Health First Blood Bank",
      address: "78 Lakeside, Chitwan",
      landmark: "Near Bharatpur Hospital",
      city: "Chitwan",
      email: "healthfirst@bloodbank.com",
      mobile: "+977-9823456789",
      image: "logo1.jpg",
      website: "https://www.healthfirstbloodbank.com"
    },
    {
      name: "B.P. Koirala Blood Bank",
      address: "Dharan, Sunsari",
      landmark: "Near BPKIHS Hospital",
      city: "Dharan",
      email: "bpkoirala@bloodbank.com",
      mobile: "+977-9841234567",
      image: "logo1.jpg",
      website: "https://www.bpkoiralabloodbank.com"
    },
    {
      name: "Nobel Blood Bank",
      address: "Biratnagar, Morang",
      landmark: "Near Nobel Medical College",
      city: "Biratnagar",
      email: "nobel@bloodbank.com",
      mobile: "+977-9818765432",
      image: "logo1.jpg",
      website: "https://www.nobelbloodbank.com"
    },
    {
      name: "Gandaki Blood Bank",
      address: "Pokhara, Kaski",
      landmark: "Near Gandaki Hospital",
      city: "Pokhara",
      email: "gandaki@bloodbank.com",
      mobile: "+977-9823456780",
      image: "logo1.jpg",
      website: "https://www.gandakibloodbank.com"
    }
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
                    <a href={bank.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
                      Visit Website
                    </a>
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
