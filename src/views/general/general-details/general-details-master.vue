<template>
  <div>
    <b-container fluid>
      <GeneralForm @onBack="onBack"></GeneralForm>
    </b-container>
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import GeneralForm from "../general-form/general-form";
import IMText from "@/data/img-text";
export default {
  components: {
    GeneralForm
  },
  data() {
    return {
      title: IMText.title.sshi0023,
      imgText: IMText
    };
  },
  methods: {
    onBack(isChangeForm) {
      if(isChangeForm) {
        if(this.showPopupDirtyForm()){
          this.$router.push({
            path: MasterProperty.FSHI0008.SSHI0022.Path,
            name: MasterProperty.FSHI0008.SSHI0022.Name
          });
        }
        return;
      }
      this.$router.push({
        path: MasterProperty.FSHI0008.SSHI0022.Path,
        name: MasterProperty.FSHI0008.SSHI0022.Name
      });
    },

    showPopupDirtyForm(){
      return window.confirm(
          this.imgText.popup.confirmDirtyForm
      );
    }

  }
};
</script>
    
<style>
</style>
