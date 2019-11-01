<template>
  <div>
    <b-table
      :id="tableId"
      :items="dataTable"
      :fields="initData"
      :striped="true"
      :bordered="true"
      :outlined="true"
      :small="true"
      :per-page="pageSize"
      :current-page="1"
      @row-clicked="onRowClicked"
      sticky-header="stickerHeader"
    >
      <template v-for="field in initData" :slot="[field.slot]" slot-scope="data">
        {{data.label}}
        <BaseSort
          v-bind:key="field.key"
          :data="data"
          :fields="initData"
          @closeSort="closeSort"
          @onSorting="onSorting"
          v-if="field.isSortable === true"
        ></BaseSort>
      </template>
      <template
        slot="displayOrder"
        class="text-center"
        v-if="permissionGroup.Update"
        slot-scope="data"
      >
        <b-button size="sm" class="btn-form btn-arrow-left" @click="orderByUp(data)">
          <i class="fa fa-caret-up fa-sm pl-2 pr-2"></i>
        </b-button>
        <b-button size="sm" class="btn-form btn-arrow-right" @click="orderByDown(data)">
          <i class="fa fa-caret-down fa-sm pl-2 pr-2"></i>
        </b-button>
      </template>
      <template slot="actionDirective" slot-scope="data" class="text-center">
        <!-- This case use for User Screen -->
        <span
          v-if="permissionGroup.Update && isUserScreen && data && data.item && data.item.roleCode === 0"
        ></span>

        <span
          v-if="permissionGroup.Update && isUserScreen && data && data.item && data.item.roleCode !== 0"
        >
          <b-button
            class="btn-form btn-arrow-left pl-2 pr-2"
            size="sm"
            @click="onUpdate(data)"
          >{{ nameButtonGroup.update }}</b-button>
        </span>

        <!-- This case use for All Screen exclude Report and User screen -->
        <span v-if="permissionGroup.Update && !isUserScreen && !isReportScreen">
          <label v-if="isUpdateFile" class="pl-2 pr-2 label-margin">
            <div class="btn btn-form btn-secondary btn-sm upload-file">{{ nameButtonGroup.update }}</div>
            <b-file v-on:change="onChangeTable($event, data)" v-model="file" hidden></b-file>
          </label>

          <b-button
            class="btn-form btn-arrow-left pl-2 pr-2"
            size="sm"
            @click="onUpdate(data)"
            v-else
          >{{ nameButtonGroup.update }}</b-button>
        </span>

        <!-- This case use for Report Screen -->
        <span
          v-if="permissionGroup.Update && isReportScreen && data && data.item && data.item.data1 ==='集計完了'"
        >
          <b-button
            class="btn-form btn-arrow-left pl-2 pr-2"
            size="sm"
            @click="onUpdate(data)"
          >{{ nameButtonGroup.update }}</b-button>
        </span>

        <span v-if="permissionGroup.Read">
          <b-button class="btn-form" size="sm" @click="onSelect(data)">{{ nameButtonGroup.read }}</b-button>
        </span>
        <span v-if="permissionGroup.Delete">
          <b-button
            class="btn-form btn-arrow-right pl-2 pr-2"
            size="sm"
            @click="openModalDelete(data)"
          >{{ nameButtonGroup.delete }}</b-button>
        </span>
      </template>
      <template slot="contractName" slot-scope="data" class="text-center">
        <div
          style="color:red"
          v-if="isContractScreen && data && data.item && data.item.contractStatus === 0"
        >{{data.item.contractName}}</div>
        <div v-else>{{data.item.contractName}}</div>
      </template>
      <template slot="checkbox" class="text-center">
        <b-form-checkbox id="checkbox-1" name="checkbox-1"></b-form-checkbox>
      </template>
    </b-table>
    <div v-if="isShowPagging">
      <BasePaging
        :items="dataTable"
        :tableId="tableId"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @getCurrentPage="getCurrentPage"
        @getPageSize="getPageSize"
      ></BasePaging>
    </div>
  </div>
