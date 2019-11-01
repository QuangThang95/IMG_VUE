import { Customer } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';
import { BaseService } from '@/shared/utilities';
const customerService = new CustomerService();
const baseService = new BaseService();

export default {
    namespaced: true,

    state: {
        customerOption: {},
        customers: [],
        customer: {},
        count: 0,
        pageCount: 0,
        openDl: false,
        previousItem: null,
        nextItem: null,
        displayOrder: [],
    },

    getters: {
        getListCustomers: (state: any) => {
            return state.customers.filter((customer: Customer) => customer.deleteFlag === false);
        },

        getCustomers: (state: any) => {
            return state.customers;
        },

        getCustomerOption: (state: any) => state.customerOption,

        getCustomerByCustomerCode: (state: any) => (customerCode: number) => {
            return state.customers.find((customer: Customer) => customer.customerCode === customerCode);
        },

        getCustomer: (state: any) => {
            return state.customer;
        },

        getOpenDl: (state: any) => state.openDl,
    },

    mutations: {
        GET_CUSTOMERS(state: any, payload: any) {
            state.customers = [...payload];
        },

        GET_CUSTOMER_OPTION(state: any, payload: any) {
            state.customerOption = { ...payload };
        },

        ADD_CUSTOMER(state: any, payload: any) {
            state.customer = Object.assign({}, payload);
        },

        UPDATE_CUSTOMER(state: any, payload: any) {
            state.customer = Object.assign({}, payload);
        },

        UPDATE_DISPLAY_ORDER(state: any, payload: any) {
            state.displayOrder = [...payload];
        },

        DELETE_CUSTOMER(state: any, payload: any) {
            state.customer = Object.assign({}, payload);
        },

        GET_CUSTOMER_BY_CUSTOMER_CODE(state: any, payload: any) {
            state.customer = Object.assign({}, payload);
        },

        OPENDL_CUSTOMERS: (state: any, payload: boolean) => {
            state.openDl = payload;
        },
    },

    actions: {
        getCustomers(context: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMERS', customerService.getCustomers());
            });
        },

        getCustomerOption(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_OPTION', customerService.getCustomerOption(payload));
            });
        },

        addCustomer(context: any, payload: Customer) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CUSTOMER', customerService.addCustomer(payload));
            });
        },

        updateCustomer(context: any, payload: Customer) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_CUSTOMER', customerService.updateCustomer(payload));
            });
        },

        updateDisplayOrder(context: any, payload: Customer) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_DISPLAY_ORDER', customerService.updateDisplayOrderCustomer(payload));
            });
        },

        deleteCustomer(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_CUSTOMER', customerService.deleteCustomer(payload));
            });
        },

        getCustomerByCustomerCode(context: any, payload: number) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BY_CUSTOMER_CODE', customerService.getByCustomerCode(payload));
            });
        },

        setOpenDl(context: any, payload: boolean) {
            context.commit('OPENDL_CUSTOMERS', payload);
        }
    },
};
