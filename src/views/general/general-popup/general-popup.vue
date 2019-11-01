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
                  <span>{{imgText.general.fshi0008.key1}}</span>
                </b-col>
                <b-col cols="8">
                  <b-input-group size="sm">
                    <b-form-input v-model="managementKey1"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2">
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
import { HttpStatus } from "@/constants/HttpStatus";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { Screen, Action } from "@/constants/Screen";
import { Message } from "@/constants/Message";
import BaseProcessing from "@/components/BaseProcessing";
import BaseMessageError from "@/components/BaseMessageError";
export default {
  props: ["popupId"],
  components: {
    BaseButtonGroup,
    BaseTablePermission,
    BaseProcessing,
    BaseMessageError
  },
  data() {
    return {
      imgText: IMText,
      fields: [
        {
          key: "key1",
          slot: "HEAD_key1",
          label: IMText.general.fshi0008.key1
        },
        {
          key: "key1Desc",
          slot: "HEAD_key1Desc",
          label: IMText.general.fshi0008.key1Desc
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classButton"
        }
      ],
      tableId: "user-popup-01",
      position: 4,
      dataButton: [
        {
          id: 3,
          label: IMText.general.btnChoice,
          class: "btn-form btn-arrow-left pl-2 pr-2"
        }
      ],
      isPopup: true,
      imgStatus: false,
      dataTable: [],
      dataTableTmp: [],
      managementKey1: "",
      pages: AppConfig.Pages,
      isSearch: false,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      openDl: false,
      message: [],
      nameButtonGroup: {}
    };
  },
  created() {
    this.title = this.imgText.title.sshi0024Popup;
    this.permissionGroup.Read = true;
    this.nameButtonGroup = {
      read: IMText.general.btnChoice
    };
    const param = { ...this.initParams() };
    this.getGeneralControl(param);
  },
  methods: {
    initParams() {
      const param = {
        pageSize: this.pages.pageSize,
        page: 1,
        orderField: AppConfig.DisplayOrder,
        descending: AppConfig.Descending,
        key1: this.managementKey1
      };
      return param;
    },
    onSearch() {
      this.isSearch = true;
      this.message = [];
      let param = { ...this.initParams() };
      this.getGeneralControl(param);
    },
    onBack() {
      this.$bvModal.hide(this.popupId);
    },

    onSelect(data) {
      this.$emit("onSendDataGenera", data.item);
      this.onBack();
    },

    getCurrentPage(data) {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getGeneralControl(param);
    },

    getPageSize(data) {
      this.pages.pageSize = data;
      let param = { ...this.initParams() };
      this.getGeneralControl(param);
    },

    getGeneralControl(param) {
      this.openDl = true;
      this.$store
        .dispatch("generalModule/getGeneralControl", param)
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
      generalControlOption: "generalModule/getGeneralControl"
    })
  },

  watch: {
    generalControlOption() {
      this.dataTable = this.generalControlOption.items;
      this.pages.pageCount = this.generalControlOption.pageCount;
      this.pages.count = this.generalControlOption.count;
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

