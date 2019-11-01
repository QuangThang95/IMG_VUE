
import { isNumber, BaseService, common } from '@/shared/utilities';
import { ManifestService } from '@/services/manifest.service';

const data = new Map([
    [
        "排出物区分",
        "GENERAL"
    ],
    [
        "数量単位",
        "GENERAL1"
    ],
    [
        "荷姿",
        "GENERAL2"
    ],
    [
        "数量確定者",
        "GENERAL3"
    ],
    [
        "車種トン数",
        "GENERAL4"
    ],
    [
        "車種",
        "GENERAL5"
    ],
    [
        "処分方法",
        "GENERAL6"
    ],
    [
        "マニフェスト区分",
        "GENERAL7"
    ],
    [
        "登録情報承認待ちフラグ",
        "GENERAL8"
    ],
    [
        "運搬終了報告済フラグ",
        "GENERAL9"
    ],
    [
        "処分終了報告済フラグ",
        "GENERAL10"
    ],
    [
        "最終処分終了報告済フラグ",
        "GENERAL11"
    ],
    [
        "処分報告情報承認待ちフラグ",
        "GENERAL12"
    ],
    [
        "処分終了報告区分",
        "GENERAL13"
    ],
]);
const baseService = new BaseService();
const manifest = new ManifestService()
export default {
    namespaced: true,

    state: {
        byWasteClass: [],
        wasteByBranch: {},
        general: [],
        count: {},
        manifests: {},
        manifestHistory: [],
        toxic: [],
        final: [],
        emission: [],
        suppliers: {},
        contract: {},
        customerBranchWaste: [],
        general1: [],
        general2: [],
        general3: [],
        general4: [],
        general5: [],
        general6: [],
        general7: [],
        general8: [],
        general9: [],
        general11: [],
        general10: [],
        general12: [],
        general13: [],
        manifestUser: [],
        manifestRegistration: [],
        transport: [],
        dispose: [],
        emissionToxic: {},
        transportStaff: [],
        transportManifest: [],
        finalManifest: [],
        manifest: {},
        dataEmissionPopUp: [],
        disposeFinalSelectionPopUp: [],
        getManifestByEntryCode: [],
        getTransportByEntryCode: [],
        getFinalDisposeByEntryCode: [],
        bill: {},
        isCheckDeliveryDate: Boolean,
        updateManifest: {},
        nameToxic: [],
        isCheckContract: Boolean,
        addManifest123Registation: {},
        update100: {},
        update104: {},
        emission45: [],
        transportByWaste45: [],
        manifestByWaste45: {},
        disposeWaste45PopUp: {},
        emissionPopUpNotContract: [],
        transposterPopUp45Selection: [],
        isDirty: Boolean

    },

    mutations: {
        GET_CUSTOMER_BRANCH_BY_WASTE_CLASS(state: any, payload: any) {
            state.byWasteClass = [...payload];
        },

        GET_LIST_WASTE_CLASS_FOR_BRANCH(state: any, payload: any) {
            state.wasteByBranch = { ...payload };
        },

        GENERAL(state: any, payload: any) {
            state.general = [...payload];
        },

        GENERAL1(state: any, payload: any) {
            state.general1 = [...payload];
        },

        GENERAL2(state: any, payload: any) {
            state.general2 = [...payload];
        },

        GENERAL3(state: any, payload: any) {
            state.general3 = [...payload];
        },

        GENERAL4(state: any, payload: any) {
            state.general4 = [...payload];
        },

        GENERAL5(state: any, payload: any) {
            state.general5 = [...payload];
        },

        GENERAL6(state: any, payload: any) {
            state.general6 = [...payload];
        },

        GENERAL7(state: any, payload: any) {
            state.general7 = [...payload];
        },
        GENERAL8(state: any, payload: any) {
            state.general8 = [...payload];
        },
        GENERAL9(state: any, payload: any) {
            state.general9 = [...payload];
        },
        GENERAL10(state: any, payload: any) {
            state.general10 = [...payload];
        },
        GENERAL11(state: any, payload: any) {
            state.general11 = [...payload];
        },
        GENERAL12(state: any, payload: any) {
            state.general12 = [...payload];
        },

        GENERAL13(state: any, payload: any) {
            state.general13 = [...payload];
        },

        COUNT(state: any, payload: any) {
            state.count = { ...payload };
        },

        LIST_MANIFEST(state: any, payload: any) {
            state.manifests = { ...payload };
        },

        MANIFEST_HISTORY(state: any, payload: any) {
            state.manifestHistory = [...payload];
        },

        TOXIC(state: any, payload: any) {
            state.toxic = [...payload];
        },

        FINAL(state: any, payload: any) {
            state.final = [...payload];
        },

        EMISSION(state: any, payload: any) {
            state.emission = [...payload];
        },

        SUPPLIER(state: any, payload: any) {
            state.suppliers = { ...payload };
        },

        CONTRACT(state: any, payload: any) {
            state.contract = { ...payload };
        },

        CUSTOMER_BRANCH_WASTE(state: any, payload: any) {
            state.customerBranchWaste = [...payload];
        },

        MANIFEST_USER(state: any, payload: any) {
            state.manifestUser = [...payload];
        },

        MANIFEST_REGISTATION(state: any, payload: any) {
            state.manifestRegistration = [...payload];
        },

        TRANSPORT(state: any, payload: any) {
            state.transport = [...payload];
        },

        DISPOSE(state: any, payload: any) {
            state.dispose = [...payload];
        },

        EMISSION_TOXIC(state: any, payload: any) {
            state.emissionToxic = { ...payload };
        },

        TRANSPORT_STAFF(state: any, payload: any) {
            state.transportStaff = [...payload];
        },

        TRANSPORT_MANIFEST(state: any, payload: any) {
            state.transportManifest = [...payload];
        },

        FINAL_MANIFEST(state: any, payload: any) {
            state.finalManifest = [...payload];
        },

        ADD_MANIFEST123(state: any, payload: any) {
            state.manifest = { ...payload };
        },

        ADD_MANIFEST123_REGISTATION(state: any, payload: any) {
            state.addManifest123Registation = { ...payload };
        },

        GET_DATA_EMISSION_POPUP(state: any, payload: any) {
            state.dataEmissionPopUp = [...payload];
        },
        SELECTION_FINAL_DISPOSE_POPUP(state: any, payload: any) {
            state.disposeFinalSelectionPopUp = [...payload];
        },

        GET_MANIFEST_BY_ENTRY_CODE(state: any, payload: any) {
            state.getManifestByEntryCode = [...payload];
        },
        GET_TRANSPORT_BY_ENTRY_CODE(state: any, payload: any) {
            state.getTransportByEntryCode = [...payload];
        },

        GET_DISPOSE_FINAL_BY_ENTRY_CODE(state: any, payload: any) {
            state.getFinalDisposeByEntryCode = [...payload];
        },

        BILL(state: any, payload: any) {
            state.bill = { ...payload };
        },

        ISCHECK_DELIVERY_DATE(state: any, payload: any) {
            state.isCheckDeliveryDate = payload;
        },

        UPDATE_MANIFEST_123(state: any, payload: any) {
            state.updateManifest = { ...payload };
        },

        NAME_TOXIC(state: any, payload: any) {
            state.nameToxic = [...payload];
        },

        CHECK_MANIFEST(state: any, payload: any) {
            state.isCheckContract = payload;
        },

        UPDATE100(state: any, payload: any) {
            state.update100 = payload;
        },

        UPDATE104(state: any, payload: any) {
            state.update104 = payload;
        },

        EMISSION45(state: any, payload: any) {
            state.emission45 = [...payload];
        },

        TRANSPORT45(state: any, payload: any) {
            state.transportByWaste45 = [...payload];
        },

        GET_MANIFEST_45(state: any, payload: any) {
            state.manifestByWaste45 = { ...payload };
        },

        GET_DISPOSE_WASTE_45_POPUP(state: any, payload: any) {
            state.disposeWaste45PopUp = { ...payload };
        },

        EMISSION_NOT_CONTRACT(state: any, payload: any) {
            state.emissionPopUpNotContract = [...payload];
        },

        SELECTION_DATA_TRANSPORTER45(state: any, payload: any) {
            state.transposterPopUp45Selection = [...payload];
        },

        IS_DIRTYFORM(state: any, payload: any) {
            state.isDirty = payload;
        }
    },


    actions: {
        getCustomerBranchByWasteClass(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_CUSTOMER_BRANCH_BY_WASTE_CLASS', manifest.getCustomerBranchByWasteClass(payload));
            });
        },

        getListWasteTypesForBranch(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_LIST_WASTE_CLASS_FOR_BRANCH', manifest.getListWasteTypesForBranch(payload));
            });
        },

        searchGeneral(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    data.get(payload.key1), manifest.searchGeneral(payload));
            });
        },

        countNumber(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'COUNT', manifest.countNumberOfEachTypeManifestForCustomer(payload));
            });
        },

        getListManifest(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'LIST_MANIFEST', manifest.listManifest(payload));
            });
        },

        getManifestHistory(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'MANIFEST_HISTORY', manifest.getManifestHistory(payload));
            });
        },

        getToxic(context: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'TOXIC', manifest.getToxicSubstance());
            });
        },

        getFinal(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'FINAL', manifest.getFinalDisposal(payload));
            });
        },

        getEmission(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'EMISSION', manifest.getEmission(payload));
            });
        },

        getSupplier(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'SUPPLIER', manifest.getSupplier(payload));
            });
        },

        getContract(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'CONTRACT', manifest.getContract(payload));
            });
        },

        getCustomerBranchWasteForManifest(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'CUSTOMER_BRANCH_WASTE', manifest.getCustomerBranchWasteForManifest(payload));
            });
        },

        getManifestUserForCustomer(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'MANIFEST_USER', manifest.getManifestUserForCustomer(payload));
            });
        },

        getManifestRegistration(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'MANIFEST_REGISTATION', manifest.getManifestUserForCustomer(payload));
            });
        },

        getTransportStaff(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'TRANSPORT_STAFF', manifest.getManifestUserForCustomer(payload));
            });
        },

        getTransport(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'TRANSPORT', manifest.getTransport(payload));
            });
        },

        getDispose(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'DISPOSE', manifest.getDispose(payload));
            });
        },

        saveEmissionToxic(context: any, payload: any) {
            context.commit('EMISSION_TOXIC', payload)
        },

        getTransportManifest(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'TRANSPORT_MANIFEST', manifest.getTransportManifest(payload));
            });
        },

        getFinalManifest(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'FINAL_MANIFEST', manifest.getFinalManifest(payload));
            });
        },

        addManifestReservation(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_MANIFEST123', manifest.addManifestReservation(payload));
            });
        },

        addManifestRegistration(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ADD_MANIFEST123_REGISTATION', manifest.addManifestRegistration(payload));
            });
        },

        getDataEmissonPopUp(context: any, payload: any) {
            context.commit('GET_DATA_EMISSION_POPUP', payload)
        },

        getDataSelectionDisposePopUp(context: any, payload: any) {
            context.commit('SELECTION_FINAL_DISPOSE_POPUP', payload)
        },

        getManifestByEntryCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_MANIFEST_BY_ENTRY_CODE', manifest.getManifestByEntryCode(payload));
            });
        },

        getTransportByEntryCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_TRANSPORT_BY_ENTRY_CODE', manifest.getTransportByEntryCode(payload));
            });
        },

        getFinalDisposeByEntryCode(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_DISPOSE_FINAL_BY_ENTRY_CODE', manifest.getFinalDisposeByEntryCode(payload));
            });
        },

        getBill(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'BILL', manifest.getBillForManifest(payload));
            });
        },

        checkDeliveryDate(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'ISCHECK_DELIVERY_DATE', manifest.checkDeliveryDate(payload));
            });
        },

        updateManifest(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'UPDATE_MANIFEST_123', manifest.updateManifest(payload));
            });
        },

        getNameToxic(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'NAME_TOXIC', manifest.getNameToxic(payload));
            });
        },

        checkContractToCreateManifest(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'CHECK_MANIFEST', manifest.checkContractToCreateManifest(payload));
            });
        },

        getEmission45(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'EMISSION45', manifest.getEmissionBy45(payload));
            });
        },

        getTransportByWaste45(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'TRANSPORT45', manifest.getTransportByWaste45(payload));
            });
        },

        getManifestByWaste45(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_MANIFEST_45', manifest.getManifestByWaste45(payload));
            });
        },

        getDispose45PopUp(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'GET_DISPOSE_WASTE_45_POPUP', manifest.getDisposeWaste45PopUp(payload));
            });
        },

        getEmissionNotContract(context: any, payload: any) {
            return new Promise((resolve, reject) => {
                baseService.handleService(resolve, reject, context,
                    'EMISSION_NOT_CONTRACT', manifest.getEmissionPopUpBy45NotContract(payload));
            });
        },

        getDataTransportPopUp45(context: any, payload: any) {
            context.commit('SELECTION_DATA_TRANSPORTER45', payload);
        },

        checkDirtyForm(context: any, payload: any) {
            context.commit('IS_DIRTYFORM', payload);
        },
    }
}
