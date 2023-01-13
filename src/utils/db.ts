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

export const prepUpdateParams = (
    tableName: string,
    key: any,
    updateExpression: string,
    expressionAttributeNames: any,
    expressionAttributeValues?: any): DocumentClient.UpdateItemInput => {

    return {
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
    };
};

export const prepQueryParms = (tableName: string, query: string, queryParams: any): DocumentClient.QueryInput => {
    return {
        TableName: tableName,
        KeyConditionExpression: query,
        ExpressionAttributeValues: queryParams,
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

export const query = async (params: DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput> => {

    return dynamoDbClient.query(params).promise()
        .catch(err => {
            log.error("Error while fetching item", JSON.stringify(params), err);
            throw err;
        })
        .then(data => {
            log.debug("Query succuss", JSON.stringify(params));
            return data;
        });
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


export const update = async (params: DocumentClient.UpdateItemInput): Promise<DocumentClient.UpdateItemOutput> => {
    return dynamoDbClient.update(params).promise()
        .catch(err => {
            log.error("Error while updating in ", params.TableName, err);
            throw err;
        })
        .then(data => {
            log.debug("Updated", JSON.stringify(params));
            return data;
        });
};

export const prepQueryParams = (
    tableName: string,
    query: string,
    queryParams: any,
    scanIndexForward?: boolean,
    limit?: number,
    filterExpression?: string,
    indexName?: string,
    lastEvaluateKey?: DocumentClient.Key):
    DocumentClient.QueryInput => {

    return {
        TableName: tableName,
        KeyConditionExpression: query,
        ExpressionAttributeValues: queryParams,
        Limit: limit,
        ScanIndexForward: scanIndexForward,
        FilterExpression: filterExpression,
        IndexName: indexName,
        ExclusiveStartKey: lastEvaluateKey
    };
};
