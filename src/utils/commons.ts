export let getDecodedCursor = (cursor: string) => {
    return JSON.parse(Buffer.from(cursor, 'base64').toString());
};

export let getEncodedCursor = (key: any) => {
    return Buffer.from(JSON.stringify(key)).toString('base64');
};