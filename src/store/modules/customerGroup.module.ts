import HttpStatus from 'http-status-codes';
import { CustomerGroup } from '@/models/customerGroup.model';
import { CustomerBranch } from '@/models/customerBranch.model'
import { CustomerGroupService } from '@/services/customerGroup.service';
import { BaseService } from '@/shared/utilities';
const baseService = new BaseService();
const customerGroupService = new CustomerGroupService();

export default {
    namespaced: true,

    state: {
        customerGroups: [],
        customerGroup: {},
        customerBranchByGroups:[],
        customerBranchByGroup: {},
        customerBranchByCustomer:[],
        allCustomerGroup: {},
        displayOrder: [],
        allBranchByGroup: {},
    },

    getters: {
        getCustomerGroup: (state: any) => {
            return state.customerGroups;
        },

        getCustomerBranchByGroup: (state: any) => {
            return state.customerBranchByCustomer;
        },

        getAllCustomerGroup: (state: any) => {
            return state.allCustomerGroup;
        },
    },

    mutations: {
        GET_CUSTOMER_GROUP(state: any, payload: any) {
            state.customerGroups = [...payload];
        },
        GET_ALL_CUSTOMER_GROUP(state: any, payload: any) {
            state.allCustomerGroup = {...payload};
        },

        GET_ALL_CUSTOMER_BRANCH_BY_GROUP(state: any, payload: any) {
            state.allBranchByGroup = {...payload};
        },

        ADD_CUSTOMER_GROUP(state: any, payload: any) {
            state.customerGroup = { ...payload };
        },

        DELETE_CUSTOMER_GROUP(state: any, payload: any) {
            state.customerGroup = { ...payload };
        },

        UPDATE_CUSTOMER_GROUP(state: any, payload: any) {
            state.customerGroup = { ...payload };
        },

        GET_CUSTOMER_GROUP_BY_CODE(state: any, payload: any) {
            state.customerGroup = { ...payload };
        },

        GET_CUSTOMER_BRANCH_BY_GROUP(state: any, payload: any) {
            state.customerBranchByGroups = [...payload];
        },

        GET_CUSTOMER_BRANCH_BY_CUSTOMER(state: any, payload: any) {
            state.customerBranchByCustomer = [...payload];
        },

        UPDATE_CUSTOMER_GROUP_LINK(state: any, payload: any) {
            state.customerBranchByGroup = { ...payload };
        },

        DISPLAY_ORDER(state: any, payload: any) {
            state.displayOrder = [...payload];
        },

    },

    actions: {
        getCustomerGroup(context: any, id: number) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_CUSTOMER_GROUP', customerGroupService.getCustomerGroups(id));
            })
        },

        getAllCustomerGroup(context: any, param: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_ALL_CUSTOMER_GROUP', customerGroupService.getAllCustomerGroup(param));
            })
        },
        getAllCustomerBranchByGroup(context: any, param: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_ALL_CUSTOMER_BRANCH_BY_GROUP', customerGroupService.getAllCustomerBranchByGroup(param));
            })
        },

        addCustomerGroup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'ADD_CUSTOMER_GROUP', customerGroupService.addCustomerGroup(payload));
            })
        },

        deleteCustomerGroup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_CUSTOMER_GROUP', customerGroupService.deleteCustomerGroup(payload));
            })
        },

        updateCustomerGroup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_CUSTOMER_GROUP', customerGroupService.updateCustomerGroup(payload));
            })
        },

        getCustomerGroupByCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_CUSTOMER_GROUP_BY_CODE', customerGroupService.getCustomerGroupByCode(payload));
            })
        },

        getCustomerBranchByGroup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_CUSTOMER_BRANCH_BY_GROUP', customerGroupService.getCustomerBranchByGroup(payload));
            })
        },

        getCustomerBranchByCustomer(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_CUSTOMER_BRANCH_BY_CUSTOMER', customerGroupService.getCustomerBranchByCustomerGroup(payload));
            })
        },

        updateCustomerGroupLink(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_CUSTOMER_GROUP_LINK', customerGroupService.updateCustomerGroupLink(payload));
            })
        },

        displayOrder(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DISPLAY_ORDER', customerGroupService.displayOrderCustomerGroup(payload));
            })
        },
    }
}