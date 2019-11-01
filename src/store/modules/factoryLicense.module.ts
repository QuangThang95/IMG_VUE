import { FactoryLicenseService } from '@/services/factoryLicense.service';
import { HttpStatus } from '@/constants/HttpStatus';
import { isNumber, isNullOrEmpty } from '@/shared/utilities';
import { BaseService } from '@/shared/utilities';

const baseService = new BaseService();
const factoryLicenseService = new FactoryLicenseService();

export default {
    namespaced: true,

    state: {
        factoryLicenses: [],
        factoryLicense: {},
        status: '',
        openDl: false,
    },

    getters: {
        getListFactoryLicenseGeneral: (state: any) => {
            return state.factoryLicenses;
        },

        getFactoryLicenseGeneral: (state: any) => {
            return state.factoryLicenses;
        },
    },

    mutations: {
        GET_FACTORY_LICENSE_GENERAL(state: any, payload: any) {
            state.factorysLicense = {...payload};
        },

        DELETE_FACTORY_LICENSE_GENERAL(state: any, payload: any) {
            state.factoryLicenses = Object.assign({}, payload);
        },

        ERROR_FACTORY_LICENSE_GENERAL: (state: any) => {
            state.status = 'error';
        },
        OPENDL_FACTORY_LICENSE_GENERAL: (state: any, payload: boolean) => {
            state.openDl = payload;
        },

        GET_FACTORY_LICENSE_GENERAL_BY_ID(state: any, payload: any) {
            state.factoryLicenses = Object.assign({}, payload);
        },

        ADD_FACTORY_LICENSE_GENERAL(state: any, payload: any) {
            state.factoryLicense = { ...payload };
        },
        UPDATE_FACTORY_LICENSE_GENERAL(state: any, payload: any) {
            state.factoryLicense = { ...payload };
        },

    },
    actions: {
        getFactoryLicenseGeneral(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_FACTORY_LICENSE_GENERAL', factoryLicenseService.getFactoryLicenseGeneral(payload));
            });
        },

        deleteFactoryLicense(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_FACTORY_LICENSE_GENERAL', factoryLicenseService.deleteFactoryLicense(payload));
            });
        },

        getFactoryLicenseById(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_FACTORY_LICENSE_GENERAL_BY_ID', factoryLicenseService.getFactoryLicenseById(payload));
            });
        },

        addFactoryLicense(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'ADD_FACTORY_LICENSE_GENERAL', factoryLicenseService.addFactoryLicense(payload));
            });
        },

        updateFactoryLicense(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_FACTORY_LICENSE_GENERAL', factoryLicenseService.updateFactoryLicense(payload));
            });
        },


        setFactoryError(context: any) {
            context.commit('ERROR_FACTORY_LICENSE_GENERAL');
        },

        setOpenDl(context: any, payload: boolean) {
            context.commit('OPENDL_FACTORY_LICENSE_GENERAL', payload);
        },
    },
};
