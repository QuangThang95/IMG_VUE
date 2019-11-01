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
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
            @orderByUp="orderByUp"
            @orderByDown="orderByDown"
            @closeSort="closeSort"
            @onSorting="onSorting"
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
import Vue from "vue";
import { CustomerService } from "@/services/customer.service";
import { Customer } from "@/models/customer.model";
import BaseTable from "@/components/BaseTable.vue";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { MasterProperty } from "@/shared/MasterProperty";
import { mapActions } from "vuex";
import FormatData from "@/shared/FomatData";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import IMText from "@/data/img-text";
import { current } from "@/shared/utilities";
import { canAction, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
export default {
  props: ["onAdd", "dataTable", "pageCount", "count", "pageSize"],
  components: {
    BaseTable,
    BasePopupMessage,
    BaseTablePermission
  },
  data() {
    return {
      imgtext: IMText,
      isVisible: true,
      fields: [
        {
          key: "groupName",
          slot: "HEAD_groupName",
          label: "グループ名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "memo",
          slot: "HEAD_memo",
          label: "備考",
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
          slot: "HEAD_lastUpdate",
          formatter: value => {
            return FormatData.displayDate(value);
          },
          isSortable: true,
          isDesc: true,
          isAsc: true
        }
      ],
      tableId: "sshi0003-table",
      customer: Customer,
      position: 2,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      currentCustomerCode: current.customer().customerCode,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup)
    };
  },
  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0008);
    if (canAction(Action.Update, Screen.SSHI0007)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0007)) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0007)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    onPicker(data) {
      this.customer = data;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      const data = {
        GroupCode: this.customer.item.groupCode,
        LastUpdate: this.customer.item.lastUpdate
      };
      this.$emit("onDelete", data);
      this.$refs["modal-confirm"].hideModal();
    },

    closeSort(data) {
      this.$emit("closeSort", data);
    },
    onSorting(data, ischeck) {
      this.$emit("onSorting", data, ischeck);
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

    onUpdate(data) {
      this.$router.push({
        path: MasterProperty.FSHI0003.SSHI0009.Path,
        name: MasterProperty.FSHI0003.SSHI0009.Name,
        params: {
          groupCode: data.item.groupCode
        }
      });
    },
    onSelect(data) {
      this.$router.push({
        path: MasterProperty.FSHI0003.SSHI0009.Path,
        name: MasterProperty.FSHI0003.SSHI0009.Name,
        params: {
          groupCode: data.item.groupCode
        }
      });
    },

    getCustomerGroup(customerCode) {
      this.$store.dispatch(
        "customerGroupModule/getCustomerGroup",
        customerCode
      );
    }
  }
};
</script>
