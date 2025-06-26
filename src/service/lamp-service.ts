import { ResponseError } from "../error/response-error";
import { logger } from "../application/logging";
import axios from 'axios';

export class LampService {

    static async turnOnLamp(deviceId: number, color: string = "blue") {

        if (isNaN(deviceId)) {
            throw new ResponseError(400, "Invalid device id");
        }

        try {
            await axios.post('http://192.168.245.224:5050/api/BannerPTL/OneLampCommand', {
                port: 1,
                deviceId: deviceId,
                jobState: 1,
                animationType: "steady",
                colorSelection: color
            });
            logger.info(`🟢 Turn on lamp with device id: ${deviceId} with color ${color}`);
        } catch (error) {
            logger.error("🔴 Turn on lamp with device id: " + deviceId + " error " + error);
        }
    }


    static async turnOffLamp(deviceId: number) {

        if (isNaN(deviceId)) {
            throw new ResponseError(400, "Invalid device id");
        }

        try {
            await axios.post('http://192.168.245.224:5050/api/BannerPTL/OneLampCommand', {
                port: 1,
                deviceId: deviceId,
                jobState: 0,
                animationType: "off",
                colorSelection: "red"
            });
            logger.info(`🟢 Turn off lamp with device id: ${deviceId}`);
        } catch (error) {
            logger.error("🔴 Turn off lamp with device id: " + deviceId + " error " + error);
        }
    }

}