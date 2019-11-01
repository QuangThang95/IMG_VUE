import { Supplier } from '@/models/supplier.model';
import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

const urlGetAll = '/Supplier/All/';
const urlAdd = '/Supplier';
const urlGetByID = '/Supplier/BySupplierCode/';

export class SupplierService {

    public getSuppliers(customerCode: number) {
        const response = axios.get(urlGetAll + customerCode);
        return response;
    }

    public addSupplier(supplier: Supplier) {
        const response = axios.post(urlAdd, supplier);
        return response;
    }

    public updateSupplier(supplier: Supplier) {
        const response = axios.put(urlAdd, supplier);
        return response;
    }

    public deleteSupplier(payload: any) {
        const response = axios.delete(urlAdd, { data: payload });
        return response;
    }

    public getSupplierById(supplier: any) {
        const response = axios.get(urlGetByID + supplier);
        return response;
    }

    public getFactorysSupplier(customerCode: number) {
        const url = URIProperty.getFactorysSupplier(customerCode);
        const response = axios.get(url);
        return response;
    }

    public displayOrderSupplier(param: any) {
        const url = URIProperty.displayOrderSupplier();
        return axios.put(url, param);
    }

    public getSuppliersPaging(params: any) {
        const url = URIProperty.getSuppliersPaging(params);
        return axios.get(url);
    }
}
