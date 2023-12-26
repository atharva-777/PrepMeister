import axios from 'axios'

export const api = axios.create({
  // baseURL: `${process.env.BASE_URL}`,
  // baseURL:"http://localhost:3000/api",
  baseURL:"http://localhost:4000/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});