<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="custom-border"></td>
        <td colspan="6" class="custom-border">
          <span class="asterisk">* {{imgText.general.inputRequired}}</span>
        </td>
        <td colspan="6" style="padding-left:100px; border-right: 0px; border-top: 0px">
          <b-form-checkbox
            class="checkbox"
            v-model="user.agentFlag"
            @change="changeValue(true)"
          >{{imgText.general.sshi0021.managementCompany}}</b-form-checkbox>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.sshi0021.referenceRange}}
        </td>
        <td colspan="6">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
            class="radio-custom"
            v-on:change="onChange($event)"
          >
            <b-form-radio value="first" :disabled="!stateRadioButton.first" @change="changeValue(true)">事業場</b-form-radio>
            <b-form-radio value="second" :disabled="!stateRadioButton.second" @change="changeValue(true)">事業場グループ</b-form-radio>
            <b-form-radio value="third" :disabled="!stateRadioButton.third" @change="changeValue(true)">全事業場</b-form-radio>
          </b-form-radio-group>
        </td>
        <td colspan="6" v-if="!status"></td>
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
        <td class="titleColumn">
          <span class="asterisk" v-if="selected === 'first'">*</span>
          {{imgText.general.sshi0021.businessSite}}</td>
        <td colspan="6">
          <b-row>
            <b-col md="10">
              <b-input-group size="sm">
                <b-form-input v-model.trim="user.branchName" :disabled="true" @change="changeValue(true)"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col md="2">
              <div class="float-right">
                <b-button
                  class="btn-form"
                  size="sm"
                  @click="ShowPopup01"
                  :disabled="stateForm.isDisableBranch"
                >{{imgText.general.btnChoice}}</b-button>
              </div>
            </b-col>
          </b-row>
        </td>
        <td class="titleColumn">
          <span class="asterisk"  v-if="selected === 'second'">*</span>
          {{imgText.general.sshi0021.businessGroup}}
        </td>
        <td colspan="6">
          <b-row>
            <b-col md="10">
              <b-input-group size="sm">
                <b-form-input v-model.trim="user.groupName" :disabled="true" @change="changeValue(true)"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col md="2">
              <div class="float-right">
                <b-button
                  class="btn-form"
                  size="sm"
                  @click="ShowPopup02"
                  :disabled="stateForm.isDisableGroup"
                >{{imgText.general.btnChoice}}</b-button>
              </div>
            </b-col>
          </b-row>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.userRoleName}}
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-select v-model="user.roleCode" :options="dataCombobox" @change="changeValue(true)"></b-form-select>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.department}}
        </td>
        <td colspan="7">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.department" @change="changeValue(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.userCode}}</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.userCode" :disabled="true" @change="changeValue(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.userName}}
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.userName" @change="changeValue(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.userKana}}
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.userKana" @change="changeValue(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.userPassword}}
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.password" @change="changeValue(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.sshi0021.tel}}
        </td>
        <td colspan="4">
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
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input v-model.trim="user.email" @change="changeValue(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.sshi0021.emailNotificationSettings}}</td>
        <td colspan="12" class="form-checkbox">
          <b-form-checkbox class="checkbox" v-model="user.notifyReport" @input="checkRequiredEmail" @change="changeValue(true)">終了報告</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyApprove" @input="checkRequiredEmail" @change="changeValue(true)">終了報告承認依頼</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyExpire" @input="checkRequiredEmail" @change="changeValue(true)">報告期限切れ</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyExpireSoon" @input="checkRequiredEmail" @change="changeValue(true)">報告期限切れ予告</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyLicenseExpire" @input="checkRequiredEmail" @change="changeValue(true)">許可証期限切れ</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyLicenseExpireSoon" @input="checkRequiredEmail" @change="changeValue(true)">許可証期限切れ予告</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyDone" @input="checkRequiredEmail" @change="changeValue(true)">完了通知</b-form-checkbox>
        </td>
      </tr>

      <tr>
        <td class="titleColumn custom-memo">
          <span class="asterisk"></span>
          {{imgText.general.sshi0021.groupMemo}}
        </td>
        <td colspan="12" class="form-checkbox">
          <b-form-textarea size="lg" no-resize v-model.trim="user.memo" @change="changeValue(true)"></b-form-textarea>
        </td>
      </tr>
    </table>
    <BaseButtonGroup
      :isPopup="isPopup"
      :imgStatus="status"
      @onAddUpdate="onAddUpdate"
      @onBack="onBack"
    />
    <UserPopup01 @onSendDataBranch="onSendDataBranch" :popupId="popupId01"/>
    <UserPopup02 :popupId="popupId" @onSendDataGroup="onSendDataGroup"/>
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import UserPopup01 from "../user-popup/user-popup01";
import UserPopup02 from "../user-popup/user-popup02";
import IMText from "@/data/img-text";
import { current } from "@/shared/utilities";
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import AppConfig from "@/constants/AppConfig";
import HttpStatus from "http-status-codes";
import CountCharacter from "@/shared/CountCharacter";
export default {
  components: {
    BaseButtonGroup,
    UserPopup01,
    UserPopup02,
    BaseInputPermission
  },
  props: ["dataCombobox", "status", "user", "isRequiredEmail"],
  data() {
    return {
      imgText: IMText,
      isPopup: false,
      popupId: "sshi0021-tab02-popup-02",
      selected: "",
      currentUser: current.user(),
      stateRadioButton: {
        first: true,
        second: true,
        third: true
      },
      stateForm: {
        isDisableBranch: false,
        isDisableGroup: false
      },
      customer: current.customer(),
      userTmp: {},
      customerCode: current.customer().customerCode,
      appConfig: AppConfig,
      popupId01: "sshi0021-popup-01",
      groupName: "",
      groupCode: "",
      isChangeData: false
    };
  },
  created() {
    this.onBeforeUnLoad();
    this.initState();
  },

  destroyed() {
    this.isChangeData = false;
  },
  
  methods: {
    onBack() {
      this.$emit("onBack","userTab2");
    },
    onAddUpdate() {
      if (!this.status) {
        this.userTmp = { ...this.user };
        this.userTmp.usertypeCode = 2;
        this.userTmp.customerCode = this.customerCode;
        this.userTmp.userCode = 1;
        this.userTmp.selected = this.selected;
        this.$emit("onSaveOrUpdateTabTwo", this.userTmp);
      } else {
        this.user.selected = this.selected;
        this.$emit("onSaveOrUpdateTabTwo", this.user);
      }
    },
    ShowPopup02() {
      this.$bvModal.show(this.popupId);
    },
    ShowPopup01() {
      this.$bvModal.show(this.popupId01);
    },
    initState() {
      if (this.status) {
        if (this.checkPermissionBranch()) {
          this.initStatePermisBranchMana();
          return;
        }

        if (this.checkPermissionGroupMana()) {
          this.initStatePermisGroupManage();
          return;
        }

        if (this.status && this.user.branchCode) {
          this.stateForm.isDisableBranch = false;
          this.stateForm.isDisableGroup = true;
          this.selected = "first";
          return;
        }

        if (this.status && this.user.groupCode) {
          this.stateForm.isDisableBranch = true;
          this.stateForm.isDisableGroup = false;
          this.selected = "second";
          return;
        }

        this.stateForm.isDisableBranch = true;
        this.stateForm.isDisableGroup = true;
        this.selected = "third";
        return;
      }
      this.setStateInit();
    },
    onChange($event) {
      this.setstateForm($event);
    },

    setstateForm($event) {
      if (this.checkPermissionBranch()) {
        return;
      }
      if ($event === "first") {
        this.stateForm.isDisableBranch = false;
        this.stateForm.isDisableGroup = true;
        this.user.groupCode = "";
        this.user.groupName = "";
        return;
      }

      if ($event === "second") {
        if (this.checkPermissionGroupMana()) {
          this.stateForm.isDisableGroup = true;
          this.stateForm.isDisableBranch = true;
          this.user.groupCode = this.groupCode;
          this.user.groupName = this.groupName;
          return;
        }

        this.stateForm.isDisableBranch = true;
        this.stateForm.isDisableGroup = false;
        this.user.branchCode = "";
        this.user.branchName = "";
        return;
      }
      this.user.groupCode = "";
      this.user.groupName = "";
      this.user.branchCode = "";
      this.user.branchName = "";
      this.stateForm.isDisableBranch = true;
      this.stateForm.isDisableGroup = true;
    },
    async setStateInit() {
      if (
        (this.currentUser && this.currentUser.roleCode === 1) ||
        (this.currentUser.groupCode === null &&
          this.currentUser.branchCode === null)
      ) {
        this.stateRadioButton.first = true;
        this.stateRadioButton.second = true;
        this.stateRadioButton.third = true;
        this.selected = "third";
        this.setstateForm(this.selected);
        return;
      }

      await this.setDataPermissBranchMan();
      await this.setDataPermissGroupMan();
    },
    async setDataPermissBranchMan() {
      if (this.checkPermissionBranch()) {
        this.initStatePermisBranchMana(); 
        this.user.branchCode = this.currentUser.branchCode;
        await this.$store
          .dispatch(
            "customerBranchModule/getCustomerBranchs",
            this.customerCode
          )
          .then(res => {
            if (res.status === HttpStatus.OK) {
              const items = this.$store.getters[
                "customerBranchModule/getCustomerBranchs"
              ];

              if (items.length > 0) {
                this.user.branchName = items[0].branchName;
              }
            }
          });
      }
    },
    async setDataPermissGroupMan() {
      if (this.checkPermissionGroupMana()) {
        this.user.groupCode = this.currentUser.groupCode;
        this.groupCode = this.currentUser.groupCode;
        this.initStatePermisGroupManage();

        await this.$store
          .dispatch("customerGroupModule/getCustomerGroup", this.customerCode)
          .then(res => {
            if (res.status === HttpStatus.OK && res.data.length > 0) {
              let data = res.data.find(
                item => item.groupCode == this.user.groupCode
              );
              if (data) {
                this.groupName = data.groupName;
                this.user.groupName = data.groupName;
              }
            }
          });
      }
    },
    initStatePermisBranchMana() {
      this.stateRadioButton.first = true;
      this.stateRadioButton.second = false;
      this.stateRadioButton.third = false;
      this.stateForm.isDisableBranch = true;
      this.stateForm.isDisableGroup = true;
      this.selected = "first";
    },

    initStatePermisGroupManage() {
      this.stateForm.isDisableGroup = true;
      this.stateForm.isDisableBranch = true;
      this.stateRadioButton.third = false;

      this.groupName = this.user.groupName;
      this.groupCode = this.user.groupCode;
      if (this.user.branchCode) {
        this.selected = "first";
        return;
      }

      if (this.user.groupCode) {
        this.selected = "second";
        return;
      }
    },

    onSendDataBranch(data) {
      if (!data) {
        return;
      }
      this.user.branchCode = data.branchCode;
      this.user.branchName = data.branchName;
    },

    onSendDataGroup(data) {
      if (!data) {
        return;
      }
      this.user.groupCode = data.groupCode;
      this.user.groupName = data.groupName;
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
    checkPermissionBranch() {
      if (
        this.currentUser &&
        this.currentUser.roleCode === 2 &&
        this.currentUser.branchCode !== null
      ) {
        return true;
      } else {
        return false;
      }
    },
    checkPermissionGroupMana() {
      if (
        this.currentUser &&
        this.currentUser.roleCode === 2 &&
        this.currentUser.groupCode !== null
      ) {
        return true;
      } else {
        return false;
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

    changeValue(data) {
      this.isChangeData = data;
    },

    onChangeInput(data) {
      this.isChangeData = data;
    },
    canDeactivate() {
      return this.isChangeData;
    },

  },
  computed: {}
};
</script>
<style>
.radio-custom {
  display: flex;
  justify-content: space-between;
}
.form-checkbox .checkbox {
  width: 14% !important;
}
.table-box tr td.custom-border {
  border: none;
}
</style>

