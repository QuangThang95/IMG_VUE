<template>
  <div>
    <b-modal size="huge" :class="popupClass" :id="popupId" hide-header hide-footer centered>
      <template slot="default">
        <BaseMessageError :title="title" :message="message" />
        <SupplierTransporterFormPopupFactory
          ref="supplierTransporterFormPopupFactory"
          :item="supplier"
          :dataSupplier="dataSupplier"
          :imgStatus="imgStatus"
          :datadropGeneralTab1="datadropGeneralTab1"
          @onSearchAddress="onSearchAddress"
          :isReadOnly="permissionGroup.Read"
        />
        <div class="grid-screen" v-if="imgStatus">
          <b-tabs content-class="mt-3">
            <b-tab disabled></b-tab>
            <b-tab title="取引先データ">
              <BaseAttachmentsTab
                :dataTable="dataTable"
                :tableId="tableId"
                :position="position"
                :permissionGroup="permissionFile"
                @uploadFile="uploadFile"
                @onPicker="onPicker"
                @onSelect="dowloadFile"
                :count="pagingAttachSupplierPopupFile.count"
                :pageCount="pagingAttachSupplierPopupFile.pageCount"
                :pageSize="pageSizeAttachSupplierPopupFile"
                @getCurrentPage="getCurrentPage"
                @getPageSize="getPageSize"
              ></BaseAttachmentsTab>
            </b-tab>
          </b-tabs>
        </div>

        <BaseButtonGroupPermission
          :isPopup="isPopup"
          :imgStatus="imgStatus"
          @onAddUpdate="onAddUpdate"
          @onBack="onBack"
          :isReadOnly="isReadOnly"
        />
        <BasePopupMessage
          ref="modal-confirm"
          :title="titlePopupCustom"
          :sizePopup="sizePopup"
          :message="msgPopup"
          @isOK="deleteFile"
        />
      </template>
    </b-modal>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import SupplierTransporterFormPopupFactory from "../supplier-transporter-form/supplier-transporter-form-popup-factory";
import BaseAttachmentsTab from "@/components/BaseAttachmentsTab.vue";
import BaseMessageError from "@/components/BaseMessageError";
import CountCharacter from "@/shared/CountCharacter";
import { Message } from "@/constants/Message";
import FormatData from "@/shared/FomatData";
import { mapGetters } from "vuex";
import { HttpStatus } from "@/constants/HttpStatus";
import { isNullOrEmpty, current } from "@/shared/utilities";
import IMText from "@/data/img-text";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import BaseProcessing from "@/components/BaseProcessing";
import FileSaver from "file-saver";

