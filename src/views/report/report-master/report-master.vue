<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message"/>
      <ReportList1 ref="getDataList" :classByWaste="classByWaste" @checkBranch="checkBranch"></ReportList1>
      <ReportList2
        @onCreate="onCreate"
        :classByWaste="classByWaste"
        :customerCode="customerCode"
        :wasteClass="wasteClass"
        :isDisableOnCreate="isDisableOnCreate"
        :isCheckBranch ="isCheckBranch"
        :isReadOnly = "isReadOnly"
      ></ReportList2>
      <ReportTab
        :items="reportData"
        :permissionGroup="permissionGroup"
        :pageCount="pageCount"
        :pageSize="pageSize"
        :count="count"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
      ></ReportTab>

      <b-row class="justify-content-md-center bottom">
        <BaseButtonGroupWasteClass
          :buttonWasteClass="buttons"
          @onClickButtonToggle="onClickButtonToggle"
        />
      </b-row>

    </b-container>
    <BaseProcessing :openDl="openDl"/>
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import BaseMessageError from "@/components/BaseMessageError";
import ReportList1 from "../report-list/report-list1";
import ReportList2 from "../report-list/report-list2";
import ReportTab from "../report-tab/report-tab";
import Footer from "../report-tab/footer";
import IMText from "@/data/img-text";
import { Message } from "@/constants/Message";
import { handleOutput, canAction } from "@/shared/utilities";
import BaseButtonGroupWasteClass from "@/components/BaseButtonGroupWasteClass";
import { current, navigation, permission, common } from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";

