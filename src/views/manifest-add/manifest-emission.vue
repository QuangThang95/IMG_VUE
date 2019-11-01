<template>
  <div>
    <table class="table table-box table-sm emisionTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="mt-1">排出情報</div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">状態</td>
        <td colspan="2">{{dischargeInformation.status}}</td>
        <td class="titleColumn">マニフェスト番号</td>
        <td colspan="2">{{dischargeInformation.manifestNumber}}</td>
        <td class="titleColumn">
          <span class="asterisk">*</span>引渡し担当者
        </td>
        <td colspan="2">
          <b-form-select
            v-if="!isReadOnly"
            v-model="dischargeInformation.deliveryUserCode"
            :options="manifestByCustumer"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-form-select>
          <b-form-select
            v-if="isReadOnly"
            v-model="dischargeInformation.deliveryUserCode"
            :options="manifestByCustumer"
            disabled
          ></b-form-select>
        </td>
        <td class="titleColumn">登録担当者</td>
        <td colspan="2">
          <label>{{nameRegistation}}</label>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">連絡番号1</td>
        <td colspan="2" v-if="!isReadOnly">
          <b-form-input
            type="text"
            v-model="dischargeInformation.contractNumber1"
            :disabled="isVisible && !isUpdate "
            @change="onChange(true)"
          ></b-form-input>
        </td>
        <td colspan="2" v-if="isReadOnly">{{dischargeInformation.contractNumber1}}</td>
        <td class="titleColumn">連絡番号2</td>
        <td colspan="2" v-if="!isReadOnly">
          <b-form-input
            type="text"
            v-model="dischargeInformation.contractNumber2"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-form-input>
        </td>
        <td colspan="2" v-if="isReadOnly">{{dischargeInformation.contractNumber2}}</td>
        <td class="titleColumn">連絡番号3</td>
        <td colspan="5" v-if="!isReadOnly">
          <b-form-input
            type="text"
            v-model="dischargeInformation.contractNumber3"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-form-input>
        </td>
        <td colspan="5" v-if="isReadOnly">{{dischargeInformation.contractNumber3}}</td>
      </tr>
    </table>

    <b-card
      header-tag="header"
      body-class="p-0 m-0"
      id="card-Emission"
      footer-tag="footer"
      :class="classByWaste"
    >
      <div slot="header" class="333">
        <strong>排出物情報</strong>
        <b-button
          v-if="isShowButton"
          class="float-right btn-form mr-1"
          size="sm"
          @click="showPopUp"
        >追加</b-button>
      </div>
      <div v-if="emissionsDefault.length > 0">
        <b-table
          :fields="fields"
          :items="emissionsDefault"
          :bordered="true"
          :outlined="true"
          :small="true"
          :id="idTable"
          class="emission"
        >
          <template slot="unitQuantity" slot-scope="data">
            <b-form-input
              v-model.trim="data.item.unitQuantity"
              v-if="!isReadOnly"
              @change="onChange(true)"
            ></b-form-input>
            <span v-if="isReadOnly">{{data.value}}</span>
          </template>
          <template slot="unit" slot-scope="data">
            <b-form-select
              :options="data.value"
              v-model="data.item.unitCode"
              :disabled="isReadOnly"
              @change="onChange(true)"
            ></b-form-select>
          </template>
          <template slot="pack" slot-scope="data">
            <b-form-select
              :options="data.value"
              v-model="data.item.packCode"
              :disabled="isReadOnly"
              @change="onChange(true)"
            ></b-form-select>
          </template>
          <template slot="packQuantity" slot-scope="data">
            <b-form-input
              v-if="!isReadOnly"
              v-model.trim="data.item.packQuantity"
              @change="onChange(true)"
            ></b-form-input>
            <span v-if="isReadOnly">{{data.value}}</span>
          </template>
          <template slot="decision" slot-scope="data">
            <b-form-select
              :options="data.value"
              v-model="data.item.decisionCode"
              :disabled="isReadOnly"
              @change="onChange(true)"
            ></b-form-select>
          </template>
          <template slot="button" slot-scope="data">
            <b-button
              class="btn-form btn-emission"
              v-if="!isUpdate"
              size="sm"
              :disabled="isReadOnly"
              @click="onPickDataToDelete(data)"
            >削除</b-button>
            <b-button
              class="btn-form btn-emission"
              v-if="isUpdate"
              size="sm"
              :disabled="isReadOnly"
              @click="onPickDataToDelete(data)"
            >変更</b-button>
          </template>
          <template slot="toxicCode" slot-scope="toxic">
            <label v-for="item in toxic.value" v-bind:key="item.toxicCode">, {{item.toxicName}}</label>
            <b-button v-if="!isReadOnly" class="btn-form float-right" @click="showToxic(toxic)">
              <i class="fa fa-caret-down" aria-hidden="true"></i>
            </b-button>
          </template>
          <!-- fomat header -->
          <template slot="NO" slot-scope="data">{{ data.index + 1 }}</template>
          <template slot="HEAD_wastename" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
          <template slot="HEAD_unitQuantity" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
          <template slot="HEAD_unit" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
          <template slot="HEAD_decision" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
          <template slot="HEAD_pack" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
        </b-table>
      </div>
    </b-card>
    <EmissionPopUp
      @onCloseEmissionPopUp="onCloseEmissionPopUp"
      :emissionsData="emissionsData"
      :general1="general1"
      :general2="general2"
      :general3="general3"
      :countEmission="countEmission"
      :isManifest45="isManifest45"
      :isUpdate="isUpdate"
    ></EmissionPopUp>
    <hazardous
      @dataSelectEmission="dataSelectEmission"
      :countEmission="countEmission"
      :indexEmission="indexEmission"
      :toxics="toxics"
      :dataSubstance="dataSubstance"
    ></hazardous>
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
import EmissionPopUp from "./emission-popup.vue";
import CountCharacter from "@/shared/CountCharacter";
import hazardous from "./toxic-substance-popup.vue";
import { isNullOrUndefined } from "@/shared/utilities";
import { current, common } from "@/shared/utilities";
import IMText from "@/data/img-text";
import BasePopupMessage from "@/components/BasePopupMessage.vue";

