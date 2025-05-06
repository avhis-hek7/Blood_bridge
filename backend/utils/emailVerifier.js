const dns = require('dns');
const { promisify } = require('util');
const resolveMx = promisify(dns.resolveMx);

// async function verifyEmailDomain(email) {
//   try {
//     // Extract domain from email
//     const domain = email.split('@')[1];
    
//     // Check if domain has valid MX records
//     const mxRecords = await resolveMx(domain);
    
//     return {
//       exists: mxRecords && mxRecords.length > 0,
//       message: mxRecords && mxRecords.length > 0 
//         ? 'Email domain is valid' 
//         : 'Email domain does not exist'
//     };
//   } catch (error) {
//     return {
//       exists: false,
//       message: 'Invalid email domain'
//     };
//   }
// }

async function verifyEmailDomain(email) {
  try {
    // Validate email format first
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { exists: false, message: 'Invalid email format' };
    }

    const domain = email.split('@')[1];
    try {
      const mxRecords = await resolveMx(domain);
      if (mxRecords?.length > 0) {
        return { exists: true, message: 'Email domain is valid (MX records found)' };
      }

      // Fallback to A/AAAA records if no MX records exist
      const addresses = await promisify(dns.resolve4)(domain).catch(() => []);
      const addressesV6 = await promisify(dns.resolve6)(domain).catch(() => []);
      
      if (addresses.length > 0 || addressesV6.length > 0) {
        return { exists: true, message: 'Domain exists but has no MX records' };
      } else {
        return { exists: false, message: 'No MX or A/AAAA records found' };
      }
    } catch (err) {
      if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
        return { exists: false, message: 'Email domain does not exist' };
      }
      throw err;
    }
  } catch (error) {
    console.error('Email verification error:', error);
    return { exists: false, message: 'Error verifying domain' };
  }
}
module.exports = verifyEmailDomain; 