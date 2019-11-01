import { GeneralService } from '@/services/general.service';
import { General } from '@/models/general.model';
import * as lodash from 'lodash';
import { BaseService, common } from '@/shared/utilities';

const generalService = new GeneralService();
const baseService = new BaseService();

export default {
  namespaced: true,

  state: {
    dischargeDistinctionData: [],
    quantityDeterminerData: [],
    generalIndustryCode1: [],
    generalIndustryCode2: [],
    divisionInCharge: [],
    operationAuthority: [],
    dataCombobox: [],
    generalSeting: [],
    generalControl: {},
    reponseAddUser: [],
    responseDeleteUser: [],
    general: {},
    responseUpdateUser: [],
    generalByKey1: [],
    transportMethod: [],
    disposeMethod: [],
    unitCode: [],
    dataSearchGeneral: {}
  },

  getters: {
    getDischargeDistinctionData: (state: any) => {
      return state.dischargeDistinctionData;
    },

    getQuantityDeterminerData: (state: any) => {
      return state.quantityDeterminerData;
    },

    getOperationAuthority(state: any) {
      let industry = state.operationAuthority;
      if (industry.length > 0) {
        industry.shift();
        industry = industry.map((item: any) => {
          item.data2 = +item.data2;
          return item;
        });
        industry = lodash.sortBy(industry, ['data2']);
      }
      industry.unshift({ key2: '-1', data1: '' });
      industry = common.formatObjectSelection(industry, ['key2', 'data1']);
      return industry;
    },

    getDivisionInCharge(state: any) {
      let industry = state.divisionInCharge;
      if (industry.length > 0) {
        industry.splice(2, 3);
        industry = industry.map((item: any) => {
          item.data2 = +item.data2;
          return item;
        });
        industry = lodash.sortBy(industry, ['data2']);
      }
      industry.unshift(new General());
      industry = common.formatObjectSelection(industry, ['key2', 'data1']);
      return industry;
    },

    getGeneralIndustryCode1(state: any) {
      let industry = state.generalIndustryCode1;
      if (industry.length > 0) {
        industry = industry.map((item: any) => {
          item.data2 = +item.data2;
          return item;
        });
        industry = lodash.sortBy(industry, ['data2']);
      }
      industry.unshift(new General());
      industry = common.formatObjectSelection(industry, ['key2', 'data1']);
      return industry;
    },

    getGeneralIndustryCode2: (state: any) => (key2: string) => {
      let industry = state.generalIndustryCode2;
      if (!key2) {
        industry = new Array<General>();
      } else if (industry.length > 0) {
        industry = industry.filter((x: any) => x.key2 === key2);
        industry = industry.map((item: any) => {
          item.data2 = +item.data2;
          item.key3 = +item.key3;
          return item;
        });
        industry = lodash.sortBy(industry, ['data2']);
      }
      industry.unshift(new General());
      industry = common.formatObjectSelection(industry, ['key3', 'data1']);
      return industry;
    },

    getDataComboboxRole(state: any) {
      let industry = state.dataCombobox;
      if (industry.length > 0) {
        industry = industry.map((item: any) => {
          item.data2 = +item.data2;
          return item;
        });
        industry = lodash.sortBy(industry, ['data2']);
      }
      industry = common.formatObjectSelection(industry, ['key2', 'data1']);
      return industry;
    },

    getGeneralSetting(state: any) {
      return state.generalSeting;
    },

    getGeneralById(state: any) {
      return state.general;
    },

    getGeneralControlByKey1(state: any) {
      return state.generalByKey1;
    },

    getGeneralControl(state: any) {
      return state.generalControl;
    },

    getTransportMethod(state: any) {
      let industry = state.transportMethod;
      industry = common.formatObjectSelection(industry, ['key2', 'data1']);
      return industry;
    },

    getDisposeMethod(state: any) {
      let industry = state.disposeMethod;
      if (industry.length > 0) {
        industry = industry.map((item: any) => {
          item.data7 = +item.data7;
          item.disposeCode = +item.data4;
          item.disposeName = item.data3 || item.data2 || '';
          return item;
        });
        industry = lodash.sortBy(industry, ['data7']);
      }
      return industry;
    },

    getUnitCode(state: any) {
      let industry = state.unitCode;
      industry = common.formatObjectSelection(industry, ['key2', 'data1']);
      return industry;
    },

    setDataGeneral: (state: any) => {
      return state.dataSearchGeneral;
    },
  },

  mutations: {
    GET_DISCHARGE_DISTINCTION: (state: any, payload: any) => {
      state.dischargeDistinctionData = [...payload];
    },
    GET_QUANTITY_DETERMINER: (state: any, payload: any) => {
      state.quantityDeterminerData = [...payload];
    },

    GET_GENERAL_INDUSTRY_CODE1: (state: any, payload: any) => {
      state.generalIndustryCode1 = [...payload];
    },

    GET_GENERAL_INDUSTRY_CODE2: (state: any, payload: any) => {
      state.generalIndustryCode2 = [...payload];
    },

    GET_DIVISION_INCHARGE_CODE: (state: any, payload: any) => {
      state.divisionInCharge = [...payload];
    },

    GET_OPERATION_AUTHORITY_CODE: (state: any, payload: any) => {
      state.operationAuthority = [...payload];
    },

    GET_DATA_COMBOBOX: (state: any, payload: any) => {
      state.dataCombobox = payload;
    },

    GET_DATA_GENERAL: (state: any, payload: any) => {
      state.generalSeting = payload;
    },

    GET_DATA_GENERAL_CONTROL: (state: any, payload: any) => {
      state.generalControl = { ...payload };
    },

    ADD_GENERAL: (state: any, payload: any) => {
      state.reponseAddUser = payload;
    },

    DELETE_GENERAL: (state: any, payload: any) => {
      state.responseDeleteUser = payload;
    },

    GET_GENERAL_BY_ID: (state: any, payload: any) => {
      state.general = payload;
    },

    UPDATE_GENERAL: (state: any, payload: any) => {
      state.responseUpdateUser = payload;
    },

    GET_GENERAL_CONTROL_BY_KEY1: (state: any, payload: any) => {
      state.generalByKey1 = payload;
    },

    GET_TRANSPORT_METHOD: (state: any, payload: any) => {
      state.transportMethod = [...payload];
    },

    GET_DISPOSE_METHOD: (state: any, payload: any) => {
      state.disposeMethod = [...payload];
    },

    GET_UNIT_CODE: (state: any, payload: any) => {
      state.unitCode = [...payload];
    },
    SET_DATA_GENERAL(state: any, payload: any) {
      state.dataSearchGeneral = Object.assign({}, payload);
    },
  },

  actions: {
    getDischargeDistinctionData(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DISCHARGE_DISTINCTION',
          generalService.getGenerals(payload)
        );
      });
    },

    getQuantityDeterminerData(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_QUANTITY_DETERMINER',
          generalService.getGenerals(payload)
        );
      });
    },

    getGeneralIndustryCode1(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_GENERAL_INDUSTRY_CODE1',
          generalService.getGenerals(payload)
        );
      });
    },

    getGeneralIndustryCode2(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_GENERAL_INDUSTRY_CODE2',
          generalService.getGenerals(payload)
        );
      });
    },

    getDivisionInChargeCode(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DIVISION_INCHARGE_CODE',
          generalService.getGenerals(payload)
        );
      });
    },

    getOperationAuthorityCode(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_OPERATION_AUTHORITY_CODE',
          generalService.getGenerals(payload)
        );
      });
    },

    getDataComboboxRole(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DATA_COMBOBOX',
          generalService.getDataComboboxRole()
        );
      });
    },

    getGeneralSetting(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DATA_GENERAL',
          generalService.getGeneralSeting(payload)
        );
      });
    },

    getGeneralControl(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DATA_GENERAL_CONTROL',
          generalService.getGeneralControl(payload)
        );
      });
    },

    addGeneral(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'ADD_GENERAL',
          generalService.addGeneral(payload)
        );
      });
    },

    deleteUser(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'DELETE_GENERAL',
          generalService.deleteGeneral(payload)
        );
      });
    },

    getGeneralById(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_GENERAL_BY_ID',
          generalService.getGeneralById(payload)
        );
      });
    },

    updateGeneral(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'UPDATE_GENERAL',
          generalService.updateGeneral(payload)
        );
      });
    },

    getGeneralControlByKey1(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_GENERAL_CONTROL_BY_KEY1',
          generalService.getGeneralControlByKey1(payload)
        );
      });
    },

    getTransportMethod(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_TRANSPORT_METHOD',
          generalService.getGenerals(payload)
        );
      });
    },

    getDisposeMethod(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_DISPOSE_METHOD',
          generalService.getGenerals(payload)
        );
      });
    },

    getUnitCode(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          'GET_UNIT_CODE',
          generalService.getGenerals(payload)
        );
      });
    },

    setDataGeneral(context: any, param: any) {
      context.commit('SET_DATA_GENERAL', param);
    },
  }
};
