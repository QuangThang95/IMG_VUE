<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <OthersSearch
        @onSearch="onSearch"
        @onReset="onReset"
        @onChangeBranch="onChangeBranch"
        :condition="condition"
        :wasteClass="condition.wasteClass"
        :options="options"
        :totalReportTranfer="totalReportTranfer"
        :totalReportTreatmentEnd="totalReportTreatmentEnd"
        :totalReportTreatmentFinal="totalReportTreatmentFinal"
        :classByWaste="classByWaste"
      />
      <OthersList
        :items="notificationsCondition"
        :pageCount="pages.pageCount"
        :count="pages.count"
        :pageSize="pages.pageSize"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        :wasteClass="condition.wasteClass"
        :classByWaste="classByWaste"
      />
    </b-container>
    <b-row class="justify-content-md-center bottom">
      <b-button-group size="sm">
        <b-button
          v-for="(btn, idx) in buttons"
          :key="idx"
          :pressed.sync="btn.state"
          variant="primary"
          :class="btn.cssClassButton"
          @click="onChangeWasteClass(btn)"
        >{{ btn.value }}</b-button>
      </b-button-group>
    </b-row>
  </div>
</template>

<script>
import OthersSearch from './others-search.vue';
import OthersList from './others-list';
import BaseMessageError from '@/components/BaseMessageError.vue';
import BaseProcessing from '@/components/BaseProcessing';
import { current } from '@/shared/utilities';
import { Message } from '@/constants/Message';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { WasteClass, NotifyClass, NotifyType } from '@/constants/General';
import IMText from '@/data/img-text.json';
import DateTimeFormat from '@/constants/DateTimeFormat';
import AppConfig from "@/constants/AppConfig";
import CountCharacter from '@/shared/CountCharacter';

