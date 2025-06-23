import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { NODE_ENV } from "./config";
import path from "path";

// Tentukan level berdasarkan environment
const level = NODE_ENV === "production" ? "info" : "debug";

// Format tanggal untuk nama file
const datePattern = "YYYY-MM-DD";

// Logger untuk semua level log
const loggerTransport = new DailyRotateFile({
  filename: path.join("logging", "logger", `%DATE%.log`),
  datePattern,
  zippedArchive: false,
  maxSize: "100m",
  maxFiles: "14d",
});

// Logger khusus error
const errorTransport = new DailyRotateFile({
  filename: path.join("logging", "error", `%DATE%.log`),
  datePattern,
  level: "error",
  zippedArchive: false,
  maxSize: "100m",
  maxFiles: "30d",
});

// Buat logger utama
export const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    loggerTransport,
    errorTransport,
  ],
});

// Tambahkan console logger di development
if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
