<template>
  <table class="table table-box table-sm">
    <tr>
      <td colspan="6" class="asterisk">
        <b-row>
          <b-col></b-col>
          <b-col>*は必須入力</b-col>
          <b-col></b-col>
        </b-row>
      </td>
      <td class="titleColumn">登録日時</td>
      <td colspan="2" class="timeValue">{{customerGroup.createDate | formatDate}}</td>
      <td class="titleColumn">最終更新日時</td>
      <td colspan="2" class="timeValue">{{customerGroup.lastUpdate | formatDate}}</td>
    </tr>
    <tr>
      <td class="titleColumn">
        <span class="asterisk">*</span>グループ名
      </td>
      <td colspan="5">
        <span>{{customerGroup.groupName}}</span>
      </td>
      <td class="titleColumn">グループ名カナ</td>
      <td colspan="5">
        <span>{{customerGroup.groupKana}}</span>
      </td>
    </tr>
    <tr>
      <td class="titleColumn">備考</td>
      <td colspan="11">
        <span>{{customerGroup.memo}}</span>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  props: ["customerGroup"]
};
</script>