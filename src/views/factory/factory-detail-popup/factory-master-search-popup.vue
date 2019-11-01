<template>
  <div>
    <b-modal
      ref="sshi0016modal"
      hide-footer
      hide-header
      size="xl"
      style="height: 800px"
      v-model="isShow"
      class="huss"
      centered
      :id="popupId"
    >
      <h6 class="fontColor">処分業者選択</h6>
      <b-container fluid>
        <div>
          <div>
            <b-row>
              <b-col cols="5">
                <b-form-group label="業者名" :label-cols="2">
                  <b-form-input type="text" autocomplete="name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="5">
                <b-form-group label="業者名カナ" :label-cols="3">
                  <b-form-input type="text" autocomplete="name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="1">
                <b-button class="mt-1 btn-form float-right" size="sm">検索</b-button>
              </b-col>
            </b-row>
            <BaseTablePermission
              :dataTable="data"
              :fields="fields"
              :tableId="tableId"
              :position="position"
              :pageCount="pageCount"
              :count="count"
              :pageSize="pageSize"
              :permissionGroup="permissionGroup"
              :nameButtonGroup="nameButtonGroup"
              @onSelect="onSelect"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
              @onSorting="onSorting"
              @closeSort="closeSort"
            ></BaseTablePermission>
          </div>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseTable from "@/components/BaseTable.vue";
import { current, navigation } from "@/shared/utilities";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import CountCharacter from "@/shared/CountCharacter";
import AppConfig from "@/constants/AppConfig";
import { Screen, Action } from "@/constants/Screen";
import { common, canAction } from "@/shared/utilities";
import * as lodash from "lodash";
import IMText from "@/data/img-text";
import FormatData from "@/shared/FomatData";

export default {
  props: ["popupId"],
  components: {
    BaseTable,
    BaseTablePermission
  },
  data() {
    return {
      isShow: false,
      fields: [
        {
          key: "supplierNumber",
          slot: "HEAD_supplierNumber",
          label: "事業番号",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "supplierName",
          slot: "HEAD_supplierName",
          label: "事業名",
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
          key: "actionDirective",
          label: "操作",
          tdClass: "classButton"
        }
      ],
      tableId: "sshi0001-table",
      position: -1,
      dataButton: [
        {
          id: 2,
          label: "選択",
          class: "btn-form btn-arrow-left pl-2 pr-2"
        }
      ],
      currentCustomerCode: current.customer().customerCode,
      data: [],
      count: 0,
      pageCount: 0,
      pageSize: 10,

      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      nameButtonGroup: {},
    };
  },
  async created() {
    this.nameButtonGroup = {
      read: IMText.general.btnChoice
    };
    let params = {...this.initParamsPaging()}
    await this.getFactorySupplier(params);
    this.permissionGroup.Read = true;
  },
  methods: {
    initParamsPaging() {
      const params = {
        customerCode: this.currentCustomerCode,
        paging: {
          page: AppConfig.Pages.page,
          orderField: AppConfig.Pages.orderField,
          descending: AppConfig.Pages.descending,
          pageSize: this.pageSize,
        }
      }
      return params;
    },
    async getFactorySupplier(params) {
      await this.$store
        .dispatch("supplierModule/getFactorysSupplier", params)
        .then(resp => {
         this.data = resp.data.items;
         this.count = resp.data.count;
         this.pageCount = resp.data.pageCount;
        });
    },
    onSelect(data) {
      this.$bvModal.hide(this.popupId);
      this.$emit("selectSupplier", data.item);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = {...this.initParamsPaging()}
      this.getFactorySupplier(params);
    },

    closeSort(data) {
      let params = {...this.initParamsPaging()}
      params.paging.orderField = "DisplayOrder";
      params.paging.descending = true;
      this.getFactorySupplier(params)
    },

    onSorting(data, ischeck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let params = {...this.initParamsPaging()}
      this.getFactorySupplier(params)
    },

    getCurrentPage(data) {
      let params = {...this.initParamsPaging()}
      params.paging.page = data;
      this.getFactorySupplier(params);
    },
  },
  computed: {
    ...mapGetters({
      dataTable: "supplierModule/getFactorysSupplier"
    })
  },
};
</script>
