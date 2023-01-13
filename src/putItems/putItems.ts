import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../utils/APIGatewayResponse";
import {log} from "../utils/logger";
import {Form} from "../index";
import {table1} from "../../dao/dao";
const table = new table1();

export const shravanthPutItems = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    let LName = event.pathParameters?.LName;
    let ssn = event.pathParameters?.ssn;

    if(!FName || !LName || !ssn)
    {
        return prepResponse(400, {
            message: `Invalid API request, mandatory parameters/body missing.`
        });
    }
    let items: Form ={FName,LName,ssn};

    if(!process.env.MyTable){
        return prepResponse(400, {
            message: `Table Name not found`
        });
    }

    log.info(`${JSON.stringify(items)}`);

    try {
        await table.insert(FName,LName,ssn);
        return {
            statusCode: 200,
            body: JSON.stringify(`Successfully added items: ${JSON.stringify({ items})}`)
        }

    }
    catch (err) {
        console.log(err)
        return prepResponse(400,{
            message: JSON.stringify(`Failed to insert value to database`)
        })
    }
}
