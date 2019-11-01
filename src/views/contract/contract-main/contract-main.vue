<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <ContractSearch
        ref="contract-search"
        :search="search"
        :branchOptions="branchOptions"
        :classByWaste="classByWaste"
        @onSearch="onSearch"
        @onReset="onReset"
        @onChangeBranch="onChangeBranch"
      />
      <ContractGrid
        :dataTable="dataTable"
        :classByWaste="classByWaste"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @onAdd="onAdd"
        @onUpdate="onUpdate"
        @onDelete="onDelete"
        @onSelect="onSelect"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        @orderByUp="orderByUp"
        @orderByDown="orderByDown"
      />
      <b-row class="justify-content-md-center bottom">
        <BaseButtonGroupWasteClass
          :buttonWasteClass="buttons"
          @onClickButtonToggle="onClickButtonToggle"
        />
      </b-row>
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import ContractSearch from "./contract-search";
import ContractGrid from "./contract-grid.vue";
import { mapGetters } from "vuex";
import {
  current,
  handleOutput,
  navigation,
  common,
  isNullOrUndefined
} from "@/shared/utilities";
import { WasteClass } from "@/constants/General";
import IMText from "@/data/img-text";
import BaseMessageError from "@/components/BaseMessageError";
import BaseProcessing from "@/components/BaseProcessing";
import BaseButtonGroupWasteClass from "@/components/BaseButtonGroupWasteClass";
import CountCharacter from "@/shared/CountCharacter";
import AppConfig from "@/constants/AppConfig";
import { Message } from "@/constants/Message";

