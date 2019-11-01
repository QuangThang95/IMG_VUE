import axios from 'axios';
import { Customer } from '@/models/customer.model';
import { URIProperty } from '@/shared/properties/URIProperty';

export class CustomerService {

    public getCustomers() {
        const url = URIProperty.getCustomers();
        const response = axios.get(url);
        return response;
    }

    public getCustomerOption(params: any) {
        const url = URIProperty.getCustomerOption(params);
        const response = axios.get(url);
        return response;
    }

    public async getByCustomerCode(id: number) {
        const url = URIProperty.getCustomerByCustomerCode(id);
        const response = await axios.get(url);
        return response;
    }

    public addCustomer(customer: Customer) {
        const url = URIProperty.addCustomer();
        const response = axios.post(url, customer);
        return response;
    }

    public updateCustomer(customer: Customer) {
        const url = URIProperty.updateCustomer();
        const response = axios.put(url, customer);
        return response;
    }

    public updateDisplayOrderCustomer(payload: any) {
        const url = URIProperty.updateDisplayOrderCustomer();
        return axios.put(url, payload);
    }

    public deleteCustomer(payload: any) {
        const url = URIProperty.deleteCustomer();
        const response = axios.delete(url, { data: payload });
        return response;
    }
}
