<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="custom-border"></td>
        <td colspan="6" class="custom-border">
          <span class="asterisk">* {{imgText.general.inputRequired}}</span>
        </td>
        <td class="titleColumn" v-if="status">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2" v-if="status">
          <b-input-group size="sm">
            <span>{{ user.createDate | formatDate }}</span>
          </b-input-group>
        </td>
        <td class="titleColumn" v-if="status">
          <span class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2" v-if="status">
          <b-input-group size="sm">
            <span>{{ user.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.userRoleName}}</td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-select v-model="user.roleCode" :options="operationAuthority" :disabled="true" @change="onChange(true)"></b-form-select>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.department}}
        </td>
        <td colspan="8">
          <b-input-group size="sm">
            <b-input-group size="sm">
              <b-form-input v-model.trim="user.department" @change="onChange(true)"></b-form-input>
            </b-input-group>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.userCode}}
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.userCode" :disabled="true" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.userName}}
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-input-group size="sm">
              <b-form-input v-model.trim="user.userName" @change="onChange(true)"></b-form-input>
            </b-input-group>
          </b-input-group>
        </td>
        <td class="titleColumn">{{imgText.general.userKana}}</td>
        <td colspan="7">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.userKana" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.userPassword}}
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.password" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.sshi0021.tel}}
        </td>
        <td colspan="3">
          <BaseInputPermission
            :nameInput="appConfig.Name.Tel"
            :formattedInputValue="user.tel"
            @onValueChange="onValueChange"
            @onChange="onChangeInput"
          ></BaseInputPermission>
        </td>
        <td class="titleColumn">
          <span v-if="isRequiredEmail" class="asterisk">*</span>
          {{imgText.general.email}}
        </td>
        <td colspan="7">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.email" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.sshi0021.emailNotificationSettings}}</td>
        <td colspan="12" class="form-checkbox">
            <b-form-checkbox class="checkbox" v-model="user.notifyReport" @input="checkRequiredEmail" @change="onChange(true)">終了報告</b-form-checkbox>
            <b-form-checkbox class="checkbox" v-model="user.notifyApprove" @input="checkRequiredEmail" @change="onChange(true)">終了報告承認依頼</b-form-checkbox>
            <b-form-checkbox class="checkbox" v-model="user.notifyExpire" @input="checkRequiredEmail" @change="onChange(true)">報告期限切れ</b-form-checkbox>
            <b-form-checkbox class="checkbox" v-model="user.notifyExpireSoon" @input="checkRequiredEmail" @change="onChange(true)">報告期限切れ予告</b-form-checkbox>
            <b-form-checkbox class="checkbox" v-model="user.notifyLicenseExpire" @input="checkRequiredEmail" @change="onChange(true)">許可証期限切れ</b-form-checkbox>
            <b-form-checkbox class="checkbox" v-model="user.notifyLicenseExpireSoon" @input="checkRequiredEmail" @change="onChange(true)">許可証期限切れ予告</b-form-checkbox>
            <b-form-checkbox class="checkbox" v-model="user.notifyDone" @input="checkRequiredEmail" @change="onChange(true)">完了通知</b-form-checkbox>
        </td>
      </tr>
      <tr>
        <td class="titleColumn custom-memo">
          <span class="asterisk"></span>
          {{imgText.general.sshi0021.groupMemo}}
        </td>
        <td colspan="12" class="form-checkbox">
          <b-form-textarea size="lg" no-resize v-model.trim="user.memo" @change="onChange(true)"></b-form-textarea>
        </td>
      </tr>
    </table>
    <BaseButtonGroup
      :isPopup="isPopup"
      :imgStatus="status"
      @onAddUpdate="onAddUpdate"
      @onBack="onBack"
    />
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import IMText from "@/data/img-text";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import AppConfig from "@/constants/AppConfig";
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import { current } from "@/shared/utilities";
import CountCharacter from "@/shared/CountCharacter";
export default {
  components: {
    BaseButtonGroup,
    BaseInputPermission
  },
  props: ["status", "user", "isRequiredEmail"],
  data() {
    return {
      imgText: IMText,
      isPopup: false,
      appConfig: AppConfig,
      customerCode:
        current.role() === "1"
          ? current.user().customerCode
          : current.customer().customerCode,
      userTmp: {},
      isChangeData: false
    };
  },

  created() {
    this.onBeforeUnLoad();
    this.getDataCombobox(this.currentCustomerCode);
    this.user.roleCode = 1;
  },

  destroyed() {
    this.isChangeData = false;
  },

  methods: {
    onBack() {
      this.$emit("onBack", "userTab1");
    },
    onAddUpdate() {
      if (!this.status) {
        this.userTmp = { ...this.user };
        this.userTmp.roleCode = 1;
        this.userTmp.usertypeCode = 1;
        this.userTmp.customerCode = this.customerCode;
        this.userTmp.userCode = 1;
        this.$emit("onSaveOrUpdateTabOne", this.userTmp);
      } else {
        this.$emit("onSaveOrUpdateTabOne", this.user);
      }
    },
    ShowPopup() {},
    getDataCombobox(customerCode) {
      this.$store.dispatch("generalModule/getOperationAuthorityCode", {
        key1: "操作権限",
        key2: "1"
      });
    },
    onValueChange(data, name) {
      switch (name) {
        case this.appConfig.Name.Tel:
          this.user.tel = data;
          break;
        default:
          break;
      }
    },
    checkRequiredEmail() {
      this.$emit("checkRequiredEmail");
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
    },

    setChangeDate(){
      this.isChangeData = false;
    }
  },
  computed: {
    operationAuthority() {
      const items = this.$store.getters["generalModule/getOperationAuthority"];
      return items;
    }
  }
};
</script>
<style>
.table-box tr td.custom-border {
  border: none;
}
.form-checkbox .checkbox {
  width: 14% !important;
}
.custom-memo {
  line-height: 50px;
}
</style>

