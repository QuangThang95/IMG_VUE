<template>
  <div>
    <b-row>
      <b-col>
        <b-button
          v-if="!readOnly"
          class="float-right btn-form mb-2"
          size="sm"
          :disabled="!enableAdd"
          @click="onAdd"
        >{{ imgText.general.btnAdd }}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable && dataTable.length">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields="fields"
            :tableId="tableId"
            :isShowPagging="false"
            :permissionGroup="permissionGroup"
            @onSelect="onSelect"
            @onUpdate="onUpdate"
            @onDelete="onDelete"
            @onPicker="onPicker"
          />
        </div>
      </b-col>
    </b-row>

    <!-- <CustomerBranchPopup :imgStatus="imgStatus" :popupId="popupId" /> -->

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
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import FormatData from "@/shared/FomatData";
import BasePopupMessage from "@/components/BasePopupMessage";
import IMText from "@/data/img-text.json";
import moment from "moment";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import { current, canAction, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
export default {
  props: ["imgStatus", "readOnly", "branchCode", "dataTable", "enableAdd"],
  components: {
    BaseTablePermission,
    BasePopupMessage
  },

  data() {
    return {
      imgText: IMText,
      fields: [
        {
          key: "sectionNumber",
          slot: "HEAD_sectionNumber",
          label: "区間",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "contractDate",
          slot: "HEAD_contractDate",
          label: "契約年月日",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "contractLimit",
          slot: "HEAD_contractLimit",
          label: "契約有効年月日",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "transportName",
          slot: "HEAD_transportName",
          label: "収集運搬業者",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "transportWay",
          slot: "HEAD_transportWay",
          label: "運搬方法",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "destinationName",
          slot: "HEAD_destinationName",
          label: "運搬先業者",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "factoryName",
          slot: "HEAD_factoryName",
          label: "運搬先業者事業場",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "disposeWay",
          slot: "HEAD_disposeWay",
          label: "処分方法",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "lastUpdate",
          slot: "HEAD_lastUpdate",
          label: "最終変更日時",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        }
      ],
      tableId: "sshi0006-tab1-table",
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      factory: {},
      popupId: "sshi0028-tab1-popup",
      currentCustomer: current.customer(),
      contractPart: {},
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
    };
  },

  async created() {

    let count = 0;
    if (canAction(Action.Update, Screen.SSHI0026)) {
      this.permissionGroup.Create = true;
      this.permissionGroup.Update = true;
      this.permissionGroup.Delete = true;
      count = 2;
    } else if (canAction(Action.Read, Screen.SSHI0026)) {
      this.permissionGroup.Read = true;
      count++;
    }
   
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    onAdd() {
      this.$emit("onAddContractPart");
    },

    onUpdate(data) {
      this.$emit("onUpdateContractPart", data.item);
    },

    onSelect(data) {
      this.$emit("onSelectContractPart", data.item);
    },

    onDelete() {
      this.$emit("onDeleteContractPart", this.contractPart);
      this.$refs["modal-confirm"].hideModal();
    },

    onPicker(data) {
      this.contractPart = data.item;
      this.titlePopupCustom = this.imgText.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgText.popup.confirmMsgDelete.formatText(
        this.imgText.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    }
  }
};
</script>