export default {
  props: [
    "imgStatus",
    "item",
    "dataSupplier",
    "datadropGeneralTab1",
    "dataTable",
    "permissionGroup",
    "isReadOnly",
    "pagingAttachSupplierPopupFile",
    "pageSizeAttachSupplierPopupFile"
  ],
  components: {
    BaseMessageError,
    BaseButtonGroupPermission,
    BaseAttachmentsTab,
    SupplierTransporterFormPopupFactory,
    BasePopupMessage,
    BaseProcessing
  },
  data() {
    return {
      imgText: IMText,
      isPopup: true,
      popupId: "sshi0012-popup-factory",
      popupClass: "sshi0012-popup-factory-class",
      tableId: "sshi0012-popup-01",
      title: IMText.title.sshi0012Popup01Add,
      message: [],

      position: -1,
      permissionFile: lodash.cloneDeep(AppConfig.PermissionGroup),
      currentCustomerCode: current.customer().customerCode,
      dataFile: {},
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      fileName: "",
      openDl: false
    };
  },

  created() {
    this.onChangeStatus();
    const permission = { ...this.permissionGroup };
    if (permission.Update) {
      this.permissionFile.Create = true;
      this.permissionFile.Update = true;
      this.permissionFile.Read = true;
      this.permissionFile.Delete = true;
    }
  },

  methods: {
    onAddUpdate() {
      this.message = [];
      this.onValidate(this.supplier);
      if (!this.message.length) {
        this.supplier.customerCode = this.dataSupplier.customerCode;
        this.supplier.supplierCode = this.dataSupplier.supplierCode;
        this.imgStatus
          ? this.onUpdate(this.supplier)
          : this.onAdd(this.supplier);
      }
    },
    onAdd(newFactoryAdd) {
      this.openDl = true;
      delete newFactoryAdd.factoryCode;
      delete newFactoryAdd.lastUpdate;
      this.$store
        .dispatch("factoryModule/addFactory", newFactoryAdd)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$emit("loadList");
            this.onBack();
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        })
        .finally(() => {
          this.openDl = false;
        });
    },
    onUpdate(newFactoryAdd) {
      this.openDl = true;
      this.$store
        .dispatch("factoryModule/updateFactory", newFactoryAdd)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$emit("loadList");
            this.onBack();
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onValidate(supplier) {
      // Check IsJWZH
      if (
        !isNullOrEmpty(supplier.factoryNumber) &&
        !CountCharacter.isJWZH(supplier.factoryNumber)
      ) {
        this.message.push(Message.E00028.formatText("積替保管施設番号"));
      }
      // Factory Name
      // Check IsJWZH
      if (isNullOrEmpty(supplier.factoryName)) {
        this.message.push(Message.E00023.formatText("積替保管施設名"));
      } else if (!CountCharacter.isJWZH(supplier.factoryName)) {
        this.message.push(Message.E00028.formatText("積替保管施設名"));
      }

      // Customer Kana
      if (
        !isNullOrEmpty(supplier.factoryKana) &&
        !CountCharacter.isKatakanaHasSpace(supplier.factoryKana)
      ) {
        this.message.push(Message.E00028.formatText("積替保管施設名カナ"));
      }

      // PostalCode
      // Check IsJWZ
      if (
        !isNullOrEmpty(supplier.postalCode) &&
        !CountCharacter.isPostalCode(supplier.postalCode) &&
        !CountCharacter.isJWZ(supplier.postalCode)
      ) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }

      // Address1
      if (
        !isNullOrEmpty(supplier.address1) &&
        !CountCharacter.isFullSize(supplier.address1) &&
        !CountCharacter.isJWZ(supplier.address1)
      ) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // Address2
      if (
        !isNullOrEmpty(supplier.address2) &&
        !CountCharacter.isFullSize(supplier.address2) &&
        !CountCharacter.isJWZ(supplier.address2)
      ) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // Address3
      if (
        !isNullOrEmpty(supplier.address3) &&
        !CountCharacter.isFullSize(supplier.address3) &&
        !CountCharacter.isJWZ(supplier.address3)
      ) {
        this.message.push(Message.E00013.formatText("町域"));
      }

      // Address4
      if (
        !isNullOrEmpty(supplier.address4) &&
        !CountCharacter.isJWZH(supplier.address4)
      ) {
        this.message.push(Message.E00015.formatText("番地・建物名"));
      }

      // Jwnet Number
      if (isNullOrEmpty(supplier.jwnetNumber)) {
        this.message.push(Message.E00023.formatText("JWNET事業場コード"));
      } else if (!CountCharacter.isJWH(supplier.jwnetNumber)) {
        this.message.push(Message.E00013.formatText("JWNET事業場コード"));
      }
    },
    onBack() {
      this.message = [];
      this.$emit("onChangeStatus", false);
      this.$bvModal.hide(this.popupId);
    },

    onChangeStatus() {
      this.message = [];
      if (this.imgStatus) {
        this.title = this.imgText.title.sshi0012Popup01Update;
      } else {
        this.title = this.imgText.title.sshi0012Popup01Add;
      }
    },

    async onSearchAddress(postalCode) {
      if (!isNullOrEmpty(postalCode)) {
        this.message = [];
        if (!CountCharacter.isPostalCode(postalCode)) {
          this.message.push(Message.E00028.formatText("郵便番号"));
        } else {
          await this.$store.dispatch(
            "addressModule/getByPostalCode",
            postalCode
          );
        }
      }
    },

    uploadFile(files, data) {
      let formData = new FormData();
      if (!data) {
        files.forEach(item => {
          formData.append("files", item);
        });
      } else {
        files.forEach(item => {
          formData.append("file", item);
        });
      }

      this.supplierCode = +this.$route.params.supplierCode;
      const params = {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode,
        form: formData,
        dataAttactFile: data
      };
      if (!data) {
        this.$store
          .dispatch("attackModule/uploadFileSupplierTransporterPopup", params)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$emit("getAttachSupplierFileTransporter", response.data[0]);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      } else {
        this.$store
          .dispatch("attackModule/updateAttackSupplierTransporterPopup", params)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$emit("getAttachSupplierFileTransporter", response.data);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      }
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

    deleteFile(params) {
      params = this.dataFile.item;
      this.$store
        .dispatch(
          "attackModule/deleteAttackSupplierTransporterPopup",
          params.fileCode
        )
        .then(response => {
          this.$emit("getAttachSupplierFileTransporter", response.data);
        });
      this.$refs["modal-confirm"].hideModal();
    },

    dowloadFile(params) {
      this.openDl = true;
      this.fileName = params.item.logicalFileName;
      this.$store
        .dispatch(
          "attackModule/downloadFileSupplierTransporterPopup",
          params.item.fileCode
        )
        .then(response => {
          if (response.status === HttpStatus.OK) {
            FileSaver.saveAs(response.data, this.fileName);
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    }
  },
  computed: {
    supplier() {
      return this.item;
    },

    ...mapGetters({
      address: "addressModule/getByPostalCode"
    })
  },
  watch: {
    imgStatus() {
      this.onChangeStatus();
    },

    address() {
      if (!this.address) {
        this.message.push(Message.E00029);
      } else {
        this.message = [];
        this.supplier.address1 = this.address.address1;
        this.supplier.address2 = this.address.address2;
        this.supplier.address3 = this.address.address3;
        this.supplier.address4 = this.address.address4;
      }
    }
  }
};
</script>
