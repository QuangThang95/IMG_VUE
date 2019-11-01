export interface IReport {
    reportId: number;
    customerCode: number;
    branchCode: number;
    reportStatus: number;
    aggreateFlag: number;
    wasteClass: number;
    deliveryDateFrom: string;
    deliveryDateTo: string;
    groupKey1: number;
    groupKey2: number;
    groupKey3: number;
    groupKey4: number;
    groupKey5: number;
    groupKey6: number;
    groupKey7: number;
    groupCondition1: number;
    groupCondition2: number;
    groupCondition3: number;
    groupCondition4: number;
    groupCondition5: number;
    groupCondition6: number;
    groupCondition7: number;
    reportTitle: string;
    pathName: string;
    createDate: string;
    lastUpdate: string;
}

export class Report implements IReport {
    public reportId: number;
    public customerCode: number;
    public branchCode: number;
    public reportStatus: number;
    public aggreateFlag: number;
    public wasteClass: number;
    public deliveryDateFrom: string;
    public deliveryDateTo: string;
    public groupKey1: number;
    public groupKey2: number;
    public groupKey3: number;
    public groupKey4: number;
    public groupKey5: number;
    public groupKey6: number;
    public groupKey7: number;
    public groupCondition1: number;
    public groupCondition2: number;
    public groupCondition3: number;
    public groupCondition4: number;
    public groupCondition5: number;
    public groupCondition6: number;
    public groupCondition7: number;
    public reportTitle: string;
    public pathName: string;
    public createDate: string;
    public lastUpdate: string;

    constructor(data?: IReport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}