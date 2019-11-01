<template>
  <div>
    <b-row>
      <b-col>
        <div>
        <BaseAttachmentsTab
          :dataTable="dataTable"
          :tableId="tableId"
          :position="position"
          :permissionGroup="permissionFile"
          @onPicker="onPicker"
          @onSelect="onSelect"
          @uploadFile="uploadFile"
          @getCurrentPage="getCurrentPage"
          @getPageSize="getPageSize"
          :count="countTab3"
          :pageCount="pageCountTab3"
          :pageSize="pageSizeTab3"
        ></BaseAttachmentsTab>
        </div>
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
  props: ["dataTable", "isReadOnly", "permissionGroup", "pageCountTab3", "countTab3" ,"pageSizeTab3"],
  components: {
    BaseAttachmentsTab,
    BasePopupMessage
  },
  data() {
    return {
      imgText: IMText,
      tableId: "AttachmentsTabFactory",
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

    getPageSize(data) {
      this.$emit("getPageSizeTab3", data);
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPageTab3", data);
    },
  },
  watch: {},
  computed: {}
};
</script>
