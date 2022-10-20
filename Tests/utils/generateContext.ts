import { Context } from "aws-lambda";

export const generateContext = (): Context => {
    return {
        awsRequestId: "",
        callbackWaitsForEmptyEventLoop: true,
        functionName: "",
        functionVersion: "",
        done: () => { },
        fail: () => { },
        getRemainingTimeInMillis: () => { return 100 },
        invokedFunctionArn: "",
        logGroupName: "",
        logStreamName: "",
        memoryLimitInMB: "",
        succeed: () => { }
    };
};