export interface ICondition {
    page: any;
    pageSize: any;
    orderField: any;
    descending: any;
}
export class Condition implements ICondition {
    public page: any;
    public pageSize: any;
    public orderField: any;
    public descending: any;
    constructor(data?: ICondition) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}