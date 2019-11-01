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
    <b-row v-if="dataTable && dataTable.length">
      <b-col>
        <BaseTablePermission
          :dataTable="dataTable"
          :fields="fields"
          :tableId="tableId"
          :position="position"
          :permissionGroup="permissionGroup"
          :class="classByWaste"
          :isContractScreen="true"
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
import IMText from "@/data/img-text.json";
import { canAction, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import moment from "moment";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
export default {
  components: {
    BaseTablePermission,
    BasePopupMessage
  },
  props: ["dataTable", "classByWaste", "pageCount", "count", "pageSize"],
  data() {
    return {
      fields: [
        {
          key: "contractName",
          slot: "HEAD_contractName",
          label: "契約名",
          stickyColumn: true,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName1",
          slot: "HEAD_supplierName1",
          label: "収集運搬業者1",
          stickyColumn: true,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierFactoryName1",
          slot: "HEAD_supplierFactoryName1",
          label: "運搬先1",
          stickyColumn: true,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName2",
          slot: "HEAD_supplierName2",
          label: "収集運搬業者2",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierFactoryName2",
          slot: "HEAD_supplierFactoryName2",
          label: "運搬先2",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName3",
          slot: "HEAD_supplierName3",
          label: "収集運搬業者3",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierFactoryName3",
          slot: "HEAD_supplierFactoryName3",
          label: "運搬先3",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName4",
          slot: "HEAD_supplierName4",
          label: "収集運搬業者4",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierFactoryName4",
          slot: "HEAD_supplierFactoryName4",
          label: "運搬先4",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName5",
          slot: "HEAD_supplierName5",
          label: "収集運搬業者5",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierFactoryName5",
          slot: "HEAD_supplierFactoryName5",
          label: "運搬先5",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "displayOrder",
          label: "表示順",
          tdClass: "classButton"
        }
      ],
      imgtext: IMText,
      position: 11,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      tableId: "sshi0026-table",
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      contractDelete: null
    };
  },
  async created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0026);
    if (canAction(Action.Update, Screen.SSHI0026)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0026)) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0026)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },
  methods: {
    onAdd() {
      this.$emit("onAdd");
    },

    onUpdate(data) {
      this.$emit("onUpdate", data.item);
    },

    onPicker(data) {
      this.contractDelete = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onSelect(data) {
      this.$emit("onSelect", data.item);
    },

    onDelete(data) {
      this.$emit("onDelete", this.contractDelete);
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
  }
};
</script>
