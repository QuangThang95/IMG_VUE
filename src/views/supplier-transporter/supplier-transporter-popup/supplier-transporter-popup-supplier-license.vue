<template>
  <div>
    <b-modal size="xl" :class="popupClass" :id="id" hide-header hide-footer centered>
      <template slot="default">
        <BaseMessageError :title="title" :message="message" />
        <FormPopupSupplierLicense
          ref="formPopupSupplierLicense"
          :item="supplierLicense"
          :imgStatus="imgStatus"
          :options="dataDropbox"
          :supplierData="{...supplierData}"
          :dataSource4="dataSource4"
          @onError="onError"
          @resetMessage="resetMessage"
          :isReadOnly="isReadOnly"
          :dataSelected="dataSelected"
          @formData="formData"
        />
        <BaseButtonGroupPermission
          :isPopup="isPopup"
          :imgStatus="imgStatus"
          @onAddUpdate="onAddUpdate"
          @onBack="onBack"
          :isReadOnly="isReadOnly"
        />
      </template>
    </b-modal>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import FormPopupSupplierLicense from "../supplier-transporter-form/supplier-transporter-form-popup-supplier-license";
import BaseMessageError from "@/components/BaseMessageError";
import IMText from "@/data/img-text";
import { common } from "@/shared/utilities";
import moment from "moment";
import { Message } from "@/constants/Message";
import DateTimeFormat from "@/constants/DateTimeFormat";
import { isNullOrEmpty, isNullOrUndefined } from "@/shared/utilities";
import { mapGetters } from "vuex";
import { canAction, handleOutput } from "@/shared/utilities";
import BaseProcessing from "@/components/BaseProcessing";
import CountCharacter from "@/shared/CountCharacter";

