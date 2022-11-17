import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../../utils/APIGatewayResponse";
import {getDetailResult} from "../../Modules/model";
import {table1} from "../../dao/dao";
const table = new table1();

export const shravanthGetItemsWithLimit = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    let cursor = null;
    const limit = 1;
    let result = [];

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
    try{
        do{
            let record :getDetailResult = await table.getDetailsWithLimit(FName, limit, cursor);
            result.push(record);
            console.log(record);
            cursor=record.cursor;
        }while (cursor != null)
        return prepResponse(200, {
            message: `Items fetched successfully ${JSON.stringify(result)}`
        });
    }catch (err){
        console.log("Error", err);
        return prepResponse(400,{
            message: JSON.stringify(`Failed to fetch value from the database ${err}`)
        })
    }
}
