<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <CustomerBranchSearch @onSearch="onSearch" :search="search" @onReset="onReset" />
      <CustomerBranchList
        :items="customerBranchs"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @onAdd="onAdd"
        @onUpdate="onUpdate"
        @onSelect="onSelect"
        @onDelete="onDelete"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        @orderByUp="orderByUp"
        @orderByDown="orderByDown"
      />
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import CustomerBranchSearch from "./customer-branch-search.vue";
import CustomerBranchList from "./customer-branch-list.vue";
import { mapGetters } from "vuex";
import { current, navigation, common, handleOutput } from "@/shared/utilities";
import IMText from "@/data/img-text.json";
import BaseMessageError from "@/components/BaseMessageError";
import BaseProcessing from "@/components/BaseProcessing";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";

export default {
  components: {
    CustomerBranchSearch,
    CustomerBranchList,
    BaseMessageError,
    BaseProcessing
  },

  data() {
    return {
      customerBranchs: [],
      nextItem: {},
      previousItem: {},
      currentCustomerCode: current.customer().customerCode,
      title: IMText.title.sshi0004,
      message: [],
      openDl: false,
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      search: {
        branchNumber: "",
        branchName: "",
        branchKana: "",
        address: "",
        tel: ""
      },
      isSearch: false
    };
  },

  async created() {
    common.resetPage();
    this.message = [];
    const param = { ...this.initParams() };
    await this.getAll(param);
  },

  methods: {
    initParams() {
      const param = {
        customerCode: this.currentCustomerCode,
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        branchNumber: this.search.branchNumber,
        branchName: this.search.branchName,
        branchKana: this.search.branchKana,
        address: this.search.address,
        tel: this.search.tel
      };
      return param;
    },

    onAdd() {
      navigation.sshi0005();
    },

    onUpdate(branchCode) {
      navigation.sshi0006(branchCode);
    },

    onSelect(branchCode) {
      navigation.sshi0006(branchCode);
    },

    async onDelete(data) {
      this.openDl = true;
      const object = {
        branchCode: data.branchCode,
        lastUpdate: data.lastUpdate
      };
      await this.$store
        .dispatch("customerBranchModule/deleteCustomerBranch", object)
        .then(resp => {
          this.getCurrentPage();
        }).finally(() => {
          this.openDl = false;
        });
    },

    getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getAll(param);
    },

    getPageSize(data) {
      this.pages.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    onSearch() {
      this.message = [];
      this.isSearch = true;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    onReset() {
      this.message = [];
      this.search.branchNumber = "";
      this.search.branchName = "";
      this.search.branchKana = "";
      this.search.address = "";
      this.search.tel = "";
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "DisplayOrder";
      const param = { ...this.initParams() };
      this.getAll(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    handleOrderBy(data, object) {
      const result = {
        customerCode: data.item.customerCode,
        branchCode: data.item.branchCode,
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        customerBranch1: { ...result },
        customerBranch2: {
          customerCode: object.customerCode,
          branchCode: object.branchCode,
          lastUpdate: object.lastUpdate
        }
      };
      return this.updateDisplayOrder(param);
    },

    orderByUp(data) {
      const result = common.orderDisplayByCode(
        this.customerBranchs,
        data.item,
        true
      );
      if (data.index === 0) {
        return this.handleOrderBy(data, this.previousItem);
      }
      return this.handleOrderBy(data, result);
    },

    orderByDown(data) {
      const result = common.orderDisplayByCode(
        this.customerBranchs,
        data.item,
        false
      );
      if (data.index === this.customerBranchs.length - 1) {
        return this.handleOrderBy(data, this.nextItem);
      }
      return this.handleOrderBy(data, result);
    },

    async updateDisplayOrder(param) {
      this.openDl = true;
      this.message = [];
      await this.$store
        .dispatch(
          "customerBranchModule/updateDisplayOrderCustomerBranch",
          param
        )
        .then(res => {
          this.getCurrentPage();
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
      this.openDl = false;
    },

    async getAll(customerCode) {
      this.openDl = true;
      await this.$store
        .dispatch("customerBranchModule/getCustomerBranchOption", customerCode)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        });
      this.openDl = false;
    }
  },

  computed: {
    ...mapGetters({
      customerBranchOption: "customerBranchModule/getCustomerBranchOption"
    })
  },

  watch: {
    customerBranchOption() {
      this.customerBranchs = this.customerBranchOption.items;
      this.pageCount = this.customerBranchOption.pageCount;
      this.count = this.customerBranchOption.count;
      this.nextItem = this.customerBranchOption.nextItem;
      this.previousItem = this.customerBranchOption.previousItem;
    }
  }
};
</script>
