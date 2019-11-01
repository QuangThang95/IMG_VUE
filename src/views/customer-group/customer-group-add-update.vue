<template>
  <div>
    <b-container fluid>
      <BaseMessageError :message="message" :title="title" />
      <div>
        <div>
          <b-row v-if="!isUpdate">
            <b-col md="10" offset-md="2">
              <span class="asterisk">*は必須入力</span>
            </b-col>
          </b-row>
        </div>
        <CustomerGroupReadOnly v-if="isReadOnly" :customerGroup="customerGroup" />
        <table v-else class="table table-box table-sm">
          <tr v-if="isUpdate">
            <td colspan="6" class="asterisk">
              <b-row>
                <b-col></b-col>
                <b-col>*は必須入力</b-col>
                <b-col></b-col>
              </b-row>
            </td>
            <td class="titleColumn">登録日時</td>
            <td colspan="2" class="timeValue">{{customerGroup.createDate | formatDate}}</td>
            <td class="titleColumn">最終更新日時</td>
            <td colspan="2" class="timeValue">{{customerGroup.lastUpdate | formatDate}}</td>
          </tr>
          <tr>
            <td class="titleColumn">
              <span class="asterisk">*</span>グループ名
            </td>
            <td colspan="5">
              <b-input-group size="sm">
                <b-form-input
                  v-model.trim="customerGroup.groupName"
                  maxlength="260"
                  :readonly="isReadOnly"
                  @change="onChange(true)"
                ></b-form-input>
              </b-input-group>
            </td>
            <td class="titleColumn">グループ名カナ</td>
            <td colspan="5">
              <b-input-group size="sm">
                <b-form-input
                  v-model.trim="customerGroup.groupKana"
                  maxlength="260"
                  :readonly="isReadOnly"
                  @change="onChange(true)"
                ></b-form-input>
              </b-input-group>
            </td>
          </tr>
          <tr>
            <td class="titleColumn titleColumn-textarea">備考</td>
            <td colspan="11">
              <b-form-textarea
                :readonly="isReadOnly"
                no-resize
                size="lg"
                v-model.trim="customerGroup.memo"
                maxlength="256"
                @change="onChange(true)"
              ></b-form-textarea>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="isUpdate">
        <b-tabs content-class="mt-3">
          <b-tab disabled></b-tab>
          <b-tab title="排出事業場" active>
            <b-row v-if="!isReadOnly">
              <b-col>
                <b-button class="float-right btn-form mt-3 mb-2" size="sm" @click="goToPopup">編集</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div v-if="customerBranch.length>0">
                  <BaseTablePermission
                    :dataTable="customerBranch"
                    :fields="fields"
                    :tableId="tableId"
                    :position="position"
                    :pageCount="pageCount"
                    :count="count"
                    :pageSize="pageSize"
                    @getCurrentPage="getCurrentPage"
                    @closeSort="closeSort"
                    @onSorting="onSorting"
                    @getPageSize="getPageSize"
                  ></BaseTablePermission>
                </div>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
      <BaseButtonGroupPermission
        :imgStatus="isUpdate"
        :isReadOnly="isReadOnly"
        @onAddUpdate="onAddUpdate"
        @onBack="onBack"
      />
    </b-container>
    <SSHI0009Popup
      :groupName="customerGroup.groupName"
      :groupCode="customerGroup.groupCode"
      :currentCustomerCode="currentCustomerCode"
      :isShowPopup="isShowPopup"
      @onClosePopUp="onClosePopUp"
    ></SSHI0009Popup>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import SSHI0009Popup from "./customer-group-popup.vue";