export default {
  components: {
    BaseMessageError,
    BaseProcessing,
    OthersSearch,
    OthersList
  },

  data() {
    return {
      imgtext: IMText,
      nextItem: {},
      previousItem: {},
      pages: AppConfig.Pages,
      message: [],
      title: IMText.title.sshi0012Others,
      openDl: false,
      currentCustomer: current.customer(),
      dataWasteClass: WasteClass,
      notifyClass: NotifyClass.other.key,
      resultCount: 0,
      notificationsCondition: [],
      today: new Date(),
      condition: {
        notifyClass: NotifyClass.other.key,
        wasteClass: null,
        branchCode: null,
        customerCode: current.customer().customerCode,
        notifyType: [0, 0, 0],
        dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        dateTo: new Date(),
        orderField: 'CreateDate',
        descending: AppConfig.Descending
      },
      isInit: true,
      classByWaste: '',
      buttons: [{}],
    }
  },

  async created() {
    this.getWasteClassUrl();
    if (this.condition.wasteClass !== WasteClass.all.key) {
      this.setWasteColor(this.condition.wasteClass);
    }
    this.buttons = this.mappingWasteClassToListButton(this.dataWasteClass);
    await this.searchNotifications(this.condition);
    await this.getListBranchForNotification(this.currentCustomer.customerCode, this.condition.wasteClass);
    await this.getTotalReportTranferForNotification(NotifyType.reportTranfer.key, this.condition);
    await this.getTotalReportTreatmentEndForNotification(NotifyType.reportTreatmentEnd.key, this.condition);
    await this.getTotalReportTreatmentFinalForNotification(NotifyType.reportTreatmentFinal.key, this.condition);
    this.onReset();
  },

  methods: {
    initParams() {
      const param = {
        pageSize: this.pages.pageSize,
        page: 1,
        orderField: 'CreateDate',
        descending: AppConfig.Descending,
        notifyClass: this.condition.notifyClass,
        wasteClass: this.condition.wasteClass,
        branchCode: this.condition.branchCode,
        customerCode: this.condition.customerCode,
        notifyType: this.condition.notifyType,
        dateFrom: this.condition.dateFrom,
        dateTo: this.condition.dateTo,
      };
      return param;
    },

    async onSearch(conditionSearch) {
      this.message = [];
      this.notificationsCondition = [];
      if (this.validateSearch(conditionSearch)) {
        await this.searchNotifications(conditionSearch);
        await this.getTotalReportTranferForNotification(NotifyType.reportTranfer.key, conditionSearch);
        await this.getTotalReportTreatmentEndForNotification(NotifyType.reportTreatmentEnd.key, conditionSearch);
        await this.getTotalReportTreatmentFinalForNotification(NotifyType.reportTreatmentFinal.key, conditionSearch);
        if (!this.notificationsOptions.items.length) {
          this.message.push(Message.E00021);
        }
      }
    },

    onReset() {
      this.message = [];
      this.condition = {
        notifyClass: NotifyClass.other.key,
        wasteClass: null,
        branchCode: null,
        customerCode: current.customer().customerCode,
        notifyType: [0, 0, 0],
        dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        dateTo: new Date(),
      };
      this.getWasteClassUrl();
      this.notificationsCondition = this.notificationsOptions.items;
    },

    async onChangeWasteClass(btn) {
      this.onClickButtonToggle(btn)
      this.setWasteColor(this.condition.wasteClass);
      await this.getListBranchForNotification(this.currentCustomer.customerCode, this.condition.wasteClass);
      this.condition.branchCode = this.options[0].value;
      this.onSearch(this.condition);
    },

    async onChangeBranch(selectedBranch) {
      this.isInit = false;
      await this.getDischargeWasteClassByBranch(this.condition.customerCode, selectedBranch.value);
      let listButtons = [];
      let i = 0;
      for (const prop in this.dataWasteClass) {
        if (this.dischargeWaste['dischargeWasteClass' + i]) {
          listButtons.push(this.dataWasteClass[prop]);
        }
        i++;
      }
      this.buttons = this.mappingWasteClassToListButton(listButtons);
    },

    async searchNotifications(condition) {
      this.openDl = true;
      await this.$store.dispatch('notificationModule/searchNotifications', {
        currentNotifyClass: condition.notifyClass,
        currentWasteClass: condition.wasteClass,
        currentBranchCode: condition.branchCode,
        currentCustomerCode: condition.customerCode,
        notifyType: condition.notifyType,
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

    async getListBranchForNotification(customerCode, wasteClass) {
      wasteClass = wasteClass !== null ? wasteClass : WasteClass.all.key;
      // W.i.p @DKHuyen
      // this.openDl = true;
      await this.$store.dispatch('notificationModule/getListBranchForNotification', { customerCode, wasteClass }).finally(() => {
        // W.i.p @DKHuyen
        // this.openDl = false;
      });
    },

    async getTotalReportTranferForNotification(notifyType, condition) {
      // W.i.p @DKHuyen
      // this.openDl = true;
      let params = {
        currentBranchCode: condition.branchCode !== 0 ? condition.branchCode : null,
        currentWasteClass: condition.wasteClass,
        currentNotifyClass: this.notifyClass,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_PARAMS) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_PARAMS) : null,
        currentCustomerCode: condition.customerCode,
      }
      await this.$store.dispatch('notificationModule/getTotalReportTranferForNotification', { notifyType, params }).finally(() => {
        // W.i.p @DKHuyen
        // this.openDl = false;
      });
    },

    async getTotalReportTreatmentEndForNotification(notifyType, condition) {
      // W.i.p @DKHuyen
      // this.openDl = true;
      let params = {
        currentBranchCode: condition.branchCode !== 0 ? condition.branchCode : null,
        currentWasteClass: condition.wasteClass,
        currentNotifyClass: this.notifyClass,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_PARAMS) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_PARAMS) : null,
        currentCustomerCode: condition.customerCode,
      }
      await this.$store.dispatch('notificationModule/getTotalReportTreatmentEndForNotification', { notifyType, params }).finally(() => {
        // W.i.p @DKHuyen
        // this.openDl = false;
      });
    },

    async getTotalReportTreatmentFinalForNotification(notifyType, condition) {
      // W.i.p @DKHuyen
      // this.openDl = true;
      let params = {
        currentBranchCode: condition.branchCode !== 0 ? condition.branchCode : null,
        currentWasteClass: condition.wasteClass,
        currentNotifyClass: this.notifyClass,
        dateFrom: condition.dateFrom ? moment(String(condition.dateFrom)).format(DateTimeFormat.DATE_PARAMS) : null,
        dateTo: condition.dateTo ? moment(String(condition.dateTo)).format(DateTimeFormat.DATE_PARAMS) : null,
        currentCustomerCode: condition.customerCode,
      }
      await this.$store.dispatch('notificationModule/getTotalReportTreatmentFinalForNotification', { notifyType, params }).finally(() => {
        // W.i.p @DKHuyen
        // this.openDl = false;
      });
    },

    async getDischargeWasteClassByBranch(customerCode, branchCode) {
      this.openDl = true;
      await this.$store.dispatch('notificationModule/getDischargeWasteClassByBranch', { customerCode, branchCode }).finally(() => {
        this.openDl = false;
      });
    },

    formatDate(value) {
      return moment(value).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    setCondition(params) {
      return params;
    },

    setWasteColor(wasteClass) {
      switch (wasteClass) {
        case WasteClass.industrialWaste.key:
          this.classByWaste = WasteClass.industrialWaste.class;
          break;
        case WasteClass.industrialSpecialWaste.key:
          this.classByWaste = WasteClass.industrialSpecialWaste.class;
          break;
        case WasteClass.constructionWaste.key:
          this.classByWaste = WasteClass.constructionWaste.class;
          break;
        default:
          this.classByWaste = WasteClass.all.class;
          break;
      }
    },

    validateSearch(conditionSearch) {
      if (conditionSearch.dateFrom > conditionSearch.dateTo) {
        this.message.push(Message.E00007);
      }
      if (this.message.lenght > 0) {
        return false;
      } else {
        return true;
      }
    },

    getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.searchNotifications(param);
    },

    getPageSize(data) {
      this.pages.pageSize = data;
      let param = { ...this.initParams() };
      this.searchNotifications(param);
    },

    closeSort(data) {
      const param = { ...this.initParams() };
      this.searchNotifications(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.searchNotifications(param);
    },

    getWasteClassUrl() {
      const wasteClassUrl = +this.$route.params.wasteClassUrl;
      this.condition.wasteClass = wasteClassUrl !== WasteClass.all.key ? wasteClassUrl : null;
    },

    mappingWasteClassToListButton(dataWasteClass) {
      const listButton = [];
      for (const prop in dataWasteClass) {
        if (dataWasteClass[prop].id !== 0 && dataWasteClass[prop].id <= 3) {
          listButton.push({
            key: dataWasteClass[prop].key,
            value: dataWasteClass[prop].value,
            background: dataWasteClass[prop].background,
            cssClassButton: dataWasteClass[prop].cssClassButton,
            state: this.condition.wasteClass === dataWasteClass[prop].key ? true : false,
          });
        }
      }
      return listButton;
    },

    onClickButtonToggle(btn) {
      this.buttons = this.buttons.map(b => {
        if (b !== btn) {
          b.state = false;
        } else {
          this.condition.wasteClass = b.key;
        }
        return b;
      });
    }
  },

  computed: {
    ...mapGetters({
      notificationsOptions: 'notificationModule/getNotifications',
      count: 'notificationModule/getCount',
      pageCount: 'notificationModule/getPageCount',
      branchs: 'notificationModule/getListBranch',
    }),

    options() {
      return this.$store.getters['notificationModule/getListBranch'];
    },

    totalReportTranfer() {
      return this.$store.getters['notificationModule/getTotalReportTranfer'];
    },

    totalReportTreatmentEnd() {
      return this.$store.getters['notificationModule/getTotalReportTreatmentEnd'];
    },

    totalReportTreatmentFinal() {
      return this.$store.getters['notificationModule/getTotalReportTreatmentFinal'];
    },

    dischargeWaste() {
      return this.$store.getters['notificationModule/getDischargeWaste'];
    }
  },

  watch: {
    notificationsOptions() {
      this.notificationsCondition = this.notificationsOptions.items;
      this.pages.pageCount = this.notificationsOptions.pageCount;
      this.pages.count = this.notificationsOptions.count;
      this.nextItem = this.notificationsOptions.nextItem;
      this.previousItem = this.notificationsOptions.previousItem;
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
