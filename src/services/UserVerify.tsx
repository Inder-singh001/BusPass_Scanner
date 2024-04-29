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

    const userToken = response;
    // console.log('User Token:', userToken);
    console.log('Response status:', response.status);
    return response;
  } catch (error: any) {
    return error.response; // Return null or handle accordingly if student is not valid
  }
};
