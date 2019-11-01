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
        <td colspan="4">{{item.branchNumber}}</td>
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
        <td colspan="5">{{item.branchName}}</td>
        <td class="titleColumn">事業場名カナ</td>
        <td colspan="5">{{item.branchKana}}</td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>郵便番号
        </td>
        <td colspan="11">{{item.postalCode}}</td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>都道府県
        </td>
        <td colspan="3">{{item.address1}}</td>
        <td class="titleColumn">
          <span v-if="!isReadOnly" class="asterisk">*</span>市区町村
        </td>
        <td colspan="3">{{item.address2}}</td>
        <td class="titleColumn">町域</td>
        <td colspan="3">{{item.address3}}</td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">{{item.address4}}</td>
      </tr>
      <tr>
        <td class="titleColumn">{{ imgtext.general.tel }}</td>
        <td colspan="3">{{item.tel}}</td>
        <td class="titleColumn">
          {{ imgtext.general.JWNET }}
        </td>
        <td colspan="3">{{item.jwnetNumber}}</td>
        <td class="titleColumn">
          EDI利用確認キー
        </td>
        <td colspan="3">{{item.ediKey}}</td>
      </tr>
      <tr>
        <td class="titleColumn">産業大分類</td>
        <td colspan="5">
          {{dataSelected1}}
        </td>
        <td class="titleColumn">産業中分類</td>
        <td colspan="5">
          {{dataSelected2}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn">排出物区分</td>
        <td colspan="10" class="form-checkbox">
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass1"
          >産業廃棄物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass2"
          >特別管理産業廃棄物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass3"
          >建設廃棄物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass5"
          >有価物</b-form-checkbox>
          <b-form-checkbox
            :disabled="isReadOnly"
            class="checkbox"
            v-model="item.dischargeWasteClass4"
          >一般廃棄物</b-form-checkbox>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">{{item.memo}}</td>
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
import { isNullOrUndefined } from "@/shared/utilities";

export default {
  props: ["item", "imgStatus", "isReadOnly"],

  components: {
    BaseInputPermission,
    BaseTable
  },
  data() {
    return {
      imgtext: IMText,
      appConfig: AppConfig,
      industryCode2Option: [],
      dataSelected1: "",
      dataSelected2: ""
    };
  },

  created() {
    this.getIndustryCode();
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
      this.item.industryCode2 = null;
      this.industryCode2Option = this.$store.getters[
        "generalModule/getGeneralIndustryCode2"
      ](value);
    },

    onSearchAddress() {
      this.$emit("onSearchAddress", this.item.postalCode);
    }, 

    canDeactivate(){
        return false;
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
    industryCode1Option() {
      if (!isNullOrEmpty(this.item.industryCode1) && this.industryCode1Option.length > 1) {
        this.dataSelected1 = this.industryCode1Option.find(
          x => x.value == this.item.industryCode1
        ).text;
      }
    },
    industryCode2Option() {
      if (!isNullOrEmpty(this.item.industryCode2) && this.industryCode2Option.length > 1) {
        this.dataSelected2 = this.industryCode2Option.find(
          x => x.value == this.item.industryCode2
        ).text;
      }
    }
  }
};
</script>
