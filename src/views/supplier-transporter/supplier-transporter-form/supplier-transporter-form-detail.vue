<template>
  <div>
    <div>
      <b-row>
        <b-col md="11" offset-md="1">
          <span v-if="!isReadOnly" class="asterisk pl-4">* は必須入力</span>
        </b-col>
      </b-row>
    </div>

    <table class="table table-box table-sm">
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>業者番号（任意)
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              :maxlength="maxlengthNumber"
              v-model.trim="item.supplierNumber"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td colspan="1">
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.reportFlag"
            @change="onChange(true)"
          >行政報告不要</b-form-checkbox>
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
          <span class="asterisk"></span>最終更新日時
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
            <b-form-input
              :readonly="isReadOnly"
              :maxlength="maxlengthNumber"
              v-model.trim="item.supplierName"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">業者名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.supplierKana"
              @change="onChange(true)"
            ></b-form-input>
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
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td colspan="8">
          <b-button :hidden="isReadOnly" class="btn-form" @click="onSearchAddress" size="sm">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address1"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">市区町村</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address2"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.address3"
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
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">{{ imgtext.general.tel }}</td>
        <td colspan="2">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Tel"
            :formattedInputValue="item.tel"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td class="titleColumn">{{ imgtext.general.fax }}</td>
        <td colspan="2">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Fax"
            :formattedInputValue="item.fax"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td class="titleColumn">
          <span class="asterisk" v-if="!isReadOnly && !item.reportFlag">*</span>JWNET加入者番号
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              :maxlength="maxlengthJwnetNumber"
              v-model.trim="item.jwnetNumber"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk" v-if="!isReadOnly && !item.reportFlag">*</span>公開確認番号
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              :maxlength="maxlengthJwnetPassword"
              v-model.trim="item.jwnetPassword"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">URL</td>
        <td colspan="10">
          <b-input-group size="sm">
            <b-form-input :readonly="isReadOnly" v-model.trim="item.url" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea
            :readonly="isReadOnly"
            no-resize
            v-model.trim="item.memo"
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
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text";
import CountCharacter from "@/shared/CountCharacter";

export default {
  props: ["item", "imgStatus", "permissionGroup", "isReadOnly", "isChange"],

  components: {
    BaseInputPermission,
    BaseTable
  },

  created() {
    this.onBeforeUnLoad();
  },

  destroyed() {
    this.isChangeData = false;
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
      maxlengthJwnetNumber: AppConfig.MaxLength.JwnetNumber,
      isChangeData: false
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
    onChange(data) {
      this.isChangeData = data;
    },

    onChangeInput(data) {
      this.isChangeData = data;
    },
    canDeactivate() {
      return this.isChangeData;
    }
  },

  watch: {
    isChange() {
      this.isChangeData = false;
    }
  }
};
</script>
