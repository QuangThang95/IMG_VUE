<template>
  <div class="table-detail">
    <table class="table table-box table-sm headTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="float-left label-title pt-1">収集運搬情報</div>
          <div>
            <b-form-checkbox
              class="pt-1"
              v-model="item.selfTransportFlag"
              @change="onChangeSelfTransportFlag"
            >自己運搬</b-form-checkbox>
          </div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn width-column">
          <span class="asterisk">*</span>収集運搬業者
        </td>
        <td colspan="5">
          <b-button
            variant="link"
            size="sm"
            :disabled="disabled917"
            @click="goToLink(1)"
          >{{ item.transportName }}</b-button>
          <b-button
            class="btn-form float-right"
            size="sm"
            :disabled="disabled917"
            @click="showPopup(1)"
          >選択</b-button>
        </td>
        <td class="titleColumn width-column-2">再委託収集運搬業者</td>
        <td colspan="5">
          <b-button
            variant="link"
            size="sm"
            :disabled="disableByWasteClass || disabled917"
            @click="goToLink(2)"
          >{{ item.reTransportName }}</b-button>
          <b-button
            class="btn-form float-right"
            size="sm"
            :disabled="disableByWasteClass || disabled917"
            @click="showPopup(2)"
          >選択</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn width-column">
          <span class="asterisk">*</span>契約年月日
        </td>
        <td class="width-date-column" colspan="2">
          <b-input
            size="sm"
            type="date"
            v-model="item.contractDate"
            :disabled="disabled917"
            @change="onChangeContractDate"
          ></b-input>
        </td>
        <td class="titleColumn width-column">有効年月日</td>
        <td class="width-date-column" colspan="2">
          <b-input
            size="sm"
            type="date"
            v-model="item.contractLimit"
            :disabled="disabled917"
            @change="onChangeContractLimit"
          ></b-input>
        </td>
        <td class="titleColumn">運搬方法</td>
        <td class="width-column" colspan="2">
          <b-form-select
            size="sm"
            v-model="item.transportCode"
            :options="transportMethodOption"
            @change="onChangeValue"
          ></b-form-select>
        </td>
        <td class="titleColumn width-column">契約書ファイル</td>
        <td colspan="2">
          <span
            v-b-tooltip.top.hover
            :title="item.transportContractPath"
          >{{ item.transportContractPath | getFileName }}</span>
          <b-button
            v-if="imgStatus"
            class="btn-form float-right ml-2"
            size="sm"
            :disabled="disabled917"
            @click="downloadFile"
          >参照</b-button>
          <label class="float-right label-margin" :disabled="disabled917">
            <div class="btn btn-form float-right btn-secondary btn-sm upload-file">選択</div>
            <b-file
              class="hide-status"
              v-on:change="uploadFile($event, 1)"
              v-model="transportContractFile"
              hidden
            ></b-file>
          </label>
        </td>
      </tr>
    </table>
    <SelectionSupplierPopup
      :popupId="selectSupplierPopupId"
      :search="searchSupplier"
      :loadPopup="loadPopupSuplier"
      :supplierClass="2"
      @onSelect="onSelect"
    />
    <SelectionSupplierPopup
      :popupId="selectReentrustSupplierPopupId"
      :search="searchSupplier"
      :loadPopup="loadPopupReentrustSuplier"
      :supplierClass="2"
      @onSelect="onSelect"
    />
  </div>
</template>

<script>
import SelectionSupplierPopup from "./popup/selection-supplier-popup";
import SelectionFactoryPopup from "./popup/selection-factory-popup";
import DateTimeFormat from "@/constants/DateTimeFormat";
import moment from "moment";
import * as lodash from "lodash";
import { isNullOrEmpty } from "@/shared/utilities";

export default {
  components: {
    SelectionSupplierPopup,
    SelectionFactoryPopup
  },

  props: {
    classByWaste: {
      type: String,
      default: ""
    },
    transportMethodOption: {
      type: Array,
      default: () => []
    },
    imgStatus: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: {}
    },
    disableByWasteClass: {
      type: Boolean,
      default: false
    },
    disabled917: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectSupplierPopupId: "sshi0030-selection-supplier-popup",
      selectReentrustSupplierPopupId:
        "sshi0030-selection-reentrust-supplier-popup",
      transportContractFile: {},
      searchSupplier: {
        supplierName: "",
        supplierKana: ""
      },
      loadPopupSuplier: {},
      loadPopupReentrustSuplier: {},
      supplier: {
        supplierCode: null,
        supplierName: ""
      }
    };
  },

  methods: {
    showPopup(key) {
      switch (key) {
        case 1:
          this.resetSupplierPopup();
          this.loadPopupSuplier = lodash.clone(this.loadPopupSuplier);
          this.$bvModal.show(this.selectSupplierPopupId);
          break;
        case 2:
          this.resetSupplierPopup();
          this.loadPopupReentrustSuplier = lodash.clone(
            this.loadPopupReentrustSuplier
          );
          this.$bvModal.show(this.selectReentrustSupplierPopupId);
          break;
        default:
          break;
      }
    },

    onChangeSelfTransportFlag() {
      this.onChangeValue();
      this.$emit("onChangeSelfTransportFlag", !this.item.selfTransportFlag);
    },

    onChangeValue() {
      this.$emit("onChangeValue");
    },

    onChangeContractDate(data) {
      this.onChangeValue();
      this.item.contractDate = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    onChangeContractLimit(data) {
      this.onChangeValue();
      this.item.contractLimit = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    uploadFile(event, key) {
      this.onChangeValue();
      this.$emit("uploadFile", event.target.files, key);
    },

    downloadFile() {
      this.$emit("downloadFile", this.item.transportContractPath);
    },

    goToLink(key) {
      let supplierCode = null;
      switch (key) {
        case 1:
          supplierCode = this.item.transportSupplierCode;
          break;
        case 2:
          supplierCode = this.item.reentrustTransportSupplierCode;
          break;
        default:
          break;
      }
      this.$emit("goToUpdateSupplier", supplierCode);
    },

    onSelect(data, popupId) {
      this.onChangeValue();
      if (this.selectSupplierPopupId === popupId) {
        this.item.transportName = data.supplierName;
        this.item.transportSupplierCode = data.supplierCode;
      } else if (this.selectReentrustSupplierPopupId === popupId) {
        this.item.reTransportName = data.supplierName;
        this.item.reentrustTransportSupplierCode = data.supplierCode;
      }
    },

    resetSupplierPopup() {
      this.searchSupplier = {
        supplierName: "",
        supplierKana: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
th {
  background-color: #f2dede;
}

.label-title {
  margin-right: 122px;
}
</style>
