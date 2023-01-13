export interface getDetailModel {
    FName: string,
    LName: string,
    ssn: string,
}

export interface getDetailResult{
    cursor?: any;
    getDetail: getDetailModel[];
}
