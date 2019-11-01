<template>
  <div>
    <b-row>
      <b-col>
        <BaseSelect
          :params="params"
          @onSearch="onSearch"
          :dataSelectBox="dataSelectBox"
          :big="dataSearchTab.big"
          :medium="dataSearchTab.medium"
          :small="dataSearchTab.small"
          class="mb-2"
        />
      </b-col>
      <b-col>
        <b-button
          v-if="permissionGroup.Create"
          class="float-right btn-form mb-2"
          size="sm"
          @click="onAdd"
        >{{ imgtext.general.btnAdd }}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable && dataTable.length">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields="fields"
            :tableId="tableId"
            :position="position"
            :pageSize="pageSize"
            :pageCount="pageCount"
            :count="count"
            :permissionGroup="permissionGroup"
            @closeSort="closeSort"
            @onSorting="onSorting"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
            @orderByUp="orderByUp"
            @orderByDown="orderByDown"
          />
        </div>
      </b-col>
    </b-row>
    <CustomerBranchPopup
      :imgStatus="imgStatus"
      :popupId="popupId"
      :customerBranch="customerBranch"
      :wasteClass="wasteClass"
      :show="show"
      @resetList="resetList"
    />
  </div>
</template>
<script>
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import FormatData from "@/shared/FomatData";
import IMText from "@/data/img-text.json";
import moment from "moment";
import DateTimeFormat from "@/constants/DateTimeFormat";
import CustomerBranchPopup from "../customer-branch-popup/customer-branch-popup";
import { mapGetters } from "vuex";
import { Message } from "@/constants/Message";
import { isNullOrUndefined, current } from "@/shared/utilities";

export default {
  props: [
    "imgStatus",
    "readOnly",
    "customerBranch",
    "wasteClass",
    "tableId",
    "popupId",
    "permissionGroup",
    "dataTable",
    "fields",
    "dataSearchTab",
    "dataSelectBox",
    "pageCount",
    "count",
    "pageSize"
  ],
  components: {
    BaseTablePermission,
    CustomerBranchPopup,
    BaseSelect
  },

  data() {
    return {
      dataPopupTemp: [],
      imgtext: IMText,
      position: 6,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      factory: {},
      params: {},
      show: {}
    };
  },

  async created() {
    this.params = {
      branchCode: this.customerBranch.branchCode,
      customerCode: this.customerBranch.customerCode,
      wasteClass: this.wasteClass
    };
  },

  methods: {
    onAdd() {
      this.show = { ...this.show };
      this.$bvModal.show(this.popupId);
    },

    resetList(wasteClass) {
      this.$emit("resetList", wasteClass);
    },

    onSearch(dataSearch) {
      this.$emit("onSearch", dataSearch);
    },

    getCurrentPage() {
      this.$emit("getCurrentPage", this.wasteClass);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data, this.wasteClass);
    },

    closeSort(data) {
      this.$emit("closeSort", data, this.wasteClass);
    },

    onSorting(data, ischeck) {
      this.$emit("onSorting", data, ischeck, this.wasteClass);
    },

    orderByUp(data) {
      this.$emit("orderByUp", data, this.wasteClass);
    },

    orderByDown(data) {
      this.$emit("orderByDown", data, this.wasteClass);
    }
  },

  watch: {
    // dataPopup() {
    //   this.dataPopupTemp = [...this.dataPopup];
    //   this.dataPopupTemp = this.dataPopupTemp.map(item => {
    //     item.defineType = item.defineType === 0 ? false : true;
    //     return item;
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.wasteCode,
.data3 {
  width: 120px;
}
</style>

