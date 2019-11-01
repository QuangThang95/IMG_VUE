<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <CustomerSearch @onSearch="onSearch" :search="search" @onReset="onReset" />
      <CustomerList
        :items="customers"
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
import BaseMessageError from "@/components/BaseMessageError";
import BaseProcessing from "@/components/BaseProcessing";
import { MasterProperty } from "@/shared/MasterProperty";
import CustomerList from "./customer-list.vue";
import CustomerSearch from "./customer-search.vue";
import { mapGetters } from "vuex";
import IMText from "@/data/img-text";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import * as lodash from "lodash";
import CountCharacter from "@/shared/CountCharacter";
import { common, navigation, handleOutput, current } from "@/shared/utilities";

export default {
  components: {
    BaseMessageError,
    CustomerSearch,
    CustomerList,
    BaseProcessing
  },
  data() {
    return {
      customers: [],
      nextItem: {},
      previousItem: {},
      imgtext: IMText,
      title: IMText.title.sshi0001,
      message: [],
      openDl: false,
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      search: {
        customerName: "",
        customerKana: "",
        address: "",
        tel: ""
      },
      isSearch: false,
      currentCustomer: current.customer()
    };
  },

  created() {
    common.resetPage();
    this.message = [];
    const param = { ...this.initParams() };
    this.getAll(param);
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

    onAdd() {
      navigation.sshi0002();
    },

    onUpdate(customerCode) {
      navigation.sshi0003(customerCode);
    },

    onSelect(customerCode) {
      navigation.sshi0003Detail(customerCode);
    },

    async onDelete(customer) {
      this.openDl = true;
      const object = {
        customerCode: customer.customerCode,
        lastUpdate: customer.lastUpdate
      };
      await this.$store
        .dispatch("customerModule/deleteCustomer", object)
        .then(resp => {
          if (this.currentCustomer.customerCode === resp.data.customerCode) {
            const object = {
              customerCode: 0,
              customerName: "選択中排出事業者名",
              jwnetNumber: "",
              ediKey: ""
            };
            this.$store.dispatch("menuModule/setCustomer", object);
            navigation.sshi0025();
          } else {
            if (this.pages.page > 1 && this.customers.length === 1) {
              AppConfig.Pages.page = this.pages.page - 1;
            }
            this.getCurrentPage();
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getAll(param);
    },

    getPageSize(data) {
      this.pageSize = data;
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
      this.search.customerName = "";
      this.search.customerKana = "";
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
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        customer1: { ...result },
        customer2: {
          customerCode: object.customerCode,
          lastUpdate: object.lastUpdate
        }
      };
      return this.updateDisplayOrder(param);
    },

    orderByUp(data) {
      const result = common.orderDisplayByCode(this.customers, data.item, true);
      if (data.index === 0) {
        return this.handleOrderBy(data, this.previousItem);
      }
      return this.handleOrderBy(data, result);
    },

    orderByDown(data) {
      const result = common.orderDisplayByCode(
        this.customers,
        data.item,
        false
      );
      if (data.index === this.customers.length - 1) {
        return this.handleOrderBy(data, this.nextItem);
      }
      return this.handleOrderBy(data, result);
    },

    updateDisplayOrder(param) {
      this.openDl = true;
      this.$store
        .dispatch("customerModule/updateDisplayOrder", param)
        .then(res => {
          this.getCurrentPage();
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    getAll(param) {
      this.message = [];
      this.openDl = true;
      this.$store
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
      this.nextItem = this.customerOption.nextItem;
      this.previousItem = this.customerOption.previousItem;
    }
  }
};
</script>

