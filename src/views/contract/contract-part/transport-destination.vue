<template>
  <div class="table-detail">
    <table class="table table-box table-sm headTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="float-left label-form pt-1">運搬先情報</div>
          <div>
            <b-form-checkbox
              class="pt-1"
              v-model="item.selfDisposeFlag"
              :disabled="!item.finalSectionFlag || disableByWasteClass || disabled1832"
              @change="onChangeSelfDisposeFlag"
            >自己処分</b-form-checkbox>
          </div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn width-column">
          <span class="asterisk">*</span>運搬先業者
        </td>
        <td colspan="5">
          <b-button
            variant="link"
            size="sm"
            :disabled="disableByWasteClass || disabled1932"
            @click="goToLink(1)"
          >{{ item.desName }}</b-button>
          <b-button
            class="btn-form float-right"
            size="sm"
            :disabled="disableByWasteClass || disabled1932"
            @click="showPopup(1)"
          >選択</b-button>
        </td>
        <td class="titleColumn width-column-2">
          <span class="asterisk">*</span>運搬先業者事業場
        </td>
        <td colspan="5">
          <b-button
            variant="link"
            size="sm"
            :disabled="disableByWasteClass || disabled1932"
            @click="goToLink(2)"
          >{{ item.factoryName }}</b-button>
          <b-button
            class="btn-form float-right"
            size="sm"
            :disabled="disableByWasteClass || disabled1932"
            @click="showPopup(2)"
          >選択</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn width-column">再委託先処分業者</td>
        <td colspan="5">
          <b-button
            variant="link"
            size="sm"
            :disabled="disabled1932  || disabled1832"
            @click="goToLink(3)"
          >{{ item.reDesName }}</b-button>
          <b-button
            class="btn-form float-right"
            size="sm"
            :disabled="disabled1932  || disabled1832"
            @click="showPopup(3)"
          >選択</b-button>
        </td>
        <td class="titleColumn">再委託先処分業者事業場</td>
        <td colspan="5">
          <b-button
            variant="link"
            size="sm"
            :disabled="disabled1932 || disabled1832"
            @click="goToLink(4)"
          >{{ item.reFactoryName }}</b-button>
          <b-button
            class="btn-form float-right"
            size="sm"
            :disabled="disabled1932  || disabled1832"
            @click="showPopup(4)"
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
            v-model="item.disposeContractDate"
            :disabled="disabled1932 || disabled1832"
            @change="onChangeDisposeContractDate"
          ></b-input>
        </td>
        <td class="titleColumn width-column">有効年月日</td>
        <td class="width-date-column" colspan="2">
          <b-input
            size="sm"
            type="date"
            v-model="item.disposeContractLimit"
            :disabled="disabled1932 || disabled1832"
            @change="onChangeDisposeContractLimit"
          ></b-input>
        </td>
        <td class="titleColumn">処分方法</td>
        <td class="width-column" colspan="2">
          <span>{{ item.disposeName }}</span>
          <b-button
            class="btn-form float-right"
            size="sm"
            @click="showPopup(5)"
            :disabled="disabled1832"
          >選択</b-button>
        </td>
        <td class="titleColumn width-column">契約書ファイル</td>
        <td colspan="2">
          <span
            v-b-tooltip.top.hover
            :title="item.disposeContractPath"
          >{{ item.disposeContractPath | getFileName}}</span>
          <b-button
            v-if="imgStatus"
            class="btn-form float-right ml-2"
            size="sm"
            :disabled="disabled1932 || disabled1832"
            @click="downloadFile"
          >参照</b-button>
          <label class="float-right label-margin" :disabled="disabled1932 || disabled1832">
            <div class="btn btn-form float-right btn-secondary btn-sm upload-file">選択</div>
            <b-file
              class="hide-status"
              v-on:change="uploadFile($event, 2)"
              v-model="disposeContractFile"
              hidden
            ></b-file>
          </label>
        </td>
      </tr>
    </table>
    <!-- item23 -->
    <SelectionSupplierPopup
      :popupId="selectSuplier1TruePopupId"
      :search="searchSupplier"
      :loadPopup="loadPopupSupplier1True"
      :supplierClass="3"
      @onSelect="onSelect"
    />
    <SelectionSupplierPopup
      :popupId="selectSuplier1FalsePopupId"
      :search="searchSupplier"
      :loadPopup="loadPopupSupplier1False"
      :supplierClass="2"
      @onSelect="onSelect"
    />
    <!-- item25 -->
    <SelectionFactoryPopup
      :popupId="selectFactory2TruePopupId"
      :search="searchFactory"
      :loadPopup="loadPopupFactory2True"
      :supplier="supplier1"
      @onSelect="onSelect"
    />
    <SelectionFactoryPopup
      :popupId="selectFactory2FalsePopupId"
      :search="searchFactory"
      :loadPopup="loadPopupFactory2False"
      :supplier="supplier1"
      @onSelect="onSelect"
    />
    <!-- item27 -->
    <SelectionSupplierPopup
      :popupId="selectSuplier3PopupId"
      :search="searchSupplier"
      :loadPopup="loadPopupSupplier3"
      :supplierClass="3"
      @onSelect="onSelect"
    />
    <!-- item29 -->
    <SelectionFactoryPopup
      :popupId="selectFactory4PopupId"
      :search="searchFactory"
      :loadPopup="loadPopupFactory4"
      :supplier="supplier2"
      @onSelect="onSelect"
    />
    <!-- item33 -->
    <SelectionDisposePopup
      :popupId="selectDisposePopupId"
      :loadPopup="loadPopupDispose"
      @onSelect="onSelect"
    />
  </div>
