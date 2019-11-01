<template>
  <div>
    <b-card :class="classByWaste" header="集約条件">
      <b-row slot="header">
        <b-col cols="md-2">集約条件</b-col>
        <b-col cols="md-10">
          <b-form-checkbox id="checkbox-2" v-model="data.aggregateFlag" @input="setDisabledGroup">{{imgText.general.fshi0014.item8}}</b-form-checkbox>
        </b-col>
      </b-row>
      <table class="table table-sm">
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey1}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select v-model="data.groupKey1" :options="options" @change="disableCbx" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregationCondition}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select
              v-model="data.groupCondition1"
              :options="optionsCondition1"
              :disabled="isDisable1"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey2}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select v-model="data.groupKey2" :options="options" @change="disableCbx2" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregationCondition2}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select
              v-model="data.groupCondition2"
              :options="optionsCondition2"
              :disabled="isDisable2"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey3}}
          </td>
          <td colspan="4">
            <b-form-select v-model="data.groupKey3" :options="options" @change="disableCbx3" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregationCondition3}}
          </td>
          <td colspan="4">
            <b-form-select
              v-model="data.groupCondition3"
              :options="optionsCondition3"
              :disabled="isDisable3"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey4}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select v-model="data.groupKey4" :options="options" @change="disableCbx4" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregationCondition4}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select
              v-model="data.groupCondition4"
              :options="optionsCondition4"
              :disabled="isDisable4"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey5}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select v-model="data.groupKey5" :options="options" @change="disableCbx5" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregationCondition5}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select
              v-model="data.groupCondition5"
              :options="optionsCondition5"
              :disabled="isDisable5"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey6}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select v-model="data.groupKey6" :options="options" @change="disableCbx6" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregationCondition6}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select
              v-model="data.groupCondition6"
              :options="optionsCondition6"
              :disabled="isDisable6"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.aggregateKey7}}
          </td>
          <td colspan="4" class="fix-height">
            <b-form-select v-model="data.groupKey7" :options="options" @change="disableCbx7" :disabled="isDisableGroup"></b-form-select>
          </td>
          <td colspan="2" class="titleColumn">{{imgText.general.fshi0014.aggregationCondition7}}</td>
          <td colspan="4" class="fix-height">
            <b-form-select
              v-model="data.groupCondition7"
              :options="optionsCondition7"
              :disabled="isDisable7"
            ></b-form-select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">{{imgText.general.fshi0014.reportTitle}}</td>
          <td colspan="10" class="fix-height">
            <b-row>
              <b-col cols="11">
                <b-form-input v-model="data.reportTitle"></b-form-input>
              </b-col>
              <b-col cols="1">
                <div class="float-right">
                  <b-button
                    class="btn-form"
                    size="sm"
                    @click="onCreate"
                    :disabled="isDisableOnCreate"
                    v-if = "!isReadOnly"
                  >{{imgText.general.fshi0014.aggregate}}</b-button>
                </div>
              </b-col>
            </b-row>
          </td>
        </tr>
      </table>
    </b-card>
  </div>
</template>
<script>
import IMText from "@/data/img-text";
import { handleOutput } from "@/shared/utilities";
import { HttpStatus } from "@/constants/HttpStatus";

