<template>
  <div>
    <b-modal
      size="xl"
      class="popup-modal"
      :id="popupId"
      hide-header
      style="height: 800px"
      hide-footer
      centered
    >
      <template slot="default">
        <BaseMessageError :title="title" :message="message" classBase></BaseMessageError>
        <div class="base-select-popup">
          <b-row class="base-select-search-popup">
            <b-col cols="12">
              <b-row>
                <b-col cols="2">
                  <span>{{imgText.general.supplierName}}</span>
                </b-col>

                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="search.supplierName"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2" class="custom-field-2">
                  <span>{{imgText.general.supplierKana}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="search.supplierKana"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2">
                  <div class="float-right">
                    <b-button
                      class="btn-form ml-4"
                      size="sm"
                      @click="onSearch"
                    >{{imgText.general.search}}</b-button>
                  </div>
                </b-col>
              </b-row>
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
                  @onSelect="onSelect"
                  @getCurrentPage="getCurrentPage"
                  @closeSort="closeSort"
                  @onSorting="onSorting"
                  @getPageSize="getPageSize"
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
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text.json";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import BaseMessageError from "@/components/BaseMessageError";
import CountCharacter from "@/shared/CountCharacter";
import FormatData from "@/shared/FomatData";
import { mapGetters } from "vuex";
import { current } from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";
import { common } from "@/shared/utilities";
import { Message } from "@/constants/Message";

export default {
  components: {
    BaseTable,
    BaseButtonGroup,
    BaseMessageError
  },

  props: {
    popupId: {
      type: String,
      default: ""
    },
    search: {
      type: Object,
      default: {}
    },
    loadPopup: {
      type: Object,
      default: {}
    },
    supplierClass: {
       type: Number,
       default: 2
    }
  },

  data() {
    return {
      imgText: IMText,
      message: [],
      title: IMText.title.sshi0030SupplierPopup,
      dataAll: {},
      pageCount: 0,
      count: 0,
      pageSize: 10,
      isSearch: false,
      pages: AppConfig.Pages,
      fields: [
        {
          key: "supplierName",
          slot: "HEAD_supplierName",
          label: IMText.general.supplierName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierKana",
          slot: "HEAD_supplierKana",
          label: IMText.general.supplierKana,
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
      currentCustomerCode: current.customer().customerCode,
      dataTable: []
    };
  },

  methods: {
    initParams() {
      let params = {
        customerCode: this.currentCustomerCode,
        supplierClass: this.supplierClass,
        page: AppConfig.Pages.page,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending,
        pageSize: this.pageSize,
        supplierName: this.search.supplierName,
        supplierKana: this.search.supplierKana
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

    getCurrentPage() {
      let params = { ...this.initParams() };
      params.page = this.pages.page;
      this.getAll(params);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParams() };
      this.getAll(params);
    },

    onSearch() {
      this.message = [];
      this.isSearch = true;
      let params = { ...this.initParams() };
      this.getAll(params);
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "DisplayOrder";
      const params = { ...this.initParams() };
      this.getAll(params);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let params = { ...this.initParams() };
      this.getAll(params);
    },

    getAll(params) {
      this.$store
        .dispatch("supplierModule/getSuppliersPaging", params)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        });
    }
  },

  computed: {
    ...mapGetters({
      data: "supplierModule/getSuppliersPaging"
    })
  },

  watch: {
    data() {
      this.dataTable = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
    },

    loadPopup() {
      this.message = [];
      this.pageSize = 10;
      common.resetPage();
      const param = { ...this.initParams() };
      this.getAll(param);
    }
  }
};
</script>