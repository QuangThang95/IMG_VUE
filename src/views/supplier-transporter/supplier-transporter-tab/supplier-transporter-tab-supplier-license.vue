<template>
  <div>
    <b-row>
      <b-col>
        <b-button
          v-if="permissionGroup.Create"
          class="float-right btn-form mb-2"
          size="sm"
          @click="onAdd"
        >{{ imgtext.general.btnAdd }}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable && dataTable.length">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields="fields"
            :tableId="tableId"
            :position="position"
            :permissionGroup="permissionGroup"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            @getCurrentPage="getCurrentPage"
            @closeSort="closeSort"
            @onSorting="onSorting"
            @getPageSize="getPageSize"
            @onSelect="onSelect"
            :pageCount="pageCount"
            :count="count"
            :pageSize="pageSize"
          />
        </div>
      </b-col>
    </b-row>

    <PopupSupplierLicense
      :dataSource4="dataSource4"
      :dataSupplier="dataSupplier"
      :dataDropbox="dataDropSupplier"
      :id="popupId"
      :item="supplierLicense"
      :imgStatus="popupStatus"
      @onChangeStatus="onChangeStatus"
      :isReadOnly="isReadOnly"
      :dataTypeNum="dataTypeNum"
    />
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onDelete"
    />
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseTablePermission from "@/components/BaseTablePermission";
import IMText from "@/data/img-text.json";
import { mapGetters } from "vuex";
import { Message } from "@/constants/Message";
import { isNullOrUndefined } from "@/shared/utilities";
import moment from "moment";
import DateTimeFormat from "@/constants/DateTimeFormat";
import BasePopupMessage from "@/components/BasePopupMessage";
import PopupSupplierLicense from "../supplier-transporter-popup/supplier-transporter-popup-supplier-license";
import { common } from "@/shared/utilities";
import { HttpStatus } from "@/constants/HttpStatus";
import FormatData from "@/shared/FomatData";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  props: [
    "items",
    "dataDropboxLicense",
    "dataSource4",
    "dataSupplier",
    "permissionGroup",
    "pageCount",
    "count",
    "pageSize",
    "isReadOnly",
    "dataTypeNum"
  ],
  components: {
    BaseTablePermission,
    BasePopupMessage,
    PopupSupplierLicense,
    BaseProcessing
  },
  data() {
    return {
      imgtext: IMText,
      message: Message.E00021,
      fields: [
        {
          key: "data1",
          slot: "HEAD_data1",
          label: IMText.general.licenseClass,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "licensePref",
          slot: "HEAD_licensePref",
          label: IMText.general.licensePref,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "licenseNumberString",
          slot: "HEAD_licenseNumberString",
          label: IMText.general.licenseNumber,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "licenseLimit",
          slot: "HEAD_licenseLimit",
          label: IMText.general.licenseLimit,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "lastUpdate",
          slot: "HEAD_lastUpdate",
          label: IMText.general.lastUpdate,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        }
      ],
      tableId: "sshi0012-tab2-table",
      position: 0,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      imgStatus: false,
      popupStatus: false,
      supplierLicense: {
        path: ''
      },
      popupId: "sshi0012-popup-supplier-license",
      openDl: false,
    };
  },

  created() {
    let count = 0;
    if (this.permissionGroup.Update) {
      count++;
    } else if (this.permissionGroup.Read) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      count++;
    }
    if (this.permissionGroup.Delete) {
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    onAdd() {
      this.message = [];
      this.popupStatus = false;
      this.supplierLicense = {
        licenseClass: "",
        licenseDate: null,
        licenseLimit: null,
        licenseNumber: "",
        licensePref: "",
        memo: "",
        path: ""
      };
      this.$bvModal.show(this.popupId);
    },
    onUpdate(data) {
      this.popupStatus = true;
      this.supplierLicense = this.dataTable[data.index];
      this.supplierLicense.licenseDate = moment(String(this.supplierLicense.licenseDate)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
      this.supplierLicense.licenseLimit = moment(String(this.supplierLicense.licenseLimit)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
      this.$bvModal.show(this.popupId);
    },

    onSelect(data) {
      this.popupStatus = true;
      this.supplierLicense = this.dataTable[data.index];
      this.supplierLicense.licenseDate = moment(String(this.supplierLicense.licenseDate)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
      this.supplierLicense.licenseLimit = moment(String(this.supplierLicense.licenseLimit)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
      this.$bvModal.show(this.popupId);
    },

    onChangeStatus(value) {
      this.popupStatus = value;
      this.$emit("loadList");
    },

    onPicker(data) {
      this.supplierLicense = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      this.openDl = true;
      let deleteSupplierLicense = {
        customerCode: this.supplierLicense.customerCode,
        supplierCode: this.supplierLicense.supplierCode,
        licenseClass: this.supplierLicense.licenseClass,
        rowNumber: this.supplierLicense.rowNumber
      };
      this.$store
        .dispatch(
          "supplierLicenseModule/deleteSupplierLicense",
          deleteSupplierLicense
        )
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$emit("loadList");
          }
        }).finally(() => {
          this.openDl = false;
        });
      this.$refs["modal-confirm"].hideModal();
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    closeSort(data) {
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      this.$emit("onSorting", data, ischeck);
    }
  },

  computed: {
    dataTable() {
      return this.items;
    },
    dataDropSupplier() {
      return common.formatObjectSelection(this.dataDropboxLicense, ["key2", "data1"]);
    },
  }
};
</script>

