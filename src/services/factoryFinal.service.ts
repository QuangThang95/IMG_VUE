import axios from 'axios';
import { FactoryFinal } from '@/models/factoryFinal.model';
import { URIProperty } from '@/shared/properties/URIProperty';

export class FactoryFinalService {
    public getFactoryFinal(params: any) {
        const url = URIProperty.getFactoryFinal(params);
        const response = axios.get(url);
        return response;
    }

    public deleteFactoryFinal(payload: FactoryFinal) {
        const url = URIProperty.urlFactoryFinal();
        const response = axios.delete(url, { data: payload });
        return response;
    }

    public getFactoryFinalById(params: any) {
        const url = URIProperty.getFactoryFinalById(params);
        const response = axios.get(url);
        return response;
    }

    public addFactoryFinal(params: any) {
        const url = URIProperty.urlFactoryFinal();
        const response = axios.post(url, params);
        return response;
    }

    public updateFactoryFinal(params: any) {
        const url = URIProperty.urlFactoryFinal();
        const response = axios.put(url, params);
        return response;
    }

    public getFactoryFinalForContractFinal(params: any){
        const url = URIProperty.getFactoryFinalForContractFinal(params);
        return axios.get(url);
    }
}
