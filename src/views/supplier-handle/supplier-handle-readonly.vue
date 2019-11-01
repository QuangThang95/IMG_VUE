<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="titleColumn">事業番号</td>
        <td colspan="3">
          <span>{{item.supplierNumber}}</span>
        </td>
        <td class="titleColumn">登録日時</td>
        <td colspan="3">
          <span>{{item.createDate | formatDate}}</span>
        </td>
        <td class="titleColumn">最終更新日時</td>
        <td colspan="3">
          <span>{{item.lastUpdate | formatDate}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">事業名</td>
        <td colspan="5">
          <span>{{item.supplierName}}</span>
        </td>
        <td class="titleColumn">事業名カナ</td>
        <td colspan="5">
          <span>{{item.supplierKana}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">郵便番号</td>
        <td colspan="3">
          <span>{{item.postalCode}}</span>
        </td>
        <td colspan="8">
          <b-button class="btn-form" size="sm" disabled>住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="3">
          <span>{{item.address1}}</span>
        </td>
        <td class="titleColumn">市区町村</td>
        <td colspan="3">
          <span>{{item.address2}}</span>
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="3">
          <span>{{item.address3}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">
          <span>{{item.address4}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">TEL</td>
        <td colspan="5">
          <span>{{item.tel}}</span>
        </td>
        <td class="titleColumn">FAX</td>
        <td colspan="5">
          <span>{{item.fax}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">URL</td>
        <td colspan="11">
          <span>{{item.url}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">備考</td>
        <td colspan="11">
            <span>{{item.memo}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
table td {
  table-layout: fixed;
  width: 180px;
}
</style>
