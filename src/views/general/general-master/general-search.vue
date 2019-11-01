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
          :disabled="!search.key1"
        >{{imgtext.general.search}}</b-button>
      </div>
      <b-form class="sshi0022-search">
        <b-row class="sshi0022-row">
          <b-col cols="1">{{imgtext.general.fshi0008.key1}}</b-col>
          <b-col cols="2">
            <b-form-input type="text" autocomplete="name" v-model.trim="search.key1" disabled></b-form-input>
          </b-col>
          <b-col cols="1">{{imgtext.general.fshi0008.key1Desc}}</b-col>
          <b-col cols="5">
            <b-form-input type="text" autocomplete="name" v-model.trim="search.key1Desc" disabled></b-form-input>
          </b-col>
          <b-col cols="1">
            <b-button
              variant="dark"
              class="ml-2 btn-form"
              size="sm"
              @click="showPopup"
            >{{imgtext.general.btnChoice}}</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="1">{{imgtext.general.fshi0008.key2}}</b-col>
          <b-col cols="2">
            <b-form-input type="text" autocomplete="name" v-model.trim="search.key2"></b-form-input>
          </b-col>
          <b-col cols="1">{{imgtext.general.fshi0008.key3}}</b-col>
          <b-col cols="2">
            <b-form-input type="text" autocomplete="name" v-model.trim="search.key3"></b-form-input>
          </b-col>
          <b-col cols="1">{{imgtext.general.fshi0008.data1}}</b-col>
          <b-col cols="2">
            <b-form-input type="text" autocomplete="name" v-model.trim="search.data1"></b-form-input>
          </b-col>
          <b-col cols="1">{{imgtext.general.fshi0008.data2}}</b-col>
          <b-col cols="2">
            <b-form-input type="text" autocomplete="name" v-model.trim="search.data2"></b-form-input>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <GeneralPopup :popupId="popupId" @onSendDataGenera="onSendDataGenera"/>
  </div>
</template>

<script>
import IMText from "@/data/img-text";
import GeneralPopup from "../general-popup/general-popup";
export default {
  components: {
    GeneralPopup
  },
  props: ["search"],
  data() {
    return {
      imgtext: IMText,
      popupId: "popupId",
    };
  },
  
  methods: {
    onReset() {
      this.$emit("onReset");
    },

    onSearch() {
      this.$emit("onSearch");
    },
    showPopup() {
      this.$bvModal.show(this.popupId);
    },
    onSendDataGenera(data) {
      this.search.key1 = data.key1;
      this.search.key1Desc = data.key1Desc;
    }
  } 
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.row.sshi0022-row {
  margin-bottom: 1em;
}
.sshi0022-search .col-1 {
  line-height: 38px;
}
.sshi0022-search { 
  padding-bottom: 15px;
}
</style>