</template>

<script>
import BasePaging from "@/components/BasePaging.vue";
import BaseSort from "@/components/BaseSort.vue";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import AppConfig from "@/constants/AppConfig";
import * as lodash from "lodash";
import IMText from "@/data/img-text.json";
import { isNullOrUndefined } from "@/shared/utilities";

export default {
  props: {
    dataTable: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    tableId: {
      type: String,
      default: ""
    },
    onClickOK: {
      type: Function,
      default: () => 1
    },
    position: {
      type: Number,
      default: -1
    },
    isShowPagging: {
      type: Boolean,
      default: true
    },
    permissionGroup: {
      type: Object,
      default: () => lodash.cloneDeep(AppConfig.PermissionGroup)
    },
    pageSize: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    },
    nameButtonGroup: {
      type: Object,
      default: () => AppConfig.NameButtonGroup
    },
    isUpdateFile: {
      type: Boolean,
      default: false
    },
    stickerHeader: {
      type: String,
      default: "500px"
    },
    isUserScreen: {
      type: Boolean,
      default: false
    },
    isReportScreen: {
      type: Boolean,
      default: false
    },
    isContractScreen: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BasePaging,
    BaseSort,
    BasePopupMessage
  },
  data() {
    return {
      titlePopupCustom: "",
      isVisible: true,
      pages: AppConfig.Pages,
      imgText: IMText,
      initData: this.fields,
      file: []
    };
  },

  mounted() {
    this.nameButtonGroup.read = !isNullOrUndefined(this.nameButtonGroup.read)
      ? this.nameButtonGroup.read
      : this.imgText.general.btnReference;
    this.nameButtonGroup.update = !isNullOrUndefined(
      this.nameButtonGroup.update
    )
      ? this.nameButtonGroup.update
      : this.imgText.general.btnUpdate;
    this.nameButtonGroup.delete = !isNullOrUndefined(
      this.nameButtonGroup.delete
    )
      ? this.nameButtonGroup.delete
      : this.imgText.general.btnDelete;
  },

  methods: {
    closeSort(data) {
      this.isVisible = true;
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      this.isVisible = false;
      const sort = ischeck === "up" ? true : false;
      this.$emit("onSorting", data.column, sort);
    },

    openModalDelete(data) {
      this.$emit("onPicker", data);
    },

    onUpdate(data) {
      this.$emit("onUpdate", data);
    },

    onSelect(data) {
      this.$emit("onSelect", data);
    },

    onRowClicked(data) {
      this.$emit("onRowClicked", data);
    },
    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    orderByUp(data) {
      this.$emit("orderByUp", data);
    },

    orderByDown(data) {
      this.$emit("orderByDown", data);
    },

    handleInitData() {
      if (this.dataTable.length === 1) {
        return (this.initData = this.fields.reduce((acc, curr) => {
          if (curr.key !== "displayOrder") {
            acc.push(curr);
          }
          return acc;
        }, []));
      }
      this.initData = this.fields;
    },
    onChangeTable(event, data) {
      this.$emit("onChangeTable", event, data);
    }
  },
  beforeCreate() {
    this.isVisible = true;
  },
  created() {
    this.handleInitData();
  },

  watch: {
    isVisible() {
      if (this.position && this.position > 0) {
        if (!this.isVisible) {
          this.initData[this.position].tdClass = "hidenColunm";
          this.initData[this.position].thClass = "hidenColunm";
        } else {
          this.initData[this.position].tdClass = "classButton";
          this.initData[this.position].thClass = "";
        }
      }
    },
    pagesTemp() {
      this.$emit("onSearchPage");
    },

    dataTable() {
      this.handleInitData();
    },

    fields() {
      this.initData = this.fields;
    }
  }
};
</script>
<style lang="scss" scoped>
.fa-caret-up,
.fa-caret-down {
  font-size: 20px;
}
</style>

