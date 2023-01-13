export interface APIGatewayResponse {
    statusCode: number,
    body: any
}

export const prepResponse = (statusCode: number, body: object): APIGatewayResponse => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    };
};