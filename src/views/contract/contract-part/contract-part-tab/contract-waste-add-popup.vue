<template>
  <div>
    <b-modal
      size="xl"
      class="popup-modal popup-height"
      :id="popupId"
      hide-header
      hide-footer
      centered
    >
      <template slot="default">
        <BaseMessageError :title="title" :message="message" classBase></BaseMessageError>
        <div class="base-select-popup">
          <b-row>
            <b-col>
              <div v-if="dataTable.length">
                <BaseTableNotPaging :dataTable="dataTable" :fields="fields" :tableId="tableId" />
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <BaseButtonGroup
                :imgStatus="imgStatus"
                :visibleClose="false"
                @onAddUpdate="onAddContractWaste"
              />
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import BaseMessageError from "@/components/BaseMessageError";
import BaseTableNotPaging from "@/components/BaseTableNotPagging.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup.vue";
import IMText from "@/data/img-text.json";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseTableNotPaging,
    BaseButtonGroup,
    BaseMessageError
  },
  props: ["popupId", "loadPopup"],
  data() {
    return {
      imgText: IMText,
      message: [],
      title: IMText.title.sshi0030AddContractWaste,
      dataAll: {},
      fields: [
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "大分類"
        },
        {
          key: "data2",
          slot: "HEAD_data2",
          label: "中分類"
        },
        {
          key: "data3",
          slot: "HEAD_data3",
          label: "小分類"
        },
        {
          key: "wasteName",
          slot: "HEAD_wasteName",
          label: "排出物名"
        },
        {
          key: "wasteCode",
          slot: "HEAD_wasteCode",
          label: "分類コード"
        },
        {
          key: "memo",
          slot: "HEAD_memo",
          label: "備考"
        },
        {
          key: "checkbox",
          label: IMText.general.btnChoice,
          tdClass: "classButton"
        }
      ],
      tableId: "table" + this.popupId,
      imgStatus: false,
      dataTable: []
    };
  },

  created() {
    this.getData();
  },

  methods: {
    onAddContractWaste() {
      this.$emit("onAddContractWaste", this.dataSelect());
      this.$bvModal.hide(this.popupId);
    },

    async getData() {
      await this.$emit("getDefineWaste");
    },

    dataSelect() {
      const dataSelected = this.dataTable.filter(
        item => item.checkbox === true
      );
      return dataSelected;
    },

    dataNotSelect() {
      const dataNotSelected = this.dataTable.filter(
        item => item.checkbox === false
      );
      return dataNotSelected;
    },

    setDefineWaste() {}
  },

  computed: {
    ...mapGetters({
      dataDefineWaste:
        "customerBranchWasteModule/getCustomerBranchWasteDefineWaste",
      contractWasteTemp: "contractModule/getContractWasteTemp"
    })
  },

  watch: {
    async loadPopup() {
      await this.getData();
    },

    dataDefineWaste() {      
      this.dataTable = this.dataDefineWaste.map(item => {
        item.checkbox = false;
        return item;
      });
      const contractWasteCodes = this.contractWasteTemp.map(item => {
        return item.wasteCode;
      });
      this.dataTable = this.dataTable.filter(function(item) {
        return !contractWasteCodes.includes(item.wasteCode);
      });
    }
  }
};
</script>