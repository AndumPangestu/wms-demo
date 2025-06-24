import { ResponseError } from "../error/response-error";
import { logger } from "../application/logging";
import axios from 'axios';

export class LampService {

    static async turnOnLamp(deviceId: number) {

        if (isNaN(deviceId)) {
            throw new ResponseError(400, "Invalid device id");
        }

        try {
            await axios.post('http://192.168.245.224:5050/api/BannerPTL/OneLampCommand', {
                port: 1,
                deviceId: deviceId,
                jobState: 1,
                animationType: "steady",
                colorSelection: "red"
            });
            logger.info(`🟢 Turn on lamp with device id: ${deviceId}`);
        } catch (error) {
            logger.error("🔴 Turn on lamp with device id: " + deviceId + " error " + error);
        }
    }

}





