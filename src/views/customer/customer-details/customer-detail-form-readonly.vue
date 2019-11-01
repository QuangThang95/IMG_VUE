<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="5"></td>

        <td class="titleColumn">登録日時</td>
        <td colspan="2">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn">最終更新日時</td>
        <td colspan="2">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">事業者名</td>
        <td colspan="4">{{item.customerName}}</td>
        <td class="titleColumn">事業者名カナ</td>
        <td colspan="5">{{item.customerKana}}</td>
      </tr>
      <tr>
        <td class="titleColumn">郵便番号</td>
        <td colspan="2">{{item.postalCode}}</td>
        <td colspan="9"></td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="2">{{item.address1}}</td>
        <td class="titleColumn">市区町村</td>
        <td colspan="2">{{item.address2}}</td>
        <td class="titleColumn">町域</td>
        <td colspan="5">{{item.address3}}</td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">{{item.address4}}</td>
      </tr>
      <tr>
        <td class="titleColumn">TEL</td>
        <td colspan="2">{{item.tel}}</td>
        <td class="titleColumn">FAX</td>
        <td colspan="2">{{item.fax}}</td>
        <td class="titleColumn">JWNET加入者番号</td>
        <td colspan="2">{{item.jwnetNumber}}</td>
        <td class="titleColumn">EDI利用確認キー</td>
        <td colspan="2">{{item.ediKey}}</td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">{{item.memo}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["item"]
};
</script>
