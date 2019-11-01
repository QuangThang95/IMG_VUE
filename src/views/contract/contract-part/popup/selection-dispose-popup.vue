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
                <BaseTableNotPaging
                  :dataTable="dataTable"
                  :fields="fields"
                  :tableId="tableId"
                  :dataButton="dataButton"
                  @onSelect="onSelect"
                />
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import BaseTableNotPaging from "@/components/BaseTableNotPagging.vue";
import IMText from "@/data/img-text.json";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import BaseMessageError from "@/components/BaseMessageError";
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
      title: IMText.title.sshi0030DisposePopup,
      dataAll: {},
      fields: [
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "処分方法（大分類）"
        },
        {
          key: "data2",
          slot: "HEAD_data2",
          label: "処分方法（中分類）"
        },
        {
          key: "data3",
          slot: "HEAD_data3",
          label: "処分方法（小分類）"
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classButton"
        }
      ],
      tableId: "table" + this.popupId,
      dataButton: [
        {
          id: 2,
          label: IMText.general.btnChoice,
          class: "btn-form btn-arrow-left pl-2 pr-2"
        }
      ],
      isPopup: true,
      imgStatus: false,
      dataTable: []
    };
  },
  created() {
    this.message = [];
    const param = { ...this.initParams() };
    this.getAll(param);
  },

  methods: {
    initParams() {
      let params = {
        key1: "処分方法",
        data5: 1
      };
      return params;
    },

    onBack() {
      this.$bvModal.hide(this.popupId);
    },

    onSelect(data) {
      this.$emit("onSelect", data.item, this.popupId);
      this.onBack();
    },

    getAll(params) {
      this.$store.dispatch("generalModule/getDisposeMethod", params);
    },
  },

  computed: {
    ...mapGetters({
      data: "generalModule/getDisposeMethod"
    })
  },

  watch: {
    data() {
      this.dataTable = this.data;
      this.count = this.data.length;
    },

    loadPopup() {
      const param = { ...this.initParams() };
      this.getAll(param);
    }
  }
};
</script>