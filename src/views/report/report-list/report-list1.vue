<template>
  <div>
    <b-card :class="classByWaste" header="抽出範囲">
      <table class="table table-sm">
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.rangeSpecification}}
          </td>
          <td colspan="10" class="fix-height">
            <b-input-group size="sm" v-on:change="onChange($event)">
              <b-form-radio
                v-model="selected"
                name="all-radios"
                value="all"
                :disabled="!stateRadioButton.all"
              >{{imgText.general.fshi0014.all}}</b-form-radio>
              <b-form-radio
                v-model="selected"
                name="group-radios"
                value="group"
                :disabled="!stateRadioButton.group"
              >{{imgText.general.fshi0014.apecifiedGroup}}</b-form-radio>
              <b-form-radio
                v-model="selected"
                name="branch-radios"
                value="branch"
                :disabled="!stateRadioButton.branch"
              >{{imgText.general.fshi0014.designatedOffice}}</b-form-radio>
            </b-input-group>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.groupOffice}}
          </td>
          <td colspan="10" class="fix-height">
            {{data.data2}}
            <div class="float-right">
              <b-button
                class="btn-form"
                size="sm"
                :disabled="stateButton.isDisableAll"
                @click="ShowPopup()"
              >{{imgText.general.btnChoice}}</b-button>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.deliveryDate}}
          </td>
          <td colspan="10">
            <b-row>
              <b-col md="2">
                <b-input-group style="width: 256px">
                  <b-form-input
                    type="date"
                    v-model="item.data1"
                  ></b-form-input>
                </b-input-group>
              </b-col>
              <b-col md="1" class="custom-tilde">~</b-col>
              <b-col md="2">
                <b-input-group style="width: 256px">
                  <b-form-input type="date"
                   v-model="item.data2"
                   ></b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="titleColumn">
            <span class="asterisk"></span>
            {{imgText.general.fshi0014.other}}
          </td>
          <td colspan="10" class="fix-height">
            <b-form-checkbox id="checkbox-1" v-model="status">{{imgText.general.fshi0014.item7}}</b-form-checkbox>
          </td>
        </tr>
      </table>
    </b-card>
    <ReportBranchPopup
      :popupId="branchPopupId"
      :condition="conditionBranch"
      @onSendDataBranch="onSendDataBranch"
    />
    <ReportGroupPopup
      :popupId="groupPopupId"
      :condition="conditionGroup"
      @onSendDataGroup="onSendDataGroup"
    />
    
  </div>
</template>
<script>
import IMText from "@/data/img-text";
import ReportBranchPopup from "../report-popup/report-branch";
import ReportGroupPopup from "../report-popup/report-group";

