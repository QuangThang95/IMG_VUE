<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <CustomerSelectionSearch @onSearch="onSearch" :search="search" @onReset="onReset" />
      <CustomerSelectionSearchList
        :tableId="tableId"
        :items="customers"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @onSelect="onSelect"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
      />
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import CustomerSelectionSearchList from "./customer-selection-list";
import CustomerSelectionSearch from "./customer-selection-search";
import BaseProcessing from "@/components/BaseProcessing";
import BaseMessageError from "@/components/BaseMessageError";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import IMText from "@/data/img-text";
import { Message } from "@/constants/Message";
import { mapGetters } from "vuex";
import { common, navigation } from "@/shared/utilities";

export default {
  components: {
    CustomerSelectionSearchList,
    CustomerSelectionSearch,
    BaseProcessing,
    BaseMessageError
  },

  data() {
    return {
      tableId: "sshi0025-table",
      customers: [],
      imgtext: IMText,
      title: IMText.title.sshi0025,
      message: [],
      openDl: false,
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      isSearch: false,
      search: {
        customerName: "",
        customerKana: "",
        address: "",
        tel: ""
      }
    };
  },

  async created() {
    common.resetPage();
    this.message = [];
    const param = { ...this.initParams() };
    await this.$store.dispatch("menuModule/getMenuSshi0025");
    await this.getAll(param);
  },

  methods: {
    initParams() {
      const param = {
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        customerName: this.search.customerName,
        customerKana: this.search.customerKana,
        address: this.search.address,
        tel: this.search.tel
      };
      return param;
    },

    onSelect(data) {
      if (data) {
        this.$store.dispatch("menuModule/setCustomer", data);
        navigation.sshi0038();
      }
    },

    async getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      await this.getAll(param);
    },

    async getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.initParams() };
      await this.getAll(param);
    },

    async onSearch() {
      this.message = [];
      this.isSearch = true;
      let param = { ...this.initParams() };
      await this.getAll(param);
    },

    onReset() {
      this.message = [];
      this.search.customerName = "";
      this.search.customerKana = "";
      this.search.address = "";
      this.search.tel = "";
    },

    async closeSort(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "DisplayOrder";
      const param = { ...this.initParams() };
      await this.getAll(param);
    },

    async onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      await this.getAll(param);
    },

    async getAll(param) {
      this.openDl = true;
      await this.$store
        .dispatch("customerModule/getCustomerOption", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    }
  },

  computed: {
    ...mapGetters({
      customerOption: "customerModule/getCustomerOption"
    })
  },

  watch: {
    customerOption() {
      this.customers = this.customerOption.items;
      this.pageCount = this.customerOption.pageCount;
      this.count = this.customerOption.count;
    }
  },

  beforeDestroy() {
    this.$store.dispatch("menuModule/getMenus");
  }
};
</script>