import { mapGetters } from "vuex";
import { WasteClass } from "@/constants/General";
import * as lodash from "lodash";
import { Screen, Action } from "@/constants/Screen";
import CountCharacter from "@/shared/CountCharacter";
import HttpStatus from "http-status-codes";
import BaseProcessing from "@/components/BaseProcessing";
import { Permissions } from '@/constants/Permissions';
export default {
  components: {
    BaseMessageError,
    ReportList1,
    ReportList2,
    ReportTab,
    Footer,
    BaseButtonGroupWasteClass,
    BaseProcessing
  },
  data() {
    return {
      imText: IMText,
      title: IMText.title.sshi0036Title,
      message: [],
      buttons: [],
      currentWasteClass: 1,
      classByWaste: "b-card-header",
      wasteClasses: WasteClass,
      pages: AppConfig.Pages,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      reportData: [],
      customerCode: current.customer().customerCode,
      currentCustomer: current.customer(),
      wasteClass: 1,
      fileName: "",
      condition: {
        dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        dateTo: new Date()
      },
      search: {
        branchNumber: "",
        branchName: "",
        branchKana: "",
        address: "",
        tel: ""
      },
      isSearch: false,
      dischargeWasteApi: [],
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      isReadOnly: false,
      isDisableOnCreate: false,
      openDl: false,
      isCheckBranch: false
    };
  },

  async created() {
    const param = { ...this.initParams() };
    this.getAll(param);
    const permission = current.permission();

    if (canAction(Action.Update, Screen.SSHI0036)) {
      this.permissionGroup.Update = true;
      this.isReadOnly = false;
    }
    if(permission === Permissions.CustomerViewer || permission === Permissions.GroupViewer || permission === Permissions.BranchViewer) { 
        this.isReadOnly = true;
    }

    this.initButton();
  },
  methods: {
    onClickButtonToggle(btn) {
      this.buttons = this.buttons.map(b => {
        if (b !== btn) {
          b.state = false;
        } else {
          this.currentWasteClass = b.key;
          current.setWasteClass(b.key);
          this.wasteClass = b.key;
        }
        return b;
      });
      this.classByWaste =
        common.setWasteColor(this.currentWasteClass) + " b-card-header";
       const param = { ...this.initParams() };
       param.wasteClass = this.currentWasteClass;
      this.getAll(param);
    },

    initParams() {
      const param = {
        customerCode: this.customerCode,
        wasteClass: this.wasteClass,
        page: AppConfig.Pages.page,
        pageSize: this.pageSize,
        descending: AppConfig.Pages.descending,
        orderField: AppConfig.Pages.orderByCreateDate
      };
      return param;
    },

    getAll(param) {
      this.message = [];
      this.openDl = true;
      this.$store
        .dispatch("reportModule/getReport", param)
        .then(res => {
          if (res.data.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    async getDischargeWasteClassByBranch(customerCode, branchCode) {
      this.openDl = true;
      await this.$store
        .dispatch("customerBranchModule/getDischargeWasteClassByBranch", {
          customerCode,
          branchCode
        })
        .finally(() => {
          this.openDl = false;
        });
    },
    onCreate(conditionCreate, dataGroupKey) {
      this.message = [];

      let dateTime = this.$refs["getDataList"].getDataList1();
      var user = JSON.parse(localStorage.getItem("user"));

      let data = { ...conditionCreate };
      data.customerCode = this.customerCode;
      data.branchCode = user.branchCode != null ? user.branchCode : 0;
      data.groupCode = user.groupCode != null ? user.groupCode : 0;
      data.wasteClass =
        this.currentWasteClass == null ? 1 : this.currentWasteClass;
      data.deliveryDateFrom = dateTime.data1;
      data.deliveryDateTo = dateTime.data2;
      data.aggregateFlag = conditionCreate.aggregateFlag ? 0 : 1;
      //move funtion onValidate
      this.onValidateReport(conditionCreate, dateTime);
      if (!this.message.length) {
      this.openDl = true;
      this.$store
        .dispatch("reportModule/createReport", data)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            const param = { ...this.initParams() };
            this.getAll(param);
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
          this.isDisableOnCreate = true;
        }).finally(() => {
          this.openDl = false;
        });
      }
    },

    onValidateReport(conditionCreate, dateTime) {
      if (
        new Date(dateTime.data1).getTime() > new Date(dateTime.data2).getTime()
      ) {
        this.message.push("引渡し日は不正です");
      }

      if (dateTime.data1 == "") {
        this.message.push("引渡し日を入力してください");
      }
      
      if (this.checkDuplicateGroup(conditionCreate)) {
        this.message.push("グループ条件が重複される");
      }
    },

    checkDuplicateGroup(conditionCreate) {
      const dataGroupKey = {
        groupKey1: conditionCreate.groupKey1,
        groupKey2: conditionCreate.groupKey2,
        groupKey3: conditionCreate.groupKey3,
        groupKey4: conditionCreate.groupKey4,
        groupKey5: conditionCreate.groupKey5,
        groupKey6: conditionCreate.groupKey6,
        groupKey7: conditionCreate.groupKey7
      };
      let keys = Object.keys(dataGroupKey);
      for (var i = 0; i < keys.length; i++) {
        for (var j = i + 1; j < keys.length; j++) {
          if ((dataGroupKey[keys[i]] !== '' && dataGroupKey[keys[j]] !== '') && dataGroupKey[keys[i]] === dataGroupKey[keys[j]]) {
            return true;
          }
        }
      }
      return false;
    },

    getCurrentPage() {
      let param = { ...this.initParams() };
      param.page = this.pages.page;
      this.getAll(param);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderByCreateDate = "CreateDate";
      const param = { ...this.initParams() };
      this.getAll(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderByCreateDate = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getAll(param);
    },

    async initButton() {
      var user = JSON.parse(localStorage.getItem("user"));
      user.branchCode = user.branchCode != null ? user.branchCode : 0;
      await this.getDischargeWasteClassByBranch(
        this.currentCustomer.customerCode,
        user.branchCode
      );
      this.currentWasteClass = current.wasteClass() ? current.wasteClass() : 1;

      let listButtons = common.getButtonDischargeWasteClass(
        this.wasteClasses,
        this.dischargeWaste
      );

      this.buttons = common.mappingWasteClassToListButton(
        listButtons,
        this.currentWasteClass
      );
      this.classByWaste =
        common.setWasteColor(this.currentWasteClass) + " b-card-header";
    },

    checkBranch(data) {
      this.isCheckBranch = data;
    }
  },

  computed: {
    ...mapGetters({
      data: "reportModule/getReport",
      dischargeWaste: "customerBranchModule/getDischargeWasteClassByBranch"
    })
  },
  watch: {
    data() {
      this.reportData = this.data.result.items;
      this.pageCount = this.data.result.pageCount;
      this.count = this.data.result.count;
    }
  }
};
</script>
    
<style>
.b-card-header .card-header {
  padding: 0.5em;
  font-weight: bold;
}
.b-card-header .card-body {
  padding: 0px;
}
.b-card-header table {
  margin-bottom: 0px;
}
.b-card-header .fix-height {
  height: 40px;
}
.b-card-header .form-control {
  height: 31px !important;
  padding: 0px 0.75rem !important;
}
.b-card-header .custom-radio {
  margin-right: 30px;
}
</style>
