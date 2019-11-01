import { HttpStatus } from '@/constants/HttpStatus';
import { Supplier } from '@/models/supplier.model';
import { SupplierService } from '@/services/supplier.service';
import { isNumber } from '@/shared/utilities';
import { BaseService } from '@/shared/utilities';
const baseService = new BaseService();
const supplierService = new SupplierService();
export default {
    namespaced: true,

    state: {
        suppliers: [],
        supplier: {},
        supplierUpdate: {},
        supplierDelete: {},
        dataSearch: {},
        displayOrder: [],
        suppliersPaging: {},
    },

    getters: {
        getSuppliers: (state: any) => {
            return state.suppliers;
        },
        getById: (state: any) => (id: any) => {
            return state.supplier;
        },
        getStatus: (state: any) => state.status,

        onSearch: (state: any) => () => {
            return state.dataSearch;
        },

        getSuppliersPaging: (state: any) => {
            return state.suppliersPaging;
        },
    },

    mutations: {
        GET_SUPPLIERS(state: any, payload: any) {
            state.suppliers = [...payload];
        },
        SEARCH_SUPPLIERS(state: any, payload: any) {
            state.dataSearch = [...payload];
        },

        ADD_SUPPLIER(state: any, payload: any) {
            state.supplier = { ...payload };
        },

        UPDATE_SUPPLIER(state: any, payload: any) {
            state.supplierUpdate = { ...payload };
        },

        DELETE_SUPPLIER(state: any, payload: any) {
            state.supplierDelete = Object.assign({}, payload.supplier);
        },

        GET_FACTORYS_SUPPLIER(state: any, payload: any) {
            state.suppliers = {...payload};
        },

        GET_SUPPLIER_BY_ID(state: any, payload: any) {
            state.supplier = { ...payload };
        },

        OPENDL_FACTORYS_SUPPLIER: (state: any, payload: boolean) => {
            state.openDl = payload;
        },

        SUPPLIER_ERROR: (state: any) => {
            state.status = 'error';
        },

        UPDATE_DISPLAY_ORDER_SUPPLIER_TRANSPORTER(state: any, payload: any) {
            state.displayOrder = [...payload];
        },

        GET_SUPPLIERS_PAGING(state: any, payload: any) {
            state.suppliersPaging = { ...payload };
        },
    },

    actions: {
        getSuppliers(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIERS',
                    supplierService.getSuppliers(payload));
            });
        },

        searchSupplier(context: any, payload: any) {
            context.commit('SEARCH_SUPPLIERS', payload);
        },

        addSupplier(context: any, payload: Supplier) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'ADD_SUPPLIER',
                    supplierService.addSupplier(payload));
            });
        },

        updateSupplier(context: any, payload: Supplier) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_SUPPLIER',
                    supplierService.updateSupplier(payload));
            });
        },

        getSupplierById(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_BY_ID',
                    supplierService.getSupplierById(payload));
            });
        },

        deleteSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_SUPPLIER',
                    supplierService.deleteSupplier(payload));
            });
        },

        getFactorysSupplier(context: any, payload: any) {
            if (!isNumber(payload) && payload > 0) {
                // show Toast error message
            } else {
                context.commit('OPENDL_FACTORYS_SUPPLIER', true);
                return new Promise((resolve, reject) => {
                    supplierService.getFactorysSupplier(payload).then((response) => {
                        if (response) {
                            context.commit('GET_FACTORYS_SUPPLIER', response.data);
                            resolve(response);
                        }
                    }).catch((error) => {
                        context.commit('SUPPLIER_ERROR');
                        reject(error);
                    }).finally(() => {
                        context.commit('SUPPLIER_ERROR', false);
                    });
                });
            }
        },

        setSupplierError(context: any) {
            context.commit('SUPPLIER_ERROR');
        },

        updateDisplayOrderSupplierTransporter(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_DISPLAY_ORDER_SUPPLIER_TRANSPORTER', supplierService.displayOrderSupplier(payload));
            });
        },

        getSuppliersPaging(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIERS_PAGING',
                    supplierService.getSuppliersPaging(payload));
            });
        },
    },
};
