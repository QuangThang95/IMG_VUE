export interface ISupplierHandle {
    customerCode: number;
    supplierCode: number;
    supplierNumber: any;
    supplierClass: any;
    supplierName: string;
    supplierKana: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    tel: any;
    fax: any;
    url: any;
    reportFlag: any;
    jwnetNumber: any;
    jwnetPassword: any;
    displayOrder: number;
    memo: string;
    deleteFlag: any;
    createDate: any;
    lastUpdate: any;
    id: number;
    address: string;

}

export class SupplierHandle implements ISupplierHandle {
    public customerCode: number;
    public supplierCode: number;
    public supplierNumber: any;
    public supplierClass: any;
    public supplierName: string;
    public supplierKana: string;
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    public tel: any;
    public fax: any;
    public url: any;
    public reportFlag: any;
    public jwnetNumber: any;
    public jwnetPassword: any;
    public displayOrder: number;
    public memo: string;
    public deleteFlag: any;
    public createDate: any;
    public lastUpdate: any;
    public id: number;
    public address: string;
    constructor(data?: ISupplierHandle) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
