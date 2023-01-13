import AWS from "aws-sdk";

const sqs = new AWS.SQS({
    region: 'us-east-1'
});

export const addToQueue = async (queueUrl: string, record: string): Promise<any> => {
    return sqs.sendMessage({QueueUrl: queueUrl, MessageBody: record})
        .promise()
        .catch(err => {
            throw new Error(`Unable to add record to the queue: ${err}`);
        })
};
