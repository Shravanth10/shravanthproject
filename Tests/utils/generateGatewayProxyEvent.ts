import { APIGatewayProxyEvent } from "aws-lambda";

interface generateProps {
    body?: { [key: string]: any } | string,
    pathParameters?: { [key: string]: string },
    headers?: { [key: string]: string },
    queryStringParameters?: { [key: string]: string }
}

export const generateGatewayProxyEvent = ({ body = {}, pathParameters = {}, headers = {}, queryStringParameters = {} }: generateProps = {}): APIGatewayProxyEvent => {
    return {
        body: typeof body === "object" ? JSON.stringify(body) : body,
        headers: headers,
        httpMethod: "",
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        path: "",
        pathParameters: pathParameters,
        queryStringParameters: queryStringParameters,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: undefined,
            httpMethod: "",
            identity: {
                clientCert: {
                    clientCertPem: "",
                    issuerDN: "",
                    serialNumber: "",
                    subjectDN: "",
                    validity: {
                        notAfter: "",
                        notBefore: ""
                    }
                },
                accessKey: "",
                accountId: "",
                apiKey: "",
                apiKeyId: "",
                caller: "",
                cognitoAuthenticationProvider: "",
                cognitoAuthenticationType: "",
                cognitoIdentityId: "",
                cognitoIdentityPoolId: "",
                principalOrgId: "",
                sourceIp: "",
                user: "",
                userAgent: "",
                userArn: ""
            },
            path: "",
            protocol: "",
            requestId: "",
            requestTimeEpoch: new Date().getTime(),
            resourceId: "",
            resourcePath: "",
            stage: ""
        },
        resource: "",
        stageVariables: {}
    };
};