import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../../utils/APIGatewayResponse";
import {getDetailModel, getDetailResult} from "../../Modules/model";
import {table1} from "../../dao/dao";
import {Form} from "../index";
const table = new table1();

export interface queueItems{
    cursor?: string,
    FName: string,
    LName: string,
    ssn: string
}

export const shravanthGetAllItemsWithLimit = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    let cursor = null;
    const limit = 1;
    let result =[];


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
    let record :getDetailResult = await table.getDetailsWithLimit(FName, limit, cursor);
    cursor= record.cursor;
    let details : getDetailModel = record.getDetail;



}
