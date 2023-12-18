const __DEV__ = process.env.NODE_ENV !== "production";

export const BASE_URL = __DEV__
  ? "http://127.0.0.1:8000"
  : "https://Customers-api.onrender.com";

export const API_URL = `${BASE_URL}/api/customers`;
