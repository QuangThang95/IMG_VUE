<template>
  <div>
    <b-row>
      <b-col>
        <div v-if="permissionGroup.Create">
          <b-button
            class="float-right btn-form mt-2 mb-2"
            size="sm"
            @click="onAdd"
            v-if="permissionGroup.Create"
          >追加</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="itemsFactoryLicenseGeneral && itemsFactoryLicenseGeneral.length > 0">
          <BaseTablePermission
            :dataTable="itemsFactoryLicenseGeneral"
            :fields="fields"
            :tableId="tableId"
            :position="position"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            :permissionGroup="permissionGroup"
            @onSelect="onSelect"
            :count="count"
            :pageCount="pageCount"
            :pageSize="pageSize"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
            @onSorting="onSorting"
            @closeSort="closeSort"
          ></BaseTablePermission>
        </div>
        <BasePopupMessage
          ref="modal-confirm"
          :title="titlePopupCustom"
          :sizePopup="sizePopup"
          :message="msgPopup"
          @isOK="onDeleteTab1"
        />
        <PopUpAddUpdate
          :items="dataFactoryLicense"
          :imgStatus="popupStatus"
          :popupId="popupId"
          :readOnly="isReadOnly"
          :checkShowTitle="checkShowTitle"
          @resetList="resetList"
        />
        <PopUpAddUpdateReadOnly
          :items="dataFactoryLicense"
          :imgStatus="popupStatus"
          :popupId="popupIdReadOnly"
          :readOnly="isReadOnly"
          :checkShowTitle="checkShowTitle"
          @resetList="resetList"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import PopUpAddUpdate from "../factory-detail-popup/factory-details-tab1-popup.vue";
import PopUpAddUpdateReadOnly from "../factory-detail-popup/factory-details-tab1-popup-readonly.vue";
import FormatData from "@/shared/FomatData";
import FactoryLicense from "@/models/factoryLicense.model";
import IMText from "@/data/img-text";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import { Message } from "@/constants/Message";
import CountCharacter from "@/shared/CountCharacter";
import moment from "moment";
import DateTimeFormat from "@/constants/DateTimeFormat";
import {
  current,
  navigation,
  common,
  canAction,
  isNumber,
  isNullOfEmpty,
  isNullOrEmpty,
  isNullOrUndefined,
  handleOutput
} from "@/shared/utilities";
import HttpStatus from "http-status-codes";
export default {
  props: [
    "itemsfactoryNumberName",
    "isReadOnly",
    "permissionGroup",
    "itemsFactoryLicenseGeneral",
    "pageCount",
    "count",
    "pageSize"
  ],
  components: {
    BaseTablePermission,
    PopUpAddUpdate,
    BasePopupMessage,
    PopUpAddUpdateReadOnly
  },
  data() {
    return {
      fields: [
        {
          key: "label",
          label: "許可区分",
          slot: "HEAD_label",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "licensePref",
          label: "許可都道府県等",
          slot: "HEAD_licensePref",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "licenseNumberString",
          label: "許可番号",
          slot: "HEAD_licenseNumberString",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "licenseLimit",
          label: "許可有効年月日",
          slot: "HEAD_licenseLimit",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "lastUpdate",
          label: "最終更新日",
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "actionDirective",
          label: "操作",
          tdClass: "classButton"
        }
      ],
      tableId: "sshi0008-table",
      position: -1,

      factoryLicense: FactoryLicense,
      titlePopupCustom: "",
      sizePopup: "",
      imgtext: IMText,
      msgPopup: "",
      dataFactoryLicense: {},
      popupId: "factoryTabPopup1",
      popupIdReadOnly: "factoryTabPopup1ReadOnly",
      imgStatus: false,
      popupStatus: false,
      checkShowTitle: true
    };
  },

  created() {
    this.factoryCode = +this.$route.params.factoryCode;
    this.supplierCode = +this.$route.params.supplierCode;
    const params = {
      customerCode: current.customer().customerCode,
      supplierCode: this.supplierCode,
      factoryCode: this.factoryCode
    };
  },

  methods: {
    goToPopup() {},

    onUpdate(data) {
      this.checkShowTitle = true;
      this.popupStatus = true;
      this.getDetailsFactoryLicense(data.item);
      this.$bvModal.show(this.popupId);
      this.$emit("changePopupStatusTab1", this.popupStatus);
    },
    onSelect(data) {
      this.checkShowTitle = false;
      this.popupStatus = true;
      this.getDetailsFactoryLicense(data.item);
      this.$bvModal.show(this.popupIdReadOnly);
    },

    getDetailsFactoryLicense(data) {
      const factoryCode = +this.$route.params.factoryCode;
      const supplierCode = +this.$route.params.supplierCode;
      const params = {
        customerCode: current.customer().customerCode,
        supplierCode: supplierCode,
        factoryCode: factoryCode,
        rowNumber: data.rowNumber,
        licenseClass: data.licenseClass
      };
      this.$store
        .dispatch("factoryLicenseModule/getFactoryLicenseById", params)
        .then(resp => {
          this.dataFactoryLicense = resp.data;
          this.dataFactoryLicense.licenseDate = moment(
            String(this.dataFactoryLicense.licenseDate)
          ).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
          this.dataFactoryLicense.licenseLimit = moment(
            String(this.dataFactoryLicense.licenseLimit)
          ).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
          this.dataFactoryLicense.factoryName = this.itemsfactoryNumberName.factoryName;
          this.dataFactoryLicense.factoryNumber = this.itemsfactoryNumberName.factoryNumber;
          this.dataFactoryLicense.factoryCode = this.itemsfactoryNumberName.factoryCode;
          this.dataFactoryLicense.supplierCode = this.itemsfactoryNumberName.supplierCode;
          this.dataFactoryLicense.customerCode = this.itemsfactoryNumberName.customerCode;
        });
    },

    onAdd() {
      this.popupStatus = false;
      this.dataFactoryLicense = {
        factoryNumber: this.itemsfactoryNumberName.factoryNumber,
        factoryName: this.itemsfactoryNumberName.factoryName,
        factoryCode: this.itemsfactoryNumberName.factoryCode,
        supplierCode: this.itemsfactoryNumberName.supplierCode,
        customerCode: this.itemsfactoryNumberName.customerCode,
        licenseDate: null,
        licenseLimit: null,
        licenseNumberString: null,
        licensePref: "",
        memo: "",
        rowNumber: 0,
        path: ""
      };
      this.$bvModal.show(this.popupId);
      this.$emit("changePopupStatusTab1", this.popupStatus);
    },

    onPicker(data) {
      this.factoryLicense = data;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDeleteTab1() {
      this.$emit("onDeleteTab1", this.factoryLicense.item);
      this.$refs["modal-confirm"].hideModal();
    },

    resetList(data) {
      this.$emit("resetListTab1", data);
    },

    getPageSize(data) {
      this.$emit("getPageSizeTab1", data);
    },

    closeSort(data) {
      this.$emit("closeSortTab1", data);
    },

    onSorting(data, ischeck) {
      this.$emit("onSortingTab1", data, ischeck);
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPageTab1", data);
    }
  },
  computed: {}
};
</script>
