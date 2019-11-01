<template>
  <div>
    <b-row>
      <b-col>
        <b-button class="float-right btn-form mt-2 mb-2" size="sm" @click="onAdd">追加</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable.length">
          <BaseTable
            :dataTable="dataTable"
            :fields="fields"
            :tableId="tableId"
            :dataButton="dataButton"
            :pageCount="pageCount"
            :count="count"
            :pageSize="pageSize"
            @onPicker="onPicker"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
            @closeSort="closeSort"
            @onSorting="onSorting"
          />
        </div>
      </b-col>
    </b-row>
    <ContractFinalAdd
      :contractPartDetail="contractPartDetail"
      :popupId="popupId"
      :loadPopup="loadPopup"
      @getDefineFactoryFinals="getDefineFactoryFinals"
      @onAddContractFinal="onAddContractFinal"
    />
  </div>
</template>

<script>
import ContractFinalAdd from "./contract-final-add-popup";
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text.json";
import FormatData from "@/shared/FomatData";

export default {
  props: ["contractPartDetail", "dataTable", "pageCount", "count", "pageSize"],
  components: {
    BaseTable,
    ContractFinalAdd
  },
  data() {
    return {
      fields: [
        {
          key: "finalFactoryName",
          slot: "HEAD_finalFactoryName",
          label: IMText.general.finalFactoryName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: IMText.general.address,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "tel",
          slot: "HEAD_tel",
          label: IMText.general.tel,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          tdAttr: {
            "x-ms-format-detection": "none"
          },
          formatter: value => {
            return FormatData.formatTelphone(value);
          }
        },
        {
          key: "disposeName",
          slot: "HEAD_disposeName",
          label: IMText.general.disposeName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "capability",
          slot: "HEAD_capability",
          label: IMText.general.capability,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "lastUpdate",
          label: IMText.general.lastUpdate,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classOneButton"
        }
      ],
      dataButton: [
        {
          id: 3,
          label: IMText.general.btnDelete,
          class: "btn-form btn-arrow-right pl-2 pr-2"
        }
      ],
      tableId: "sshi0029UpdateTab2",
      popupId: "sshi0030-contract-final-popup-add",
      loadPopup: {}
    };
  },

  methods: {
    onAdd() {
      this.loadPopup = { ...this.loadPopup };
      this.$bvModal.show(this.popupId);
    },

    onPicker(data) {
      this.$emit("onPicker", data, false);
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    closeSort(data) {
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      this.$emit("onSorting", data, ischeck);
    },

    getDefineFactoryFinals() {
      this.$emit("getDefineFactoryFinals");
    },

    onAddContractFinal(data) {
      this.$emit("onAddContractFinal", data);
    }
  }
};
</script>
