import { BaseService } from '@/shared/utilities';
import { FileService } from '@/services';
const baseService = new BaseService();
const fileService = new FileService();
export default {
    namespaced: true,

    state: {
        file: [],
    },

    getters: {
        getFile: (state: any) => state.file,
    },

    mutations: {
        DOWNLOAD_FILE: (state: any, payload: any) => {
            state.file = payload;
        },
    },

    actions: {
        downloadFile(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'DOWNLOAD_FILE', fileService.downloadFile(payload));
            });
        },
    },
};
