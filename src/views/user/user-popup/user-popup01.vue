<template>
  <div>
    <b-modal size="xl" class="popup-modal" :id="popupId" hide-header hide-footer centered>
      <template slot="default">
        <BaseMessageError :title="title" :message="message" />
        <div class="sshi0021-popup">
          <b-row class="sshi0021-search-popup">
            <b-col cols="12">
              <b-row>
                <b-col cols="2">
                  <span>{{imgText.general.sshi0021.branchName}}</span>
                </b-col>

                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="condition.branchName"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2" class="custom-field-2">
                  <span>{{imgText.general.sshi0021.branchNameKana}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="condition.branchKana"></b-form-input>
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
            <BaseTablePermission
              :dataTable="dataTable"
              :fields.sync="fields"
              :tableId="tableId"
              :pageSize="pages.pageSize"
              :pageCount="pages.pageCount"
              :count="pages.count"
              :permissionGroup="permissionGroup"
              :nameButtonGroup="nameButtonGroup"
              @onSelect="onSelect"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
            />
          </div>
          <BaseProcessing :openDl="openDl" />
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import IMText from "@/data/img-text";
import BaseButtonGroup from "@/components/BaseButtonGroup";
import { mapGetters } from "vuex";
import { isNullOrUndefined, common, canAction } from "@/shared/utilities";
import { current } from "@/shared/utilities";
import { HttpStatus } from "@/constants/HttpStatus";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { Screen, Action } from "@/constants/Screen";
import BaseProcessing from "@/components/BaseProcessing";
import { Message } from "@/constants/Message";
import BaseMessageError from "@/components/BaseMessageError";
export default {
  components: {
    BaseButtonGroup,
    BaseTablePermission,
    BaseProcessing,
    BaseMessageError
  },
  props: ["popupId"],
  data() {
    return {
      imgText: IMText,
      condition: {
        branchName: "",
        branchCode: "",
        branchKana: ""
      },
      fields: [
        {
          key: "branchNumber",
          slot: "HEAD_branchNumber",
          label: IMText.general.sshi0021.branchNumber
        },
        {
          key: "branchName",
          slot: "HEAD_branchName",
          label: IMText.general.sshi0021.branchName
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
      tableId: "user-popup-01",
      position: 4,
      isPopup: true,
      imgStatus: false,
      currentCustomerCode: current.customer().customerCode,
      dataTable: [],
      dataTableTmp: [],
      pages: AppConfig.Pages,
      isSearch: false,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      openDl: false,
      title: "排出事業場選択",
      message: [],
      nameButtonGroup: {
        read: IMText.general.btnChoice
      }
    };
  },
  created() {
    this.permissionGroup.Read = true;
    this.nameButtonGroup = {
      read: IMText.general.btnChoice
    };
    this.fields.push(common.actionDirective(1));
    const param = { ...this.initParams() };
    this.getBranch(param);
  },
  methods: {
    initParams() {
      const param = {
        customerCode: this.currentCustomerCode,
        pageSize: this.pages.pageSize,
        page: 1,
        orderField: AppConfig.DisplayOrder,
        descending: AppConfig.Descending,
        branchName: this.condition.branchName,
        branchKana: this.condition.branchKana
      };
      return param;
    },
    onSearch() {
      this.isSearch = true;
      this.message = [];
      let param = { ...this.initParams() };
      this.getBranch(param);
    },
    getBranch(param) {
      this.openDl = true;
      this.$store
        .dispatch("customerBranchModule/getCustomerBranchOption", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
          this.openDl = false;
        });
    },
    onBack() {
      this.$bvModal.hide(this.popupId);
    },
    onSelect(data) {
      this.$emit("onSendDataBranch", data.item);
      this.onBack();
    },
    getCurrentPage(data) {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getBranch(param);
    },

    getPageSize(data) {
      this.pages.pageSize = data;
      let param = { ...this.initParams() };
      this.getBranch(param);
    }
  },

  computed: {
    ...mapGetters({
      branchOption: "customerBranchModule/getCustomerBranchOption"
    })
  },

  watch: {
    branchOption() {
      this.dataTable = this.branchOption.items;
      this.pages.pageCount = this.branchOption.pageCount;
      this.pages.count = this.branchOption.count;
    }
  }
};
</script>

<style>
.sshi0021-popup {
  padding: 0 1em;
}
.sshi0021-search-popup {
  margin-bottom: 0.5rem;
}
</style>

