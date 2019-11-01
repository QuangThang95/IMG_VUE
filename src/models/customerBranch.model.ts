export interface ICustomerBranch {
    customerCode: number;
    branchCode: number;
    branchNumber: string;
    branchName: string;
    branchKana: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    tel: string;
    industryCode1: string;
    industryCode2: number;
    jwnetNumber: string;
    ediKey: string;
    dischargeWasteClass1: boolean;
    dischargeWasteClass2: boolean;
    dischargeWasteClass3: boolean;
    dischargeWasteClass4: boolean;
    dischargeWasteClass5: boolean;
    displayOrder: number;
    memo: string;
    createDate: string;
    lastUpdate: string;
    deleteFlag: boolean;
}

export class CustomerBranch implements ICustomerBranch {
    public customerCode: number;
    public branchCode: number;
    public branchNumber: string;
    public branchName: string;
    public branchKana: string;
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    public tel: string;
    public industryCode1: string;
    public industryCode2: number;
    public jwnetNumber: string;
    public ediKey: string;
    public dischargeWasteClass1: boolean;
    public dischargeWasteClass2: boolean;
    public dischargeWasteClass3: boolean;
    public dischargeWasteClass4: boolean;
    public dischargeWasteClass5: boolean;
    public displayOrder: number;
    public memo: string;
    public createDate: string;
    public lastUpdate: string;
    public deleteFlag: boolean;

    constructor(data?: ICustomerBranch) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
