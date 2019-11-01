<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="5">
          <span v-if="!isReadOnly" class="asterisk pl-4">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span v-if="!isReadOnly" class="asterisk"></span>登録日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span v-if="!isReadOnly" class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>事業者名
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.customerName"
              :maxlength="appConfig.MaxLength.Name"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">事業者名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.customerKana"
              :maxlength="appConfig.MaxLength.Kana"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>郵便番号
        </td>
        <td colspan="2">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.PostalCode"
            :formattedInputValue="item.postalCode"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          ></BaseInputPermission>
        </td>
        <td colspan="9">
          <b-button :hidden="isReadOnly" class="btn-form" size="sm" @click="onSearchAddress">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>都道府県
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address1"
              :maxlength="appConfig.MaxLength.Address1"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>市区町村
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address2"
              :maxlength="appConfig.MaxLength.Address2"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address3"
              :maxlength="appConfig.MaxLength.Address3"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address4"
              :maxlength="appConfig.MaxLength.Address4"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">TEL</td>
        <td colspan="2">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.Tel"
            :formattedInputValue="item.tel"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          ></BaseInputPermission>
        </td>
        <td class="titleColumn">FAX</td>
        <td colspan="2">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.Fax"
            :formattedInputValue="item.fax"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          ></BaseInputPermission>
        </td>
        <td class="titleColumn">JWNET加入者番号</td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.jwnetNumber"
              :maxlength="appConfig.MaxLength.JwnetNumber"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">EDI利用確認キー</td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.ediKey"
              :maxlength="appConfig.MaxLength.EdiKey"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea
            size="sm"
            no-resize
            v-model.trim="item.memo"
            :maxlength="appConfig.MaxLength.Memo"
            :readonly="isReadOnly"
            @change="onChange(true)"
          ></b-form-textarea>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import AppConfig from "@/constants/AppConfig";
import IMText from "@/data/img-text";
import moment from "moment";
import CountCharacter from "@/shared/CountCharacter";

export default {
  props: ["item", "imgStatus", "isReadOnly"],

  components: {
    BaseInputPermission,
  },
  data() {
    return {
      imgText: IMText,
      appConfig: AppConfig,
      isChangeData: false,
    };
  },

  created(){
    this.onBeforeUnLoad();
  },

  destroyed() {
    this.isChangeData = false;
  },

  methods: {
    onDelete() {},
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

    onSearchAddress() {
      this.$emit("onSearchAddress", this.item.postalCode);
    },

    getData() {
      return this.item;
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
    },
  }
};
</script>
