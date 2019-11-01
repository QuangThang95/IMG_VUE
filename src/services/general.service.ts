import axios from "axios";
import { URIProperty } from "@/shared/properties/URIProperty";

export class GeneralService {
  public getGenerals(params: any) {
    const url = URIProperty.getGeneral(params);
    const response = axios.get(url);
    return response;
  }

  public getDataComboboxRole() {
    const url = URIProperty.getDataComboboxRole();
    const response = axios.get(url);
    return response;
  }

  public getGeneralSeting(params: any) {
    const url = URIProperty.getGeneralSeting(params);
    const response = axios.get(url);
    return response;
  }

  public getGeneralControl(param: any) {
    const url = URIProperty.getGeneralControl(param);
    const response = axios.get(url);
    return response;
  }

  public addGeneral(params: any) {
    const url = URIProperty.addGeneral();
    const response = axios.post(url, params);
    return response;
  }

  public deleteGeneral(params: any) {
    const url = URIProperty.addGeneral();
    const response = axios.delete(url, { data: params });
    return response;
  }

  public getGeneralById(params: any) {
    const url = URIProperty.getGeneralById(params);
    const response = axios.get(url);
    return response;
  }

  public updateGeneral(params: any) { 
    const url = URIProperty.addGeneral();
    const response = axios.put(url, params);
    return response;
  }

  public getGeneralControlByKey1(params: any) {
    const url = URIProperty.getGeneralControlByKey1(params);
    const response = axios.get(url);
    return response;
  }
}
