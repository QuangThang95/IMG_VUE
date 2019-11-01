import axios from 'axios';
import { CustomerGroup } from '@/models/customerGroup.model';
import { URIProperty } from '@/shared/properties/URIProperty';

export class CustomerGroupService {

    public getCustomerGroups(customerCode: number) {
        const url = URIProperty.getCustomerGroup(customerCode);
        const response = axios.get(url);
        return response;
    }

    public addCustomerGroup(customer: CustomerGroup) {
        const url = URIProperty.addCustomerGroup();
        const response = axios.post(url, customer);
        return response;

    }

    public updateCustomerGroup(customer: CustomerGroup) {
        const url = URIProperty.updateCustomerGroup();
        const response = axios.put(url, customer);
        return response;

    }

    public deleteCustomerGroup(customer: CustomerGroup) {
        const url = URIProperty.deleteCustomerGroup();
        const response = axios.delete(url, { data: customer });
        return response;

    }

    public getCustomerGroupByCode(param: any) {
        const url = URIProperty.getCustomerGroupByCode(param);
        const response = axios.get(url);
        return response;
    }

    public getCustomerBranch(customerCode: number) {
        const url = URIProperty.getCustomerBranchGroup(customerCode);
        const response = axios.get(url);
        return response;
    }

    public getCustomerBranchByGroup(param: any) {
        const url = URIProperty.getCustomerBranchByGroup(param);
        const response = axios.get(url);
        return response;
    }

    public getCustomerBranchByCustomerGroup(param: any) {
        const url = URIProperty.getCustomerBranchByCustomerGroup(param);
        const response = axios.get(url);
        return response;
    }

    public updateCustomerGroupLink(customer: any) {
        const url = URIProperty.updateCustomerGroupLink();
        const response = axios.put(url, customer);
        return response;

    }

    public getAllCustomerGroup(param: any) {
        const url = URIProperty.getAllCustomerGroup(param);
        const response = axios.get(url);
        return response;

    }

    public displayOrderCustomerGroup(param: any) {
        const url = URIProperty.displayOrderCustomerGroup();
        const response = axios.put(url, param);
        return response;
    }

    public getAllCustomerBranchByGroup(param: any) {
        const url = URIProperty.getAllCustomerBanchByGroup(param);
        const response = axios.get(url);
        return response;

    }
}
