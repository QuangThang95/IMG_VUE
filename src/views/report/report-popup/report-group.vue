<template>
  <div>
    <b-modal size="xl" class="popup-modal" :id="popupId" hide-header hide-footer centered @shown="groupPopupOpend">
      <template slot="default">
        <BaseMessageError :title="title" :message="message" />
        <div class="sshi0021-popup">
          <b-row class="sshi0021-search-popup">
            <b-col cols="12">
              <b-row>
                <b-col cols="2" class="pr-0">
                  <span>{{imgText.general.sshi0021.groupNameBusiness}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="condition.groupName"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2" class="p-0 ml-42">
                  <span>{{imgText.general.sshi0021.groupNameBusinessKana}}</span>
                </b-col>
                <b-col cols="3">
                  <b-input-group size="sm">
                    <b-form-input v-model="condition.memo"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="1">
                  <div class="float-right">
                    <b-button
                      class="btn-form"
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
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { Screen, Action } from "@/constants/Screen";
import BaseProcessing from "@/components/BaseProcessing";
import { Message } from "@/constants/Message";
import BaseMessageError from "@/components/BaseMessageError";
import AppConfig from "@/constants/AppConfig";
import * as lodash from "lodash";

export default {
  props: ["popupId","condition"],
  components: {
    BaseButtonGroup,
    BaseTablePermission,
    BaseMessageError,
    BaseProcessing
  },
  data() {
    return {
      imgText: IMText,
      fields: [
        {
          key: "groupName",
          slot: "HEAD_groupName",
          label: IMText.general.sshi0021.groupName
        },
        {
          key: "memo",
          slot: "HEAD_email",
          label: IMText.general.sshi0021.groupMemo
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classButton"
        }
      ],
      tableId: "user-popup-02",
      isPopup: true,
      imgStatus: false,
      currentCustomerCode: current.customer().customerCode,
      dataTable: [],
      dataTableTmp: [],
      message: [],
      pages: AppConfig.Pages,
      isSearch: false,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      openDl: false
    };
  },
  created() {
    this.title = this.imgText.general.sshi0021.emissionBusinessGroup;
    this.permissionGroup.Read = true;
    this.nameButtonGroup = {
      read: IMText.general.btnChoice
    };
    this.fields.push(common.actionDirective(1));
    const param = { ...this.initParams() };
    this.getGroup(param);
  },
  methods: {
    groupPopupOpend(e) {
      const param = { ...this.initParams() };
      this.getGroup(param);
    },
    initParams() {
      const param = {
        customerCode: this.currentCustomerCode,
        pageSize: this.pages.pageSize,
        page: 1,
        orderField: AppConfig.DisplayOrder,
        descending: AppConfig.Descending,
        groupKana: this.condition.groupKana,
        groupName: this.condition.groupName
      };
      return param;
    },
    onSearch() {
      this.isSearch = true;
      this.message = [];
      let param = { ...this.initParams() };
      this.getGroup(param);
    },
    onBack() {
      this.$bvModal.hide(this.popupId);
    },
    onSelect(data) {
      this.$emit("onSendDataGroup", data.item);
      this.onBack();
    },
    getCurrentPage(data) {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getGroup(param);
    },

    getPageSize(data) {
      this.pages.pageSize = data;
      let param = { ...this.initParams() };
      this.getGroup(param);
    },

    getGroup(param) {
      this.openDl = true;
      this.$store
        .dispatch("customerGroupModule/getAllCustomerGroup", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
          this.openDl = false;
        });
    }
  },

  computed: {
    ...mapGetters({
      groupOption: "customerGroupModule/getAllCustomerGroup"
    })
  },

  watch: {
    groupOption() {
      this.dataTable = this.groupOption.items;
      this.pages.pageCount = this.groupOption.pageCount;
      this.pages.count = this.groupOption.count;
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
.pr-0 {
  padding-right: 0 !important;
}
.p-0 {
  padding: 0 !important;
}
.ml-42 {
  margin-left: 42px !important;
}
</style>

