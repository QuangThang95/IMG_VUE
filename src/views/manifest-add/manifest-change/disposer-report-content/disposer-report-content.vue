<template>
  <div>
    <table class="table table-box table-sm disposeReportTable">
      <tr>
        <th colspan="16" :class="classByWaste">
          <div class="mt-1">処分業者報告内容</div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">確認待ち</td>
        <td colspan="1">{{reportDispose.disposeReportPendingFlag}}</td>
        <td class="titleColumn">報告区分</td>
        <td colspan="1">{{reportDispose.disposeReportCode}}</td>
        <td class="titleColumn">処分終了日</td>
        <td colspan="1">{{reportDispose.disposeDate | formatDateDisplay}}</td>
        <td class="titleColumn">廃棄物受領日</td>
        <td colspan="1">{{reportDispose.acceptDate | formatDateDisplay}}</td>
        <td class="titleColumn">受入量</td>
        <td colspan="1">{{reportDispose.acceptQuantity}}</td>
        <td class="titleColumn">処分担当者</td>
        <td colspan="1">{{reportDispose.disposeStaff}}</td>
        <td class="titleColumn">運搬担当者</td>
        <td colspan="1">{{reportDispose.transportStaff}}</td>
        <td class="titleColumn">車両番号</td>
        <td colspan="1">{{reportDispose.vehicleNumber}}</td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="2">処分終了報告日</td>
        <td colspan="2">{{reportDispose.disposeReportDate | formatDateDisplay}}</td>
        <td class="titleColumn">報告担当者</td>
        <td colspan="2">{{reportDispose.reportStaff}}</td>
        <td class="titleColumn" colspan="2">最終処分終了日</td>
        <td colspan="2">{{reportDispose.finalDisposeDate | formatDateDisplay}}</td>
        <td class="titleColumn" colspan="2">最終処分終了報告日</td>
        <td colspan="3">{{reportDispose.finalDisposeReportDate | formatDateDisplay}}</td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">備考</td>
        <td colspan="15"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["reportDispose",'classByWaste']
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_disposalReport.scss";
.disposeReportTable.table td {
  table-layout: fixed;
  width: 150px;
}
</style>
