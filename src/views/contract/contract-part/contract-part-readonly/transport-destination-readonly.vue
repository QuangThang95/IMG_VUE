<template>
  <div class="table-detail">
    <table class="table table-box table-sm headTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="float-left label-form pt-1">運搬先情報</div>
          <div>
            <b-form-checkbox
              class="pt-1"
              v-model="item.selfDisposeFlag"
              :disabled="true"
            >自己処分</b-form-checkbox>
          </div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn width-column">運搬先業者</td>
        <td colspan="5">
          <span>{{ item.desName }}</span>
        </td>
        <td class="titleColumn width-column-2">運搬先業者事業場</td>
        <td colspan="5">
          <span>{{ item.factoryName }}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn width-column">再委託先処分業者</td>
        <td colspan="5">
          <span>{{ item.reDesName }}</span>
        </td>
        <td class="titleColumn">再委託先処分業者事業場</td>
        <td colspan="5">
          <span>{{ item.reFactoryName }}</span>
        </td>
      </tr>
      <tr>
        <td class="titleColumn width-column">契約年月日</td>
        <td class="width-date-column" colspan="2">
          <span>{{ item.disposeContractDate }}</span>
        </td>
        <td class="titleColumn width-column">有効年月日</td>
        <td class="width-date-column" colspan="2">
          <span>{{ item.disposeContractLimit }}</span>
        </td>
        <td class="titleColumn">処分方法</td>
        <td class="width-column" colspan="2">
          <span>{{ item.disposeName }}</span>
        </td>
        <td class="titleColumn width-column">契約書ファイル</td>
        <td colspan="2">
          <span
            v-b-tooltip.top.hover
            :title="item.disposeContractPath"
          >{{ item.disposeContractPath | getFileName}}</span>
          <!-- <b-button
            v-if="imgStatus"
            class="btn-form float-right ml-2"
            size="sm"
            :disabled="disabled1932 || disabled1832"
            @click="downloadFile"
          >参照</b-button>
          <label class="float-right label-margin" :disabled="disabled1932 || disabled1832">
            <div class="btn btn-form float-right btn-secondary btn-sm upload-file">選択</div>
            <b-file class="hide-status" v-on:change="uploadFile($event, 2)" v-model="disposeContractFile" hidden></b-file>
          </label>-->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as lodash from "lodash";
export default {
  props: {
    classByWaste: {
      type: String,
      default: ""
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
      default: true
    },
    disabled1932: {
      type: Boolean,
      default: false
    },
    disabled1832: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      disposeContractFile: {}
    };
  },
  methods: {
    // downloadFile() {
    //   this.$emit("downloadFile", this.item.disposeContractPath);
    // }
  }
};
</script>