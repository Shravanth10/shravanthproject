import {getDetailResult} from "../../Modules/model";
import {table1} from "../../dao/dao";
import {log} from "../utils/logger";
const table = new table1();


export const shravanthGetItems = async (event: {FName: string, cursor: string}) => {
    let FName = event.FName;
    let cursor = event.cursor;
    const limit = 1;
    let result = [];
    console.log(FName);
    console.log(cursor);

    let record :getDetailResult = await table.getDetailsWithLimit(FName, limit, cursor);
    result.push(record);
    console.log(record);
    log.info(`${JSON.stringify(record)}`);
    cursor=record.cursor;

    let output =  {FName: FName, cursor: cursor}
    console.log('result: ', JSON.stringify(output));
    return(output)

}
