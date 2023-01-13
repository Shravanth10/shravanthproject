import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../utils/APIGatewayResponse";
import {table1} from "../../dao/dao";
const table = new table1();


export const shravanthUpdateItems = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    let ssn = event.pathParameters?.ssn;
    let LName = event.pathParameters?.LName;

    if(!FName || !ssn || !LName)
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
        let records = await table.updateDetails(FName,ssn,LName);
        return prepResponse(200, {
            message: `Items Updated successfully ${JSON.stringify(records)}`
        });
    } catch (err) {
        console.log("Error", err);
        return prepResponse(400,{
            message: JSON.stringify(`Failed to update value from the database ${err}`)
        })
    }
}
