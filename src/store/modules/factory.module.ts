import { Factory } from '@/models/factory.model';
import { FactoryService } from '@/services/factory.service';
import { HttpStatus } from '@/constants/HttpStatus';
import { BaseService } from '@/shared/utilities';

const baseService = new BaseService();
const factoryService = new FactoryService();

export default {
    namespaced: true,

    state: {
        factorys: [],
        factory: {},
        status: '',
        openDl: false,
        dataFactoryBySupplierCode: null,
        displayOrder: [],
        factoryCarrier: {}
    },

    getters: {
        getListFactorys: (state: any) => {
            return state.factorys.filter((factory: Factory) => factory.deleteFlag === 0);
        },

        getFactorys: (state: any) => {
            return state.factorys;
        },
        getDataFactoryBySupplierCode: (state: any) => {
            return state.dataFactoryBySupplierCode;
        },
        getAll: (state: any) => {
            return state.factory;
        },
        getFactoryCarriers: (state: any) => {
            return state.factoryCarrier;
        },
    },

    mutations: {
        GET_FACTORYS(state: any, payload: any) {
            state.factorys = [...payload];
        },

        DELETE_FACTORY(state: any, payload: any) {
            state.factory = Object.assign({}, payload);
        },

        ERROR_FACTORY: (state: any) => {
            state.status = 'error';
        },

        OPENDL_FACTORYS: (state: any, payload: boolean) => {
            state.openDl = payload;
        },

        GET_FACTORY_BY_ID(state: any, payload: any) {
            state.factorys = Object.assign({}, payload);
        },

        GET_FACTORY_BY_SUPPLIER_CODE(state: any, payload: any) {
            state.dataFactoryBySupplierCode = Object.assign({}, payload);
        },
        ADD_FACTORY(state: any, payload: any) {
            state.factory = { ...payload };
        },
        UPDATE_FACTORY(state: any, payload: any) {
            state.factory = { ...payload };
        },

        GET_FACTORY_ALL(state: any, payload: any) {
            state.factory = { ...payload };
        },

        DISPLAY_ORDER(state: any, payload: any) {
            state.displayOrder = [...payload];
        },

        GET_FACTORY_CARRIERS(state: any, payload: any) {
            state.factoryCarrier = { ...payload };
        },
    },
    actions: {
        getFactorys(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_ALL', factoryService.getFactorys(payload));
            });
        },

        deleteFactory(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_FACTORY', factoryService.deleteFactory(payload));
            });
        },

        getFactorysById(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_BY_ID', factoryService.getFactorysById(payload));
            });
        },

        getFactoryBySupplierCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_BY_SUPPLIER_CODE', factoryService.getFactoryBySupplierCode(payload));
            });
        },

        addFactory(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_FACTORY', factoryService.addFactory(payload));
            });
        },

        updateFactory(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_FACTORY', factoryService.updateFactory(payload));
            });
        },

        getAll(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_ALL', factoryService.getFactorys(payload));
            });
        },

        displayOrderFactory(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DISPLAY_ORDER', factoryService.displayOrderFactory(payload));
            });
        },

        getFactoryCarriers(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_CARRIERS', factoryService.getFactoryCarriers(payload));
            });
        },

        setFactoryError(context: any) {
            context.commit('ERROR_FACTORY');
        },

        setOpenDl(context: any, payload: boolean) {
            context.commit('OPENDL_FACTORYS', payload);
        },
    },
};
