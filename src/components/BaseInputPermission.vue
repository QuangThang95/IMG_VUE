<template>
  <div>
    <b-input-group size="sm">
      <b-form-input
        :readonly="readonly"
        v-model.trim="initData"
        @keyup="focusOut"
        @blur="focusOut"
        @keypress="onKeyPress"
        @change="onChange(true)"
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
import AppConfig from "@/constants/AppConfig";
export default {
  props: ["nameInput", "formattedInputValue", "readonly"],
  data() {
    return {
      inputValue: 0,
      appConfig: AppConfig,
      initData: ""
    };
  },
  methods: {
    focusOut(event) {
      this.inputValue = this.initData.replace(/\D/g, "");
      if (this.nameInput === this.appConfig.Name.PostalCode) {
        this.checkPostalCode();
      }
      if (
        this.nameInput === this.appConfig.Name.Tel ||
        this.nameInput === this.appConfig.Name.Fax
      ) {
        this.checkTelFax();
      }
      this.$emit("update:formattedInputValue", this.initData);
      this.$emit("onValueChange", this.initData, this.nameInput);
    },

    checkPostalCode() {
      this.inputValue = this.inputValue.substring(0, 7);
      return (this.initData = this.inputValue.replace(
        /(\d{3})(\d{4})/,
        "$1-$2"
      ));
    },

    checkTelFax() {
      this.inputValue = this.inputValue.substring(0, 11);
      if (this.inputValue.length === 8) {
        return (this.initData = this.inputValue.replace(
          /(\d{2})(\d{4})(\d{2})/,
          "$1-$2-$3"
        ));
      }
      if (this.inputValue.length === 9) {
        return (this.initData = this.inputValue.replace(
          /(\d{2})(\d{4})(\d{3})/,
          "$1-$2-$3"
        ));
      }
      if (this.inputValue.length === 10) {
        return (this.initData = this.inputValue.replace(
          /(\d{2})(\d{4})(\d{4})/,
          "$1-$2-$3"
        ));
      }
      if (this.inputValue.length === 11) {
        return (this.initData = this.inputValue.replace(
          /(\d{3})(\d{4})(\d{4})/,
          "$1-$2-$3"
        ));
      }
    },
    onKeyPress(evt) {
      if (
        evt.keyCode !== AppConfig.KeyCode.Backspace &&
        evt.keyCode !== AppConfig.KeyCode.Shift &&
        evt.keyCode !== AppConfig.KeyCode.Tab &&
        (evt.keyCode < AppConfig.KeyCode.MinNumber ||
          evt.keyCode > AppConfig.KeyCode.MaxNumber)
      ) {
        evt.preventDefault();
        return;
      }
    },

    onProp(value) {
      this.initData = value;
    },

    onChange(data) {
      this.$emit("onChange", data);
    }
  },

  mounted() {
    this.onProp(this.formattedInputValue);
    this.$watch("formattedInputValue", this.onProp);
  }
};
</script>
