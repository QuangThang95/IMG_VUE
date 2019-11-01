<template>
  <div v-if="isShow">
    <b-form-select
      size="sm"
      class="col-md-3 mr-2"
      v-model="big"
      :options="bigOption"
      @change="onChange(1)"
    ></b-form-select>
    <b-form-select
      size="sm"
      class="col-md-3 mr-2"
      v-model="medium"
      :options="mediumOption"
      :disabled="disabledMedium"
      @change="onChange(2)"
    ></b-form-select>
    <b-form-select
      size="sm"
      class="col-md-3 mr-2"
      v-model="small"
      :options="smallOption"
      :disabled="disabledSmall"
      @change="onChange(3)"
    ></b-form-select>
    <b-button class="btn-form mr-2" size="sm" @click="onSearch">{{ imgText.general.search }}</b-button>
  </div>
</template>

<script>
import IMText from "@/data/img-text.json";
import AppConfig from "../constants/AppConfig";

export default {
  props: {
    params: {
      type: Object,
      default: {
        branchCode: 0,
        customerCode: 0,
        wasteClass: 0
      }
    },
    dataSelectBox: {
      type: Array,
      default: () => []
    },
    dataSearchTab: {
      type: Object,
      default: {
        big: "",
        medium: "",
        small: ""
      }
    }
  },
  data() {
    return {
      imgText: IMText,
      isShow: true,
      bigOption: [],
      mediumOption: [{ value: "", text: "すべて" }],
      smallOption: [{ value: "", text: "すべて" }],
      disabledMedium: true,
      disabledSmall: true,
      big: AppConfig.ThreeSelectBox.big,
      medium: AppConfig.ThreeSelectBox.medium,
      small: AppConfig.ThreeSelectBox.small
    };
  },

  created() {
    this.isShow = false;
    // this.big = this.dataSearchTab.big;
    // this.medium = this.dataSearchTab.medium;
    // this.small = this.dataSearchTab.small;
  },

  async mounted() {
    this.checkShowHideSelectBox();
  },

  methods: {
    onSearch() {
      const body = {
        branchCode: this.params.branchCode,
        customerCode: this.params.customerCode,
        wasteClass: this.params.wasteClass,
        dataSearch: {
          big: this.big,
          medium: this.medium,
          small: this.small
        }
      };
      this.$emit("onSearch", body);
    },

    checkShowHideSelectBox() {
      if (this.dataSelectBox.length > 0) {
        this.bigOption = [...this.dataSelectBox];
        this.bigOption.unshift({ value: "", text: "すべて" });
        this.big = "";
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },

    onChange(value) {
      switch (value) {
        case 1:
          AppConfig.ThreeSelectBox.big = this.big;
          break;
        case 2:
          AppConfig.ThreeSelectBox.medium = this.medium;
          break;
        case 3:
          AppConfig.ThreeSelectBox.small = this.small;
          break;
        default:
          break;
      }
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

    dataSelectBox() {
      this.checkShowHideSelectBox();
    }
  }
};
</script>
