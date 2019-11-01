<template>
  <div>
    <b-modal
      hide-footer
      hide-header
      size="xl"
      style="height: 800px"
      class="huss"
      centered
      no-close-on-backdrop
      :id="popupId"
    >
      <b-container fluid>
        <BaseMessageError :title="title" :message="message" />
        <div>
          <div></div>
          <table class="table table-box table-sm">
            <tr>
              <td colspan="6" class="asterisk" style="border-right: 0px;">
                <b-row>
                  <b-col></b-col>
                  <b-col>* は必須入力</b-col>
                  <b-col></b-col>
                </b-row>
              </td>
              <td class="titleColumn" v-if="imgStatus == true">登録日時</td>
              <td colspan="2" v-if="imgStatus == true">{{ items.createDate | formatDate}}</td>
              <td class="titleColumn" v-if="imgStatus == true">最終更新日時</td>
              <td colspan="2" v-if="imgStatus == true">{{ items.lastUpdate| formatDate}}</td>
            </tr>
            <tr>
              <td class="titleColumn">事業場番号</td>
              <td colspan="5" size="sm">{{ items.factoryNumber }}</td>
              <td class="titleColumn">事業場名</td>
              <td colspan="5">{{ items.factoryName }}</td>
            </tr>
            <tr>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可番号
              </td>
              <td colspan="3">
                <b-input-group size="sm">
                  <b-form-input
                    v-model.trim="items.licenseNumberString"
                    @blur="onFocusOut"
                    @keypress="onKeyPress"
                    :maxlength="11"
                  ></b-form-input>
                </b-input-group>
              </td>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可年月日
              </td>
              <td colspan="3">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="items.licenseDate"
                    :readonly="readOnly"
                    type="date"
                    @change="onChangeLicenseDate"
                  ></b-form-input>
                </b-input-group>
              </td>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可有効年月日
              </td>
              <td colspan="3">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="items.licenseLimit"
                    :readonly="readOnly"
                    type="date"
                    @change="onChangeLicenseLimit"
                  ></b-form-input>
                </b-input-group>
              </td>
            </tr>
            <tr>
              <td class="titleColumn">許可都道府県等</td>
              <td colspan="5" size="sm">
                <b-input-group>
                  <b-form-input v-model.trim="items.licensePref" :readonly="readOnly" size="sm"></b-form-input>
                </b-input-group>
              </td>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可区分
              </td>
              <td colspan="5">
                <b-form-select
                  size="sm"
                  :options="data1dropGeneral"
                  v-model="items.licenseClass"
                  placeholder
                ></b-form-select>
              </td>
            </tr>
            <tr>
              <td class="titleColumn">許可証ファイル</td>
              <td colspan="11" size="sm">
                <b-form-file
                  size="sm"
                  :file-name-formatter="onChange"
                  :placeholder="items.path || ''"
                  browse-text="選択"
                  v-model.trim="items.path"
                ></b-form-file>
              </td>
            </tr>
            <tr>
              <td class="titleColumn titleColumn-textarea">備考</td>
              <td colspan="11">
                <b-form-textarea
                  no-resize
                  size="lg"
                  v-model.trim="items.memo"
                  :readonly="readOnly"
                  :maxlength="maxAddress4"
                ></b-form-textarea>
              </td>
            </tr>
          </table>
        </div>
        <BaseButtonGroupPermission
          :isPopup="isPopup"
          :imgStatus="imgStatus"
          @onAddUpdate="onUpdate"
          @onBack="onBack"
          :isReadOnly="readOnly"
        />
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BaseMessageError from "@/components/BaseMessageError.vue";
import { isNullOrEmpty, common, isNullOrUndefined } from "@/shared/utilities";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import DateTimeFormat from "@/constants/DateTimeFormat";
import moment from "moment";
import HttpStatus from "http-status-codes";

