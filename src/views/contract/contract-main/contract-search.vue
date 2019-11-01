<template>
  <div>
    <b-card :class="classByWaste">
      <div slot="header">
        <strong class="titleForm">{{imgText.general.titleSearch}}</strong>
        <b-button class="ml-2 btn-form" size="sm" @click="onReset">{{imgText.general.reset}}</b-button>
        <b-form-checkbox
          class="checkbox cb-header-search"
          v-model="search.isShowAllContract"
        >すべての契約を表示</b-form-checkbox>
        <b-button
          class="float-right btn-form"
          size="sm"
          @click="onSearch"
        >{{imgText.general.search}}</b-button>
      </div>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group :label="imgText.general.branch" :label-cols="2">
              <b-form-select
                v-model="search.branchCode"
                :options="branchOptions"
                @change="onChangeBranch"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgText.general.contractName" :label-cols="2">
              <b-form-input type="text" v-model.trim="search.contractName" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgText.general.supplierName" :label-cols="2">
              <b-form-input type="text" v-model.trim="search.supplierName" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgText.general.wasteName" :label-cols="3">
              <b-form-input type="text" v-model.trim="search.wasteName" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { current } from "@/shared/utilities";
import IMText from "@/data/img-text";
export default {
  props: ["search", "branchOptions", "classByWaste"],
  data() {
    return {
      imgText: IMText,
      currentCustomer: current.customer()
    };
  },

  methods: {
    onSearch() {
      this.$emit("onSearch");
    },

    onReset() {
      this.$emit("onReset");
    },

    onChangeBranch(key) {
      this.$emit("onChangeBranch", key, false);
    }
  },

  computed: {}
};
</script>

<style lang="scss">
.cb-header-search {
  display: inline-block !important;
  margin-left: 100px;
}
</style>
