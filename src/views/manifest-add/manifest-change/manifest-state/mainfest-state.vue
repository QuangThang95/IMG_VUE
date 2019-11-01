<template>
<div>
    <table class="table table-box table-sm stateTable">
        <tr>
            <th colspan="12" :class="classByWaste">
                <div class="mt-1">マニフェスト状態</div>
            </th>
        </tr>
        <tr>
            <td class="titleColumn">区分</td>
            <td colspan="1">{{manifestState.manifestClass}}</td>
            <td class="titleColumn">承認待ち</td>
            <td colspan="1">{{manifestState.modifyPendingFlag}}</td>
            <td class="titleColumn">運搬終了報告</td>
            <td colspan="1">{{manifestState.transportReportFlag}}</td>
            <td class="titleColumn">処分終了報告</td>
            <td colspan="1">{{manifestState.disposeReportFlag}}</td>
            <td class="titleColumn">最終処分終了報告</td>
            <td colspan="1">{{manifestState.finalDispodeReportFlag}}</td>
            <td class="titleColumn">確定数量</td>
            <td colspan="1">{{manifestState.confirmQuantity}}</td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    props: ['manifestState','classByWaste']
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_stateReport.scss";

.stateTable.table td {
    table-layout: fixed;
    width: 130px;
}
</style>
