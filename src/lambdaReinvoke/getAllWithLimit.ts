import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../utils/APIGatewayResponse";
import {getDetailResult} from "../../Modules/model";
import {table1} from "../../dao/dao";
import {queueItems} from "../index";
import {addToQueue} from "../utils/sqs-write";
const table = new table1();

const sqsQueue = process.env.SqsQueue!;

export const shravanthGetAllItemsWithLimit = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    let cursor = null;
    const limit = 1;
    let result = []

    if(!FName)
    {
        return prepResponse(400, {
            message: `Invalid API request, mandatory parameters/body missing.`
        });
    }
    if(!sqsQueue){
        return prepResponse(400, {
            message: `sqs queue not found`
        });
    }

    if(!process.env.MyTable){
        return prepResponse(400, {
            message: `Table Name not found`
        });
    }
    let record :getDetailResult = await table.getDetailsWithLimit(FName, limit, cursor);
    result.push(record)
    let queueRecords : queueItems = {
        details: record,
        cursor:record.cursor
    }
    await addToQueue(sqsQueue,JSON.stringify(queueRecords));
    return prepResponse(200, {
        message: `Items fetched successfully ${JSON.stringify(result)}`
    });
}
