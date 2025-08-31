import axios from 'axios';

export const getGeoLocation = async (ip: string) => {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    if (data.status === 'fail') {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return null;
  }
};

export const generateOtpCode = (digit = 6): string => {
  const digits = '0123456789';
  let otpCode = '';

  for (let i = 0; i < digit; i++) {
    otpCode += digits[Math.floor(Math.random() * 10)];
  }
  return otpCode;
};

export const generateUUID = (): string => {
  const now = new Date().toISOString();
  const ms = Date.parse(now).toString();

  // convert String to Array
  const arr = ms.split('');

  // Shuffle
  arr.sort(() => 0.5 - Math.random());

  // Convert Array to string and return
  return arr.join('');
};

// Get pagination limit if is more thant 100 return 100
export const getLimit = (limit: number): number => {
  return limit > 100 ? 100 : limit;
};

