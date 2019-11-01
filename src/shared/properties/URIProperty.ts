import ControllerProperty from './controller.propety';
import { tryMapPathApiEncoded, tryMapPathApiHasNullEncoded } from '../utilities';

export const URIProperty = {

  login() {
    return ControllerProperty.Authentication;
  },

  getCustomerByCustomerCode(customerCode: any) {
    return ControllerProperty.Customer.concat(`/${customerCode}`);
  },

  getCustomers() {
    return ControllerProperty.Customer.concat(`/All`);
  },

  getCustomerOption(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Customer + path;
  },

  addCustomer() {
    return ControllerProperty.Customer;
  },

  updateCustomer() {
    return ControllerProperty.Customer;
  },

  updateDisplayOrderCustomer() {
    return ControllerProperty.Customer.concat(`/DisplayOrder`);
  },

  deleteCustomer() {
    return ControllerProperty.Customer;
  },

  getAddressByPostalCode(postalCode: any) {
    return ControllerProperty.Address + '/' + postalCode;
  },

  getCustomerBranchs(customerCode: number) {
    return ControllerProperty.CustomerBranch + '/All/' + customerCode;
  },

  getCustomerBranchOption(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.CustomerBranch + path;
  },

  getCustomerBranch(params: any) {
    return (
      ControllerProperty.CustomerBranch +
      '/' +
      params.branchCode +
      '/CustomerCode/' +
      params.customerCode
    );
  },

  getCustomerBranchByWasteClass(params: any) {
    return ControllerProperty.CustomerBranch.concat(
      `/All/ForCustomer/${params.customerCode}/ByWasteClass/${
      params.wasteClass
      }`);
  },

  getCustomerBranchByWasteClassPaging(params: any) {
    const path = tryMapPathApiEncoded(params.param);
    return ControllerProperty.CustomerBranch.concat(
      `/ListByCustomer/${params.customerCode}/WasteClass/${params.wasteClass}`).concat(path);
  },

  addCustomerBranch() {
    return ControllerProperty.CustomerBranch;
  },

  updateCustomerBranch() {
    return ControllerProperty.CustomerBranch;
  },

  updateDisplayOrderCustomerBranch() {
    return ControllerProperty.CustomerBranch.concat(`/DisplayOrder`);
  },

  deleteCustomerBranch() {
    return ControllerProperty.CustomerBranch;
  },

  getCustomerGroup(customerCode: number) {
    return ControllerProperty.CustomerGroup.concat('/All/' + customerCode);
  },

  addCustomerGroup() {
    return ControllerProperty.CustomerGroup;
  },

  updateCustomerGroup() {
    return ControllerProperty.CustomerGroup;
  },

  deleteCustomerGroup() {
    return ControllerProperty.CustomerGroup;
  },

  getCustomerGroupByCode(param: any) {
    return (
      `/CustomerGroup/ByGroupCode/${param.customerCode}/${
      param.groupCode
      }`
    );
  },

  getCustomerBranchGroup(customerCode: number) {
    return ControllerProperty.CustomerBranch.concat(
      '/All/' + customerCode
    );
  },

  getCustomerBranchByGroup(param: any) {
    return ControllerProperty.CustomerBranch.concat(
      `/ByGroup?customerCode=${
      param.customerCode
      }&groupCode=${param.groupCode}&belongToGroup=${param.belongToGroup}`
    );
  },

  getCustomerBranchByCustomerGroup(param: any) {
    return ControllerProperty.CustomerBranch.concat(
      `/ByGroup?customerCode=${param.customerCode}&groupCode=${param.groupCode}&belongToGroup=true`
    );
  },

  updateCustomerGroupLink() {
    return ('/CustomerGroupLink');
  },

  // getAll CustomerGroup

  getAllCustomerGroup(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.CustomerGroup.concat(path);
  },

  displayOrderCustomerGroup() {
    return ControllerProperty.CustomerGroup.concat('/DisplayOrder');
  },

  getAllCustomerBanchByGroup(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.CustomerBranch.concat('/ByGroupPaging').concat(path)
  },

  getGeneral(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.General + path;
  },

  getGenerals(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.General + path;
  },

  getAllSupplierHandle(customerCode: number) {
    return ControllerProperty.Supplier.concat('/All/' + customerCode);
  },

  deleteSupplierHandle() {
    return ControllerProperty.Supplier;
  },

  addSupplierHandle() {
    return ControllerProperty.Supplier;
  },

  getSupplierHandleByCode(param: any) {
    return ControllerProperty.Supplier.concat(`/BySupplierCode/${param.customerCode}/${param.supplierCode}`);
  },

  updateSupplierHandle() {
    return ControllerProperty.Supplier;
  },
  // Search FSHI0005
  getSuppliersPaging(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.Supplier.concat(path);
  },

  displayOrderSupplier() {
    return ControllerProperty.Supplier.concat(`/DisplayOrder`);
  },

  getAllSupplierUser(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.User.concat('/SupplierUserPaging').concat(path);
  },
  // FSHI0006 Factory
  getFactorys(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Factory.concat('/List').concat(path);
  },

  displayOrderFactory() {
    return ControllerProperty.Factory.concat(`/DisplayOrder`);
  },

  getFactoryCarriers(params: any) {
    const path = tryMapPathApiEncoded(params.param);
    return ControllerProperty.Factory.concat(
      `/Carrier/Customer/${params.customerCode}/Supplier/${params.supplierCode}${path}`
    );
  },

  getFactorysById(params: any) {
    return ControllerProperty.Factory + '/ByCustomer/' + params.customerCode + '/Supplier/' + params.supplierCode + '/Factory/' + params.factoryCode;
  },

  getFactoryLicenseById(params: any) {
    return ControllerProperty.FactoryLicense + '/FactoryLicenseById/Customer/' + params.customerCode + '/Supplier/' + params.supplierCode + '/Factory/' + params.factoryCode + '/rowNumber/' + + params.rowNumber + '/licenseClass/' + params.licenseClass;
  },

  getFactoryFinalById(params: any) {
    return ControllerProperty.FactoryFinal + '/FactoryFinalPopupById/' + params.finalFactoryCode + '/Customer/' + params.customerCode + '/Supplier/' + params.supplierCode + '/Factory/' + params.factoryCode;
  },

  getFactoryLicenseGeneral(params: any) {
    const path = tryMapPathApiEncoded(params.paging);
    return ControllerProperty.FactoryLicense + '/ListFactoryLicenseGeneral/Customer/' + params.customerCode + '/Supplier/' + params.supplierCode + '/Factory/' + params.factoryCode + path;
  },

  getFactoryFinal(params: any) {
    const path = tryMapPathApiEncoded(params.paging);
    return ControllerProperty.FactoryFinal + '/Paging/Customer/' + params.customerCode + '/Supplier/' + params.supplierCode + '/Factory/' + params.factoryCode + path;
  },

  urlFactorys() {
    return ControllerProperty.Factory;
  },

  urlFactoryFinal() {
    return ControllerProperty.FactoryFinal;
  },

  getFactoryFinalForContractFinal(params: any) {
    return ControllerProperty.FactoryFinal
      .concat(`/ListFactoryFinalForContractScreen/Customer/${params.customerCode}`)
      .concat(`/DisposeFactory/${params.disposeFactoryCode}/RedisposeFactory/${params.redisposeFactoryCode}`);
  },

  urlFactoryLicense() {
    return ControllerProperty.FactoryLicense;
  },

  getFactorysSupplier(params: any) {
    const path = tryMapPathApiEncoded(params.paging);
    return ControllerProperty.Supplier.concat(`/ListSupplierDisposalPaging${path}&customerCode=${params.customerCode}`)
  },

  getSupplierHandleGridTab(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.User.concat('/SupplierUserPaging').concat(path);
  },

  getAttack(params: any) {
    const path = tryMapPathApiEncoded(params.paging);
    return ControllerProperty.SupplierFile.concat(`/${params.supplierCode}/ByCustomerCode/${params.customerCode}`).concat(path).concat(`&factoryCode=${params.factoryCode}`);
  },

  getAttackSupplier(params: any) {
    const path = tryMapPathApiEncoded(params.paging);
    return ControllerProperty.SupplierFile.concat(`/${params.supplierCode}/ByCustomerCode/${params.customerCode}`).concat(path);
  },


  urlAttachFile() {
    return ControllerProperty.SupplierFile;
  },

  deleteAttachFile(params: any) {
    return ControllerProperty.SupplierFile.concat(`?FileCode=${params}`);
  },

  urlAttachUpload(params: any) {
    return ControllerProperty.SupplierFile.concat(`/Upload/Customer/${params.customerCode}/Supplier/${params.supplierCode}?factoryCode=${params.factoryCode}`);
  },

  urlAttachUploadSupplier(params: any) {
    return (`/SupplierFile/Upload/Customer/${params.customerCode}/Supplier/${params.supplierCode}`);
  },

  urlAttachUploadUpdate(params: any) {
    return ControllerProperty.SupplierFile.concat(`/${params.dataAttactFile.fileCode}`);
  },

  urlAttachDownload(params: any) {
    return ControllerProperty.SupplierFile.concat(`/Download/${params}`);
  },

  createSupplierUser() {
    return ControllerProperty.User.concat(`/SupplierUser`);
  },

  updateSupplierUser() {
    return ControllerProperty.User.concat(`/SupplierUser`);
  },

  deleteSupplierUser() {
    return ControllerProperty.User;
  },

  getSupplierUserByCode(param: any) {
    return ControllerProperty.User.concat(`/SupplierUser/${param.userCode}/CustomerCode/${param.customerCode}`);
  },

  //User 
  getUserIncharge(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.User + '/UserIncharge/' + param.customerCode + path;
  },

  addUser() {
    return ControllerProperty.User;
  },

  getUserByCode(param: any) {
    return ControllerProperty.User.concat(`/${param.userCode}/CustomerCode/${param.customerCode}`);
  },

  getCustomerBranchWastes(payload: any) {
    const path = tryMapPathApiEncoded(payload.param);
    return ControllerProperty.CustomerBranchWaste.concat(
      `/Customer/${payload.customerCode}/Branch/${payload.branchCode}/WasteClass/${payload.wasteClass}${path}`
    );
  },

  getCustomerBranchWasteTypesForBranch(param: any) {
    return ControllerProperty.CustomerBranchWaste.concat(
      `/ListWasteTypesForBranch/${param.branchCode}/CustomerCode/${param.customerCode}/WasteClass/${param.wasteClass}`
    );
  },

  getCustomerBranchWaste(payload: any) {
    const path = tryMapPathApiEncoded(payload.param);
    return ControllerProperty.CustomerBranchWaste.concat(
      `/ListByCustomer/${payload.customerCode}/Branch/${payload.branchCode}/WasteClass/${payload.wasteClass}${path}`
    );
  },

  getCustomerBranchWasteDefineWaste(params: any) {
    return ControllerProperty.CustomerBranchWaste
      .concat(`/ListDefineWaste/Customer/${params.customerCode}`)
      .concat(`/Contract/${params.contractCode}/Branch/${params.branchCode}`)
      .concat(`/WasteClass/${params.wasteClass}/SectionNumber/${params.sectionNumber}`);
  },

  addCustomerBranchWaste(payload: any) {
    return ControllerProperty.CustomerBranchWaste + '/Customer/' + payload.customerCode + '/Branch/' + payload.branchCode + '/WasteClass/' + payload.wasteClass;
  },

  updateCustomerBranchWasteDisplayOrder() {
    return ControllerProperty.CustomerBranchWaste.concat(`/DisplayOrder`);
  },

  getListBranchForNotification(customerCode: number, wasteClass: number) {
    return ControllerProperty.CustomerBranch + '/All/ForCustomer/' + customerCode + '/ByWasteClass/' + wasteClass;
  },

  getTotalCountForNotification(notifyType: number, params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/Total/ByNotifyType/' + notifyType + path;
  },

  getNotifications(customerCode: number) {
    return ControllerProperty.Notification + '/List?currentCustomerCode=' + customerCode;
  },

  searchNotifications(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/Paging' + path;
  },

  changeWasteClassForNotification(notifyClass: number) {
    return ControllerProperty.Notification + '/InitWasteClass?currentWasteClass=' + notifyClass;
  },

  getNotifyWasteHomeScreen(customerCode: number) {
    return ControllerProperty.Notification.concat(`/Total/NotifyWasteHomeScreen/CustomerCode/${customerCode}`);
  },

  getNotifySupplierHomeScreen(customerCode: number) {
    return ControllerProperty.Notification.concat(`/Total/NotifySupplierHomeScreen/CustomerCode/${customerCode}`);
  },

  getDischargeWasteClassByBranch(params: any) {
    return ControllerProperty.CustomerBranch + '/DischargeWasteClass/ForCustomer/' +
      params.customerCode + '/BranchCode/' + params.branchCode;
  },

  getWasteCompanyDataForNotification(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/ForWasteCompany/' + path;
  },

  getDeliveryCompanyDataForNotification(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/ForDeliveryCompany/' + path;
  },

  getDisposalCompanyDataForNotification(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/ForDisposalCompany/' + path;
  },

  getListBranchForErrorNotification(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/CustomerBranchSource/' + path;
  },

  getNotificationsErrorSystemForNotification(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.Notification + '/ErrorPaging/' + path;
  },

  updateNotificationsError() {
    return ControllerProperty.Notification + '/Notify';
  },
  // Contract
  getContracts(params: any) {
    const path = tryMapPathApiEncoded(params.param);
    return ControllerProperty.Contract.concat(`/Paging/customer/${params.customerCode}${path}`);
  },

  getContractDetail(param: any) {
    return ControllerProperty.Contract.concat(
      `/ContractDetails/${param.contractCode}/Customer/${param.customerCode}/Branch/${param.branchCode}`
    );
  },

  getContractPart(param: any) {
    return ControllerProperty.Contract.concat(
      `/ContractPartByContractCode/${param.contractCode}/Customer/${param.customerCode}/Branch/${param.branchCode}`
    );
  },

  getContractPartDetail(param: any) {
    return ControllerProperty.Contract.concat(
      `/ContractPartBySectionNumber/${param.sectionNumber}/Contract/${param.contractCode}`
    );
  },

  getContractBasicInfo(contractCode: any) {
    return ControllerProperty.Contract.concat(`/${contractCode}/BasicInfo`);
  },

  addContract() {
    return ControllerProperty.Contract;
  },

  updateContract() {
    return ControllerProperty.Contract;
  },

  deleteContract() {
    return ControllerProperty.Contract;
  },

  copyContract() {
    return ControllerProperty.Contract.concat('/Copy');
  },

  updateContractDisplayOrder() {
    return ControllerProperty.Contract.concat(`/DisplayOrder`);
  },

  addContractPart() {
    return ControllerProperty.Contract.concat('/ContractPart');
  },

  updateContractPart() {
    return ControllerProperty.Contract.concat('/ContractPart');
  },

  deleteContractPart() {
    return ControllerProperty.Contract.concat('/ContractPart');
  },

  checkAddressContractPart() {
    return ControllerProperty.Contract.concat('/CheckAddressContractPart');
  },

  getContractParts(contractCode: any) {
    return ControllerProperty.Contract.concat(`/${contractCode}/ContractParts`);
  },

  getContractWastes(params: any) {
    return ControllerProperty.Contract.concat(
      `/ListContractWaste/${params.contractCode}/SectionNumber/${params.sectionNumber}/WasteClass/${params.wasteClass}`
    );
  },

  getContractFinalsPaging(params: any) {
    const path = tryMapPathApiEncoded(params.param);
    return ControllerProperty.Contract.concat(
      `/ListContractFinal/${params.contractCode}`
    ).concat(`${path}`);
  },

  addContractWaste(params: any) {
    return ControllerProperty.Contract
      .concat(`/ContractWaste/${params.contractCode}/Customer/${params.customerCode}`)
      .concat(`/Branch/${params.branchCode}/SectionNumber/${params.sectionNumber}/WasteClass/${params.wasteClass}`);
  },

  addContractFinal(params: any) {
    return ControllerProperty.Contract
      .concat(`/ContractFinal/${params.contractCode}`);
  },

  deleteContractWaste(params: any) {
    return ControllerProperty.Contract
      .concat(`/ContractWaste/${params.contractCode}/SectionNumber/${params.sectionNumber}`)
      .concat(`/WasteClass/${params.wasteClass}/WasteCode/${params.wasteCode}`);
  },

  deleteContractFinal(params: any) {
    return ControllerProperty.Contract
      .concat(`/ContractFinal/${params.contractCode}/Supplier/${params.supplierCode}`)
      .concat(`/Factory/${params.factoryCode}/FactoryFinal/${params.finalFactoryCode}`);
  },

  getDataComboboxRole() {
    return ControllerProperty.General + '/DataComboboxRole';
  },

  // General
  getGeneralSeting(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.General + '/Paging' + path;
  },

  getGeneralControl(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.General + '/AllGeneralControl' + path;
  },

  addGeneral() {
    return ControllerProperty.General;
  },

  getGeneralById(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.General + path;
  },

  getGeneralControlByKey1(params: any) {
    const path = tryMapPathApiEncoded(params);
    return ControllerProperty.General + '/GeneralControlByKey1' + path;
  },


  // Manifest

  getListWasteTypesForBranch(param: any) {
    return ControllerProperty.CustomerBranchWaste.concat(
      `/ListWasteTypesForBranch/${param.branchCode}/CustomerCode/${param.customerCode}/WasteClass/${param.wasteClass}`
    );
  },

  searchGeneral(param: any) {
    const path = tryMapPathApiHasNullEncoded(param);
    return ControllerProperty.General.concat(path);
  },

  countNumberOfEachTypeManifestForCustomer(param: any) {
    return (`/manifest/sshi0031/NumberOfEachTypeManifestForCustomer/${param.customerCode}/WasteClass/${param.wasteClass}/Branch/${param.branchCode}`);
  },

  listManifest() {
    return (`/Manifest/Filter`);
  },

  getManifestHistory(param: any) {
    return (`/ManifestHistory/${param.entryCode}/Customer/${param.customerCode}`);
  },

  getToxicSubstance() {
    return (`/general/hamfultoxics`);
  },

  getFinalDisposal(param: any) {
    return (`/factoryfinal/ListFactoryFinalForContractScreen/Customer/${param.customerCode}/DisposeFactory/${param.disposeFactoryCode}/RedisposeFactory/${param.redisposeFactoryCode}`);
  },

  getEmission() {
    return (`/contract/emisson`);
  },

  getContract(params: any) {
    const path = tryMapPathApiEncoded(params.param);
    return (`/Contract/Paging/Customer/${params.customerCode}`).concat(path);
  },
  checkContractToCreateManifest(param: any) {
    return (`/Contract/ValidForManifest/Contract/${param.contractCode}/DeliveryDate/${param.deliveryDate}`);
  },
  getCustomerBranchWasteForManifest(param: any) {
    return (`/CustomerBranchWaste/ForManifestScreen/Customer/${param.customerCode}/Branch/${param.branchCode}/Contract/${param.contractCode}/WasteClass/${param.wasteClass}`);
  },

  getManifestUserForCustomer(params: any) {
    const path = tryMapPathApiEncoded(params.param);
    return (`/User/ManifestUserForCustomer/${params.customerCode}`).concat(path);
  },

  getTransport(param: any) {
    return (`/Transport/TransportDatasource/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/ContractCode/${param.contractCode}`);
  },

  getDispose(param: any) {
    return (`/Contract/Dispose/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/ContractCode/${param.contractCode}`)
  },
  getSupplierLicense(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.SupplierLicense.concat('/Paging').concat(path)
  },

  getTransportManifest(param: any) {
    return (`/Manifest/TransportManifest/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/EntryCode/${param.entryCode}`)
  },

  getFinalManifest(param: any) {
    return (`/Manifest/ManifestFinal/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/EntryCode/${param.entryCode}`)
  },

  addManifestReservation() {
    return ('/manifest/ManifestDataFromReservation');
  },

  addManifestRegistration() {
    return ('/manifest/ManifestDataFromRegistration');
  },

  getManifestByEntryCode(param: any) {
    return (`/Manifest/Manifest/CustomerCode/${param.customerCode}/Entry/${param.entryCode}/WasteClass/${param.wasteClass}`)
  },

  getTransportByEntryCode(param: any) {
    return (`/Manifest/TransportDataSource/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/EntryCode/${param.entryCode}`)
  },

  getFinalDisposeByEntryCode(param: any) {
    return (`/FactoryFinal/FinalDispose/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/EntryCode/${param.entryCode}`)
  },

  getBillForManifest(param: any) {
    return (`/manifest/billing/${param.entryCode}/customer/${param.customerCode}`);
  },

  checkDeliveryDate(deliveryDate: any) {
    return (`/Manifest/Calendar/DeliveryDate/${deliveryDate}`);
  },

  updateManifest() {
    return (`/manifest/ManifestToxicTransportPlan`);
  },

  updateManifest104() {
    return (`/manifest/ManifestCancel`);
  },

  updateManifest100() {
    return (`/manifest/ManifestToxicTransportTplanReservation`);
  },

  checkDeliveryDateUpdate(param: any) {
    return (`/Manifest/Calendar/Manifest/ManifestClass/${param.manifestClass}/DeliveryDate/${param.deliveryDate}/ReserveLimit/${param.reserveLimit}`);
  },

  getNameToxic(param: any) {
    return (`/Manifest/ToxicName/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/EntryCode/${param.entryCode}`);
  },

  getEmissionBy45(param: any) {
    return (`/Manifest/WasteDatasource/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/WasteClass/${param.wasteClass}/ContractCode/${param.contractCode}`)
  },

  uploadFileWasteClass123(param: any) {
    return (`/Manifest/ManifestTransportToxicTPlanDataFromUploadFile/CustomerCode/${param.customerCode}`);
  },

  deleteFileWasteClass123(param: any) {
    return (`/Manifest/Manifest96File/CustomerCode/${param.customerCode}`);
  },

  uploadFileWasteClass45(param: any) {
    return (`/Manifest/ManifestTransportUploadFile/CustomerCode/${param.customerCode}`);
  },

  deleteFileWasteClass45(param: any) {
    return (`/Manifest/Manifest23File/CustomerCode/${param.customerCode}`);
  },

  getTransportByWaste45(param: any) {
    return (`/Transport/Transport/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/ContractCode/${param.contractCode}`);
  },

  addManifest45() {
    return (`/manifest/manifesttransportuser`);
  },

  getManifestByWaste45(param: any) {
    return (`/Manifest/ManifestTransport/CustomerCode/${param.customerCode}/BranchCode/${param.branchCode}/ContractCode/${param.contractCode}/EntryCode/${param.entryCode}`);
  },

  updateManifest45() {
    return (`/manifest`);
  },

  getEmissionPopUpBy45NotContract() {
    return (`/contract/EmissonNotContract`);
  },

  getUserByTranportPopUp(param: any) {
    return (`/User/By/Supplier/${param.supplierCode}/CustomerCode/${param.customerCode}?userTypeCode=5`)
  },

  checkDeliveryDateRegistration(deliveryDate: any) {
    return (`/Manifest/CalendarRegistration/DeliveryDate/${deliveryDate}`)
  },

  //REPORT
  createReport() {
    return ControllerProperty.Report.concat(`/CreateReport`);
  },

  getReport(param: any) {
    const path = tryMapPathApiEncoded(param);
    return ControllerProperty.Report + '/List' + path;
  },

  visibleButtonCreate(param: any) {
    return ControllerProperty.Report.concat(`/btnAggregate/Visible?customerCode=${param.customerCode}&wasteClass=${param.wasteClass}`);
  },

  urlAttachDownloadReport(params: any) {
    return ControllerProperty.Report.concat(`/Download/${params}`);
  },

  downLoadFile() {
    return ControllerProperty.File;
  },
};
