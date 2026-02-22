import axios from 'axios'

const rawBackendBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const backendBaseUrl = rawBackendBaseUrl.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: `${backendBaseUrl}/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
