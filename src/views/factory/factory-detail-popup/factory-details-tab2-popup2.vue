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
              <td class="titleColumn">処分業者</td>
              <td colspan="5" size="sm">{{ items.supplierName }}</td>
              <td class="titleColumn">処分事業場</td>
              <td colspan="5">{{ items.factoryName }}</td>
            </tr>
            <tr>
              <td class="titleColumn">
                <span class="asterisk">*</span>最終処分事業場名
              </td>
              <td colspan="5" size="sm">
                <b-input-group>
                  <b-form-input
                    v-model.trim="items.finalFactoryName"
                    :readonly="readOnly"
                    :maxlength="maxName"
                  ></b-form-input>
                </b-input-group>
              </td>
              <td class="titleColumn">最終処分事業場名カナ</td>
              <td colspan="5">
                <b-input-group>
                  <b-form-input
                    v-model.trim="items.finalFactoryKana"
                    :readonly="readOnly"
                    :maxlength="maxKana"
                  ></b-form-input>
                </b-input-group>
              </td>
            </tr>
            <tr>
              <td class="titleColumn">郵便番号</td>
              <td colspan="5" size="sm">
                <b-row>
                  <b-col>
                    <b-input-group size="sm">
                      <BaseInputPermission
                        @onValueChange="onValueChange"
                        :nameInput="appConfig.Name.PostalCode"
                        :maxlength="appConfig.MaxLength.PostalCode"
                        :formattedInputValue="items.postalCode"
                        :readonly="readOnly"
                      />
                    </b-input-group>
                  </b-col>
                  <b-col>
                    <b-button
                      class="btn-form float-right"
                      size="sm"
                      @click="onSearchAddress"
                      :disabled="readOnly"
                    >住所検索</b-button>
                  </b-col>
                </b-row>
              </td>
              <td colspan="6"></td>
            </tr>
            <tr>
              <td class="titleColumn">
                <span class="asterisk">*</span>都道府県
              </td>
              <td colspan="3">
                <b-input-group size="sm">
                  <b-form-input
                    v-model.trim="items.address1"
                    :readonly="readOnly"
                    :maxlength="maxAddress1"
                  ></b-form-input>
                </b-input-group>
              </td>
              <td class="titleColumn">
                <span class="asterisk">*</span>市区町村
              </td>
              <td colspan="3">
                <b-input-group size="sm">
                  <b-form-input
                    v-model.trim="items.address2"
                    :readonly="readOnly"
                    :maxlength="maxAddress2"
                  ></b-form-input>
                </b-input-group>
              </td>
              <td class="titleColumn">町域</td>
              <td colspan="3">
                <b-input-group size="sm">
                  <b-form-input
                    v-model.trim="items.address3"
                    :readonly="readOnly"
                    :maxlength="maxAddress3"
                  ></b-form-input>
                </b-input-group>
              </td>
            </tr>
            <tr>
              <td class="titleColumn">番地・建物名</td>
              <td colspan="11">
                <b-input-group size="sm">
                  <b-form-input
                    v-model.trim="items.address4"
                    :readonly="readOnly"
                    :maxlength="maxAddress4"
                  ></b-form-input>
                </b-input-group>
              </td>
            </tr>
            <tr>
              <td class="titleColumn">TEL</td>
              <td colspan="3">
                <b-input-group size="sm">
                  <BaseInputPermission
                    @onValueChange="onValueChange"
                    :nameInput="appConfig.Name.Tel"
                    :maxlength="maxTel"
                    :formattedInputValue="items.tel"
                    :readonly="readOnly"
                  />
                </b-input-group>
              </td>
              <td class="titleColumn">処分方法</td>
              <td colspan="3">
                {{ items.disposeName }}
                <b-button
                  class="btn-form float-right"
                  size="sm"
                  @click="goToPopUp"
                  :disabled="readOnly"
                >選択</b-button>
              </td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td class="titleColumn">施設処理能力</td>
              <td colspan="11">
                <b-input-group size="sm">
                  <b-form-input v-model.trim="items.capability" :readonly="readOnly"></b-form-input>
                </b-input-group>
              </td>
            </tr>
            <tr>
              <td class="titleColumn titleColumn-textarea">備考</td>
              <td colspan="11">
                <b-form-textarea
                  no-resize
                  size="lg"
                  v-model="items.memo"
                  :readonly="readOnly"
                  :maxlength="maxMemo"
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
    <SearchTab2Popup2
      :itemsdatadropGeneralTab2Popup="datadropGeneralTab2Popup"
      @onSelect="onSelect"
      :popupIdReadOnly="popupIdTab2"
    />
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BaseMessageError from "@/components/BaseMessageError.vue";
import SearchTab2Popup2 from "./factory-details-tab2-popup3";
import CountCharacter from "@/shared/CountCharacter";
import { common, isNullOrEmpty } from "@/shared/utilities";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import { mapGetters } from "vuex";
import HttpStatus from "http-status-codes";
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  props: [
    "items",
    "imgStatus",
    "popupId",
    "itemsDatadropGeneral",
    "readOnly",
    "checkShowTitle"
  ],
  components: {
    BaseMessageError,
    BaseButtonGroupPermission,
    SearchTab2Popup2,
    BaseInputPermission,
    BaseProcessing
  },
  data() {
    return {
      message: [],
      isPopup: true,
      title: "",
      appConfig: AppConfig,
      datadropGeneralTab2Popup: [],
      maxMemo: AppConfig.MaxLength.Memo,
      maxAddress1: AppConfig.MaxLength.Address1,
      maxAddress2: AppConfig.MaxLength.Address2,
      maxAddress3: AppConfig.MaxLength.Address3,
      maxAddress4: AppConfig.MaxLength.Address4,
      maxKana: AppConfig.MaxLength.Kana,
      maxName: AppConfig.MaxLength.Name,
      maxTel: AppConfig.MaxLength.Tel,
      checkAddress: null,
      popupIdTab2: "popupIdTab2Popup2",
      openDl: false
    };
  },

  methods: {
    onValueChange(data, name) {
      switch (name) {
        case this.appConfig.Name.PostalCode:
          this.items.postalCode = data;
          break;
        case this.appConfig.Name.Tel:
          this.items.tel = data;
          break;
        default:
          break;
      }
    },
    onChangeStatus() {
      this.message = [];
      if (this.imgStatus) {
        if (this.checkShowTitle) {
          this.title = "最終処分事業場変更";
        } else {
          this.title = "最終処分事業場閲覧";
        }
      } else {
        this.title = "最終処分事業場追加";
      }
    },

    onUpdate() {
      this.message = [];
      this.onValidate();
      if (!this.message.length) {
        this.onAddUpdateFactoryFinal(this.items);
      }
    },

    onBack() {
      this.$bvModal.hide(this.popupId);
    },
    goToPopUp() {
      let paramsGeneral = {
        key1: "処分方法",
        data5: 1,
        data6: 1
      };
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneral)
        .then(resp => {
          this.datadropGeneralTab2Popup = resp.data.filter(
            x => x.data5 == 1 && x.data6 == 1
          );
        });

      this.$bvModal.show(this.popupIdTab2);
    },
    onSelect(data) {
      (this.items.disposeName = data.data3 + data.data2),
        (this.items.disposeCode = data.data4);
    },

    async onSearchAddress() {
      this.checkAddress = "popup";
      let postalCode = this.items.postalCode;
      if (!isNullOrEmpty(postalCode)) {
        this.message = [];
        if (!CountCharacter.isPostalCode(postalCode)) {
          this.message.push(Message.E00028.formatText("郵便番号"));
        } else {
          await this.$store.dispatch(
            "addressModule/getByPostalCode",
            postalCode
          );
        }
      }
    },

    onValidate() {
      if (isNullOrEmpty(this.items.finalFactoryName)) {
        this.message.push(Message.E00023.formatText("最終処分事業場名"));
      } else if (!CountCharacter.isJWZH(this.items.finalFactoryName)) {
        this.message.push(Message.E00014.formatText("事業場名"));
      }

      // Final Factory Kana
      if (
        !isNullOrEmpty(this.items.finalFactoryKana) &&
        !CountCharacter.isKatakanaHasSpace(this.items.finalFactoryKana)
      ) {
        this.message.push(Message.E00028.formatText("事業場名カナ"));
      }

      // PostalCode
      if (
        !isNullOrEmpty(this.items.postalCode) &&
        !CountCharacter.isPostalCode(this.items.postalCode)
      ) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }

      // Address1
      // check JWZ
      if (isNullOrEmpty(this.items.address1)) {
        this.message.push(Message.E00023.formatText("都道府県"));
      } else if (!CountCharacter.isJWZ(this.items.address1)) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // Address2
      // check JWZ
      if (isNullOrEmpty(this.items.address2)) {
        this.message.push(Message.E00023.formatText("市区町村"));
      } else if (!CountCharacter.isJWZ(this.items.address2)) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // Address3
      // check JWZ
      if (
        !isNullOrEmpty(this.items.address3) &&
        !CountCharacter.isJWZ(this.items.address3)
      ) {
        this.message.push(Message.E00013.formatText("町域"));
      }

      // Address4
      // check isJWZH
      if (
        !isNullOrEmpty(this.items.address4) &&
        !CountCharacter.isJWZH(this.items.address4)
      ) {
        this.message.push(Message.E00015.formatText("番地・建物名"));
      }

      // TEL
      if (
        !isNullOrEmpty(this.items.tel) &&
        !CountCharacter.isTelNumber(this.items.tel)
      ) {
        this.message.push(Message.E00028.formatText("TEL"));
      }
    },

    onAddUpdateFactoryFinal(data) {
      this.onDispathFactoryFinal(data);
    },
    onDispathFactoryFinal(factoryFinal) {
      this.openDl = true;
      if (this.imgStatus) {
        this.$store
          .dispatch("factoryFinalModule/updateFactoryFinal", factoryFinal)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$bvModal.hide("factoryTab2Popup1");
              this.$emit("resetList", response.data);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        this.$store
          .dispatch("factoryFinalModule/addFactoryFinal", factoryFinal)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$bvModal.hide("factoryTab2Popup1");
              this.$emit("resetList", response.data);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      }
    }
  },
  watch: {
    imgStatus() {
      this.onChangeStatus();
    },
    address() {
      if (this.checkAddress == "popup")
        if (!this.address) {
          this.message.push(Message.E00029);
        } else {
          this.message = [];
          this.items.address1 = this.address.address1;
          this.items.address2 = this.address.address2;
          this.items.address3 = this.address.address3;
          this.items.address4 = this.address.address4;
          this.checkAddress = null;
        }
    }
  },
  computed: {
    ...mapGetters({
      address: "addressModule/getByPostalCode"
    })
  }
};
</script>
