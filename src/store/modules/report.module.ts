import { Report } from '@/models/report.model';
import { isNumber, BaseService, common } from '@/shared/utilities';
import { AttackService } from '@/services/attack.service';
import { ReportService } from '@/services/report.service';

const attackService = new AttackService();
const baseService = new BaseService();
const reportService = new ReportService();

export default {
    namespaced: true,

    state: {
        report: {},
        attackFile: {},
        reportParts: [],
        reportParam: {}
    },

    getters: {
        getReport: (state: any) => {
            return state.report;
        }
    },

    mutations: {
        GET_REPORTS(state: any, payload: any) {
            state.report = { ...payload };
        },

        CREATE_REPORT(state: any, payload: any) {
            state.reportParam = { ...payload };
        },

        VISABLE_BUTTON_CREATE(state: any, payload: any) {
            state.reportParam = { ...payload };
        },

        DOWNLOAD_FILE_BY_ATTACK: (state: any, payload: any) => {
            state.attackFile = {...payload};
        },
    },


    actions: {
        getReport(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_REPORTS', reportService.getReport(payload));
            });
        },

        createReport(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'CREATE_REPORT', reportService.createReport(payload));
            });
        },

        visibleButtonCreate(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'VISABLE_BUTTON_CREATE', reportService.visibleButtonCreate(payload));
            });
        },

        downloadFileReport(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DOWNLOAD_FILE_BY_ATTACK', attackService.downloadFileReport(payload));
            });
        },
    },
};
