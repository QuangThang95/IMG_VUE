export interface IAddress {
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
}

export class Address implements IAddress {
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    constructor(data?: IAddress) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}