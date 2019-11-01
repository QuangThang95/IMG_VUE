<template>
  <div class="login">
    <title>{{ imgText.title.sshi0037 }}</title>
    <b-card
      header="SHIGEN Cloud"
      header-text-variant="white"
      header-bg-variant="danger"
      align="center"
      class="mx-auto"
    >
      <b-container>
        <div v-if="messageError.length > 0" class="alert alert-danger">
          <div class="fontColor" v-for="item in messageError" :key="item">{{item}}</div>
        </div>
        <b-form>
          <b-row class="input">
            <b-col cols="5">
              <span>{{ imgText.general.customerCode }}</span>
            </b-col>
            <b-col cols="6">
              <b-form-input :type="'text'" v-model="user.customerCode" v-on:keyup.enter="login"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="input">
            <b-col cols="5">
              <span class="pt-2">{{ imgText.general.userCode }}</span>
            </b-col>
            <b-col cols="6">
              <b-form-input :type="'text'" v-model="user.userCode" v-on:keyup.enter="login"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="input">
            <b-col cols="5">
              <span>パスワード</span>
            </b-col>
            <b-col cols="6">
              <b-form-input
                :type="'password'"
                v-model="user.password"
                :maxlength="16"
                v-on:keyup.enter="login"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="5"></b-col>
            <b-col cols="6">
              <b-form-checkbox v-model="remember">{{ imgText.general.rememberMe }}</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="input">
            <b-col cols="11">
              <b-button @click="login">{{ imgText.title.sshi0037 }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { CustomerService } from "@/services/customer.service";
import HttpStatus from "http-status-codes";
import { Message } from "@/constants/Message";
import { navigation, handleOutput, current } from "@/shared/utilities";
import IMtext from "@/data/img-text.json";

const customerService = new CustomerService();

export default {
  data() {
    return {
      user: {
        userCode: "",
        password: "",
        customerCode: ""
      },
      imgText: IMtext,
      isErrorMessage: false,
      remember: false,
      messageError: []
    };
  },
  methods: {
    async login() {
      this.messageError = [];
      this.onValidateLogin();
      if (!this.messageError.length) {
        await this.$store
          .dispatch("authModule/login", this.user)
          .then(resp => {
            if (resp && resp.status === HttpStatus.OK) {
              const token = resp.data.token;
              const role = resp.data.user.roleCode.toString();
              const permission = resp.data.user.permission;
              localStorage.setItem("token", token);
              localStorage.setItem("role", role);
              localStorage.setItem("permission", permission);
              localStorage.setItem("user", JSON.stringify(resp.data.user));
              localStorage.setItem("remember", `${this.remember}`);
              if (role === "1") {
                this.$store.dispatch(
                  "menuModule/setCustomer",
                  current.customer()
                );
                navigation.sshi0025();
              } else {
                this.$store.dispatch(
                  "menuModule/setCustomer",
                  resp.data.user.customer
                );
                navigation.sshi0038();
              }
            }
          })
          .catch(resp => {
            localStorage.removeItem("token");
            this.messageError = handleOutput.errorHandle(resp);
          });
      }
    },

    onValidateLogin() {
      if (this.user.customerCode === "") {
        this.messageError.push(Message.E00023.formatText("会社コード"));
      }

      if (this.user.userCode === "") {
        this.messageError.push(Message.E00023.formatText("担当者コード"));
      }

      if (this.user.password === "") {
        this.messageError.push(Message.E00023.formatText("パスワード"));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/login/_login.scss";
</style>
