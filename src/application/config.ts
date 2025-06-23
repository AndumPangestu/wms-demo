import dotenv from "dotenv";

dotenv.config();

export const APP_URL = process.env.APP_URL as string;
export const APP_PORT = process.env.APP_PORT as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const SHARED_FOLDER_PATH = process.env.SHARED_FOLDER_PATH as string;