export default {
  props: [
    "manifestByCustumer",
    "nameRegistation",
    "currentBranchCode",
    "contractCode",
    "currentWasteClass",
    "dischargeInformation",
    "general1",
    "general2",
    "general3",
    "emssions",
    "countEmission",
    "isUpdate",
    "isVisible",
    "classByWaste",
    "isManifest45",
    "isReadOnly"
  ],

  components: {
    EmissionPopUp,
    hazardous,
    BasePopupMessage
  },

  data() {
    return {
      currentCustomerCode: current.customer().customerCode,
      fields: [
        {
          key: "NO",
          slot: "HEAD_NO",
          label: "NO",
          thClass: "indexClass titleColumn"
        },
        {
          key: "bigName",
          slot: "HEAD_bigName",
          label: "大分類",
          thClass: " titleColumn"
        },
        {
          key: "wasteCode",
          slot: "HEAD_wasteCode",
          label: "分類コード",
          thClass: "wasteEmssion titleColumn"
        },
        {
          key: "wasteName",
          slot: "HEAD_wasteName",
          label: "排出物名",
          thClass: "wasteEmssion titleColumn"
        },
        {
          key: "unitQuantity",
          slot: "HEAD_unitQuantity",
          label: "数量",
          thClass: "unitQuantityClass titleColumn"
        },
        {
          key: "unit",
          slot: "HEAD_unit",
          label: "数量単位",
          thClass: "unitQuantityClass titleColumn"
        },
        {
          key: "pack",
          slot: "HEAD_pack",
          label: "荷姿",
          thClass: "unitQuantityClass titleColumn"
        },
        {
          key: "packQuantity",
          slot: "HEAD_packQuantity",
          label: "荷姿数量",
          thClass: "unitQuantityClass titleColumn"
        },
        {
          key: "decision",
          slot: "HEAD_decision",
          label: "数量確定者",
          thClass: "decisionCodeClass titleColumn"
        },
        {
          key: "toxicCode",
          slot: "HEAD_toxicCode",
          label: "有害物質",
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
      idTable: "sshi0032-table",
      selectedUnitCode: 0,

      contractNumber: {
        contractNumber1: "",
        contracNumber2: "",
        contractNumber3: ""
      },
      nameToxic: "",
      emsisionData: {},
      toxicSubstance: {},
      indexEmission: -1,
      toxics: [],
      dataSubstance: [],
      originalData: [],
      emissionPopUpData: [],
      emissionsData: [],

      emissionsDefault: [],
      imgtext: IMText,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      isShowButton: false,
      dataSelection: {},
      isChangeData: false,
    };
  },
  created() {
    this.onBeforeUnLoad();
    this.getToxicSubstance();
  },

  methods: {
    showPopUp() {
      this.getDataEmissionPopUp();
      this.$bvModal.show("fshi0011emissions");
    },

    showToxic(data) {
      this.toxics = [];
      this.indexEmission = data.index + 1;
      this.emsisionData = data.item;

      if (data.item.listToxic.length > 0) {
        const arr = data.item.toxicCode.map(item => {
          return {
            ...item,
            id:
              this.dataSubstance.findIndex(
                sub => sub.toxicCode == item.toxicCode
              ) + 1,
            isCheckBox: true
          };
        });
        this.toxicSubstance[this.indexEmission] = [...arr];
      }
      if (
        Object.keys(this.toxicSubstance).length > 0 &&
        this.toxicSubstance[this.indexEmission]
      ) {
        this.dataSubstance = this.dataSubstance.map(item => {
          const result = this.toxicSubstance[this.indexEmission].find(
            toxic => toxic.id === item.id
          );
          const i = { ...item, isCheckBox: false };
          return result ? result : i;
        });
      } else {
        this.getToxicSubstance();
      }
      this.$bvModal.show("fshi0011hazardous");
    },

    dataSelectEmission() {
      this.emissionsDefault = this.emissionsDefault.map(item => {
        if (item.id === this.emsisionData.id) {
          item.toxicCode = this.dataSubstance.filter(i => i.isCheckBox);
        }
        return item;
      });
      this.$bvModal.hide("fshi0011hazardous");
    },

    difArray(arr1, arr2) {
      return new Set([...new Set(arr1)].filter(x => !new Set(arr2).has(x)));
    },

    onCloseEmissionPopUp() {
      if (this.isUpdate) {
        this.dataSelection.item.isOnPopUp = true;
        this.emissionsDefault = this.emissionsDefault.filter(
          item => item.wasteCode !== this.dataSelection.item.wasteCode
        );
        this.getDataEmissionPopUp();
      }
      this.$bvModal.hide("fshi0011emissions");
      this.$emit("update:emssions", this.emissionsDefault);
    },

    getDataEmissionPopUp() {
      const params = {
        BranchCode: this.currentBranchCode,
        ContractCode: this.contractCode,
        WasteClass: this.currentWasteClass,
        ExistWasteCode: this.emissionsDefault.map(item => {
          return item.wasteCode;
        })
      };
      this.getEmission(params);
    },
    onDelete() {
      this.dataSelection.item.isOnPopUp = true;
      this.emissionsDefault = this.emissionsDefault.filter(item => {
        return item.wasteCode !== this.dataSelection.item.wasteCode;
      });
      this.getDataEmissionPopUp();
      if (
        Object.keys(this.toxicSubstance).length > 0 &&
        this.toxicSubstance[this.indexEmission]
      ) {
        this.toxicSubstance[this.indexEmission] = [];
      }
      this.$refs["modal-confirm"].hideModal();
      this.$emit("update:emssions", this.emissionsDefault);
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
      return this.showPopUp();
    },

    getDataInput(data) {
      data.item.unitQuantity = data.value;
    },

    getPackInput(data) {
      data.item.packQuantity = data.value;
    },

    destructorObj(arr) {
      return arr.map(item => {
        return {
          value: item.id,
          text: item.data1
        };
      });
    },
    getToxicSubstance() {
      this.$store.dispatch("manifestModule/getToxic");
    },
    getEmission(param) {
      this.$store.dispatch("manifestModule/getEmission", param);
    },

    onProp(value) {
      this.emissionsDefault = value;
    },

    onChange(data) {
      this.isChangeData = data;
      this.$store.dispatch("manifestModule/checkDirtyForm", true);
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
    dataEmission() {
      return this.$store.state.manifestModule.emissionToxic;
    },
    dataToxicPopUp() {
      return this.$store.state.manifestModule.toxic;
    },
    dataEmissionSelection() {
      return this.$store.state.manifestModule.emission;
    }
  },

  mounted() {
    this.onProp(this.emssions);
    this.$watch("emssions", this.onProp);
  },

  watch: {
    dataEmission() {
      this.toxicSubstance = this.dataEmission;
    },

    dataToxicPopUp() {
      this.originalData = this.dataToxicPopUp.map((item, index) => {
        return { ...item, isCheckBox: false, id: index + 1 };
      });
      this.dataSubstance = [...this.originalData];
    },

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
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/custom/manifest/_manifest.scss";
.emisionTable.table td {
  table-layout: fixed;
  width: 150px;
}
.btn-emission {
  margin-top: 5px;
}
</style>