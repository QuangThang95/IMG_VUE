<template>
  <div>
    <b-container fluid>
      <b-modal size="xl" id="fshi0011-final" hide-header hide-footer centered no-close-on-backdrop>
        <h6 class="fontColor mt-2 mb-4">最終処分事業場追加</h6>
        <div>
          <b-row class="mb-3">
            <b-col>
              <table class="table table-box table-sm">
                <tr>
                  <td class="titleColumn">処分業者</td>
                  <td colspan="3">{{name.supplierName}}</td>
                </tr>
              </table>
            </b-col>
            <b-col>
              <table class="table table-box table-sm">
                <tr>
                  <td class="titleColumn">処分業者事業場</td>
                  <td colspan="3">{{name.factoryName}}</td>
                </tr>
              </table>
            </b-col>
          </b-row>
          <div>
            <b-row>
              <b-col>
                <b-table
                  :fields="fields"
                  :items="finalDispose"
                  :bordered="true"
                  :outlined="true"
                  :small="true"
                  id="table-popup-final"
                  sticky-header="stickerHeader"
                >
                  <template slot="isCheck" slot-scope="data">
                    <b-form-checkbox v-model="data.item.isCheck"></b-form-checkbox>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </div>

          <div class="float-right mt-2 mb-4">
            <b-button class="btn-form ml-4" size="sm" @click="onClosePopUp">追加</b-button>
          </div>
        </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import FormatData from "@/shared/FomatData";
export default {
  props: ["dispose", "currentCustomerCode", "finalDispose", "name"],
  data() {
    return {
      fields: [
        {
          key: "finalFactoryName",
          slot: "HEAD_finalFactoryName",
          label: "事業場名"
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: "所在地"
        },

        {
          key: "tel",
          slot: "HEAD_tel",
          label: "TEL",
          tdAttr: {
            "x-ms-format-detection": "none"
          },
          formatter: value => {
            return FormatData.formatTelphone(value);
          }
        },
        {
          key: "disposeName",
          slot: "HEAD_disposeName",
          label: "処分方法"
        },
        {
          key: "capability",
          slot: "HEAD_capability",
          label: "施設処理能力"
        },
        {
          key: "isCheck",
          slot: "HEAD_isCheck",
          label: "選択",
          tdClass: "classOneButton"
        }
      ],
      pickerData: [],
      disposeEnd: {},
      stickerHeader: "500px"
    };
  },

  created() {},

  methods: {
    onClosePopUp() {
      const data = this.finalDispose.filter(item => item.isCheck);
      if (data.length > 0) {
        this.getDataSelectionDisposeEnd(data);
      }
      this.$emit("dataSelected");
    },

    getDataSelectionDisposeEnd(param) {
      this.$store.dispatch(
        "manifestModule/getDataSelectionDisposePopUp",
        param
      );
    }
  }
};
</script>

<style lang="scss" scoped>
table td {
  table-layout: fixed;
  width: 180px;
}
</style>
