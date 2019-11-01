<template>
  <div class="table-detail">
    <table class="table table-box table-sm headTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="float-left label-title pt-1">収集運搬情報</div>
          <div>
            <b-form-checkbox
              class="pt-1"
              v-model="item.selfTransportFlag"
              :disabled = "true"
            >自己運搬</b-form-checkbox>
          </div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn width-column">
          収集運搬業者
        </td>
        <td colspan="5">
          <span>{{item.transportName}}</span>
        </td>
        <td class="titleColumn width-column-2">再委託収集運搬業者</td>
        <td colspan="5">
          <span>{{item.reTransportName}}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn width-column">
          契約年月日
        </td>
        <td class="width-date-column" colspan="2">
          <span>{{item.contractDate}}</span>
        </td>
        <td class="titleColumn width-column">有効年月日</td>
        <td class="width-date-column" colspan="2">
          <span>{{item.contractLimit}}</span>
        </td>
        <td class="titleColumn">運搬方法</td>
        <td class="width-column" colspan="2">
          <b-form-select size="sm" v-model="item.transportCode" :options="transportMethodOption" :disabled="true"></b-form-select>
        </td>
        <td class="titleColumn width-column">契約書ファイル</td>
        <td colspan="2">
          <span
            v-b-tooltip.top.hover
            :title="item.transportContractPath"
          >{{ item.transportContractPath | getFileName }}</span>
          <!-- <b-button
            v-if="imgStatus"
            class="btn-form float-right ml-2"
            size="sm"
            :disabled="disabled917"
            @click="downloadFile"
          >参照</b-button>
          <label class="float-right label-margin" :disabled="disabled917">
            <div class="btn btn-form float-right btn-secondary btn-sm upload-file">選択</div>
            <b-file class="hide-status" v-on:change="uploadFile($event, 1)" v-model="transportContractFile" hidden></b-file>
          </label> -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import * as lodash from "lodash";
export default {
  props: {
    classByWaste:{
      type: String,
      default: ""
    },
    transportMethodOption: {
      type: Array,
      default: () => []
    },
    imgStatus: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: {}
    },
    disableByWasteClass: {
      type: Boolean,
      default: false
    },
    disabled917: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      transportContractFile: {},
    };
  },

  created() {},

  methods: {

    downloadFile() {
      this.$emit("downloadFile", this.item.transportContractPath);
    },

  }
};
</script>

<style lang="scss" scoped>
.label-title {
  margin-right: 122px;
}
</style>
