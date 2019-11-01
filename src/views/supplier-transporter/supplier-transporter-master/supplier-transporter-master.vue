<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message"></BaseMessageError>
      <SupplierTransporterSearch @onSearch="onSearch" :search="search" @onReset="onReset" />
      <SupplierTransporterList
        :currentCustomerCode="currentCustomerCode"
        :dataTable="dataTable"
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
import SupplierTransporterSearch from "./supplier-transporter-search.vue";
import SupplierTransporterList from "./supplier-transporter-list.vue";
import BaseMessageError from "@/components/BaseMessageError";
import { MasterProperty } from "@/shared/MasterProperty";
import {
  current,
  isNullOrUndefined,
  navigation,
  common,
  handleOutput
} from "@/shared/utilities";
import { mapGetters } from "vuex";
import { Message } from "@/constants/Message";
import * as lodash from "lodash";
import CountCharacter from "@/shared/CountCharacter";
import AppConfig from "@/constants/AppConfig";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  components: {
    SupplierTransporterSearch,
    SupplierTransporterList,
    BaseMessageError,
    BaseProcessing
  },

  data() {
    return {
      currentCustomerCode: current.customer().customerCode,
      dataTable: [],
      nextItem: {},
      previousItem: {},
      message: [],
      title: "収集運搬業者一覧",
      dataAll: {},
      pageCount: 0,
      count: 0,
      pageSize: 10,
      search: {
        supplierNumber: "",
        supplierName: "",
        supplierKana: "",
        address: "",
        tel: ""
      },
      isSearch: false,
      pages: AppConfig.Pages,
      openDl: false,
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
        supplierClass: 2,
        customerCode: this.currentCustomerCode,
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        supplierNumber: this.search.supplierNumber,
        supplierName: this.search.supplierName,
        supplierKana: this.search.supplierKana,
        address: this.search.address,
        tel: this.search.tel
      };
      return param;
    },
    onAdd() {
      navigation.sshi0011();
    },

    onUpdate(supplierCode) {
      navigation.sshi0012(supplierCode);
    },

    onSelect(supplierCode) {
      navigation.sshi0012Detail(supplierCode);
    },

    onDelete(data) {
      this.openDl = true;
      this.$store
        .dispatch("supplierHandleModule/deleteSupplierHandle", data)
        .then(res => {
          if (this.pages.page > 1 && this.dataTable.length === 1) {
            AppConfig.Pages.page = this.pages.page - 1;
          }
          this.getCurrentPage();
        }).finally(() => {
          this.openDl = false;
        });
    },

    getAll(param) {
      this.openDl = true;
      this.$store.dispatch("supplierHandleModule/getAll", param).then(res => {
        if (res.data.items.length < 1 && this.isSearch) {
          this.isSearch = false;
          this.message.push(Message.E00021);
        }
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
      this.search.supplierNumber = "";
      this.search.supplierName = "";
      this.search.supplierKana = "";
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
        supplierCode: data.item.supplierCode,
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        supplier1: { ...result },
        supplier2: {
          customerCode: object.customerCode,
          supplierCode: object.supplierCode,
          lastUpdate: object.lastUpdate
        }
      };
      return this.updateDisplayOrder(param);
    },

    orderByUp(data) {
      const result = common.orderDisplayByCode(this.dataTable, data.item, true);
      if (data.index === 0) {
        return this.handleOrderBy(data, this.previousItem);
      }
      return this.handleOrderBy(data, result);
    },

    orderByDown(data) {
      const result = common.orderDisplayByCode(
        this.dataTable,
        data.item,
        false
      );
      if (data.index === this.dataTable.length - 1) {
        return this.handleOrderBy(data, this.nextItem);
      }
      return this.handleOrderBy(data, result);
    },

    updateDisplayOrder(param) {
      this.$store
        .dispatch("supplierModule/updateDisplayOrderSupplierTransporter", param)
        .then(res => {
          this.getCurrentPage();
        })
        .catch(error => {
          this.message = [];
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    }
  },

  computed: {
    ...mapGetters({
      data: "supplierHandleModule/getAll"
    })
  },

  watch: {
    data() {
      this.dataTable = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
      this.nextItem = this.data.nextItem;
      this.previousItem = this.data.previousItem;
    }
  }
};
</script>
