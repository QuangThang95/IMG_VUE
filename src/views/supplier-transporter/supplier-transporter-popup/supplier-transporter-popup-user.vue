<template>
  <div>
    <b-modal size="xl" :class="popupClass" :id="popupId" hide-header hide-footer centered>
      <template slot="default">
        <BaseMessageError :title="title" :message="message" />
        <FormPopupUser
          ref="formPopupUser"
          :dataSupplier="dataSupplier"
          :item="supplierUser"
          :imgStatus="imgStatus"
          :isReadOnly="isReadOnly"
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
import FormPopupUser from "../supplier-transporter-form/supplier-transporter-form-popup-user";
import BaseMessageError from "@/components/BaseMessageError";
import { Message } from "@/constants/Message";
import FormatData from "@/shared/FomatData";
import { isNullOrEmpty, isNullOrUndefined } from "@/shared/utilities";
import CountCharacter from "@/shared/CountCharacter";
import { current } from "@/shared/utilities";
import IMText from "@/data/img-text";
import HttpStatus from "http-status-codes";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  props: ["imgStatus", "item", "dataSupplier", "isReadOnly"],
  components: {
    BaseMessageError,
    BaseButtonGroupPermission,
    FormPopupUser,
    BaseProcessing
  },
  data() {
    return {
      imgText: IMText,
      isPopup: true,
      popupId: "sshi0012-popup-user",
      popupClass: "sshi0012-popup-user-class",
      title: IMText.title.sshi0012Popup03Add,
      supplier: {
        customerCode: "",
        supplierCode: "",
        supplierNumber: "",
        supplierName: "",
        supplierKana: "",
        reportFlag: false,
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address: "",
        tel: "",
        fax: "",
        jwnetNumber: "",
        jwnetPassword: "",
        displayOrder: "",
        memo: "",
        deleteFlag: "",
        createDate: "",
        lastUpdate: ""
      },
      message: [],
      openDl: false
    };
  },

  created() {
    this.onChangeStatus();
  },

  methods: {
    onAddUpdate() {
      this.message = [];
      this.onValidate(this.supplierUser);
      this.supplierUser.supplierCode = this.dataSupplier.supplierCode;
      this.supplierUser.customerCode = current.customer().customerCode;
      this.supplierUser.usertypeCode = 4;
      if (!this.message.length) {
        this.openDl = true;
        this.imgStatus
          ? this.onUpdate(this.supplierUser)
          : this.onAdd(this.supplierUser);
      }
    },
    onUpdate(data) {
      this.$store
        .dispatch("supplierHandleModule/updateSupplierUser", data)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$emit("loadList");
            this.onBack();
          }
        })
        .catch(error => {
          if (error.status === HttpStatus.BAD_REQUEST && error.data)
            if (error.data.ErrorCode === 400032) {
              this.message.push(Message.E00032);
            }
          if (error.data.MsgCode === "E00040") {
            this.message.push(Message.E00040);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },
    onAdd(data) {
      this.$store
        .dispatch("supplierHandleModule/createSupplierUser", data)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$emit("loadList");
            this.onBack();
          }
        })
        .catch(error => {
          if (error.status === HttpStatus.BAD_REQUEST && error.data)
            if (error.data.ErrorCode === 400032) {
              this.message.push(Message.E00032);
            }
          if (error.data.MsgCode === "E00040") {
            this.message.push(Message.E00040);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },
    onValidate(supplierUser) {
      // User Name
      // Check IsJWZH
      if (isNullOrEmpty(supplierUser.userName)) {
        this.message.push(Message.E00023.formatText("担当者名"));
      } else if (!CountCharacter.isJWZH(supplierUser.userName)) {
        this.message.push(Message.E00028.formatText("担当者名"));
      }

      // User Kana
      if (
        !isNullOrUndefined(supplierUser.userKana) &&
        !CountCharacter.isKatakanaHasSpace(supplierUser.userKana)
      ) {
        this.message.push(Message.E00028.formatText("担当者名カナ"));
      }

      // TEL
      if (
        !isNullOrEmpty(supplierUser.tel) &&
        !CountCharacter.isTelNumber(supplierUser.tel)
      ) {
        this.message.push(Message.E00023.formatText("TEL"));
      }

      // EMAIL
      if (
        !isNullOrEmpty(supplierUser.email) &&
        !CountCharacter.isEmail(supplierUser.email)
      ) {
        this.message.push(Message.E00023.formatText("メール"));
      }
    },
    onBack() {
      this.$emit("onChangeStatus", false);
      this.$bvModal.hide(this.popupId);
    },
    onChangeStatus() {
      this.message = [];
      if (this.imgStatus) {
        this.title = this.imgText.title.sshi0012Popup03Update;
      } else {
        this.title = this.imgText.title.sshi0012Popup03Add;
      }
    }
  },

  watch: {
    imgStatus() {
      this.onChangeStatus();
    }
  },
  computed: {
    supplierUser() {
      return { ...this.item };
    }
  }
};
</script>
