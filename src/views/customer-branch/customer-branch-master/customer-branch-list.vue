<template>
  <div>
    <b-row>
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
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import FormatData from "@/shared/FomatData";
import moment from "moment";
import IMText from "@/data/img-text";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import { CustomerBranch } from "@/models/auth.model";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import { common, canAction } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";

export default Vue.extend({
  props: ["items", "pageCount", "count", "pageSize"],
  components: {
    BaseTablePermission,
    BasePopupMessage
  },

  data() {
    return {
      imgtext: IMText,
      fields: [
        {
          key: "branchNumber",
          slot: "HEAD_branchNumber",
          label: IMText.general.sshi0021.branchNumber,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "branchName",
          slot: "HEAD_branchName",
          label: IMText.general.sshi0021.branchName,
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
          isAsc: true
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
      tableId: "sshi0004-table",
      position: 4,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      customerBranch: CustomerBranch,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup)
    };
  },

  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0005);
    if (canAction(Action.Update, Screen.SSHI0004)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0004)) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0004)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    onPicker(data) {
      this.customerBranch = data.item;
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
      this.$emit("onUpdate", data.item.branchCode);
    },

    onSelect(data) {
      this.unSetDataErr();
      this.$emit("onUpdate", data.item.branchCode);
    },

    onDelete() {
      this.$emit("onDelete", this.customerBranch);
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
      this.$store.dispatch('notificationModule/setDataError', null);
    }

  },

  computed: {
    dataTable() {
      return this.items;
    }
  }
});
</script>

<style>
</style>
