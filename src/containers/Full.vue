<template>
  <div>
    <BaseToolbar />
    <main id="container">
      <router-view></router-view>
    </main>
    <BaseToast />
  </div>
</template>

<script lang='ts'>
import { Vue } from "vue-property-decorator";
import BaseToolbar from "@/components/BaseToolbar.vue";
import BaseToast from "@/components/BaseToast.vue";
export default Vue.extend({
  name: "full",
  components: {
    BaseToolbar,
    BaseToast
  }
});
</script>