export default {
  props: [
    "imgStatus",
    "item",
    "dataDropbox",
    "id",
    "dataSource4",
    "dataSupplier",
    "isReadOnly",
    "dataTypeNum"
  ],
  components: {
    BaseMessageError,
    BaseButtonGroupPermission,
    FormPopupSupplierLicense,
    BaseProcessing
  },
  data() {
    return {
      imgText: IMText,
      isPopup: true,
      popupClass: "sshi0012-popup-supplier-license-class",
      tableId: "sshi0012-popup-01",
      title: IMText.title.sshi0012Popup02Add,
      message: [],
      dataSelected: "",
      openDl: false,
      form: new FormData
    };
  },

  methods: {
    onAddUpdate() {
      this.message = [];
      const item = {...this.supplierLicense}
      this.onValidate(item);
      if (!this.message.length) {
        item.licenseNumber = item.licenseNumberString;
        item.licenseDate = +moment(item.licenseDate).format(DateTimeFormat.DATE_PARAMS);
        item.licenseLimit = +moment(item.licenseLimit).format(DateTimeFormat.DATE_PARAMS);
        item.rowNumber = item.rowNumber ? item.rowNumber : "";
        const dataChange = new FormData();
        dataChange.append("customerCode" , this.supplierData.customerCode);
        dataChange.append("supplierCode" , this.supplierData.supplierCode);
        dataChange.append("licenseClass" , item.licenseClass);
        dataChange.append("licenseDate" , item.licenseDate);
        dataChange.append("licenseLimit", item.licenseLimit) ;
        dataChange.append("licenseNumber" , item.licenseNumber);
        dataChange.append("licensePref" , item.licensePref);
        dataChange.append("memo" , item.memo);
        dataChange.append("path" , item.path);
        dataChange.append("form" , this.form);
        if (this.imgStatus) {
          dataChange.append("createDate",item.createDate);
          dataChange.append("lastUpdate",item.lastUpdate);
          dataChange.append("rowNumber" , item.rowNumber);
        }
        this.imgStatus ? this.onUpdate(dataChange) : this.onAdd(dataChange);
      }
    },

    onUpdate(dataChange) {
      this.openDl = true;
      dataChange.lastUpdate = this.supplierLicense.lastUpdate;
      dataChange.rowNumber = this.supplierLicense.rowNumber;
      this.$store
        .dispatch("supplierLicenseModule/updateSupplierLicense", dataChange)
        .then(() => {
          this.onBack();
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        }).finally(() => {
          this.openDl = false;
        });
    },
    onAdd(dataChange) {
      this.openDl = true;
      this.$store
        .dispatch("supplierLicenseModule/addSupplierLicense", dataChange)
        .then(() => {
          this.onBack();
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        }).finally(() => {
          this.openDl = false;
        });
    },
    onValidate(supplier) {
      if (
        supplier.licenseClass !==
        this.dataDropbox.find(x => x.text === "一般廃棄物収集運搬業").value
      ) {
        // W.I.P check licenseClass
        if (isNullOrEmpty(supplier.licenseClass)) {
          this.message.push(Message.E00023.formatText("許可区分"));
        }
        if (isNullOrEmpty(supplier.licenseNumberString)) {
          this.message.push(Message.E00023.formatText("許可番号"));
        } else {
          if (Number.isNaN(Number(supplier.licenseNumberString))) {
            this.message.push(Message.E00010.formatText("許可番号"));
          } else {
            if (supplier.licenseNumberString.length !== 11) {
              this.message.push(Message.E00035);
            } else {
              let typeNumber =  supplier.licenseNumberString.substring(3, 4);
              let item = this.dataTypeNum.find(x => x.key3 === String(supplier.licenseClass) && x.key2 === String(typeNumber));
              if (isNullOrUndefined(item)) {
                this.message.push(Message.E00034);
              }
            }
          }
        }
      } else {
        if (isNullOrEmpty(supplier.licenseNumberString)) {
          this.message.push(Message.E00023.formatText("許可番号"));
        } else {
          if (Number.isNaN(Number(supplier.licenseNumberString))) {
            this.message.push(Message.E00010.formatText("許可番号"));
          }
        }
      }

      if (
        isNullOrEmpty(supplier.licenseDate)
      ) {
        this.message.push(Message.E00023.formatText("許可年月日"));
      } else {
        if (!CountCharacter.isDate(supplier.licenseDate)) {
          this.message.push(Message.E00028.formatText("許可年月日"));
        }
      }

      if (
        isNullOrEmpty(supplier.licenseLimit)
      ) {
        this.message.push(Message.E00023.formatText("許可有効年月日"));
      } else {
        if (!CountCharacter.isDate(supplier.licenseLimit)) {
          this.message.push(Message.E00028.formatText("許可有効年月日"));
        }
      }

      if (
        !isNullOrEmpty(supplier.licenseDate) &&
        !isNullOrEmpty(supplier.licenseLimit) &&
        new Date(supplier.licenseDate).getTime() >
          new Date(supplier.licenseLimit).getTime()
      ) {
        this.message.push(Message.E00007);
      }
    },
    onError(message) {
      this.message = [];
      this.message.push(message);
    },
    resetMessage(message) {
      this.message = [];
    },
    formData(itemFormData) {
      this.form = itemFormData
    },
    onBack() {
      this.message = [];
      this.$emit("onChangeStatus", false);
      this.$bvModal.hide(this.id);
    },
    onChangeStatus() {
      if (this.imgStatus) {
        this.title = this.imgText.title.sshi0012Popup02Update;
      } else {
        this.title = this.imgText.title.sshi0012Popup02Add;
      }
    }
  },
  computed: {
    supplierLicense() {
      return this.item;
      
    },
    supplierData() {
      return this.dataSupplier;
    },
    ...mapGetters({
      dataLicense: "supplierLicenseModule/getLicense"
    })
  },
  watch: {
    imgStatus() {
      this.onChangeStatus();
    },
    supplierLicense() {
      if (
        !isNullOrEmpty(this.supplierLicense.licenseClass) &&
        this.dataDropbox.length > 0
      ) {
        this.dataSelected = this.dataDropbox.find(
          x => x.value == this.supplierLicense.licenseClass
        ).text;
      }
    }
  }
};
</script>
