import * as db from "../src/utils/db";
import {log} from "../src/utils/logger";
import {prepResponse} from "../src/utils/APIGatewayResponse";
export interface Form{
    FName: string,
    LName: string,
    ssn: string
};
const checkTable = () => {
    const sqsToDynamoDbDaoTable = process.env.MyTable;
    if (!sqsToDynamoDbDaoTable) {
        throw new Error("table not found in env");
    }
    return sqsToDynamoDbDaoTable;
}

export const insertItemToTable = async (FName: string, LName: string, ssn:string) : Promise<any>=> {
    console.log("insertItemToTable");
    const table = process.env.MyTable;
    console.log(table);
    let form:Form = {
        FName:FName,
        LName:LName,
        ssn:ssn
    }
    try{
        let params = db.prepPutParams(table,form);
        console.log(`Inserting data to table: ${JSON.stringify(form)}`)
        return await db.put(params);
    }catch (error){
        return prepResponse(400, {
            message: ` Error: ${error} occurred while inserting to table.`
        });
    }
};

export const deleteItemFromTable = async (FName: string, ssn: string): Promise<any>=> {
    console.log("deleteItemFromTable");
    const table = checkTable();
    console.log(table);

    let params = db.prepDelParams(
        table,
        {
            FName:FName,
            ssn:ssn
        }
    );
    try{
        log.info(`deleting data to table: ${JSON.stringify(params)}`)
        return await db.del(params);
    }catch (error){
        return prepResponse(400, {
            message: ` Error: ${error} occurred while deleting from table.`
        });
    }
}
