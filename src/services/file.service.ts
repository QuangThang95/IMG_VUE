import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class FileService {
    public downloadFile(params: any) {
        const url = URIProperty.downLoadFile();
        return axios.post(url, params, { responseType: "blob" });
    }
}
