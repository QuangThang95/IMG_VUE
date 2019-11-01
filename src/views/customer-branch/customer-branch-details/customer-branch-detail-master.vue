<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <div v-if="dataError.length > 0  && dataError[0].notifyClass !== 2">
        <BaseTableError
          :dataTable="dataError"
          :fields.sync="fieldsError"
          :tableId="tableErrorId"
          :groupNotification="groupNotification"
          @onUpdate="onUpdateError"
          @onCancel="onCancelError"
        />
      </div>
      <CustomerBranchFormDetail
        v-if="!isReadOnly"
        ref="customerBracnhFormDetail"
        :item="customerBranch"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        :visibleRequired="visibleRequired"
        :isChange="isChange"
        @onSearchAddress="onSearchAddress"
        @changeWasteClass="changeWasteClass"
      />

      <CustomerBranchFormDetailReadOnly
        v-if="isReadOnly"
        ref="customerBracnhFormDetail"
        :item="customerBranch"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        @onSearchAddress="onSearchAddress"
      />

      <div
        class="grid-screen"
        v-if="(customerBranch.dischargeWasteClass1
      || customerBranch.dischargeWasteClass2
      || customerBranch.dischargeWasteClass3
      || customerBranch.dischargeWasteClass4
      || customerBranch.dischargeWasteClass5
      ) && imgStatus"
      >
        <b-tabs content-class="mt-3">
          <b-tab disabled></b-tab>
          <b-tab
            :title="imgText.general.fshi0014.industrialWaste"
            active
            v-if="customerBranch.dischargeWasteClass1 === true"
            @click="onClickTab(1)"
          >
            <CustomerBranchTab
              :imgStatus="imgStatus"
              :readOnly="isReadOnly"
              :customerBranch="customerBranch"
              :wasteClass="1"
              :permissionGroup="permissionTab"
              :tableId="tabInfo.tab1.tableId"
              :popupId="tabInfo.tab1.popupId"
              :dataTable="dataWasteClass1.items"
              :fields="fields"
              :dataSelectBox="wasteClassification1"
              :dataSearchTab="dataSearchTab"
              :pageCount="dataWasteClass1.pageCount"
              :count="dataWasteClass1.count"
              :pageSize="pageSize1"
              @onSearch="onSearch"
              @resetList="resetList"
              @closeSort="closeSort"
              @onSorting="onSorting"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
              @orderByUp="orderByUp"
              @orderByDown="orderByDown"
            />
          </b-tab>
          <b-tab
            :title="imgText.general.fshi0014.speciallyManagedIndustrialWaste"
            v-if="customerBranch.dischargeWasteClass2 === true"
            @click="onClickTab(2)"
          >
            <CustomerBranchTab
              :imgStatus="imgStatus"
              :readOnly="isReadOnly"
              :customerBranch="customerBranch"
              :wasteClass="2"
              :permissionGroup="permissionTab"
              :tableId="tabInfo.tab2.tableId"
              :popupId="tabInfo.tab2.popupId"
              :dataTable="dataWasteClass2.items"
              :fields="fields"
              :dataSearchTab="dataSearchTab"
              :dataSelectBox="wasteClassification2"
              :pageCount="dataWasteClass2.pageCount"
              :count="dataWasteClass2.count"
              :pageSize="pageSize2"
              @onSearch="onSearch"
              @resetList="resetList"
              @closeSort="closeSort"
              @onSorting="onSorting"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
              @orderByUp="orderByUp"
              @orderByDown="orderByDown"
            />
          </b-tab>
          <b-tab
            :title="imgText.general.fshi0014.constructionWaste"
            v-if="customerBranch.dischargeWasteClass3 === true"
            @click="onClickTab(3)"
          >
            <CustomerBranchTab
              :imgStatus="imgStatus"
              :readOnly="isReadOnly"
              :customerBranch="customerBranch"
              :wasteClass="3"
              :permissionGroup="permissionTab"
              :tableId="tabInfo.tab3.tableId"
              :popupId="tabInfo.tab3.popupId"
              :dataTable="dataWasteClass3.items"
              :fields="fields"
              :dataSearchTab="dataSearchTab"
              :dataSelectBox="wasteClassification3"
              :pageCount="dataWasteClass3.pageCount"
              :count="dataWasteClass3.count"
              :pageSize="pageSize3"
              @onSearch="onSearch"
              @resetList="resetList"
              @closeSort="closeSort"
              @onSorting="onSorting"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
              @orderByUp="orderByUp"
              @orderByDown="orderByDown"
            />
          </b-tab>
          <b-tab
            :title="imgText.general.fshi0014.valuables"
            v-if="customerBranch.dischargeWasteClass4 === true"
            @click="onClickTab(4)"
          >
            <CustomerBranchTab
              :imgStatus="imgStatus"
              :readOnly="isReadOnly"
              :customerBranch="customerBranch"
              :wasteClass="4"
              :permissionGroup="permissionTab"
              :tableId="tabInfo.tab4.tableId"
              :popupId="tabInfo.tab4.popupId"
              :dataTable="dataWasteClass4.items"
              :fields="fields"
              :dataSearchTab="dataSearchTab"
              :dataSelectBox="wasteClassification4"
              :pageCount="dataWasteClass4.pageCount"
              :count="dataWasteClass4.count"
              :pageSize="pageSize4"
              @onSearch="onSearch"
              @resetList="resetList"
              @closeSort="closeSort"
              @onSorting="onSorting"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
              @orderByUp="orderByUp"
              @orderByDown="orderByDown"
            />
          </b-tab>
          <b-tab
            :title="imgText.general.fshi0014.municipalWaste"
            v-if="customerBranch.dischargeWasteClass5 === true"
            @click="onClickTab(5)"
          >
            <CustomerBranchTab
              :imgStatus="imgStatus"
              :readOnly="isReadOnly"
              :customerBranch="customerBranch"
              :wasteClass="5"
              :permissionGroup="permissionTab"
              :tableId="tabInfo.tab5.tableId"
              :popupId="tabInfo.tab5.popupId"
              :dataTable="dataWasteClass5.items"
              :fields="fields"
              :dataSearchTab="dataSearchTab"
              :dataSelectBox="wasteClassification5"
              :pageCount="dataWasteClass5.pageCount"
              :count="dataWasteClass5.count"
              :pageSize="pageSize5"
              @onSearch="onSearch"
              @resetList="resetList"
              @closeSort="closeSort"
              @onSorting="onSorting"
              @getCurrentPage="getCurrentPage"
              @getPageSize="getPageSize"
              @orderByUp="orderByUp"
              @orderByDown="orderByDown"
            />
          </b-tab>
        </b-tabs>
      </div>

      <BaseButtonGroupPermission
        :isPopup="isPopup"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        @onAddUpdate="onAddUpdate"
        @onBack="onBack"
      />
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import FormatData from "@/shared/FomatData";
import { CustomerBranch } from "@/models/customerBranch.model";
import moment from "moment";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import BaseTable from "@/components/BaseTable.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import { MasterProperty } from "@/shared/MasterProperty";
import IMText from "@/data/img-text";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BaseMessageError from "@/components/BaseMessageError";
import BaseProcessing from "@/components/BaseProcessing";
import { mapGetters } from "vuex";
import CustomerBranchFormDetail from "../customer-branch-form/customer-branch-form-detail.vue";
import CustomerBranchTab from "../customer-branch-tab/customer-branch-tab.vue";
import HttpStatus from "http-status-codes";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import BaseTableError from "@/components/BaseTableError.vue";
import {
  isNullOrEmpty,
  navigation,
  handleOutput,
  current,
  common,
  canAction
} from "@/shared/utilities";
import CustomerBranchFormDetailReadOnly from "../customer-branch-form/customer-branch-form-detail-readonly.vue";

