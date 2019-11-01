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
            <b-form-group :label='imgtext.general.branchNumber' :label-cols="2">
              <b-form-input type="text" v-model.trim="search.branchNumber"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label='imgtext.general.branchName' :label-cols="2">
              <b-form-input type="text" v-model.trim="search.branchName"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label='imgtext.general.branchKana' :label-cols="2">
              <b-form-input type="text" v-model.trim="search.branchKana"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label='imgtext.general.address' :label-cols="2">
              <b-form-input type="text" v-model.trim="search.address"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label='imgtext.general.tel' :label-cols="2">
              <BaseInput
                @onValueChange="onValueChange"
                :nameInput="appConfig.Name.Tel"
                :formattedInputValue="search.tel"
                size="md"
                classInput="input-width"
              ></BaseInput>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import IMText from "@/data/img-text";
import AppConfig from "@/constants/AppConfig";

export default {
  props: ["search"],

  components: {
    BaseInput
  },

  data() {
    return {
      imgtext: IMText,
      appConfig: AppConfig
    };
  },

  created() {
    this.onReset();
  },

  methods: {
    onReset() {
      this.$emit('onReset');
    },

    onSearch() {
      this.$emit('onSearch');
    },

    onValueChange(data, name) {
      this.search.tel = data;
    }
  }
};
</script>
