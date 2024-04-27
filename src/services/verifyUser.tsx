import axios from 'axios';

export const fetchToken = async (token: string) => {
  if (!token) {
    console.log('No token found');
    return null;
  }

  console.log('Token from QR code:', token);

  try {
  const response = await axios.get('https://amr.sytes.net/mobile/protected', {
    headers: {
      Cookie: `token=${token}`,
    },
  });

    const userToken = response.status;
    console.log('User Token:', userToken);
    // console.log('Response data:', response.status);
    console.log('Response status:', response.status);
    if (response.status === 200) {
      console.log('Bus Pass is valid');
      console.log(response.data);
      return userToken; // Return user data if student is valid
    } else if (response.status === 403 || response.status === 401) {
      console.log('Bus Pass is Invalid');
      return null; // Return null or handle accordingly if student is not valid
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
