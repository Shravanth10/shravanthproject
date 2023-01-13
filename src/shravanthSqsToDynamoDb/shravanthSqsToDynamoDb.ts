import {deleteItemFromTable, insertItemToTable} from "../../dao/sqsToDynamoDbDao";
import {prepResponse} from "../utils/APIGatewayResponse";
import {SQSHandler} from "aws-lambda";
import {Form} from "../index";

export interface Records{
    image: Form,
    eventId: string,
    eventName: string
}

export const shravanthProcessMessageFromQueue: SQSHandler = async ({Records}): Promise<any> => {
    let Results = Records.map(record => record.body)
        .map(record => JSON.parse(record) as Records);
    console.log(Results);
    let promises = Results.map(async activeUpinsResult => {
        const {eventId, eventName, image}= activeUpinsResult;
        console.log(eventId, eventName, image );
        const FName = image.FName;
        const LName = image.LName;
        const ssn = image.ssn;
        return await processRecord(FName, LName, ssn, eventId, eventName);
    });
    await Promise.all(promises)
        .then(() => console.log(`Completed addition of : ${Results.length} upins to the queue for processing.`));
    return Promise.resolve();
}

export const processRecord = async (FName:string, LName:string,ssn:string,EventId:string,eventName:string) => {
    console.log(FName, LName,ssn,EventId,eventName);
    const expression = eventName;
    switch (expression) {
        case 'INSERT':
            try{
                console.log("inserted");
                await insertItemToTable(FName,LName,ssn);
                return prepResponse(200, {
                    message: `Items inserted successfully ${JSON.stringify(FName)}`
                });
            }catch (err) {
                return prepResponse(400, {
                    message: ` Error: ${err} occurred inserting to table.`
                });
            }
            break;
        case 'REMOVE':
            try{
                console.log("remove");
                await deleteItemFromTable(FName,ssn);
                return prepResponse(200, {
                    message: `Items deleted ${JSON.stringify(FName)}`
                });
            }catch (err) {
                return prepResponse(400, {
                    message: ` Error: ${err} occurred while deleting from table.`
                });
            }
            break;
        default:
            console.log("default case");
            return prepResponse(400, {
                message: ` weong request`
            });
            break;
    }
}
