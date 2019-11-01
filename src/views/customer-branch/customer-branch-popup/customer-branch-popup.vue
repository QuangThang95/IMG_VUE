<template>
  <div>
    <b-modal
      size="huge"
      :class="popupClass"
      :id="popupId"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
    >
      <template slot="default">
        <BaseMessageError :title="title" :message="message" />
        <div class="fix-padding">
          <b-row class="fix-margin">
            <b-col cols="10">
              <b-row>
                <b-col cols="2">
                  <span>排出事業場</span>
                </b-col>
                <b-col cols="4">
                  <b-input-group size="sm">
                    <b-form-input :disabled="true" v-model="customerBranch.branchName"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="10">
              <b-row>
                <b-col cols="2">
                  <span>排出物区分</span>
                </b-col>
                <b-col cols="4">
                  <b-input-group size="sm">
                    <b-form-input :disabled="true" v-model="wasteClassTitle"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="6">
                  <BaseSelectBox
                    :params="params"
                    @onSearch="onSearchPopup"
                    :dataSelectBox="dataSelectBoxPopUp"
                  />
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="2">
              <div class="float-right">
                <b-button class="btn-form ml-2" size="sm" @click="unCheckAll">全解除</b-button>
                <b-button class="btn-form ml-2" size="sm" @click="checkAll">全選択</b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div>
                <b-table-simple
                  class="table-popup table b-table table-striped table-bordered table-sm border"
                  sticky-header="300px"
                >
                  <b-thead>
                    <b-tr>
                      <b-th colspan="1" class="table-label">大分類名</b-th>
                      <b-th colspan="1" class="table-label">中分類名</b-th>
                      <b-th colspan="1" class="table-label">小分類名</b-th>
                      <b-th colspan="1" class="table-label">JW排出物名</b-th>
                      <b-th colspan="1" class="table-input">排出物名</b-th>
                      <b-th colspan="4" class="table-column">
                        分類コード
                        <div>
                          <b-row>
                            <b-col cols="3">大</b-col>
                            <b-col cols="3">中</b-col>
                            <b-col cols="3">小</b-col>
                            <b-col cols="3">細</b-col>
                          </b-row>
                        </div>
                      </b-th>
                      <b-th colspan="1" class="table-input">立未換算係数</b-th>
                      <b-th colspan="1" class="table-input">個・台換算係数</b-th>
                      <b-th colspan="3" class="table-input">備考</b-th>
                      <b-th colspan="1" class="table-checkbox">選択</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody v-if="openDl">
                    <b-tr>
                      <b-td colspan="15" class="text-center">
                        処理中
                        <br />
                        <b-spinner
                          id="spinner-processing"
                          variant="secondary"
                          label="processing"
                          style="width: 2rem; height: 2rem;"
                        ></b-spinner>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else>
                    <b-tr v-for="item in dataPopup" :key="item.rowIndex">
                      <b-td colspan="1">
                        <p>{{item.data1}}</p>
                      </b-td>
                      <b-td colspan="1">
                        <p>{{item.data2}}</p>
                      </b-td>
                      <b-td colspan="1">
                        <p>{{item.data3}}</p>
                      </b-td>
                      <b-td colspan="1">
                        <p>{{item.wasteStandardName}}</p>
                      </b-td>
                      <b-td colspan="1">
                        <div v-if="item.defineType">
                          <b-form-input
                            v-model.trim="item.wasteName"
                            :state="item.stateWasteName"
                            class="fix-width-select"
                          ></b-form-input>
                        </div>
                        <div v-else>
                          <p>{{item.wasteName}}</p>
                        </div>
                      </b-td>
                      <b-td colspan="4">
                        <div>
                          <b-row>
                            <b-col cols="3">
                              <p>{{item.wasteCode1}}</p>
                            </b-col>
                            <b-col cols="3">
                              <p>{{item.wasteCode2}}</p>
                            </b-col>
                            <b-col cols="3">
                              <p>{{item.wasteCode3}}</p>
                            </b-col>
                            <b-col cols="3">
                              <p>{{item.wasteCode4}}</p>
                            </b-col>
                          </b-row>
                        </div>
                      </b-td>
                      <b-td colspan="1">
                        <div v-if="item.defineType">
                          <b-form-input
                            v-model.trim="item.m3Coef"
                            :state="item.stateM3Coef"
                            class="fix-width-select"
                          ></b-form-input>
                        </div>
                        <div v-else>
                          <p>{{item.m3Coef}}</p>
                        </div>
                      </b-td>
                      <b-td colspan="1">
                        <div v-if="item.defineType">
                          <b-form-input
                            v-model.trim="item.countCoef"
                            :state="item.stateCountCoef"
                            class="fix-width-select"
                          ></b-form-input>
                        </div>
                        <div v-else>
                          <p>{{item.countCoef}}</p>
                        </div>
                      </b-td>
                      <b-td colspan="3">
                        <div v-if="item.defineType">
                          <b-form-input v-model.trim="item.memo" class="fix-width-select"></b-form-input>
                        </div>
                        <div v-else>
                          <p>{{item.memo}}</p>
                        </div>
                      </b-td>
                      <b-td colspan="1">
                        <b-form-checkbox
                          class="checkbox classOneButton"
                          v-model="item.defineType"
                          :disabled="item.belongToContract"
                          @change="changeItem(item)"
                        ></b-form-checkbox>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </div>
            </b-col>
          </b-row>
          <div class="grid-screen">
            <b-tabs content-class="mt-3">
              <b-tab disabled></b-tab>
              <b-tab title="細分類追加" active>
                <div>
                  <table class="table-popup">
                    <tr>
                      <td colspan="1" class="table-label">大分類名</td>
                      <td colspan="1" class="table-label">中分類名</td>
                      <td colspan="1" class="table-label">小分類名</td>
                      <td colspan="4" class="table-column">
                        <div>
                          <b-row>
                            <b-col cols="3">大</b-col>
                            <b-col cols="3">中</b-col>
                            <b-col cols="3">小</b-col>
                            <b-col cols="3">細</b-col>
                          </b-row>
                        </div>
                      </td>
                      <td colspan="1">排出物名</td>
                      <td colspan="1">立未換算係数</td>
                      <td colspan="1">個・台換算係数</td>
                      <td colspan="1">備考</td>
                    </tr>
                    <tr v-if="openDl">
                      <td colspan="11" class="text-center">
                        処理中
                        <br />
                        <b-spinner
                          id="spinner-processing"
                          variant="secondary"
                          label="processing"
                          style="width: 2rem; height: 2rem;"
                        ></b-spinner>
                      </td>
                    </tr>
                    <tr v-else v-for="item in dataList" :key="item.rowIndex">
                      <td colspan="1">
                        <b-form-select
                          cols="2"
                          v-model="item.big"
                          :options="item.bigOption"
                          class="fix-width-select"
                          @change="changeBig(item.id, item.big)"
                        ></b-form-select>
                      </td>
                      <td colspan="1">
                        <b-form-select
                          cols="2"
                          v-model="item.medium"
                          :options="item.mediumOption"
                          :disabled="item.disabledMedium"
                          class="fix-width-select"
                          @change="changeMedium(item.id, item.medium)"
                        ></b-form-select>
                      </td>
                      <td colspan="1">
                        <b-form-select
                          cols="2"
                          v-model="item.small"
                          :options="item.smallOption"
                          class="fix-width-select"
                          :disabled="item.disabledSmall"
                          @change="changeSmall(item.id, item.small)"
                        ></b-form-select>
                      </td>
                      <td colspan="4">
                        <div>
                          <b-row>
                            <b-col cols="3">{{item.wasteCode1}}</b-col>
                            <b-col cols="3">{{item.wasteCode2}}</b-col>
                            <b-col cols="3">{{item.wasteCode3}}</b-col>
                            <b-col cols="3">
                              <b-form-input
                                class="fix-padding-input"
                                v-model.trim="item.wasteCode4"
                                :maxlength="3"
                                :state="item.stateWasteCode4"
                                :disabled="item.disabled"
                              ></b-form-input>
                            </b-col>
                          </b-row>
                        </div>
                      </td>
                      <td colspan="1">
                        <b-form-input
                          class="fix-width-select"
                          v-model.trim="item.wasteName"
                          :state="item.stateWasteName"
                          :disabled="item.disabled"
                        ></b-form-input>
                      </td>
                      <td colspan="1">
                        <b-form-input
                          class="fix-width-select"
                          v-model.trim="item.m3Coef"
                          :maxlength="4"
                          :state="item.stateM3Coef"
                          :disabled="item.disabled"
                        ></b-form-input>
                      </td>
                      <td colspan="1">
                        <b-form-input
                          class="fix-width-select"
                          v-model.trim="item.countCoef"
                          :maxlength="5"
                          :state="item.stateCountCoef"
                          :disabled="item.disabled"
                        ></b-form-input>
                      </td>
                      <td colspan="1">
                        <b-form-input
                          class="fix-width-select"
                          v-model.trim="item.memo"
                          :disabled="item.disabled"
                        ></b-form-input>
                      </td>
                    </tr>
                  </table>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
        <BaseButtonGroup
          :isPopup="isPopup"
          :imgStatus="imgStatus"
          @onAddUpdate="onAddUpdate"
          @onBack="onBack"
        />
      </template>
    </b-modal>
    <!-- <BaseProcessing :openDl="openDl" /> -->
  </div>
