import axios from "axios";
import { URIProperty } from "@/shared/properties/URIProperty";

export class ContractService {
  public getContracts(params: any) {
    const url = URIProperty.getContracts(params);
    return axios.get(url);
  }

  public getContractDetail(params: any) {
    const url = URIProperty.getContractDetail(params);
    return axios.get(url);
  }

  public getContractPart(params: any) {
    const url = URIProperty.getContractPart(params);
    return axios.get(url);
  }

  public addContract(params: any) {
    const url = URIProperty.addContract();
    return axios.post(url, params);
  }

  public updateContract(params: any) {
    const url = URIProperty.updateContract();
    return axios.put(url, params);
  }

  public deleteContract(params: any) {
    const url = URIProperty.deleteContract();
    return axios.delete(url, { data: params });
  }

  public copyContract(params: any) {
    const url = URIProperty.copyContract();
    return axios.post(url, params);
  }

  public updateContractDisplayOrder(params: any) {
    const url = URIProperty.updateContractDisplayOrder();
    return axios.put(url, params);
  }

  public getContractPartDetail(params: any) {
    const url = URIProperty.getContractPartDetail(params);
    return axios.get(url);
  }

  public getContractBasicInfo(params: any) {
    const url = URIProperty.getContractBasicInfo(params);
    return axios.get(url);
  }

  public addContractPart(params: any) {
    const url = URIProperty.addContractPart();
    return axios.post(url, params);
  }

  public updateContractPart(params: any) {
    const url = URIProperty.updateContractPart();
    return axios.put(url, params);
  }

  public deleteContractPart(params: any) {
    const url = URIProperty.deleteContractPart();
    return axios.delete(url, { data: params });
  }

  public checkAddressContractPart(params: any) {
    const url = URIProperty.checkAddressContractPart();
    return axios.post(url, params);
  }

  public getContractParts(contractCode: any) {
    const url = URIProperty.getContractParts(contractCode);
    return axios.get(url);
  }

  public getContractWastes(params: any) {
    const url = URIProperty.getContractWastes(params);
    return axios.get(url);
  }

  public getContractFinalsPaging(params: any) {
    const url = URIProperty.getContractFinalsPaging(params);
    return axios.get(url);
  }

  public addContractWaste(params: any) {
    const url = URIProperty.addContractWaste(params);
    return axios.post(url, params.body);
  }

  public addContractFinal(params: any) {
    const url = URIProperty.addContractFinal(params);
    return axios.post(url, params.body);
  }

  public deleteContractWaste(params: any) {
    const url = URIProperty.deleteContractWaste(params);
    return axios.delete(url);
  }

  public deleteContractFinal(params: any) {
    const url = URIProperty.deleteContractFinal(params);
    return axios.delete(url);
  }
}
