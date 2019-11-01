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
          <span class="asterisk"></span>事業場番号（任意）
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.branchNumber"
              :maxlength="appConfig.MaxLength.Number"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm" class="pt-1">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>
        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm" class="pt-1">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>事業場名
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.branchName"
              :maxlength="appConfig.MaxLength.Name"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">事業場名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.branchKana"
              :maxlength="appConfig.MaxLength.Kana"
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
            :nameInput="appConfig.Name.PostalCode"
            :formattedInputValue="item.postalCode"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td colspan="8">
          <b-button :hidden="isReadOnly" class="btn-form" size="sm" @click="onSearchAddress">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>都道府県
        </td>
        <td colspan="3">
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
        <td colspan="3">
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
        <td colspan="3">
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
        <td class="titleColumn">{{ imgtext.general.tel }}</td>
        <td colspan="3">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.Tel"
            :formattedInputValue="item.tel"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td class="titleColumn">
          <span class="asterisk" v-if="visibleRequired.jwnetNumber && !isReadOnly">*</span>
          {{ imgtext.general.JWNET }}
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              :readonly="isReadOnly"
              v-model.trim="item.jwnetNumber"
              :maxlength="appConfig.MaxLength.JwnetNumber"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk" v-if="visibleRequired.ediKey && !isReadOnly">*</span>
          EDI利用確認キー
        </td>
        <td colspan="3">
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
        <td class="titleColumn">産業大分類</td>
        <td colspan="5">
          <b-form-select
            size="sm"
            :disabled="isReadOnly"
            v-model="item.industryCode1"
            @change="onChangeIndustryCode1"
            :options="industryCode1Option"
          ></b-form-select>
        </td>
        <td class="titleColumn">産業中分類</td>
        <td colspan="5">
          <b-form-select
            :disabled="isReadOnly"
            size="sm"
            v-model="item.industryCode2"
            :options="industryCode2Option"
            @change="onChange(true)"
          ></b-form-select>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">排出物区分</td>
        <td colspan="10" class="form-checkbox">
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass1"
            @change="onChangeWasteClass(true, item.dischargeWasteClass1, 1)"
          >産業廃棄物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass2"
            @change="onChangeWasteClass(true, item.dischargeWasteClass2, 2)"
          >特別管理産業廃棄物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass3"
            @change="onChangeWasteClass(true, item.dischargeWasteClass3, 3)"
          >建設廃棄物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass4"
            @change="onChangeWasteClass(true, item.dischargeWasteClass4, 4)"
          >有価物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass5"
            @change="onChangeWasteClass(true, item.dischargeWasteClass5, 5)"
          >一般廃棄物</b-form-checkbox>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea
            no-resize
            :readonly="isReadOnly"
            v-model.trim="item.memo"
            :maxlength="appConfig.MaxLength.Memo"
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
import { current, isNullOrEmpty } from "@/shared/utilities";
import CountCharacter from "@/shared/CountCharacter";

export default {
  props: ["item", "imgStatus", "visibleRequired", "isReadOnly", "isChange"],

  components: {
    BaseInputPermission,
    BaseTable
  },
  data() {
    return {
      imgtext: IMText,
      appConfig: AppConfig,
      industryCode2Option: [],
      isChangeData: false
    };
  },

  created() {
    this.onBeforeUnLoad();
    this.getIndustryCode();
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

    getData() {
      return this.item;
    },

    getIndustryCode() {
      //get data selectbox IndustryCode1
      this.$store.dispatch("generalModule/getGeneralIndustryCode1", {
        key1: "産業大分類"
      });
      //get data selectbox IndustryCode2
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode2", {
          key1: "産業中分類"
        })
        .then(() => {
          this.industryCode2Option = this.$store.getters[
            "generalModule/getGeneralIndustryCode2"
          ](this.item.industryCode1);
        });
    },

    onChangeIndustryCode1(value) {
      this.isChangeData = true;
      this.item.industryCode2 = null;
      this.industryCode2Option = this.$store.getters[
        "generalModule/getGeneralIndustryCode2"
      ](value);
    },

    onSearchAddress() {
      this.$emit("onSearchAddress", this.item.postalCode);
    },

    onChange(data) {
      this.isChangeData = data;
    },

    onChangeWasteClass(data, wasteClass, idWasteClass) {
      this.isChangeData = data;
      if (!wasteClass && this.imgStatus)
        this.$emit("changeWasteClass", idWasteClass);
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

  computed: {
    industryCode1Option() {
      const items = this.$store.getters[
        "generalModule/getGeneralIndustryCode1"
      ];
      return items;
    }
  },

  watch: {
    isChange() {
      this.isChangeData = false;
    }
  }
};
</script>
