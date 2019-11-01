<template>
  <div>
    <State :manifestState="manifestState" :classByWaste="classByWaste"></State>
    <Carrier :transport="transport" :classByWaste="classByWaste"></Carrier>
    <Report :reportDispose="reportDispose" :classByWaste="classByWaste"></Report>
    <Final :final="final" :classByWaste="classByWaste"></Final>
    <Deadline :reportDeadline="reportDeadline" :classByWaste="classByWaste"></Deadline>
    <Update :update="update" :classByWaste="classByWaste"></Update>
  </div>
</template>

<script>
import State from "./manifest-state/mainfest-state.vue";
import Carrier from "./carrier-report-contents/carrier-report-contents.vue";
import Report from "./disposer-report-content/disposer-report-content.vue";
import Final from "./final-disposal-site/final-disposal-site.vue";
import Deadline from "./reporting-deadline/reporting-deadline.vue";
import Update from "./update-date/update-date.vue";

export default {
  props: [
    "manifestState",
    "final",
    "transport",
    "reportDeadline",
    "update",
    "reportDispose",
    'classByWaste'
  ],
  components: {
    State,
    Carrier,
    Report,
    Final,
    Deadline,
    Update
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
