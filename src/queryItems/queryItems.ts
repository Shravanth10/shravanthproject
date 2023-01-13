import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../utils/APIGatewayResponse";
import {table1} from "../../dao/dao";
const table = new table1();


export const shravanthQueryItems = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;

    if(!FName)
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
        let records = await table.query(FName);
        return prepResponse(200, {
            message: `Items fetched successfully ${JSON.stringify(records)}`
        });
    } catch (err) {
        console.log("Error", err);
        return prepResponse(400,{
            message: JSON.stringify(`Failed to fetch value from the database ${err}`)
        })
    }
}
