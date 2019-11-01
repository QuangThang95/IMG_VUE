import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class AttackService {

    public getAttack(params: any) {
        const url = URIProperty.getAttack(params);
        const response = axios.get(url);
        return response;
    }

    public updateAttack(params: any) {
        const url = URIProperty.urlAttachUploadUpdate(params);
        const response = axios.put(url, params.form);
        return response;
    }

    public deleteAttack(params: any) {
        const url = URIProperty.deleteAttachFile(params);
        const response = axios.delete(url);
        return response;
    }

    public uploadFile(params: any) {
        const url = URIProperty.urlAttachUpload(params);
        const response = axios.post(url, params.form);
        return response;
    }

    public uploadFileUpdate(params: any) {
        const url = URIProperty.urlAttachUploadUpdate(params);
        const response = axios.post(url, params.form);
        return response;
    }

    public downloadFile(params: any) {
        const url = URIProperty.urlAttachDownload(params);
        const response = axios.get(url, { responseType: "blob" });
        return response;
    }

    public getAttackSupplier(params: any) {
        const url = URIProperty.getAttackSupplier(params);
        const response = axios.get(url);
        return response;
    }

    public uploadFileSupplier(params: any) {
        const url = URIProperty.urlAttachUploadSupplier(params);
        const response = axios.post(url, params.form);
        return response;
    }
    //SSHI0036
    public downloadFileReport(params: any){
        const url = URIProperty.urlAttachDownloadReport(params);
        const response = axios.get(url, { responseType: "blob" });
        return response;
    }
}
