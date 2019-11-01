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
                {{items.finalFactoryName}}
              </td>
              <td class="titleColumn">最終処分事業場名カナ</td>
              <td colspan="5">
                {{items.finalFactoryKana}}
              </td>
            </tr>
            <tr>
              <td class="titleColumn">郵便番号</td>
              <td colspan="5" size="sm">
                <b-row>
                  <b-col>
                    {{items.postalCode}}
                  </b-col>
                  <b-col>
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
                {{items.address1}}
              </td>
              <td class="titleColumn">
                <span class="asterisk">*</span>市区町村
              </td>
              <td colspan="3">
                {{items.address2}}
              </td>
              <td class="titleColumn">町域</td>
              <td colspan="3">
                {{items.address3}}
              </td>
            </tr>
            <tr>
              <td class="titleColumn">番地・建物名</td>
              <td colspan="11">
                {{items.address4}}
              </td>
            </tr>
            <tr>
              <td class="titleColumn">TEL</td>
              <td colspan="3">
                {{items.tel}}
              </td>
              <td class="titleColumn">処分方法</td>
              <td colspan="3">
                {{ items.disposeName }}
              </td>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td class="titleColumn">施設処理能力</td>
              <td colspan="11">
                {{items.capability}}
              </td>
            </tr>
            <tr>
              <td class="titleColumn titleColumn-textarea">備考</td>
              <td colspan="11">
                {{items.memo}}
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
      :popupIdReadOnly="popupIdReadOnly"
    />
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
    BaseInputPermission
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
      popupIdReadOnly:"popupIdTab2Popup2ReadOnly"
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

      this.$bvModal.show(this.popupIdReadOnly);
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

    onAddUpdateFactoryFinal(data) {
      this.onDispathFactoryFinal(data);
    },
    onDispathFactoryFinal(factoryFinal) {
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
