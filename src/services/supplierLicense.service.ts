import { URIProperty } from '@/shared/properties/URIProperty';
import axios from 'axios';

const urlGetAll = '/SupplierLicense/';
const urlLicense = '/General/PermissionByWorkType?typeNum=';
const urlPost = '/SupplierFile/Upload';
const urlAdd = '/SupplierLicense';

export class SupplierLicenseService {

    public getSupplierLicense(params: any) {
        const url = URIProperty.getSupplierLicense(params)
        const response = axios.get(url);
        return response;
    }

    public getLicense(params: any) {
        const response = axios.get(urlLicense + params);
        return response;
    }

    public postFile(params: any) {
        const response = axios.post(urlPost, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    }

    public addSupplierLicense(license: any) {
        const response = axios.post(urlAdd, license);
        return response;
    }

    public updateSupplierLicense(license: any) {
        const response = axios.put(urlAdd, license);
        return response;
    }
    
    public deleteSupplierLicense(license: any) {
        const response = axios.delete(urlAdd, { data: license });
        return response;
    }
}
