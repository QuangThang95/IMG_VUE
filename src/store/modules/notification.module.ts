import { Notification } from '@/models/notification.model';
import { NotificationService } from '@/services/notification.service';
import { BaseService } from '@/shared/utilities';
import { HomeWidgetData, HomeCardData } from '@/constants/Home';

const notificationService = new NotificationService();
const baseService = new BaseService();

export default {
  namespaced: true,

  state: {
    notifications: [],
    notificationsOptions: {},
    status: '',
    branchs: [],
    wastes: [],
    totalTranfer: 0,
    totalEdit: 0,
    totalReportExpired: 0,
    totalNotifyExpired: 0,
    totalCorrectCancel: 0,
    totalTranferEnd: 0,
    totalTreatmentEnd: 0,
    totalTreatmentFinal: 0,
    totalReportTranfer: 0,
    totalReportTreatmentEnd: 0,
    totalReportTreatmentFinal: 0,
    dischargeWaste: {},
    count: 0,
    pageCount: 0,
    notifyWaste: HomeCardData,
    notifySupplier: HomeWidgetData,
    wasteCompanyData: [],
    deliveryCompanyData: [],
    disposalCompanyData: [],
    errorBranchs: [],
    notificationsErrorSystem: [],
    notificationsErrorSystemOptions: {},
    dataError: [],
    responseUpdateNotify: {}
  },

  getters: {
    getListNotifications: (state: any) => {
      return state.notifications.filter(
        (notification: Notification) => notification.deleteFlag === false,
      );
    },

    getNotifications: (state: any) => {
      return state.notificationsOptions;
    },

    getCount: (state: any) => {
      return state.count;
    },

    getPageCount: (state: any) => {
      return state.pageCount;
    },

    getStatus: (state: any) => state.status,

    getTotalRows: (state: any) => state.count,

    getListBranch: (state: any) => {
      return state.branchs;
    },

    getTotalTranfer: (state: any) => {
      return state.totalTranfer;
    },

    getTotalEdit: (state: any) => {
      return state.totalEdit;
    },

    getTotalReportExpired: (state: any) => {
      return state.totalReportExpired;
    },

    getTotalNotifyExpired: (state: any) => {
      return state.totalNotifyExpired;
    },

    getTotalCorrectCancel: (state: any) => {
      return state.totalCorrectCancel;
    },

    getTotalTranferEnd: (state: any) => {
      return state.totalTranferEnd;
    },

    getTotalTreatmentEnd: (state: any) => {
      return state.totalTreatmentEnd;
    },

    getTotalTreatmentFinal: (state: any) => {
      return state.totalTreatmentFinal;
    },

    getTotalReportTranfer: (state: any) => {
      return state.totalReportTranfer;
    },

    getTotalReportTreatmentEnd: (state: any) => {
      return state.totalReportTreatmentEnd;
    },

    getTotalReportTreatmentFinal: (state: any) => {
      return state.totalReportTreatmentFinal;
    },

    getDischargeWaste: (state: any) => {
      return state.dischargeWaste;
    },

    getNotifyWaste: (state: any) => {
      return state.notifyWaste;
    },

    getNotifySupplier: (state: any) => {
      return state.notifySupplier;
    },

    getWasteCompanyData: (state: any) => {
      return state.wasteCompanyData;
    },

    getDeliveryCompanyData: (state: any) => {
      return state.deliveryCompanyData;
    },

    getDisposalCompanyData: (state: any) => {
      return state.disposalCompanyData;
    },

    getListBranchForError: (state: any) => {
      return state.errorBranchs;
    },

    getNotificationsErrorSystem: (state: any) => {
      return state.notificationsErrorSystemOptions;
    },

    setDataError: (state: any) => {
      return state.dataError;
    },

    updateNotificationsError: (state: any) => {
      return state.responseUpdateNotify;
    }
  },

  mutations: {
    GET_LIST_BRANCH_FOR_NOTIFICATION(state: any, payload: any) {
      state.branchs = [...payload];
    },

    GET_TOTAL_TRANFER_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalTranfer = payload.count;
    },

    GET_TOTAL_EDIT_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalEdit = payload.count;
    },

    GET_TOTAL_REPORT_EXPIRED_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalReportExpired = payload.count;
    },

    GET_TOTAL_NOTIFY_EXPIRED_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalNotifyExpired = payload.count;
    },

    GET_TOTAL_CORRECT_CANCEL_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalCorrectCancel = payload.count;
    },

    GET_TOTAL_TRANFER_END_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalTranferEnd = payload.count;
    },

    GET_TOTAL_TREATMENT_END_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalTreatmentEnd = payload.count;
    },

    GET_TOTAL_TREATMENT_FINAL_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalTreatmentFinal = payload.count;
    },

    GET_TOTAL_REPORT_TRANFER_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalReportTranfer = payload.count;
    },

    GET_TOTAL_REPORT_TREATMENT_END_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalReportTreatmentEnd = payload.count;
    },

    GET_TOTAL_REPORT_TREATMENT_FINAL_FOR_NOTIFICATION(state: any, payload: any) {
      state.totalReportTreatmentFinal = payload.count;
    },

    GET_NOTIFICATIONS(state: any, payload: any) {
      state.notifications = [...payload.result];
    },

    SEARCH_NOTIFICATIONS(state: any, payload: any) {
      state.notificationsOptions = { ...payload };
      state.notifications = [...payload.items];
      state.count = payload.count;
      state.pageCount = payload.pageCount;
    },

    CHANGE_WASTE_CLASS_FOR_NOTIFICATION(state: any, payload: any) {
      state.wastes = Object.assign({}, payload);
    },

    GET_DISCHARGE_WASTE_CLASS_FOR_NOTIFICATION(state: any, payload: any) {
      state.dischargeWaste = { ...payload.result };
    },

    GET_NOTIFY_WASTE_HOME(state: any, payload: any) {
      state.notifyWaste = [...payload];
    },

    GET_NOTIFY_SUPPLIER_HOME(state: any, payload: any) {
      state.notifySupplier = [...payload];
    },

    GET_WASTE_COMPANY_DATA_FOR_NOTIFICATION(state: any, payload: any) {
      state.wasteCompanyData = [...payload.result];
    },

    GET_DELIVERY_COMPANY_DATA_FOR_NOTIFICATION(state: any, payload: any) {
      state.deliveryCompanyData = [...payload.result];
    },

    GET_DISPOSAL_COMPANY_DATA_FOR_NOTIFICATION(state: any, payload: any) {
      state.disposalCompanyData = [...payload.result];
    },

    GET_LIST_BRANCH_FOR_ERROR_NOTIFICATION(state: any, payload: any) {
      state.errorBranchs = [...payload.result];
    },

    GET_NOTIFICATIONS_ERROR_SYSTEM_FOR_NOTIFICATION(state: any, payload: any) {
      state.notificationsErrorSystemOptions = {...payload};
    },

    SET_DATA_ERROR(state: any, payload: any) {
      if(payload) {
        const array = [];
        array.push(payload)
        state.dataError = [...array];
      }else {
        state.dataError = [];
      }
    },

    UPDATE_NOTIFICATIONS_ERROR(state: any, payload: any) {
      state.responseUpdateNotify = Object.assign({}, payload);
    }
  },

  actions: {
    getListBranchForNotification(context: any, { customerCode, wasteClass }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_LIST_BRANCH_FOR_NOTIFICATION',
          notificationService.getListBranchForNotification(customerCode, wasteClass),
        );
      });
    },

    getTotalTranferForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_TRANFER_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalEditForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_EDIT_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalReportExpiredForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_REPORT_EXPIRED_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalNotifyExpiredForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_NOTIFY_EXPIRED_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalCorrectCancelForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_CORRECT_CANCEL_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalTranferEndForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_TRANFER_END_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalTreatmentEndForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_TREATMENT_END_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalTreatmentFinalForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_TREATMENT_FINAL_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalReportTranferForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_REPORT_TRANFER_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalReportTreatmentEndForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_REPORT_TREATMENT_END_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getTotalReportTreatmentFinalForNotification(context: any, { notifyType, params }: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TOTAL_REPORT_TREATMENT_FINAL_FOR_NOTIFICATION',
          notificationService.getTotalCountForNotification(notifyType, params),
        );
      });
    },

    getNotifications(context: any, customerCode: number) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_NOTIFICATIONS',
          notificationService.getNotifications(customerCode),
        );
      });
    },

    searchNotifications(context: any, params: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'SEARCH_NOTIFICATIONS',
          notificationService.searchNotifications(params),
        );
      });
    },

    changeWasteClassForNotification(context: any, notifyClass: number) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'CHANGE_WASTE_CLASS_FOR_NOTIFICATION',
          notificationService.changeWasteClassForNotification(notifyClass),
        );
      });
    },

    getDischargeWasteClassByBranch(context: any, params: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DISCHARGE_WASTE_CLASS_FOR_NOTIFICATION',
          notificationService.getDischargeWasteClassByBranch(params),
        );
      });
    },

    getNotifyWaste(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_NOTIFY_WASTE_HOME',
          notificationService.getNotifyWasteHomeScreen(param)
        );
      });
    },

    getNotifySupplier(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_NOTIFY_SUPPLIER_HOME',
          notificationService.getNotifySupplierHomeScreen(param)
        );
      });
    },

    getWasteCompanyDataForNotification(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_WASTE_COMPANY_DATA_FOR_NOTIFICATION',
          notificationService.getWasteCompanyDataForNotification(param)
        );
      });
    },

    getDeliveryCompanyDataForNotification(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DELIVERY_COMPANY_DATA_FOR_NOTIFICATION',
          notificationService.getDeliveryCompanyDataForNotification(param)
        );
      });
    },

    getDisposalCompanyDataForNotification(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DISPOSAL_COMPANY_DATA_FOR_NOTIFICATION',
          notificationService.getDisposalCompanyDataForNotification(param)
        );
      });
    },

    getListBranchForErrorNotification(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_LIST_BRANCH_FOR_ERROR_NOTIFICATION',
          notificationService.getListBranchForErrorNotification(param),
        );
      });
    },

    getNotificationsErrorSystemForNotification(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_NOTIFICATIONS_ERROR_SYSTEM_FOR_NOTIFICATION',
          notificationService.getNotificationsErrorSystemForNotification(param),
        );
      });
    },

    setDataError(context: any, param: any) {
      context.commit('SET_DATA_ERROR', param);
    },

    updateNotificationsError(context: any, param: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'UPDATE_NOTIFICATIONS_ERROR',
          notificationService.updateNotificationsError(param),
        );
      });
    },
  },
};
