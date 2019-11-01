import axios from 'axios';
import { FactoryLicense } from '@/models/factoryLicense.model';
import { URIProperty } from '@/shared/properties/URIProperty';

export class FactoryLicenseService {
    public getFactoryLicenseGeneral(params: any) {
        const url = URIProperty.getFactoryLicenseGeneral(params);
        const response = axios.get(url);
        return response;
    }

    public deleteFactoryLicense(payload: FactoryLicense) {
        const url = URIProperty.urlFactoryLicense();
        const response = axios.delete(url, { data: payload });
        return response;
    }

    public getFactoryLicenseById(params: any) {
        const url = URIProperty.getFactoryLicenseById(params);
        const response = axios.get(url);
        return response;
    }

    public addFactoryLicense(params: any) {
        const url = URIProperty.urlFactoryLicense();
        const response = axios.post(url, params);
        return response;
    }

    public updateFactoryLicense(params: any) {
        const url = URIProperty.urlFactoryLicense();
        const response = axios.put(url, params);
        return response;
    }
}
