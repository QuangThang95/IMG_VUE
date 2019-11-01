import { SupplierLicenseService } from '@/services/supplierLicense.service';
import { BaseService } from '@/shared/utilities';
const baseService = new BaseService();
const supplierLicenseService = new SupplierLicenseService();
export default {
    namespaced: true,

    state: {
        suppliersLicense: [],
        licenseTypeNum: {},
        licenseAdd: {},
        fileName: {},
    },

    getters: {
        getSupplierLicense: (state: any) => {
            return state.suppliersLicense;
        },
        getLicense: (state: any) => {
            return state.licenseTypeNum;
        },
    },

    mutations: {
        GET_SUPPLIER_LICENSE(state: any, payload: any) {
            state.suppliersLicense = {...payload};
        },
        GET_LICENSE(state: any, payload: any) {
            state.licenseTypeNum = {...payload};
        },
        POST_FILE(state: any, payload: any) {
            state.fileName = {...payload};
        },
        ADD_SUPPLIER_LICENSE(state: any, payload: any) {
            state.licenseAdd = {...payload};
        },
        UPDATE_SUPPLIER_LICENSE(state: any, payload: any) {
            state.licenseAdd = {...payload};
        },
        DELETE_SUPPLIER_LICENSE(state: any, payload: any) {
            state.licenseAdd = {...payload};
        },
    },

    actions: {
         getSupplierLicense(context: any, payload: any) {
            return  new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_LICENSE',
                supplierLicenseService.getSupplierLicense(payload));
            });
        },
         getLicense(context: any, payload: any) {
            return  new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_LICENSE',
                supplierLicenseService.getLicense(payload));
            });
        },
        postFile(context: any, payload: any) {
            return  new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'POST_FILE',
                supplierLicenseService.postFile(payload));
            });
        },
        addSupplierLicense(context: any, payload: any) {
            return  new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'ADD_SUPPLIER_LICENSE',
                supplierLicenseService.addSupplierLicense(payload));
            });
        },
        updateSupplierLicense(context: any, payload: any) {
            return  new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_SUPPLIER_LICENSE',
                supplierLicenseService.updateSupplierLicense(payload));
            });
        },
        deleteSupplierLicense(context: any, payload: any) {
            return  new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_SUPPLIER_LICENSE',
                supplierLicenseService.deleteSupplierLicense(payload));
            });
        },
    },
};