export default {
  props: ["items", "imgStatus", "popupId", "readOnly", "checkShowTitle"],
  components: {
    BaseMessageError,
    BaseButtonGroupPermission
  },
  data() {
    return {
      message: [],
      isPopup: true,
      title: "",
      maxAddress4: AppConfig.MaxLength.Address4,
      dataNow: new Date(),
      data1dropGeneral: [],
      data1dropGeneral2: [],
      dataTypeNum: [],
      nameDropGeneral: "",
      formData: new FormData()
    };
  },
  created() {
    this.onChangeStatus();
    this.getGenere();
  },
  methods: {
    onChangeStatus() {
      this.message = [];
      if (this.imgStatus) {
        if (this.checkShowTitle) {
          this.title = "処分業許可変更";
        } else {
          this.title = "処分業許可閲覧";
        }
      } else {
        this.title = "処分業許可追加";
      }
    },

    onChange(event) {
      this.message = [];
      if (event[0].size > AppConfig.MaxLength.FileSize * 1024 * 1024) {
        this.message.push(Message.E00020);
        return (this.items.path = "");
      } else if (!this.onCheckExtention(event[0].name)) {
        this.message.push(Message.E00017);
        return (this.items.path = "");
      } else {
        this.formData.append("files", event[0]);
        return (this.items.path = event[0].name);
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

    onUpdate(data) {
      this.message = [];
      const itemFactoryLicense = { ...this.items };
      this.onValidate(itemFactoryLicense);
      if (!this.message.length) {
        itemFactoryLicense.licenseNumber = Number(
          itemFactoryLicense.licenseNumberString
        );
        itemFactoryLicense.licenseDate = +moment(
          itemFactoryLicense.licenseDate
        ).format(DateTimeFormat.DATE_PARAMS);
        itemFactoryLicense.licenseLimit = +moment(
          itemFactoryLicense.licenseLimit
        ).format(DateTimeFormat.DATE_PARAMS);
        let form = new FormData();
        form.append("form", this.formData);
        form.append("customerCode", itemFactoryLicense.customerCode);
        form.append("factoryCode", itemFactoryLicense.factoryCode);
        form.append("factoryName", itemFactoryLicense.factoryName);
        form.append("factoryNumber", itemFactoryLicense.factoryNumber);
        form.append("licenseClass", Number(itemFactoryLicense.licenseClass));
        form.append("licenseDate", itemFactoryLicense.licenseDate);
        form.append("licenseLimit", itemFactoryLicense.licenseLimit);
        form.append("licenseNumber", itemFactoryLicense.licenseNumber);
        form.append(
          "licenseNumberString",
          itemFactoryLicense.licenseNumberString
        );
        form.append("licensePref", itemFactoryLicense.licensePref);
        form.append("memo", itemFactoryLicense.memo);
        form.append("path", itemFactoryLicense.path);
        form.append("rowNumber", itemFactoryLicense.rowNumber);
        form.append("supplierCode", itemFactoryLicense.supplierCode);
        if (this.imgStatus) {
          form.append("createDate", itemFactoryLicense.createDate);
          form.append("lastUpdate", itemFactoryLicense.lastUpdate);
        }
        this.onDispathFactoryLicense(form);
      }
    },

    onDispathFactoryLicense(factoryLicense) {
      if (this.imgStatus) {
        this.$store
          .dispatch("factoryLicenseModule/updateFactoryLicense", factoryLicense)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$bvModal.hide(this.popupId);
              this.$emit("resetList", response.data);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      } else {
        this.$store
          .dispatch("factoryLicenseModule/addFactoryLicense", factoryLicense)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$bvModal.hide(this.popupId);
              this.$emit("resetList", response.data);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      }
    },

    onBack() {
      this.message = [];
      this.$bvModal.hide(this.popupId);
    },

    onValidate(itemFactoryLicense) {
      if (isNullOrEmpty(itemFactoryLicense.licenseNumberString)) {
        this.message.push(Message.E00023.formatText("許可番号"));
      } else {
        if (
          !CountCharacter.isNumber(itemFactoryLicense.licenseNumberString) ||
          String(itemFactoryLicense.licenseNumberString).length !== 11
        ) {
          this.message.push(Message.E00013.formatText("許可番号"));
        }
        if (isNullOrEmpty(itemFactoryLicense.licenseClass)) {
          this.message.push(Message.E00035);
        } else {
          let itemLicenseClass = itemFactoryLicense.licenseClass;
          let typeNumber = itemFactoryLicense.licenseNumberString.substring(
            3,
            4
          );
          let item = this.dataTypeNum.find(
            x =>
              x.key3 === String(itemLicenseClass) &&
              x.key2 === String(typeNumber)
          );
          if (isNullOrUndefined(item)) {
            this.message.push(Message.E00035);
          }
        }
      }
      if (
        isNullOrEmpty(itemFactoryLicense.licenseDate) ||
        itemFactoryLicense.licenseDate == 1
      ) {
        this.message.push(Message.E00023.formatText("許可年月日"));
      } else {
        if (!CountCharacter.isDate(itemFactoryLicense.licenseDate)) {
          this.message.push(Message.E00013.formatText("許可年月日"));
        }
      }
      if (
        isNullOrEmpty(itemFactoryLicense.licenseLimit) ||
        itemFactoryLicense.licenseLimit == 1
      ) {
        this.message.push(Message.E00023.formatText("許可有効年月日"));
      } else {
        if (!CountCharacter.isDate(itemFactoryLicense.licenseLimit)) {
          this.message.push(Message.E00013.formatText("許可有効年月日"));
        }
      }
      if (
        !isNullOrEmpty(itemFactoryLicense.licenseDate) &&
        !isNullOrEmpty(itemFactoryLicense.licenseLimit) &&
        new Date(itemFactoryLicense.licenseDate).getTime() >
          new Date(itemFactoryLicense.licenseLimit).getTime()
      ) {
        this.message.push(Message.E00007);
      }

      if (!isNullOrEmpty(itemFactoryLicense.licensePref)) {
        let text = this.data1dropGeneral2.find(
          x => x.text == itemFactoryLicense.licensePref
        );
        if (text == null || text == undefined) {
          this.message.push(Message.E00032.formatText("都道府県"));
        }
      }
    },

    onFocusOut() {
      this.message = [];
      if (isNullOrEmpty(this.items.licenseNumberString)) {
        this.items.licensePref = "";
      } else {
        if (!CountCharacter.isNumber(this.items.licenseNumberString)) {
          this.message.push(Message.E00010.formatText("許可番号"));
        } else {
          if (this.items.licenseNumberString.length === 11) {
            let address = this.items.licenseNumberString.substring(0, 3);
            let addresstext = this.data1dropGeneral2.find(
              x => x.value == address
            );
            if (addresstext) {
              this.items.licensePref = addresstext.text;
            }
            let typeNum = this.items.licenseNumberString.substring(3, 4);
            let type = this.dataTypeNum.find(x => x.key2 == typeNum).key3;
            let typeDrop = this.data1dropGeneral.find(x => x.value == type);
            if (isNullOrUndefined(typeDrop)) {
              this.items.licensePref = "";
              this.items.licenseClass = "";
              this.message.push(Message.E00035);
            } else {
              this.items.licenseClass = typeDrop.value;
            }
          } else {
            this.message.push(Message.E00035);
            this.items.licensePref = "";
          }
        }
      }
    },

    getGenere() {
      let paramsGeneral1 = {
        key1: "許可区分",
        key3: 3,
        deleteFlag: 0
      };
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneral1)
        .then(resp => {
          this.data1dropGeneral = common.formatObjectSelection(resp.data, [
            "key2",
            "data1"
          ]);
        });

      let paramsGeneral2 = {
        key1: "政令市番号",
        deleteFlag: 0
      };
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneral2)
        .then(resp => {
          this.data1dropGeneral2 = common.formatObjectSelection(resp.data, [
            "key2",
            "data1"
          ]);
        });

      let paramsGeneralTypeNum = {
        key1: "業の種類",
        deleteFlag: 0
      };
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneralTypeNum)
        .then(resp => {
          this.dataTypeNum = resp.data;
        });
    },

    onChangeLicenseDate(data) {
      this.items.licenseDate = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    onChangeLicenseLimit(data) {
      this.items.licenseLimit = isNullOrEmpty(data)
        ? ""
        : moment(String(data)).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    onKeyPress(evt) {
      common.onKeyPressOnlyNumberInt(evt);
    }
  },
  watch: {
    imgStatus() {
      this.onChangeStatus();
    }
  },
  computed: {}
};
</script>

<style lang="scss">
date-input-polyfill {
  z-index: 9999999 !important;
}
</style> 