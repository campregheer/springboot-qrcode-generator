
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const api = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8080",
});

export const postQrCode = async (text: string) => {
    const response = await api.post('/qrcode', { text });
    console.log(response.data);
    
};
