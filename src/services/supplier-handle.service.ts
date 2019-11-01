import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class SupplierHandleService {

    public getAllSupplierHandle(customerCode: number) {
        const url = URIProperty.getAllSupplierHandle(customerCode);
        const response = axios.get(url);
        return response;
    }
    public deleteSupplierHandle(data: any) {
        const url = URIProperty.deleteSupplierHandle();
        const response = axios.delete(url, { data: data });
        return response;
    }

    public addSupplierHandle(data: any) {
        const url = URIProperty.addSupplierHandle();
        const response = axios.post(url, data);
        return response;
    }

    public getSupplierByCode(param: any) {
        const url = URIProperty.getSupplierHandleByCode(param);
        const response = axios.get(url);
        return response;
    }

    public updateSupplierHandle(data: any) {
        const url = URIProperty.updateSupplierHandle();
        const response = axios.put(url, data);
        return response;
    }

    public getSupplierHandleTab(param: any) {
        const url = URIProperty.getSupplierHandleGridTab(param);
        const response = axios.get(url);
        return response;
    }

    public createSupplierUser(params: any) {
        const url = URIProperty.createSupplierUser();
        const response = axios.post(url, params);
        return response;
    }

    public updateSupplierUser(params: any) {
        const url = URIProperty.updateSupplierUser();
        const response = axios.put(url, params);
        return response;
    }

    public deleteSupplierUser(params: any) {
        const url = URIProperty.deleteSupplierUser();
        const response = axios.delete(url, { data: params });
        return response;
    }

    public getSupplierUserByCode(params: any) {
        const url = URIProperty.getSupplierUserByCode(params);
        const response = axios.get(url);
        return response;
    }

    public getAll(param: any) {
        const url = URIProperty.getSuppliersPaging(param);
        const response = axios.get(url);
        return response;
    }

    public displayOrderSupplier(param: any) {
        const url = URIProperty.displayOrderSupplier();
        const response = axios.put(url, param);
        return response;
    }

    public getAllSupplierUser(param: any) {
        const url = URIProperty.getAllSupplierUser(param);
        const response = axios.get(url);
        return response;
    }

}
