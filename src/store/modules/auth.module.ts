import { AuthService } from '@/services/auth.service';
import { current, isNullOrEmpty, BaseService } from '@/shared/utilities';
import configs from '../../../public/config.json';

const baseService = new BaseService();
const authService = new AuthService();
export default {
    namespaced: true,

    state: {
        token: current.token(),
        status: '',
        role: -1,
        user: {},
        error: {},
        baseUrl: configs.BASE_URL,
    },

    getters: {
        isAuthenticated: (state: any) => !isNullOrEmpty(state.token),
        authStatus: (state: any) => state.status,
        getMUser: (state: any) => state.user,
        getRole: (state: any) => state.role,
        token: (state: any) => state.token,
        baseUrl: (state: any) => state.baseUrl,
    },

    mutations: {
        AUTH_SUCCESS: (state: any, payload: any) => {
            state.status = 'success';
            state.token = payload.token;
            state.user = Object.assign({}, payload.user);
        },

        AUTH_LOGOUT: (state: any) => {
            state.token = '';
        },

        BASE_URL: (state: any, payload: any) => {
            state.baseUrl = payload;
        },
    },

    actions: {
        login: (context: any, payload: any) => {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context, 'AUTH_SUCCESS', authService.login(payload));
            });
        },

        logout: (context: any) => {
            return new Promise((resolve, reject) => {
                context.commit('AUTH_LOGOUT');
                localStorage.clear();
                resolve();
            })
        },

        baseUrl: (context: any, payload: any) => {
            context.commit('BASE_URL', payload);
        },
    },
};
