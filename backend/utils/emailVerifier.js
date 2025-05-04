const dns = require('dns');
const { promisify } = require('util');
const resolveMx = promisify(dns.resolveMx);

async function verifyEmailDomain(email) {
  try {
    // Extract domain from email
    const domain = email.split('@')[1];
    
    // Check if domain has valid MX records
    const mxRecords = await resolveMx(domain);
    
    return {
      exists: mxRecords && mxRecords.length > 0,
      message: mxRecords && mxRecords.length > 0 
        ? 'Email domain is valid' 
        : 'Email domain does not exist'
    };
  } catch (error) {
    return {
      exists: false,
      message: 'Invalid email domain'
    };
  }
}

module.exports = verifyEmailDomain; 