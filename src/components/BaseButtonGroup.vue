<template>
  <div>
    <div class="float-right pb-3">
      <b-button
        class="btn-form"
        size="sm"
        :disabled="disabledButton"
        @click="onAddUpdate"
      >{{ btnSubmit }}</b-button>
      <b-button class="btn-form ml-4" size="sm" @click="onBack" v-if="visibleClose">{{ btnReturn }}</b-button>
    </div>
  </div>
</template>

<script>
import IMText from "@/data/img-text";

export default {
  props: {
    isPopup: {
      default: false,
      type: Boolean
    },
    imgStatus: {
      default: false,
      type: Boolean
    },
    disabledButton: {
      default: false,
      type: Boolean
    },
    visibleClose: {
      default: true,
      type: Boolean
    },
  },
  data() {
    return {
      imgText: IMText,
      btnSubmit: IMText.general.btnAdd,
      btnReturn: IMText.general.btnReturn
    };
  },
  created() {
    this.btnSubmit = this.imgStatus
      ? this.imgText.general.btnUpdate
      : this.imgText.general.btnAdd;
    this.btnReturn = this.isPopup
      ? this.imgText.general.btnClose
      : this.imgText.general.btnReturn;
  },
  methods: {
    onAddUpdate() {
      this.$emit("onAddUpdate");
    },
    onBack() {
      this.$emit("onBack");
    }
  }
};
</script>
