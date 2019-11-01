<template>
  <div>
    <div>
      <b-row>
        <b-col md="11" offset-md="1">
          <span v-if="!isReadOnly" class="asterisk pl-4">* は必須入力</span>
        </b-col>
      </b-row>
    </div>

    <table class="table table-box table-sm" >
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>業者番号
        </td>
        <td colspan="4">
          <b-input-group size="sm">
              <span>{{item.supplierNumber}}</span>
          </b-input-group>
        </td>
        <td colspan="1">
          <b-form-checkbox :disabled="isReadOnly"  class="checkbox"  v-model="item.reportFlag">行政報告不要</b-form-checkbox>
        </td>
        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>
        <td class="titleColumn" v-if="imgStatus === true">
          <span  class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk" v-if="!isReadOnly">*</span>業者名 
        </td>
        <td colspan="5">
          <b-input-group size="sm">
              <span>{{item.supplierName}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">業者名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <span>{{item.supplierKana}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>郵便番号
        </td>
        <td colspan="3">
          <span>{{item.postalCode}}</span>
        </td>
        <td colspan="8">
          <b-button :hidden="isReadOnly" class="btn-form" size="sm">住所検索</b-button> 
        </td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.address1}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">市区町村</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.address2}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.address3}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">
          <b-input-group size="sm">
            <span>{{item.address4}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">{{ imgtext.general.tel }}</td>
        <td colspan="2">
          <span>{{item.tel}}</span>
        </td>
        <td class="titleColumn">{{ imgtext.general.fax }}</td>
        <td colspan="2">
          <span>{{item.fax}}</span>
        </td>
        <td class="titleColumn">
          <span class="asterisk" v-if="!isReadOnly && !item.reportFlag">*</span>JWNET加入者番号
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <span>{{item.jwnetNumber}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk" v-if="!isReadOnly && !item.reportFlag">*</span>公開確認番号
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <span>{{item.jwnetPassword}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">URL</td>
        <td colspan="10">
          <b-input-group size="sm">
            <span>{{item.url}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <span>{{item.memo}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import AppConfig from "@/constants/AppConfig";
import IMText from "@/data/img-text";

export default {
  props: ["item", "imgStatus", "permissionGroup", "isReadOnly"],

  components: {
      
  },
  data() {
    return {
      imgtext: IMText,
      appConfig: AppConfig.Name,
      maxlengthPost: AppConfig.MaxLength.PostalCode,
      maxlengthNumber: AppConfig.MaxLength.Number,
      maxlengthTel: AppConfig.MaxLength.Tel,
      maxlengthFax: AppConfig.MaxLength.Fax,
      maxlengthJwnetPassword: AppConfig.MaxLength.JwnetPassword,
      maxlengthJwnetNumber: AppConfig.MaxLength.JwnetNumber
    };
  },

  methods: {
    canDeactivate(){
      return false;
    }
  }
};
</script>
