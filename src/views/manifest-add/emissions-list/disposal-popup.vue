<template>
  <div>
    <b-modal
      hide-footer
      hide-header
      id="fshi0011disposal45"
      size="xl"
      style="height: 800px"
      centered
      @shown="onShown"
    >
      <BaseMessageError :message="message" :title="title" />
      <b-container fluid>
        <b-row>
          <b-col cols="5">
            <b-form-group label="業者名" :label-cols="2">
              <b-input-group>
                <b-form-input v-model.trim="search.supplierName"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="5">
            <b-form-group label="事業名カナ" :label-cols="3">
              <b-form-input v-model.trim="search.supplierKana"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-button class="btn-form float-right" size="sm" @click="onSearch">検索</b-button>
          </b-col>
        </b-row>
        <BaseTable
          :fields="fields"
          :dataTable="suppliers"
          :idTable="idTable"
          :position="position"
          :dataButton="dataButton"
          :pageSize="pageSize"
          :pageCount="pageCount"
          :count="count"
          @getCurrentPage="getCurrentPage"
          @onUpdate="onUpdate"
          @getPageSize="getPageSize"
        ></BaseTable>
      </b-container>
      <BaseProcessing :openDl="openDl" />
    </b-modal>
  </div>
  <!-- 
  no-close-on-backdrop-->
</template>
<script>
import BaseTable from "@/components/BaseTable.vue";
import { current, common, handleOutput } from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";
import FormatData from "@/shared/FomatData";
import BaseMessageError from "@/components/BaseMessageError.vue";
import BaseProcessing from "@/components/BaseProcessing";
import { ManifestService } from "@/services/manifest.service";
import HttpStatus from "http-status-codes";
const manifestService = new ManifestService();

export default {
  components: {
    BaseTable,
    BaseProcessing,
    BaseMessageError
  },
  props: ["general4", "general5"],

  data() {
    return {
      fields: [
        {
          key: "supplierNumber",
          label: "事業番号",
          slot: "HEAD_supplierName"
        },
        {
          key: "supplierName",
          label: "事業名",
          slot: "HEAD_supplierName"
        },
        {
          key: "address",
          label: "所在地",
          slot: "HEAD_address"
        },
        {
          key: "tel",
          label: "TEL",
          slot: "HEAD_tel",
          tdAttr: {
            "x-ms-format-detection": "none"
          },
          formatter: value => {
            return FormatData.formatTelphone(value);
          }
        },
        {
          key: "actionDirective",
          label: "選択",
          tdClass: "classOneButton"
        }
      ],
      idTable: "fshi0011disposal",
      position: -1,
      dataButton: [
        {
          id: 1,
          label: "選択",
          class: "btn-form pl-2 pr-2"
        }
      ],
      title: "収集運搬事業者選択",
      message: [],
      suppliers: [],
      currentCustomerCode: current.customer().customerCode,
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      search: {
        supplierName: "",
        supplierKana: ""
      },
      openDl: false,
      isSearch: false
    };
  },

  created() {},

  methods: {
    onShown() {
      this.message = [];
      common.resetPage();
      let param = { ...this.initParam() };
      this.getSupplier(param);
    },

    initParam() {
      const param = {
        supplierClass: 2,
        customerCode: this.currentCustomerCode,
        pageSize: this.pageSize,
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        supplierName: this.search.supplierName,
        supplierKana: this.search.supplierKana
      };
      return param;
    },

    onSearch() {
      this.isSearch = true;
      let param = { ...this.initParam() };
      this.getSupplier(param);
    },

    getCurrentPage() {
      let param = { ...this.initParam() };
      param.page = this.pages.page;
      this.getSupplier(param);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.initParam() };
      this.getSupplier(param);
    },

    getSupplier(param) {
      this.$store
        .dispatch("manifestModule/getSupplier", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onUpdate(param) {
      const result = {
        supplierCode: param.item.supplierCode,
        customerCode: param.item.customerCode
      };
      manifestService.getUserByTranportPopUp(result).then(res => {
        const data2 = {
          data1: null,
          transportCode: null,
          transporterCode: param.item.supplierCode,
          transporterName: param.item.supplierName,
          users: [],
          vehicle: {
            vehicleTypeTon: this.general4,
            vehicleType: this.general5
          },
          vehicleNumber: null,
          vehicleTypeTonValue: null,
          vehicleTypeValue: null,
          transportStaff: res.data.map(i => {
            return {
              id: +i.userCode,
              text: i.userName
            };
          }),
          transportStaffCode: null
        };
        const params = [];
        params.push(data2);
        this.getDataPopUp(params);
        this.$emit("onClosePopUp");
      });
    },

    getDataPopUp(param) {
      this.$store.dispatch("manifestModule/getDataTransportPopUp45", param);
    }
  },

  computed: {
    dataTable() {
      return this.$store.state.manifestModule.suppliers;
    }
  },

  watch: {
    dataTable() {
      this.suppliers = this.dataTable.items;
      this.pageCount = this.dataTable.pageCount;
      this.count = this.dataTable.count;
    }
  }
};
</script>
