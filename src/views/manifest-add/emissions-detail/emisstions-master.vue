<template>
  <div>
    <table class="table table-box table-sm emissionWaste45">
      <tr class="header-table">
        <th colspan="12" :class="classByWaste">
          <div class="mt-1">排出情報</div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">状態</td>
        <td colspan="2"></td>
        <td class="titleColumn">発行番号</td>
        <td colspan="2">{{entryCode45}}</td>
        <td class="titleColumn">
          <span class="asterisk">*</span>引渡し担当者
        </td>
        <td colspan="2">
          <b-form-select
            :options="manifestByCustumer"
            v-model="dischargeInformation.deliveryUserCode"
            @change="onChange(true)"
          ></b-form-select>
        </td>
        <td class="titleColumn">登録担当者</td>
        <td colspan="2">{{nameRegistation}}</td>
      </tr>
    </table>
    <FormTransportation
      :transportByWaste45="transportByWaste45"
      :classByWaste="classByWaste"
      :isUpdate="isUpdate"
      :general4="general4"
      :general5="general5"
    />
    <FormEmissionsInformation
      :classByWaste="classByWaste"
      :emissionByWaste45="emissionByWaste45"
      :currentBranchCode="currentBranchCode"
      :contractCode="contractCode"
      :currentWasteClass="currentWasteClass"
      :isManifest45="isManifest45"
      :general1="general1"
      :currentCustomerCode="currentCustomerCode"
      :isUpdate="isUpdate"
      :emissionPopUp45="emissionPopUp45"
    />
    <Formremarks
      :remark="remark"
      :isVisible="isVisible"
      :classByWaste="classByWaste"
      :isUpdate="isUpdate"
    />
    <FormremarksEnd v-if="isUpdate" :classByWaste="classByWaste" :date="date" />
    <div class="float-right mt-2 mb-4">
      <b-button v-if="!isUpdate" class="btn-form ml-4" size="sm" @click="onAddManifest45">登録</b-button>
      <b-button v-if="isUpdate" class="btn-form ml-4" size="sm" @click="onUpdateManifest45">修正</b-button>
      <b-button class="btn-form ml-4" size="sm" @click="onBack">戻る</b-button>
    </div>
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import FormTransportation from "./transportation-information";
import FormEmissionsInformation from "./emissions-information";
import FormremarksEnd from "./remarks-end";
import Formremarks from "./remarks";
import IMText from "@/data/img-text";
import BaseMessageError from "@/components/BaseMessageError.vue";
import CountCharacter from "@/shared/CountCharacter";
export default {
  components: {
    FormTransportation,
    FormEmissionsInformation,
    FormremarksEnd,
    Formremarks,
    BaseMessageError
  },

  props: [
    "manifestByCustumer",
    "nameRegistation",
    "transportByWaste45",
    "remark",
    "isVisible",
    "classByWaste",
    "emissionByWaste45",
    "dischargeInformation",
    "onAddManifest45",
    "currentBranchCode",
    "contractCode",
    "currentWasteClass",
    "isManifest45",
    "general1",
    "currentCustomerCode",
    "entryCode45",
    "isUpdate",
    "date",
    "onUpdateManifest45",
    "isReadOnly",
    "general4",
    "general5",
    "emissionPopUp45"
  ],

  data() {
    return {
      imgText: IMText,
      title: "",
      message: [],
      isChangeData: false
    };
  },
  created() {
    this.onBeforeUnLoad();
  },

  methods: {
    onBack() {
      this.$emit("onBack");
    },
    onChange(data) {
      this.isChangeData = data;
      this.$store.dispatch("manifestModule/checkDirtyForm", data);
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" >
@import "@/assets/scss/custom/manifest/_emssionWaste45.scss";
.emissionWaste45.table td {
  table-layout: fixed;
  width: 150px;
}
</style>
