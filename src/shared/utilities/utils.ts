import AppConfig from '@/constants/AppConfig';
import router from '@/router';
import { MasterProperty } from '../MasterProperty';
import { Customer } from '@/models/customer.model';

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
}

export function isNullOrEmpty<T>(obj: T | null | ''): obj is null | '' {
    return obj === null || obj === '';
}

export function isNullOrZero<T>(obj: T | null | 0): obj is null | 0 {
    return obj === null || obj === 0;
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function trimObject(obj: any) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'string') {
                obj[prop] = obj[prop].trim();
            } else if (typeof obj[prop] === 'object') {
                trimObject(obj[prop]);
            }
        }
    }
    return obj;
}

export function tryMapPathApi(pathApi?: any, urlPath?: string): string {
    if (!pathApi) { return ''; }
    try {
        const url = urlPath || '';
        let result = `${url}?`;
        for (const property in pathApi) {
            if (pathApi.hasOwnProperty(property)) {
                result += `${property}=${(pathApi)[property]}&`;
            }
        }
        result = result.replace(/[?&]$/, '');
        return result;
    } catch (e) { }
    return '';
}

export function tryMapPathApiEncoded(pathApi?: any, urlPath?: string): string {
    if (!pathApi) { return ''; }
    try {
        const url = urlPath || '';
        let result = `${url}?`;
        for (const property in pathApi) {
            if (pathApi.hasOwnProperty(property)) {
                if (!isNullOrUndefined((pathApi)[property])) {
                    result += `${property}=${encodeURIComponent((pathApi)[property])}&`;
                }
            }
        }
        result = result.replace(/[?&]$/, '');
        return result;
    } catch (e) { }
    return '';
}

export function tryMapPathApiHasNullEncoded(pathApi?: any, urlPath?: string): string {
    if (!pathApi) { return ''; }
    try {
        const url = urlPath || '';
        let result = `${url}?`;
        for (const property in pathApi) {
            if (pathApi.hasOwnProperty(property)) {
                if (!(typeof ((pathApi)[property]) === undefined)) {
                    result += `${property}=${encodeURIComponent((pathApi)[property])}&`;
                }
            }
        }
        result = result.replace(/[?&]$/, '');
        return result;
    } catch (e) { }
    return '';
}

export const current = {
    // get Role from local storage
    role() {
        return localStorage.getItem(AppConfig.LocalStorageRole);
    },

    // get Token from local storage
    token() {
        return localStorage.getItem(AppConfig.LocalStorageToken) || '';
    },

    // get Permission from local storage
    permission() {
        const permission = localStorage.getItem(AppConfig.LocalStoragePermission);
        if (permission) {
            return permission;
        } else {
            localStorage.clear();
        }
    },

    remember() {
        return localStorage.getItem(AppConfig.LocalStorageRemember);
    },

    // get User from local storage
    user() {
        const user = localStorage.getItem(AppConfig.LocalStorageUser);
        if (user) {
            return JSON.parse(user);
        } else {
            localStorage.clear();
        }
    },

    // get Customer from local storage
    customer(): Customer {
        const customer = localStorage.getItem(AppConfig.LocalStorageCustomer);
        if (customer) {
            return JSON.parse(customer);
        } else {
            return {
                customerCode: 0,
                customerName: '選択中排出事業者名',
                jwnetNumber: '',
                ediKey: '',
            } as Customer;
        }
    },

    // get WasteClass from local storage
    wasteClass() {
        const wasteClass = localStorage.getItem(AppConfig.LocalStorageWasteClass);
        if (isNullOrUndefined(wasteClass)) {
            return 0;
        }
        return +wasteClass;
    },

    // get WasteClassList from local storage
    getWasteClassList() {
        const wasteClassList = localStorage.getItem(AppConfig.LocalStorageWasteClassList);
        if (wasteClassList) {
            return JSON.parse(wasteClassList);
        } else {
            return [];
        }
    },

    // set WasteClassList from local storage
    setWasteClassList(wasteClassList: any) {
        localStorage.setItem("wasteClassList", JSON.stringify(wasteClassList));
    },

    // set WasteClass to local storage
    setWasteClass(data: any) {
        localStorage.setItem(AppConfig.LocalStorageWasteClass, data);
    },
};

