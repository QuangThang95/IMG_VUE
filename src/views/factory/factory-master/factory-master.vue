<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message"></BaseMessageError>
      <FactorySearch @onSearch="onSearch" @onReset="onReset" :search="search" />
      <FactoryGrid
        :dataTable="factoryCondition"
        @onAdd="onAdd"
        @onUpdate="onUpdate"
        @onDelete="onDelete"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        @orderByFactoryDown="orderByFactoryDown"
        @orderByFactoryUp="orderByFactoryUp"
      />
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import FactoryGrid from "./factory-master-grid.vue";
import FactorySearch from "./factory-master-search.vue";
import { mapGetters } from "vuex";
import BaseMessageError from "@/components/BaseMessageError";
import IMText from "@/data/img-text.json";
import { Message } from "@/constants/Message";
import {
  current,
  navigation,
  permission,
  handleOutput
} from "@/shared/utilities";
import { MasterProperty } from "@/shared/MasterProperty";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  components: {
    FactoryGrid,
    FactorySearch,
    BaseMessageError,
    BaseProcessing
  },
  data() {
    return {
      factoryCondition: [],
      message: [],
      title: "処分事業場一覧",
      search: {
        factoryNumber: "",
        factoryName: "",
        factoryKana: "",
        address: "",
        tel: "",
        supplierName: "",
        supplierCode: 0
      },
      pageCount: 0,
      count: 0,
      pageSize: 10,
      customerCode: current.customer().customerCode,
      openDl: false,
      isSearch: false,
    };
  },
  async created() {
    this.message = [];
    const param = { ...this.initParams() };
    await this.getFactorys(param);
  },
  methods: {
    initParams() {
      const param = {
        factoryCode: 0,
        customerCode: this.customerCode,
        pageSize: this.pageSize,
        orderField: "DisplayOrder",
        page: AppConfig.Pages.page,
        descending: false,
        supplierCode: this.search.supplierCode,
        factoryNumber: this.search.factoryNumber,
        factoryName: this.search.factoryName,
        factoryKana: this.search.factoryKana,
        address: this.search.address,
        tel: this.search.tel
      };
      return param;
    },
    getFactorys(param) {
      this.openDl = true;
      this.$store
        .dispatch("factoryModule/getAll", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        }).finally(() => {
          this.openDl = false;
        });
    },

    onSearch() {
      this.message = [];
      this.isSearch = true;
      let param = { ...this.initParams() };
      this.getFactorys(param);
    },

    onReset() {
      this.message = [];
      this.isSearch = false;
      let param = { ...this.initParams() };
      this.getFactorys(param);
    },

    onDelete(factory) {
      const object = {
        customerCode: this.customerCode,
        supplierCode: factory.item.supplierCode,
        factoryCode: factory.item.factoryCode,
        lastUpdate: factory.item.lastUpdate
      };
      this.$store.dispatch("factoryModule/deleteFactory", object).then(resp => {
        let param = { ...this.initParams() };
        this.getFactorys(param);
      });
    },

    onUpdate(factory) {
      this.$router.push({
        path: MasterProperty.FSHI0006.SSHI0018.Path,
        name: MasterProperty.FSHI0006.SSHI0018.Name,
        params: {
          factoryCode: factory.item.factoryCode,
          supplierCode: factory.item.supplierCode
        }
      });
    },

    onAdd() {
      this.$router.push({
        path: MasterProperty.FSHI0006.SSHI0017.Path,
        name: MasterProperty.FSHI0006.SSHI0017.Name
      });
    },

    getCurrentPage(data) {
      let param = { ...this.initParams() };
      param.page = data;
      param.supplierCode = this.search.supplierCode;
      param.factoryNumber = this.search.factoryNumber;
      param.factoryName = this.search.factoryName;
      param.factoryKana = this.search.factoryKana;
      param.address = this.search.address;
      param.tel = this.search.tel;
      this.getFactorys(param);
    },

    getPageSize(data) {
      this.pageSize = data;
      let param = { ...this.initParams() };
      param.supplierCode = this.search.supplierCode;
      param.factoryNumber = this.search.factoryNumber;
      param.factoryName = this.search.factoryName;
      param.factoryKana = this.search.factoryKana;
      param.address = this.search.address;
      param.tel = this.search.tel;
      this.getFactorys(param);
    },

    closeSort(data) {
      const param = { ...this.initParams() };
      this.getFactorys(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      param.supplierCode = this.search.supplierCode;
      param.factoryNumber = this.search.factoryNumber;
      param.factoryName = this.search.factoryName;
      param.factoryKana = this.search.factoryKana;
      param.address = this.search.address;
      param.tel = this.search.tel;
      this.getFactorys(param);
    },

    orderByFactoryDown(data) {
      const result = this.orderDisplayByCode(
        this.factoryCondition,
        data.item,
        false
      );
      if (data.index === this.factoryCondition.length - 1) {
        return this.handleOrderByFactory(data, this.suppplierNextItem);
      }
      return this.handleOrderByFactory(data, result);
    },

    handleOrderByFactory(data, object) {
      const result = {
        customerCode: this.customerCode,
        supplierCode: data.item.supplierCode,
        factoryCode: data.item.factoryCode,
        displayOrder: data.item.displayOrder,
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        supplier1: { ...result },
        supplier2: {
          customerCode: this.customerCode,
          supplierCode: data.item.supplierCode,
          factoryCode: data.item.factoryCode,
          displayOrder: data.item.displayOrder,
          lastUpdate: data.item.lastUpdate
        }
      };
      return this.displayOrderFactory(param);
    },

    orderByFactoryUp(data) {
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

    displayOrderFactory(param) {
      this.$store
        .dispatch("supplierHandleModule/displayOrderFactory", param)
        .then(res => {
          this.getCurrentPage();
        });
    }
  },
  computed: {
    ...mapGetters({
      data: "factoryModule/getAll"
    })
  },

  watch: {
    data() {
      this.factoryCondition = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
    }
  }
};
</script>
