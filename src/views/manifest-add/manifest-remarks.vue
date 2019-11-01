<template>
  <div>
    <table class="table table-box table-sm remarkTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div>
            <div class="mt-1">備考</div>
          </div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">備考1</td>
        <td colspan="5" v-if="!isReadOnly">
          <b-input
            v-model.trim="remark.memo1"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-input>
        </td>
        <td colspan="5" v-if="isReadOnly">{{remark.memo1}}</td>

        <td class="titleColumn">備考2</td>
        <td colspan="5" v-if="!isReadOnly">
          <b-input
            v-model.trim="remark.memo2"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-input>
        </td>
        <td colspan="5" v-if="isReadOnly">{{remark.memo2}}</td>
      </tr>
      <tr>
        <td class="titleColumn">備考3</td>
        <td colspan="5" v-if="!isReadOnly">
          <b-input
            v-model.trim="remark.memo3"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-input>
        </td>
        <td colspan="5" v-if="isReadOnly">{{remark.memo3}}</td>
        <td class="titleColumn">備考4</td>
        <td colspan="5" v-if="!isReadOnly">
          <b-input
            v-model.trim="remark.memo4"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-input>
        </td>
        <td colspan="5" v-if="isReadOnly">{{remark.memo4}}</td>
      </tr>
      <tr>
        <td class="titleColumn">備考5</td>
        <td colspan="5" v-if="!isReadOnly">
          <b-input
            v-model.trim="remark.memo5"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-input>
        </td>
        <td colspan="5" v-if="isReadOnly">{{remark.memo5}}</td>
        <td colspan="6" class="align-center">
          <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="10">
              <div>
                <b-form-checkbox
                  v-if="isShowCheckBoxDeivery"
                  class="check-box-remark"
                  v-model="isCheck"
                  @input="getDataCheckBox"
                  :disabled="isVisible && !isUpdate && !isReadOnly"
                >予約マニフェストを引渡し日当日に自動登録する</b-form-checkbox>
              </div>
            </b-col>
            <b-col></b-col>
          </b-row>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import CountCharacter from "@/shared/CountCharacter";
export default {
  props: [
    "remark",
    "classByWaste",
    "isShowCheckBoxDeivery",
    "isVisible",
    "isUpdate",
    "isReadOnly"
  ],

  data() {
    return {
      isCheck: false,
      isChangeData: false
    };
  },

  created() {
    this.onBeforeUnLoad();
  },

  methods: {
    getDataCheckBox(data) {
      this.$emit("checkDeliveryDate", data);
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
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_remark.scss";

.align-center {
  align-items: center;
}
.check-box-remark {
  font-weight: bold;
}
</style>