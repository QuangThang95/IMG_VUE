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
                <b-input-group size="sm">{{items.licenseNumberString}}</b-input-group>
              </td>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可年月日
              </td>
              <td colspan="3">{{items.licenseDate}}</td>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可有効年月日
              </td>
              <td colspan="3">{{items.licenseLimit}}</td>
            </tr>
            <tr>
              <td class="titleColumn">許可都道府県等</td>
              <td colspan="5" size="sm">{{items.licensePref}}</td>
              <td class="titleColumn">
                <span class="asterisk">*</span>許可区分
              </td>
              <td colspan="5">{{dataSelected}}</td>
            </tr>
            <tr>
              <td class="titleColumn">許可証ファイル</td>
              <td colspan="5" size="sm">{{items.path}}</td>
              <td colspan="6"></td>
            </tr>
            <tr>
              <td class="titleColumn titleColumn-textarea">備考</td>
              <td colspan="11">{{items.memo}}</td>
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
import { isNullOrEmpty, common } from "@/shared/utilities";
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
      dataSelected: ""
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
        this.title = "処分事業場追加";
      }
    },

    onChange(event) {
      this.message = [];
      if (event[0].size > AppConfig.MaxLength.FileSize * 1024 * 1024) {
        this.message.push(Message.E00020);
      }
      if (this.onCheckExtention(event[0].name)) {
        this.message.push(Message.E00017);
      }
      let formData = new FormData();
      formData.append("files", event[0]);
      this.$store
        .dispatch("supplierLicenseModule/postFile", formData)
        .then(resp => {
          this.items.path = resp.data[0].logicalFileName;
        })
        .catch(() => {
          this.items.path = "";
        });
      return this.items.path;
    },
    onCheckExtention(file) {
      const res = file.split(".");
      return res &&
        AppConfig.File.ExtensionWhite.includes(res[res.length - 1].toLowerCase())
        ? true
        : false;
    },

    onUpdate(data) {
      this.message = [];
      this.onValidate();
      if (!this.message.length) {
        this.items.licenseNumber = this.items.licenseNumberString;
        this.items.licenseDate = +moment(this.items.licenseDate).format(
          DateTimeFormat.DATE_PARAMS
        );
        this.items.licenseLimit = +moment(this.items.licenseLimit).format(
          DateTimeFormat.DATE_PARAMS
        );
        this.onDispathFactoryLicense(this.items);
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

    onValidate() {
      let current_datetime = new Date();
      let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate();

      if (isNullOrEmpty(this.items.licenseNumberString)) {
        this.message.push(Message.E00023.formatText("許可番号"));
      } else if (
        !CountCharacter.isNumber(this.items.licenseNumberString) ||
        String(this.items.licenseNumberString).length !== 11
      ) {
        this.message.push(Message.E00013.formatText("許可番号"));
      }
      if (
        isNullOrEmpty(this.items.licenseDate) ||
        this.items.licenseDate == 1
      ) {
        this.message.push(Message.E00023.formatText("許可年月日"));
      } else {
        if (!CountCharacter.isDate(this.items.licenseDate)) {
          this.message.push(Message.E00013.formatText("許可年月日"));
        }
        if (
          new Date(this.items.licenseDate).getTime() <=
          new Date(formatted_date).getTime()
        ) {
          this.message.push(Message.E00013.formatText("許可年月日"));
        }
        if (!isNullOrEmpty(this.items.licenseLimit)) {
          if (
            new Date(this.items.licenseDate).getTime() >
            new Date(this.items.licenseLimit).getTime()
          ) {
            this.message.push(Message.E00007.formatText("許可年月日"));
          }
        }
      }
      if (
        isNullOrEmpty(this.items.licenseLimit) ||
        this.items.licenseLimit == 1
      ) {
        this.message.push(Message.E00023.formatText("許可有効年月日"));
      } else {
        if (!CountCharacter.isDate(this.items.licenseLimit)) {
          this.message.push(Message.E00013.formatText("許可有効年月日"));
        }
        if (
          new Date(this.items.licenseLimit).getTime() <=
          new Date(formatted_date).getTime()
        ) {
          this.message.push(Message.E00013.formatText("許可有効年月日"));
        }
        if (!isNullOrEmpty(this.items.licenseDate)) {
          if (
            new Date(this.items.licenseDate).getTime() >
            new Date(this.items.licenseLimit).getTime()
          ) {
            this.message.push(Message.E00007.formatText("許可有効年月日"));
          }
        }
      }
      if (isNullOrEmpty(this.items.licenseClass)) {
        this.message.push(Message.E00035);
      }
      if (!isNullOrEmpty(this.items.licensePref)) {
        let text = this.data1dropGeneral2.find(
          x => x.text == this.items.licensePref
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
            if (typeDrop == null || typeDrop == undefined) {
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
    }
  },
  watch: {
    imgStatus() {
      this.onChangeStatus();
    },
    items() {
      if(this.data1dropGeneral.length > 0 && this.items.licenseClass != null)
      this.dataSelected = this.data1dropGeneral.find(
        x => x.value == this.items.licenseClass
      ).text;
    }
  },
  computed: {}
};
</script>
