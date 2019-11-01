export interface IFactoryFinal {
    customerCode: number;
    supplierCode: number;
    factoryCode: number;
    finalFactoryCode: number;
    finalFactoryName: string;
    finalFactoryKana: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    tel: string;
    disposeCode: number;
    capability: string;
    memo: string;
    createDate: string;
    lastUpdate: string;
}

export class FactoryFinal implements IFactoryFinal {
    public customerCode: number;
    public supplierCode: number;
    public factoryCode: number;
    public finalFactoryCode: number;
    public finalFactoryName: string;
    public finalFactoryKana: string;
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    public tel: string;
    public disposeCode: number;
    public capability: string;
    public memo: string;
    public createDate: string;
    public lastUpdate: string;
    constructor(data?: IFactoryFinal) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}