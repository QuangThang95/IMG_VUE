<template>
  <div>
    <b-modal size="xl" class="popup-modal" :id="popupId" hide-header hide-footer centered>
      <template slot="default">
        <BaseMessageError :title="title" :message="message" classBase></BaseMessageError>
        <div class="base-select-popup">
          <b-row class="base-select-search-popup">
            <b-col cols="12">
              <b-row>
                <b-col cols="2">
                  <span>{{imgText.general.basePopupSelectBranch.branchName}}</span>
                </b-col>

                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="search.branchName"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2" class="custom-field-2">
                  <span>{{imgText.general.basePopupSelectBranch.branchNameKana}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="search.branchKana"></b-form-input>
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
import { Message } from "@/constants/Message";
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
  props: ["popupId", "wasteClass"],
  data() {
    return {
      imgText: IMText,
      message: [],
      title: IMText.title.sshi0028Popup,
      dataAll: {},
      pageCount: 0,
      count: 0,
      pageSize: 10,
      isSearch: false,
      pages: AppConfig.Pages,
      search: {
        branchName: "",
        branchKana: ""
      },
      fields: [
        {
          key: "branchNumber",
          slot: "HEAD_branchNumber",
          label: IMText.general.basePopupSelectBranch.branchNumber
        },
        {
          key: "branchName",
          slot: "HEAD_branchName",
          label: IMText.general.basePopupSelectBranch.branchName
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: IMText.general.address
        },
        {
          key: "tel",
          slot: "HEAD_email",
          label: IMText.general.tel
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classButton"
        }
      ],
      tableId: "select-branch-popup-01",
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
      dataTable: [],
      currentWasteClass: current.wasteClass()
    };
  },
  created() {
    this.wasteClass =
    this.wasteClass > 0 ? this.wasteClass : this.currentWasteClass;
    common.resetPage();
    this.message = [];
    const param = { ...this.initParams() };
    this.getAll(param);
  },

  methods: {
    initParams() {
      let params = {
        wasteClass: this.wasteClass,
        customerCode: this.currentCustomerCode,
        param: {
          page: AppConfig.Pages.page,
          orderField: AppConfig.Pages.orderField,
          descending: AppConfig.Pages.descending,
          pageSize: this.pageSize,
          branchName: this.search.branchName,
          branchKana: this.search.branchKana
        }
      };
      return params;
    },

    onBack() {
      this.$bvModal.hide(this.popupId);
    },
    onSelect(data) {
      this.$emit("onSelectBranch", data.item);
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
      this.$store
        .dispatch(
          "customerBranchModule/getCustomerBranchByWasteClassPaging",
          params
        )
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
      data: "customerBranchModule/getCustomerBranchByWasteClassPaging"
    })
  },

  watch: {
    data() {
      this.dataTable = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
    }
  }
};
</script>