</template>

<script>
import BaseButtonGroup from "@/components/BaseButtonGroup";
import BaseMessageError from "@/components/BaseMessageError";
import BaseProcessing from "@/components/BaseProcessing";
import IMText from "@/data/img-text";
import BaseSelectBox from "@/components/BaseSelectBox.vue";
import HttpStatus from "http-status-codes";
import moment from "moment";
import CountCharacter from "@/shared/CountCharacter";
import * as lodash from "lodash";
import {
  isNullOrEmpty,
  common,
  handleOutput,
  isNullOrUndefined
} from "@/shared/utilities";
import { Message } from "@/constants/Message";
import { mapGetters } from "vuex";

export default {
  props: ["imgStatus", "popupId", "customerBranch", "wasteClass", "show"],
  components: {
    BaseMessageError,
    BaseButtonGroup,
    BaseSelectBox,
    BaseProcessing
  },
  data() {
    return {
      imgText: IMText,
      isPopup: true,
      popupClass: "sshi0002-popup",
      message: [],
      title: IMText.title.sshi0006Popup,
      wasteClassTitle: "",
      params: {},
      dataList: [],
      isShow: false,
      name: "",
      countMsg: {
        wasteNameEmpty: 0,
        isJWZHWasteName: 0,
        precisionM3Coef: 0,
        precisionCountCoef: 0,
        smallEmpty: 0,
        wasteCode4Empty: 0,
        wasteCode4Number: 0
      },
      dataPopup: [],
      dataSearch: {
        big: "",
        medium: "",
        small: ""
      },
      dataSelectBoxPopUps: [],
      dataPopupTemp: [],
      openDl: false
    };
  },

  async created() {
    this.params = {
      branchCode: this.customerBranch.branchCode,
      customerCode: this.customerBranch.customerCode,
      wasteClass: this.wasteClass
    };
  },

  methods: {
    async resetDataPopup() {
      const param = this.initParams(
        this.customerBranch.branchCode,
        this.wasteClass,
        this.dataSearch
      );
      await this.getDataPopupList(param);
      await this.getCustomerBranchWasteClass(param);
      this.dataSelectBoxPopUps = this.$store.state.customerBranchWasteModule.customerBranchWasteClass1;
      this.dataPopupTemp = this.$store.state.customerBranchWasteModule.customerBranchWastes1;
    },

    loadDataList() {
      this.dataList = [];
      for (let index = 0; index < 5; index++) {
        this.dataList.push({
          id: index,
          data1: "",
          data2: "",
          data3: "",
          wasteStandardName: "",
          wasteName: "",
          wasteCode1: "",
          wasteCode2: "",
          wasteCode3: "",
          wasteCode4: "",
          m3Coef: "",
          countCoef: "",
          wasteCode: 0,
          memo: "",
          defineType: false,
          big: "",
          medium: "",
          small: "",
          bigOption: [],
          mediumOption: [{ value: "", text: "すべて" }],
          smallOption: [{ value: "", text: "すべて" }],
          disabledMedium: true,
          disabledSmall: true,
          disabled: true
        });
      }
    },

    onAddUpdate() {
      this.message = [];
      let dataPopupAdd = this.dataPopup.filter(x => x.defineType == true);
      let dataListAdd = this.dataList.filter(
        x =>
          x.big != "" ||
          x.wasteCode4 != "" ||
          x.m3Coef != "" ||
          x.countCoef != "" ||
          x.memo != ""
      );
      this.onValidate(dataPopupAdd, dataListAdd);
      if (!this.message.length) {
        const data = lodash.cloneDeep([...dataPopupAdd, ...dataListAdd]);
        data.branchCode = this.customerBranch.branchCode;
        data.customerCode = this.customerBranch.customerCode;
        data.wasteClass = this.wasteClass;
        for (var item of data) {
          item.branchCode = this.customerBranch.branchCode;
          item.customerCode = this.customerBranch.customerCode;
          item.wasteClass = this.wasteClass;
          item.wasteCode = Number(
            item.wasteCode1 +
              item.wasteCode2 +
              item.wasteCode3 +
              item.wasteCode4
          );
          item.wasteCode1 = Number(item.wasteCode1);
          item.wasteCode2 = Number(item.wasteCode2);
          item.wasteCode3 = Number(item.wasteCode3);
          item.wasteCode4 = Number(item.wasteCode4);
          item.m3Coef = Number(item.m3Coef);
          item.countCoef = Number(item.countCoef);
          if (!isNullOrUndefined(item.bigOption)) {
            delete item.bigOption;
          }
          if (!isNullOrUndefined(item.mediumOption)) {
            delete item.mediumOption;
          }
          if (!isNullOrUndefined(item.smallOption)) {
            delete item.smallOption;
          }
          if (item.wasteStandardName == "") {
            if (item.data3 != "") {
              item.wasteStandardName = item.data3;
            } else if (item.data2 != "") {
              item.wasteStandardName = item.data2;
            } else {
              item.wasteStandardName = item.data1;
            }
          }
        }

        this.$store
          .dispatch("customerBranchWasteModule/addCustomerBranchWaste", data)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$emit("resetList", this.wasteClass);
              this.onBack();
              this.dataList = [];
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      }
    },
    onBack() {
      this.isShow = false;
      this.$bvModal.hide(this.popupId);
    },

    getWasteClassTitle(wasteClass) {
      switch (wasteClass) {
        case 1:
          this.wasteClassTitle = IMText.general.wasteClass1;
          break;
        case 2:
          this.wasteClassTitle = IMText.general.wasteClass2;
          break;
        case 3:
          this.wasteClassTitle = IMText.general.wasteClass3;
          break;
        case 4:
          this.wasteClassTitle = IMText.general.wasteClass4;
          break;
        case 5:
          this.wasteClassTitle = IMText.general.wasteClass5;
          break;
        default:
          break;
      }
    },

    async onSearchPopup(data) {
      const param = {
        ...this.initParams(data.branchCode, data.wasteClass, data.dataSearch)
      };

      await this.getDataPopupList(param);
      this.dataPopupTemp = this.$store.state.customerBranchWasteModule.customerBranchWastes1;
    },

    unCheckAll() {
      let items = this.dataPopup.filter(x => x.defineType == true);
      items.forEach(element => {
        element.defineType = false;
      });
    },
    checkAll() {
      let items = this.dataPopup.filter(x => x.defineType == false);
      items.forEach(element => {
        this.changeItem(element);
        element.defineType = true;
      });
    },

    checkShowHideSelectBox() {
      this.message = [];
      if (this.dataSelectBoxPopUpList.length > 0) {
        for (var index of this.dataList) {
          index.bigOption = [...this.dataSelectBoxPopUpList];
          index.bigOption.unshift({ value: "", text: "すべて" });
          index.big = "";
        }
      }
    },

    changeBig(id, value) {
      let item = this.dataList[id];
      item.medium = "";
      item.small = "";
      item.disabled = true;
      if (item.big !== "") {
        item.disabledMedium = false;
        item.disabledSmall = true;
        item.mediumOption = [
          ...item.bigOption.find(x => x.value === item.big).listMedium
        ];
        item.wasteCode1 = item.big;
        item.data1 = item.bigOption.find(x => x.value === item.big).text;
        item.mediumOption.unshift({ value: "", text: "すべて" });
      } else {
        item.disabledMedium = true;
        item.disabledSmall = true;
        item.wasteCode1 = "0";
        item.wasteCode2 = "0";
        item.wasteCode3 = "0";
        item.data1 = "";
        item.data2 = "";
        item.data3 = "";
      }
    },

    changeMedium(id, value) {
      let item = this.dataList[id];
      item.small = "";
      item.disabled = true;
      if (item.medium !== "") {
        item.disabledSmall = false;
        item.smallOption = [
          ...item.mediumOption.find(x => x.value === item.medium).listSmall
        ];
        item.wasteCode2 = item.medium;
        item.data2 = item.mediumOption.find(x => x.value === item.medium).text;
        item.smallOption.unshift({ value: "", text: "すべて" });
      } else {
        item.disabledSmall = true;
        item.wasteCode2 = "0";
        item.wasteCode3 = "0";
        item.data2 = "";
        item.data3 = "";
      }
    },

    changeSmall(id, value) {
      let item = this.dataList[id];
      if (item.small !== "") {
        item.wasteCode3 = item.small;
        item.data3 = item.smallOption.find(x => x.value === item.small).text;
        item.disabled = false;
      } else {
        item.wasteCode3 = "0";
        item.data3 = "";
        item.disabled = true;
      }
    },

    onValidate(dataPopupAdd, dataListAdd) {
      const countMsg = { ...this.countMsg };
      for (var item of dataPopupAdd) {
        item.stateWasteName = true;
        item.stateM3Coef = true;
        item.stateCountCoef = true;
        if (isNullOrEmpty(item.wasteName)) {
          item.stateWasteName = false;
          countMsg.wasteNameEmpty++;
        } else if (!CountCharacter.isJWZH(item.wasteName)) {
          item.stateWasteName = false;
          countMsg.isJWZHWasteName++;
        }
        if (
          !CountCharacter.isPrecisionNumber(item.m3Coef) &&
          !isNullOrEmpty(item.m3Coef)
        ) {
          item.stateM3Coef = false;
          countMsg.precisionM3Coef++;
        }
        if (
          !CountCharacter.isPrecisionNumber(item.countCoef) &&
          !isNullOrEmpty(item.countCoef)
        ) {
          item.stateCountCoef = false;
          countMsg.precisionCountCoef++;
        }
      }

      for (var item of dataListAdd) {
        if (isNullOrEmpty(item.small)) {
          countMsg.smallEmpty++;
        } else {
          item.stateWasteCode4 = true;
          item.stateWasteName = true;
          item.stateM3Coef = true;
          item.stateCountCoef = true;
          if (isNullOrEmpty(item.wasteCode4)) {
            item.stateWasteCode4 = false;
            countMsg.wasteCode4Empty++;
          } else if (
            !CountCharacter.isNumber(item.wasteCode4) ||
            item.wasteCode4 === "000" ||
            item.wasteCode4.length < 3
          ) {
            item.stateWasteCode4 = false;
            countMsg.wasteCode4Number++;
          }
          if (isNullOrEmpty(item.wasteName)) {
            item.stateWasteName = false;
            countMsg.wasteNameEmpty++;
          } else if (!CountCharacter.isJWZH(item.wasteName)) {
            item.stateWasteName = false;
            countMsg.isJWZHWasteName++;
          }
          if (
            !isNullOrEmpty(item.m3Coef) &&
            (!CountCharacter.isPrecisionNumber(item.m3Coef) ||
              item.m3Coef >= 10)
          ) {
            item.stateM3Coef = false;
            countMsg.precisionM3Coef++;
          }

          if (
            !isNullOrEmpty(item.countCoef) &&
            (!CountCharacter.isPrecisionNumber(item.countCoef) ||
              item.m3Coef >= 10)
          ) {
            item.stateCountCoef = false;
            countMsg.precisionCountCoef++;
          }
        }
      }

      if (countMsg.wasteNameEmpty > 0 || countMsg.isJWZHWasteName > 0) {
        this.message.push(Message.E00028.formatText("排出物名"));
      }
      if (countMsg.precisionM3Coef > 0) {
        this.message.push(Message.E00028.formatText("立米換算係数"));
      }
      if (countMsg.precisionCountCoef > 0) {
        this.message.push(Message.E00028.formatText("個・台換算係数"));
      }
      if (countMsg.smallEmpty > 0) {
        this.message.push(Message.E00023.formatText("小分類名"));
      }
      if (countMsg.wasteCode4Empty > 0) {
        this.message.push(Message.E00023.formatText("細"));
      }
      if (countMsg.wasteCode4Number > 0) {
        this.message.push(Message.E00028.formatText("細"));
      }
    },

    changeItem(item) {
      if (item.defineType == false)
        if (!isNullOrEmpty(item.data3)) {
          item.wasteName = item.data3;
        } else if (!isNullOrEmpty(item.data2)) {
          item.wasteName = item.data2;
        } else {
          item.wasteName = item.data1;
        }
    },

    async getDataPopupList(params) {
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWaste1",
        params
      );
    },

    async getSelectBoxPopUpList(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getSelectBoxPopUpList1",
        params
      );
    },

    async getCustomerBranchWasteClass(params) {
      params.branchCode = 0;
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteClass1",
        params
      );
    },

    initParams(branchCode, wasteClass, dataSearch) {
      let body = {
        customerCode: this.customerBranch.customerCode,
        branchCode: branchCode,
        wasteClass: wasteClass,
        param: {
          orderField: "Data1",
          big: dataSearch.big,
          medium: dataSearch.medium,
          small: dataSearch.small
        }
      };

      return body;
    }
  },

  computed: {
    dataSelectBoxPopUpList() {
      return [...this.dataSelectBoxPopUps];
    },
    dataSelectBoxPopUp() {
      return [...this.dataSelectBoxPopUps];
    }
  },

  watch: {
    dataSelectBoxPopUpList() {
      this.checkShowHideSelectBox();
    },

    dataPopupTemp() {
      this.dataPopup = [...this.dataPopupTemp];
      this.dataPopup = this.dataPopup.map(item => {
        item.defineType = item.defineType === 0 ? false : true;
        return item;
      });
    },

    async show() {
      this.openDl = true;
      this.getWasteClassTitle(this.wasteClass);
      this.loadDataList();
      await this.resetDataPopup();
      this.openDl = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.fix-margin {
  margin-bottom: 15px;
}
.fix-padding {
  padding: 0 15px;
}
.scrollbar {
  max-height: 325px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 2px;
  margin: 20px 0;
}
.fix-padding-input {
  padding-left: 0;
  padding-right: 0;
}
.fix-width-select {
  width: 211px;
}
.table-popup input {
  line-height: 0px;
}
@import "@/assets/scss/custom/customer_branch/_customerBranch.scss";
</style>
