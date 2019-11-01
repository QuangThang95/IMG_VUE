<template>
  <div>
    <b-card>
      <div slot='header'>
        <strong class='titleForm'>{{imgtext.general.titleSearch}}</strong>
        <b-button
          variant='dark'
          class='ml-2 btn-form'
          size='sm'
          @click='onReset'
        >{{imgtext.general.reset}}</b-button>
        <b-button
          class='float-right btn-form'
          variant='dark'
          size='sm'
          @click='onSearch'
        >{{imgtext.general.search}}</b-button>
      </div>
      <b-form class="search">
        <b-row>
          <b-col>
            <b-form-group :label='imgtext.general.customerName' :label-cols='2'>
              <b-form-input type='text' v-model.trim='search.customerName' maxlength='260'></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label='imgtext.general.customerKana' :label-cols='2'>
              <b-form-input type='text' v-model.trim='search.customerKana' maxlength='260'></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label='imgtext.general.address' :label-cols='2'>
              <b-form-input type='text' v-model.trim='search.address' maxlength='164'></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label='imgtext.general.tel' :label-cols='2'>
              <BaseInput
                @onValueChange='onValueChange'
                :nameInput='appConfig.Name.Tel'
                :formattedInputValue='search.tel'
                size='md'
                classInput='input-width'
              ></BaseInput>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import IMText from '@/data/img-text';
import BaseInput from '@/components/BaseInput';
import AppConfig from '@/constants/AppConfig'

export default {
  props: ['search'],
  components: {
    BaseInput
  },

  data() {
    return {
      imgtext: IMText,
      appConfig: AppConfig,
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