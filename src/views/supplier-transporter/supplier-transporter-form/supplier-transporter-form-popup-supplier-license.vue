<template>
  <div>
    <table v-if="!isReadOnly" class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="4">
          <span class="asterisk pl-4">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" style="min-width: 165px" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate}}</span>
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
          <span class="asterisk"></span>業者番号
        </td>
        <td colspan="3">
          <label>{{supplierData.supplierNumber}}</label>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>業者名
        </td>
        <td colspan="5">
          <label>{{supplierData.supplierName}}</label>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>許可番号
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input
              @blur="onFocusOut"
              @keypress="onKeyPress"
              :maxlength="maxlengthLicenseNumber"
              v-model.trim="item.licenseNumberString"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>許可年月日
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input type="date" v-model="item.licenseDate" @change="onChangeLicenseDate"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>許可有効年月日
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input type="date" v-model="item.licenseLimit" @change="onChangeLicenseLimit"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">許可都道府県等</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input readonly v-model="item.licensePref"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>許可区分
        </td>
        <td colspan="3">
          <b-form-select size="sm" v-model="item.licenseClass" :options="options"></b-form-select>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>許可証ファイル
        </td>
        <td colspan="11">
          <b-form-file
            size="sm"
            :file-name-formatter="onChange"
            :placeholder="item.path || ''"
            browse-text="選択"
            v-model="item.path"
          ></b-form-file>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea no-resize v-model.trim="item.memo"></b-form-textarea>
        </td>
      </tr>
    </table>

    <!-- ReadOnly -->
    <table v-else class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="4">
          <span class="asterisk pl-4">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" style="min-width: 165px" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate}}</span>
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
          <span class="asterisk"></span>業者番号
        </td>
        <td colspan="3">
          <label>{{supplierData.supplierNumber}}</label>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>業者名
        </td>
        <td colspan="5">
          <label>{{supplierData.supplierName}}</label>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>許可番号
        </td>
        <td colspan="3">{{item.licenseNumber}}</td>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>許可年月日
        </td>
        <td colspan="3">{{item.licenseDate}}</td>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>許可有効年月日
        </td>
        <td colspan="3">{{item.licenseLimit}}</td>
      </tr>
      <tr>
        <td class="titleColumn">許可都道府県等</td>
        <td colspan="3">{{item.licensePref}}</td>
        <td class="titleColumn">
          <span class="asterisk">*</span>許可区分
        </td>
        <td colspan="3">{{dataSelected}}</td>
        <td colspan="9"></td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>許可証ファイル
        </td>
        <td colspan="4">{{item.path}}</td>
        <td colspan="7"></td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">{{item.memo}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import AppConfig from "@/constants/AppConfig";
import BaseTable from "@/components/BaseTable.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import IMText from "@/data/img-text";
import HttpStatus from "http-status-codes";
import moment from "moment";
import * as lodash from "lodash";
import { mapGetters } from "vuex";
import { isNaN, isNumber, isNullOrEmpty, common } from "@/shared/utilities";
import { Message } from "@/constants/Message";

export default {
  props: [
    "item",
    "imgStatus",
    "options",
    "dataSource4",
    "supplierData",
    "isReadOnly",
    "dataSelected"
  ],

  components: {
    BaseInput,
    BaseTable
  },
  data() {
    return {
      maxlengthLicenseNumber: AppConfig.MaxLength.LicenseNumber,
      imgText: IMText,
      selected: null,
      files: [],
      state: false,
      formData: new FormData()
    };
  },

  methods: {
    onFocusOut() {
      if (this.item.licenseNumberString) {
        if (Number.isNaN(Number(this.item.licenseNumberString))) {
          this.$emit("onError", Message.E00010.formatText("許可番号"));
        } else {
          if (this.item.licenseNumberString.length === 11) {
            let address = this.item.licenseNumberString.substring(0, 3);
            let addresstext = this.dataSource4.find(x => x.key2 === address);
            if (addresstext) {
              this.item.licensePref = addresstext.data1;
            }
            this.$store
              .dispatch(
                "supplierLicenseModule/getLicense",
                +this.item.licenseNumberString.substring(3, 4)
              )
              .then(response => {
                if (response.status === HttpStatus.OK) {
                  if (response.data.key3 == null) {
                    this.item.licenseClass = this.options.find(
                      x => x.text === "一般廃棄物収集運搬業"
                    ).value;
                  } else {
                    this.item.licenseClass = response.data.key3;
                  }
                }
              });
          } else {
            let data = this.options.find(x => x.text === "一般廃棄物収集運搬業")
              .value;
            this.item.licenseClass = data;
            this.item.licensePref = "";
          }
        }
      } else {
        this.item.licensePref = "";
      }
      this.$forceUpdate();
    },
    onDelete() {},
    onChange(event) {
      this.$emit("resetMessage", []);
      if (event[0].size > AppConfig.MaxLength.FileSize * 1024 * 1024) {
        this.$emit("onError", Message.E00020);
        return (this.item.path = "");
      } else if (!this.onCheckExtention(event[0].name)) {
        this.$emit("onError", Message.E00017);
        return (this.item.path = "");
      } else {
        this.$emit("resetMessage", []);
        this.formData.append("files", event[0]);
        this.$emit("formData", this.formData);
        return (this.item.path = event[0].name);
      }
    },

    onCheckExtention(file) {
      const res = file.split(".");
      return res &&
        AppConfig.File.ExtensionWhite.includes(
          res[res.length - 1].toLowerCase()
        )
        ? true
        : false;
    },

    onChangeLicenseDate(data) {
      this.item.licenseDate = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    onChangeLicenseLimit(data) {
      this.item.licenseLimit = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    onKeyPress(evt) {
      common.onKeyPressOnlyNumberInt(evt);
    }
  },
  computed: {
    ...mapGetters({
      dataLicense: "supplierLicenseModule/getLicense"
    })
  },
  watch: {
    dataLicense() {
      if (this.dataLicense.length < 1) {
        this.item.licenseClass = this.options.find(
          x => x.text === "一般廃棄物収集運搬業"
        ).value;
      } else {
        this.item.licenseClass = this.dataLicense.key3;
      }
    }
  }
};
</script>

<style lang="scss">
date-input-polyfill {
  z-index: 9999999 !important;
}
</style> 
