import AWS, { SQS } from 'aws-sdk';
import {prepResponse} from "../utils/APIGatewayResponse";

const sqs = new SQS();
const sqsQueue = process.env.shravanthSQSQueue!;

export const shravanthDynamoDbSqs = async (event) => {
    if(!sqsQueue){
        return prepResponse(400, {
            message: `sqs queue not found`
        });
    }
    console.log(sqsQueue);
    const streamRecords = event.Records;
    console.log(streamRecords);
    try{
        for (const record of streamRecords) {
            console.log(`adding record ${JSON.stringify(record)} to queue`);
            let form = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage || record.dynamodb.OldImage);
            const message = {
                image: form,
                eventId: record.eventID,
                eventName: record.eventName
            };
            console.log(message);
            const params = {
                MessageBody: JSON.stringify(message),
                QueueUrl: sqsQueue
            };
            const data = await sqs.sendMessage(params).promise();
            console.log(data);
            return data;
        }
    }catch (err) {
        return Promise.resolve(prepResponse(400, {
            message: `Error occurred while sending event to SQS:${sqsQueue} Error: ${err}`
        }));
    }
}
