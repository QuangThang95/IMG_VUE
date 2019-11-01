<template>
  <div>
    <b-modal
      hide-footer
      hide-header
      id="sshi0011emissionspopup"
      size="xl"
      style="height: 800px"
      centered
    >
      <h6 class="fontColor mt-3 mb-3">排出物追加</h6>
      <b-container fluid class="scrollable">
        <BaseTable
          :dataTable="dataTable"
          :fields="fields"
          :idTable="idTable"
          :position="position"
          @onUpdate="onUpdate"
        ></BaseTable>
      </b-container>
      <b-button class="btn-form float-right mt-3" size="sm">追加</b-button>
    </b-modal>
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTable.vue";
import FormatData from "@/shared/FomatData";
export default {
  components: {
    BaseTable
  },

  data() {
    return {
      fields: [
        {
          key: "customerName",
          label: "大分類",
          slot: "HEAD_customerName",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "tel",
          label: "中分類",
          slot: "HEAD_tel",
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
          key: "address",
          label: "小分類",
          slot: "HEAD_address",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address1",
          label: "排出物名",
          slot: "HEAD_address1",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address2",
          label: "分類コード",
          slot: "HEAD_address2",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "id",
          label: "備考",
          slot: "HEAD_id",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "checkbox",
          slot: "HEAD_checkbox",
          label: "選択",
          tdClass: "classOneButton"
        }
      ],
      idTable: "sshi0011emissionspopup",
      position: -1
    };
  },
  methods: {
    onUpdate() {}
  },
  computed: {
    dataTable() {
      this.items = this.$store.getters["customersModule/getListCustomers"];
      return this.items;
    }
  }
};
</script>

<style lang="scss" scoped>
.scrollable {
  height: 300px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
