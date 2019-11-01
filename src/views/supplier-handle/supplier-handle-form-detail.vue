<template>
  <div>
    <div>
      <b-row>
        <b-col md="11" offset-md="1">
          <span class="asterisk pl-4">*は必須入力</span>
        </b-col>
      </b-row>
    </div>

    <table class="table table-box table-sm">
      <tr v-if="!isUpdate">
        <td class="titleColumn">業者番号(任意)</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              v-model.trim="item.supplierNumber"
              maxlength="16"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td colspan="2" class="border-none"></td>
        <td colspan="1" class="border-none"></td>
        <td colspan="2" class="border-none"></td>
        <td colspan="1" class="border-none"></td>
        <td colspan="2" class="border-none"></td>
      </tr>
      <tr v-if="isUpdate">
        <td class="titleColumn">業者番号</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              v-model.trim="item.supplierNumber"
              maxlength="16"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td colspan="2"></td>
        <td class="titleColumn">登録日時</td>
        <td colspan="2">
          <span>{{item.createDate | formatDate}}</span>
        </td>
        <td class="titleColumn">最終更新日時</td>
        <td colspan="2">
          <span>{{item.lastUpdate | formatDate}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>業者名
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.supplierName" maxlength="260" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">業者名カナ</td>
        <td colspan="8">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.supplierKana" maxlength="260" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">郵便番号</td>
        <td colspan="2">
          <BaseInput
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.PostalCode"
            :maxlength="appConfig.MaxLength.PostalCode"
            :formattedInputValue.sync="item.postalCode"
            @onChange="onChangeInput"
            :size="sm"
          ></BaseInput>
        </td>
        <td colspan="9">
          <b-button class="btn-form" size="sm" @click="getAddressByPostalCode">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address1" maxlength="4" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">市区町村</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address2" maxlength="20" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address3" maxlength="40" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.address4" maxlength="100" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">TEL</td>
        <td colspan="2">
          <BaseInput
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.Tel"
            :maxlength="appConfig.MaxLength.Tel"
            :formattedInputValue.sync="item.tel"
            @onChange="onChangeInput"
            :size="sm"
          />
        </td>
        <td class="titleColumn">FAX</td>
        <td colspan="2">
          <BaseInput
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.Fax"
            :maxlength="appConfig.MaxLength.Fax"
            :formattedInputValue.sync="item.fax"
            @onChange="onChangeInput"
            :size="sm"
          />
        </td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td class="titleColumn">URL</td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.url" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea size="lg" no-resize v-model.trim="item.memo" @change="onChange(true)"></b-form-textarea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
export default {
  components: {
    BaseInput
  },
  props: ["item", "isUpdate", "isChange"],

  data() {
    return {
      appConfig: AppConfig,
      isChangeData: false,
      sm: "sm"
    };
  },

  created() {
    this.onBeforeUnLoad();
  },

  destroyed() {
    this.isChangeData = false;
  },

  methods: {
    onValueChange(data, name) {
      switch (name) {
        case this.appConfig.Name.PostalCode:
          this.item.postalCode = data;
          break;
        case this.appConfig.Name.Tel:
          this.item.tel = data;
          break;
        case this.appConfig.Name.Fax:
          this.item.fax = data;
          break;
        default:
          break;
      }
    },
    getData() {
      return this.item;
    },

    getAddressByPostalCode() {
      this.$emit("getAddressByPostalCode");
    },

    onChange(data) {
      this.isChangeData = data;
    },

    onChangeInput(data) {
      this.isChangeData = data;
    },

    canDeactivate() {
      return this.isChangeData;
    },
    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }
  },

  watch: {
    isChange() {
      this.isChangeData = false;
    }
  }
};
</script>

<style lang="scss" scoped>
table td {
  table-layout: fixed;
  width: 180px;
}
</style>
