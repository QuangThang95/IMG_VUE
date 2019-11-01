export interface IGeneral {
    key1: string;
    key2: string;
    key3: string;
    key4: string;
    key5: string;
    key6: string;
    key7: string;
    data1: string;
    data2: string;
    data3: string;
    data4: string;
    data5: string;
    data6: string;
    data7: string;
}

export class General implements IGeneral {
    public key1: string;
    public key2: string;
    public key3: string;
    public key4: string;
    public key5: string;
    public key6: string;
    public key7: string;
    public data1: string;
    public data2: string;
    public data3: string;
    public data4: string;
    public data5: string;
    public data6: string;
    public data7: string;
    constructor(data?: IGeneral) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}