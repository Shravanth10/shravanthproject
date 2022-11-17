import {prepResponse} from '../utils/APIGatewayResponse';
import {log} from "../utils/logger";
import * as db from "../utils/db";
import {Form} from "../src";
import {getDetailModel, getDetailResult} from "../Modules/model";
import {getDecodedCursor, getEncodedCursor} from "../utils/commons";

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
        try{
            log.info(`deleting data to table: ${JSON.stringify(params)}`)
            return await db.del(params);
        }catch (error){
            log.error(`Error while deleting the table`);
        }
    }

    query = async (FName: string) => {
        if (!process.env.MyTable) {
            return prepResponse(400, {
                message: `Table Name not found`
            });
        }
        let params = db.prepQueryParms(
            this.tableName,
            "FName = :FName",
            {
                ":FName": FName
            }
        );
        try{
            log.info(`querying item from table: ${JSON.stringify(params)}`)
            return await db.query(params);
        }catch (error){
            log.error(`Item not found in the table`);
        }
    }

    getDetails = async () => {
        if (!process.env.MyTable) {
            return prepResponse(400, {
                message: `Table Name not found`
            });
        }

        log.debug(`Fetching Details`);
        let params = db.prepScanParams(
            this.tableName
        );
        // let records = await db.<Form>(params);
        return await db.getAll(params);
    }

    updateDetails = async (FName: string, ssn: string, LName: string) => {
        let params = db.prepUpdateParams(
            this.tableName,
            {
                FName: FName,
                ssn: ssn
            },
            "LName :LName",
            { "LName": "LName"},
            { ":LName": LName}
        )
        return db.update(params);
    }

    getDetailsWithLimit = async (FName: string, limit: number, cursor: string | undefined) => {
        let detailResult: getDetailResult = {getDetail: []};
        let params = db.prepQueryParams(
            this.tableName,
            "FName = :FName",
            {
                ":FName": FName
            },
            true,
            limit
        );
        if (typeof cursor === "string") {
            params = {...params, ExclusiveStartKey: getDecodedCursor(cursor)} //ExclusiveStartKey is of type key so string is not assignable
        }
        let data = await db.dynamoDbClient.query(params).promise();
        detailResult.getDetail = data.Items as getDetailModel[]
        if (data.LastEvaluatedKey === undefined) {
            detailResult.cursor = null;
        } else {
            detailResult.cursor = getEncodedCursor(data.LastEvaluatedKey);
        }
        return detailResult
    };
}
