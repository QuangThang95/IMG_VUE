import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class AddressService {

    public getByPostalCode(params: any) {
        const url = URIProperty.getAddressByPostalCode(params);
        const response = axios.get(url);
        return response;
    }
}
