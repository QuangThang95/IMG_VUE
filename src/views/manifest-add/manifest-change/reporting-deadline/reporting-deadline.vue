<template>
  <div>
    <table class="table table-box table-sm deadlineTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="mt-1">報告期限</div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">運搬終了報告期限</td>
        <td colspan="1">{{reportDeadline.disposeReportLimit | formatDateDisplay}}</td>
        <td class="titleColumn">処分終了報告期限</td>
        <td colspan="1">{{reportDeadline.disposeReportLimit| formatDateDisplay}}</td>
        <td class="titleColumn">最終処分終了報告期限</td>
        <td colspan="1">{{reportDeadline.finalDisposeReportLimit |formatDateDisplay}}</td>
        <td class="titleColumn">予約情報有効期限</td>
        <td colspan="1">{{reportDeadline.reserveLimit |formatDateDisplay}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["reportDeadline",'classByWaste']
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_deadlineReport.scss";

.deadlineTable.table td {
  table-layout: fixed;
  width: 130px;
}
</style>
