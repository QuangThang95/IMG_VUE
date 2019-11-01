<template>
  <div>
    <b-card
      header-tag="header"
      :class="classByWaste"
      body-class="p-0 m-0"
      id="emissionCard"
      footer-tag="footer"
    >
      <div slot="header">
        <b>排出物情報</b>
        <b-button
          v-if="!isUpdate"
          class="float-right btn-form mr-1"
          size="sm"
          @click="onShowEmission"
        >追加</b-button>
      </div>
      <div v-if="emissionsDefault.length >0">
        <b-table
          :fields="fields"
          :items="emissionsDefault"
          :bordered="true"
          :outlined="true"
          :small="true"
          :id="idTable"
          class="emissionInformation"
        >
          <template slot="NO" slot-scope="data">{{ data.index + 1 }}</template>
          <template slot="unitQuantity" slot-scope="data">
            <b-form-input v-model="data.item.unitQuantity" @change="onChange(true)"></b-form-input>
          </template>
          <template slot="unit" slot-scope="data">
            <b-form-select
              :options="data.value"
              v-model="data.item.unitCode"
              @change="onChange(true)"
            ></b-form-select>
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
    <EmissionPopUp
      :emissionsData="emissionsData"
      @onCloseEmissionPopUp="onCloseEmissionPopUp"
      :isManifest45="isManifest45"
      :general1="general1"
    ></EmissionPopUp>
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
import EmissionPopUp from "../emission-popup.vue";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import IMText from "@/data/img-text";
import CountCharacter from "@/shared/CountCharacter";
export default {
  props: [
    "classByWaste",
    "emissionByWaste45",
    "currentBranchCode",
    "contractCode",
    "currentWasteClass",
    "isManifest45",
    "general1",
    "currentCustomerCode",
    "isUpdate",
    "emissionPopUp45"
  ],
  components: { EmissionPopUp, BasePopupMessage },
  data() {
    return {
      fields: [
        {
          key: "NO",
          slot: "HEAD_NO",
          label: "NO",
          thClass: "titleColumn"
        },
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "大分類",
          thClass: "titleColumn"
        },
        {
          key: "wasteCode",
          slot: "HEAD_data1",
          label: "分類コード",
          thClass: "titleColumn"
        },
        {
          key: "wasteName",
          slot: "HEAD_data1",
          label: "排出物名",
          thClass: "titleColumn"
        },
        {
          key: "unitQuantity",
          slot: "HEAD_unitQuantity",
          label: "数量",
          thClass: "titleColumn"
        },
        {
          key: "unit",
          slot: "HEAD_unit",
          label: "単位",
          thClass: "titleColumn"
        },
        {
          key: "unitCost",
          slot: "HEAD_unitCost",
          label: "単価",
          thClass: "titleColumn"
        },
        {
          key: "collectCycle",
          slot: "HEAD_collectCycle",
          label: "回収頻度",
          thClass: "titleColumn"
        },
        {
          key: "button",
          slot: "HEAD_button",
          label: "変更",
          tdClass: "classOneButton",
          thClass: "titleColumn"
        }
      ],
      options: [],
      idTable: "table-transport",
      emissionsData: [],
      emissionsDefault: [],
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      imgtext: IMText,
      isShowButton: false,
      isChangeData: false
    };
  },
  created() {
    this.onBeforeUnLoad();
  },
  methods: {
    onShowEmission() {
      this.getDataEmissionPopUp();
      this.$bvModal.show("fshi0011emissions");
    },

    getDataEmissionPopUp() {
      if (this.contractCode == 0) {
        const param1 = {
          BranchCode: this.currentBranchCode,
          WasteClass: this.currentWasteClass,
          ExistWasteCode: []
        };
        return this.getEmissionNotContract(param1);
      }
      const param2 = {
        BranchCode: this.currentBranchCode,
        ContractCode: this.contractCode,
        WasteClass: this.currentWasteClass,
        ExistWasteCode: this.emissionsDefault.map(item => {
          return item.wasteCode;
        })
      };
      return this.getEmission(param2);
    },

    onDelete() {
      this.dataSelection.item.isOnPopUp = true;
      this.emissionsDefault = this.emissionsDefault.filter(item => {
        return item.wasteCode !== this.dataSelection.item.wasteCode;
      });
      this.getDataEmissionPopUp();
      this.$refs["modal-confirm"].hideModal();
      this.isShowButton = true;
    },

    onPickDataToDelete(data) {
      this.dataSelection = data;
      if (!this.isUpdate) {
        this.titlePopupCustom = this.imgtext.popup.confirm;
        this.sizePopup = "sm";
        this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
          this.imgtext.general.btnDelete
        );
        return this.$refs["modal-confirm"].showModal();
      }
      return this.onShowEmission();
    },

    difArray(arr1, arr2) {
      return new Set([...new Set(arr1)].filter(x => !new Set(arr2).has(x)));
    },

    onCloseEmissionPopUp() {
      setTimeout(() => {
        this.$bvModal.hide("fshi0011emissions");
        this.$emit("update:emissionByWaste45", this.emissionsDefault);
      });
    },

    getEmission(param) {
      this.$store.dispatch("manifestModule/getEmission", param);
    },

    getEmissionNotContract(param) {
      this.$store.dispatch("manifestModule/getEmissionNotContract", param);
    },

    onProp(value) {
      this.emissionsDefault = value;
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
    dataEmissionSelection() {
      return this.$store.state.manifestModule.emission;
    },

    dataEmissionNotPopUp() {
      return this.$store.state.manifestModule.emissionPopUpNotContract;
    }
  },

  watch: {
    dataEmissionSelection() {
      const data = this.emissionsDefault.map(item => item.wasteCode);
      this.emissionsData = this.dataEmissionSelection.map(item => {
        return {
          ...item,
          isCheckboxed: false
        };
      });
      this.emissionsData = this.emissionsData.filter(item => {
        return !data.includes(item.wasteCode);
      });
    },

    dataEmissionNotPopUp() {
      const data = this.emissionsDefault.map(item => item.wasteCode);
      this.emissionsData = this.dataEmissionNotPopUp.map(item => {
        return {
          ...item,
          isCheckboxed: false
        };
      });
      this.emissionsData = this.emissionsData.filter(item => {
        return !data.includes(item.wasteCode);
      });
    }
  },

  mounted() {
    this.onProp(this.emissionByWaste45);
    this.$watch("emissionByWaste45", this.onProp);
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/custom/manifest/_emissionInformation.scss";
#emissionCard .card-header {
  padding: 5px 0px 5px 2px;
}
</style>