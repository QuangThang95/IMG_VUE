<template>
  <div>
    <div
      v-if="data.id === 4 && !data.button1.permission&& !data.button2.permission&& !data.button3.permission"
    ></div>
    <fieldset class="row-item" v-else>
      <legend class="legend-text">{{data.titleHeader}}</legend>
      <div class="text-center mb-2">
        <b-button
          class="btn-content"
          @click="onClick(data.button1.rediect, data.titleHeader)"
          v-if="data.button1.permission"
        >{{ data.button1.title }}</b-button>
      </div>
      <div class="text-center" v-if="data.button2">
        <b-button
          class="btn-content"
          @click="onClick(data.button2.rediect, data.titleHeader)"
          v-if="data.button2.permission"
        >{{ data.button2.title }}</b-button>
      </div>
      <div class="footer-item" v-if="data.button3">
        <b-button
          size="sm"
          class="footer-button button-card"
          @click="onClick(data.button3.rediect, data.titleHeader)"
          v-if="data.button3.permission"
        >{{ data.button3.title }}</b-button>
        <b-badge
          pill
          variant="danger"
          class="ml-1 badge-card"
          v-if="data.button3.permission && data.button3.totalNotify"
        >{{ data.button3.totalNotify }}</b-badge>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { Screen } from "@/constants/Screen";
import { navigation } from "@/shared/utilities";
import { NotifySource, SupplierClass } from "@/constants/General";

export default {
  props: ["data", "permission"],

  data() {
    return {
      notifySourceUrl: 0,
      supplierClassUrl: 0
    };
  },

  methods: {
    onClick(key, titleHeader) {
      switch (key) {
        case Screen.SSHI0001:
          navigation.sshi0001();
          break;
        case Screen.SSHI0004:
          navigation.sshi0004();
          break;
        case Screen.SSHI0007:
          navigation.sshi0007();
          break;
        case Screen.SSHI0010:
          navigation.sshi0010();
          break;
        case Screen.SSHI0013:
          navigation.sshi0013();
          break;
        case Screen.SSHI0016:
          navigation.sshi0016();
          break;
        case Screen.SSHI0022:
          navigation.sshi0022();
          break;
        case Screen.SSHI0035:
          this.setNotifySource(titleHeader);
          navigation.sshi0035Error(this.notifySourceUrl, this.supplierClassUrl);
          break;
        default:
          break;
      }
    },

    setNotifySource(titleHeader) {
      this.notifySourceUrl = 0;
      this.supplierClassUrl = 0;
      switch (titleHeader) {
        case NotifySource.wasteCompany.value:
          this.notifySourceUrl = NotifySource.wasteCompany.key;
          break;
        case NotifySource.deliveryCompany.value:
          this.notifySourceUrl = NotifySource.deliveryCompany.key;
          this.supplierClassUrl = SupplierClass.deliveryCompany.key;
          break;
        case NotifySource.disposalCompany.value:
          this.notifySourceUrl = NotifySource.disposalCompany.key;
          this.supplierClassUrl = SupplierClass.disposalCompany.key;
          break;
        case NotifySource.system.value:
          this.notifySourceUrl = NotifySource.system.key;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/scss/dashboard/_dashboard.scss";
</style>
