<template>
  <div>
    <b-modal
      hide-footer
      hide-header
      size="xl"
      style="height: 800px"
      class="huss"
      centered
      :id="popupIdReadOnly"
    >
      <h6 class="fontColor">処分方法選択</h6>
      <b-container fluid>
        <BaseTable
          :dataTable="itemsdatadropGeneralTab2Popup"
          :fields="fields"
          :tableId="tableId"
          :position="position"
          :dataButton="dataButton"
          @onSelect="onSelect"
        ></BaseTable>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTableNotPagging.vue";
export default {
  props: ["itemsdatadropGeneralTab2Popup", "popupIdReadOnly"],
  components: {
    BaseTable
  },
  data() {
    return {
      isShow: false,
      fields: [
        {
          key: "data1",
          label: "処分方法（大分類）",
          slot: "HEAD_data1"
        },
        {
          key: "data2",
          label: "処分方法（中分類）",
          slot: "HEAD_data2"
        },
        {
          key: "data3",
          label: "処分方法（小分類）",
          slot: "HEAD_data3"
        },
        {
          key: "actionDirective",
          label: "操作",
          tdClass: "classOneButton"
        }
      ],
      tableId: "sshi0008-table",
      position: -1,
      dataButton: [
        {
          id: 2,
          label: "選択",
          class: "btn-form pl-2 pr-2"
        }
      ],
    };
  },
  created() {},
  methods: {
    onSelect(data) {
      if (data.item.data3 == null) {
        data.item.data3 = "";
      }
      if (data.item.data2 == null) {
        data.item.data2 = "";
      }
      this.$emit("onSelect", data.item);
      this.$bvModal.hide(this.popupIdReadOnly);
    }
  },
  computed: {
    dataTable() {
      this.items = this.$store.getters["generalModule/getGeneralIndustryCode1"];
      return this.items;
    }
  }
};
</script>
<style lang="scss" scoped>
.scrollable {
  height: 400px;
  overflow: auto;
}
</style>
