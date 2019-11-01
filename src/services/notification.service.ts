import axios from 'axios';
import { URIProperty } from '@/shared/properties/URIProperty';

export class NotificationService {
  public getListBranchForNotification(customerCode: number, wasteClass: number) {
    const url = URIProperty.getListBranchForNotification(customerCode, wasteClass);
    const response = axios.get(url);
    return response;
  }

  public getTotalCountForNotification(notifyType: number, params: any) {
    const url = URIProperty.getTotalCountForNotification(notifyType, params);
    const response = axios.get(url);
    return response;
  }

  public getNotifications(customerCode: number) {
    const url = URIProperty.getNotifications(customerCode);
    const response = axios.get(url);
    return response;
  }

  public searchNotifications(params: any) {
    const url = URIProperty.searchNotifications(params);
    const response = axios.get(url);
    return response;
  }

  public changeWasteClassForNotification(notifyClass: number) {
    const url = URIProperty.changeWasteClassForNotification(notifyClass);
    const response = axios.get(url);
    return response;
  }

  public getDischargeWasteClassByBranch(params: any) {
    const url = URIProperty.getDischargeWasteClassByBranch(params);
    const response = axios.get(url);
    return response;
  }

  public getNotifyWasteHomeScreen(customerCode: number) {
    const url = URIProperty.getNotifyWasteHomeScreen(customerCode);
    const response = axios.get(url);
    return response;
  }

  public getNotifySupplierHomeScreen(customerCode: number) {
    const url = URIProperty.getNotifySupplierHomeScreen(customerCode);
    const response = axios.get(url);
    return response;
  }

  public getWasteCompanyDataForNotification(params: any) {
    const url = URIProperty.getWasteCompanyDataForNotification(params);
    const response = axios.get(url);
    return response;
  }

  public getDeliveryCompanyDataForNotification(params: any) {
    const url = URIProperty.getDeliveryCompanyDataForNotification(params);
    const response = axios.get(url);
    return response;
  }

  public getDisposalCompanyDataForNotification(params: any) {
    const url = URIProperty.getDisposalCompanyDataForNotification(params);
    const response = axios.get(url);
    return response;
  }

  public getListBranchForErrorNotification(params: any) {
    const url = URIProperty.getListBranchForErrorNotification(params);
    const response = axios.get(url);
    return response;
  }

  public getNotificationsErrorSystemForNotification(params: any) {
    const url = URIProperty.getNotificationsErrorSystemForNotification(params);
    const response = axios.get(url);
    return response;
  }

  public updateNotificationsError(params: any) {
    const url = URIProperty.updateNotificationsError();
    const response = axios.put(url, params);
    return response;
  }
}
