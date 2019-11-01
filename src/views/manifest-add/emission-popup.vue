<template>
  <div>
    <b-modal
      hide-footer
      hide-header
      id="fshi0011emissions"
      size="huge"
      style="height: 800px"
      centered
      @hidden="onHidden"
    >
      <BaseMessageError :message="message" :title="title" />
      <b-row>
        <b-col>
          <b-container fluid>
            <b-table
              :fields="fields"
              :items="emissionsData"
              :bordered="true"
              :outlined="true"
              :small="true"
              :id="idTable"
              sticky-header="stickerHeader"
            >
              <template slot="isCheckboxed" class="text-center" slot-scope="data">
                <b-form-checkbox v-model="data.item.isCheckboxed"></b-form-checkbox>
              </template>
            </b-table>
          </b-container>
        </b-col>
      </b-row>
      <b-button class="btn-form float-right mt-3" size="sm" @click="onCloseEmissionPopUp">追加</b-button>
    </b-modal>
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTable.vue";
import BaseMessageError from "@/components/BaseMessageError.vue";
export default {
  components: {
    BaseTable,
    BaseMessageError
  },

  props: [
    "emissionsData",
    "general1",
    "general2",
    "general3",
    "isManifest45",
    "isUpdate"
  ],
  data() {
    return {
      fields: [
        {
          key: "data1",
          label: "大分類",
          slot: "HEAD_data1"
        },
        {
          key: "data2",
          label: "中分類",
          slot: "HEAD_data2"
        },
        {
          key: "data3",
          label: "小分類",
          slot: "HEAD_data3"
        },
        {
          key: "wasteName",
          label: "排出物名",
          slot: "HEAD_wasteName"
        },
        {
          key: "wasteCode",
          label: "分類コード",
          slot: "HEAD_wasteCode"
        },
        {
          key: "memo",
          label: "備考",
          slot: "HEAD_memo"
        },
        {
          key: "isCheckboxed",
          slot: "HEAD_isCheckboxed",
          label: "選択",
          tdClass: "classOneButton"
        }
      ],
      idTable: "fshi0011emissions",
      position: -1,
      emissionPopUp: [],
      emissionPopUpData: [],
      title: "排出物追加",
      message: [],
      stickerHeader: "500px"
    };
  },

  created() {},

  methods: {
    onHidden() {
      this.message = [];
    },
    onCloseEmissionPopUp() {
      this.message = [];
      if (this.isManifest45) {
        return this.dataEmisson45();
      }
      return this.dataEmission123();
    },

    dataEmission123() {
      const result = this.emissionsData.filter(item => item.isCheckboxed);
      if (result.length > 0) {
        this.emissionPopUpData = result.map(data => {
          return {
            bigName: data.data1,
            wasteCode: data.wasteCode,
            wasteName: data.wasteName,
            unitCode: 1,
            toxicCode: null,
            decisionCode: this.general3[
              this.general3.findIndex(i => i.text === "処分業者")
            ].value,
            unitQuantity: 1,
            packCode: this.general2[
              this.general2.findIndex(p => p.text === "バラ")
            ].value,
            packQuantity: null,
            unit: this.general1,
            pack: this.general2,
            decision: this.general3,
            isOnPopUp: false
          };
        });
        this.getDataEmissionPopUp(this.emissionPopUpData);
        if (this.isUpdate) {
          if (this.emissionPopUpData.length === 1) {
            return this.$emit("onCloseEmissionPopUp");
          }
          return this.message.push("レコードは1件のみで選択できる。");
        }
        return this.$emit("onCloseEmissionPopUp");
      }
      return this.$emit("onCloseEmissionPopUp");
    },

    dataEmisson45() {
      const result = this.emissionsData.filter(item => item.isCheckboxed);
      if (result.length > 0) {
        this.emissionPopUpData = result.map(data => {
          return {
            sectionNumber: 0,
            data1: data.data1,
            wasteCode: data.wasteCode,
            wasteName: data.wasteName,
            unitCode: data.unitCode,
            unitQuantity: data.unitQuantity,
            unitCost: data.unitCost,
            collectCycle: data.collectCycle,
            unit: this.general1
          };
        });
        this.getDataEmissionPopUp(this.emissionPopUpData);
      }
      this.$emit("onCloseEmissionPopUp");
    },

    getDataEmissionPopUp(param) {
      this.$store.dispatch("manifestModule/getDataEmissonPopUp", param);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
