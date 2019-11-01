export interface IFactory {
    customerCode: number;
    supplierCode: number;
    factoryCode: number;
    factoryNumber: string;
    factoryClass: number;
    factoryName: string;
    factoryKana: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address: string;
    tel: string;
    reportFlag: number;
    jwnetNumber: string;
    jwnetPassword: string;
    jwnetFactoryCode: number;
    displayOrder: number;
    memo: string;
    deleteFlag: number;
    createDate: number;
    lastUpdate: number;
    id: number;
}

export class Factory implements IFactory {
    public customerCode: number;
    public supplierCode: number;
    public factoryCode: number;
    public factoryNumber: string;
    public factoryClass: number;
    public factoryName: string;
    public factoryKana: string;
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    public address: string;
    public tel: string;
    public reportFlag: number;
    public jwnetNumber: string;
    public jwnetPassword: string;
    public jwnetFactoryCode: number;
    public displayOrder: number;
    public memo: string;
    public deleteFlag: number;
    public createDate: number;
    public lastUpdate: number;
    public id: number;
    constructor(data?: IFactory) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
