import HttpStatus from 'http-status-codes';
import { SupplierHandle } from '@/models/supplier-handle.model';
import { SupplierHandleService } from '@/services/supplier-handle.service';
import { BaseService } from '@/shared/utilities';
const baseService = new BaseService();
const supplierHandleService = new SupplierHandleService();
export default {
    namespaced: true,

    state: {
        supplierHandles: [],
        supplierHandle: {},
        supplierUsers: [],
        supplierUser: {},
        supplierAll: {},
        displayOrder:[],
        allSupplierUser: {}
    },

    getters: {
        getSupplierHandle: (state: any) => {
            return state.supplierHandles
        },

        getAll: (state:any)=>{
            return state.supplierAll
        },
        getSupplierHandleTab: (state: any) => {
            return state.supplierUsers;
        },
    },

    mutations: {
        GET_SUPPLIER_HANDLE(state: any, payload: any) {
            state.supplierHandles = [...payload];
        },
        GET_SUPPLIER_ALL(state: any, payload: any) {
            state.supplierAll = {...payload};
        },
        GET_ALL_SUPPLIER_USER(state: any, payload: any) {
            state.allSupplierUser = {...payload};
        },
        DELETE_SUPPLIER_HANDLE(state: any, payload: any) {
            state.supplierHandle = { ...payload};
        },
        ADD_SUPPLIER_HANDLE(state: any, payload: any) {
            state.supplierHandle = { ...payload};
        },

        UPDATE_SUPPLIER_HANDLE(state: any, payload: any) {
            state.supplierHandle = { ...payload};
        },

        GET_SUPPLIER_HANDLE_BY_CODE(state: any, payload: any) {
            state.supplierHandle = { ...payload};
        },

        GET_SUPPLIER_HANDLE_TAB(state: any, payload: any) {
            state.supplierUsers = {...payload};
        },

        DELETE_SUPPLIER_USER(state: any, payload: any) {
            state.supplierUser = { ...payload};
        },

        ADD_SUPPLIER_USER(state: any, payload: any) {
            state.supplierUser = {...payload};
        },

        UPDATE_SUPPLIER_USER(state: any, payload: any) {           
            state.supplierUser = { ...payload};
        },

        GET_SUPPLIER_USER_BY_CODE(state: any, payload: any) {
            state.supplierUser = { ...payload};
        },

        DISPLAY_ORDER(state: any, payload: any) {
            state.displayOrder = [...payload];
        },
    },

    actions: {
        getSupplierHandle(context: any, id: number) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_HANDLE', supplierHandleService.getAllSupplierHandle(id));
            })
        },

        deleteSupplierHandle(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_SUPPLIER_HANDLE', supplierHandleService.deleteSupplierHandle(payload));
            })
        },

        addSupplierHandle(context: any, payload: any) { 
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'ADD_SUPPLIER_HANDLE', supplierHandleService.addSupplierHandle(payload));
            })
        },

        getSupplierHandleByCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_HANDLE_BY_CODE', supplierHandleService.getSupplierByCode(payload));
            })
        },
        updateSupplierHandle(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_SUPPLIER_HANDLE', supplierHandleService.updateSupplierHandle(payload));
            });
        },

        getSupplierHandleTab(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_HANDLE_TAB', supplierHandleService.getSupplierHandleTab(payload));
            })
        },

        createSupplierUser(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'ADD_SUPPLIER_USER', supplierHandleService.createSupplierUser(payload));
            })
        },

        updateSupplierUser(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_SUPPLIER_USER', supplierHandleService.updateSupplierUser(payload));
            })
        },

        deleteSupplierUser(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_SUPPLIER_USER', supplierHandleService.deleteSupplierUser(payload));
            })
        },

        getSupplierUserByCode(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_USER_BY_CODE', supplierHandleService.getSupplierUserByCode(payload));
            })
        },

        getAll(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_SUPPLIER_ALL', supplierHandleService.getAll(payload));
            })
        },

        displayOrderSupplier(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DISPLAY_ORDER', supplierHandleService.displayOrderSupplier(payload));
            })
        },

        getAllSupplierUser(context: any, payload: any){
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_ALL_SUPPLIER_USER', supplierHandleService.getAllSupplierUser(payload));
            })
        }
    }
}