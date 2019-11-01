<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="custom-border"></td>
        <td colspan="6" class="custom-border"></td>
        <td colspan="6" style="padding-left:100px; border-right: 0px; border-top: 0px">
          <b-form-checkbox
            class="checkbox"
            v-model="user.dischargeWasteClass1"
          >{{imgText.general.sshi0021.managementCompany}}</b-form-checkbox>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.sshi0021.referenceRange}}</td>
        <td colspan="6">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
            class="radio-custom"
          >
            <b-form-radio value="first" :disabled="true">事業場</b-form-radio>
            <b-form-radio value="second" :disabled="true">事業場グループ</b-form-radio>
            <b-form-radio value="third" :disabled="true">全事業場</b-form-radio>
          </b-form-radio-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>登録日時
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <span>{{ user.createDate | formatDate }}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>最終更新日時
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <span>{{ user.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.sshi0021.businessSite}}</td>
        <td colspan="6">
          <b-row>
            <b-col md="10">
              <b-input-group size="sm">
                <span>{{ user.branchName}}</span>
              </b-input-group>
            </b-col>
            <b-col md="2">
            </b-col>
          </b-row>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.sshi0021.businessGroup}}
        </td>
        <td colspan="6">
          <b-row>
            <b-col md="10">
              <b-input-group size="sm">
                <span>{{ user.groupName}}</span>
              </b-input-group>
            </b-col>
            <b-col md="2">
            </b-col>
          </b-row>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.userRoleName}}
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <span>{{ user.roleName}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.department}}
        </td>
        <td colspan="7">
          <b-input-group size="sm">
            <span>{{ user.department}}</span>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.userCode}}</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{ user.userCode}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.userName}}
        </td>
        <td colspan="4">
          <b-input-group size="sm">
            <span>{{ user.userName}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.userKana}}
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <span>{{ user.userKana}}</span>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.userPassword}}</td>
        <td colspan="3">
          <b-input-group size="sm">
            <span>{{ user.password}}</span>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.tel}}
        </td>
        <td colspan="4">
          <span>{{ user.tel}}</span>
        </td>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.email}}
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <span>{{ user.email}}</span>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">{{imgText.general.sshi0021.emailNotificationSettings}}</td>
        <td colspan="12" class="form-checkbox">
          <b-form-checkbox class="checkbox" v-model="user.notifyReport" :disabled="true">終了報告</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyApprove" :disabled="true">終了報告承認依頼</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyExpire" :disabled="true">報告期限切れ</b-form-checkbox>
          <b-form-checkbox
            class="checkbox"
            v-model="user.notifyExpireSoon"
            :disabled="true"
          >報告期限切れ予告</b-form-checkbox>
          <b-form-checkbox
            class="checkbox"
            v-model="user.notifyLicenseExpire"
            :disabled="true"
          >許可証期限切れ</b-form-checkbox>
          <b-form-checkbox
            class="checkbox"
            v-model="user.notifyLicenseExpireSoon"
            :disabled="true"
          >許可証期限切れ予告</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="user.notifyDone" :disabled="true">完了通知</b-form-checkbox>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>
          {{imgText.general.sshi0021.groupMemo}}
        </td>
        <td colspan="12" class="form-checkbox">
          <span>{{ user.memo}}</span>
        </td>
      </tr>
    </table>
    <b-button class="btn-form btn-custom" size="sm" @click="onBack">{{imgText.general.btnReturn}}</b-button>
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import IMText from "@/data/img-text";
import BaseInputPermission from "@/components/BaseInputPermission.vue";
export default {
  components: {
    BaseButtonGroup,
    BaseInputPermission
  },
  props: ["user"],
  data() {
    return {
      imgText: IMText,
      selected: ""
    };
  },
  created() {
    this.initState();
  },
  methods: {
    onBack() {
      this.$emit("onBack");
    },
    initState() {
      if (this.user.branchCode) {
        this.selected = "first";
        return;
      }

      if (this.user.groupCode) {
        this.selected = "second";
        return;
      }

      this.selected = "third";
    }
  },
  computed: {}
};
</script>
<style>
.form-checkbox .checkbox {
  width: 14% !important;
}
.table-box tr td.custom-border {
  border: none;
}
.btn-custom {
  float: right;
}
</style>
