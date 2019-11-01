<template>
  <div>
    <table class="table table-box table-sm carrierTable">
        <tr>
            <th colspan="12" :class="classByWaste">
                <div class="mt-1">収集運搬業者報告内容</div>
            </th>
        </tr>
        <tr>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">区分</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">承認待ち</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">運搬終了日</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">運搬担当者</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">車両番号</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">運搬量</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">有価物拾集量</div>
            </th>
            <th colspan="1" class="titleColumn classRight">
                <div class="mt-1">報告担当者</div>
            </th>
            <th colspan="4" class="titleColumn">
                <div class="mt-1">備考</div>
            </th>
        </tr>
        <tr v-for="item in transport" v-bind:key="item.sectionNumber">
            <td colspan="1">{{item.sectionNumber}}</td>
            <td colspan="1">{{item.transportReportPendingFlag}}</td>
            <td colspan="1">{{item.transportDate}}</td>
            <td colspan="1">{{item.transportStaffResult}}</td>
            <td colspan="1">{{item.vehicleNumberResult}}</td>
            <td colspan="1">{{item.unitQuantity}}</td>
            <td colspan="1">{{item.valuableUnitQuantity}}</td>
            <td colspan="1">{{item.reportStaff}}</td>
            <td colspan="4">{{item.memo}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["transport",'classByWaste'],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_carrier.scss";

</style>


