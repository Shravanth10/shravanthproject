// import MockedEnv from "mocked-env";
// import AWS from "aws-sdk";
// import AWSMock from "aws-sdk-mock";
// import faker from "faker";
// import {APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
// import {generateGatewayProxyEvent} from "../utils/generateGatewayProxyEvent";
// import {generateContext} from "../utils/generateContext";
//
// describe( "Deletion via taskID Status Test Suite", () => {
//     let handler: APIGatewayProxyHandler;
//     let restoreEnv: any;
//     const FName = faker.datatype.uuid();
//     const LName = faker.datatype.uuid();
//     const ssn = faker.datatype.uuid();
//
//     beforeEach(() => {
//         AWSMock.setSDKInstance(AWS);
//
//         restoreEnv = MockedEnv({});
//
//
//         jest.useFakeTimers('modern');
//         jest.setSystemTime(new Date(2022, 8, 4));
//     });
//
//     afterEach(() => {
//         jest.resetAllMocks();
//         restoreEnv();
//         AWSMock.restore();
//         jest.useRealTimers();
//     });
//
//     it("test 1", async() => {
//         let event = generateGatewayProxyEvent({
//             pathParameters: {LName: LName, ssn: ssn},
//         });
//         jest.isolateModules(() => {
//             ({ shravanthPutItems: handler } = require("../../src/index"));
//         });
//
//         const result = await handler(
//             event,
//             generateContext(),
//             () => void 0
//         ) as APIGatewayProxyResult;
//
//         expect(result.statusCode).toEqual(400);
//     })
//
// })