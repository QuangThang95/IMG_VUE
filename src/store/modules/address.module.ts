import { AddressService } from '@/services/address.service';
import { BaseService } from '@/shared/utilities';
const baseService = new BaseService();
const addressService = new AddressService();
export default {
    namespaced: true,

    state: {
        address: {},
    },

    getters: {
        getByPostalCode: (state: any) => state.address,
    },

    mutations: {
        GET_BY_POSTALCODE: (state: any, payload: any) => {
            state.address = payload.address == null ? payload.address : { ...payload.address };
        },
    },

    actions: {
        getByPostalCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'GET_BY_POSTALCODE', addressService.getByPostalCode(payload));
            });
        },
    },
};
