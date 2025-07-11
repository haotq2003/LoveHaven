// src/config/jwtHelper.js
import { jwtDecode } from 'jwt-decode';

export const getEmailFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.email || decoded.sub || null;
  } catch (e) {
    console.error('❌ Không thể giải mã token:', e);
    return null;
  }
};
