
<template>
  <div>
    <b-card :class="classByWaste">
      <div slot="header">
        <strong class="titleForm">検索条件</strong>
        <b-button variant="dark" class="ml-2 btn-form" size="sm" @click="onReset">リセット</b-button>
        <b-button class="float-right btn-form" variant="dark" size="sm" @click="onSearch">検索</b-button>
      </div>
      <b-form>
        <b-row>
          <b-col cols="4">
            <b-form-group label="発行番号" :label-cols="3">
              <b-input-group>
                <b-form-input v-model="search.manifestNumberFrom"></b-form-input>
                <label class="mt-1 ml-2 mr-2">~</label>
                <b-form-input v-model="search.manifestNumberTo"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <label class="mt-1 mr-4">事業場</label>
            <b-form-select
              v-model="branchCode"
              :options="options"
              style="width:200px"
              @change="onChangeBranch"
            ></b-form-select>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col cols="2"></b-col>
          <b-col cols="2"></b-col>
        </b-row>

        <b-row style="align-items:center">
          <b-col cols="2">
            <b-form-radio-group v-model="selected">
              <b-form-radio value="first">引渡し日</b-form-radio>
              <b-form-radio value="second">登録日</b-form-radio>
            </b-form-radio-group>
          </b-col>
          <b-col cols="4">
            <b-input-group>
              <b-form-input type="date" v-model="fromDate"></b-form-input>
              <label class="mt-1 ml-2 mr-2">~</label>
              <b-form-input type="date" v-model="toDate"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col cols="2">
            <label class="mt-1 mr-4">大分類</label>
            <b-form-select v-model="big" :options="bigOption" style="width:200px"></b-form-select>
          </b-col>
          <b-col cols="2">
            <label class="mt-1 mr-4">中分類</label>
            <b-form-select
              v-model="medium"
              :options="mediumOption"
              :disabled="disabledMedium"
              style="width:200px"
            ></b-form-select>
          </b-col>
          <b-col cols="2">
            <label class="mt-1 mr-4">小分類</label>
            <b-form-select
              v-model="small"
              :options="smallOption"
              :disabled="disabledSmall"
              style="width:200px"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import BaseDropdownbox from "@/components/BaseDropdownbox.vue";
export default {
  components: {
    BaseDropdownbox
  },

  props: [
    "options",
    "classByWaste",
    "currentCustomerCode",
    "currentWasteClass"
  ],

  data() {
    return {
      selected: "first",
      search: {},
      bigOption: [],
      mediumOption: [{ value: "", text: "すべて" }],
      smallOption: [{ value: "", text: "すべて" }],
      big: "",
      medium: "",
      small: "",
      disabledMedium: true,
      disabledSmall: true,
      isShow: true,
      fromDate: "",
      toDate: "",
      branchCode: 0,
      dataSelectBox: []
    };
  },
  created() {
    this.isShow = false;
  },

  async mounted() {
    this.checkShowHideSelectBox();
  },

  methods: {
    onReset() {},

    onSearch() {
      this.setParamSearch();
      this.$emit("onSearch", this.search);
    },

    checkShowHideSelectBox() {
      if (this.dataSelectBox.length > 0) {
        this.bigOption = [...this.dataSelectBox];
        this.bigOption.unshift({ value: "", text: "すべて" });
        this.big = "";
        this.isShow = true;
      } else {
        this.bigOption = [...this.dataSelectBox];
        this.isShow = false;
      }
    },

    setParamSearch() {
      if (this.selected === "first") {
        this.search.DeliveryDateFrom = this.fromDate;
        this.search.DeliveryDateTo = this.toDate;
        this.search.CreateDateFrom = "";
        this.search.CreateDateTo = "";
      } else {
        this.search.CreateDateFrom = this.fromDate;
        this.search.CreateDateTo = this.toDate;
        this.search.DeliveryDateFrom = "";
        this.search.DeliveryDateTo = "";
      }
      if (this.branchCode === 0) {
        this.search.BranchCode = "";
      } else {
        this.search.BranchCode = this.branchCode;
      }
      this.search.WasteTypeBig = this.big;
      this.search.WasteTypeMedium = this.medium;
      this.search.WasteTypeSmall = this.small;
    },

    onChangeBranch(key) {
      this.$emit("onChangeBranch", key);
    },

    getListWasteTypesForBranch() {
      const param = {
        branchCode: this.branchCode ? this.branchCode : 0,
        customerCode: this.currentCustomerCode,
        wasteClass: this.currentWasteClass
      };
      this.$store.dispatch("manifestModule/getListWasteTypesForBranch", param);
    }
  },

  computed: {
    data() {
      return this.$store.state.manifestModule.wasteByBranch;
    }
  },

  watch: {
    big() {
      this.medium = "";
      this.small = "";
      if (this.big !== "") {
        this.disabledMedium = false;
        this.disabledSmall = true;
        this.mediumOption = [
          ...this.bigOption.find(item => item.value === this.big).listMedium
        ];
        this.mediumOption.unshift({ value: "", text: "すべて" });
      } else {
        this.disabledMedium = true;
        this.disabledSmall = true;
      }
    },
    medium() {
      this.small = "";
      if (this.medium !== "") {
        this.disabledSmall = false;
        this.smallOption = [
          ...this.mediumOption.find(item => item.value === this.medium)
            .listSmall
        ];
        this.smallOption.unshift({ value: "", text: "すべて" });
      } else {
        this.disabledSmall = true;
      }
    },

    branchCode() {
      this.getListWasteTypesForBranch();
    },

    dataSelectBox() {
      this.checkShowHideSelectBox();
    },
    options() {
      if (!this.options) {
        return [];
      }
      if (this.options.length > 1) {
        this.branchCode = this.options[0].value;
        return;
      }
      return (this.branchCode =
        this.options && this.options[0].value ? this.options[0].value : 0);
    },

    data() {
      this.dataSelectBox = this.data.listBig;
    }
  }
};
</script>
<style>
.fixed-width-300 {
  width: 300px;
}

.fixed-width {
  width: 200px;
}
</style>