<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="6"></td>

        <td class="titleColumn" v-if="imgStatus">
          <span v-if="!isReadOnly" class="asterisk"></span>登録日時
        </td>
        <td colspan="1" v-if="imgStatus">
          <b-input-group size="sm">
            <span>{{ detailData.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn" v-if="imgStatus">
          <span v-if="!isReadOnly" class="asterisk"></span>最終更新日時
        </td>
        <td colspan="1" v-if="imgStatus">
          <b-input-group size="sm">
            <span>{{ detailData.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td colspan="1" class="titleColumn">
          <span class="asterisk">*</span>事業場
        </td>
        <td colspan="6">
          <b-row>
            <b-col md="10">
              <label>{{branchSelected.branchName}}</label>
            </b-col>
            <b-col md="2">
              <div class="float-right">
                <b-button
                  class="btn-form"
                  size="sm"
                  :disabled="isDisableChoice"
                  @click="onChoiceClick()"
                >{{imgtext.general.btnChoice}}</b-button>
              </div>
            </b-col>
          </b-row>
        </td>
        <td colspan="5"></td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>契約名
        </td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input v-model="detailData.contractName" @change="onChange"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">排出物区分</td>
        <td colspan="5">
          <label>{{dischargeDistinctionData}}</label>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>数量確定者
        </td>
        <td colspan="5">
          <b-form-select
            size="sm"
            v-model="quantityDeterminerSelected"
            :options="quantityDeterminerData"
            @change="onChange"
          ></b-form-select>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea size="lg" no-resize v-model="detailData.memo" @change="onChange"></b-form-textarea>
        </td>
      </tr>
    </table>
    <BasePopupSelectBranch
      :popupId="popupSelectBranchId"
      :wasteClass="wasteClass"
      @onSelectBranch="onSelectBranch"
    ></BasePopupSelectBranch>
  </div>
</template>

<script>
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import AppConfig from "@/constants/AppConfig";
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text";
import { current, common } from "@/shared/utilities";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import BasePopupSelectBranch from "@/components/BasePopupSelectBranch";

export default {
  props: [
    "wasteClass",
    "detailData",
    "imgStatus",
    "visibleRequired",
    "isReadOnly",
    "listBranch",
    "isChange"
  ],

  components: {
    BaseInputPermission,
    BaseTable,
    BaseButtonGroup,
    BasePopupSelectBranch
  },
  data() {
    return {
      imgtext: IMText,
      popupSelectBranchId: "sshi0027-popup",
      appConfig: AppConfig,
      industryCode2Option: [],
      quantityDeterminerSelected: null,
      isDisableChoice: false,
      branchSelected: {
        branchCode: null,
        branchName: ""
      },
      currentCustomer: current.customer(),
      isChangeData: false
    };
  },

  async created() {
    await this.initFormData();
  },

  methods: {
    async initFormData() {
      await this.$store.dispatch("generalModule/getDischargeDistinctionData", {
        key1: "排出物区分",
        key2: this.wasteClass
      });
      await this.$store.dispatch("generalModule/getQuantityDeterminerData", {
        key1: "数量確定者"
      });
    },

    getFormData() {
      this.detailData.contractCode = this.imgStatus
        ? +this.$route.params.contractCode
        : undefined;
      this.detailData.customerCode = this.currentCustomer.customerCode;
      this.detailData.decisionCode = this.quantityDeterminerSelected;
      this.detailData.branchCode = this.branchSelected.branchCode;
      this.detailData.wasteClass = this.wasteClass;
      return { ...this.detailData };
    },

    onBack() {
      this.$emit("onBack");
    },

    onChoiceClick() {
      this.$bvModal.show(this.popupSelectBranchId);
    },

    onSelectBranch(item) {
      this.isChangeData = true;
      this.branchSelected.branchName = item.branchName;
      this.branchSelected.branchCode = item.branchCode;
    },

    onChange() {
      this.isChangeData = true;
    },

    canDeactivate() {
      return this.isChangeData;
    }
  },

  computed: {
    dischargeDistinctionData() {
      const items = this.$store.getters[
        "generalModule/getDischargeDistinctionData"
      ];
      if (items.length === 1) {
        return items[0].data1;
      } else {
        return "";
      }
    },

    quantityDeterminerData() {
      const items = this.$store.getters[
        "generalModule/getQuantityDeterminerData"
      ];
      if (this.imgStatus) {
        return common.formatObjectSelection(items, ["key2", "data1"], true);
      }
      const quantityDeterminer = items.filter(x => x.data1 === "処分業者");
      this.quantityDeterminerSelected =
        quantityDeterminer.length === 1 ? quantityDeterminer[0].key2 : null;
      return common.formatObjectSelection(items, ["key2", "data1"]);
    }
  },

  watch: {
    isChange() {
      this.isChangeData = false;
    },

    detailData() {
      this.quantityDeterminerSelected = this.detailData.decisionCode;
      this.branchSelected.branchCode = this.detailData.branchCode;
      this.branchSelected.branchName = this.detailData.branchName;
    },

    listBranch() {
      if (this.listBranch.length > 1) {
        this.isDisableChoice = false;
        this.branchSelected = this.imgStatus
          ? this.branchSelected
          : {
              branchCode: null,
              branchName: ""
            };
      } else if (this.listBranch.length === 1) {
        this.isDisableChoice = true;
        this.branchSelected = {
          branchCode: this.listBranch[0].value,
          branchName: this.listBranch[0].text
        };
      } else {
        this.isDisableChoice = true;
        this.$emit("onShowError", "条件に合致する事業場は存在しません。");
        this.branchSelected = {
          branchCode: null,
          branchName: ""
        };
      }
    }
  }
};
</script>
<style lang='scss' scoped>
table td {
  table-layout: fixed;
  width: 180px;
}
</style>
