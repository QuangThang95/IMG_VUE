export interface IMenu {
    id: any;
    title: any;
    titleInfo: any;
    parentId: any;
    link: any;
    isVisible: any;
    permission: any;
}

export class Menu implements IMenu {
    public id: any;
    public title: any;
    public titleInfo: any;
    public parentId: any;
    public link: any;
    public isVisible: any;
    public permission: any;
    constructor(data?: IMenu) {
        if (data) {
            for (const property in data) {
                if (this.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
