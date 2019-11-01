import { AttackService } from '@/services/attack.service';
import { BaseService } from '@/shared/utilities';
const baseService = new BaseService();
const attackService = new AttackService();
export default {
    namespaced: true,

    state: {
        attack: [],
        attackFile: {},
        attackSupplier: [],
        attackFileSupplier: {},
        attackSupplierTransporter: [],
        attackFileSupplierTransporter: {},
        attackSupplierTransporterPopup: [],
        attackFileSupplierTransporterPopup: {},
    },

    getters: {
        getAttack: (state: any) => state.attack,
    },

    mutations: {
        GET_BY_ATTACK: (state: any, payload: any) => {
            state.attack = {...payload};
        },

        GET_BY_ATTACK_SUPPLIER: (state: any, payload: any) => {
            state.attackSupplier = [...payload];
        },

        GET_BY_ATTACK_SUPPLIER_TRANSPORTER: (state: any, payload: any) => {
            state.attackSupplierTransporter = {...payload};
        },

        GET_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP: (state: any, payload: any) => {
            state.attackSupplierTransporterPopup = {...payload};
        },
        // Update
        UPDATE_BY_ATTACK: (state: any, payload: any) => {
            state.attackFile = {...payload};
        },

        UPDATE_BY_ATTACK_SUPPLIER: (state: any, payload: any) => {
            state.attackFileSupplier = {...payload};
        },

        UPDATE_BY_ATTACK_SUPPLIER_TRANSPORTER: (state: any, payload: any) => {
            state.attackFileSupplierTransporter = {...payload};
        },

        UPDATE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP: (state: any, payload: any) => {
            state.attackFileSupplierTransporterPopup = {...payload};
        },
        // Delete
        DELETE_BY_ATTACK: (state: any, payload: any) => {
            state.attack = {...payload};
        },

        DELETE_BY_ATTACK_SUPPLIER: (state: any, payload: any) => {
            state.attackFileSupplier = {...payload};
        },

        DELETE_BY_ATTACK_SUPPLIER_TRANSPORTER: (state: any, payload: any) => {
            state.attackFileSupplierTransporter = {...payload};
        },

        DELETE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP: (state: any, payload: any) => {
            state.attackFileSupplierTransporterPopup = {...payload};
        },

        // Upload
        UPLOAD_FILE_BY_ATTACK: (state: any, payload: any) => {
            state.attack = [...payload];
        },

        UPLOAD_FILE_BY_ATTACK_SUPPLIER: (state: any, payload: any) => {
            state.attackSupplier = [...payload];
        },

        UPLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER: (state: any, payload: any) => {
            state.attackSupplierTransporter = [...payload];
        },

        UPLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP: (state: any, payload: any) => {
            state.attackSupplierTransporterPopup = [...payload];
        },

        // Download
        DOWNLOAD_FILE_BY_ATTACK: (state: any, payload: any) => {
            state.attackFile = {...payload};
        },
        DOWNLOAD_FILE_BY_ATTACK_SUPPLIER: (state: any, payload: any) => {
            state.attackFileSupplier = {...payload};
        },

        DOWNLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER: (state: any, payload: any) => {
            state.attackFileSupplierTransporter = {...payload};
        },

        DOWNLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP: (state: any, payload: any) => {
            state.attackFileSupplierTransporterPopup = {...payload};
        },
    },

    actions: {
        getAttack(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BY_ATTACK', attackService.getAttack(payload));
            });
        },

        getAttackSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BY_ATTACK_SUPPLIER', attackService.getAttackSupplier(payload));
            });
        },

        getAttackSupplierTransporter(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BY_ATTACK_SUPPLIER_TRANSPORTER', attackService.getAttackSupplier(payload));
            });
        },

        getAttackSupplierTransporterPopup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP', attackService.getAttackSupplier(payload));
            });
        },

        updateAttack(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_BY_ATTACK', attackService.uploadFileUpdate(payload));
            });
        },

        updateAttackSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_BY_ATTACK_SUPPLIER', attackService.uploadFileUpdate(payload));
            });
        },

        updateAttackSupplierTransporter(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_BY_ATTACK_SUPPLIER_TRANSPORTER', attackService.uploadFileUpdate(payload));
            });
        },

        updateAttackSupplierTransporterPopup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPDATE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP', attackService.uploadFileUpdate(payload));
            });
        },

        deleteAttack(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_BY_ATTACK', attackService.deleteAttack(payload));
            });
        },

        deleteAttackSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_BY_ATTACK_SUPPLIER', attackService.deleteAttack(payload));
            });
        },

        deleteAttackSupplierTransporter(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_BY_ATTACK_SUPPLIER_TRANSPORTER', attackService.deleteAttack(payload));
            });
        },

        deleteAttackSupplierTransporterPopup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DELETE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP', attackService.deleteAttack(payload));
            });
        },


        uploadFile(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPLOAD_FILE_BY_ATTACK', attackService.uploadFile(payload));
            });
        },

        uploadFileSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPLOAD_FILE_BY_ATTACK_SUPPLIER', attackService.uploadFileSupplier(payload));
            });
        },

        uploadFileSupplierTransporter(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER', attackService.uploadFileSupplier(payload));
            });
        },

        uploadFileSupplierTransporterPopup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'UPLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP', attackService.uploadFileSupplier(payload));
            });
        },


        downloadFile(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DOWNLOAD_FILE_BY_ATTACK', attackService.downloadFile(payload));
            });
        },

        downloadFileSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DOWNLOAD_FILE_BY_ATTACK_SUPPLIER', attackService.downloadFile(payload));
            });
        },

        downloadFileSupplierTransporter(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DOWNLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER', attackService.downloadFile(payload));
            });
        },

        downloadFileSupplierTransporterPopup(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DOWNLOAD_FILE_BY_ATTACK_SUPPLIER_TRANSPORTER_POPUP', attackService.downloadFile(payload));
            });
        },
    },
};
