<template>
  <div>
    <b-row>
      <b-col>
        <h6 class="mb-2 float-left ml-2 fontColor">{{name}}</h6>
      </b-col>
      <b-col>
        <div class="float-right mb-3 mt-2">
          <label v-if="permissionGroup.Delete">
            <div class="btn btn-form btn-secondary btn-sm upload-file">一括削除</div>
            <b-file class="hide-status" multiple v-on:change="onChange($event,'delete')" hidden></b-file>
          </label>

          <label v-if="permissionGroup.Update">
            <div class="btn btn-form btn-secondary mr-2 ml-2 btn-sm upload-file">一括登録</div>
            <b-file class="hide-status" multiple v-on:change="onChange($event,'upload')" hidden></b-file>
          </label>
          <b-button v-if="permissionGroup.Create" class="btn-form" size="sm" @click="onAdd">新規登録</b-button>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div v-if="manifests.length > 0" :class="classByWaste">
          <b-table
            :fields="fields"
            :items="manifests"
            :striped="true"
            :bordered="true"
            :outlined="true"
            :small="true"
            :class="classByWaste"
            selectable
            :select-mode="selectMode"
            @row-selected="onRowSelected"
            sticky-header="stickerHeader"
            id="table-manifest"
          >
            <template v-for="field in fields" :slot="[field.slot]" slot-scope="data">
              {{data.label}}
              <BaseSort
                v-bind:key="field.key"
                :data="data"
                :fields="fields"
                @closeSort="closeSort"
                @onSorting="onSorting"
                v-if="field.isSortable === true"
              ></BaseSort>
            </template>
            <template slot="branchName"></template>
            <template slot="data1">{{name}}</template>
          </b-table>

          <BasePaging
            sizePaging
            :items="manifests"
            :idTable="idTable"
            :pageCount="pageCount"
            :count="count"
            :pageSize="pageSize"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
          ></BasePaging>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import { MasterProperty } from "@/shared/MasterProperty";
import FormatData from "@/shared/FomatData";
import BasePaging from "@/components/BasePaging.vue";
import { PagingConfig } from "@/constants/Paging";
import moment from "moment";
import PopupMessage from "@/components/BasePopupMessage.vue";
import BaseSort from "@/components/BaseSort.vue";
import AppConfig from "@/constants/AppConfig";

import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import { canAction, common } from "@/shared/utilities";
export default Vue.extend({
  props: [
    "manifests",
    "pageCount",
    "count",
    "pageSize",
    "classByWaste",
    "name"
  ],
  components: {
    PopupMessage,
    BasePaging,
    BaseSort
  },

  data() {
    return {
      fields: [
        {
          key: "branchName",
          slot: "HEAD_branchName",
          label: "事業場",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "entryCode",
          label: "発行番号",
          slot: "HEAD_entryCode",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "transporterName",
          label: "収集運搬業者",
          slot: "HEAD_transporterName",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "deliveryDate",
          label: "引渡し日",
          slot: "HEAD_deliveryDate",
          formatter: value => {
            return FormatData.displayDate(value);
          },
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "排出物大分類",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "wasteName",
          slot: "HEAD_wasteName",
          label: "排出物名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "unitQuantity",
          slot: "HEAD_unitQuantity",
          label: "数量",
          isSortable: true,
          isDesc: true,
          isAsc: true
        }
      ],
      idTable: "sshi0033",
      stickerHeader: "500px",
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      selectMode: "single",
      selected: []
    };
  },

  created() {
    this.permissionGroup.Create = canAction(
      Action.Create,
      Screen.SSHI0032_45_ADD
    );
    if (canAction(Action.Update, Screen.SSHI0031_45)) {
      this.permissionGroup.Update = true;
    } else if (canAction(Action.Read, Screen.SSHI0031_45)) {
      this.permissionGroup.Read = true;
    }
    if (canAction(Action.Delete, Screen.SSHI0031_45)) {
      this.permissionGroup.Delete = true;
    }
  },

  methods: {
    onChange(event, onButton) {
      this.checkFile(event, onButton);
    },
    checkFile(event, onButton) {
      let totalSize = 0;
      this.files = event.target.files;
      if (!this.files || this.files.length > AppConfig.MaxLength.FileSize) {
        this.files = [];
        return false;
      } else {
        for (let item of this.files) {
          if (!this.onCheckExtention(item.name)) {
            this.files = [];
            return false;
          }
          totalSize += item.size;
          if (totalSize / (1014 * 1024) > AppConfig.MaxLength.FileSize) {
            this.files = [];
            return false;
          }
        }
        var resultArray = Object.keys(this.files).map(personNamedIndex => {
          let person = this.files[personNamedIndex];
          return person;
        });
        this.$emit("uploadFile", resultArray, onButton);
      }
    },

    onCheckExtention(file) {
      const res = file.split(".");
      if (
        res &&
        AppConfig.File.CSV.includes(res[res.length - 1].toLowerCase())
      ) {
        return true;
      }
      return false;
    },

    onAdd() {
      this.$emit("onAdd");
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    closeSort(data) {
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      const sort = ischeck === "up" ? true : false;
      this.$emit("onSorting", data.column, sort);
    },

    onRowSelected(items) {
      this.redirectToUpdate(items);
    },

    redirectToUpdate(data) {
      const param = {
        customerCode: data[0].customerCode,
        branchCode: data[0].branchCode,
        contractCode: (data[0].contractCode)?data[0].contractCode: 0,
        entryCode: data[0].entryCode
      };
      localStorage.setItem('params', JSON.stringify(param));
      this.unSetDataErr();
      this.$router.push({
        path: MasterProperty.FSHI0011.SSHI0033.Path,
        name: MasterProperty.FSHI0011.SSHI0033.Name, 
        params: {
          manifestNumber: data[0].entryCode
        }
      });
    },

    unSetDataErr() {
      this.$store.dispatch("notificationModule/setDataError", null);
    },
  }
});
</script>
