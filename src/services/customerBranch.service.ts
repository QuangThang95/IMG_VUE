import axios from "axios";
import { CustomerBranch } from "@/models/customerBranch.model";
import { URIProperty } from "@/shared/properties/URIProperty";

export class CustomerBranchService {
  public getCustomerBranchs(customerCode: any) {
    const url = URIProperty.getCustomerBranchs(customerCode);
    const response = axios.get(url);
    return response;
  }

  public getCustomerBranch(params: any) {
    const url = URIProperty.getCustomerBranch(params);
    const response = axios.get(url);
    return response;
  }

  public getCustomerBranchOption(params: any) {
    const url = URIProperty.getCustomerBranchOption(params);
    const response = axios.get(url);
    return response;
  }

  public getCustomerBranchByWasteClass(params: any) {
    const url = URIProperty.getCustomerBranchByWasteClass(params);
    const response = axios.get(url);
    return response;
  }

  public addCustomerBranch(customerBranch: CustomerBranch) {
    const url = URIProperty.addCustomerBranch();
    const response = axios.post(url, customerBranch);
    return response;
  }

  public updateCustomerBranch(customerBranch: CustomerBranch) {
    const url = URIProperty.updateCustomerBranch();
    const response = axios.put(url, customerBranch);
    return response;
  }

  public updateDisplayOrderCustomerBranch(payload: any) {
    const url = URIProperty.updateDisplayOrderCustomerBranch();
    const response = axios.put(url, payload);
    return response;
  }

  public deleteCustomerBranch(payload: any) {
    const url = URIProperty.deleteCustomerBranch();
    const response = axios.delete(url, { data: payload });
    return response;
  }

  public getDischargeWasteClassByBranch(params: any) {
    const url = URIProperty.getDischargeWasteClassByBranch(params);
    return axios.get(url);
  }

  public getCustomerBranchByWasteClassPaging(params: any) {
    const url = URIProperty.getCustomerBranchByWasteClassPaging(params);
    return axios.get(url);
  }
}
