<template>
  <div>
    <b-tabs content-class="mt-3" class="tab-report-custom">
      <b-tab title="集計結果" active>
        <BaseTablePermission
          :dataTable="dataTable"
          :fields="fields"
          :tableId="tableId"
          :position="position"
          :permissionGroup="permissionGroup"
          :nameButtonGroup="nameButtonGroup"
          :pageSize="pageSize"
          :pageCount="pageCount"
          :count="count"
          :isReportScreen="true"
          @closeSort="closeSort"
          @onSorting="onSorting"
          @getCurrentPage="getCurrentPage"
          @getPageSize="getPageSize"
          @onUpdate="onUpdate"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import IMText from "@/data/img-text";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { mapGetters } from "vuex";
import AppConfig from "@/constants/AppConfig";
import FormatData from "@/shared/FomatData";
import { HttpStatus } from "@/constants/HttpStatus";
import { canAction, common, handleOutput } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import FileSaver from "file-saver";
export default {
  props: ["items", "permissionGroup","pageCount",  "pageSize", "count"],
  components: {
    BaseTablePermission
  },
  data() {
    return {
      imgText: IMText,
      position: 4,
      fields: [
        {
          key: "createDate",
          slot: "HEAD_createDate",
          label: IMText.general.fshi0014.summaryDatetime,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDateTime(value);
          }
        },
        {
          key: "reportTitle",
          slot: "HEAD_reportTitle",
          label: IMText.general.fshi0014.reportTitle,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data1",
          slot: "HEAD_data1",
          label: IMText.general.fshi0014.summaryStatus,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "actionDirective",
          label: IMText.general.fshi0014.aggregateResults,
          tdClass: "classButton",
        }
      ],
      tableId: "report-tab",
      fileName: ""
    };
  },
  methods: {
    onUpdate(data) {
      let paramDownload = data.item;
      this.downloadFile(paramDownload);
    },

    downloadFile(paramDownload) {
      this.fileName = paramDownload.reportTitle;
      this.$store
        .dispatch("reportModule/downloadFileReport", paramDownload.reportId)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            FileSaver.saveAs(response.data, this.fileName + '.csv');
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
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
  created() {
    this.nameButtonGroup = {
      update: IMText.general.fshi0014.download
    };
    const data = {
      customerCode: this.customerCode,
      wasteClass: this.wasteClass,
      page: AppConfig.Pages.page,
      pageSize: this.pageSize
    };

    let count = 0;
    if (canAction(Action.Update, Screen.SSHI0016)) {
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0016)) {
      count++;
    }

    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },
  mounted() {
  },

  computed: {
    dataTable() {
      return this.items;
    }
  },
};
</script>
<style>
.tab-report-custom ul > :first-child  { 
  margin-left: 20px;
}
</style>
