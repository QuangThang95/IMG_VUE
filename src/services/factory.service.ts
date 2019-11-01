
import { Supplier } from '@/models/supplier.model';
import axios from 'axios';
import { Factory } from '@/models/factory.model';
import { URIProperty } from '@/shared/properties/URIProperty';

const urlGetAll = '/Supplier/All/';
const urlGetBySupplierCode = '/Factory/List';

export class FactoryService {
    public getFactorys(params: any) {
        const url = URIProperty.getFactorys(params);
        const response = axios.get(url);
        return response;
    }

    public deleteFactory(payload: Factory) {
        const url = URIProperty.urlFactorys();
        const response = axios.delete(url, { data: payload });
        return response;
    }

    public searchFactory(customerCode: number) {
        const response = axios.get(urlGetAll + customerCode);
        return response;
    }

    public getFactorysById(params: any) {
        const url = URIProperty.getFactorysById(params);
        const response = axios.get(url);
        return response;
    }

    public getFactoryBySupplierCode(params: any) {
        const response = axios.get(urlGetBySupplierCode + params);
        return response;
    }

    public addFactory(params: any) {
        const url = URIProperty.urlFactorys();
        const response = axios.post(url, params);
        return response;
    }

    public updateFactory(params: any) {
        const url = URIProperty.urlFactorys();
        const response = axios.put(url, params);
        return response;
    }

    public displayOrderFactory(param: any) {
        const url = URIProperty.displayOrderFactory();
        const response = axios.put(url, param);
        return response;
    }

    public getFactoryCarriers(param: any) {
        const url = URIProperty.getFactoryCarriers(param);
        return axios.get(url);
    }
}
