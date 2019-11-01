<template>
  <div>
    <table class="table table-box table-sm finalTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="mt-1">最終処分事業場</div>
        </th>
      </tr>
      <tr>
        <th colspan="1" class="titleColumn class1 classRight">
          <div class="mt-1">順番</div>
        </th>
        <th colspan="1" class="titleColumn class2 classRight">
          <div class="mt-1">処分終了日</div>
        </th>
        <th colspan="3" class="titleColumn class3 classRight">
          <div class="mt-1">最終処分事業場</div>
        </th>
        <th colspan="1" class="titleColumn class4 classRight">
          <div class="mt-1">車両番号</div>
        </th>
        <th colspan="3" class="titleColumn class5 classRight">
          <div class="mt-1">所在地</div>
        </th>
        <th colspan="1" class="titleColumn class6">
          <div class="mt-1">TEL</div>
        </th>
      </tr>
      <tr v-for="item in final" v-bind:key="item.id">
        <td colspan="1">{{item.id}}</td>
        <td colspan="1">{{item.finalDisposeDate | formatDateDisplay}}</td>
        <td colspan="3">{{item.finalFactoryName}}</td>
        <td colspan="1">{{item.postalCode}}</td>
        <td colspan="3">{{item.address}}</td>
        <td colspan="1">{{item.tel}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["final",'classByWaste']
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/manifest/_finalDisposeSite.scss";

.finalTable.table th {
  .titleColumn {
    border-right: 0.5px solid #ffffff;
  }
}
</style>
