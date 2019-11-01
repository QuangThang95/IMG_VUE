export interface INotification {
  notificationCode: number;
  agentCode: number;
  dateFrom: string;
  dateTo: string;
  branch_name: string;
  branchCode: string;
  notifyType: string;
  notify_text: string;
  manifest_number: string;
  contactNumber1: string;
  contactNumber2: string;
  contactNumber3: string;
  deliveryDate: string;
  endDate: string;
  section_number: number;
  displayOrder: number;
  deleteFlag: boolean;
  create_date: number;
  lastUpdate: number;
  id: number;
}

export class Notification implements INotification {
  public notificationCode: number;
  public agentCode: number;
  public dateFrom: string;
  public dateTo: string;
  public branch_name: string;
  public branchCode: string;
  public notifyType: string;
  public notify_text: string;
  public manifest_number: string;
  public contactNumber1: string;
  public contactNumber2: string;
  public contactNumber3: string;
  public deliveryDate: string;
  public endDate: string;
  public section_number: number;
  public displayOrder: number;
  public deleteFlag: boolean;
  public create_date: number;
  public lastUpdate: number;
  public id: number;

  constructor(data?: INotification) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
}
