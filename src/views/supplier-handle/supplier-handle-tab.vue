<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab disabled></b-tab>
      <b-tab title="取引先データ" active>
        <AttachmentsTab
          :dataTable="attachSupplierFile"
          :permissionGroup="permissionGroup"
          @uploadFile="uploadFile"
          @deleteFile="deleteFile"
          @dowloadFile="dowloadFile"
          :pageCount="pagingAttachSupplierFile.pageCount"
          :count="pagingAttachSupplierFile.count"
          :pageSize="pageSizeAttachSupplierFile"
          @getCurrentPage="getCurrentPageAttachSupplierFile"
          @getPageSize="getPageSizeAttachSupplierFile"
        ></AttachmentsTab>
      </b-tab>
      <b-tab title="担当者">
        <b-row>
          <b-col v-if="!isReadOnly">
            <b-button class="float-right btn-form mb-2" size="sm" @click="goToPopup">追加</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div v-if="dataUser.length > 0">
              <BaseTablePermission
                :dataTable="dataUser"
                :fields="fields"
                :tableId="tableId"
                :position="position"
                @onUpdate="onUpdate"
                @onPicker="onPicker"
                @onSelect="onSelect"
                :permissionGroup="permissionGroup"
                :pageCount="pageCount"
                :count="count"
                :pageSize="pageSize"
                @getCurrentPage="getCurrentPage"
                @closeSort="closeSort"
                @onSorting="onSorting"
                @getPageSize="getPageSize"
              ></BaseTablePermission>
            </div>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onDelete"
    />
    <sshi0015modal
      ref="modal"
      @onSaveSupplierUser="onSaveSupplierUser"
      @onClosePopUp="onClosePopUp"
      :isUpdate="isUpdate"
      :supplierUser="supplierUser"
      :title="title"
      :supplierName="supplierName"
      :supplierNumber="supplierNumber"
      :isReadOnly="isReadOnly"
    ></sshi0015modal>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import sshi0015modal from "./supplier-handle-master-popup.vue";
