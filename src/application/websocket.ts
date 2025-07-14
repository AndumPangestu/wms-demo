import WebSocket from "ws";
import { logger } from "./logging";
import { WS_PORT } from "./config";

const port = parseInt(WS_PORT as string, 10) || 3001;
const wss = new WebSocket.Server({ port: port });


interface ExtWebSocket extends WebSocket {
    topics: Set<string>;
}


wss.on("connection", (ws: WebSocket) => {
    const socket = ws as ExtWebSocket;
    socket.topics = new Set<string>();

    logger.info("Client connected via WebSocket");


    ws.on("message", (data) => {
        try {
            const { action, topic } = JSON.parse(String(data));

            if (action === "subscribe" && typeof topic === "string") {
                socket.topics.add(topic);
                logger.info(`Client subscribed to "${topic}"`);
            } else if (action === "unsubscribe" && typeof topic === "string") {
                socket.topics.delete(topic);
                logger.info(`Client unsubscribed from "${topic}"`);
            }
        } catch (err) {
            logger.warn("Invalid message from client:", err);
        }
    });
});

// ─── Error handler ─────────────────────────────────────────────────────────────
wss.on("error", (err) => {
    logger.error("WebSocket error:", err);
});

export async function sendNotification(topic: string, payload: any) {
    const message = JSON.stringify({ topic, payload });

    wss.clients.forEach((client) => {
        const socket = client as ExtWebSocket;
        if (
            client.readyState === WebSocket.OPEN &&
            socket.topics?.has(topic)           // pastikan sudah subscribe
        ) {
            logger.info(`Sending notification on "${topic}"`);
            client.send(message);
        }
    });
}
