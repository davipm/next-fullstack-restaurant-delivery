import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const api = axios.create({
  baseURL: `${serverUrl}/api`,
});

export default api;
