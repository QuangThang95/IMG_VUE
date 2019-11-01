export class User {
    public customerCode: number;
    public userCode: number;
    public usertypeCode: number;
    public roleCode: number;
    public branchCode: number;
    public groupCode: number;
    public supplierCode: number;
    public factoryCode: number;
    public department: string;
    public userName: string;
    public userKana: string;
    public password: string;
    public tel: string;
    public email: string;
    public notifyReport: boolean;
    public notifyApprove: boolean;
    public notifyExpire: boolean;
    public notifyExpireSoon: boolean;
    public notifyLicenseExpire: boolean;
    public notifyLicenseExpireSoon: boolean;
    public notifyDone: boolean;
    public lastLogin: number;
    public agentFlag: boolean;
    public enableFlag: boolean;
    public deleteFlag: boolean;
    public memo: string;
    public createDate: number;
    public lastUpdate: number;

    constructor(customerCode: number, userCode: number, usertypeCode: number, roleCode: number, branchCode: number, groupCode: number, supplierCode: number,
        factoryCode: number, department: string, userName: string, userKana: string, password: string, tel: string, email: string, notifyReport: boolean,
        notifyApprove: boolean, notifyExpire: boolean, notifyExpireSoon: boolean, notifyLicenseExpire: boolean, notifyLicenseExpireSoon: boolean,
        notifyDone: boolean, lastLogin: number, agentFlag: boolean, enableFlag: boolean, deleteFlag: boolean, memo: string, createDate: number, lastUpdate: number) {

        this.customerCode = customerCode;
        this.userCode = userCode;
        this.usertypeCode = usertypeCode;
        this.roleCode = roleCode;
        this.branchCode = branchCode;
        this.groupCode = groupCode;
        this.supplierCode = supplierCode;
        this.factoryCode = factoryCode;
        this.department = department;
        this.userName = userName;
        this.userKana = userKana;
        this.password = password;
        this.tel = tel;
        this.email = email;
        this.notifyReport = notifyReport;
        this.notifyApprove = notifyApprove;
        this.notifyExpire = notifyExpire;
        this.notifyExpireSoon = notifyExpireSoon;
        this.notifyLicenseExpire = notifyLicenseExpire;
        this.notifyLicenseExpireSoon = notifyLicenseExpireSoon;
        this.notifyDone = notifyDone;
        this.lastLogin = lastLogin;
        this.agentFlag = agentFlag;
        this.enableFlag = enableFlag;
        this.deleteFlag = deleteFlag;
        this.memo = memo;
        this.createDate = createDate;
        this.lastUpdate = lastUpdate;
    }
}

