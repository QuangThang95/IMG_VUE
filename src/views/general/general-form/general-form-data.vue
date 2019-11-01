<template>
  <div>
    <table style="width:100%;">
      <tr>
        <td class="card-header">
          <span>データ部</span>
        </td>
      </tr>
    </table>
    <table class="table table-box table-sm">
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data1}}
        </td>
        <td class="fix-width">
          <span>{{general.data1Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.data1" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data2}}
        </td>
        <td class="fix-width">
          <span>{{general.data2Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.data2" :disabled="disableState.data2" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data3}}
        </td>
        <td class="fix-width">
          <span>{{general.data3Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.data3" :disabled="disableState.data3" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data4}}
        </td>
        <td class="fix-width">
          <span>{{general.data4Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.data4" :disabled="disableState.data4" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data5}}
        </td>
        <td class="fix-width">
          <span>{{general.data5Desc}}</span>
        </td>
        <td class="fix-width">
          <b-form-checkbox class="checkbox" v-model="general.data5" :disabled="disableState.data5" @change="onChange(true)">はい</b-form-checkbox>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data6}}
        </td>
        <td class="fix-width">
          <span>{{general.data6Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.data6" :disabled="disableState.data6" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          {{imgText.general.fshi0008.data7}}
        </td>
        <td class="fix-width">
          <span>{{general.data7Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.data7" :disabled="disableState.data7" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import IMText from "@/data/img-text";
import CountCharacter from "@/shared/CountCharacter";
export default {
  components: {},
  props: ["general", "status", "disableState"],
  data() {
    return {
      imgText: IMText,
      checkbox: false,
      isChangeData: false
    };
  },
  
  created() {
    this.onBeforeUnLoad();
  },

  destroyed() {
    this.isChangeData = false;
  },

  methods: {
    onChange(data) {
      this.isChangeData = data;
    },

    canDeactivate() {
      return this.isChangeData;
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }


  }
};
</script>
    
<style>
.fix-width {
  min-width: 300px;
  max-width: 300px;
}
</style>
