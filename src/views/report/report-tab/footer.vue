<template>
  <div>
    <b-row class="footer-row">
      <div><div role="group" class="btn-group btn-group-sm">
        <button cols="2" offset="1" type="button" aria-pressed="true" autocomplete="off" class="btn btn-primary active btn-industrial-waste">{{imgText.general.fshi0014.industrialWaste}}</button>
        <button cols="2" type="button" aria-pressed="false" autocomplete="off" class="btn btn-primary btn-special-industrial-waste">{{imgText.general.fshi0014.speciallyManagedIndustrialWaste}}</button>
        <button cols="2" type="button" aria-pressed="false" autocomplete="off" class="btn btn-primary btn-construction-waste">{{imgText.general.fshi0014.constructionWaste}}</button>
        <button cols="2" type="button" aria-pressed="false" autocomplete="off" class="btn btn-primary btn-valuable-waste">{{imgText.general.fshi0014.valuables}}</button>
        <button cols="2" type="button" aria-pressed="false" autocomplete="off" class="btn btn-primary btn-municipal-waste">{{imgText.general.fshi0014.municipalWaste}}</button></div></div>
    </b-row>

  </div>
</template>
<script>
import IMText from "@/data/img-text";

export default {
  data() {
    return {
      imgText: IMText
    }
  }
};
</script>
<style>
.tab-col {
  border: 1px solid white;
  text-align: center;
  border-radius: 7px;
}
.footer-row .tab-col:nth-child(1) {
  background: springgreen;
}
.footer-row .tab-col:nth-child(2) {
  background: salmon;
}
.footer-row .tab-col:nth-child(3) {
  background: lightblue;
}
.footer-row .tab-col:nth-child(4) {
  background: tomato;
}
.footer-row .tab-col:nth-child(5) {
  background: turquoise;
}
</style>
