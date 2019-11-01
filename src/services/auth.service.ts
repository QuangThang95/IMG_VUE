import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';
export class AuthService {
    public async login(Auth: any) {
        const url = URIProperty.login()
        return await axios.post(url, Auth);
    }
}
