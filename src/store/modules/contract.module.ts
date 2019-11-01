import { CustomerBranch } from '@/models/customerBranch.model';
import { isNumber, BaseService, common } from '@/shared/utilities';
import { ContractService } from '@/services/contract.service';

const baseService = new BaseService();
const contractService = new ContractService();
export default {
    namespaced: true,

    state: {
        contract: null,
        contracts: {},
        contractPartList: [],
        addContractData: null,
        updateContractData: null,
        deleteContractData: null,
        contractDisplayOrder: [],
        contractPartDetail: {},
        contractBasicInfo: {
            branchName: '',
            contractName: '',
            data1: '',
        },
        contractPart: {},
        contractParts: [],
        contractWastes: [],
        contractFinalsPaging: {},
        contractWaste: {},
        contractFinal: {},
        contractWasteAdd: false,
        contractFinalAdd: false,
        contractWasteTemp: [],
        checkContractWaste: true,
    },

    getters: {
        getContractDetail: (state: any) => {
            return state.contract;
        },

        getContracts: (state: any) => {
            return state.contracts;
        },

        getContractPart: (state: any) => {
            return state.contractPartList;
        },

        addContract(state: any) {
            return state.addContractData;
        },

        updateContract(state: any) {
            return state.updateContractData;
        },

        deleteContract(state: any) {
            return state.deleteContractData;
        },

        updateContractDisplayOrder(state: any) {
            return state.contractDisplayOrder;
        },

        getContractPartDetail: (state: any) => {
            return state.contractPartDetail;
        },

        getContractBasicInfo: (state: any) => {
            return state.contractBasicInfo;
        },

        getContractSectionNumber: (state: any) => {
            if (state.contractParts.length === 0) { return state.contractParts; }
            return state.contractParts;
        },

        getContractParts: (state: any) => {
            return state.contractParts;
        },

        getSectionBefore: (state: any) => (sectionNumber: any) => {
            if (state.contractParts.length === 0) { return null; }
            return state.contractParts.find((item: any) => item.sectionNumber === sectionNumber - 1) || null;
        },

        getSectionAfter: (state: any) => (sectionNumber: any) => {
            if (state.contractParts.length === 0) { return null; }
            return state.contractParts.find((item: any) => item.sectionNumber > sectionNumber) || null;
        },

        getContractWastes: (state: any) => {
            return state.contractWastes.map((item: any) => {
                item.isNew = false;
                return item;
            });
        },

        getContractFinalsPaging: (state: any) => {
            return state.contractFinalsPaging;
        },

        getContractWasteTemp: (state: any) => {
            return state.contractWasteTemp.map((item: any) => {
                item.isNew = true;
                return item;
            });
        },
    },

    mutations: {
        GET_CONTRACTS(state: any, payload: any) {
            state.contracts = { ...payload };
        },

        GET_CONTRACT_DETAIL(state: any, payload: any) {
            state.contract = { ...payload };
        },

        GET_CONTRACT_PART(state: any, payload: any) {
            state.contractPartList = [...payload];
        },

        ADD_CONTRACT(state: any, payload: any) {
            state.addContractData = { ...payload };
        },

        UPDATE_CONTRACT(state: any, payload: any) {
            state.updateContractData = { ...payload };
        },

        DELETE_CONTRACT(state: any, payload: any) {
            state.deleteContractData = { ...payload };
        },

        COPY_CONTRACT(state: any, payload: any) {
            state.contractPart = { ...payload };
        },

        UPDATE_CONTRACT_DISPLAY_ORDER(state: any, payload: any) {
            state.contractDisplayOrder = [...payload];
        },

        GET_CONTRACT_PART_DETAIL(state: any, payload: any) {
            state.contractPartDetail = { ...payload };
        },

        GET_CONTRACT_BASIC_INFO(state: any, payload: any) {
            state.contractBasicInfo = { ...payload };
        },

        ADD_CONTRACT_PART(state: any, payload: any) {
            state.contractPart = { ...payload };
        },

        UPDATE_CONTRACT_PART(state: any, payload: any) {
            state.contractPart = { ...payload };
        },

        DELETE_CONTRACT_PART(state: any, payload: any) {
            state.contractPart = { ...payload };
        },

        GET_CONTRACT_PARTS(state: any, payload: any) {
            state.contractParts = [...payload];
        },

        GET_CONTRACT_WASTES(state: any, payload: any) {
            state.contractWastes = [...payload];
        },

        GET_CONTRACT_FINALS_PAGING(state: any, payload: any) {
            state.contractFinalsPaging = { ...payload };
        },

        DELETE_CONTRACT_FINAL(state: any, payload: any) {
            state.contractFinal = { ...payload };
        },

        DELETE_CONTRACT_WASTE(state: any, payload: any) {
            state.contractWaste = { ...payload };
        },

        ADD_CONTRACT_WASTE(state: any, payload: any) {
            state.contractWasteAdd = payload;
        },

        ADD_CONTRACT_FINAL(state: any, payload: any) {
            state.contractFinalAdd = payload;
        },

        SET_CONTRACT_WASTE_TEMP(state: any, payload: any) {
            if (payload.reset) {
                state.contractWasteTemp = [];
            } else {
                state.contractWasteTemp = state.contractWasteTemp.concat([...payload.data]);
            }
        },

        DELETE_CONTRACT_WASTE_TEMP(state: any, payload: any) {
            state.contractWasteTemp = state.contractWasteTemp
                .filter((item: any) => item.wasteCode !== payload.wasteCode);
        },

        CHECK_CONTRACT_PART(state: any, payload: any) {
            state.checkContractWaste = payload;
        },
    },


    actions: {
        getContracts(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACTS', contractService.getContracts(payload));
            });
        },

        getContractDetail(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_DETAIL', contractService.getContractDetail(payload));
            });
        },

        getContractPart(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_PART', contractService.getContractPart(payload));
            });
        },

        addContract(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CONTRACT', contractService.addContract(payload));
            });
        },

        updateContract(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_CONTRACT', contractService.updateContract(payload));
            });
        },

        deleteContract(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_CONTRACT', contractService.deleteContract(payload));
            });
        },

        copyContract(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'COPY_CONTRACT', contractService.copyContract(payload));
            });
        },


        updateContractDisplayOrder(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_CONTRACT_DISPLAY_ORDER', contractService.updateContractDisplayOrder(payload));
            });
        },

        getContractPartDetail(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_PART_DETAIL', contractService.getContractPartDetail(payload));
            });
        },

        getContractBasicInfo(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_BASIC_INFO', contractService.getContractBasicInfo(payload));
            });
        },

        addContractPart(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CONTRACT_PART', contractService.addContractPart(payload));
            });
        },

        updateContractPart(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_CONTRACT_PART', contractService.updateContractPart(payload));
            });
        },

        deleteContractPart(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_CONTRACT_PART', contractService.deleteContractPart(payload));
            });
        },

        checkAddressContractPart(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'CHECK_CONTRACT_PART', contractService.checkAddressContractPart(payload));
            });
        },

        getContractParts(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_PARTS', contractService.getContractParts(payload));
            });
        },

        getContractWastes(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_WASTES', contractService.getContractWastes(payload));
            });
        },

        getContractFinalsPaging(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CONTRACT_FINALS_PAGING', contractService.getContractFinalsPaging(payload));
            });
        },

        addContractWaste(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CONTRACT_WASTE', contractService.addContractWaste(payload));
            });
        },

        addContractFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_CONTRACT_FINAL', contractService.addContractFinal(payload));
            });
        },

        deleteContractWaste(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_CONTRACT_WASTE', contractService.deleteContractWaste(payload));
            });
        },

        deleteContractFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DELETE_CONTRACT_FINAL', contractService.deleteContractFinal(payload));
            });
        },

        setContractWasteTemp(context: any, payload: any) {
            context.commit('SET_CONTRACT_WASTE_TEMP', payload);
        },

        deleteContractWasteTemp(context: any, payload: any) {
            context.commit('DELETE_CONTRACT_WASTE_TEMP', payload);
        },
    },
};
