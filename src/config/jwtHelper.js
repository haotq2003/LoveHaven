// src/utils/jwtHelper.js
export const getEmailFromToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.email;
  } catch (e) {
    console.error('Không thể giải mã token:', e);
    return null;
  }
};
