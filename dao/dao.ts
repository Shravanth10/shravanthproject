import {prepResponse} from "../utils/APIGatewayResponse";
import {log} from "../utils/logger";
import * as db from "../utils/db";
import {Form} from "../src";

export class table1 {
    private readonly tableName: string;

    constructor(tableName?: string) {
        if (tableName) {
            this.tableName = tableName;
        } else if (process.env.MyTable) {
            this.tableName = process.env.MyTable;
        } else {
            throw new Error("");
        }
    };

    insert = async (FName: string, LName: string, ssn:string) => {
        if(!process.env.MyTable){
            return prepResponse(400, {
                message: `Table Name not found`
            });
        }
        let Form:Form = {
            FName:FName,
            LName:LName,
            ssn:ssn
        }
        if(!process.env.MyTable){
            return prepResponse(400, {
                message: `Table Name not found`
            });
        }

        try{
            let params = db.prepPutParams(this.tableName,Form);
            log.info(`Inserting data to table: ${JSON.stringify(Form)}`)
            return db.put(params)
        }catch (error){
            let errorMsg = `Error while inserting the table`;
        }

    }
    delete = async (FName: string, ssn: string) => {
        if(!process.env.MyTable){
            return prepResponse(400, {
                message: `Table Name not found`
            });
        }
        let params = db.prepDelParams(
            this.tableName,
            {
                FName:FName,
                ssn:ssn
            }
        );
        if(!process.env.MyTable){
            return prepResponse(400, {
                message: `Table Name not found`
            });
        }

        try{
            log.info(`deleting data to table: ${JSON.stringify(params)}`)
            return await db.del(params);
        }catch (error){
            log.error(`Error while deleting the table`);
        }
    }

    getDetails = async () => {
        log.debug(`Fetching Details`);
        let params = db.prepScanParams(
            this.tableName
        );
        // let records = await db.<Form>(params);
        return await db.getAll(params);
    }
}