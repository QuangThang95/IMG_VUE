<template>
  <div>
    <b-card>
      <div slot="header">
        <strong class="titleForm">{{imgtext.general.titleSearch}}</strong>
        <b-button variant="dark" class="ml-2 btn-form" size="sm" @click="onReset">{{imgtext.general.reset}}</b-button>
        <b-button class="float-right btn-form" variant="dark" size="sm" @click="onSearch">{{imgtext.general.search}}</b-button>
      </div>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group label="業者番号" :label-cols="2">
              <b-form-input
                type="text"
                autocomplete="name"
                class="input-width"
                v-model.trim="search.supplierNumber"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="業者名" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.supplierName"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="業者名カナ" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.supplierKana"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="所在地" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.address"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="TEL" :label-cols="2">
              <BaseInput
                size='md'
                class='input-width'
                @onValueChange="onValueChange"
                :nameInput="appConfig.Name.Tel"
                :maxlength="appConfig.MaxLength.Tel"
                :formattedInputValue.sync="search.tel"
              ></BaseInput>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import IMText from "@/data/img-text";
import BaseInput from "@/components/BaseInput.vue";
import AppConfig from "@/constants/AppConfig";
export default {

  components: {
    BaseInput
  },
  props: ["search"],

  data() {
    return {
      appConfig: AppConfig,
      imgtext: IMText,
    };
  },

  methods: {
    onReset() {
      this.$emit("onReset");
    },

    onSearch() {
      this.$emit("onSearch");
    },

    onValueChange(data, name) {
      if (name === this.appConfig.Name.Tel) {
        this.search.tel = data;
      }
    }
  }
};
</script>
