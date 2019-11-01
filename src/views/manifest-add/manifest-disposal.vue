<template>
  <div>
    <table class="table table-box table-sm disposalTable">
      <tr>
        <th colspan="12" :class="classByWaste">
          <div class="caption-content">
            <div class="mt-1">処分情報</div>
            <div class="checkbox-caption-disposal">
              <b-form-checkbox
                v-if="!isReadOnly"
                v-model="disposeFlag.isReentrustFlag"
                :disabled="isVisible && !isUpdate"
                @change="onChange(true)"
              >再委託する</b-form-checkbox>
              <b-form-checkbox
                v-if="isReadOnly"
                v-model="disposeFlag.isReentrustFlag"
                disabled
              >再委託する</b-form-checkbox>
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>処分業者
        </td>
        <td colspan="3">{{dispose.disposerName}}</td>
        <td class="titleColumn">
          <span class="asterisk">*</span>処分事業場
        </td>
        <td colspan="3">{{dispose.disposeFactoryName}}</td>
        <td class="titleColumn">処分方法</td>
        <td colspan="3">
          <b-form-select
            v-if="!isReadOnly"
            :options="general6"
            v-model="dispose.selectedGeneral6"
            :disabled="isVisible && !isUpdate"
            @change="onChange(true)"
          ></b-form-select>
          <b-form-select
            v-if="isReadOnly"
            :options="general6"
            v-model="dispose.selectedGeneral6"
            disabled
          ></b-form-select>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">再委託先</td>
        <td colspan="3">{{dispose.reDisposerName}}</td>
        <td class="titleColumn">再委託先処分事業場</td>
        <td colspan="3">{{dispose.reDisposeFactoryName}}</td>
        <td colspan="4"></td>
      </tr>
    </table>
  </div>
</template>
<script>
import CountCharacter from "@/shared/CountCharacter";
export default {
  props: [
    "currentCustomerCode",
    "currentBranchCode",
    "currentWasteClass",
    "contractCode",
    "dispose",
    "general6",
    "classByWaste",
    "disposeFlag",
    "isVisible",
    "isUpdate",
    "isReadOnly"
  ],
  created() {
    this.onBeforeUnLoad();
  },

  methods: {
    onChange(data) {
      this.isChangeData = data;
      this.$store.dispatch("manifestModule/checkDirtyForm", data);
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
<style lang="scss">
@import "@/assets/scss/custom/manifest/_dispose.scss";

.checkbox-caption-disposal {
  margin-left: 200px;
}

.disposalTable.table td {
  table-layout: fixed;
  width: 180px;
}
.caption-content {
  display: flex;
  align-items: center;
}
</style>