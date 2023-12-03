import axios from "axios";

const baseRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseRequest;
