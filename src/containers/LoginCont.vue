<template>
  <div class="main-login">
    <router-view></router-view>
    <BaseToast />
  </div>
</template>
<script lang='ts'>
import { Vue } from "vue-property-decorator";
import BaseToast from "@/components/BaseToast.vue";
export default Vue.extend({
  components: {
    BaseToast
  }
});
</script>
