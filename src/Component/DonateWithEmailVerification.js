// import { useState } from 'react';
// import BloodDonationForm from './Donate';
// import { verifyEmailWithGoogle } from '../utils/emailVerifier';

// export default function DonateWithEmailVerification() {
//   const [verificationStatus, setVerificationStatus] = useState(null);

//   const handleEmailVerification = async (email) => {
//     const result = await verifyEmailWithGoogle(email);
//     setVerificationStatus(result);
//     return result.exists;
//   };

//   return (
//     <div>
//       <BloodDonationForm onEmailVerification={handleEmailVerification} />
//       {verificationStatus && (
//         <div className={`alert ${verificationStatus.exists ? 'alert-success' : 'alert-danger'} mt-3`}>
//           {verificationStatus.message}
//         </div>
//       )}
//     </div>
//   );
// } 