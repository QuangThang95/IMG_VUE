<template>
  <div>
    <table v-if="isReadOnly" class="table table-box table-sm font-13">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="4">
          <span class="asterisk">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" style="min-width: 165px" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>業者番号
        </td>
        <td colspan="3">
          <span>{{dataSupplier.supplierNumber}}</span>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>業者名
        </td>
        <td colspan="5">
          <span>{{dataSupplier.supplierName}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">積替保管施設番号</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.factoryNumber}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">事業場区分</td>
        <td colspan="5">
          <span>{{item.factoryClass}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>積替保管施設名
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <span>{{item.factoryName}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">積替保管施設名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <span>{{item.factoryKana}}</span>
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
          <b-button class="btn-form" disabled="" size="sm">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">都道府県</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.address1}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">市区町村</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.address2}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">町域</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{item.address3}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">番地・建物名</td>
        <td colspan="11">
          <b-input-group size="sm">
            <span>{{item.address4}}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">{{ imgText.general.tel }}</td>
        <td colspan="3">
          <!-- <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Tel"
            :formattedInputValue="item.tel"
          /> -->
          <span>{{item.tel}}</span>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>JWNET事業場コード
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <span>{{item.jwnetNumber}}</span>
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


    <!-- -->

    <table v-else class="table table-box table-sm font-13">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="4">
          <span class="asterisk">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" style="min-width: 165px" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>業者番号
        </td>
        <td colspan="3">
          <span>{{dataSupplier.supplierNumber}}</span>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>業者名
        </td>
        <td colspan="5">
          <span>{{dataSupplier.supplierName}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">積替保管施設番号(任意)</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input maxlength="16" v-model.trim="item.factoryNumber"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">事業場区分</td>
        <td colspan="5">
          <b-form-select size="sm" v-model="item.factoryClass" :options="factoryClassOption"></b-form-select>
          <!-- <b-input-group size="sm">
            <b-form-input v-model.trim="item.factoryClass"></b-form-input>
          </b-input-group>-->
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>積替保管施設名
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.factoryName"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">積替保管施設名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.factoryKana"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>郵便番号
        </td>
        <td colspan="3">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.PostalCode"
            :formattedInputValue="item.postalCode"
          />
        </td>
        <td colspan="8">
          <b-button class="btn-form" @click="onSearchAddress" size="sm">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">都道府県</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address1"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">市区町村</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address2"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">町域</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address3"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">番地・建物名</td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address4"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">{{ imgText.general.tel }}</td>
        <td colspan="3">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Tel"
            :formattedInputValue="item.tel"
          />
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>JWNET事業場コード
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input :maxlength="maxlengthJwnetNumber" v-model.trim="item.jwnetNumber"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea no-resize v-model.trim="item.memo"></b-form-textarea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import AppConfig from "@/constants/AppConfig";
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text";
import { common } from "@/shared/utilities";
export default {
  props: ["item", "imgStatus", "dataSupplier", "datadropGeneralTab1", "isReadOnly"],

  components: {
    BaseInputPermission,
    BaseTable
  },
  data() {
    return {
      imgText: IMText,
      appConfig: AppConfig.Name,
      maxlengthPost: AppConfig.MaxLength.PostalCode,
      maxlengthJwnetNumber: AppConfig.MaxLength.JwnetNumber
    };
  },

  methods: {
    onDelete() {},
    onValueChange(data, name) {
      switch (name) {
        case this.appConfig.PostalCode:
          this.item.postalCode = data;
          break;
        case this.appConfig.Tel:
          this.item.tel = data;
          break;
        case this.appConfig.Fax:
          this.item.fax = data;
          break;
        default:
          break;
      }
    },

    onSearchAddress() {
      this.$emit("onSearchAddress", this.item.postalCode);
    },

    getData() {
      return this.item;
    }
  },
  computed: {
    factoryClassOption() {
      const data = common.formatObjectSelection(this.datadropGeneralTab1, [
        "key2",
        "data1"
      ]);
      if (data.length > 0) {
        this.item.factoryClass = data[0].value;
      }
      
      return data;
    }
  }
};
</script>
<style>
.font-13 {
  font-size: 15px;
}
</style>

