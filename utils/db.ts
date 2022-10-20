import { DocumentClient} from "aws-sdk/clients/dynamodb";
import {log} from "./logger";


export const dynamoDbClient = new DocumentClient({
    region: 'us-east-1'
});
export const prepPutParams = (tableName: string, item: object): DocumentClient.PutItemInput => {
    return {
        TableName: tableName,
        Item: item,
    };

};

export const put = async (params: DocumentClient.PutItemInput): Promise<DocumentClient.PutItemOutput> => {
    return dynamoDbClient.put(params).promise()
        .catch(err => {
            log.error("Error while inserting in ", params.TableName, err);
            throw err;
        })
        .then(data => {
            log.debug("Inserted", JSON.stringify(params));
            return data;
        });
};

export const prepDelParams = (tableName: string, key: object): DocumentClient.DeleteItemInput => {
    return {
        TableName: tableName,
        Key: key,
    };
};

export const prepScanParams = (tableName: string): DocumentClient.ScanInput => {
    return {
        TableName: tableName,
    };
};

export const del = async (params: DocumentClient.DeleteItemInput): Promise<DocumentClient.DeleteItemOutput> => {
    return dynamoDbClient.delete(params).promise()
        .catch(err => {
            log.error("Error while deleting", JSON.stringify(params), err);
            throw err;
        })
        .then(data => {
            log.debug("Deleted", JSON.stringify(params));
            return data;
        });
};

export const getByPartitioningKey = async <T>(params: DocumentClient.QueryInput): Promise<T[]> => {
    return await dynamoDbClient.query(params).promise()
        .catch(err => {
            log.error("Error while fetching", JSON.stringify(params), err);
            throw err;
        })
        .then(data => data.Items as T[] || []);
};

export const getAll = async <T>(params: DocumentClient.ScanInput): Promise<T[]> => {
    let result = [] as T[];
    let data;
    do {
        data = await dynamoDbClient.scan(params).promise();
        data?.Items?.forEach((item) => result.push(item as T));
        params.ExclusiveStartKey = data.LastEvaluatedKey;
    }
    while (typeof data.LastEvaluatedKey != "undefined") ;

    return result;
};