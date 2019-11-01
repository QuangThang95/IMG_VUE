<template>
  <div>
    <BaseMessageError :title="title" :message="message" />
    <GeneralFormKey ref="generalFormKey" :general="general" :status="imgStatus" :disableState="disableState"></GeneralFormKey>
    <GeneralFormData ref="generalFormData" :general="general" :status="imgStatus" :disableState="disableState"></GeneralFormData>
    <BaseButtonGroup
      :isPopup="isPopup"
      :imgStatus="imgStatus"
      @onAddUpdate="onAddUpdate"
      @onBack="onBack"
    />
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import IMText from "@/data/img-text";
import BaseMessageError from "@/components/BaseMessageError";
import GeneralFormKey from "./general-form-key";
import GeneralFormData from "./general-form-data";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import { Message } from "@/constants/Message";
import { isNullOrEmpty, handleOutput, isNullOrZero } from "@/shared/utilities";
import HttpStatus from "http-status-codes";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  components: {
    BaseMessageError,
    GeneralFormKey,
    GeneralFormData,
    BaseButtonGroup,
    BaseProcessing
  },
  data() {
    return {
      general: {
        key1: "",
        key2: "",
        key3: "",
        key4: "",
        key5: "",
        key6: "",
        key7: "",
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        data5: false,
        data6: "",
        data7: "",
        key1Desc: "",
        key2Desc: "",
        key3Desc: "",
        key4Desc: "",
        key5Desc: "",
        key6Desc: "",
        key7Desc: "",
        data1Desc: "",
        data2Desc: "",
        data3Desc: "",
        data4Desc: "",
        data5Desc: "",
        data6Desc: "",
        data7Desc: ""
      },
      imgText: IMText,
      title: IMText.title.sshi0023,
      message: [],
      isPopup: false,
      imgStatus: false,
      generalByKey1: {},
      disableState: {
        key3: false,
        key4: false,
        key5: false,
        key6: false,

        data2: false,
        data3: false,
        data4: false,
        data5: false,
        data6: false,
        data7: false
      },
      openDl: false,
    };
  },
  async created() {
    this.general.key1 = this.$route.params.key1;
    const recordId = +this.$route.params.recordId;
    if (recordId > 0) {
      this.imgStatus = true;
      this.title = this.imgText.title.sshi0024;
      await this.setGeneral(recordId);
    } else {
      await this.setDataOnAdd();
      this.imgStatus = false;
      this.title = this.imgText.title.sshi0023;
    }
  },
  methods: {
    onBack(isAdd) {
      
      this.$emit("onBack", isAdd === false ? false : this.isChangeForm() );
    },
    onAddUpdate() {
      this.message = [];
      this.onValidateKeyPart();
      this.onValidateFormData();
      if (!this.message.length) {
        this.onDispath();
      }
    },

    isChangeForm() {
      const isChangeFormKey = this.$refs["generalFormKey"].canDeactivate();
      const isChangeFormData = this.$refs["generalFormData"].canDeactivate();
      if(!isChangeFormKey && !isChangeFormData) {
        return false;
      }
      return true;
    },

    onDispath() {
      this.openDl = true;
      if (this.imgStatus === false) {
        this.$store
          .dispatch("generalModule/addGeneral", this.general)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.onBack(false);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          }).finally(() => {
           this.openDl = false;
          });
      } else {
        this.$store
          .dispatch("generalModule/updateGeneral", this.general)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.onBack(false);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          }).finally(() => {
           this.openDl = false;
          });
      }
    },

    onValidateKeyPart() {
      if (isNullOrEmpty(this.general.key2)) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.key2)
        );
      }

      if (isNullOrEmpty(this.general.key3) && !this.disableState.key3) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.key3)
        );
      }

      if (isNullOrEmpty(this.general.key4) && !this.disableState.key4) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.key4)
        );
      }

      if (isNullOrEmpty(this.general.key5) && !this.disableState.key5) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.key5)
        );
      }

      if (isNullOrEmpty(this.general.key6) && !this.disableState.key6) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.key6)
        );
      }
    },

    onValidateFormData() {
      if (isNullOrEmpty(this.general.data1)) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data1)
        );
      }

      if (isNullOrEmpty(this.general.data2) && !this.disableState.data2) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data2)
        );
      }

      if (isNullOrEmpty(this.general.data3) && !this.disableState.data3) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data3)
        );
      }

      if (isNullOrEmpty(this.general.data4) && !this.disableState.data4) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data4)
        );
      }

      if (isNullOrEmpty(this.general.data5) && !this.disableState.data5) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data5)
        );
      }

      if (isNullOrEmpty(this.general.data6) && !this.disableState.data6) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data6)
        );
      }

      if (isNullOrEmpty(this.general.data7) && !this.disableState.data7) {
        this.message.push(
          Message.E00023.formatText(this.imgText.general.fshi0008.data7)
        );
      }
    },

    async setGeneral(recordId) {
      await this.getGeneralControlByKey1();
      this.$store
        .dispatch("generalModule/getGeneralById", { recordId: recordId })
        .then(response => {
          if (response.status === HttpStatus.OK) {
            const data = this.$store.getters["generalModule/getGeneralById"];
            if (data.length > 0) {
              this.general = data[0];
              this.assignDataControl();
            }
          }
        });
    },

    async getGeneralControlByKey1() {
      await this.$store
        .dispatch("generalModule/getGeneralControlByKey1", {
          key1: this.general.key1
        })
        .then(response => {
          if (response.status === HttpStatus.OK) {
            const data = this.$store.getters[
              "generalModule/getGeneralControlByKey1"
            ];
            if (data.length > 0) {
              this.generalByKey1 = data[0];
            }
          }
        });
    },

    async setDataOnAdd(general) {
      await this.getGeneralControlByKey1();
      this.assignDataControl();
    },

    assignDataControl() {
      if (this.generalByKey1) {
        this.general.key1Desc = this.generalByKey1.key1Desc;
        this.general.key2Desc = this.generalByKey1.key2Desc;
        // CreateControl(key2_attr, key2_len, string.Empty)

        this.general.data1Desc = this.generalByKey1.data1Desc;
        // CreateControl(data1_attr, data1_len,string.Empty)
        this.setKey();
        this.setData();
      }
    },

    setData() {
      if (isNullOrZero(this.generalByKey1.data2Len)) {
        this.disableState.data2 = true;
        // 無効になる
      } else {
        this.general.data2Desc = this.generalByKey1.data2Desc;
        // CreateControl(data2_attr, data2_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.data3Len)) {
        this.disableState.data3 = true;
        // 無効になる
      } else {
        this.general.data3Desc = this.generalByKey1.data3Desc;
        // CreateControl(data3_attr, data3_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.data4Len)) {
        this.disableState.data4 = true;
        // 無効になる
      } else {
        this.general.data4Desc = this.generalByKey1.data4Desc;
        // CreateControl(data4_attr, data4_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.data5Len)) {
        this.disableState.data5 = true;
        // 無効になる
      } else {
        this.general.data5Desc = this.generalByKey1.data5Desc;
        // CreateControl(data5_attr, data5_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.data6Len)) {
        this.disableState.data6 = true;
        // 無効になる
      } else {
        this.general.data6Desc = this.generalByKey1.data6Desc;
        // CreateControl(data6_attr, data6_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.data7Len)) {
        this.disableState.data7 = true;
        // 無効になる
      } else {
        this.general.data7Desc = this.generalByKey1.data7Desc;
        // CreateControl(data7_attr, data7_len, string.Empty)
      }
    },

    setKey() {
      if (isNullOrZero(this.generalByKey1.key3Len)) {
        this.disableState.key3 = true;
        // 無効になる
      } else {
        this.general.key3Desc = this.generalByKey1.key3Desc;
        // CreateControl(key3_attr, key3_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.key4Len)) {
        this.disableState.key4 = true;
        // 無効になる
      } else {
        this.general.key4Desc = this.generalByKey1.key4Desc;
        // CreateControl(key4_attr, key4_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.key5Len)) {
        this.disableState.key5 = true;
        // 無効になる
      } else {
        this.general.key5Desc = this.generalByKey1.key5Desc;
        // CreateControl(key5_attr, key5_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.key6Len)) {
        this.disableState.key6 = true;
        // 無効になる
      } else {
        this.general.key6Desc = this.generalByKey1.key6Desc;
        // CreateControl(key6_attr, key6_len, string.Empty)
      }

      if (isNullOrZero(this.generalByKey1.key7Len)) {
        // 無効になる
      } else {
        this.general.key7Desc = this.generalByKey1.key7Desc;
        // CreateControl(key6_attr, key6_len, string.Empty)
      }
    }
  }
};
</script>
    
<style>
</style>