import { mapGetters } from "vuex";
import AppConfig from "@/constants/AppConfig";
import { current, common, isNullOrUndefined } from "@/shared/utilities";
export default {
  props: ["classByWaste", "conditionDate"],
  components: {
    ReportBranchPopup,
    ReportGroupPopup
  },
  data() {
    return {
      branchPopupId: "sshi0036-branch-popup",
      groupPopupId: "sshi0036-group-popup",
      imgText: IMText,
      customerCode: current.customer().customerCode,
      selected: "",
      status: false,
      data: {
        data1: "abc1",
        data2: "",
        data3: "abc3",
        data4: "abc4",
        data5: "abc5",
        data6: "abc6",
        data7: "abc7"
      },

      item: {
        data1: "",
        data2: ""
      },

      conditionBranch: {
        branchName: "",
        branchKana: ""
      },

      conditionGroup: {
        branchName: "",
        branchKana: ""
      },

      stateRadioButton: {
        all: true,
        group: true,
        branch: true
      },

      stateButton: {
        isDisableAll: false,
        isDisableGroup: false,
        isDisableBranch: false
      },

      stateChecked: {
        all: false,
        group: false,
        branch: false
      },

      displayDateFrom: null,
      displayDateTo: null,

      isSearch: false,
      currentCustomerCode: current.customer().customerCode,
      currentUser: current.user(),
      permission: current.permission(),
      groupName: "",
      branchName: ""
    };
  },

  async created(currentCustomerCode) {
    this.loadPopupUp1(this.currentCustomerCode);
    this.loadPopupUp2(this.currentCustomerCode);
    if(this.permission === "GroupManager") {
      await this.loadGroup();
    }
    if(this.permission === "BranchManager") {
      await this.loadBranch();
    }
    
    this.setStateRadio();
  },

  methods: {
    ShowPopup() {
      if (this.selected === "group") {
        common.resetPage();
        this.conditionGroup = {
          branchName: "",
          branchKana: ""
        };
        this.$bvModal.show(this.groupPopupId);
      }

      if (this.selected === "branch") {
        common.resetPage();
        this.conditionBranch = {
          branchName: "",
          branchKana: ""
        };
        
        this.$bvModal.show(this.branchPopupId);
      }
    },

    setStateRadio() {
      if (
        isNullOrUndefined(this.currentUser.branchCode) &&
        isNullOrUndefined(this.currentUser.groupCode)
      ) {
        this.selected = "all";
        this.stateButton.isDisableAll = true;
      } else if (!isNullOrUndefined(this.currentUser.branchCode)) {
        (this.selected = "branch"),
          (this.stateRadioButton.all = false),
          (this.stateRadioButton.group = false),
          (this.stateButton.isDisableBranch = false);
          this.setStateBranchRole(this.selected);
      } else if (!isNullOrUndefined(this.currentUser.groupCode)) {
        this.selected = "group";
        this.stateRadioButton.all = false;
        this.setStateGroupRole(this.selected);
      }
    },

    onChange($event) {
      this.setstateButton($event.target.value);
    },

    setstateButton($event) {
      if(this.permission === "GroupManager") {
        this.setStateGroupRole($event);
        return;
      }
      if(this.permission === "BranchManager") {
        this.setStateBranchRole($event);
        return;
      }
      this.data.data2 = "";
      if ($event === "all") {
        this.stateButton.isDisableAll = true;
        this.$emit("checkBranch", false);
        return;
      }

      if ($event === "branch") {
        this.stateButton.isDisableAll = false;
        this.$emit("checkBranch", true);
        return;
      }
      this.$emit("checkBranch", false);
      this.stateButton.isDisableAll = false;
    },

    setStateGroupRole($event) {
      if(this.permission !== "GroupManager") { 
        return;
      }
      if ($event === "branch") {
        this.stateButton.isDisableAll = false;
        this.data.data2 = "";
        this.$emit("checkBranch", true);
        return;
      }
      
      this.data.data2 = this.groupName;
      this.$emit("checkBranch", false);
      this.stateButton.isDisableAll = true;
    },

    setStateBranchRole($event) {
      if(this.permission !== "BranchManager") { 
        return;
      }
      if ($event === "branch") {
        this.stateButton.isDisableAll = true;
        this.data.data2 = this.branchName;
        this.$emit("checkBranch", true);
        return;
      }
    },
    async loadGroup() {
      const param = {
        customerCode: this.currentCustomerCode,
      }
      await this.$store
        .dispatch("customerGroupModule/getAllCustomerGroup", param)
        .then(res => {
          if (res.data.items.length > 0) {
            this.groupName = res.data.items[0].groupName;
          }
        });
    },

    async loadBranch() {
      const param = {
        customerCode: this.currentCustomerCode,
      }
      await this.$store
        .dispatch("customerBranchModule/getCustomerBranchOption", param)
        .then(res => {
          if (res.data.items.length > 0) {
            this.branchName = res.data.items[0].branchName;
          }
        });
    },

    loadPopupUp1(customerCode) {
      this.message = [];
      this.openDl = true;
      this.$store
        .dispatch("customerBranchModule/getCustomerBranchs", customerCode)
        .then(res => {
          if (res.data.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        });
    },

    loadPopupUp2(customerCode) {
      this.message = [];
      this.openDl = true;
      this.$store
        .dispatch("customerGroupModule/getCustomerGroup", customerCode)
        .then(res => {
          if (res.data.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        });
    },

    onSendDataBranch(data) {
      this.data.data2 = data.branchName;
    },

    onSendDataGroup(data) {
      this.data.data2 = data.groupName;
    },

    formatDate(value) {
      return moment(value).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },
    getDataList1() {
      return this.item;
    }
  },

  computed: {},

  watch: {
    // conditionDate() {
    //   this.displayDateFrom = this.formatDate(this.conditionDate.dateFrom);
    //   this.displayDateTo = this.formatDate(this.conditionDate.dateTo);
    // },
    // displayDateFrom() {
    //   this.conditionDate.dateFrom = this.displayDateFrom;
    // },
    // displayDateTo() {
    //   this.conditionDate.dateTo = this.displayDateTo;
    // }
  }
};
</script>
<style>
.custom-tilde {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -30px;
}
</style>
