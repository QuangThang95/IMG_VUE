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
            :position="position"
            :permissionGroup="permissionGroup"
            :pageSize="pageSize"
            :pageCount="pageCount"
            :count="count"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            @onSelect="onSelect"
            @closeSort="closeSort"
            @onSorting="onSorting"
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
import { canAction, common, isNullOrUndefined } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import BasePaging from "@/components/BasePaging.vue";
export default Vue.extend({
  props: [
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
          label: IMText.general.supplierNumber,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName",
          slot: "HEAD_supplierName",
          label: IMText.general.supplierName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: IMText.general.address,
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
          key: "tel",
          slot: "HEAD_tel",
          label: IMText.general.tel,
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
          label: IMText.general.displayOrder,
          tdClass: "classButton"
        },
        {
          key: "lastUpdate",
          slot: "HEAD_lastUpdate",
          label: IMText.general.lastUpdate,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        }
      ],
      tableId: "fshi0003",
      position: 4,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      suppliers: SupplierHandle,
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
      this.suppliers = data;
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
        supplierCode: this.suppliers.item.supplierCode,
        lastUpdate: this.suppliers.item.lastUpdate
      };

      this.$emit("onDelete", data);
      this.$refs["modal-confirm"].hideModal();
    },

    onAdd() {
      this.unSetDataErr();
      this.$emit("onAdd");
    },

    onUpdate(data) {
      this.unSetDataErr();
      this.$emit("onUpdate", data.item.supplierCode);
    },

    onSelect(data) {
      this.unSetDataErr();
      this.$emit("onSelect", data.item.supplierCode);
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

    orderByUp(data) {
      this.$emit("orderByUp", data);
    },

    orderByDown(data) {
      this.$emit("orderByDown", data);
    },

    unSetDataErr() {
      this.$store.dispatch('notificationModule/setDataError', null);
    }
  }
});
</script>
