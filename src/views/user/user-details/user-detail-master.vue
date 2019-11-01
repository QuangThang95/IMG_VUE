<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <div class="grid-screen">
        <b-tabs content-class="mt-3" v-model="tabIndex" v-if="loadData && !isReadOnly">
          <b-tab :title="imgText.title.sshi0021Tab01" active v-if="isVisibleTab.tabIndexFirst">
            <UserTab1
              ref="userTab1"
              @onBack="onBack"
              @onSaveOrUpdateTabOne="onSaveOrUpdateTabOne"
              @checkRequiredEmail="checkRequiredEmail"
              :status="imgStatus"
              :user="user"
              :isReadOnly="isReadOnly"
              :isRequiredEmail="isRequiredEmail"
            />
          </b-tab>
          <b-tab :title="imgText.title.sshi0021Tab02" v-if="isVisibleTab.tabIndexSecond">
            <UserTab2
              ref="userTab2"
              @onBack="onBack"
              :dataCombobox="dataCombobox"
              :status="imgStatus"
              :user="user"
              @onSaveOrUpdateTabTwo="onSaveOrUpdateTabTwo"
              :isReadOnly="isReadOnly"
              :isRequiredEmail="isRequiredEmail"
              @checkRequiredEmail="checkRequiredEmail"
            />
          </b-tab>
          <b-tab :title="imgText.title.sshi0021Tab03" v-if="isVisibleTab.tabIndexThird">
            <UserTab3
              ref="userTab3"
              @onBack="onBack"
              :status="imgStatus"
              :dataCombobox="dataCombobox"
              :user="user"
              @onSaveOrUpdateTabThree="onSaveOrUpdateTabThree"
              :isReadOnly="isReadOnly"
              :isRequiredEmail="isRequiredEmail"
              @checkRequiredEmail="checkRequiredEmail"
            />
          </b-tab>
        </b-tabs>

        <b-tabs content-class="mt-3" v-model="tabIndex" v-if="loadData && isReadOnly">
          <b-tab :title="imgText.title.sshi0021Tab01" active v-if="isVisibleTab.tabIndexFirst">
            <UserTabDetail1 @onBack="onBack" :user="user" />
          </b-tab>
          <b-tab :title="imgText.title.sshi0021Tab02" v-if="isVisibleTab.tabIndexSecond">
            <UserTabDetail2 @onBack="onBack" :user="user" />
          </b-tab>
          <b-tab :title="imgText.title.sshi0021Tab03" v-if="isVisibleTab.tabIndexThird">
            <UserTabDetail3 @onBack="onBack" :user="user" />
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
  </div>
</template>
<script>
import BaseMessageError from "@/components/BaseMessageError";
import IMText from "@/data/img-text";
import UserTab1 from "../user-tab/user-tab-tab01";
import UserTab2 from "../user-tab/user-tab-tab02";
import UserTab3 from "../user-tab/user-tab-tab03";
import { MasterProperty } from "@/shared/MasterProperty";
import { Message } from "@/constants/Message";
import CountCharacter from "@/shared/CountCharacter";
import { isNullOrEmpty, handleOutput } from "@/shared/utilities";
import HttpStatus from "http-status-codes";
import { current, canAction, navigation } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import UserTabDetail1 from "../user-tab/user-tab-detail/user-tab-detail01";
import UserTabDetail2 from "../user-tab/user-tab-detail/user-tab-detail02";
import UserTabDetail3 from "../user-tab/user-tab-detail/user-tab-detail03";

