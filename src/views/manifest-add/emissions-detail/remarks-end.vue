<template>
  <div>
    <table class="table table-box table-sm emissionWaste45">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="mt-1" style="float:left">更新日</div>
          <b-button class="btn-form float-right" size="sm" @click="showHistory">変更履歴</b-button>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">変更履歴</td>
        <td colspan="5">{{date.createDate| formatDate}}</td>
        <td class="titleColumn">登録日時</td>
        <td colspan="5">{{date.lastUpdate | formatDate}}</td>
      </tr>
    </table>
    <FormHistoryPopUp />
  </div>
</template>
<script>
import FormHistoryPopUp from "../history-popup.vue";
export default {
  props: ["classByWaste", "date", "general4", "general5"],
  components: {
    FormHistoryPopUp
  },
  methods: {
    showHistory() {
      this.$bvModal.show("sshi0033-history");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_emssionWaste45.scss";
</style>