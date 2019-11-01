import { MenuService } from '@/services/menu.service';
import { Menu } from '@/models/menu.model';
import { MenuData } from '@/constants/Menu';
import { current } from '@/shared/utilities';
import AppConfig from '@/constants/AppConfig';

const menuService = new MenuService();
export default {
    namespaced: true,

    state: {
        menus: MenuData,
        menu: {},
        customer: current.customer(),
        headerColor: AppConfig.ColorHex.Dark,
    },

    getters: {
        getMenus: (state: any) => state.menus.filter((menu: Menu) => menu.isVisible === true),
        getCustomer: (state: any) => state.customer,
        getHeaderColor: (state: any) => state.headerColor,
    },

    mutations: {
        GET_MENUS: (state: any, payload: Menu) => {
            state.menus = payload;
        },

        SET_CUSTOMER: (state: any, payload: Menu) => {
            state.customer = payload;
        },

        SET_HEADER_COLOR: (state: any, payload: Menu) => {
            state.headerColor = payload;
        },
    },

    actions: {
        getMenus(context: any) {
            let menus = menuService.getMenus();
            menus = menus.map(item => {
                if (current.role() === '1' && current.customer().customerCode === 0) {
                    if ([6, 7, 13, 20].includes(item.id)) {
                        item.isVisible = true;
                    } else {
                        item.isVisible = false;
                    }
                } else if (current.role() !== '1' && item.id === 7) {
                    item.isVisible = false;
                } else {
                    item.isVisible = true;
                }
                return item;
            });
            context.commit('GET_MENUS', menus);
        },

        getMenuSshi0025(context: any) {
            let menus = menuService.getMenus();
            menus = menus.map(item => {
                if (item.id === 7) item.isVisible = false;
                return item;
            });
            context.commit('GET_MENUS', menus);
        },

        getMenuSshi0038(context: any) {
            let menus = menuService.getMenus();
            menus = menus.map(item => {
                item.isVisible = false;
                return item;
            });
            context.commit('GET_MENUS', menus);
        },

        setCustomer(context: any, payload: any) {
            localStorage.setItem('customer', JSON.stringify(payload));
            context.commit('SET_CUSTOMER', payload);
        },

        setHeaderColor(context: any, payload: any) {
            context.commit('SET_HEADER_COLOR', payload);
        },
    },
};
