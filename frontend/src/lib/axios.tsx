import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "X-Requested": "XHttpRequest",
    accept: "application/json",
    "Content-Type": "application/json",
  },
});