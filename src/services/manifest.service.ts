import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class ManifestService {

    public getCustomerBranchByWasteClass(param: any) {
        const url = URIProperty.getCustomerBranchByWasteClass(param);
        return axios.get(url);
    }

    public getListWasteTypesForBranch(param: any) {
        const url = URIProperty.getListWasteTypesForBranch(param);
        return axios.get(url);
    }

    public searchGeneral(param: any) {
        const url = URIProperty.searchGeneral(param);
        return axios.get(url);
    }

    public countNumberOfEachTypeManifestForCustomer(param: any) {
        const url = URIProperty.countNumberOfEachTypeManifestForCustomer(param);
        return axios.get(url);
    }

    public listManifest(param: any) {
        const url = URIProperty.listManifest();
        return axios.post(url, param);
    }

    public getManifestHistory(param: any) {
        const url = URIProperty.getManifestHistory(param);
        return axios.get(url);
    }

    public getToxicSubstance() {
        const url = URIProperty.getToxicSubstance();
        return axios.get(url);
    }

    public getFinalDisposal(param: any) {
        const url = URIProperty.getFinalDisposal(param);
        return axios.get(url);
    }

    public getEmission(param: any) {
        const url = URIProperty.getEmission();
        return axios.post(url, param);
    }

    public getSupplier(param: any) {
        const url = URIProperty.getSuppliersPaging(param);
        return axios.get(url);
    }

    public getContract(param: any) {
        const url = URIProperty.getContract(param);
        return axios.get(url);
    }

    public getCustomerBranchWasteForManifest(param: any) {
        const url = URIProperty.getCustomerBranchWasteForManifest(param);
        return axios.get(url);
    }

    public getManifestUserForCustomer(param: any) {
        const url = URIProperty.getManifestUserForCustomer(param);
        return axios.get(url);
    }

    public getTransport(param: any) {
        const url = URIProperty.getTransport(param);
        return axios.get(url);
    }

    public getDispose(param: any) {
        const url = URIProperty.getDispose(param);
        return axios.get(url);
    }

    public getTransportManifest(param: any) {
        const url = URIProperty.getTransportManifest(param);
        return axios.get(url);
    }

    public getFinalManifest(param: any) {
        const url = URIProperty.getFinalManifest(param);
        return axios.get(url);
    }

    public addManifestReservation(param: any) {
        const url = URIProperty.addManifestReservation();
        return axios.post(url, param);
    }

    public addManifestRegistration(param: any) {
        const url = URIProperty.addManifestRegistration();
        return axios.post(url, param);
    }

    public getManifestByEntryCode(param: any) {
        const url = URIProperty.getManifestByEntryCode(param);
        return axios.get(url);
    }

    public getTransportByEntryCode(param: any) {
        const url = URIProperty.getTransportByEntryCode(param);
        return axios.get(url);
    }

    public getFinalDisposeByEntryCode(param: any) {
        const url = URIProperty.getFinalDisposeByEntryCode(param);
        return axios.get(url);
    }

    public getBillForManifest(param: any) {
        const url = URIProperty.getBillForManifest(param);
        return axios.get(url, { responseType: "blob" });
    }

    public checkDeliveryDate(param: any) {
        const url = URIProperty.checkDeliveryDate(param);
        return axios.get(url);
    }

    public updateManifest(param: any) {
        const url = URIProperty.updateManifest();
        return axios.put(url, param);
    }

    public updateManifest104(param: any) {
        const url = URIProperty.updateManifest104();
        return axios.put(url, param);
    }

    public updateManifest100(param: any) {
        const url = URIProperty.updateManifest100();
        return axios.put(url, param);
    }

    public getNameToxic(param: any) {
        const url = URIProperty.getNameToxic(param);
        return axios.get(url);
    }

    public checkContractToCreateManifest(param: any) {
        const url = URIProperty.checkContractToCreateManifest(param);
        return axios.get(url);
    }

    public checkDeliveryDateUpdate(param: any) {
        const url = URIProperty.checkDeliveryDateUpdate(param);
        return axios.get(url);
    }

    public uploadFile123(param: any) {
        const url = URIProperty.uploadFileWasteClass123(param);
        return axios.post(url, param.fileUpload);
    }

    public uploadFile45(param: any) {
        const url = URIProperty.uploadFileWasteClass45(param);
        return axios.post(url, param.fileUpload);
    }

    public deleteFile123(param: any) {
        const url = URIProperty.deleteFileWasteClass123(param);
        return axios.post(url, param.fileUpload);
    }

    public deleteFile45(param: any) {
        const url = URIProperty.deleteFileWasteClass45(param);
        return axios.post(url, param.fileUpload);
    }

    public getEmissionBy45(param: any) {
        const url = URIProperty.getEmissionBy45(param);
        return axios.get(url);
    }

    public getTransportByWaste45(param: any) {
        const url = URIProperty.getTransportByWaste45(param);
        return axios.get(url);
    }

    public addManifest45(param: any) {
        const url = URIProperty.addManifest45();
        return axios.post(url, param);
    }

    public getManifestByWaste45(param: any) {
        const url = URIProperty.getManifestByWaste45(param);
        return axios.get(url);
    }

    public getDisposeWaste45PopUp(param: any) {
        const url = URIProperty.getSuppliersPaging(param);
        return axios.get(url);
    }

    public updateManifest45(param: any) {
        const url = URIProperty.updateManifest45();
        return axios.put(url, param);
    }

    public getEmissionPopUpBy45NotContract(param: any) {
        const url = URIProperty.getEmissionPopUpBy45NotContract();
        return axios.post(url, param);
    }

    public getUserByTranportPopUp(param: any) {
        const url = URIProperty.getUserByTranportPopUp(param);
        return axios.get(url);
    }

    public checkDeliveryDateRegistration(param: any) {
        const url = URIProperty.checkDeliveryDateRegistration(param);
        return axios.get(url);
    }
}

