<template>
  <div>
    <b-row>
      <b-col>
        <b-button
          class="float-right btn-form mb-2"
          size="sm"
          v-if="search.key1"
          @click="onAdd"
        >{{ imgtext.general.btnAdd }}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable.length && search.key1">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields.sync="fields"
            :tableId="tableId"
            :pageSize="pageSize"
            :pageCount="pageCount"
            :count="count"
            :permissionGroup="permissionGroup"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            @closeSort="closeSort"
            @onSorting="onSorting"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
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
import BaseTable from "@/components/BaseTable.vue";
import FormatData from "@/shared/FomatData";
import { isNullOrUndefined, common, canAction } from "@/shared/utilities";
import moment from "moment";
import { MasterProperty } from "@/shared/MasterProperty";
import IMText from "@/data/img-text";
import { mapGetters } from "vuex";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import { Screen, Action } from "@/constants/Screen";
export default Vue.extend({
  props: ["onAdd", "generals", "search", "pageCount", "count", "pageSize"],
  components: {
    BaseTable,
    BasePopupMessage,
    BaseTablePermission
  },

  data() {
    return {
      imgtext: IMText,
      fields: [
        {
          key: "key2Desc",
          slot: "HEAD_key2Desc",
          label: IMText.general.fshi0008.key2Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "key3Desc",
          slot: "HEAD_key3Desc",
          label: IMText.general.fshi0008.key3Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "key4Desc",
          slot: "HEAD_key4Desc",
          label: IMText.general.fshi0008.key4Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "key5Desc",
          slot: "HEAD_key5Desc",
          label: IMText.general.fshi0008.key5Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "key6Desc",
          slot: "HEAD_key6Desc",
          label: IMText.general.fshi0008.key6Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data1Desc",
          slot: "HEAD_data1Desc",
          label: IMText.general.fshi0008.data1Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data2Desc",
          slot: "HEAD_data2Desc",
          label: IMText.general.fshi0008.data2Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data3Desc",
          slot: "HEAD_data3Desc",
          label: IMText.general.fshi0008.data3Desc,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classButton"
        }
      ],
      tableId: "user-table",
      position: 4,
      dataButton: [
        {
          id: 1,
          label: IMText.general.btnUpdate,
          class: "btn-form btn-arrow-left pl-2 pr-2"
        },
        {
          id: 3,
          label: IMText.general.btnDelete,
          class: "btn-form btn-arrow-right pl-2 pr-2"
        }
      ],
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      generalItem: {},
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
    };
  },
  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0022);
    if (canAction(Action.Update, Screen.SSHI0022)) {
      this.permissionGroup.Update = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0022)) {
      this.permissionGroup.Delete = true;
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },
  methods: {
    onPicker(data) {
      this.generalItem = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      this.$emit("onDelete", this.generalItem);
      this.$refs["modal-confirm"].hideModal();
    },

    onUpdate(data) {
      this.$router.push({
        path: MasterProperty.FSHI0008.SSHI0024.Path,
        name: MasterProperty.FSHI0008.SSHI0024.Name,
        params: { recordId: data.item.recordId, key1: data.item.key1 }
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
    }
  },

  computed: {
    dataTable() {
      return this.generals;
    }
  }
});
</script>

<style>
</style>
