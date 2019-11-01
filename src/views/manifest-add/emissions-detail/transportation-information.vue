<template>
  <div>
    <b-card
      header-tag="header"
      :class="classByWaste"
      body-class="p-0 m-0"
      id="card-header-trans"
      footer-tag="footer"
    >
      <div slot="header">
        <b>収集運搬情報</b>
        <b-button v-if="!isUpdate" class="float-right btn-form mr-1" size="sm" @click="showPopUp">追加</b-button>
      </div>
      <div v-if="transport45.length > 0">
        <b-table
          :fields="fields"
          :items="transport45"
          :bordered="true"
          :outlined="true"
          :small="true"
          :id="idTable"
          class="tranportation"
        >
          <template slot="transportStaff" slot-scope="data">
            <Select2
              class="optionStaff"
              :options="data.value"
              :settings="{ tags: true}"
              v-model="data.item.transportStaffCode"
              @change="onChangeValueSelectBox(data)"
            />
          </template>
          <template slot="vehicle" slot-scope="vehicle">
            <b-form-select
              :options="vehicle.value.vehicleTypeTon"
              class="col-6"
              v-model="vehicle.item.vehicleTypeTonValue"
              @change="onChange(true)"
            ></b-form-select>
            <b-form-select
              :options="vehicle.value.vehicleType"
              class="col-6"
              v-model="vehicle.item.vehicleTypeValue"
              @change="onChange(true)"
            ></b-form-select>
          </template>
          <template slot="vehicleNumber" slot-scope="number">
            <b-input v-model.trim="number.item.vehicleNumber" @change="onChange(true)"></b-input>
          </template>
          <template slot="button" slot-scope="data">
            <b-button
              v-if="!isUpdate"
              class="btn-form"
              size="sm"
              @click="onPickDataToDelete(data)"
            >削除</b-button>
            <b-button
              v-if="isUpdate"
              class="btn-form"
              size="sm"
              @click="onPickDataToDelete(data)"
            >変更</b-button>
          </template>
        </b-table>
      </div>
    </b-card>
    <DisposePopUp :general4="general4" :general5="general5" @onClosePopUp="onClosePopUp"></DisposePopUp>
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onDelete"
    />
  </div>
</template>
<script>
import { current, common, handleOutput } from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";
import DisposePopUp from "../emissions-list/disposal-popup.vue";
import Select2 from "v-select2-component";
import { SupplierHandleService } from "@/services/supplier-handle.service";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import HttpStatus from "http-status-codes";
import IMText from "@/data/img-text";
const supplierHandleService = new SupplierHandleService();
import CountCharacter from "@/shared/CountCharacter";
export default {
  props: [
    "transportByWaste45",
    "classByWaste",
    "isUpdate",
    "general4",
    "general5"
  ],

  components: {
    DisposePopUp,
    Select2,
    BasePopupMessage
  },

  data() {
    return {
      fields: [
        {
          key: "transporterName",
          slot: "HEAD_supplier_name",
          label: "収集運搬業者",
          thClass: "titleColumn"
        },
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "運搬方法",
          thClass: "titleColumn"
        },
        {
          key: "transportStaff",
          slot: "HEAD_transportStaff",
          label: "運搬担当者",
          thClass: "titleColumn staffClass"
        },
        {
          key: "vehicle",
          slot: "HEAD_vehicle",
          label: "車種",
          thClass: "titleColumn"
        },
        {
          key: "vehicleNumber",
          slot: "HEAD_vehicleNumber",
          label: "車両番号",
          thClass: "titleColumn"
        },
        {
          key: "button",
          slot: "HEAD_button",
          label: "操作",
          tdClass: "classOneButton",
          thClass: "titleColumn"
        }
      ],
      options: [],
      idTable: "table-transport",
      data: [],
      currentCustomerCode: current.customer().customerCode,
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      search: {
        supplierName: "",
        supplierKana: ""
      },
      transport45: [],
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      imgtext: IMText
    };
  },

  created() {
    this.onBeforeUnLoad();
  },

  methods: {
    showPopUp() {
      this.$bvModal.show("fshi0011disposal45");
    },

    getDisposePopUpByWaste45(param) {
      this.$store.dispatch("manifestModule/getTransportByWaste45", param);
    },
    onChangeValueSelectBox(data) {
      const index = data.item.transportStaff.findIndex(
        i => i.id == data.item.transportStaffCode
      );
      if (index === -1) {
        const param = {
          customerCode: this.currentCustomerCode,
          usertypeCode: 5,
          supplierCode: data.item.transporterCode,
          userName: data.item.transportStaffCode
        };
        this.addUser(param, data);
      }
    },

    addUser(param, data) {
      supplierHandleService.createSupplierUser(param).then(res => {
        if (res.status === HttpStatus.OK) {
          const arr = [];
          arr.push(res.data);
          data.item.transportStaff = data.item.transportStaff.concat(
            arr.map(el => {
              return {
                id: el.userCode,
                text: el.userName
              };
            })
          );
          data.item.transportStaffCode = res.data.userCode;
        }
      });
    },

    onClosePopUp() {
      this.transport45 = [...this.dataSelectionPopUp];
      this.$bvModal.hide("fshi0011disposal45");
      this.$emit("update:transportByWaste45", this.transport45);
    },

    onProp(value) {
      this.transport45 = value;
    },

    onPickDataToDelete(data) {
      this.dataSelection = data.item;
      if (!this.isUpdate) {
        this.titlePopupCustom = this.imgtext.popup.confirm;
        this.sizePopup = "sm";
        this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
          this.imgtext.general.btnDelete
        );
        return this.$refs["modal-confirm"].showModal();
      }
      return this.showPopUp();
    },

    onDelete() {
      this.transport45 = this.transport45.filter(item => {
        return item.transporterCode !== this.dataSelection.transporterCode;
      });
      this.$refs["modal-confirm"].hideModal();
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
  },

  computed: {
    dataSelectionPopUp() {
      return this.$store.state.manifestModule.transposterPopUp45Selection;
    }
  },
  mounted() {
    this.onProp(this.transportByWaste45);
    this.$watch("transportByWaste45", this.onProp);
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/custom/manifest/_transporter.scss";
#card-header-trans .card-header {
  padding: 5px 0px 5px 2px;
}
</style>