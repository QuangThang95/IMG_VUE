<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message"></BaseMessageError>
      <sshi0013search @onSearch="onSearch" :search="search" @onReset="onReset"></sshi0013search>
      <sshi0013grid
        :name="supplierHandle.length"
        :onAdd="onAdd"
        :currentCustomerCode="currentCustomerCode"
        :dataTable="supplierHandle"
        @onDelete="onDelete"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        @orderByUp="orderByUp"
        @orderByDown="orderByDown"
      ></sshi0013grid>
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import sshi0013search from "./supplier-handle-master-search.vue";
import sshi0013grid from "./supplier-handle-master-grid.vue";
import BaseMessageError from "@/components/BaseMessageError";
import { MasterProperty } from "@/shared/MasterProperty";
import { current, common } from "@/shared/utilities";
import { mapGetters } from "vuex";
import { Message } from "@/constants/Message";
import * as lodash from "lodash";
import CountCharacter from "@/shared/CountCharacter";
import AppConfig from "@/constants/AppConfig";
import BaseProcessing from "@/components/BaseProcessing";

export default {
  components: {
    sshi0013search,
    sshi0013grid,
    BaseMessageError,
    BaseProcessing
  },

  data() {
    return {
      currentCustomerCode: current.customer().customerCode,
      supplierHandle: [],
      message: [],
      title: "処分業者一覧",
      suppplierNextItem: {},
      suppplierPreviousItem: {},
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
      pages: AppConfig.Pages,
      isSearch: false,
      openDl: false,
    };
  },

  methods: {
    initParams() {
      const param = {
        supplierClass: 3,
        customerCode: this.currentCustomerCode,
        pageSize: this.pageSize,
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        supplierNumber: this.search.supplierNumber,
        supplierName: this.search.supplierName,
        supplierKana: this.search.supplierKana,
        address: this.search.address,
        tel: this.search.tel
      };
      return param;
    },
    onAdd() {
      this.$router.push({
        path: MasterProperty.FSHI0005.SSHI0014.Path,
        name: MasterProperty.FSHI0005.SSHI0014.Name
      });
    },

    onDelete(data) {
      this.openDl = true;
      this.$store
        .dispatch("supplierHandleModule/deleteSupplierHandle", data)
        .then(res => {
          const param = { ...this.initParams() };
          param.page = this.pages.page;
          this.getAll(param);
        }).finally(() => {
          this.openDl = false;
        });
    },

    getSupplierHandle(customerCode) {
      this.$store
        .dispatch("supplierHandleModule/getSupplierHandle", customerCode)
        .then(res => {
          if (res.data.length < 1) {
            this.message.push(Message.E00021);
          }
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

    displayOrderSupplier(param) {
      this.$store
        .dispatch("supplierHandleModule/displayOrderSupplier", param)
        .then(res => {
          this.getCurrentPage();
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
      this.search.supplierName = "";
      this.search.supplierKana = "";
      this.search.supplierNumber = "";
      this.search.address = "";
      this.search.tel = "";
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "DisplayOrder"
      const param = { ...this.initParams() };
      this.getAll(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    orderDisplayByCode(arr, data, isUp) {
      const index = arr.findIndex(item => item === data);
      if (isUp) {
        return arr[index - 1];
      }
      return arr[index + 1];
    },

    handleOrderBySupplier(data, object) {
      const result = {
        customerCode: data.item.customerCode,
        supplierCode: data.item.supplierCode,
        displayOrder: data.item.displayOrder,
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        supplier1: { ...result },
        supplier2: {
          customerCode: object.customerCode,
          supplierCode: object.supplierCode,
          displayOrder: object.displayOrder,
          lastUpdate: object.lastUpdate
        }
      };
      return this.displayOrderSupplier(param);
    },
    orderByUp(data) {
      const result = this.orderDisplayByCode(
        this.supplierHandle,
        data.item,
        true
      );
      if (data.index === 0) {
        return this.handleOrderBySupplier(data, this.suppplierPreviousItem);
      }
      return this.handleOrderBySupplier(data, result);
    },

    orderByDown(data) {
      const result = this.orderDisplayByCode(
        this.supplierHandle,
        data.item,
        false
      );
      if (data.index === this.supplierHandle.length - 1) {
        return this.handleOrderBySupplier(data, this.suppplierNextItem);
      }
      return this.handleOrderBySupplier(data, result);
    }
  },

  created() {
    this.message = [];
    common.resetPage();
    const param = { ...this.initParams() };
    this.getAll(param);
  },

  computed: {
    ...mapGetters({
      data: "supplierHandleModule/getAll"
    })
  },

  watch: {
    data() {
      this.supplierHandle = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
      this.suppplierNextItem = this.data.nextItem;
      this.suppplierPreviousItem = this.data.previousItem;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