export const navigation = {
    login() {
        router.push({
            path: MasterProperty.FSHI0015.SSHI0037.Path,
            name: MasterProperty.FSHI0015.SSHI0037.Name,
        });
    },

    sshi0001() {
        router.push({
            path: MasterProperty.FSHI0001.SSHI0001.Path,
            name: MasterProperty.FSHI0001.SSHI0001.Name,
        });
    },

    sshi0002() {
        router.push({
            path: MasterProperty.FSHI0001.SSHI0002.Path,
            name: MasterProperty.FSHI0001.SSHI0002.Name,
        });
    },

    sshi0003(customerCode: any) {
        router.push({
            path: MasterProperty.FSHI0001.SSHI0003.Path,
            name: MasterProperty.FSHI0001.SSHI0003.Name,
            params: { customerCode: customerCode }
        });
    },

    sshi0003Detail(customerCode: any) {
        router.push({
            path: MasterProperty.FSHI0001.SSHI0003Detail.Path,
            name: MasterProperty.FSHI0001.SSHI0003Detail.Name,
            params: { customerCode: customerCode }
        });
    },

    sshi0004() {
        router.push({
            path: MasterProperty.FSHI0002.SSHI0004.Path,
            name: MasterProperty.FSHI0002.SSHI0004.Name,
        });
    },

    sshi0005() {
        router.push({
            path: MasterProperty.FSHI0002.SSHI0005.Path,
            name: MasterProperty.FSHI0002.SSHI0005.Name,
        });
    },

    sshi0006(branchCode: any) {
        router.push({
            path: MasterProperty.FSHI0002.SSHI0006.Path,
            name: MasterProperty.FSHI0002.SSHI0006.Name,
            params: { branchCode: branchCode }
        });
    },

    sshi0007() {
        router.push({
            path: MasterProperty.FSHI0003.SSHI0007.Path,
            name: MasterProperty.FSHI0003.SSHI0007.Name,
        });
    },

    sshi0010() {
        router.push({
            path: MasterProperty.FSHI0004.SSHI0010.Path,
            name: MasterProperty.FSHI0004.SSHI0010.Name,
        });
    },

    sshi0011() {
        router.push({
            path: MasterProperty.FSHI0004.SSHI0011.Path,
            name: MasterProperty.FSHI0004.SSHI0011.Name,
        });
    },

    sshi0012(supplierCode: any) {
        router.push({
            path: MasterProperty.FSHI0004.SSHI0012.Path,
            name: MasterProperty.FSHI0004.SSHI0012.Name,
            params: { supplierCode: supplierCode }
        });
    },

    sshi0012Detail(supplierCode: any) {
        router.push({
            path: MasterProperty.FSHI0004.SSHI0012Detail.Path,
            name: MasterProperty.FSHI0004.SSHI0012Detail.Name,
            params: { supplierCode: supplierCode }
        });
    },


    sshi0013() {
        router.push({
            path: MasterProperty.FSHI0005.SSHI0013.Path,
            name: MasterProperty.FSHI0005.SSHI0013.Name,
        });
    },

    sshi0015(supplierCode: any) {
        router.push({
            path: MasterProperty.FSHI0005.SSHI0015.Path,
            name: MasterProperty.FSHI0005.SSHI0015.Name,
            params: { supplierCode: supplierCode }
        });
    },

    sshi0016() {
        router.push({
            path: MasterProperty.FSHI0006.SSHI0016.Path,
            name: MasterProperty.FSHI0006.SSHI0016.Name,
        });
    },

    sshi0017() {
        router.push({
            path: MasterProperty.FSHI0006.SSHI0017.Path,
            name: MasterProperty.FSHI0006.SSHI0017.Name,
        });
    },

    sshi0018(params: any) {
        router.push({
            path: MasterProperty.FSHI0006.SSHI0018.Path,
            name: MasterProperty.FSHI0006.SSHI0018.Name,
            params: {
                factoryCode: params.factoryCode,
                supplierCode: params.supplierCode
            }
        });
    },

    sshi0019() {
        router.push({
            path: MasterProperty.FSHI0007.SSHI0019.Path,
            name: MasterProperty.FSHI0007.SSHI0019.Name
        });
    },

    sshi0022() {
        router.push({
            path: MasterProperty.FSHI0008.SSHI0022.Path,
            name: MasterProperty.FSHI0008.SSHI0022.Name,
        });
    },

    sshi0025() {
        router.push({
            path: MasterProperty.FSHI0009.SSHI0025.Path,
            name: MasterProperty.FSHI0009.SSHI0025.Name,
        });
    },

    sshi0026() {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0026.Path,
            name: MasterProperty.FSHI0010.SSHI0026.Name,
        });
    },

    sshi0027(wasteClass: any) {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0027.Path,
            name: MasterProperty.FSHI0010.SSHI0027.Name,
            params: {
                wasteClass,
            }
        });
    },

    sshi0028(params: any) {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0028.Path,
            name: MasterProperty.FSHI0010.SSHI0028.Name,
            params: {
                contractCode: params.contractCode,
                branchCode: params.branchCode,
                wasteClass: params.wasteClass,
            }
        });
    },

    sshi0028Detail(params: any) {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0028Detail.Path,
            name: MasterProperty.FSHI0010.SSHI0028Detail.Name,
            params: {
                contractCode: params.contractCode,
                branchCode: params.branchCode,
                wasteClass: params.wasteClass,
            }
        });
    },

    sshi0029Add(params: any) {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0029Add.Path,
            name: MasterProperty.FSHI0010.SSHI0029Add.Name,
            params: {
                contractCode: params.contractCode,
                branchCode: params.branchCode,
                wasteClass: params.wasteClass,
            }
        });
    },

    sshi0029Update(params: any) {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0029Update.Path,
            name: MasterProperty.FSHI0010.SSHI0029Update.Name,
            params: {
                contractCode: params.contractCode,
                branchCode: params.branchCode,
                wasteClass: params.wasteClass,
                sectionNumber: params.sectionNumber,
            }
        });
    },

    sshi0029Detail(params: any) {
        router.push({
            path: MasterProperty.FSHI0010.SSHI0029Detail.Path,
            name: MasterProperty.FSHI0010.SSHI0029Detail.Name,
            params: {
                contractCode: params.contractCode,
                branchCode: params.branchCode,
                wasteClass: params.wasteClass,
                sectionNumber: params.sectionNumber,
            }
        });
    },

    sshi0031() {
        router.push({
            path: MasterProperty.FSHI0011.SSHI0031.Path,
            name: MasterProperty.FSHI0011.SSHI0031.Name,
        });
    },

    sshi0033Update(params: any) {
        router.push({
            path: MasterProperty.FSHI0011.SSHI0033.Path,
            name: MasterProperty.FSHI0011.SSHI0033.Name,
            params: {
                manifestNumber: params.entryCode
            }
        });
    },


    sshi0038() {
        router.push({
            path: MasterProperty.FSHI0015.SSHI0038.Path,
            name: MasterProperty.FSHI0015.SSHI0038.Name,
        });
    },

    sshi0035Request(wasteClassUrl: any) {
        router.push({
            path: MasterProperty.FSHI0012.SSHI0035Request.Path,
            name: MasterProperty.FSHI0012.SSHI0035Request.Name,
            params: { wasteClassUrl }
        });
    },

    sshi0035Important(wasteClassUrl: any) {
        router.push({
            path: MasterProperty.FSHI0012.SSHI0035Important.Path,
            name: MasterProperty.FSHI0012.SSHI0035Important.Name,
            params: { wasteClassUrl }
        });
    },

    sshi0035Error(notifySourceUrl: any, supplierClassUrl: any) {
        router.push({
            path: MasterProperty.FSHI0012.SSHI0035Error.Path,
            name: MasterProperty.FSHI0012.SSHI0035Error.Name,
            params: { notifySourceUrl, supplierClassUrl }
        });
    },

    sshi0035Report(wasteClassUrl: any) {
        router.push({
            path: MasterProperty.FSHI0012.SSHI0035Report.Path,
            name: MasterProperty.FSHI0012.SSHI0035Report.Name,
            params: { wasteClassUrl }
        });
    },

    sshi0035Other(wasteClassUrl: any) {
        router.push({
            path: MasterProperty.FSHI0012.SSHI0035Other.Path,
            name: MasterProperty.FSHI0012.SSHI0035Other.Name,
            params: { wasteClassUrl }
        });
    },

    error403() {
        router.push({
            path: MasterProperty.ERROR.ERROR403.Path,
            name: MasterProperty.ERROR.ERROR403.Name,
        });
    },

    error404() {
        router.push({
            path: MasterProperty.ERROR.ERROR404.Path,
            name: MasterProperty.ERROR.ERROR404.Name,
        });
    },
};
