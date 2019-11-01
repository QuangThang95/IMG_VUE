<template>
  <div>
    <table class="table table-box table-sm updateReportTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="mt-1" style="float:left">更新日</div>
          <b-button class="btn-form float-right" size="sm" @click="showHistory">変更履歴</b-button>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">登録日時</td>
        <td colspan="1">{{update.createDate | formatDate}}</td>
        <td class="titleColumn">最終更新日時</td>
        <td colspan="1">{{update.lastDate | formatDate}}</td>
        <td class="titleColumn">JWNET登録日</td>
        <td colspan="1">{{update.jwnetEntryDate | formatDateDisplay}}</td>
        <td class="titleColumn">JWNET修正日</td>
        <td colspan="1">{{update.jwnetModifyDate | formatDateDisplay}}</td>
        <td class="titleColumn">JWNET取消日</td>
        <td colspan="1">{{update.jwnetCancelDate | formatDateDisplay}}</td>
        <td class="titleColumn">JWNET最終更新日</td>
        <td colspan="1">{{update.jwnetLastUpdate | formatDateDisplay}}</td>
      </tr>
    </table>
      <FormHistoryPopUp />
  </div>
</template>

<script>
import FormHistoryPopUp from "../../history-popup.vue";
export default {
  props: ["update",'classByWaste'],
  components:{
    FormHistoryPopUp
  },
  data() {
    return {
      
    }
  },
  methods: {
    showHistory(){
      this.$bvModal.show("sshi0033-history");
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_updateReport.scss";
.updateReportTable.table td {
  table-layout: fixed;
  width: 130px;
}
</style>