</template>

<script>
import SelectionSupplierPopup from "./popup/selection-supplier-popup";
import SelectionFactoryPopup from "./popup/selection-factory-popup.vue";
import SelectionDisposePopup from "./popup/selection-dispose-popup.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import moment from "moment";
import * as lodash from "lodash";
import { isNullOrEmpty } from "@/shared/utilities";

export default {
  components: {
    SelectionSupplierPopup,
    SelectionFactoryPopup,
    SelectionDisposePopup
  },
  props: {
    classByWaste: {
      type: String,
      default: ""
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
      default: true
    },
    disabled1932: {
      type: Boolean,
      default: false
    },
    disabled1832: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectSuplier1TruePopupId: "sshi0030-selection-supplier-true-popup1",
      selectSuplier1FalsePopupId: "sshi0030-selection-supplier-false-popup1",
      selectFactory2TruePopupId: "sshi0030-selection-factory-true-popup2",
      selectFactory2FalsePopupId: "sshi0030-selection-factory-false-popup2",
      selectSuplier3PopupId: "sshi0030-selection-supplier-popup3",
      selectFactory4PopupId: "sshi0030-selection-factory-popup4",
      selectDisposePopupId: "sshi0030-selection-dispose-popup",
      popupIdSupplier: "",
      popupIdFactory: "",
      disposeContractFile: {},
      searchSupplier: {
        supplierName: "",
        supplierKana: ""
      },
      searchFactory: {
        factoryName: "",
        factoryKana: ""
      },
      supplier1: {},
      supplier2: {},
      loadPopupSupplier1True: {},
      loadPopupSupplier1False: {},
      loadPopupFactory2True: {},
      loadPopupFactory2False: {},
      loadPopupSupplier3: {},
      loadPopupFactory4: {},
      loadPopupDispose: {}
    };
  },
  methods: {
    showPopup(key) {
      switch (key) {
        case 1:
          if (this.item.finalSectionFlag) {
            this.resetSupplierPopup();
            this.loadPopupSupplier1True = lodash.clone(
              this.loadPopupSupplier1True
            );
            this.$bvModal.show(this.selectSuplier1TruePopupId);
          } else {
            this.resetSupplierPopup();
            this.loadPopupSupplier1False = lodash.clone(
              this.loadPopupSupplier1False
            );
            this.$bvModal.show(this.selectSuplier1FalsePopupId);
          }
          break;
        case 2:
          this.supplier1 = {
            supplierCode: this.item.destSupplierCode,
            supplierName: this.item.desName
          };
          if (this.item.finalSectionFlag) {
            this.resetFactoryPopup();
            this.loadPopupFactory2True = lodash.clone(
              this.loadPopupFactory2True
            );
            this.$bvModal.show(this.selectFactory2TruePopupId);
          } else {
            this.resetFactoryPopup();
            this.loadPopupFactory2False = lodash.clone(
              this.loadPopupFactory2False
            );
            this.$bvModal.show(this.selectFactory2FalsePopupId);
          }
          break;
        case 3:
          this.resetSupplierPopup();
          this.loadPopupSupplier3 = lodash.clone(this.loadPopupSupplier3);
          this.$bvModal.show(this.selectSuplier3PopupId);
          break;
        case 4:
          this.supplier2 = {
            supplierCode: this.item.reentrustDisposeSupplierCode,
            supplierName: this.item.reDesName
          };
          this.resetFactoryPopup();
          this.loadPopupFactory4 = lodash.clone(this.loadPopupFactory4);
          this.$bvModal.show(this.selectFactory4PopupId);
          break;
        case 5:
          this.loadPopupDispose = lodash.clone(this.loadPopupDispose);
          this.$bvModal.show(this.selectDisposePopupId);
          break;
        default:
          break;
      }
    },

    onChangeSelfDisposeFlag() {
      this.onChangeValue();
      this.$emit("onChangeSelfDisposeFlag", !this.item.selfDisposeFlag);
    },

    onChangeValue() {
      this.$emit("onChangeValue");
    },

    onChangeDisposeContractDate(data) {
      this.onChangeValue();
      this.item.disposeContractDate = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    onChangeDisposeContractLimit(data) {
      this.onChangeValue();
      this.item.disposeContractLimit = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    downloadFile() {
      this.$emit("downloadFile", this.item.disposeContractPath);
    },

    uploadFile(event, key) {
      this.onChangeValue();
      this.$emit("uploadFile", event.target.files, key);
    },

    goToLink(key) {
      let params = {};
      switch (key) {
        case 1:
          this.$emit("goToUpdateSupplier", this.item.destSupplierCode);
          break;
        case 2:
          params = {
            factoryCode: this.item.destFactoryCode,
            supplierCode: this.item.destSupplierCode
          };
          this.$emit("goToUpdateFactory", params);
          break;
        case 3:
          this.$emit(
            "goToUpdateSupplierHandle",
            this.item.reentrustDisposeSupplierCode
          );
          break;
        case 4:
          params = {
            factoryCode: this.item.reentrustDisposeFactoryCode,
            supplierCode: this.item.reentrustDisposeSupplierCode
          };
          this.$emit("goToUpdateFactory", params);
          break;
        default:
          break;
      }
    },

    resetSupplierPopup() {
      this.searchSupplier = {
        supplierName: "",
        supplierKana: ""
      };
    },

    resetFactoryPopup() {
      this.searchFactory = {
        factoryName: "",
        factoryKana: ""
      };
    },

    onSelect(data, popupId) {
      this.onChangeValue();
      switch (popupId) {
        // item 22, 23
        case this.selectSuplier1TruePopupId:
        case this.selectSuplier1FalsePopupId:
          this.item.destSupplierCode = data.supplierCode;
          this.item.desName = data.supplierName;
          break;
        // item 24,25
        case this.selectFactory2TruePopupId:
        case this.selectFactory2FalsePopupId:
          this.item.destFactoryCode = data.factoryCode;
          this.item.factoryName = data.factoryName;
          break;
        // item 26,27
        case this.selectSuplier3PopupId:
          this.item.reentrustDisposeSupplierCode = data.supplierCode;
          this.item.reDesName = data.supplierName;
          break;
        // item 28,29
        case this.selectFactory4PopupId:
          this.item.reentrustDisposeFactoryCode = data.factoryCode;
          this.item.reFactoryName = data.factoryName;
          break;
        // item 32,33
        case this.selectDisposePopupId:
          this.item.disposeCode = data.disposeCode;
          this.item.disposeName = data.disposeName;
          break;
        default:
          break;
      }
    }
  }
};
</script>