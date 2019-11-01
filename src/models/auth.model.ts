export interface IAuth {
    customerCode: number;
    userCode: number;
    password: string;
}
export class Auth implements IAuth {
    public customerCode: number;
    public userCode: number;
    public password: string;
    constructor(data?: IAuth) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}