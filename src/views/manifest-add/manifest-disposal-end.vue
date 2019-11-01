<template>
  <div>
    <b-card
      header-tag="header"
      body-class="p-0 m-0"
      :class="classByWaste"
      id="card-header-disposeEnd"
      footer-tag="footer"
    >
      <div class="flex-content" slot="header">
        <div class="disposeHeader">
          <b>最終処分情報（予定)</b>
          <div class="checkbox-caption-disposalEnd">
            <b-form-checkbox
              v-if="!isReadOnly"
              v-model="disposeEndFlag.isFinalDisposeFlag"
              @input="onCheckBox"
              :disabled="isVisible && !isUpdate"
              @change="onChange(true)"
            >委託契約書記載の通り</b-form-checkbox>
            <b-form-checkbox
              v-if="isReadOnly"
              v-model="disposeEndFlag.isFinalDisposeFlag"
              disabled
            >委託契約書記載の通り</b-form-checkbox>
          </div>
        </div>
        <b-button
          v-if="isShowFinalDisposeButton"
          @click="showPopUp"
          class="float-right btn-form mr-1"
          size="sm"
        >追加</b-button>
      </div>
      <div v-if="dataDisposeEnd.length > 0">
        <b-table
          :fields="fields"
          :items="dataDisposeEnd"
          :bordered="true"
          :outlined="true"
          :small="true"
          :id="idTable"
          class="disposalEnd"
        >
          <template slot="NO" slot-scope="data">{{ data.index + 1 }}</template>
          <template slot="button_disposal_end" slot-scope="data">
            <b-button class="btn-form" size="sm" @click="onPickData(data)">削除</b-button>
          </template>
          <template slot="HEAD_address" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
          <template slot="address" slot-scope="data">
            <div>{{data.value}}</div>
          </template>
          <template slot="HEAD_finalFactoryName" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
          <template slot="finalFactoryName" slot-scope="data">
            <div>{{data.value}}</div>
          </template>
          <template slot="postalcode" slot-scope="data">
            <div>{{data.value}}</div>
          </template>
          <template slot="tel" slot-scope="data">
            <div>{{data.value}}</div>
          </template>
        </b-table>
      </div>
    </b-card>
    <FormFinalDisposalPopUp
      @dataSelected="dataSelected"
      :dispose="dispose"
      :currentCustomerCode="currentCustomerCode"
      :finalDispose="finalDispose"
      :name="name"
    />
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
import FormFinalDisposalPopUp from "./final-disposal-popup";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import IMText from "@/data/img-text";
import CountCharacter from "@/shared/CountCharacter";
import FormatData from "@/shared/FomatData";

