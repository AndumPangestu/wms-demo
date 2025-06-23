import WebSocket from "ws";
import { APP_PORT } from "./config";
import { logger } from "./logging";

const wss = new WebSocket.Server({ port: Number(3001) });

wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket");
});

wss.on("error", (err) => {
    logger.error("WebSocket error:", err);
});

export function sendNotification(message: string) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            logger.info("Sending notification to client");
            client.send(message);
        }
    });
}
