<template>
  <div>
    <b-modal
      id="spinning"
      ref="dlWaitting"
      size="sm"
      centered 
      hide-footer
      hide-header
    >
    <div class="d-block text-center">
        処理中
        <br>
        <b-spinner id="spinner-processing" variant="secondary" label="processing"></b-spinner>
    </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import {  Vue } from 'vue-property-decorator';

export default Vue.extend({
    props: ['openDl'],
    watch: {
        openDl(value) {
            if (value) {
                setTimeout(() => {
                    (this.$refs.dlWaitting as any).show(); }, 0);
            } else {
                (this.$refs.dlWaitting as any).hide();
            }
        },
    },
});
</script>