export default {
  components: {
    ContractGrid,
    ContractSearch,
    BaseMessageError,
    BaseProcessing,
    BaseButtonGroupWasteClass
  },

  data() {
    return {
      currentWasteClass: 1,
      wasteClasses: WasteClass,
      message: [],
      title: IMText.title.sshi0026,
      buttons: [],
      classByWaste: "",
      openDl: false,
      currentCustomer: current.customer(),
      currentUser: current.user(),
      dataTable: [],
      previousItem: {},
      nextItem: {},
      pageCount: 0,
      count: 0,
      pageSize: 10,
      pages: AppConfig.Pages,
      search: {
        isShowAllContract: false,
        branchCode: null,
        contractName: "",
        supplierName: "",
        wasteName: ""
      },
      searchTemp: {
        isShowAllContract: false,
        branchCode: null,
        contractName: "",
        supplierName: "",
        wasteName: ""
      },
      isSearch: false
    };
  },

  async created() {
    common.resetPage();
    this.currentWasteClass = current.wasteClass()
      ? current.wasteClass()
      : common.getWasteClassByList();
    await this.getBranchByWasteClass();
    if (!isNullOrUndefined(this.currentUser.branchCode)) {
      await this.onChangeBranch(this.currentUser.branchCode);
    } else {
      await this.onChangeBranch(0);
    }
    this.classByWaste = common.setWasteColor(this.currentWasteClass);
    let param = { ...this.initParams() };
    this.getAll(param);
  },

  methods: {
    onSearch() {
      this.message = [];
      this.isSearch = true;
      this.currentWasteClass = this.search.isShowAllContract
        ? 0
        : this.currentWasteClass;
      this.search.branchCode =
        this.search.branchCode !== null ? this.search.branchCode : undefined;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    initParams() {
      let param = {
        page: AppConfig.Pages.page,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        branchCode: this.search.branchCode,
        contractName: this.search.contractName,
        isShowAllContract: this.search.isShowAllContract,
        supplierName: this.search.supplierName,
        wasteClass: this.currentWasteClass,
        wasteName: this.search.wasteName
      };
      return param;
    },

    getAll(params) {
      const body = {
        customerCode: this.currentCustomer.customerCode,
        param: params
      };
      this.$store.dispatch("contractModule/getContracts", body).then(res => {
        if (res.data.items.length < 1 && this.isSearch) {
          this.isSearch = false;
          this.message.push(Message.E00021);
        }
      });
    },

    onAdd() {
      navigation.sshi0027(this.currentWasteClass);
    },

    onUpdate(data) {
      const param = {
        branchCode: data.branchCode,
        contractCode: data.contractCode,
        wasteClass: data.wasteClass
      };
      navigation.sshi0028(param);
    },

    onSelect(data) {
      const param = {
        branchCode: data.branchCode,
        contractCode: data.contractCode,
        wasteClass: this.currentWasteClass
      };
      navigation.sshi0028Detail(param);
    },

    onDelete(data) {
      const params = {
        CustomerCode: this.currentCustomer.customerCode,
        ContractCode: data.contractCode,
        BranchCode: data.branchCode
      };
      this.$store
        .dispatch("contractModule/deleteContract", params)
        .then(res => {
          if (res && res.data) {
            this.getCurrentPage();
          }
        })
        .catch(error => {
          this.message = [];
          this.message = this.message.concat(handleOutput.errorHandle(error));
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
      this.search = { ...this.searchTemp };
      this.search.branchCode =
        this.options && this.options.length ? this.options[0].value : null;
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

    handleOrderBy(data, object) {
      const result = {
        customerCode: data.item.customerCode,
        contractCode: data.item.contractCode,
        lastUpdate: data.item.lastUpdate
      };
      const param = {
        contractRequest1: { ...result },
        contractRequest2: {
          customerCode: object.customerCode,
          contractCode: object.contractCode,
          lastUpdate: object.lastUpdate
        }
      };
      return this.updateDisplayOrder(param);
    },

    async updateDisplayOrder(param) {
      this.openDl = true;
      this.message = [];
      await this.$store
        .dispatch("contractModule/updateContractDisplayOrder", param)
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

    onClickButtonToggle(btn) {
      this.buttons = this.buttons.map(b => {
        if (b !== btn) {
          b.state = false;
        } else {
          this.currentWasteClass = b.key;
          current.setWasteClass(b.key);
        }
        return b;
      });
      this.classByWaste = common.setWasteColor(this.currentWasteClass);
      localStorage.setItem("classByWasteContract", this.classByWaste);
      this.pageSize = 10;
      common.resetPage();
      this.search = { ...this.searchTemp };
      this.onSearch();
    },

    async onChangeBranch(value, isCreate = true) {
      this.message = [];
      await this.getDischargeWasteClassByBranch(
        this.currentCustomer.customerCode,
        value
      );

      // set default wasteClass
      let listButtons = common.getButtonDischargeWasteClass(
        this.wasteClasses,
        this.dischargeWaste
      );
      this.buttons = common.mappingWasteClassToListButton(
        listButtons,
        this.currentWasteClass
      );
      if (!isCreate && this.buttons.length > 0) {
        this.classByWaste = common.setWasteColor(this.buttons[0].key);
      }
    },

    async getDischargeWasteClassByBranch(customerCode, branchCode) {
      this.openDl = true;
      await this.$store
        .dispatch("customerBranchModule/getDischargeWasteClassByBranch", {
          customerCode,
          branchCode
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    async getBranchByWasteClass() {
      const object = {
        customerCode: this.currentCustomer.customerCode,
        wasteClass: this.currentWasteClass
      };
      await this.$store.dispatch(
        "customerBranchModule/getBranchByWasteClass",
        object
      );
    }
  },

  computed: {
    ...mapGetters({
      dataTableOption: "contractModule/getContracts",
      dischargeWaste: "customerBranchModule/getDischargeWasteClassByBranch"
    }),

    branchOptions() {
      const items = this.$store.getters[
        "customerBranchModule/getBranchByWasteClass"
      ];
      if (!items) {
        return [];
      }
      if (items.length > 0) {
        this.search.branchCode = items[0].value;
        if (items.length === 1) {
          this.searchTemp.branchCode = items[0].value;
        }
      }
      return items;
    }
  },

  watch: {
    dataTableOption() {
      this.dataTable = this.dataTableOption.items;
      this.pageCount = this.dataTableOption.pageCount;
      this.count = this.dataTableOption.count;
      this.previousItem = this.dataTableOption.previousItem;
      this.nextItem = this.dataTableOption.nextItem;
    }
  }
};
</script>

<style lang="scss">
.bottom {
  font-size: 20px;
  text-align: center;
}
</style>
