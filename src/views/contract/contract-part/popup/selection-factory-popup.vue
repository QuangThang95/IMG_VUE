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
              <b-row class="mb-3">
                <b-col cols="5">
                  <b-input-group prepend="集運搬業者" class="mt-3" size="sm">
                    <b-form-input :disabled="true" v-model="supplier.supplierName"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="2">
                  <span>{{imgText.general.factoryNameDefault}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="search.factoryName"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2" class="custom-field-2">
                  <span>{{imgText.general.factoryKanaDefault}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="search.factoryKana"></b-form-input>
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
import FormatData from "@/shared/FomatData";
import { mapGetters } from "vuex";
import { current } from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";
import { common } from "@/shared/utilities";

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
    supplier: {
      type: Object,
      default: () => ({
        supplierCode: null,
        supplierName: ""
      })
    }
  },

  data() {
    return {
      imgText: IMText,
      message: [],
      title: IMText.title.sshi0030FactoryPopup,
      dataAll: {},
      pageCount: 0,
      count: 0,
      pageSize: 10,
      isSearch: false,
      pages: AppConfig.Pages,
      fields: [
        {
          key: "factoryNumber",
          slot: "HEAD_factoryNumber",
          label: IMText.general.factoryNumberDefault,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "factoryName",
          slot: "HEAD_factoryName",
          label: IMText.general.factoryNameDefault,
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
        supplierCode: this.supplier.supplierCode,
        param: {
          page: AppConfig.Pages.page,
          orderField: AppConfig.Pages.orderField,
          descending: AppConfig.Pages.descending,
          pageSize: this.pageSize,
          factoryName: this.search.factoryName,
          factoryKana: this.search.factoryKana
        }
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
      params.param.page = this.pages.page;
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
      if (this.supplier.supplierCode != null) {
        this.$store
          .dispatch("factoryModule/getFactoryCarriers", params)
          .then(res => {
            if (res.data.items.length < 1 && this.isSearch) {
              this.isSearch = false;
              this.message.push(Message.E00021);
            }
          });
      }
    }
  },

  computed: {
    ...mapGetters({
      data: "factoryModule/getFactoryCarriers"
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