export default {
  components: {
    BaseMessageError,
    CustomerBranchFormDetail,
    BaseButtonGroupPermission,
    BaseTable,
    BaseProcessing,
    CustomerBranchTab,
    BaseTableError,
    CustomerBranchFormDetailReadOnly
  },
  data() {
    return {
      imgText: IMText,
      title: IMText.title.sshi0006Detail,
      customerBranch: {
        customerCode: current.customer().customerCode,
        branchCode: Number,
        branchNumber: "",
        branchName: "",
        branchKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address: "",
        tel: "",
        industryCode1: "",
        industryCode2: Number,
        jwnetNumber: "",
        ediKey: "",
        dischargeWasteClass1: false,
        dischargeWasteClass2: false,
        dischargeWasteClass3: false,
        dischargeWasteClass4: false,
        dischargeWasteClass5: false,
        memo: "",
        createDate: "",
        lastUpdate: ""
      },
      newCustomerBranch: new CustomerBranch(),
      message: [],
      imgStatus: false,
      isPopup: false,
      openDl: false,
      isReadOnly: true,
      currentCustomer: current.customer(),
      visibleRequired: {
        jwnetNumber: false,
        ediKey: false
      },
      tabInfo: {
        tab1: {
          tableId: "sshi0006-tab1-table",
          popupId: "sshi0006-tab1-popup"
        },
        tab2: {
          tableId: "sshi0006-tab2-table",
          popupId: "sshi0006-tab2-popup"
        },
        tab3: {
          tableId: "sshi0006-tab3-table",
          popupId: "sshi0006-tab3-popup"
        },
        tab4: {
          tableId: "sshi0006-tab4-table",
          popupId: "sshi0006-tab4-popup"
        },
        tab5: {
          tableId: "sshi0006-tab5-table",
          popupId: "sshi0006-tab5-popup"
        }
      },
      permissionTab: lodash.clone(AppConfig.PermissionGroup),
      currentCustomerCode: current.customer().customerCode,
      dataSearchTab: AppConfig.ThreeSelectBox,
      dataSearchTemp: {
        big: "",
        medium: "",
        small: ""
      },
      pageSize1: 10,
      pageSize2: 10,
      pageSize3: 10,
      pageSize4: 10,
      pageSize5: 10,
      pages: AppConfig.Pages,
      dataWasteClassification1: [],
      dataWasteClass: {},
      nextItem: {},
      previousItem: {},
      pageCount: 0,
      count: 0,
      branchCode: 0,
      wasteClass: 0,
      dataPopup1: [],
      dataPopup2: [],
      dataPopup3: [],
      dataPopup4: [],
      dataPopup5: [],
      fieldsError: [
        {
          key: "createDate",
          label: IMText.general.fshi0012.createDate,
          slot: "HEAD_createDate",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDateTime(value);
          }
        },
        {
          key: "notifyText",
          label: IMText.general.fshi0012.notifyText,
          slot: "HEAD_notifyText",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classOneButton"
        }
      ],
      fields: [
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "大分類名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data2",
          slot: "HEAD_data2",
          label: "中分類名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data3",
          slot: "HEAD_data3",
          label: "小分類名",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "data3"
        },
        {
          key: "wasteStandardName",
          slot: "HEAD_wasteStandardName",
          label: "JW排出物名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "wasteName",
          slot: "HEAD_wasteName",
          label: "排出物名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "wasteCode",
          slot: "HEAD_wasteCode",
          label: "分類コード",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "wasteCode"
        },
        {
          key: "displayOrder",
          label: IMText.general.displayOrder,
          tdClass: "classButton"
        },
        {
          key: "memo",
          slot: "HEAD_memo",
          label: IMText.general.memo,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "memo"
        },
        {
          key: "lastUpdate",
          slot: "HEAD_lastUpdate",
          label: IMText.general.lastUpdate,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return FormatData.displayDate(value);
          },
          thClass: "lastUpdate"
        }
      ],
      groupNotification: lodash.cloneDeep(AppConfig.GroupNotification),
      tableErrorId: "sshi0012-table-get-error",
      isChange: {}
    };
  },
  async created() {
    this.openDl = false;
    this.message = [];
    this.visibleRequired.jwnetNumber = isNullOrEmpty(
      this.currentCustomer.jwnetNumber
    );
    this.visibleRequired.ediKey = isNullOrEmpty(this.currentCustomer.ediKey);

    this.branchCode = +this.$route.params.branchCode;
    if (this.branchCode > 0) {
      this.imgStatus = true;
      if (canAction(Action.Update, Screen.SSHI0006)) {
        this.permissionTab.Create = true;
        this.permissionTab.Update = true;
        this.title = this.imgText.title.sshi0006;
        this.isReadOnly = false;
      } else if (canAction(Action.Read, Screen.SSHI0006)) {
        this.title = this.imgText.title.sshi0006Detail;
        this.isReadOnly = true;
        this.permissionTab.Read = true;
        this.fields = this.fields.filter(item => item.key != "displayOrder");
      }
      await this.getCustomerBranch(this.branchCode);
      const wasteDefault = common.getWasteClassFirst(this.customerBranch);
      if (wasteDefault > 0) {
        this.wasteClass = wasteDefault;
        common.resetPage();
        common.resetThreeSelectBox();
        await this.onInitSingleTab(
          this.initParams(this.branchCode, wasteDefault, this.dataSearchTab)
        );
      }
    } else {
      this.imgStatus = false;
      this.isReadOnly = false;
      this.title = this.imgText.title.sshi0005;
    }
    this.groupNotification.Update = true;
  },

  methods: {
    onBack() {
      const isChangeDate = this.$refs[
        "customerBracnhFormDetail"
      ].canDeactivate();
      if (isChangeDate) {
        if (this.showPopupDirtyForm()) {
          navigation.sshi0004();
        }
        return;
      }
      navigation.sshi0004();
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    onClickTab(value) {
      this.$store.dispatch(
        "customerBranchWasteModule/setWasteClassCustomerBranch",
        []
      );
      this.resetFields();
      this.wasteClass = value;
      this.branchCode = +this.$route.params.branchCode;
      AppConfig.Pages.page = 1;
      AppConfig.Pages.pageSize = 10;
      AppConfig.Pages.orderField = "DisplayOrder";
      AppConfig.Pages.descending = true;
      common.resetThreeSelectBox();
      this.dataSearchTab = AppConfig.ThreeSelectBox;
      switch (value) {
        case 1:
          this.pageSize1 = 10;
          this.onInitSingleTab(
            this.initParams(this.branchCode, 1, this.dataSearchTab)
          );
          break;
        case 2:
          this.pageSize2 = 10;
          this.onInitSingleTab(
            this.initParams(this.branchCode, 2, this.dataSearchTab)
          );
          break;
        case 3:
          this.pageSize3 = 10;
          this.onInitSingleTab(
            this.initParams(this.branchCode, 3, this.dataSearchTab)
          );
          break;
        case 4:
          this.pageSize4 = 10;
          this.onInitSingleTab(
            this.initParams(this.branchCode, 4, this.dataSearchTab)
          );
          break;
        case 5:
          this.pageSize5 = 10;
          this.onInitSingleTab(
            this.initParams(this.branchCode, 5, this.dataSearchTab)
          );
          break;

        default:
          break;
      }
    },

    resetFields() {
      this.fields = this.fields.map(item => {
        item.isDesc = true;
        item.isAsc = true;
        return item;
      });
    },

    setPageSize(wasteClass, pageSize) {
      switch (wasteClass) {
        case 1:
          this.pageSize1 = pageSize;
          break;
        case 2:
          this.pageSize2 = pageSize;
          break;
        case 3:
          this.pageSize3 = pageSize;
          break;
        case 4:
          this.pageSize4 = pageSize;
          break;
        case 5:
          this.pageSize5 = pageSize;
          break;
        default:
          break;
      }
    },

    getSizePage(wasteClass) {
      switch (wasteClass) {
        case 1:
          return this.pageSize1;
        case 2:
          return this.pageSize2;
        case 3:
          return this.pageSize3;
        case 4:
          return this.pageSize4;
        case 5:
          return this.pageSize5;
        default:
          return 10;
      }
    },

    initParams(branchCode, wasteClass, dataSearch) {
      let body = {
        customerCode: this.currentCustomerCode,
        branchCode: branchCode,
        wasteClass: wasteClass,
        param: {
          pageSize: this.getSizePage(wasteClass),
          page: AppConfig.Pages.page,
          orderField: AppConfig.Pages.orderField,
          descending: AppConfig.Pages.descending,
          big: dataSearch.big,
          medium: dataSearch.medium,
          small: dataSearch.small
        }
      };
      return body;
    },

    onAddUpdate() {
      this.message = [];
      this.customerBranch = this.$refs["customerBracnhFormDetail"].getData();
      this.newCustomerBranch = { ...this.customerBranch };
      this.onValidate();
      if (!this.message.length) {
        this.onDispath(this.newCustomerBranch);
      }
    },

    onDispath(customerBranch) {
      this.openDl = true;
      if (this.imgStatus === true) {
        this.$store
          .dispatch("customerBranchModule/updateCustomerBranch", customerBranch)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              navigation.sshi0004();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        delete customerBranch.lastUpdate;
        delete customerBranch.createDate;
        this.$store
          .dispatch("customerBranchModule/addCustomerBranch", customerBranch)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.isChange = {};
              this.imgStatus = true;
              this.isReadOnly = false;
              this.permissionTab.Create = true;
              this.permissionTab.Update = true;
              this.customerBranch = {
                ...common.convertNumberToBooleanDischargeWasteClass(
                  response.data
                )
              };
              this.getInitdata(this.customerBranch);
              navigation.sshi0006(this.customerBranch.branchCode);
              this.title = this.imgText.title.sshi0006;
              this.$forceUpdate();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      }
    },

    async onSearchAddress(postalCode) {
      if (!isNullOrEmpty(postalCode)) {
        this.message = [];
        if (!CountCharacter.isPostalCode(postalCode)) {
          this.message.push(Message.E00028.formatText("郵便番号"));
        } else {
          await this.$store.dispatch(
            "addressModule/getByPostalCode",
            postalCode
          );
        }
      }
    },

    onValidate() {
      // Branch Name
      if (isNullOrEmpty(this.customerBranch.branchName)) {
        this.message.push(Message.E00023.formatText("事業場名"));
      } else if (!CountCharacter.isJWZH(this.customerBranch.branchName)) {
        this.message.push(Message.E00028.formatText("事業場名"));
      }

      // Customer Branch Kana
      if (
        !isNullOrEmpty(this.customerBranch.branchKana) &&
        !CountCharacter.isKatakanaHasSpace(this.customerBranch.branchKana)
      ) {
        this.message.push(Message.E00028.formatText("事業者名カナ"));
      }

      // PostalCode
      if (
        !isNullOrEmpty(this.customerBranch.postalCode) &&
        !CountCharacter.isPostalCode(this.customerBranch.postalCode)
      ) {
        this.message.push(Message.E00025.formatText("郵便番号"));
      }

      // Address1
      if (isNullOrEmpty(this.customerBranch.address1)) {
        this.message.push(Message.E00023.formatText("都道府県"));
      } else if (!CountCharacter.isFullSize(this.customerBranch.address1)) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // Address2
      if (isNullOrEmpty(this.customerBranch.address2)) {
        this.message.push(Message.E00023.formatText("市区町村"));
      } else if (!CountCharacter.isFullSize(this.customerBranch.address2)) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // Address3
      if (!isNullOrEmpty(this.customerBranch.address3)) {
        if (!CountCharacter.isFullSize(this.customerBranch.address3)) {
          this.message.push(Message.E00013.formatText("町域"));
        }
      }

      // Address4
      if (
        !isNullOrEmpty(this.customerBranch.address4) &&
        !CountCharacter.isJWZH(this.customerBranch.address4)
      ) {
        this.message.push(Message.E00028.formatText("番地・建物名"));
      }

      // TEL
      if (
        !isNullOrEmpty(this.customerBranch.tel) &&
        !CountCharacter.isTelNumber(this.customerBranch.tel)
      ) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      // Jwnet Number
      if (
        isNullOrEmpty(this.customerBranch.jwnetNumber) &&
        this.visibleRequired.jwnetNumber
      ) {
        this.message.push(Message.E00023.formatText("JWNET加入者番号"));
      } else if (
        !isNullOrEmpty(this.customerBranch.jwnetNumber) &&
        !CountCharacter.isJWH(this.customerBranch.jwnetNumber)
      ) {
        this.message.push(Message.E00028.formatText("JWNET加入者番号"));
      }

      // Edi Key
      if (
        isNullOrEmpty(this.customerBranch.ediKey) &&
        this.visibleRequired.ediKey
      ) {
        this.message.push(Message.E00023.formatText("EDI利用確認キー"));
      } else if (
        !isNullOrEmpty(this.customerBranch.ediKey) &&
        !CountCharacter.isJWH(this.customerBranch.ediKey)
      ) {
        this.message.push(Message.E00028.formatText("EDI利用確認キー"));
      }
    },

    onSearch(data) {
      AppConfig.ThreeSelectBox = { ...data.dataSearch };
      AppConfig.Pages.page = 1;
      AppConfig.Pages.pageSize = 10;
      const param = {
        ...this.initParams(data.branchCode, data.wasteClass, data.dataSearch)
      };
      this.getAll(data.wasteClass, param);
    },

    getAll(wasteClass, param) {
      switch (wasteClass) {
        case 1:
          this.getWasteClass1(param);
          break;
        case 2:
          this.getWasteClass2(param);
          break;
        case 3:
          this.getWasteClass3(param);
          break;
        case 4:
          this.getWasteClass4(param);
          break;
        case 5:
          this.getWasteClass5(param);
          break;
        default:
          break;
      }
    },

    async onInitSingleTab(param) {
      switch (param.wasteClass) {
        case 1:
          await this.getWasteClassifications1(param);
          await this.getWasteClass1(param);
          break;
        case 2:
          await this.getWasteClassifications2(param);
          await this.getWasteClass2(param);
          break;
        case 3:
          await this.getWasteClassifications3(param);
          await this.getWasteClass3(param);
          break;
        case 4:
          await this.getWasteClassifications4(param);
          await this.getWasteClass4(param);
          break;
        case 5:
          await this.getWasteClassifications5(param);
          await this.getWasteClass5(param);
          break;
        default:
          break;
      }
    },

    async getInitdata(param) {
      if (param.dischargeWasteClass1) {
        param.wasteClass = 1;
      } else if (param.dischargeWasteClass2) {
        param.wasteClass = 2;
      } else if (param.dischargeWasteClass3) {
        param.wasteClass = 3;
      } else if (param.dischargeWasteClass4) {
        param.wasteClass = 4;
      } else if (param.dischargeWasteClass5) {
        param.wasteClass = 5;
      }

      this.onInitSingleTab(
        this.initParams(param.branchCode, param.wasteClass, this.dataSearchTab)
      );
    },

    resetList(wasteClass) {
      this.resetFields();
      this.resetListTab(wasteClass);
    },

    onAdd(popupId, wasteClass) {
      this.$bvModal.show(popupId);
    },

    resetListTab(wasteClass) {
      this.dataSearchTab = { ...this.dataSearchTemp };
      this.setPageSize(wasteClass, 10);
      common.resetPage();
      const param = this.getParmas(wasteClass);
      this.onInitSingleTab(param);
    },

    changeWasteClass(wasteClass) {
      this.wasteClass = wasteClass;
      this.resetListTab(wasteClass);
    },

    getParmas(wasteClass) {
      this.branchCode = +this.$route.params.branchCode;
      this.dataSearchTab = AppConfig.ThreeSelectBox;
      const param = {
        ...this.initParams(this.branchCode, wasteClass, this.dataSearchTab)
      };
      return param;
    },

    getCurrentPage(wasteClass) {
      let param = this.getParmas(wasteClass);
      param.param.page = this.pages.page;
      this.getAll(wasteClass, param);
    },

    getPageSize(data, wasteClass) {
      this.setPageSize(wasteClass, data);
      AppConfig.Pages.page = 1;
      let param = this.getParmas(wasteClass);
      this.getAll(wasteClass, param);
    },

    closeSort(data, wasteClass) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "DisplayOrder";
      const param = this.getParmas(wasteClass);
      this.getAll(wasteClass, param);
    },

    onSorting(data, isCheck, wasteClass) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = this.getParmas(wasteClass);
      this.getAll(wasteClass, param);
    },

    orderByUp(data, wasteClass) {
      const result = common.orderDisplayByCode(
        this.dataWasteClass,
        data.item,
        true
      );
      if (data.index === 0) {
        return this.handleOrderBy(data, this.previousItem);
      }
      return this.handleOrderBy(data, result);
    },

    orderByDown(data, wasteClass) {
      const result = common.orderDisplayByCode(
        this.dataWasteClass,
        data.item,
        false
      );
      if (data.index === this.dataWasteClass.length - 1) {
        return this.handleOrderBy(data, this.nextItem);
      }
      return this.handleOrderBy(data, result);
    },

    handleOrderBy(data, object) {
      const result1 = {
        customerCode: this.currentCustomerCode,
        branchCode: this.branchCode,
        wasteClass: this.wasteClass,
        wasteCode: data.item.wasteCode,
        lastUpdate: data.item.lastUpdate
      };

      const result2 = {
        customerCode: this.currentCustomerCode,
        branchCode: this.branchCode,
        wasteClass: this.wasteClass,
        wasteCode: object.wasteCode,
        lastUpdate: object.lastUpdate
      };

      const param = {
        customerBranchWasteRequest1: { ...result1 },
        customerBranchWasteRequest2: { ...result2 }
      };
      return this.updateDisplayOrder(param);
    },

    updateDisplayOrder(param) {
      this.openDl = true;
      this.$store
        .dispatch(
          "customerBranchWasteModule/updateCustomerBranchWasteDisplayOrder",
          param
        )
        .then(res => {
          this.getCurrentPage(this.wasteClass);
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    async getCustomerBranch(branchCode) {
      const params = {
        branchCode: branchCode,
        customerCode: this.currentCustomer.customerCode
      };

      await this.$store
        .dispatch("customerBranchModule/getCustomerBranch", params)
        .then(resp => {
          if (resp) {
            this.customerBranch = this.$store.getters[
              "customerBranchModule/getCustomerBranch"
            ];
          }
        });
    },

    //#region getWasteClass
    async getWasteClass1(param) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClass1",
        param
      );
    },

    async getWasteClass2(param) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClass2",
        param
      );
    },

    async getWasteClass3(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClass3",
        params
      );
    },

    async getWasteClass4(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClass4",
        params
      );
    },

    async getWasteClass5(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClass5",
        params
      );
    },
    //#endregion getWasteClass

    //#region getWasteClassifications
    async getWasteClassifications1(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClassification1",
        params
      );
    },

    async getWasteClassifications2(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClassification2",
        params
      );
    },

    async getWasteClassifications3(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClassification3",
        params
      );
    },

    async getWasteClassifications4(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClassification4",
        params
      );
    },

    async getWasteClassifications5(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getWasteClassification5",
        params
      );
    },
    //#endregion getWasteClassifications

    //#region data popup combobox
    async getCustomerBranchWasteClass1(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteClass1",
        params
      );
    },

    async getCustomerBranchWasteClass2(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteClass2",
        params
      );
    },

    async getCustomerBranchWasteClass3(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteClass3",
        params
      );
    },

    async getCustomerBranchWasteClass4(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteClass4",
        params
      );
    },

    async getCustomerBranchWasteClass5(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteClass5",
        params
      );
    },
    //#endregion getWasteClassifications

    //#region data popup combobox
    async getSelectBoxPopUpList1(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getSelectBoxPopUpList1",
        params
      );
    },

    async getSelectBoxPopUpList2(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getSelectBoxPopUpList2",
        params
      );
    },

    async getSelectBoxPopUpList3(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getSelectBoxPopUpList3",
        params
      );
    },

    async getSelectBoxPopUpList4(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getSelectBoxPopUpList4",
        params
      );
    },

    async getSelectBoxPopUpList5(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getSelectBoxPopUpList5",
        params
      );
    },
    //#endregion getWasteClassifications

    //#region data popup combobox
    async getDataPopupList1(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWaste1",
        params
      );
    },

    async getDataPopupList2(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWaste2",
        params
      );
    },

    async getDataPopupList3(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWaste3",
        params
      );
    },

    async getDataPopupList4(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWaste4",
        params
      );
    },

    async getDataPopupList5(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWaste5",
        params
      );
    },
    //#endregion getWasteClassifications

    onUpdateError(data) {
      const param = {
        notifyId: data.item.notifyId,
        notifyType: data.item.notifyType,
        notifyText: data.item.notifyText
      };
      this.openDl = true;
      this.$store
        .dispatch("notificationModule/updateNotificationsError", param)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            this.$store.dispatch("notificationModule/setDataError", null);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onCancelError(data) {
      this.$emit("onCancelError");
    },

    convertDataWaste(wasteClassData, wasteClass) {
      if (this.wasteClass == wasteClass) {
        this.dataWasteClass = wasteClassData.items;
        this.pageCount = wasteClassData.pageCount;
        this.count = wasteClassData.count;
        this.nextItem = wasteClassData.nextItem;
        this.previousItem = wasteClassData.previousItem;
      }
    }
  },

  computed: {
    ...mapGetters({
      address: "addressModule/getByPostalCode",
      dataWasteClass1: "customerBranchWasteModule/getWasteClass1",
      dataWasteClass2: "customerBranchWasteModule/getWasteClass2",
      dataWasteClass3: "customerBranchWasteModule/getWasteClass3",
      dataWasteClass4: "customerBranchWasteModule/getWasteClass4",
      dataWasteClass5: "customerBranchWasteModule/getWasteClass5",

      wasteClassification1: "customerBranchWasteModule/getWasteClassification1",
      wasteClassification2: "customerBranchWasteModule/getWasteClassification2",
      wasteClassification3: "customerBranchWasteModule/getWasteClassification3",
      wasteClassification4: "customerBranchWasteModule/getWasteClassification4",
      wasteClassification5: "customerBranchWasteModule/getWasteClassification5",

      // dataSelectBoxPopUp1:
      //   "customerBranchWasteModule/getCustomerBranchWasteClass1",
      // dataSelectBoxPopUp2:
      //   "customerBranchWasteModule/getCustomerBranchWasteClass2",
      // dataSelectBoxPopUp3:
      //   "customerBranchWasteModule/getCustomerBranchWasteClass3",
      // dataSelectBoxPopUp4:
      //   "customerBranchWasteModule/getCustomerBranchWasteClass4",
      // dataSelectBoxPopUp5:
      //   "customerBranchWasteModule/getCustomerBranchWasteClass5",

      // dataSelectBoxPopUpList1:
      //   "customerBranchWasteModule/getSelectBoxPopUpList1",
      // dataSelectBoxPopUpList2:
      //   "customerBranchWasteModule/getSelectBoxPopUpList2",
      // dataSelectBoxPopUpList3:
      //   "customerBranchWasteModule/getSelectBoxPopUpList3",
      // dataSelectBoxPopUpList4:
      //   "customerBranchWasteModule/getSelectBoxPopUpList4",
      // dataSelectBoxPopUpList5:
      //   "customerBranchWasteModule/getSelectBoxPopUpList5",

      // dataPopupListTab1: "customerBranchWasteModule/getCustomerBranchWaste1",
      // dataPopupListTab2: "customerBranchWasteModule/getCustomerBranchWaste2",
      // dataPopupListTab3: "customerBranchWasteModule/getCustomerBranchWaste3",
      // dataPopupListTab4: "customerBranchWasteModule/getCustomerBranchWaste4",
      // dataPopupListTab5: "customerBranchWasteModule/getCustomerBranchWaste5",
      dataError: "notificationModule/setDataError"
    })
  },

  watch: {
    address() {
      if (!this.address) {
        this.message.push(Message.E00029);
      } else {
        this.message = [];
        this.customerBranch.address1 = this.address.address1;
        this.customerBranch.address2 = this.address.address2;
        this.customerBranch.address3 = this.address.address3;
        this.customerBranch.address4 = this.address.address4;
      }
    },

    dataWasteClass1() {
      this.convertDataWaste(this.dataWasteClass1, 1);
    },

    dataWasteClass2() {
      this.convertDataWaste(this.dataWasteClass2, 2);
    },

    dataWasteClass3() {
      this.convertDataWaste(this.dataWasteClass3, 3);
    },

    dataWasteClass4() {
      this.convertDataWaste(this.dataWasteClass4, 4);
    },

    dataWasteClass5() {
      this.convertDataWaste(this.dataWasteClass5, 5);
    }
  },

  beforeDestroy() {
    this.$store.dispatch(
      "customerBranchWasteModule/setWasteClassCustomerBranch",
      []
    );
  }
};
</script>
