export class CustomerGroup {
    public customerCode: number;
    public groupCode: number;
    public groupName: string;
    public groupKana: string;
    public displayOrder: number;
    public memo: string;
    public deleteFlag: boolean;
    public createDate: any;
    public lastUpdate: any;
    public id: number;

    constructor(customerCode: number, groupCode: number, groupName: string, groupKana: string, displayOrder: number, memo: string, deleteFlag: boolean, createDate: any, lastUpdate: any, id: number) {
        this.customerCode = customerCode;
        this.groupCode = groupCode;
        this.groupName = groupName;
        this.groupKana = groupKana;
        this.displayOrder = displayOrder;
        this.memo = memo;
        this.deleteFlag = deleteFlag;
        this.createDate = createDate;
        this.lastUpdate = lastUpdate;
        this.id = id;

    }
}