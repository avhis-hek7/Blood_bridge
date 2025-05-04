import React, { useState } from "react";
const TermsAndConditions = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    alert("Thank you for agreeing to the Terms and Conditions.");
  };

  return (
    <div className=" container terms-container">
      <h1 className="text-center my-4">Terms and Conditions</h1>
      <p className="text-muted text-center">Last Updated: March 2025</p>
        <p style={{textAlign: 'center'}}>
          By using this website, you acknowledge and agree to abide by the terms and conditions set forth herein. 
          Our blood donation platform operates to facilitate the process of voluntary blood donation by connecting 
          donors with recipients in need. Users must be at least 18 years old to register as donors, and all donations 
          must comply with legal and medical eligibility criteria. We do not guarantee the availability of donors or the 
          safety of transfusions, as this is managed by certified medical professionals. Users are responsible for 
          providing accurate and truthful information when registering, and any false or misleading information may 
          result in suspension or removal from the platform. We are committed to protecting your personal data, 
          ensuring that all collected information is securely stored and only shared with authorized health organizations. 
          We do not sell or distribute personal data to third parties without user consent. By registering and using this 
          platform, you agree that any health complications arising from donation are not the responsibility of the website 
          operators. The terms and conditions outlined here are subject to change, and it is the responsibility of users 
          to stay informed about updates. For any concerns regarding these terms, please contact us at the provided 
          email address.
        </p>

      <div className="text-center my-4">
        <input 
          type="checkbox" 
          id="agree" 
          checked={agreed} 
          onChange={() => setAgreed(!agreed)} 
        />
        <label htmlFor="agree" className="mx-2">I agree to the Terms and Conditions</label>
        <br />
        <button 
          className="btn btn-danger mt-3" 
          disabled={!agreed} 
          onClick={handleAgree}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;



// import React, { useState } from 'react';

// const bloodBanksData = {
//   Bhojpur: [
//     { name: 'Bhojpur District Hospital Blood Bank', address: 'Bhojpur Municipality' },
//   ],
//   Dhankuta: [
//     { name: 'Dhankuta District Hospital Blood Bank', address: 'Dhankuta Municipality' },
//   ],
//   Ilam: [
//     { name: 'Ilam District Hospital Blood Bank', address: 'Ilam Municipality' },
//   ],
//   Jhapa: [
//     { name: 'Mechi Zonal Hospital Blood Bank', address: 'Bhadrapur, Jhapa' },
//     { name: 'Koshi Zonal Hospital Blood Bank', address: 'Biratnagar' },
//   ],
//   Khotang: [
//     { name: 'Khotang District Hospital Blood Bank', address: 'Diktel' },
//   ],
//   Morang: [
//     { name: 'Koshi Zonal Hospital Blood Bank', address: 'Biratnagar' },
//     { name: 'Nobel Medical College Blood Bank', address: 'Biratnagar' },
//   ],
//   Okhaldhunga: [
//     { name: 'Okhaldhunga District Hospital Blood Bank', address: 'Okhaldhunga Municipality' },
//   ],
//   Panchthar: [
//     { name: 'Panchthar District Hospital Blood Bank', address: 'Phidim' },
//   ],
//   Sankhuwasabha: [
//     { name: 'Sankhuwasabha District Hospital Blood Bank', address: 'Khandbari' },
//   ],
//   Solukhumbu: [
//     { name: 'Solukhumbu District Hospital Blood Bank', address: 'Salleri' },
//   ],
//   Sunsari: [
//     { name: 'BP Koirala Institute of Health Sciences (BPKIHS) Blood Bank', address: 'Dharan' },
//     { name: 'Sunsari District Hospital Blood Bank', address: 'Inaruwa' },
//   ],
//   Taplejung: [
//     { name: 'Taplejung District Hospital Blood Bank', address: 'Taplejung Municipality' },
//   ],
//   Terhathum: [
//     { name: 'Terhathum District Hospital Blood Bank', address: 'Myanglung' },
//   ],
//   Udayapur: [
//     { name: 'Udayapur District Hospital Blood Bank', address: 'Gaighat' },
//   ],
//   Bara: [
//     { name: 'Bara District Hospital Blood Bank', address: 'Kalaiya' },
//   ],
//   Dhanusha: [
//     { name: 'Janakpur Provincial Hospital Blood Bank', address: 'Janakpur' },
//   ],
//   Mahottari: [
//     { name: 'Mahottari District Hospital Blood Bank', address: 'Jaleshwar' },
//   ],
//   Parsa: [
//     { name: 'Narayani Hospital Blood Bank', address: 'Birgunj' },
//   ],
//   Rautahat: [
//     { name: 'Rautahat District Hospital Blood Bank', address: 'Gaur' },
//   ],
//   Saptari: [
//     { name: 'Saptari District Hospital Blood Bank', address: 'Rajbiraj' },
//   ],
//   Sarlahi: [
//     { name: 'Sarlahi District Hospital Blood Bank', address: 'Malangwa' },
//   ],
//   Siraha: [
//     { name: 'Siraha District Hospital Blood Bank', address: 'Siraha' },
//   ],
//   Bhaktapur: [
//     { name: 'Bhaktapur Hospital Blood Bank', address: 'Bhaktapur' },
//   ],
//   Chitwan: [
//     { name: 'Bharatpur Hospital Blood Bank', address: 'Bharatpur' },
//     { name: 'Chitwan Medical College Blood Bank', address: 'Bharatpur' },
//   ],
//   Dhading: [
//     { name: 'Dhading District Hospital Blood Bank', address: 'Dhading Besi' },
//   ],
//   Dolakha: [
//     { name: 'Dolakha District Hospital Blood Bank', address: 'Charikot' },
//   ],
//   Kathmandu: [
//     { name: 'Central Blood Transfusion Service (Red Cross)', address: 'Teku, Kathmandu' },
//     { name: 'Tribhuvan University Teaching Hospital (TUTH) Blood Bank', address: 'Maharajgunj' },
//     { name: 'Patan Hospital Blood Bank', address: 'Lagankhel' },
//   ],
//   Kavrepalanchok: [
//     { name: 'Dhulikhel Hospital Blood Bank', address: 'Dhulikhel' },
//   ],
//   Lalitpur: [
//     { name: 'Patan Hospital Blood Bank', address: 'Lagankhel' },
//   ],
//   Makwanpur: [
//     { name: 'Hetauda Hospital Blood Bank', address: 'Hetauda' },
//   ],
//   Nuwakot: [
//     { name: 'Nuwakot District Hospital Blood Bank', address: 'Bidur' },
//   ],
//   Ramechhap: [
//     { name: 'Ramechhap District Hospital Blood Bank', address: 'Manthali' },
//   ],
//   Rasuwa: [
//     { name: 'Rasuwa District Hospital Blood Bank', address: 'Dhunche' },
//   ],
//   Sindhuli: [
//     { name: 'Sindhuli District Hospital Blood Bank', address: 'Sindhuli Madhi' },
//   ],
//   Sindhupalchok: [
//     { name: 'Sindhupalchok District Hospital Blood Bank', address: 'Chautara' },
//   ],
//   Baglung: [
//     { name: 'Baglung District Hospital Blood Bank', address: 'Baglung' },
//   ],
//   Gorkha: [
//     { name: 'Gorkha District Hospital Blood Bank', address: 'Gorkha' },
//   ],
//   Kaski: [
//     { name: 'Western Regional Hospital Blood Bank', address: 'Pokhara' },
//     { name: 'Manipal Teaching Hospital Blood Bank', address: 'Pokhara' },
//   ],
//   Lamjung: [
//     { name: 'Lamjung District Hospital Blood Bank', address: 'Besisahar' },
//   ],
//   Manang: [
//     { name: 'Manang District Hospital Blood Bank', address: 'Chame' },
//   ],
//   Mustang: [
//     { name: 'Mustang District Hospital Blood Bank', address: 'Jomsom' },
//   ],
//   Myagdi: [
//     { name: 'Myagdi District Hospital Blood Bank', address: 'Beni' },
//   ],
//   Nawalpur: [
//     { name: 'Nawalpur District Hospital Blood Bank', address: 'Kawasoti' },
//   ],
//   Parbat: [
//     { name: 'Parbat District Hospital Blood Bank', address: 'Kusma' },
//   ],
//   Syangja: [
//     { name: 'Syangja District Hospital Blood Bank', address: 'Putalibazar' },
//   ],
//   Tanahun: [
//     { name: 'Tanahun District Hospital Blood Bank', address: 'Damauli' },
//   ],
//   Arghakhanchi: [
//     { name: 'Arghakhanchi District Hospital Blood Bank', address: 'Sandhikharka' },
//   ],
//   Banke: [
//     { name: 'Bheri Hospital Blood Bank', address: 'Nepalgunj' },
//   ],
//   Bardiya: [
//     { name: 'Bardiya District Hospital Blood Bank', address: 'Gulariya' },
//   ],
//   Dang: [
//     { name: 'Rapti Provincial Hospital Blood Bank', address: 'Tulsipur' },
//   ],
//   Gulmi: [
//     { name: 'Gulmi District Hospital Blood Bank', address: 'Tamghas' },
//   ],
//   Kapilvastu: [
//     { name: 'Kapilvastu District Hospital Blood Bank', address: 'Taulihawa' },
//   ],
//   Palpa: [
//     { name: 'Palpa District Hospital Blood Bank', address: 'Tansen' },
//   ],
//   Pyuthan: [
//     { name: 'Pyuthan District Hospital Blood Bank', address: 'Pyuthan' },
//   ],
//   Rolpa: [
//     { name: 'Rolpa District Hospital Blood Bank', address: 'Liwang' },
//   ],
//   Rukum: [
//     { name: 'Rukum District Hospital Blood Bank', address: 'Rukumkot' },
//   ],
//   Rupandehi: [
//     { name: 'Lumbini Provincial Hospital Blood Bank', address: 'Butwal' },
//     { name: 'Bhim Hospital Blood Bank', address: 'Bhairahawa' },
//   ],
//   Dailekh: [
//     { name: 'Dailekh District Hospital Blood Bank', address: 'Dailekh' },
//   ],
//   Dolpa: [
//     { name: 'Dolpa District Hospital Blood Bank', address: 'Dunai' },
//   ],
//   Humla: [
//     { name: 'Humla District Hospital Blood Bank', address: 'Simikot' },
//   ],
//   Jajarkot: [
//     { name: 'Jajarkot District Hospital Blood Bank', address: 'Khalanga' },
//   ],
//   Jumla: [
//     { name: 'Karnali Academy of Health Sciences Blood Bank', address: 'Jumla' },
//   ],
//   Kalikot: [
//     { name: 'Kalikot District Hospital Blood Bank', address: 'Manma' },
//   ],
//   Mugu: [
//     { name: 'Mugu District Hospital Blood Bank', address: 'Gamgadhi' },
//   ],
//   RukumWest: [
//     { name: 'Rukum West District Hospital Blood Bank', address: 'Musikot' },
//   ],
//   Salyan: [
//     { name: 'Salyan District Hospital Blood Bank', address: 'Salyan' },
//   ],
//   Surkhet: [
//     { name: 'Surkhet District Hospital Blood Bank', address: 'Birendranagar' },
//   ],
//   Achham: [
//     { name: 'Achham District Hospital Blood Bank', address: 'Mangalsen' },
//   ],
//   Baitadi: [
//     { name: 'Baitadi District Hospital Blood Bank', address: 'Dasharathchand' },
//   ],
//   Bajhang: [
//     { name: 'Bajhang District Hospital Blood Bank', address: 'Chainpur' },
//   ],
//   Bajura: [
//     { name: 'Bajura District Hospital Blood Bank', address: 'Martadi' },
//   ],
//   Dadeldhura: [
//     { name: 'Dadeldhura District Hospital Blood Bank', address: 'Dadeldhura' },
//   ],
//   Darchula: [
//     { name: 'Darchula District Hospital Blood Bank', address: 'Darchula' },
//   ],
//   Doti: [
//     { name: 'Doti District Hospital Blood Bank', address: 'Dipayal' },
//   ],
//   Kailali: [
//     { name: 'Seti Provincial Hospital Blood Bank', address: 'Dhangadhi' },
//   ],
//   Kanchanpur: [
//     { name: 'Mahakali Hospital Blood Bank', address: 'Mahendranagar' },
//   ],
// };

// function BloodBankSearch() {
//   const [district, setDistrict] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = () => {
//     const matchedDistrict = Object.keys(bloodBanksData).find(
//       key => key.toLowerCase() === district.trim().toLowerCase()
//     );
//     setResults(bloodBanksData[matchedDistrict] || []);
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Nepal Blood Bank Finder</h1>
//       <input
//         type="text"
//         value={district}
//         onChange={(e) => setDistrict(e.target.value)}
//         placeholder="Enter district name"
//         className="border p-2 w-full mb-2"
//       />
//       <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Search
//       </button>
//       <div className="mt-4">
//         {results.length === 0 ? (
//           <p>No blood bank found for the entered district.</p>
//         ) : (
//           results.map((bank, index) => (
//             <div key={index} className="border p-2 mb-2 rounded shadow">
//               <p className="font-semibold">{bank.name}</p>
//               <p className="text-sm">Address: {bank.address}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default BloodBankSearch;





