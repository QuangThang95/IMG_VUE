<template>
  <div>
    <b-row>
      <b-col>
        <BaseAttachmentsTab
          :dataTable="dataTable"
          :tableId="tableId"
          :position="position"
          :permissionGroup="permissionFile"
          @onPicker="onPicker"
          @onSelect="onSelect"
          @uploadFile="uploadFile"
          :pageCount="pageCount"
          :count="count"
          :pageSize="pageSize"
          @getCurrentPage="getCurrentPage"
          @closeSort="closeSort"
          @onSorting="onSorting"
          @getPageSize="getPageSize"
        ></BaseAttachmentsTab>
      </b-col>
    </b-row>
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="deleteFile"
    />
  </div>
</template>

<script>
import BaseAttachmentsTab from "@/components/BaseAttachmentsTab.vue";
import IMText from "@/data/img-text.json";
import FormatData from "@/shared/FomatData";
import { mapGetters } from "vuex";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import { canAction } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import BasePopupMessage from "@/components/BasePopupMessage.vue";

export default {
  props: ["dataTable", "isReadOnly", "permissionGroup", "pageCount", "count", "pageSize"],
  components: {
    BaseAttachmentsTab,
    BasePopupMessage
  },
  data() {
    return {
      imgText: IMText,
      tableId: "AttachmentsTabSupplier",
      position: -1,
      supplierFile: [],
      dataFile: {},
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      permissionFile: lodash.cloneDeep(AppConfig.PermissionGroup)
    };
  },
  created() {
    const permission = { ...this.permissionGroup };
    if (permission.Update) {
      this.permissionFile.Create = true;
      this.permissionFile.Update = true;
      this.permissionFile.Read = true;
      this.permissionFile.Delete = true;
    }
  },
  methods: {
    uploadFile(files, data) {
      this.$emit("uploadFile", files, data);
    },

    onPicker(data) {
      this.dataFile = data;
      this.titlePopupCustom = this.imgText.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgText.popup.confirmMsgDelete.formatText(
        this.imgText.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    deleteFile() {
      this.$emit("deleteFile", this.dataFile.item);
      this.$refs["modal-confirm"].hideModal();
    },

    onSelect(data) {
      this.$emit("dowloadFile", data.item);
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
  watch: {},
  computed: {}
};
</script>
