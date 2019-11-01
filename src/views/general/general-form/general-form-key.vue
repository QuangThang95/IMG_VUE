<template>
  <div>
    <table class="table table-box table-sm table-sshi0022 custom-table-sshi022">
      <tr>
        <td colspan="8" style="padding-right: 365px; border-bottom: 0px;">
          <span class="asterisk">* {{imgText.general.inputRequired}}</span>
        </td>
        <td class="titleColumn" v-if="status">
          <span>{{imgText.general.sshi0021.registeredDate}}</span>
        </td>
        <td colspan="2" v-if="status">
          <span>{{general.createDate | formatDate}}</span>
        </td>
        <td class="titleColumn" v-if="status">
          <span>{{imgText.general.fshi0008.lastDate}}</span>
        </td>
        <td colspan="2" v-if="status">
          <span>{{general.lastUpdate | formatDate}}</span>
        </td>
      </tr>
    </table>
    <table class="table-sshi0022">
      <tr>
        <td class="card-header">
          <span>キー部</span>
        </td>
      </tr>
    </table>
    <table class="table table-box table-sm">
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>{{imgText.general.fshi0008.key1}}
        </td>
        <td class="fix-width">
          <span>{{general.key1}}</span>
        </td>
        <td class="fix-width">
          <span>{{general.key1Desc}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>{{imgText.general.fshi0008.key2}}
        </td>
        <td class="fix-width">
          <span>{{general.key2Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.key2" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>{{imgText.general.fshi0008.key3}}
        </td>
        <td class="fix-width">
          <span>{{general.key3Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.key3" :disabled="disableState.key3" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>{{imgText.general.fshi0008.key4}}
        </td>
        <td class="fix-width">
          <span>{{general.key4Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.key4" :disabled="disableState.key4" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>{{imgText.general.fshi0008.key5}}
        </td>
        <td class="fix-width">
          <span>{{general.key5Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.key5" :disabled="disableState.key5" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>{{imgText.general.fshi0008.key6}}
        </td>
        <td class="fix-width">
          <span>{{general.key6Desc}}</span>
        </td>
        <td class="fix-width">
          <b-input-group size="sm">
            <b-form-input type="text" v-model.trim="general.key6" :disabled="disableState.key6" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>{{imgText.general.fshi0008.key7}}
        </td>
        <td class="fix-width">
          <span>{{general.key7Desc}}</span>
        </td>
        <td class="fix-width">
          <span>{{general.key7}}</span>
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
.table-sshi0022 {
  margin-bottom: 0px;
  width:100%;
}
.custom-table-sshi022 {
  margin-bottom: 0px !important;
}
</style>
