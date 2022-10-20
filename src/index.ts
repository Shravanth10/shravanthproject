import {APIGatewayProxyEvent} from "aws-lambda";
import {APIGatewayResponse, prepResponse} from "../utils/APIGatewayResponse";
import {log} from "../utils/logger";
import {table1} from "../dao/dao"

const table = new table1();


export interface Form{
    FName: string,
    LName: string,
    ssn: string
};

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

        return prepResponse(200,{
            message: JSON.stringify(`Failed to insert value to database`)
        })
    }
}

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

export const shravanthGetallItems = async (event: APIGatewayProxyEvent): Promise<APIGatewayResponse> => {
    let FName = event.pathParameters?.FName;
    if(!process.env.MyTable){
        return prepResponse(400, {
            message: `Table Name not found`
        });
    }

    try {
        let records = await table.getDetails();
        if (!records) {
            return prepResponse(400, {
                message: `No Items Found: ${JSON.stringify(records)}`
            })
        } else {
            return prepResponse(200, {
                message: `Items fetched successfully: ${JSON.stringify(records)}`
            })
        }
    }
    catch (err) {
        console.log(err)
        return prepResponse(200,{
            message: JSON.stringify(`Failed to fetch value from the database`)
        })
    }
}