import { MasterProperty } from "@/shared/MasterProperty";
import BaseAttachmentsTab from "@/components/BaseAttachmentsTab.vue";
import AttachmentsTab from "./supplier-attachmments-tab.vue";
import FormatData from "@/shared/FomatData";
import { mapGetters } from "vuex";
import IMText from "@/data/img-text";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import { current, handleOutput } from "@/shared/utilities";
import contractGridVue from "../contract/contract-main/contract-grid.vue";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  props: [
    "supplierCode",
    "supplierName",
    "supplierNumber",
    "isReadOnly",
    "permissionGroup",
    "fields",
    "attachSupplierFile",
    "pagingAttachSupplierFile",
    "pageSizeAttachSupplierFile"
  ],

  components: {
    BaseTablePermission,
    sshi0015modal,
    BaseAttachmentsTab,
    BasePopupMessage,
    AttachmentsTab,
    BaseProcessing
  },
  data() {
    return {
      tableId: "sshi0008-table",
      position: -1,
      dataButton: [
        {
          id: 1,
          label: "変更",
          class: "btn-form btn-arrow-left pl-2 pr-2"
        },
        {
          id: 3,
          label: "削除",
          class: "btn-form btn-arrow-right pl-2 pr-2"
        }
      ],
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      imgtext: IMText,
      supplierUser: {
        department: "",
        userName: "",
        userKana: "",
        tel: "",
        email: "",
        memo: ""
      },
      isUpdate: false,
      title: "",
      currentCustomerCode: current.customer().customerCode,
      param: {},
      dataUser: [],
      pageCount: 0,
      count: 0,
      pageSize: 10,
      pages: AppConfig.Pages,
      orderField: "UserCode",
      openDl: false
    };
  },
  created() {
    const supplierCode = +this.$route.params.supplierCode;
    const param = {
      supplierCode: supplierCode | this.supplierCode,
      customerCode: this.currentCustomerCode,
      userTypeCode: 6
    };
    this.param = param;
    AppConfig.Pages.page = 1;
    AppConfig.Pages.descending = true;
    this.orderField = "UserCode";
    const data = { ...this.initParam() };
    this.getAllSupplierUser(data);
  },

  methods: {
    initParam() {
      const param = {
        supplierCode: +this.$route.params.supplierCode | this.supplierCode,
        customerCode: this.currentCustomerCode,
        userTypeCode: 6,
        pageSize: this.pageSize,
        page: AppConfig.Pages.page,
        orderField: this.orderField,
        descending: AppConfig.Pages.descending
      };
      return param;
    },

    goToPopup() {
      this.isUpdate = false;
      this.title = "担当者追加";
      (this.supplierUser = {
        department: "",
        userName: "",
        userKana: "",
        tel: "",
        email: "",
        memo: ""
      }),
        this.$bvModal.show("sshi0015modal");
    },

    onUpdate(data) {
      this.isUpdate = true;
      this.title = "担当者変更";
      const param = {
        userCode: data.item.userCode,
        customerCode: data.item.customerCode
      };
      this.getUserByCode(param);
      this.$bvModal.show("sshi0015modal");
    },

    onClosePopUp() {
      AppConfig.Pages.page = 1;
      AppConfig.Pages.descending = true;
      let param = { ...this.initParam() };
      this.getAllSupplierUser(param);
      this.$bvModal.hide("sshi0015modal");
    },

    onSaveSupplierUser(data) {
      const dataUpdate = {
        ...data,
        ...this.param
      };
      if (this.isUpdate) {
        return this.updateSupplierUser(dataUpdate);
      }
      return this.addSupplierUser(dataUpdate);
    },

    onPicker(data) {
      this.supplierUser = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      const data = {
        userCode: this.supplierUser.userCode,
        lastUpdate: this.supplierUser.lastUpdate
      };
      this.openDl = true;
      this.$store
        .dispatch("supplierHandleModule/deleteSupplierUser", data)
        .then(res => {
          this.onClosePopUp();
        })
        .finally(() => {
          this.openDl = false;
        });
      this.$refs["modal-confirm"].hideModal();
    },

    onSelect(data) {
      this.isUpdate = true;
      this.title = "担当者参照";
      const param = {
        userCode: data.item.userCode,
        customerCode: data.item.customerCode
      };
      this.getUserByCode(param);
      this.$bvModal.show("sshi0015modal");
    },

    getCurrentPage() {
      let param = { ...this.initParam() };
      param.page = this.pages.page;
      this.getAllSupplierUser(param);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.initParam() };
      this.getAllSupplierUser(param);
    },

    onSorting(data, isCheck) {
      this.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParam() };
      this.getAllSupplierUser(param);
    },

    closeSort() {
      AppConfig.Pages.descending = true;
      this.orderField = "UserCode";
      let param = { ...this.initParam() };
      this.getAllSupplierUser(param);
    },

    getAllSupplierUser(param) {
      this.$store
        .dispatch("supplierHandleModule/getAllSupplierUser", param)
        .then(res => {});
    },

    addSupplierUser(param) {
      this.openDl = true;
      this.$store
        .dispatch("supplierHandleModule/createSupplierUser", param)
        .then(res => {
          this.onClosePopUp();
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    getUserByCode(param) {
      this.$store
        .dispatch("supplierHandleModule/getSupplierUserByCode", param)
        .then(res => {
          this.supplierUser = res.data;
        });
    },

    updateSupplierUser(param) {
      this.openDl = true;
      this.$store
        .dispatch("supplierHandleModule/updateSupplierUser", param)
        .then(res => {
          this.onClosePopUp();
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    uploadFile(files, data) {
      this.$emit("uploadFile", files, data);
    },

    deleteFile(data) {
      this.$emit("deleteFile", data);
    },
    dowloadFile(data) {
      this.$emit("dowloadFile", data);
    },

    getCurrentPageAttachSupplierFile(data) {
      this.$emit("getCurrentPageAttachSupplierFile", data);
    },

    getPageSizeAttachSupplierFile(data) {
      this.$emit("getPageSizeAttachSupplierFile", data);
    },
  },

  computed: {
    data() {
      return this.$store.state.supplierHandleModule.allSupplierUser;
    }
  },

  watch: {
    data() {
      this.dataUser = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
    },

    supplierCode() {
      const data = { ...this.initParam() };
      this.getAllSupplierUser(data);
    }
  }
};
</script>
