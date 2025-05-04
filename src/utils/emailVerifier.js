import axios from 'axios';

export const verifyEmailWithGoogle = async (email) => {
  try {
    // Use Google's People API to verify email
    const response = await axios.get(`https://people.googleapis.com/v1/people/me/connections`, {
      params: {
        personFields: 'emailAddresses',
        key: process.env.REACT_APP_GOOGLE_API_KEY
      }
    });

    // Check if the email exists in the response
    const emailExists = response.data.connections?.some(connection => 
      connection.emailAddresses?.some(addr => addr.value === email)
    );

    return {
      exists: emailExists,
      message: emailExists ? 'Email verified successfully' : 'Email not found'
    };
  } catch (error) {
    console.error('Error verifying email:', error);
    return {
      exists: false,
      message: 'Error verifying email'
    };
  }
}; 