export class Supplier {
    public supplierCode: any;
    public supplierNumber: any;
    public supplierName: string;
    public supplierKana: string;
    public postalCode: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public address4: string;
    public address: string;
    public tel: string;
    public fax: string;
    public jwnetNumber: string;
    public jwnetPassword: string;
    public url: string;
    public displayOrder: any;
    public memo: string;
    public deleteFlag: boolean;
    public createDate: any;
    public lastUpdate: any;
    public id: any;

    constructor(supplierCode: any, supplierNumber: any, supplierName: string,
        supplierKana: string, postalCode: string, address1: string, address2: string, address3: string,
        address4: string, address: string, tel: string, fax: string, jwnetNumber: string, jwnetPassword: string, url: string,
        displayOrder: any, memo: string, deleteFlag: boolean, createDate: any, lastUpdate: any,
        id: any) {
        this.supplierCode = supplierCode;
        this.supplierNumber = supplierNumber;
        this.supplierName = supplierName;
        this.supplierKana = supplierKana;
        this.postalCode = postalCode;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.address4 = address4;
        this.address = (address == '' || undefined) ? address1 + address2 + address3 + address4 : address;
        this.tel = tel;
        this.fax = fax;
        this.jwnetNumber = jwnetNumber;
        this.jwnetPassword = jwnetPassword;
        this.url = url;
        this.displayOrder = displayOrder;
        this.memo = memo;
        this.deleteFlag = deleteFlag;
        this.createDate = createDate;
        this.lastUpdate = lastUpdate;
        this.id = id;
    }
}
