import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class CustomerBranchWasteService {

    public getCustomerBranchWastes(param: any) {
        const url = URIProperty.getCustomerBranchWastes(param);
        return axios.get(url);
    }

    public getCustomerBranchWasteTypesForBranch(param: any) {
        const url = URIProperty.getCustomerBranchWasteTypesForBranch(param);
        return axios.get(url);
    }

    public getCustomerBranchWaste(param: any) {
        const url = URIProperty.getCustomerBranchWaste(param);
        return axios.get(url);
    }

    public addCustomerBranchWaste(params: any) {
        const url = URIProperty.addCustomerBranchWaste(params);
        return axios.post(url, params);
    }

    public getCustomerBranchWasteDefineWaste(params: any) {
        const url = URIProperty.getCustomerBranchWasteDefineWaste(params);
        return axios.get(url);
    }

    public updateCustomerBranchWasteDisplayOrder(payload: any) {
        const url = URIProperty.updateCustomerBranchWasteDisplayOrder();
        return axios.put(url, payload);
    }
}
