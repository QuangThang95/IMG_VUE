<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message"></BaseMessageError>
      <customergroupsearch @onSearch="onSearch" @onReset="onReset" :search="search"></customergroupsearch>
      <customergroupgrid
        :onAdd="onAdd"
        :dataTable="customerGroup"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @onDelete="onDelete"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        @orderByUp="orderByGroupUp"
        @orderByDown="orderByGroupDown"
      ></customergroupgrid>
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import customergroupgrid from "./customer-group-grid.vue";
import customergroupsearch from "./customer-group-search";
import { CustomerGroupService } from "@/services/customerGroup.service";
import { current ,common} from "@/shared/utilities";
import BaseMessageError from "@/components/BaseMessageError";
import { Message } from "@/constants/Message";
import { mapGetters } from "vuex";
import CountCharacter from "@/shared/CountCharacter";
import AppConfig from "@/constants/AppConfig";
import BaseProcessing from "@/components/BaseProcessing";
const customerGroup = new CustomerGroupService();
export default {
  components: {
    customergroupsearch,
    customergroupgrid,
    BaseMessageError,
    BaseProcessing
  },
  data() {
    return {
      currentCustomerCode: current.customer().customerCode,
      message: [],
      title: "排出事業場グループ一覧",
      customerGroup: [],
      search: {
        group_name: "",
        group_kana: ""
      },
      customerGroupNextItem: {},
      customerGroupPreviousItem: {},
      pageCount: 0,
      count: 0,
      pageSize: 10,
      pages: AppConfig.Pages,
      openDl: false,
      isSearch: false,
    };
  },

  methods: {
    initParams() {
      const param = {
        customerCode: this.currentCustomerCode,
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        groupName: this.search.group_name,
        groupKana: this.search.group_kana
      };
      return param;
    },

    onAdd() {
      this.$router.push({
        path: MasterProperty.FSHI0003.SSHI0008.Path,
        name: MasterProperty.FSHI0003.SSHI0008.Name
      });
    },

    onSearch() {
      this.message = [];
      this.isSearch = true;
      let param = { ...this.initParams() };
      this.getAllCustomerGroup(param);
    },

    onReset() {
      this.message = [];
      this.isSearch = false;
      this.search.group_name = "";
      this.search.group_kana = "";
    },

    onDelete(data) {
      this.openDl = true;
      this.$store
        .dispatch("customerGroupModule/deleteCustomerGroup", data)
        .then(() => {
          const param = { ...this.initParams() };
          this.getAllCustomerGroup(param);
        }).finally(() => {
          this.openDl = false;
        });
    },
    getAllCustomerGroup(param) {
      this.openDl = true;
      this.$store
        .dispatch("customerGroupModule/getAllCustomerGroup", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        }).finally(() => {
          this.openDl = false;
        });
    },

    displayOrderGroup(param) {
      this.$store
        .dispatch("customerGroupModule/displayOrder", param)
        .then(res => {
          this.getCurrentPage();
        });
    },

    getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getAllCustomerGroup(param);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.initParams() };
      this.getAllCustomerGroup(param);
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "DisplayOrder";
      let param = { ...this.initParams() };
      this.getAllCustomerGroup(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getAllCustomerGroup(param);
    },

    orderDisplayByCode(arr, data, isUp) {
      const index = arr.findIndex(item => item === data);
      if (isUp) {
        return arr[index - 1];
      }
      return arr[index + 1];
    },

    handleOrderByGroup(data, object) {
      const result = {
        customerCode: data.item.customerCode,
        groupCode: data.item.groupCode,
        displayOrder: data.item.displayOrder,
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        CustomerGroup1: { ...result },
        CustomerGroup2: {
          customerCode: object.customerCode,
          groupCode: object.groupCode,
          displayOrder: object.displayOrder,
          lastUpdate: object.lastUpdate
        }
      };
      return this.displayOrderGroup(param);
    },
    orderByGroupUp(data) {
      const result = this.orderDisplayByCode(
        this.customerGroup,
        data.item,
        true
      );
      if (data.index === 0) {
        return this.handleOrderByGroup(data, this.customerGroupPreviousItem);
      }
      return this.handleOrderByGroup(data, result);
    },

    orderByGroupDown(data) {
      const result = this.orderDisplayByCode(
        this.customerGroup,
        data.item,
        false
      );
      if (data.index === this.customerGroup.length - 1) {
        return this.handleOrderByGroup(data, this.customerGroupNextItem);
      }
      return this.handleOrderByGroup(data, result);
    }
  },

  created() {
    common.resetPage();
    let param = { ...this.initParams() };
    this.getAllCustomerGroup(param);
  },

  computed: {
    data() {
      return this.$store.state.customerGroupModule.allCustomerGroup;
    }
  },

  watch: {
    data() {
      this.customerGroup = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
      this.customerGroupNextItem = this.data.nextItem;
      this.customerGroupPreviousItem = this.data.previousItem;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
