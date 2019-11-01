export interface IFactoryLicense {
    customerCode: number;
    supplierCode: number;
    factoryCode: number;
    licenseClass: number;
    rowNumber: number;
    licensePref: string;
    licenseNumber: number;
    licenseDate: number;
    licenseLimit: number;
    path: string;
    memo: string;
    createDate: string;
    lastUpdate: string;
}

export class FactoryLicense implements IFactoryLicense {
    public customerCode: number;
    public supplierCode: number;
    public factoryCode: number;
    public licenseClass: number;
    public rowNumber: number;
    public licensePref: string;
    public licenseNumber: number;
    public licenseDate: number;
    public licenseLimit: number;
    public path: string;
    public memo: string;
    public createDate: string;
    public lastUpdate: string;
    constructor(data?: IFactoryLicense) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}