export default {
  props: ["condition", "classByWaste", "customerCode", "wasteClass", "isDisableOnCreate", "isCheckBranch", "isReadOnly"],
  components: {},
  data() {
    return {
      displayDateFrom: null,
      displayDateTo: null,
      imgText: IMText,
      selected: "",

      status1: false,
      status2: false,
      data: {
        groupKey1: "",
        groupKey2: "",
        groupKey3: "",
        groupKey4: "",
        groupKey5: "",
        groupKey6: "",
        groupKey7: "",

        groupCondition1: "",
        groupCondition2: "",
        groupCondition3: "",
        groupCondition4: "",
        groupCondition5: "",
        groupCondition6: "",
        groupCondition7: "",
        aggregateFlag: false,
        reportTitle: "レポートタイトル"
      },

      selectedCondition1: null,
      selectedCondition2: null,
      selectedCondition3: null,
      selectedCondition4: null,
      selectedCondition5: null,
      selectedCondition6: null,
      selectedCondition7: null,

      options: [
        {value: "1", text: "グループ" }, // group
        {value: "2", text: "事業場" }, // branch
        {value: "3", text: "引き渡し日" }, // delivery date
        {value: "4", text: "収集運搬業者" }, // supllier
        {value: "5", text: "処分事業者" }, // factory
        {value: "6", text: "排出物分類" }, // waste
        {value: "7", text: "処分方法" } // dispose
      ],

      optionsCondition1: [],
      optionsCondition2: [],
      optionsCondition3: [],
      optionsCondition4: [],
      optionsCondition5: [],
      optionsCondition6: [],
      optionsCondition7: [],

      optionsDelivery: [
        {value: "1", text: "日別" }, // daily
        {value: "2", text: "月別" }, // monthly
        {value: "3", text: "年別" } // yearly
      ],

      optionsWasteClass: [
        {value: "4", text: "大分類" }, // major class
        {value: "5", text: "中分類" }, // mediun class
        {value: "6", text: "小分類" }, // small class
        {value: "7", text: "細分類" } // sub classs
      ],

      isDisable1: true,
      isDisable2: true,
      isDisable3: true,
      isDisable4: true,
      isDisable5: true,
      isDisable6: true,
      isDisable7: true,

      isDisableGroup: false
    };
  },

  created(customerCode, wasteClass) {
    this.visableButtonCreate(this.customerCode, this.wasteClass);
  },

  methods: {
    onCreate() {
      this.$emit("onCreate", this.data);
    },

    initParams() {
      const param = {
        customerCode: this.customerCode,
        wasteClass: this.wasteClass
      };
      return param;
    },

    visableButtonCreate() {
      let param = this.initParams();
      this.$store
        .dispatch("reportModule/visibleButtonCreate", param)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.isDisableOnCreate = response.data.result;
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    },

    // async created() {},

    disableCbx(value) {
      if (value == "3") {
        this.isDisable1 = false;
        this.optionsCondition1 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition1 = this.optionsWasteClass),
            (this.isDisable1 = false);
        } else {
          this.isDisable1 = true;
          this.optionsCondition1 = [];
        }
      }
    },

    disableCbx2(value) {
      if (value == "3") {
        this.isDisable2 = false;
        this.optionsCondition2 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition2 = this.optionsWasteClass),
            (this.isDisable2 = false);
        } else {
          this.isDisable2 = true;
          this.optionsCondition2 = [];
        }
      }
    },

    disableCbx3(value) {
      if (value == "3") {
        this.isDisable3 = false;
        this.optionsCondition3 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition3 = this.optionsWasteClass),
            (this.isDisable3 = false);
        } else {
          this.isDisable3 = true;
          this.optionsCondition3 = [];
        }
      }
    },

    disableCbx4(value) {
      if (value == "3") {
        this.isDisable4 = false;
        this.optionsCondition4 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition4 = this.optionsWasteClass),
            (this.isDisable4 = false);
        } else {
          this.isDisable4 = true;
          this.optionsCondition4 = [];
        }
      }
    },

    disableCbx5(value) {
      if (value == "3") {
        this.isDisable5 = false;
        this.optionsCondition5 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition5 = this.optionsWasteClass),
            (this.isDisable5 = false);
        } else {
          this.isDisable5 = true;
          this.optionsCondition5 = [];
        }
      }
    },

    disableCbx6(value) {
      if (value == "3") {
        this.isDisable6 = false;
        this.optionsCondition6 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition6 = this.optionsWasteClass),
            (this.isDisable6 = false);
        } else {
          this.isDisable6 = true;
          this.optionsCondition6 = [];
        }
      }
    },

    disableCbx7(value) {
      if (value == "3") {
        this.isDisable7 = false;
        this.optionsCondition7 = this.optionsDelivery;
      } else {
        if (value == "6") {
          (this.optionsCondition7 = this.optionsWasteClass),
            (this.isDisable7 = false);
        } else {
          this.isDisable7 = true;
          this.optionsCondition7 = [];
        }
      }
    },

    setDisabledGroup(data) {
      if(data){
        this.isDisableGroup = true;
        return;
      }
      this.isDisableGroup = false;
    }
  },

  watch: {
    isCheckBranch() {
      if(this.isCheckBranch) { 
        this.options.shift();
        return;
      }
      const option = {value: "1", text: "グループ" };
      this.options.unshift(option);
    }
  }
};
</script>
<style>
</style>
