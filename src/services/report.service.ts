import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';
import { Report } from "@/models/report.model";

export class ReportService {
    public getReport(params: any) {
        const url = URIProperty.getReport(params);
        const response = axios.get(url);
        return response;
    }

    public createReport(report: Report) {
        const url = URIProperty.createReport();
        const response = axios.post(url, report);
        return response;
    }

    public visibleButtonCreate(param: any){
        const url = URIProperty.visibleButtonCreate(param);
        const response = axios.get(url);
        return response;
    }
}
