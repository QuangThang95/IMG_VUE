<template>
  <div class="mt-4 mb-2">
    <div v-if="dataTable.length">
      <BaseTablePermission
        :dataTable="dataTable"
        :fields.sync="fields"
        :tableId="tableId"
        :permissionGroup="permissionGroup"
        :pageSize="pageSize"
        :pageCount="pageCount"
        :count="count"
        :nameButtonGroup="nameButtonGroup"
        @onSelect="onSelect"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getCurrentPage="getCurrentPage"
        @getPageSize="getPageSize"
      />
    </div>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import FormatData from "@/shared/FomatData";
import moment from "moment";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import * as lodash from "lodash";
import { canAction, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import AppConfig from "@/constants/AppConfig";
import IMText from "@/data/img-text.json";

export default Vue.extend({
  props: ["items", "tableId", "pageCount", "count", "pageSize"],
  components: {
    BaseTablePermission
  },
  data() {
    return {
      fields: [
        {
          key: "customerName",
          slot: "HEAD_customerName",
          label: "事業者名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: "所在地",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "tel",
          slot: "HEAD_tel",
          label: "TEL",
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
          key: "lastUpdate",
          slot: "HEAD_lastUpdate",
          label: "最終更新日",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "actionDirective",
          label: "操作",
          tdClass: "classOneButton"
        }
      ],
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      nameButtonGroup: {
        read: IMText.general.btnChoice,
      }
    };
  },

  created() {
    this.permissionGroup.Read = true;
  },

  methods: {
    onSelect(data) {
      this.$emit("onSelect", data.item);
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
    }
  },

  computed: {
    dataTable() {
      return this.items;
    }
  }
});
</script>
