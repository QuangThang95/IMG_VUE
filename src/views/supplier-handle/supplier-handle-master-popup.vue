<template>
  <div>
    <b-container fluid>
      <div>
        <b-modal
          id="sshi0015modal"
          hide-footer
          hide-header
          size="xl"
          style="height: 800px"
          class="huss"
          centered
          no-close-on-backdrop
        >
          <BaseMessageError :message="message" :title="title" />
          <div>
            <div v-if="!isUpdate">
              <b-row>
                <b-col md="10" offset-md="2">
                  <span class="asterisk">*は必須入力</span>
                </b-col>
              </b-row>
            </div>
            <table class="table table-box table-sm">
              <tr v-if="isUpdate">
                <td colspan="6" class="asterisk">
                  <b-row v-if="!isReadOnly">
                    <b-col></b-col>
                    <b-col>*は必須入力</b-col>
                    <b-col></b-col>
                  </b-row>
                </td>
                <td class="titleColumn">登録日時</td>
                <td colspan="2">{{supplierUser.createDate | formatDate}}</td>
                <td class="titleColumn">最終更新日時</td>
                <td colspan="2">{{supplierUser.lastUpdate | formatDate}}</td>
              </tr>
              <tr>
                <td class="titleColumn">業者番号</td>
                <td colspan="5">
                  <b-input-group size="sm">
                    <span>{{supplierNumber}}</span>
                  </b-input-group>
                </td>
                <td class="titleColumn">業者名</td>
                <td colspan="5">
                  <b-input-group size="sm">
                    <span>{{supplierName}}</span>
                  </b-input-group>
                </td>
              </tr>
              <tr>
                <td class="titleColumn">所属部署</td>
                <td colspan="11">
                  <span v-if="isReadOnly">{{supplierUser.department}}</span>
                  <b-input-group size="sm" v-if="!isReadOnly">
                    <b-form-input v-model.trim="supplierUser.department" @change="onChange(true)"></b-form-input>
                  </b-input-group>
                </td>
              </tr>
              <tr>
                <td class="titleColumn">
                  <span class="asterisk" v-if="!isReadOnly">*</span>担当者名
                </td>
                <td colspan="3">
                  <span v-if="isReadOnly">{{supplierUser.userName}}</span>
                  <b-input-group size="sm" v-if="!isReadOnly">
                    <b-form-input v-model.trim="supplierUser.userName" @change="onChange(true)"></b-form-input>
                  </b-input-group>
                </td>
                <td class="titleColumn">担当者名カナ</td>
                <td colspan="3">
                  <span v-if="isReadOnly">{{supplierUser.userKana}}</span>
                  <b-input-group size="sm" v-if="!isReadOnly">
                    <b-form-input v-model.trim="supplierUser.userKana" @change="onChange(true)"></b-form-input>
                  </b-input-group>
                </td>
                <td class="titleColumn">TEL</td>
                <td colspan="3">
                  <span v-if="isReadOnly">{{supplierUser.tel}}</span>
                  <BaseInput
                    v-if="!isReadOnly"
                    @onValueChange="onValueChange"
                    :nameInput="appConfig.Name.Tel"
                    :maxlength="appConfig.MaxLength.Tel"
                    :formattedInputValue.sync="supplierUser.tel"
                    @onChange="onChangeInput"
                    :size="sm"
                  ></BaseInput>
                </td>
              </tr>
              <tr>
                <td class="titleColumn">Email</td>
                <td colspan="11">
                  <span v-if="isReadOnly">{{supplierUser.email}}</span>
                  <b-input-group size="sm" v-if="!isReadOnly">
                    <b-form-input v-model.trim="supplierUser.email" @change="onChange(true)"></b-form-input>
                  </b-input-group>
                </td>
              </tr>
              <tr>
                <td class="titleColumn titleColumn-textarea">備考</td>
                <td colspan="11">
                  <span v-if="isReadOnly">{{supplierUser.memo}}</span>
                  <b-form-textarea
                    v-if="!isReadOnly"
                    no-resize
                    size="lg"
                    v-model.trim="supplierUser.memo"
                    @change="onChange(true)"
                  ></b-form-textarea>
                </td>
              </tr>
            </table>
          </div>

          <BaseButtonGroupPermission
            :imgStatus="isUpdate"
            :isPopup="true"
            :isReadOnly="isReadOnly"
            @onAddUpdate="onAddUpdate"
            @onBack="onBack"
          />
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import BaseMessageError from "@/components/BaseMessageError.vue";
import BaseInput from "@/components/BaseInput.vue";
import AppConfig from "@/constants/AppConfig";
import { Message } from "@/constants/Message";
import CountCharacter from "@/shared/CountCharacter";
import { isNullOrEmpty } from "@/shared/utilities";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
export default {
  components: {
    BaseInput,
    BaseMessageError,
    BaseButtonGroupPermission
  },
  props: [
    "isUpdate",
    "supplierUser",
    "title",
    "supplierNumber",
    "supplierName",
    "isReadOnly"
  ],
  data() {
    return {
      appConfig: AppConfig,
      message: [],
      isChangeDataPopUp: false,
      sm: "sm"
    };
  },

  created() {},

  methods: {
    onAddUpdate() {
      this.message = [];
      this.onValidaion();
      if (!this.message.length) {
        this.$emit("onSaveSupplierUser", this.supplierUser);
      }
    },

    onBack() {
      this.message = [];
      // if (this.isChangeDataPopUp) {
      //   const answer = window.confirm(
      //     "Do you really want to leave? you have unsaved changes!"
      //   );
      //   if (answer) {
      //     this.isChangeDataPopUp = false;
      //     return this.$emit("onClosePopUp");
      //   }
      //   return false;
      // }
      // this.isChangeDataPopUp = false;
      this.$emit("onClosePopUp");
    },

    onValueChange(data, name) {
      if (name === this.appConfig.Name.Tel) {
        this.supplierUser.tel = data;
      }
    },

    onValidaion() {
      // User Name
      if (isNullOrEmpty(this.supplierUser.userName)) {
        this.message.push(Message.E00023.formatText("担当者名"));
      }

      // Customer Kana
      if (
        !isNullOrEmpty(this.supplierUser.userKana) &&
        !CountCharacter.isKatakanaHasSpace(this.supplierUser.userKana)
      ) {
        this.message.push(Message.E00028.formatText("担当者名カナ"));
      }

      // TEL
      if (
        !isNullOrEmpty(this.supplierUser.tel) &&
        !CountCharacter.isTelNumber(this.supplierUser.tel)
      ) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      // Email
      if (
        !isNullOrEmpty(this.supplierUser.email) &&
        !CountCharacter.isEmail(this.supplierUser.email)
      ) {
        this.message.push(Message.E00028.formatText("メール"));
      }
    },

    onChange(data) {
      this.isChangeDataPopUp = data;
    },

    onChangeInput(data) {
      this.isChangeDataPopUp = data;
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeDataPopUp) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }
  }
};
</script>