export default {
  components: {
    FormFinalDisposalPopUp,
    BasePopupMessage
  },
  props: [
    "disposeEnd",
    "dispose",
    "currentCustomerCode",
    "isUpdate",
    "currentBranchCode",
    "classByWaste",
    "disposeFlag",
    "disposeEndFlag",
    "isVisible",
    "isReadOnly"
  ],
  data() {
    return {
      idModal: "final-disposal-popUp",
      fields: [
        {
          key: "NO",
          slot: "HEAD_NO",
          label: "NO",
          thClass: "titleColumn"
        },
        {
          key: "finalFactoryName",
          slot: "HEAD_finalFactoryName",
          label: "最終処分事業場",
          thClass: "titleColumn"
        },
        {
          key: "postalcode",
          slot: "HEAD_postalcode",
          thClass: "titleColumn",
          label: "郵便番号"
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: "所在地",
          thClass: "titleColumn"
        },
        {
          key: "tel",
          slot: "HEAD_tel",
          label: "TEL",
          thClass: "titleColumn",
          tdAttr: {
            "x-ms-format-detection": "none"
          },
          formatter: value => {
            return FormatData.formatTelphone(value);
          }
        },
        {
          key: "button_disposal_end",
          slot: "HEAD_button_disposal_end",
          label: "操作",
          tdClass: "classOneButton",
          thClass: "titleColumn"
        }
      ],
      idTable: "sshi0032-table-disposal",
      isShowFinalDisposeButton: false,
      dataDisposeEnd: [],
      dataTable: this.disposeEnd,
      finalDispose: [],
      imgtext: IMText,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      dataSelection: {},
      name: {
        supplierName: "",
        factoryName: ""
      },
      isChangeData: false
    };
  },

  created() {
    this.onBeforeUnLoad();
  },

  methods: {
    showPopUp() {
      this.getDataToFinalPopUp();
      this.$bvModal.show("fshi0011-final");
    },

    getDataToFinalPopUp() {
      const data = {
        customerCode: this.currentCustomerCode,
        disposeFactoryCode: this.dispose.disposeFactoryCode
          ? this.dispose.disposeFactoryCode
          : 0,
        redisposeFactoryCode: this.dispose.reDisposeFactoryCode
          ? this.dispose.reDisposeFactoryCode
          : 0
      };
      this.getFinalDisposal(data);
    },

    onDelete() {
      this.dataDisposeEnd = this.dataDisposeEnd.filter(item => {
        return (
          item.finalFactoryCode !== this.dataSelection.item.finalFactoryCode
        );
      });
      this.$refs["modal-confirm"].hideModal();
    },

    onPickData(data) {
      this.dataSelection = data;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    dataSelected() {
      this.$bvModal.hide("fshi0011-final");
    },

    getFinalDisposeByEntryCode(param) {
      this.$store.dispatch("manifestModule/getFinalDisposeByEntryCode", param);
    },

    getFinalDisposal(param) {
      this.$store.dispatch("manifestModule/getFinal", param);
    },

    onCheckBox(data) {
      if (this.isUpdate && !data) {
        const param = {
          customerCode: this.currentCustomerCode, //1
          branchCode: this.currentBranchCode, //3
          entryCode: +this.$route.params.manifestNumber //323
        };
        this.getFinalDisposeByEntryCode(param);
      }
      if (data) {
        this.dataDisposeEnd = [];
        return (this.isShowFinalDisposeButton = false);
      }
      return (this.isShowFinalDisposeButton = true);
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
    dataFinalDisposeByEntryCode() {
      return this.$store.state.manifestModule.getFinalDisposeByEntryCode;
    },

    dataTableFinalPopUp() {
      return this.$store.state.manifestModule.final;
    }
  },

  watch: {
    disposeEnd() {
      this.dataTable = this.disposeEnd;
      this.dataDisposeEnd = [...this.dataTable];
    },

    dataTableFinalPopUp() {
      this.finalDispose = this.dataTableFinalPopUp.map(item => {
        return { ...item, isCheck: false };
      });
      const data = this.dataDisposeEnd.map(item => item.finalFactoryCode);
      this.finalDispose = this.finalDispose.filter(item => {
        return !data.includes(item.finalFactoryCode);
      });
    },

    dataFinalDisposeByEntryCode() {
      const data = this.dataFinalDisposeByEntryCode;
      this.dataDisposeEnd = [...this.dataDisposeEnd, ...data];
    },

    dispose() {
      this.name.supplierName = this.dispose.disposerName
        ? this.dispose.disposerName
        : "";
      this.name.factoryName = this.dispose.disposeFactoryName
        ? this.dispose.disposeFactoryName
        : "";
      const data = {
        customerCode: this.currentCustomerCode,
        disposeFactoryCode: this.dispose.disposeFactoryCode
          ? this.dispose.disposeFactoryCode
          : 0,
        redisposeFactoryCode: this.dispose.reDisposeFactoryCode
          ? this.dispose.reDisposeFactoryCode
          : 0
      };
      this.getFinalDisposal(data);
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/custom/manifest/_disposalEnd.scss";

#card-header-disposeEnd .card-header {
  padding: 5px 0px 5px 2px;
}
.checkbox-caption-disposalEnd {
  margin-left: 115px;
  font-weight: bold;
}
.flex-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
div.flex-content .disposeHeader {
  display: flex;
  width: 50%;
}
</style>