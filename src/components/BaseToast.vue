<template>
  <div>
    <b-toast id='base-toast' :variant="variantToast" v-model='visibleToast' solid>
      <div slot='toast-title' class='d-flex flex-grow-1 align-items-baseline'>
        <strong class='mr-auto'>{{ title }}</strong>
      </div>
      {{ message }}
    </b-toast>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import VariantColors from '@/constants/VariantColors';

export default Vue.extend({
  props: {
    title: {
      default: 'Error',
      type: String,
    },
    visibleToast: {
      default: false,
      type: Boolean,
    },
    variantToast: {
      default: VariantColors.Danger,
      type: String,
    },
    message: {
      default: 'Server Error!',
      type: String,
    },
  },
});
</script>
