export interface getDetailModel {
    FName: string,
    LName: string,
    ssn: string,
}

export interface getDetailResult extends getDetailModel{
    cursor?: any;
    getDetail: getDetailModel[];
}
