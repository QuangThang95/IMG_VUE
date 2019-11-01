<template>
  <div>
    <b-row>
      <b-col>
        <div v-if="permissionGroup.Create">
          <b-button
            v-if="permissionGroup.Create"
            class="float-right btn-form mb-2"
            size="sm"
            @click="onAdd"
          >{{ imgtext.general.btnAdd }}</b-button>
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
          />
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
import { canAction, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import moment from "moment";
import { Customer } from "@/models/customer.model";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import IMText from "@/data/img-text";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";

export default Vue.extend({
  props: ["items", "pageCount", "count", "pageSize"],
  components: {
    BaseTablePermission,
    BasePopupMessage
  },
  data() {
    return {
      imgtext: IMText,
      isVisible: true,
      tableId: "sshi0001-table",
      fields: [
        {
          key: "customerName",
          slot: "HEAD_customerName",
          label: "事業者名",
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
          tdClass: "classButton"
        },
        {
          key: "lastUpdate",
          label: "最終更新日",
          formatter: value => {
            return FormatData.displayDate(value);
          }
        }
      ],
      customer: Customer,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      position: 3,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup)
    };
  },

  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0001);
    if (canAction(Action.Update, Screen.SSHI0001)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0001)) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0001)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    onPicker(data) {
      this.customer = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onAdd() {
      this.unSetDataErr();
      this.$emit("onAdd");
    },

    onUpdate(data) {
      this.unSetDataErr();
      this.$emit("onUpdate", data.item.customerCode);
    },

    onSelect(data) {
      this.unSetDataErr();
      this.$emit("onSelect", data.item.customerCode);
    },

    onDelete() {
      this.$emit("onDelete", this.customer);
      this.$refs["modal-confirm"].hideModal();
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
      this.$store.dispatch("notificationModule/setDataError", null);
    }
  },

  computed: {
    dataTable() {
      return this.items;
    }
  }
});
</script>
