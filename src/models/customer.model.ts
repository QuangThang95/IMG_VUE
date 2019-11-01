export interface ICustomer {
    customerCode: number;
    agentCode: number;
    customerName: string;
    customerKana: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address: string;
    tel: string;
    fax: string;
    jwnetNumber: string;
    ediKey: string;
    displayOrder: number;
    memo: string;
    deleteFlag: boolean;
    createDate: string;
    lastUpdate: string;
}

export class Customer implements ICustomer {
    public customerCode: number;
    public agentCode: number;
    public customerName: string;
    public customerKana: string;
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    public address: string;
    public tel: string;
    public fax: string;
    public jwnetNumber: string;
    public ediKey: string;
    public displayOrder: number;
    public memo: string;
    public deleteFlag: boolean;
    public createDate: string;
    public lastUpdate: string;

    constructor(data?: ICustomer) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
