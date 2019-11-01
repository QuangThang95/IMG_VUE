import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth.module';
import customerModule from './modules/customer.module';
import customerBranchModule from './modules/customerBranch.module';
import menuModule from './modules/menu.module';
import supplierModule from './modules/supplier.module';
import userModule from './modules/user.module';
import addressModule from './modules/address.module';
import customerGroupModule from './modules/customerGroup.module';
import generalModule from './modules/general.module';
import notificationModule from './modules/notification.module';
import supplierLicenseModule from './modules/supplierLicense.module';
import factoryModule from './modules/factory.module';
import factoryLicenseModule from './modules/factoryLicense.module';
import factoryFinalModule from './modules/factoryFinal.module';
import supplierHandleModule from './modules/supplierHandle.module';
import attackModule from './modules/attack.module';
import customerBranchWasteModule from './modules/customerBranchWaste.module';
import contractModule from './modules/contract.module';
import manifestModule from './modules/manifest.module';
import reportModule from './modules/report.module';
import fileModule from './modules/file.module';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    customerModule,
    customerBranchModule,
    customerBranchWasteModule,
    menuModule,
    supplierModule,
    userModule,
    addressModule,
    customerGroupModule,
    generalModule,
    factoryModule,
    factoryLicenseModule,
    supplierHandleModule,
    notificationModule,
    supplierLicenseModule,
    attackModule,
    factoryFinalModule,
    contractModule,
    manifestModule,
    reportModule,
    fileModule
  },
});
