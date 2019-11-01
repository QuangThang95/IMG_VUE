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
        <td colspan="5">
          <b-input v-model.trim="remark.memo1" @change="onChange(true)"></b-input>
        </td>
        <td class="titleColumn">備考2</td>
        <td colspan="5">
          <b-input v-model.trim="remark.memo2" @change="onChange(true)"></b-input>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">備考3</td>
        <td colspan="5">
          <b-input v-model.trim="remark.memo3" @change="onChange(true)"></b-input>
        </td>
        <td class="titleColumn">備考4</td>
        <td colspan="5">
          <b-input v-model.trim="remark.memo4" @change="onChange(true)"></b-input>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">備考5</td>
        <td colspan="5">
          <b-input v-model.trim="remark.memo5" @change="onChange(true)"></b-input>
        </td>
        <td colspan="6"></td>
      </tr>
    </table>
  </div>
</template>
<script>
import CountCharacter from "@/shared/CountCharacter";
export default {
  props: ["remark", "classByWaste", "isUpdate"],
  data() {
    return {
      isChangeData: false
    };
  },
  created() {
    this.onBeforeUnLoad();
  },

  methods: {
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
</style>