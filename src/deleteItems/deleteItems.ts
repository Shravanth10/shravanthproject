import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../utils/APIGatewayResponse";
import {table1} from "../../dao/dao";
const table = new table1();

export const shravanthDeleteItems = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    let ssn = event.pathParameters?.ssn;

    if(!FName || !ssn)
    {
        return prepResponse(400, {
            message: `Invalid API request, mandatory parameters/body missing.`
        });
    }

    if(!process.env.MyTable){
        return prepResponse(400, {
            message: `Table Name not found`
        });
    }

    try {
        await table.delete(FName,ssn);
        console.log("Success - item deleted");
        return prepResponse(200, {
            message: `Items deleted successfully`
        });
    } catch (err) {
        console.log("Error", err);
        return prepResponse(400,{
            message: JSON.stringify(`Failed to fetch value from the database ${err}`)
        })
    }

}
