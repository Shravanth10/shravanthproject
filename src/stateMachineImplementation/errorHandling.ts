import {log} from "../utils/logger";
import {prepResponse} from "../utils/APIGatewayResponse";

export const errorHandling = async () => {

    log.info(`working`)
    return prepResponse(200, {
        message: `message from return success statement`
    });
}
