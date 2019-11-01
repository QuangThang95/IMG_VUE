<template>
  <div>
    <b-tabs v-if="!isReadOnly">
      <b-tab disabled></b-tab>
      <b-tab title="契約排出物" active>
        <ContractWaste
          :unitCodeOption="unitCodeOption"
          :dataTable="dataContractWastes"
          @onPicker="onPickerContractWaste"
          @getDefineWaste="getDefineWaste"
          @onAddContractWaste="onAddContractWaste"
          @onChangeValue="onChangeValue"
        />
      </b-tab>
      <b-tab title="最終処分事業場" v-if="visibleTabContractFinal">
        <ContractFinal
          :contractPartDetail="contractPartDetail"
          :dataTable="dataContractFinals"
          :pageCount="pageCountContractFinal"
          :count="countContractFinal"
          :pageSize="pageSizeContractFinal"
          @onPicker="onPickerContractFinal"
          @getCurrentPage="getCurrentPageContractFinal"
          @getPageSize="getPageSizeContractFinal"
          @closeSort="closeSortContractFinal"
          @onSorting="onSortingContractFinal"
          @getDefineFactoryFinals="getDefineFactoryFinals"
          @onAddContractFinal="onAddContractFinal"
        />
      </b-tab>
    </b-tabs>

     <b-tabs v-if="isReadOnly">
      <b-tab disabled></b-tab>
      <b-tab title="契約排出物" active>
        <ContractWasteReadOnly
          :unitCodeOption="unitCodeOption"
          :dataTable="dataContractWastes"
          @getDefineWaste="getDefineWaste"
          @onAddContractWaste="onAddContractWaste"
        />
      </b-tab>
      <b-tab title="最終処分事業場" v-if="visibleTabContractFinal">
        <ContractFinalReadOnly
          :contractPartDetail="contractPartDetail"
          :dataTable="dataContractFinals"
          :pageCount="pageCountContractFinal"
          :count="countContractFinal"
          :pageSize="pageSizeContractFinal"
          @onPicker="onPickerContractFinal"
          @getCurrentPage="getCurrentPageContractFinal"
          @getPageSize="getPageSizeContractFinal"
          @closeSort="closeSortContractFinal"
          @onSorting="onSortingContractFinal"
          @getDefineFactoryFinals="getDefineFactoryFinals"
          @onAddContractFinal="onAddContractFinal"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import ContractWaste from "./contract-waste-tab.vue";
import ContractFinal from "./contract-final-tab";
import ContractWasteReadOnly from "./contract-waste-tab-readonly.vue";
import ContractFinalReadOnly from "./contract-final-tab-readonly";
export default {
  props: [
    "contractPartDetail",
    "unitCodeOption",
    "dataContractWastes",
    "dataContractFinals",
    "pageCountContractFinal",
    "countContractFinal",
    "pageSizeContractFinal",
    "visibleTabContractFinal",
    "isReadOnly"
  ],

  components: {
    ContractWaste,
    ContractFinal,
    ContractWasteReadOnly,
    ContractFinalReadOnly
  },

  data() {
    return {};
  },

  methods: {
    onPickerContractFinal(data, key) {
      this.$emit("onPickerContractFinal", data, key);
    },

    getCurrentPageContractFinal(data) {
      this.$emit("getCurrentPageContractFinal", data);
    },

    getPageSizeContractFinal(data) {
      this.$emit("getPageSizeContractFinal", data);
    },

    closeSortContractFinal(data) {
      this.$emit("closeSortContractFinal", data);
    },

    onSortingContractFinal(data, ischeck) {
      this.$emit("onSortingContractFinal", data, ischeck);
    },

    onPickerContractWaste(data, key) {
      this.$emit("onPickerContractWaste", data, key);
    },

    getDefineWaste() {
      this.$emit("getDefineWaste");
    },

    onAddContractWaste(data) {
      this.$emit("onAddContractWaste", data);
    },

    getDefineFactoryFinals() {
      this.$emit("getDefineFactoryFinals");
    },

    onAddContractFinal(data) {
      this.$emit("onAddContractFinal", data);
    },

    onChangeValue() {
      this.$emit("onChangeValue");
    }
  }
};
</script>
