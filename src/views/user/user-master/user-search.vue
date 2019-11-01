<template>
  <div>
    <b-card>
      <div slot="header">
        <strong class="titleForm">{{imgtext.general.titleSearch}}</strong>
        <b-button
          variant="dark"
          class="ml-2 btn-form"
          size="sm"
          @click="onReset"
        >{{imgtext.general.reset}}</b-button>
        <b-button
          class="float-right btn-form"
          variant="dark"
          size="sm"
          @click="onSearch"
        >{{imgtext.general.search}}</b-button>
      </div>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group :label="imgtext.general.sshi0019.branchName" :label-cols="3">
              <b-form-select v-model="search.dischargeBusiness" :options="customerBranch"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgtext.general.usertypeName" :label-cols="3">
              <b-form-select v-model="search.divisionIncharge" :options="divisionInChargeOption"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgtext.general.userRoleName" :label-cols="3">
              <b-form-select v-model="search.operationAuthority" :options="operationAuthority"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label="imgtext.general.userCode" :label-cols="3">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.contactCode"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgtext.general.userContact" :label-cols="3">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.contactName"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgtext.general.userContactKana" :label-cols="3">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.nameInCharge"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import IMText from "@/data/img-text";
import { current, common } from "@/shared/utilities";
import { General } from "@/models/general.model";
export default {
  props: ["search"],
  data() {
    return {
      selected: null,
      currentCustomerCode: current.customer().customerCode,
      currentUser: current.user(),
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" }
      ],
      userCode: "",
      tel: "",
      imgtext: IMText,
      user: {}
    };
  },

  created() {
    this.getDataCombobox(this.currentCustomerCode);
    this.onReset();
  },

  methods: {
    onReset() {
      this.$emit("onReset");
    },

    onSearch() {
      this.$emit("onSearch");
    },

    getDataCombobox(customerCode) {
      this.$store.dispatch("generalModule/getDivisionInChargeCode", {
        key1: "担当区分"
      });

      this.$store.dispatch("generalModule/getOperationAuthorityCode", {
        key1: "操作権限"
      });
      this.$store.dispatch(
        "customerBranchModule/getCustomerBranchs",
        customerCode
      );
    },

    divDataByRole(items) {
      if (this.currentUser.roleCode != 1) {
        return items.filter(item => item.value != 1);
      }
      return items;
    }
  },

  computed: {
    divisionInChargeOption() {
      const items = this.$store.getters["generalModule/getDivisionInCharge"];
      return this.divDataByRole(items);
    },

    operationAuthority() {
      const items = this.$store.getters["generalModule/getOperationAuthority"];
      return this.divDataByRole(items);
    },

    customerBranch() {
      let items = this.$store.getters[
        "customerBranchModule/getCustomerBranchs"
      ];
      items.unshift(new General());
      items = common.formatObjectSelection(items, ["branchCode", "branchName"]);
      return items;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
