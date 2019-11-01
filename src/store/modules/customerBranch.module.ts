import { CustomerBranch } from '@/models/customerBranch.model';
import { CustomerBranchService } from '@/services/customerBranch.service';
import { isNumber, BaseService, common } from '@/shared/utilities';

const baseService = new BaseService();
const customerBranchService = new CustomerBranchService();
export default {
    namespaced: true,

    state: {
        customerBranchOption: {},
        customerBranchs: [],
        customerBranch: {},
        branchsWasteClass: [],
        displayOrder: null,
        dischargeWasteClass: {},
        branchsWasteClassPaging: {}
    },

    getters: {
        getCustomerBranchs: (state: any) => {
            return state.customerBranchs;
        },

        getCustomerBranch: (state: any) => {
            return state.customerBranch;
        },

        getCustomerBracnhById: (state: any) => (id: number) => {
            return state.customerBranchs.find((customerBranch: CustomerBranch) => customerBranch.branchCode === id);
        },

        getBranchByWasteClass: (state: any) => {
            return state.branchsWasteClass;
        },

        getCustomerBranchOption: (state: any) => state.customerBranchOption,

        getDischargeWasteClassByBranch: (state: any) => state.dischargeWasteClass,

        getCustomerBranchByWasteClassPaging: (state: any) => state.branchsWasteClassPaging
    },

    mutations: {
        GET_CUSTOMER_BRANCHS(state: any, payload: any) {
            state.customerBranchs = [...payload];
        },

        GET_CUSTOMER_BRANCH(state: any, payload: any) {
            state.customerBranch = { ...common.convertNumberToBooleanDischargeWasteClass(payload) };
        },

        SET_CUSTOMER_BRANCH(state: any, payload: any) {
            state.customerBranch = Object.assign({}, payload.customerBranch);
            state.imgStatus = payload.imgStatus;
        },

        ADD_CUSTOMER_BRANCH(state: any, payload: any) {
            state.customerBranch = { ...payload };
        },

        UPDATE_CUSTOMER_BRANCH(state: any, payload: any) {
            state.customerBranch = { ...payload };
        },

        DELETE_CUSTOMER_BRANCH(state: any, payload: any) {
            state.customerBranch = Object.assign({}, payload);
        },

        GET_BRANCH_BY_WASTE_CLASS(state: any, payload: any) {
            state.branchsWasteClass = [...payload];
        },

        GET_CUSTOMER_BRANCH_OPTION(state: any, payload: any) {
            state.customerBranchOption = { ...payload };
        },

        UPDATE_DISPLAY_ORDER_CUSTOMER_BRANCH(state: any, payload: any) {
            state.displayOrder = { ...payload };
        },

        GET_DISCHARGE_WASTE_CLASS_BY_BRANCH(state: any, payload: any) {
            state.dischargeWasteClass = { ...payload.result };
        },

        GET_BRANCH_BY_WASTE_CLASS_PAGING(state: any, payload: any) {
            state.branchsWasteClassPaging = { ...payload };
        },
    },


    actions: {
        getCustomerBranchs(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCHS', customerBranchService.getCustomerBranchs(payload));
            });
        },

        getCustomerBranch(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH', customerBranchService.getCustomerBranch(payload));
            });
        },

        setCustomerBranch(context: any, payload: any) {
            context.commit('SET_CUSTOMER_BRANCH', payload);
        },

        addCustomerBranch(context: any, payload: any) {
            const data = common.convertBooleanToNumberDischargeWasteClass(payload);
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CUSTOMER_BRANCH', customerBranchService.addCustomerBranch(data));
            });
        },

        updateCustomerBranch(context: any, payload: CustomerBranch) {
            const data = common.convertBooleanToNumberDischargeWasteClass(payload);
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_CUSTOMER_BRANCH', customerBranchService.updateCustomerBranch(data));
            });
        },

        deleteCustomerBranch(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_CUSTOMER_BRANCH', customerBranchService.deleteCustomerBranch(payload));
            });
        },

        getBranchByWasteClass(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BRANCH_BY_WASTE_CLASS',
                    customerBranchService.getCustomerBranchByWasteClass(payload));
            });
        },

        getCustomerBranchOption(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_CUSTOMER_BRANCH_OPTION',
                    customerBranchService.getCustomerBranchOption(payload));
            });
        },

        updateDisplayOrderCustomerBranch(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_DISPLAY_ORDER_CUSTOMER_BRANCH',
                    customerBranchService.updateDisplayOrderCustomerBranch(payload));
            });
        },

        getDischargeWasteClassByBranch(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_DISCHARGE_WASTE_CLASS_BY_BRANCH',
                    customerBranchService.getDischargeWasteClassByBranch(payload),
                );
            });
        },

        getCustomerBranchByWasteClassPaging(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BRANCH_BY_WASTE_CLASS_PAGING',
                    customerBranchService.getCustomerBranchByWasteClassPaging(payload));
            });
        },

    },
};
