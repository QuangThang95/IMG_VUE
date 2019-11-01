<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <GeneralSearch @onReset="onReset" @onSearch="onSearch" :search="search"></GeneralSearch>
      <GeneralList
        :onAdd="onAdd"
        :generals="generals"
        :search="search"
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
import { MasterProperty } from "@/shared/MasterProperty";
import GeneralSearch from "./general-search";
import GeneralList from "./general-list";
import { mapGetters } from "vuex";
import IMText from "@/data/img-text";
import HttpStatus from "http-status-codes";
import BaseMessageError from "@/components/BaseMessageError";
import AppConfig from "@/constants/AppConfig";
import { Message } from "@/constants/Message";
import CountCharacter from "@/shared/CountCharacter";
import { common } from "@/shared/utilities";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  components: {
    GeneralSearch,
    GeneralList,
    BaseMessageError,
    BaseProcessing
  },

  data() {
    return {
      usersCondition: [],
      message: [],
      openDl: false,
      title: IMText.title.sshi0022,
      search: {
        key1: "",
        key1Desc: "",
        key2: "",
        key3: "",
        data1: "",
        data2: ""
      },
      generals: [],
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
    };
  },

  created() {
    common.resetPage();
    this.message = [];
    
    let data = this.$store.getters["generalModule/setDataGeneral"];
    
    if(data.key1) { 
      this.search = {
        key1: data.key1,
        key1Desc: data.key1Desc,
        key2: data.key2,
        key3: data.key3,
        data1: data.data1,
        data2: data.data2
      };
      this.getAll(data);
    }
  },

  methods: {
    initParams() {
      const param = {
        page: AppConfig.Pages.page,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        key1: this.search.key1,
        key1Desc: this.search.key1Desc,
        key2: this.search.key2,
        key3: this.search.key3,
        data1: this.search.data1,
        data2: this.search.data2
      };
      return param;
    },
    onAdd() {
      this.$router.push({
        path: MasterProperty.FSHI0008.SSHI0023.Path,
        name: MasterProperty.FSHI0008.SSHI0023.Name,
        params: {
          key1: this.search.key1
        }
      });
    },

    getAll(param) {
      this.openDl = true;
      this.$store
        .dispatch("generalModule/getGeneralSetting", param)
        .then(res => {
          if (res.data.items.length < 1) {
            this.message.push(Message.E00021);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onReset() {
      this.search = {
        key1: "",
        key1Desc: "",
        key2: "",
        key3: "",
        data1: "",
        data2: ""
      };
    },

    onDelete(data) {
      this.openDl = true;
      const params = {
        recordId: data.recordId,
        lastUpdate: data.lastUpdate
      };
      this.$store.dispatch("generalModule/deleteUser", params).then(res => {
        if (res.status === HttpStatus.OK) {
          let param = { ...this.initParams() };
          this.getAll(param);
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
      let param = { ...this.initParams() };
      this.$store.dispatch('generalModule/setDataGeneral', param);
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
    }
  },

  computed: {
    ...mapGetters({
      generalOption: "generalModule/getGeneralSetting",
    })
  },

  watch: {
    generalOption() {
      this.generals = this.generalOption.items;
      this.pageCount = this.generalOption.pageCount;
      this.count = this.generalOption.count;
    },
  }
};
</script>
    
<style>
</style>
