<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <UserSearch @onSearch="onSearch" :search="search" @onReset="onReset"></UserSearch>
      <!-- <UserList :onAdd="onAdd" :items="usersCondition" @onDelete="onDelete" /> -->
      <UserList
        :onAdd="onAdd"
        :items="users"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @onDelete="onDelete"
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
import BaseMessageError from "@/components/BaseMessageError";
import { MasterProperty } from "@/shared/MasterProperty";
import UserSearch from "./user-search";
import UserList from "./user-list";
import { mapGetters } from "vuex";
import BaseProcessing from "@/components/BaseProcessing";
import { current, common, isNullOrEmpty } from "@/shared/utilities";
import { Message } from "@/constants/Message";
import IMText from "@/data/img-text";
import HttpStatus from "http-status-codes";
import CountCharacter from "@/shared/CountCharacter";
import AppConfig from "@/constants/AppConfig";
export default {
  components: {
    UserSearch,
    UserList,
    BaseMessageError,
    BaseProcessing
  },

  data() {
    return {
      customerCode: current.customer().customerCode,
      usersCondition: [],
      message: [],
      openDl: false,
      title: IMText.title.sshi0019,
      search: {
        dischargeBusiness: "",
        divisionIncharge: "",
        operationAuthority: "-1",
        contactName: "",
        contactCode: "",
        nameInCharge: ""
      },
      pages: AppConfig.Pages,
      users: [],
      pageCount: 0,
      count: 0,
      pageSize: 10,
      isSearch: false
    };
  },

  created() {
    common.resetPage();
    const param = { ...this.initParams() };
    this.getAll(param);
  },

  methods: {
    initParams() {
      let param = {};
      param = {
        customerCode: this.customerCode,
        page: AppConfig.Pages.page,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        userName: this.search.contactName,
        userKana: this.search.nameInCharge
      };
      if (!isNullOrEmpty(this.search.contactCode)) {
        param.userCode = this.search.contactCode;
      }

      if (!isNullOrEmpty(this.search.dischargeBusiness)) {
        param.branchCode = this.search.dischargeBusiness;
      }

      if (!isNullOrEmpty(this.search.divisionIncharge)) {
        param.userTypeCode = this.search.divisionIncharge;
      }
      param.roleCode = this.search.operationAuthority;

      return param;
    },
    onAdd() {
      this.$store.dispatch("customerBranchModule/setCustomerBranch", {
        customerBranch: {},
        imgStatus: false
      });
      this.$router.push({
        path: MasterProperty.FSHI0007.SSHI0020.Path,
        name: MasterProperty.FSHI0007.SSHI0020.Name
      });
    },

    getAll(param) {
      this.openDl = true;
      this.$store
        .dispatch("userModule/getUsers", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onDelete(data) {
      const params = {
        userCode: data.userCode,
        lastUpdate: data.lastUpdate
      };
      this.$store.dispatch("userModule/deleteUser", params).then(res => {
        if (res.status === HttpStatus.OK) {
          let param = { ...this.initParams() };
          this.getAll(param);
        }
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

    closeSort(data) {
      AppConfig.Pages.descending = true;
      const param = { ...this.initParams() };
      this.getAll(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    onReset() {
      this.message = [];
      this.search = {
        dischargeBusiness: "",
        divisionIncharge: "",
        operationAuthority: "-1",
        contactName: "",
        contactCode: "",
        nameInCharge: ""
      };
    }
  },

  computed: {
    ...mapGetters({
      usersOption: "userModule/getUsers"
    })
  },

  watch: {
    usersOption() {
      this.users = this.usersOption.items;
      this.pageCount = this.usersOption.pageCount;
      this.count = this.usersOption.count;
    }
  }
};
</script>
    
<style>
</style>
