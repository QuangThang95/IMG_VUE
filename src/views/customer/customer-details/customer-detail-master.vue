<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <div v-if="dataError.length > 0  && dataError[0].notifyClass !== 2">
        <BaseTableError
          :dataTable="dataError"
          :fields.sync="fields"
          :tableId="tableErrorId"
          :groupNotification="groupNotification"
          @onUpdate="onUpdateError"
          @onCancel="onCancelError"
        />
      </div>

      <CustomerDetailForm
        v-if="!isReadOnly"
        ref="customerDetailForm"
        :item="customer"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        @onSearchAddress="onSearchAddress"
      />

      <CustomerDetailFormReadonly v-if="isReadOnly" :item="customer" />

      <BaseButtonGroupPermission
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        @onAddUpdate="onAddUpdate"
        @onBack="onBack"
      />
      <BaseProcessing :openDl="openDl" />
    </b-container>
  </div>
</template>

<script>
import FormatData from "@/shared/FomatData";
import { Customer } from "@/models/customer.model";
import BaseInput from "@/components/BaseInput.vue";
import moment from "moment";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import { MasterProperty } from "@/shared/MasterProperty";
import CustomerDetailForm from "./customer-detail-form";
import CustomerDetailFormReadonly from "./customer-detail-form-readonly";
import IMText from "@/data/img-text.json";
import BaseMessageError from "@/components/BaseMessageError";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BaseProcessing from "@/components/BaseProcessing";
import HttpStatus from "http-status-codes";
import { mapGetters } from "vuex";
import {
  navigation,
  handleOutput,
  canAction,
  isNullOrEmpty,
  current,
  isNullOrUndefined
} from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import BaseTableError from "@/components/BaseTableError.vue";
import * as lodash from "lodash";
export default {
  components: {
    BaseInput,
    BaseMessageError,
    CustomerDetailForm,
    CustomerDetailFormReadonly,
    BaseButtonGroupPermission,
    BaseProcessing,
    BaseTableError
  },
  data() {
    return {
      customer: {
        customerName: "",
        customerKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        tel: "",
        fax: "",
        jwnetNumber: "",
        ediKey: "",
        memo: ""
      },
      maxlengthPost: AppConfig.MaxLength.PostalCode,
      maxlengthTel: AppConfig.MaxLength.Tel,
      newCustomer: new Customer(),
      today: new Date(),
      message: [],
      imgStatus: false,
      imgText: IMText,
      title: IMText.title.sshi0002,
      openDl: true,
      isReadOnly: true,
      currentCustomer: current.customer(),
      checkJapan: {},
      fields: [
        {
          key: "createDate",
          label: IMText.general.fshi0012.createDate,
          slot: "HEAD_createDate",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDateTime(value);
          }
        },
        {
          key: "notifyText",
          label: IMText.general.fshi0012.notifyText,
          slot: "HEAD_notifyText",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classOneButton"
        }
      ],
      groupNotification: lodash.cloneDeep(AppConfig.GroupNotification),
      tableErrorId: "sshi0012-table-get-error"
    };
  },
  async created() {
    this.message = [];
    const customerCode = +this.$route.params.customerCode;
    if (customerCode > 0) {
      this.imgStatus = true;
      this.openDl = true;
      if (canAction(Action.Update, Screen.SSHI0003)) {
        this.title = this.imgText.title.sshi0003;
        this.isReadOnly = false;
      } else if (canAction(Action.Read, Screen.SSHI0003)) {
        this.title = this.imgText.title.sshi0003Detail;
        this.isReadOnly = true;
      }
      await this.getCustomerByCustomerCode(customerCode);
    } else {
      this.imgStatus = false;
      this.isReadOnly = false;
      this.title = this.imgText.title.sshi0002;
    }

    this.groupNotification.Update = true;
  },

  methods: {
    async getCustomerByCustomerCode(customerCode) {
      await this.$store
        .dispatch("customerModule/getCustomerByCustomerCode", customerCode)
        .then(resp => {
          if (resp) {
            this.customer = this.$store.getters["customerModule/getCustomer"];
            this.openDl = false;
          }
        })
        .catch(error => {
          this.openDl = false;
        });
    },

    onBack() {
      if (!this.isReadOnly) {
        const isChangeDate = this.$refs["customerDetailForm"].canDeactivate();
        if (isChangeDate) {
          if (this.showPopupDirtyForm()) {
            navigation.sshi0001();
          }
          return;
        }
      }
      navigation.sshi0001();
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    async onAddUpdate() {
      this.message = [];
      this.customer = this.$refs["customerDetailForm"].getData();
      this.newCustomer = { ...this.customer };
      this.onValidate();
      if (!this.message.length) {
        await this.onDispath(this.newCustomer);
      }
    },

    async onDispath(customer) {
      this.openDl = true;

      if (this.imgStatus === true) {
        await this.$store
          .dispatch("customerModule/updateCustomer", customer)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              if (
                this.currentCustomer.customerCode === response.data.customerCode
              ) {
                this.$store.dispatch("menuModule/setCustomer", response.data);
              }
              navigation.sshi0001();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        await this.$store
          .dispatch("customerModule/addCustomer", customer)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              navigation.sshi0001();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
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

    onValidate() {
      // Customer Name
      if (isNullOrEmpty(this.newCustomer.customerName)) {
        this.message.push(Message.E00023.formatText("事業者名"));
      }
      // Customer Kana
      if (
        !isNullOrEmpty(this.newCustomer.customerKana) &&
        !CountCharacter.isKatakanaHasSpace(this.newCustomer.customerKana)
      ) {
        this.message.push(Message.E00028.formatText("事業者名カナ"));
      }
      // PostalCode
      if (isNullOrEmpty(this.newCustomer.postalCode)) {
        this.message.push(Message.E00023.formatText("郵便番号"));
      } else if (!CountCharacter.isPostalCode(this.newCustomer.postalCode)) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }

      // Address1
      if (isNullOrEmpty(this.newCustomer.address1)) {
        this.message.push(Message.E00023.formatText("都道府県"));
      } else if (!CountCharacter.isFullSize(this.newCustomer.address1)) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // Address2
      if (isNullOrEmpty(this.newCustomer.address2)) {
        this.message.push(Message.E00023.formatText("市区町村"));
      } else if (!CountCharacter.isFullSize(this.newCustomer.address2)) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // Address3
      if (!isNullOrEmpty(this.newCustomer.address3)) {
        if (!CountCharacter.isFullSize(this.newCustomer.address3)) {
          this.message.push(Message.E00013.formatText("町域"));
        }
      }

      // Address4
      if (
        !isNullOrEmpty(this.newCustomer.address4) &&
        !CountCharacter.isJWZH(this.newCustomer.address4)
      ) {
        this.message.push(Message.E00015.formatText("番地・建物名"));
      }

      // TEL
      if (
        !isNullOrEmpty(this.newCustomer.tel) &&
        !CountCharacter.isTelNumber(this.newCustomer.tel)
      ) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      // FAX
      if (
        !isNullOrEmpty(this.newCustomer.fax) &&
        !CountCharacter.isFaxNumber(this.newCustomer.fax)
      ) {
        this.message.push(Message.E00028.formatText("FAX"));
      }

      // Jwnet Number
      if (
        !isNullOrEmpty(this.newCustomer.jwnetNumber) &&
        !CountCharacter.isJWH(this.newCustomer.jwnetNumber)
      ) {
        this.message.push(Message.E00014.formatText("JWNET加入者番号"));
      }

      // Edi Key
      if (
        !isNullOrEmpty(this.newCustomer.ediKey) &&
        !CountCharacter.isJWH(this.newCustomer.ediKey)
      ) {
        this.message.push(Message.E00014.formatText("EDI利用確認キー"));
      }
    },

    onUpdateError(data) {
      const param = {
        notifyId: data.item.notifyId,
        notifyType: data.item.notifyType,
        notifyText: data.item.notifyText
      };
      this.openDl = true;
      this.$store
        .dispatch("notificationModule/updateNotificationsError", param)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$store.dispatch("notificationModule/setDataError", null);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onCancelError(data) {
      this.$emit("onCancelError");
    }
  },
  computed: {
    ...mapGetters({
      address: "addressModule/getByPostalCode",
      dataError: "notificationModule/setDataError"
    })
  },
  watch: {
    address() {
      if (!this.address) {
        this.message.push(Message.E00029);
      } else {
        this.message = [];
        this.customer.address1 = this.address.address1;
        this.customer.address2 = this.address.address2;
        this.customer.address3 = this.address.address3;
        this.customer.address4 = this.address.address4;
      }
    }
  }
};
</script>
