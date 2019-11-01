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
            <b-file class="hide-status" multiple @change="onChange($event,'delete')" hidden></b-file>
          </label>

          <label v-if="permissionGroup.Update">
            <div class="btn btn-form btn-secondary mr-2 ml-2 btn-sm upload-file">一括登録</div>
            <b-file class="hide-status" multiple @change="onChange($event,'upload')" hidden></b-file>
          </label>
          <b-button class="btn-form" v-if="permissionGroup.Create" size="sm" @click="onAdd">追加</b-button>
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
            <template slot="branchName" slot-scope="dataTable">
              <div v-if="dataTable.item.manifestStatus === '承認待'">
                <b-badge pill variant="primary">{{dataTable.value}}</b-badge>
              </div>
              <div v-else>{{dataTable.value}}</div>
            </template>

            <template slot="manifestNumber" slot-scope="data">
              <div v-if="data.value">
                <b-link class="underline" @click="redirectToUpdate(data)">{{data.value}}</b-link>
              </div>
              <div v-else>
                <b-link class="underline" @click="redirectToUpdate(data)">未発行</b-link>
              </div>
            </template>

            <template slot="disposeReportFlag" slot-scope="data">
              <div v-if="data.value.varian">
                <b-badge pill :variant="data.value.varian">{{data.value.flag}}</b-badge>
              </div>
            </template>
            <template slot="finalDisposeReportFlag" slot-scope="data">
              <div v-if="data.value.varian">
                <b-badge pill :variant="data.value.varian">{{data.value.flag}}</b-badge>
              </div>
            </template>
            <template slot="transportReportFlag" slot-scope="data">
              <div v-if="data.value.varian">
                <b-badge pill :variant="data.value.varian">{{data.value.flag}}</b-badge>
              </div>
            </template>

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
      currentPage: 1,
      perPage: PagingConfig.PAGE_SIZE,
      isVisible: true,
      items: [],
      fields: [
        {
          key: "branchName",
          slot: "HEAD_branchName",
          label: "事業場",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "branchName"
        },
        {
          key: "manifestStatus",
          slot: "HEAD_ManifestStatus",
          label: "状況",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "manifestStatus"
        },
        {
          key: "finalDisposeReportLimit",
          slot: "HEAD_finalDisposeReportLimit",
          label: "期限",
          formatter: value => {
            return FormatData.displayDate(value);
          },
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "finalDisposeReportLimit"
        },
        {
          key: "manifestNumber",
          slot: "HEAD_manifestNumber",
          label: "マニフェスト番号",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "manifestNumber"
        },
        {
          key: "transportReportFlag",
          slot: "HEAD_transportReportFlag",
          label: "運搬",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "transportReportFlag"
        },
        {
          key: "disposeReportFlag",
          slot: "HEAD_disposeReportFlag",
          label: "処分",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "disposeReportFlag"
        },
        {
          key: "finalDisposeReportFlag",
          slot: "HEAD_finalDisposeReportFlag",
          label: "最終",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "finalDisposeReportFlag"
        },
        {
          key: "contactNumber1",
          slot: "HEAD_contactNumber1",
          label: "連絡番号1",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "contactNumber1"
        },
        {
          key: "contactNumber2",
          slot: "HEAD_contactNumber2",
          label: "連絡番号2",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "contactNumber2"
        },
        {
          key: "contactNumber3",
          slot: "HEAD_contactNumber3",
          label: "連絡番号3",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "contactNumber3"
        },
        {
          key: "transporterName",
          slot: "HEAD_transporterName",
          label: "収集運搬業者",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "transporterName"
        },
        {
          key: "disposerName",
          slot: "HEAD_disposerName",
          label: "処分業者",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "disposerName"
        },
        {
          key: "deliveryDate",
          slot: "HEAD_deliveryDate",
          label: "引渡し日",
          formatter: value => {
            return FormatData.displayDate(value);
          },
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "deliveryDate"
        },
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "排出物大分類",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "data1"
        },
        {
          key: "wasteName",
          slot: "HEAD_wasteName",
          label: "排出物名",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "wasteName"
        },
        {
          key: "unitQuantity",
          slot: "HEAD_unitQuantity",
          label: "数量",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "unitQuantity"
        }
      ],
      idTable: "sshi0031-table",
      stickerHeader: "500px",
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      files: []
    };
  },
  created() {
    this.permissionGroup.Create = canAction(
      Action.Create,
      Screen.SSHI0032_123_ADD
    );
    if (canAction(Action.Update, Screen.SSHI0031_123)) {
      this.permissionGroup.Update = true;
    } else if (canAction(Action.Read, Screen.SSHI0031_123)) {
      this.permissionGroup.Read = true;
    }
    if (canAction(Action.Delete, Screen.SSHI0031_123)) {
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

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    onAdd() {
      this.unSetDataErr();
      this.$emit("onAdd");
    },

    redirectToUpdate(data) {
      this.unSetDataErr();
      this.$router.push({
        path: MasterProperty.FSHI0011.SSHI0033.Path,
        name: MasterProperty.FSHI0011.SSHI0033.Name,
        params: {
          manifestNumber: data.item.entryCode
        }
      });
    },

    unSetDataErr() {
      this.$store.dispatch("notificationModule/setDataError", null);
    },

    closeSort(data) {
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      const sort = ischeck === "up" ? true : false;
      this.$emit("onSorting", data.column, sort);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/notification/_notification.scss";

.hidenColunm {
  display: none;
}

.underline {
  text-decoration: underline;
}

.bottom {
  font-size: 10px;
  text-align: center;
}
</style>
