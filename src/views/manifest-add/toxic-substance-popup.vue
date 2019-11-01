<template>
  <div>
    <b-modal
      hide-footer
      hide-header
      id="fshi0011hazardous"
      size="lg"
      centered
      no-close-on-backdrop
      style="height: 800px"
    >
      <h6 class="fontColor mt-2 mb-4">有害物質選択</h6>
      <b-row>
        <b-col>
          <b-container fluid>
            <b-table
              :fields="fields"
              :items="dataSubstance"
              :bordered="true"
              :outlined="true"
              :small="true"
              :id="idTable"
              sticky-header="stickerHeader"
            >
              <template slot="isCheckBox" class="text-center" slot-scope="data">
                <b-form-checkbox v-model="data.value" @input="getDataCheckBox(data)"></b-form-checkbox>
              </template>
            </b-table>
          </b-container>
        </b-col>
      </b-row>
      <b-button class="btn-form float-right mt-3" size="sm" @click="onClosePopUp">追加</b-button>
    </b-modal>
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTable.vue";
export default {
  components: {
    BaseTable
  },

  props: ["countEmission", "indexEmission", "toxics", "dataSubstance"],

  data() {
    return {
      fields: [
        {
          key: "toxicName",
          label: "有害物質名",
          slot: "HEAD_toxicName"
        },
        {
          key: "isCheckBox",
          slot: "HEAD_isCheckBox",
          label: "選択",
          tdClass: "classOneButton"
        }
      ],
      idTable: "fshi0011hazardous",
      toxicData: {},
      stickerHeader: "500px"
    };
  },

  created() {},

  methods: {
    getDataCheckBox(data) {
      let index = this.indexEmission;
      data.item.isCheckBox = data.value;
      if (data.value) {
        if (Object.keys(this.toxicData).length > 0 && this.toxicData[index]) {
          const result = [];
          result.push(data.item);
          this.toxicData[index] = [...this.toxicData[index], ...result];
        } else {
          this.toxics.push(data.item);
          this.toxicData[index] = this.toxics;
        }
      } else {
        if (this.toxicData[index]) {
          this.toxicData[index] = this.toxicData[index].filter(toxic => {
            return toxic.id !== data.item.id;
          });
        }
      }
    },

    onClosePopUp() {
      this.$store.dispatch("manifestModule/saveEmissionToxic", this.toxicData);
      this.$emit("dataSelectEmission");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