export default {
  components: {
    BaseMessageError,
    UserTab1,
    UserTab2,
    UserTab3,
    UserTabDetail1,
    UserTabDetail2,
    UserTabDetail3
  },
  data() {
    return {
      imgText: IMText,
      title: IMText.title.sshi0020,
      message: [],
      imgStatus: Boolean,
      tabIndex: 0,
      currentUser: current.user(),
      customer: current.customer(),
      user: {
        customerCode: "",
        branchCode: "",
        roleCode: "",
        roleName: "",
        department: "",
        userCode: null,
        userName: "",
        userKana: "",
        password: "",
        tel: "",
        email: "",
        memo: "",
        notifyReport: false,
        notifyApprove: false,
        notifyExpire: false,
        notifyExpireSoon: false,
        notifyLicenseExpire: false,
        notifyLicenseExpireSoon: false,
        notifyDone: false,
        usertypeCode: "",
        groupCode: "",
        supplierCode: "",
        factoryCode: "",
        branchName: "",
        groupName: "",
        createDate: "",
        selected: "",
        agentFlag: false
      },
      loadData: false,
      isVisibleTab: {
        tabIndexFirst: true,
        tabIndexSecond: true,
        tabIndexThird: true
      },
      isReadOnly: true,
      isRequiredEmail: false
    };
  },
  created() {
    this.getDataCombobox();
    this.message = [];
    const id = +this.$route.params.userCode;
    const roleCode = +this.$route.params.roleCode;
    if (id > 0 && roleCode > 0) {
      this.imgStatus = true;
      if (canAction(Action.Update, Screen.SSHI0021)) {
        this.title = this.imgText.title.sshi0021;
        this.isReadOnly = false;
      } else if (canAction(Action.Read, Screen.SSHI0021)) {
        this.title = this.imgText.title.sshi0021_detail;
        this.isReadOnly = true;
      }
      this.setUser(id, roleCode);
    } else {
      this.imgStatus = false;
      this.isReadOnly = false;
      this.checkVisibleTab(this.imgStatus);
      this.title = this.imgText.title.sshi0020;
      this.loadData = true;
    }
  },
  methods: {
    onBack(data) {
      if (!this.isReadOnly) {
        let isChangeDate;
        switch (data) {
          case "userTab1":
            isChangeDate = this.$refs["userTab1"].canDeactivate();
            break;
          case "userTab2":
            isChangeDate = this.$refs["userTab2"].canDeactivate();
            break;
          case "userTab3":
            isChangeDate = this.$refs["userTab3"].canDeactivate();
            break;
        }

        if (isChangeDate) {
          if (this.showPopupDirtyForm()) {
            navigation.sshi0019();
          }
          return;
        }
      }
      navigation.sshi0019();
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    async onSaveOrUpdateTabOne(user) {
      this.message = [];
      this.onValidateTabOne(user);
      if (!this.message.length) {
        user.agentFlag = 0;
        await this.onDispath(user);
      }
    },

    async onDispath(user) {
      this.openDl = true;
      if (this.imgStatus === false) {
        await this.$store
          .dispatch("userModule/addUser", user)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.onBack();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        await this.$store
          .dispatch("userModule/updateUser", user)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.onBack();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      }
    },

    onValidateTabOne(user) {
      this.onValidateInfo(user);
    },

    onValidateInfo(user) {
      // check isJWZH
      if (isNullOrEmpty(user.userName)) {
        this.message.push(Message.E00023.formatText("担当者名"));
      } else if (!CountCharacter.isJWZH(user.userName)) {
        this.message.push(Message.E00015.formatText("担当者名"));
      }

      // User Kana
      if (
        !isNullOrEmpty(user.userKana) &&
        !CountCharacter.isKatakanaHasSpace(user.userKana)
      ) {
        this.message.push(Message.E00028.formatText("担当者カナ"));
      }

      if (isNullOrEmpty(user.password)) {
        this.message.push(Message.E00023.formatText("パスワード"));
      } else if (user.password.length < 8) {
        this.message.push(Message.E00044);
      }

      if (!isNullOrEmpty(user.tel) && !CountCharacter.isTelNumber(user.tel)) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      if (!isNullOrEmpty(user.email) && !CountCharacter.isEmail(user.email)) {
        this.message.push(Message.E00028.formatText("Email"));
      }

      if (this.isRequiredEmail && isNullOrEmpty(user.email)) {
        this.message.push(Message.E00023.formatText("Email"));
      }
    },

    getDataCombobox() {
      this.$store.dispatch("generalModule/getDataComboboxRole");
    },

    async onSaveOrUpdateTabTwo(user) {
      this.message = [];
      if (user.roleCode === 1) {
        user.roleCode = "";
      }
      this.onValidateTabTwo(user);
      if (!this.message.length) {
        if (user.agentFlag) {
          user.agentFlag = 1;
        } else {
          user.agentFlag = 0;
        }
        await this.onDispath(user);
      }
    },

    onValidateTabTwo(user) {
      if (isNullOrEmpty(user.roleCode)) {
        this.message.push(Message.E00023.formatText("操作権限"));
      }

      if (user.selected === "first" && isNullOrEmpty(user.branchCode)) {
        this.message.push(Message.E00023.formatText("事業場"));
      }

      if (user.selected === "second" && isNullOrEmpty(user.groupCode)) {
        this.message.push(Message.E00023.formatText("事業場グループ"));
      }
      this.onValidateInfo(user);
    },

    async onSaveOrUpdateTabThree(user) {
      let userTmp = {};
      if (user.roleCode === 1) {
        user.roleCode = "";
      }
      this.userTmp = { ...user };
      this.userTmp.groupName = "";
      this.userTmp.groupCode = "";
      this.message = [];
      this.onValidateTabThree(this.userTmp);
      if (!this.message.length) {
        this.userTmp.agentFlag = 0;
        await this.onDispath(this.userTmp);
      }
    },

    onValidateTabThree(user) {
      if (isNullOrEmpty(user.roleCode)) {
        this.message.push(Message.E00023.formatText("操作権限"));
      }
      if (isNullOrEmpty(user.branchCode)) {
        this.message.push(Message.E00023.formatText("事業場"));
      }
      this.onValidateInfo(user);
    },

    checkVisibleTab(imgStatus) {
      if (!imgStatus) {
        if (this.currentUser.usertypeCode === 1) {
          this.isVisibleTab.tabIndexFirst = true;
          this.isVisibleTab.tabIndexSecond = true;
          this.isVisibleTab.tabIndexThird = true;
          return;
        }
        this.isVisibleTab.tabIndexFirst = false;
        return;
      }

      if (this.user.usertypeCode === 1) {
        this.isVisibleTab.tabIndexFirst = true;
        this.isVisibleTab.tabIndexSecond = false;
        this.isVisibleTab.tabIndexThird = false;
        return;
      }

      if (this.user.usertypeCode === 2) {
        this.isVisibleTab.tabIndexFirst = false;
        this.isVisibleTab.tabIndexSecond = true;
        this.isVisibleTab.tabIndexThird = false;
        return;
      }

      this.isVisibleTab.tabIndexFirst = false;
      this.isVisibleTab.tabIndexSecond = false;
      this.isVisibleTab.tabIndexThird = true;
    },
    setUser(userCode, roleCode) {
      let customerCode;
      if (roleCode === 1) {
        customerCode = this.customer.agentCode;
      } else {
        customerCode = this.customer.customerCode;
      }
      const params = {
        userCode: userCode,
        customerCode: customerCode
      };
      this.$store.dispatch("userModule/getUserById", params).then(response => {
        this.loadData = true;
        if (response.status === HttpStatus.OK) {
          this.user = this.$store.getters["userModule/getUser"];
          if (this.user.agentFlag) {
            this.user.agentFlag = true;
          } else {
            this.user.agentFlag = false;
          }
          this.checkVisibleTab(this.imgStatus);
          this.checkRequiredEmail();
        }
      });
    },
    checkRequiredEmail() {
      if (
        this.user.notifyReport ||
        this.user.notifyApprove ||
        this.user.notifyExpire ||
        this.user.notifyExpireSoon ||
        this.user.notifyLicenseExpire ||
        this.user.notifyLicenseExpireSoon ||
        this.user.notifyDone
      ) {
        this.isRequiredEmail = true;
        return;
      }
      this.isRequiredEmail = false;
    }
  },
  computed: {
    dataCombobox() {
      const items = this.$store.getters["generalModule/getDataComboboxRole"];
      return items;
    }
  },
  watch: {
    tabIndex() {
      this.message = [];
    }
  }
};
</script>
