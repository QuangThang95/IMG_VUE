<template>
  <div class="table-detail">
    <table class="basic-information table table-box table-sm headTable">
      <tr>
        <th colspan="5" class="border-right-none" :class="classByWaste">
          <div class="mt-1">基本情報</div>
        </th>
        <th colspan="3" class="border-left-none" v-if="imgStatus" :class="classByWaste"></th>
        <th colspan="7" class="border-left-none" v-if="!imgStatus" :class="classByWaste"></th>
        <th class="titleColumn width-column" colspan="1" v-if="imgStatus">
          <span class="asterisk"></span>登録日時
        </th>
        <th colspan="1" class="width-column-2 background-white font-normal" v-if="imgStatus">
          <span>{{ item.createDate | formatDate }}</span>
        </th>
        <th
          class="titleColumn width-column"
          style="border-bottom: 1px;"
          colspan="1"
          v-if="imgStatus"
        >
          <span class="asterisk"></span>最終更新日時
        </th>
        <th colspan="1" class="width-column-2 background-white font-normal" v-if="imgStatus">
          <span>{{ item.lastUpdate | formatDate }}</span>
        </th>
      </tr>
      <tr>
        <td class="titleColumn width-column">事業場</td>
        <td colspan="1">{{basicInfo.branchName}}</td>
        <td class="titleColumn width-column">契約名</td>
        <td colspan="7">{{basicInfo.contractName}}</td>
        <td class="width-column-2 titleColumn width-column">排出物区分</td>
        <td colspan="1">{{basicInfo.data1}}</td>
      </tr>
      <tr>
        <td class="titleColumn width-column">
          区間
        </td>
        <td colspan="3" class="dropdown-checkbox border-right-none">
          <span class="dropdown-inline">区間 {{item.sectionNumber}}</span>
          <b-form-checkbox
            class="checkbox-inline"
            id="checkbox-1"
            v-model="item.finalSectionFlag"
            :disabled="true"
            @change="onChangeFinalSectionFlag"
          >最終区間</b-form-checkbox>
        </td>
        <td colspan="8" class="border-left-none"></td>
      </tr>
      <tr>
        <td class="titleColumn width-column titleColumn-textarea">備考</td>
        <td colspan="11">
          <span>{{item.memo}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    classByWaste: {
      type: String,
      default: ""
    },
    sectionNumberOption: {
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
    basicInfo: {
      type: Object,
      default: {
        contractName: "",
        branchName: "",
        data1: ""
      }
    },
    disableByWasteClass: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onChangeSectionNumber(value) {
      this.$emit("onChangeSectionNumber", value);
    },

    onChangeFinalSectionFlag() {
      this.$emit(
        "onChangeFinalSectionFlag",
        !this.item.finalSectionFlag,
        this.item.sectionNumber
      );
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/custom/manifest/_manifest.scss";
</style>