import { FactoryFinalService } from '@/services/factoryFinal.service';
import { HttpStatus } from '@/constants/HttpStatus';
import { isNumber, isNullOrEmpty } from '@/shared/utilities';
import { BaseService } from '@/shared/utilities';

const baseService = new BaseService();
const factoryFinalService = new FactoryFinalService();

export default {
    namespaced: true,

    state: {
        factoryFinals: [],
        factoryFinal: {},
        status: '',
        openDl: false,
        factoryFinalForContractFinal: [],
    },

    getters: {
        getListFactoryFinal: (state: any) => {
            return state.factoryFinals;
        },

        getFactoryFinal: (state: any) => {
            return state.factoryFinals;
        },

        getFactoryFinalForContractFinal: (state: any) => {
            return state.factoryFinalForContractFinal;
        },

    },

    mutations: {
        GET_FACTORY_FINAL(state: any, payload: any) {
            state.factoryFinal = { ...payload };
        },

        DELETE_FACTORY_FINAL(state: any, payload: any) {
            state.factoryFinals = Object.assign({}, payload);
        },

        GET_FACTORY_FINAL_BY_ID(state: any, payload: any) {
            state.factoryFinals = Object.assign({}, payload);
        },

        ERROR_FACTORY_FINAL: (state: any) => {
            state.status = 'error';
        },

        OPENDL_FACTORYS_FINAL: (state: any, payload: boolean) => {
            state.openDl = payload;
        },

        ADD_FACTORY_FINAL(state: any, payload: any) {
            state.factoryFinal = { ...payload };
        },

        UPDATE_FACTORY_FINAL(state: any, payload: any) {
            state.factoryFinal = { ...payload };
        },

        GET_FACTORY_FINAL_CONTRACT_FINAL(state: any, payload: any) {
            state.factoryFinalForContractFinal = [...payload];
        },
    },
    actions: {
        getFactoryFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_FINAL', factoryFinalService.getFactoryFinal(payload));
            });
        },

        deleteFactoryFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_FACTORY_FINAL', factoryFinalService.deleteFactoryFinal(payload));
            });
        },

        getFactoryFinalById(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_FINAL_BY_ID', factoryFinalService.getFactoryFinalById(payload));
            });
        },

        addFactoryFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_FACTORY_FINAL', factoryFinalService.addFactoryFinal(payload));
            });
        },

        updateFactoryFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_FACTORY_FINAL', factoryFinalService.updateFactoryFinal(payload));
            });
        },

        setFactoryError(context: any) {
            context.commit('ERROR_FACTORY_FINAL');
        },

        setOpenDl(context: any, payload: boolean) {
            context.commit('OPENDL_FACTORYS_FINAL', payload);
        },

        getFactoryFinalForContractFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_FACTORY_FINAL_CONTRACT_FINAL', factoryFinalService.getFactoryFinalForContractFinal(payload));
            });
        },
    },
};
