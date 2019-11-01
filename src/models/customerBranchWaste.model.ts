export interface ICustomerBranchWaste {
    customerCode: number;
    branchCode: number;
    wasteClass: number;
    wasteCode: number;
    wasteCode1: number;
    wasteCode2: number;
    wasteCode3: number;
    wasteCode4: number;
    wasteName: string;
    wasteStandardName: string;
    m3Coef: number;
    countCoef: number;
    displayOrder: number;
    memo: string;
    createDate: string;
    lastUpdate: string;
}

export class CustomerBranchWaste implements ICustomerBranchWaste {
    public customerCode: number;
    public branchCode: number;
    public wasteClass: number;
    public wasteCode: number;
    public wasteCode1: number;
    public wasteCode2: number;
    public wasteCode3: number;
    public wasteCode4: number;
    public wasteName: string;
    public wasteStandardName: string;
    public m3Coef: number;
    public countCoef: number;
    public displayOrder: number;
    public memo: string;
    public createDate: string;
    public lastUpdate: string;

    constructor(data?: ICustomerBranchWaste) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
