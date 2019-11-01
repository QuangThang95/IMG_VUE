export interface IAttack {
    fileCode: number;
    customerCode: number;
    supplierCode: number;
    factoryCode: number;
    fileTitle: string;
    logicalFileName: string;
    physicalFileName: string;
    createDate: any
    lastUpdate: any;
    id: number;
}

export class Attack implements IAttack {
    public fileCode: number;
    public customerCode: number;
    public supplierCode: number;
    public factoryCode: number;
    public fileTitle: string;
    public logicalFileName: string;
    public physicalFileName: string;
    public createDate: any;
    public lastUpdate: any;
    public id: number;
    constructor(data?: IAttack) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}