import { CustomerGroup } from "@/models/customerGroup.model";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import { MasterProperty } from "@/shared/MasterProperty";
import { Message } from "@/constants/Message";
import CountCharacter from "@/shared/CountCharacter";
import BaseMessageError from "@/components/BaseMessageError";
import FormatData from "@/shared/FomatData";
import { current } from "@/shared/utilities";
import { mapActions, mapGetters } from "vuex";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import { common, isNullOrEmpty } from "@/shared/utilities";
import { navigation, canAction } from "@/shared/utilities";
import * as lodash from "lodash";
import { Screen, Action } from "@/constants/Screen";
import AppConfig from "@/constants/AppConfig";
import BaseProcessing from "@/components/BaseProcessing";
import IMText from "@/data/img-text";
import CustomerGroupReadOnly from "./customer-group-read-only.vue";
export default {
  components: {
    SSHI0009Popup,
    BaseTablePermission,
    BaseMessageError,
    BaseButtonGroupPermission,
    BaseProcessing,
    CustomerGroupReadOnly
  },
  data() {
    return {
      imgText: IMText,
      timer: new Date().toDateString("yyyy-MM-dd"),
      isUpdate: false,
      fields: [
        {
          key: "branchNumber",
          label: "事業場番号",
          slot: "HEAD_branchNumber",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "branchName",
          label: "事業場名",
          slot: "HEAD_branchName",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          label: "所在地",
          slot: "HEAD_address",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "tel",
          label: "TEL",
          slot: "HEAD_tel",
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
          label: "最終更新日時",
          slot: "HEAD_lastUpdate",
          formatter: value => {
            return FormatData.displayDate(value);
          },
          isSortable: true,
          isDesc: true,
          isAsc: true
        }
      ],
      tableId: "sshi0008-table",
      position: -1,
      initData: {},
      customerGroup: {
        customerCode: "",
        groupCode: "",
        groupName: "",
        groupKana: "",
        displayOrder: "",
        memo: "",
        deleteFlag: "",
        createDate: "",
        lastUpdate: "",
        id: ""
      },
      newCustomerGroup: new CustomerGroup(),
      message: [],
      currentCustomerCode: current.customer().customerCode,
      title: "排出事業場グループ追加",
      isReadOnly: true,
      messageDataNull: Message.E00021,
      customerBranch: [],
      pageCount: 0,
      count: 0,
      pageSize: 10,
      pages: AppConfig.Pages,
      openDl: false,
      isChangeData: false,
      isShowPopup: {}
    };
  },

  created() {
    this.onBeforeUnLoad();
    this.message = [];
    const groupCode = +this.$route.params.groupCode;
    if (groupCode) {
      this.isUpdate = true;
      this.customerGroup.groupCode = groupCode;
      const data = {
        customerCode: this.currentCustomerCode,
        groupCode: groupCode
      };
      if (canAction(Action.Update, Screen.SSHI0009)) {
        this.title = "排出事業場グループ変更";
        this.isReadOnly = false;
      } else if (canAction(Action.Read, Screen.SSHI0009)) {
        this.title = "排出事業場グループ参照";
        this.isReadOnly = true;
      }
      this.getCustomerGroupByCode(data);
      common.resetPage();
      const result = {
        ...this.initParam()
      };
      this.getAllCustomerBranchByGroup(result);
    } else {
      this.isUpdate = false;
      this.isReadOnly = false;
      this.title = "排出事業場グループ追加";
    }
  },

  destroyed() {
    this.isChangeData = false;
  },

  methods: {
    initParam() {
      const param = {
        customerCode: this.currentCustomerCode,
        groupCode: this.$route.params.groupCode,
        page: AppConfig.Pages.page,
        pageSize: this.pageSize,
        orderField: AppConfig.Pages.orderField,
        descending: AppConfig.Pages.descending
      };
      return param;
    },

    goToPopup() {
      this.isShowPopup = {};
      this.$bvModal.show("sshi0009PopUp");
    },

    onBack() {
      if (!this.isReadOnly && this.isChangeData) {
        if (this.showPopupDirtyForm()) {
          navigation.sshi0007();
        }
        return;
      }
      navigation.sshi0007();
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    onAddUpdate() {
      this.message = [];
      this.onValidation();
      if (!this.message.length) {
        this.openDl = true;
        if (this.isUpdate) {
          this.newCustomerGroup.customerCode = this.currentCustomerCode;
          this.newCustomerGroup.groupCode = this.customerGroup.groupCode;
          this.newCustomerGroup.groupName = this.customerGroup.groupName;
          this.newCustomerGroup.groupKana = this.customerGroup.groupKana;
          this.newCustomerGroup.memo = this.customerGroup.memo;
          this.newCustomerGroup.lastUpdate = this.customerGroup.lastUpdate;
          this.$store
            .dispatch(
              "customerGroupModule/updateCustomerGroup",
              this.newCustomerGroup
            )
            .then(() => {
              this.getCustomerGroup(this.currentCustomerCode);
              this.$router.push({
                path: MasterProperty.FSHI0003.SSHI0007.Path
              });
            })
            .catch(err => {
              this.message = this.message.concat(handleOutput.errorHandle(err));
            })
            .finally(() => {
              this.openDl = false;
            });
        } else {
          this.newCustomerGroup.customerCode = this.currentCustomerCode;
          this.newCustomerGroup.groupName = this.customerGroup.groupName;
          this.newCustomerGroup.groupKana = this.customerGroup.groupKana;
          this.newCustomerGroup.memo = this.customerGroup.memo;
          this.$store
            .dispatch(
              "customerGroupModule/addCustomerGroup",
              this.newCustomerGroup
            )
            .then(res => {
              this.isChangeData = false;
              this.customerGroup = res.data;
              common.resetPage();
              let param = {
                ...this.initParam()
              };
              this.getAllCustomerBranchByGroup(param);
              this.onRedirect(res.data.groupCode);
            })
            .catch(err => {
              this.message = this.message.concat(handleOutput.errorHandle(err));
            })
            .finally(() => {
              this.openDl = false;
            });
        }
      }
    },

    onRedirect(groupCode) {
      this.isUpdate = true;
      this.title = "排出事業場グループ参照";
      this.$router.push({
        path: MasterProperty.FSHI0003.SSHI0009.Path,
        name: MasterProperty.FSHI0003.SSHI0009.Name,
        params: {
          groupCode: groupCode
        }
      });
    },

    onClosePopUp() {
      const param = { ...this.initParam() };
      this.getAllCustomerBranchByGroup(param);
      this.$bvModal.hide("sshi0009PopUp");
    },
    onValidation() {
      // Group Name
      if (isNullOrEmpty(this.customerGroup.groupName)) {
        this.message.push(Message.E00023.formatText("グループ名"));
      }
      // Customer Kana
      if (
        !isNullOrEmpty(this.customerGroup.groupKana) &&
        !CountCharacter.isKatakanaHasSpace(this.customerGroup.groupKana)
      ) {
        this.message.push(Message.E00028.formatText("事業者名カナ"));
      }
    },

    getCustomerGroupByCode(param) {
      this.customerGroup = {};
      this.$store
        .dispatch("customerGroupModule/getCustomerGroupByCode", param)
        .then(res => {
          this.customerGroup = res.data;
        });
    },

    getCustomerGroup(customerCode) {
      this.$store.dispatch(
        "customerGroupModule/getCustomerGroup",
        customerCode
      );
    },

    getCustomerBranchByGroup(param) {
      this.$store.dispatch(
        "customerGroupModule/getCustomerBranchByCustomer",
        param
      );
    },
    getAllCustomerBranchByGroup(param) {
      this.$store.dispatch(
        "customerGroupModule/getAllCustomerBranchByGroup",
        param
      );
    },

    getCurrentPage() {
      const result = { ...this.initParam() };
      this.getAllCustomerBranchByGroup(result);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      const result = { ...this.initParam() };
      this.getAllCustomerBranchByGroup(result);
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      const result = { ...this.initParam() };
      this.getAllCustomerBranchByGroup(result);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let result = { ...this.initParam() };
      this.getAllCustomerBranchByGroup(result);
    },

    onChange(data) {
      this.isChangeData = data;
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }
  },

  computed: {
    data() {
      return this.$store.state.customerGroupModule.allBranchByGroup;
    }
  },

  watch: {
    data() {
      this.customerBranch = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
    }
  }
};
</script>

<style lang="scss" scoped>
td.timeValue {
  font-size: 0.875rem;
}
</style>
