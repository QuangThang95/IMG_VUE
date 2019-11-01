<template>
  <div>
    <b-row>
      <b-col>
        <div v-if="permissionGroup.Create">
          <b-button class="float-right btn-form mt-2 mb-2" size="sm" @click="onAdd">追加</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable.length">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields.sync="fields"
            :tableId="tableId"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            :position="position"
            :permissionGroup="permissionGroup"
            @onSelect="onSelect"
            :pageSize="pageSize"
            :pageCount="pageCount"
            @closeSort="closeSort"
            @onSorting="onSorting"
            :count="count"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
            @orderByUp="orderByUp"
            @orderByDown="orderByDown"
          ></BaseTablePermission>
        </div>
      </b-col>
    </b-row>
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onDelete"
    />
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import FormatData from "@/shared/FomatData";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import moment from "moment";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { SupplierHandle } from "@/models/supplier-handle.model";
import IMText from "@/data/img-text";
import { MasterProperty } from "@/shared/MasterProperty";
import { canAction, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import BasePaging from "@/components/BasePaging.vue";
export default Vue.extend({
  props: [
    "onAdd",
    "dataTable",
    "currentCustomerCode",
    "dataAll",
    "pageCount",
    "count",
    "pageSize"
  ],

  components: {
    BaseTablePermission,
    BasePopupMessage,
    BasePaging
  },
  data() {
    return {
      fields: [
        {
          key: "supplierNumber",
          slot: "HEAD_supplierNumber",
          label: "業者番号",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName",
          slot: "HEAD_supplierName",
          label: "事業名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: "所在地",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "tel",
          slot: "HEAD_tel",
          label: "TEL",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          tdAttr: {
            "x-ms-format-detection": "none"
          },
          formatter: value => {
            return FormatData.formatTelphone(value);
          }
        },
        {
          key: "displayOrder",
          label: "表示順",
          tdClass: "classButton",
          thClass: ""
        },
        {
          key: "lastUpdate",
          label: "最終更新日",
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "actionDirective",
          label: "操作",
          tdClass: "classButton",
          thClass: ""
        }
      ],
      dataButton: [
        {
          id: 1,
          label: "変更",
          class: "btn-form btn-arrow-left pl-2 pr-2"
        },
        {
          id: 3,
          label: "削除",
          class: "btn-form btn-arrow-right pl-2 pr-2"
        }
      ],
      tableId: "fshi0003",
      position: 4,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      supplierHandle: SupplierHandle,
      imgtext: IMText,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup)
    };
  },

  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0014);
    if (canAction(Action.Update, Screen.SSHI0013)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0013)) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0013)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    onPicker(data) {
      this.supplierHandle = data;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      const data = {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierHandle.item.supplierCode,
        lastUpdate: this.supplierHandle.item.lastUpdate
      };

      this.$emit("onDelete", data);
      this.$refs["modal-confirm"].hideModal();
    },

    onUpdate(data) {
      this.$router.push({
        path: MasterProperty.FSHI0005.SSHI0015.Path,
        name: MasterProperty.FSHI0005.SSHI0015.Name,
        params: {
          supplierCode: data.item.supplierCode
        }
      });
    },

    onSelect(data) {
      this.$router.push({
        path: MasterProperty.FSHI0005.SSHI0015.Path,
        name: MasterProperty.FSHI0005.SSHI0015.Name,
        params: {
          supplierCode: data.item.supplierCode
        }
      });
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
      this.$emit("onSorting", data, ischeck);
    },

    orderByUp(data){
      this.$emit('orderByUp', data);
    },

    orderByDown(data){
      this.$emit('orderByDown', data);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.hidenColunm {
  display: none;
}
</style>
