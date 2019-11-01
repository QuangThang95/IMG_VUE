import { CustomerBranchWasteService } from '@/services';
import { BaseService, common } from '@/shared/utilities';

const baseService = new BaseService();
const customerBranchWasteService = new CustomerBranchWasteService();
export default {
    namespaced: true,

    state: {
        wasteClass1: { ...common.dataTable() },
        wasteClass2: { ...common.dataTable() },
        wasteClass3: { ...common.dataTable() },
        wasteClass4: { ...common.dataTable() },
        wasteClass5: { ...common.dataTable() },
        countWasteClass1: 0,
        countWasteClass2: 0,
        countWasteClass3: 0,
        countWasteClass4: 0,
        countWasteClass5: 0,
        customerBranchWaste: {},
        wasteClassification1: [],
        wasteClassification2: [],
        wasteClassification3: [],
        wasteClassification4: [],
        wasteClassification5: [],
        // sshi0006_popup
        wasteClassification: [],

        customerBranchWastes1: [],
        customerBranchWastes2: [],
        customerBranchWastes3: [],
        customerBranchWastes4: [],
        customerBranchWastes5: [],

        customerBranchWasteClass1: [],
        customerBranchWasteClass2: [],
        customerBranchWasteClass3: [],
        customerBranchWasteClass4: [],
        customerBranchWasteClass5: [],

        selectBoxPopUpList1: [],
        selectBoxPopUpList2: [],
        selectBoxPopUpList3: [],
        selectBoxPopUpList4: [],
        selectBoxPopUpList5: [],

        addCustomerBranchWaste: false,
        updateDisplayOrder: [],
        defineWaste: [],
        defineWasteNotSelect: [],
    },

    getters: {
        getWasteClass1: (state: any) => {
            return state.wasteClass1;
        },

        getWasteClass2: (state: any) => {
            return state.wasteClass2;
        },

        getWasteClass3: (state: any) => {
            return state.wasteClass3;
        },

        getWasteClass4: (state: any) => {
            return state.wasteClass4;
        },

        getWasteClass5: (state: any) => {
            return state.wasteClass5;
        },

        getWasteClassification1: (state: any) => {
            return state.wasteClassification1;
        },

        getWasteClassification2: (state: any) => {
            return state.wasteClassification2;
        },


        getWasteClassification3: (state: any) => {
            return state.wasteClassification3;
        },


        getWasteClassification4: (state: any) => {
            return state.wasteClassification4;
        },


        getWasteClassification5: (state: any) => {
            return state.wasteClassification5;
        },

        getCustomerBranchWaste1: (state: any) => {
            return state.customerBranchWastes1;
        },

        getCustomerBranchWaste2: (state: any) => {
            return state.customerBranchWastes2;
        },

        getCustomerBranchWaste3: (state: any) => {
            return state.customerBranchWastes3;
        },

        getCustomerBranchWaste4: (state: any) => {
            return state.customerBranchWastes4;
        },

        getCustomerBranchWaste5: (state: any) => {
            return state.customerBranchWastes5;
        },

        getCustomerBranchWasteClass1: (state: any) => {
            return state.customerBranchWasteClass1;
        },

        getCustomerBranchWasteClass2: (state: any) => {
            return state.customerBranchWasteClass2;
        },


        getCustomerBranchWasteClass3: (state: any) => {
            return state.customerBranchWasteClass3;
        },


        getCustomerBranchWasteClass4: (state: any) => {
            return state.customerBranchWasteClass4;
        },


        getCustomerBranchWasteClass5: (state: any) => {
            return state.customerBranchWasteClass5;
        },

        addCustomerBranchWaste: (state: any) => {
            return state.addCustomerBranchWaste;
        },

        getSelectBoxPopUpList1: (state: any) => {
            return state.selectBoxPopUpList1;
        },

        getSelectBoxPopUpList2: (state: any) => {
            return state.selectBoxPopUpList2;
        },


        getSelectBoxPopUpList3: (state: any) => {
            return state.selectBoxPopUpList3;
        },


        getSelectBoxPopUpList4: (state: any) => {
            return state.selectBoxPopUpList4;
        },

        getSelectBoxPopUpList5: (state: any) => {
            return state.selectBoxPopUpList5;
        },

        getCustomerBranchWasteDefineWaste: (state: any) => {
            return state.defineWaste;
        },

        getDefineWasteNotSelect: (state: any) => {
            return state.defineWasteNotSelect;
        },
    },

    mutations: {
        GET_WASTE_CLASS1(state: any, payload: any) {
            state.wasteClass1 = { ...payload };
        },

        GET_WASTE_CLASS2(state: any, payload: any) {
            state.wasteClass2 = { ...payload };
        },

        GET_WASTE_CLASS3(state: any, payload: any) {
            state.wasteClass3 = { ...payload };
        },

        GET_WASTE_CLASS4(state: any, payload: any) {
            state.wasteClass4 = { ...payload };
        },

        GET_WASTE_CLASS5(state: any, payload: any) {
            state.wasteClass5 = { ...payload };
        },

        GET_WASTE_CLASSIFICATION1(state: any, payload: any) {
            state.wasteClassification1 = [...payload.listBig];
        },

        GET_WASTE_CLASSIFICATION2(state: any, payload: any) {
            state.wasteClassification2 = [...payload.listBig];
        },

        GET_WASTE_CLASSIFICATION3(state: any, payload: any) {
            state.wasteClassification3 = [...payload.listBig];
        },

        GET_WASTE_CLASSIFICATION4(state: any, payload: any) {
            state.wasteClassification4 = [...payload.listBig];
        },

        GET_WASTE_CLASSIFICATION5(state: any, payload: any) {
            state.wasteClassification5 = [...payload.listBig];
        },

        GET_CUSTOMEER_BRANCH_WASTE1(state: any, payload: any) {
            state.customerBranchWastes1 = [...payload];
        },

        GET_CUSTOMEER_BRANCH_WASTE2(state: any, payload: any) {
            state.customerBranchWastes2 = [...payload];
        },

        GET_CUSTOMEER_BRANCH_WASTE3(state: any, payload: any) {
            state.customerBranchWastes3 = [...payload];
        },

        GET_CUSTOMEER_BRANCH_WASTE4(state: any, payload: any) {
            state.customerBranchWastes4 = [...payload];
        },

        GET_CUSTOMEER_BRANCH_WASTE5(state: any, payload: any) {
            state.customerBranchWastes5 = [...payload];
        },

        GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION1(state: any, payload: any) {
            state.customerBranchWasteClass1 = [...payload.listBig];
        },

        GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION2(state: any, payload: any) {
            state.customerBranchWasteClass2 = [...payload.listBig];
        },

        GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION3(state: any, payload: any) {
            state.customerBranchWasteClass3 = [...payload.listBig];
        },

        GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION4(state: any, payload: any) {
            state.customerBranchWasteClass4 = [...payload.listBig];
        },

        GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION5(state: any, payload: any) {
            state.customerBranchWasteClass5 = [...payload.listBig];
        },

        ADD_CUSTOMER_BRANCH_WASTE(state: any, payload: any) {
            state.addCustomerBranchWaste = payload;
        },

        GET_SELECT_BOX_POPUP_LIST1(state: any, payload: any) {
            state.selectBoxPopUpList1 = [...payload.listBig];
        },

        GET_SELECT_BOX_POPUP_LIST2(state: any, payload: any) {
            state.selectBoxPopUpList2 = [...payload.listBig];
        },

        GET_SELECT_BOX_POPUP_LIST3(state: any, payload: any) {
            state.selectBoxPopUpList3 = [...payload.listBig];
        },

        GET_SELECT_BOX_POPUP_LIST4(state: any, payload: any) {
            state.selectBoxPopUpList4 = [...payload.listBig];
        },

        GET_SELECT_BOX_POPUP_LIST5(state: any, payload: any) {
            state.selectBoxPopUpList5 = [...payload.listBig];
        },

        GET_CUSTOMER_BRANCH_WASTE_DEFINE_WASTE(state: any, payload: any) {
            state.defineWaste = [...payload];
        },

        GET_DEFINE_WASTE_NOT_SELECT(state: any, payload: any) {
            state.defineWasteNotSelect = [...payload];
        },

        SET_WASTECLASS(state: any, payload: any) {
            state.wasteClass1 = payload;
            state.wasteClass2 = payload;
            state.wasteClass3 = payload;
            state.wasteClass4 = payload;
            state.wasteClass5 = payload;
            state.wasteClassification1 = payload;
            state.wasteClassification2 = payload;
            state.wasteClassification3 = payload;
            state.wasteClassification4 = payload;
            state.wasteClassification5 = payload;
        },

        UPDATE_CUSTOMER_BRANCH_WASTE_DISPLAYORDER(state: any, payload: any) {
            state.updateDisplayOrder = payload;
        },
    },

    actions: {
        getWasteClass1(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASS1', customerBranchWasteService.getCustomerBranchWastes(payload));
            });
        },

        getWasteClass2(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASS2', customerBranchWasteService.getCustomerBranchWastes(payload));
            });
        },

        getWasteClass3(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASS3', customerBranchWasteService.getCustomerBranchWastes(payload));
            });
        },

        getWasteClass4(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASS4', customerBranchWasteService.getCustomerBranchWastes(payload));
            });
        },

        getWasteClass5(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASS5', customerBranchWasteService.getCustomerBranchWastes(payload));
            });
        },

        getWasteClassification1(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASSIFICATION1',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getWasteClassification2(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASSIFICATION2',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getWasteClassification3(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASSIFICATION3',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getWasteClassification4(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASSIFICATION4',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getWasteClassification5(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_WASTE_CLASSIFICATION5',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getCustomerBranchWaste1(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMEER_BRANCH_WASTE1',
                    customerBranchWasteService.getCustomerBranchWaste(payload));
            });
        },

        getCustomerBranchWaste2(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMEER_BRANCH_WASTE2',
                    customerBranchWasteService.getCustomerBranchWaste(payload));
            });
        },

        getCustomerBranchWaste3(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMEER_BRANCH_WASTE3',
                    customerBranchWasteService.getCustomerBranchWaste(payload));
            });
        },

        getCustomerBranchWaste4(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMEER_BRANCH_WASTE4',
                    customerBranchWasteService.getCustomerBranchWaste(payload));
            });
        },

        getCustomerBranchWaste5(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMEER_BRANCH_WASTE5',
                    customerBranchWasteService.getCustomerBranchWaste(payload));
            });
        },


        getCustomerBranchWasteClass1(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION1',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getCustomerBranchWasteClass2(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION2',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getCustomerBranchWasteClass3(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION3',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getCustomerBranchWasteClass4(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION4',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getCustomerBranchWasteClass5(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_WASTE_CLASSIFICATION5',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        addCustomerBranchWaste(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CUSTOMER_BRANCH_WASTE', customerBranchWasteService.addCustomerBranchWaste(payload));
            });
        },

        getSelectBoxPopUpList1(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_SELECT_BOX_POPUP_LIST1',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getSelectBoxPopUpList2(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_SELECT_BOX_POPUP_LIST2',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getSelectBoxPopUpList3(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_SELECT_BOX_POPUP_LIST3',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getSelectBoxPopUpList4(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_SELECT_BOX_POPUP_LIST4',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getSelectBoxPopUpList5(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_SELECT_BOX_POPUP_LIST5',
                    customerBranchWasteService.getCustomerBranchWasteTypesForBranch(payload));
            });
        },

        getCustomerBranchWasteDefineWaste(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_WASTE_DEFINE_WASTE',
                    customerBranchWasteService.getCustomerBranchWasteDefineWaste(payload));
            });
        },

        getDefineWasteNotSelect(context: any, payload: any) {
            context.commit('GET_DEFINE_WASTE_NOT_SELECT', payload);
        },

        setWasteClassCustomerBranch(context: any, payload: any) {
            context.commit('SET_WASTECLASS', payload);
        },

        updateCustomerBranchWasteDisplayOrder(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_CUSTOMER_BRANCH_WASTE_DISPLAYORDER',
                    customerBranchWasteService.updateCustomerBranchWasteDisplayOrder(payload));
            });
        },
    },
};
