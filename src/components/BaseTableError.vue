<template>
  <div>
    <b-table
      :id="tableId"
      :items="dataTable"
      :fields="fields"
      :striped="true"
      :bordered="true"
      :outlined="true"
      :small="true"
      class="custom-table-error"
    >
      <template slot="actionDirective" slot-scope="data" class="text-center">
        <span v-if="groupNotification.Approve">
          <b-button class="btn-form btn-arrow-left pl-2 pr-2" size="sm" @click="onApprove(data)">承認</b-button>
        </span>
        <span v-if="groupNotification.Cancel">
          <b-button class="btn-form btn-arrow-right pl-2 pr-2" size="sm" @click="onCancel(data)">否認</b-button>
        </span>

        <span v-if="groupNotification.Update">
          <b-button
            class="btn-form btn-arrow-right pl-2 pr-2"
            size="sm"
            @click="onUpdate(data)"
          >確認</b-button>
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import AppConfig from "@/constants/AppConfig";
import * as lodash from "lodash";
import IMText from "@/data/img-text.json";

export default {
  props: {
    dataTable: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    tableId: {
      type: String,
      default: ""
    },

    groupNotification: {
      type: Object,
      default: () => lodash.cloneDeep(AppConfig.GroupNotification)
    }
  },
  components: {
    BasePopupMessage
  },
  data() {
    return {
      titlePopupCustom: "",
      isVisible: true,
      pages: AppConfig.Pages,
      imgText: IMText,
      initData: this.fields,
      file: []
    };
  },

  methods: {
    onUpdate(data) {
      this.$emit("onUpdate", data);
    },

    onCancel(data) {
      this.$emit("onCancel", data);
    },
    
    onApprove(data) {
      this.$emit("onApprove", data);
    },
  }
};
</script>
<style lang="scss">
.custom-table-error {
  width: 50%;
  margin: 0 auto;
}
.custom-table-error thead th {
    background-color: #F2DEDE !important;
    border-color: #F2DEDE !important;
}
</style>

