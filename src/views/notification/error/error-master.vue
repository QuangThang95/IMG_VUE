<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <ErrorSearch
        @onSearch="onSearch"
        @onReset="onReset"
        @onChangeBranch="onChangeBranch"
        :condition="condition"
        :options="options"
      />
      <ErrorList
        :items="notificationsCondition"
        :notifySource="condition.notifySource"
        :supplierClass="condition.supplierClass"
        :branchKey="branchKey"
        :branchSlot="branchSlot"
        :pageCount="pages.pageCount"
        :count="pages.count"
        :pageSize="pages.pageSize"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
      />
    </b-container>
    <BaseProcessing :openDl="openDl"/>
  </div>
</template>

<script>
import ErrorSearch from './error-search.vue'
import ErrorList from './error-list.vue'
import BaseMessageError from '@/components/BaseMessageError.vue';
import BaseProcessing from '@/components/BaseProcessing';
import { current, common } from '@/shared/utilities';
import { Message } from '@/constants/Message';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { NotifyClass, NotifyType, NotifySource, SupplierClass } from '@/constants/General';
import IMText from '@/data/img-text.json';
import DateTimeFormat from '@/constants/DateTimeFormat';
import AppConfig from "@/constants/AppConfig";
import CountCharacter from '@/shared/CountCharacter';
import { General } from '@/models/general.model';
export default {
  components: {
    BaseMessageError,
    BaseProcessing,
    ErrorSearch,
    ErrorList
  },

  data() {
    return {
      imgtext: IMText,
      nextItem: {},
      previousItem: {},
      pages: AppConfig.Pages,
      message: [],
      title: IMText.title.sshi0012Error,
      openDl: false,
      currentCustomer: current.customer(),
      resultCount: 0,
      notificationsCondition: [],
      today: new Date(),
      initCondition: {
        notifySource: null,
        supplierClass: null,
        branchCode: null,
        customerCode: current.customer().customerCode,
        dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        dateTo: new Date(),
      },
      condition: {
        notifySource: null,
        supplierClass: null,
        branchCode: null,
        customerCode: current.customer().customerCode,
        dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        dateTo: new Date(),
      },
      isInit: true,
      branchKey: '',
      branchSlot: '',
      notifySourceUrl: null,
      supplierClassUrl: null,
    }
  },

  async created() {
    this.getDataFromUrl();
    this.setDataBranchColumn(this.condition.notifySource, this.condition.supplierClass);
    this.searchByNotifySource(this.condition.notifySource, this.condition.supplierClass);
    this.loadComboboxBranch(this.condition.notifySource, this.condition.supplierClass);
    this.message = [];
  },

  methods: {
    initParams() {
      const param = {
        pageSize: this.pages.pageSize,
        page: 1,
        orderField: AppConfig.DisplayOrder,
        descending: AppConfig.Descending,
        notifySource: this.condition.notifySource,
        supplierClass: this.condition.supplierClass,
        branchCode: this.condition.branchCode,
        customerCode: this.condition.customerCode,
        dateFrom: this.condition.dateFrom,
        dateTo: this.condition.dateTo,
      };
      return param;
    },

    async onSearch(conditionSearch) {
      this.message = [];
      this.notificationsCondition = [];
      if (this.validateSearch(conditionSearch)) {
        this.searchByNotifySource(this.condition.notifySource, this.condition.supplierClass);
      }
    },

    onReset() {
      this.message = [];
      this.condition = {
        notifySource: null,
        supplierClass: null,
        branchCode: null,
        customerCode: current.customer().customerCode,
        dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        dateTo: new Date(),
      };
      this.getDataFromUrl();
    },

    async onChangeBranch(selectedBranch) {
      this.isInit = false;
    },

    async getNotificationsErrorSystemForNotification(condition) {
      this.openDl = true;
      await this.$store.dispatch('notificationModule/getNotificationsErrorSystemForNotification', {
        currentBranchCode: condition.branchCode,
        currentCustomerCode: condition.customerCode,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
        page: this.pages.page,
        pageSize: this.pages.pageSize,
        descending: condition.descending,
        orderField: condition.orderField
      }).finally(() => {
        this.openDl = false;
      });
    },

    async getListBranchForErrorNotification(customerCode) {
      await this.$store.dispatch('customerBranchModule/getCustomerBranchs', customerCode);
    },

    async getWasteCompanyData(condition) {
      this.openDl = true;
      await this.$store.dispatch('notificationModule/getWasteCompanyDataForNotification', {
        currentCustomerCode: condition.customerCode,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
      }).finally(() => {
        this.openDl = false;
      });
    },

    async getDeliveryCompanyData(condition) {
      this.openDl = true;
      await this.$store.dispatch('notificationModule/getDeliveryCompanyDataForNotification', {
        currentCustomerCode: condition.customerCode,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
      }).finally(() => {
        this.openDl = false;
      });
    },

    async getDisposalCompanyData(condition) {
      this.openDl = true;
      await this.$store.dispatch('notificationModule/getDisposalCompanyDataForNotification', {
        currentCustomerCode: condition.customerCode,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_MMDDYYYY) : null,
      }).finally(() => {
        this.openDl = false;
      });
    },

    formatDate(value) {
      return moment(value).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    setCondition(params) {
      return params;
    },

    validateSearch(conditionSearch) {
      this.message = [];
      if (conditionSearch.dateFrom > conditionSearch.dateTo) {
        this.message.push(Message.E00007);
      }
      if (this.message.length > 0) {
        return false;
      } else {
        return true;
      }
    },

    async searchByNotifySource(notifySource, supplierClass) {
      switch (notifySource) {
        case NotifySource.wasteCompany.key:
          await this.getWasteCompanyData(this.condition);
          break;
        case NotifySource.deliveryCompany.key:
          if (supplierClass === SupplierClass.deliveryCompany.key) {
            await this.getDeliveryCompanyData(this.condition);
          } else {
            await this.getDisposalCompanyData(this.condition);
          }
          break;
        case NotifySource.system.key:
          await this.getNotificationsErrorSystemForNotification(this.condition);
          break;
        default:
          break;
      }
      if (!this.notificationsCondition.length) {
        this.message.push(Message.E00021);
      }
    },

    setSearchResultByNotifySource(notifySource) {
      switch (notifySource) {
        case NotifySource.wasteCompany.key:
          this.notificationsCondition = this.wasteCompanyData;
          break;
        case NotifySource.deliveryCompany.key:
          if (supplierClass === SupplierClass.deliveryCompany.key) {
            this.notificationsCondition = this.deliveryCompanyData;
          } else {
            this.notificationsCondition = this.disposalCompanyData;
          }
          break;
        case NotifySource.system.key:
          this.notificationsCondition = this.wasteCompanyData;
          break;
        default:
          break;
      }
      if (!this.notificationsCondition.length) {
        this.message.push(Message.E00021);
      }
    },

    setDataBranchColumn(notifySource, supplierClass) {
      switch (notifySource) {
        case NotifySource.wasteCompany.key:
          this.branchKey = '';
          this.branchSlot = '';
          break;
        case NotifySource.deliveryCompany.key:
          if (supplierClass === SupplierClass.deliveryCompany.key) {
            this.branchKey = 'supplierName';
            this.branchSlot = 'HEAD_supplier_name';
          } else {
            this.branchKey = 'factoryName';
            this.branchSlot = 'HEAD_factory_name';
          }
          break;
        case NotifySource.system.key:
          this.branchKey = 'branchName';
          this.branchSlot = 'HEAD_branch_name';
          break;
        default:
          break;
      }
    },

    getDataFromUrl() {
      this.notifySourceUrl = +this.$route.params.notifySourceUrl;
      this.supplierClassUrl = +this.$route.params.supplierClassUrl;
      this.condition.notifySource = this.notifySourceUrl !== NotifySource.all.key ? this.notifySourceUrl : null;
      this.condition.supplierClass = this.supplierClassUrl !== NotifySource.all.key ? this.supplierClassUrl : null;
    },

    getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getNotificationsErrorSystemForNotification(param);
    },

    getPageSize(data) {
      this.pages.pageSize = data;
      let param = { ...this.initParams() };
      this.getNotificationsErrorSystemForNotification(param);
    },

    closeSort(data) {
      const param = { ...this.initParams() };
      this.getNotificationsErrorSystemForNotification(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getNotificationsErrorSystemForNotification(param);
    },

    getWasteClassUrl() {
      const wasteClassUrl = +this.$route.params.wasteClassUrl;
      this.condition.wasteClass = wasteClassUrl !== WasteClass.all.key ? wasteClassUrl : null;
    },

    loadComboboxBranch(notifySource, supplierClass) {
      if(notifySource === NotifySource.system.key) { 
          this.getListBranchForErrorNotification(this.currentCustomer.customerCode);
      }
    }
  },

  computed: {
    ...mapGetters({
      notificationsErrorSystemOptions: 'notificationModule/getNotificationsErrorSystem',
      count: 'notificationModule/getCount',
      pageCount: 'notificationModule/getPageCount',
      errorBranchs: 'notificationModule/getListBranchForError',
      wasteCompanyData: 'notificationModule/getWasteCompanyData',
      deliveryCompanyData: 'notificationModule/getDeliveryCompanyData',
      disposalCompanyData: 'notificationModule/getDisposalCompanyData',
    }),

    options() {
       let items = this.$store.getters[
        "customerBranchModule/getCustomerBranchs"
      ];
      if(items.length > 1) { 
        items.unshift({branchCode: "", branchName: "すべて"});
      }
      items = common.formatObjectSelection(items, ['branchCode', 'branchName']);
      return items;
    },
  },

  watch: {
    notificationsErrorSystemOptions() {
      this.notificationsCondition = this.notificationsErrorSystemOptions.items;
      this.pages.pageCount = this.notificationsErrorSystemOptions.pageCount;
      this.pages.count = this.notificationsErrorSystemOptions.count;
      this.nextItem = this.notificationsErrorSystemOptions.nextItem;
      this.previousItem = this.notificationsErrorSystemOptions.previousItem;
    },
    wasteCompanyData() {
      this.notificationsCondition = this.wasteCompanyData;
    },
    deliveryCompanyData() {
      this.notificationsCondition = this.deliveryCompanyData;
    },
    disposalCompanyData() {
      this.notificationsCondition = this.disposalCompanyData;
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.bottom {
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}
</style>
