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
        <div v-if="dataTable && dataTable.length > 0">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields="fields"
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
            @orderByFactoryDown="orderByFactoryDown"
            @orderByFactoryUp="orderByFactoryUp"
          ></BaseTablePermission>
        </div>

        <BasePopupMessage
          ref="modal-confirm"
          :title="titlePopupCustom"
          :sizePopup="sizePopup"
          :message="msgPopup"
          @isOK="onDelete"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import FormatData from "@/shared/FomatData";
import moment from "moment";
import { Factory } from "@/models/factory.model";
import util from "@/shared/utilities";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { MasterProperty } from "@/shared/MasterProperty";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import { mapGetters } from "vuex";
import IMText from "@/data/img-text";
import { common, canAction } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
export default Vue.extend({
  props: ["dataTable", "pageSize", "pageCount", "count"],
  components: {
    BaseTablePermission,
    BasePopupMessage
  },
  data() {
    return {
      imgtext: IMText,
      fields: [
        {
          key: "factoryNumber",
          slot: "HEAD_factoryNumber",
          label: "事業場番号",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "factoryName",
          slot: "HEAD_factoryName",
          label: "事業場名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "factoryClassText",
          slot: "HEAD_factoryClassText",
          label: "事業場区分",
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
          tdClass: "classButton"
        }
      ],
      tableId: "sshi0001-table",
      factory: Factory,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      position: 5,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup)
    };
  },
  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0016);
    if (canAction(Action.Update, Screen.SSHI0016)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0016)) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0016)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },
  methods: {
    onPicker(data) {
      this.factory = data;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      this.$emit("onDelete", this.factory);
      this.$refs["modal-confirm"].hideModal();
    },

    onUpdate(data) {
      this.unSetDataErr();
      this.$emit("onUpdate", data);
    },

    onSelect(data) {
      this.unSetDataErr();
      this.$emit("onUpdate", data);
    },

    onAdd() {
      this.unSetDataErr();
      this.$emit("onAdd");
    },
    getData() {
      return this.items;
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

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    orderByFactoryDown(data) {
      this.$emit("orderByFactoryDown", data);
    },

    orderByFactoryUp(data) {
      this.$emit("orderByFactoryUp", data);
    },

    unSetDataErr() {
      this.$store.dispatch('notificationModule/setDataError', null);
    }
  }
});
</script>
