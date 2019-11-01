<template>
  <div>
    <b-container fluid class="sshi0029">
      <BaseMessageError :message="message" :title="title" />
      <div v-if="!isReadOnly">
        <BasicInformation
          :classByWaste="classByWaste"
          :options="options"
          :item="contractPartDetail"
          :basicInfo="contractBasicInfo"
          :sectionNumberOption="sectionNumberOption"
          :imgStatus="imgStatus"
          :disableByWasteClass="disableByWasteClass"
          @onChangeValue="onChangeValue"
          @onChangeSectionNumber="onChangeSectionNumber"
          @onChangeFinalSectionFlag="onChangeFinalSectionFlag"
        />
        <TransportInformation
          :classByWaste="classByWaste"
          :item="contractPartDetail"
          :imgStatus="imgStatus"
          :transportMethodOption="transportMethod"
          :disableByWasteClass="disableByWasteClass"
          :disabled917="disabled917"
          @onChangeValue="onChangeValue"
          @uploadFile="uploadFile"
          @downloadFile="downloadFile"
          @onChangeSelfTransportFlag="onChangeSelfTransportFlag"
          @goToUpdateSupplier="goToUpdateSupplier"
          @goToUpdateFactory="goToUpdateFactory"
        />
        <TransportDestination
          :classByWaste="classByWaste"
          :item="contractPartDetail"
          :imgStatus="imgStatus"
          :disableByWasteClass="disableByWasteClass"
          :disabled1932="disabled1932"
          :disabled1832="disabled1832"
          @onChangeValue="onChangeValue"
          @uploadFile="uploadFile"
          @downloadFile="downloadFile"
          @onChangeSelfDisposeFlag="onChangeSelfDisposeFlag"
          @goToUpdateSupplier="goToUpdateSupplier"
          @goToUpdateSupplierHandle="goToUpdateSupplierHandle"
          @goToUpdateFactory="goToUpdateFactory"
        />
        <ContractPartTab
          v-if="imgStatus"
          :contractPartDetail="contractPartDetail"
          :dataContractWastes="dataContractWastes"
          :unitCodeOption="unitCodeOption"
          :dataContractFinals="dataContractFinals"
          :pageCountContractFinal="pageCountContractFinal"
          :countContractFinal="countContractFinal"
          :pageSizeContractFinal="pageSizeContractFinal"
          :visibleTabContractFinal="visibleTabContractFinal"
          :isReadOnly="isReadOnly"
          @onChangeValue="onChangeValue"
          @onPickerContractWaste="onPickerContractWaste"
          @onPickerContractFinal="onPickerContractFinal"
          @getCurrentPageContractFinal="getCurrentPageContractFinal"
          @closeSortContractFinal="closeSortContractFinal"
          @onSortingContractFinal="onSortingContractFinal"
          @getPageSizeContractFinal="getPageSizeContractFinal"
          @getDefineWaste="getDefineWaste"
          @onAddContractWaste="onAddContractWaste"
          @getDefineFactoryFinals="getDefineFactoryFinals"
          @onAddContractFinal="onAddContractFinal"
        />
      </div>

      <div v-if="isReadOnly">
        <BasicInformationReadOnly
          :classByWaste="classByWaste"
          :options="options"
          :item="contractPartDetail"
          :basicInfo="contractBasicInfo"
          :sectionNumberOption="sectionNumberOption"
          :imgStatus="imgStatus"
          :disableByWasteClass="disableByWasteClass"
          @onChangeSectionNumber="onChangeSectionNumber"
          @onChangeFinalSectionFlag="onChangeFinalSectionFlag"
        />
        <TransportInformationReadOnly
          :classByWaste="classByWaste"
          :item="contractPartDetail"
          :imgStatus="imgStatus"
          :transportMethodOption="transportMethod"
          :disableByWasteClass="disableByWasteClass"
          :disabled917="disabled917"
          @uploadFile="uploadFile"
          @downloadFile="downloadFile"
          @onChangeSelfTransportFlag="onChangeSelfTransportFlag"
          @goToUpdateSupplier="goToUpdateSupplier"
          @goToUpdateFactory="goToUpdateFactory"
        />
        <TransportDestinationReadOnly
          :classByWaste="classByWaste"
          :item="contractPartDetail"
          :imgStatus="imgStatus"
          :disableByWasteClass="disableByWasteClass"
          :disabled1932="disabled1932"
          :disabled1832="disabled1832"
          @uploadFile="uploadFile"
          @downloadFile="downloadFile"
          @onChangeSelfDisposeFlag="onChangeSelfDisposeFlag"
          @goToUpdateSupplier="goToUpdateSupplier"
          @goToUpdateSupplierHandle="goToUpdateSupplierHandle"
          @goToUpdateFactory="goToUpdateFactory"
        />
        <ContractPartTab
          v-if="imgStatus"
          :contractPartDetail="contractPartDetail"
          :dataContractWastes="dataContractWastes"
          :unitCodeOption="unitCodeOption"
          :dataContractFinals="dataContractFinals"
          :pageCountContractFinal="pageCountContractFinal"
          :countContractFinal="countContractFinal"
          :pageSizeContractFinal="pageSizeContractFinal"
          :visibleTabContractFinal="visibleTabContractFinal"
          :isReadOnly="isReadOnly"
          @onPickerContractWaste="onPickerContractWaste"
          @onPickerContractFinal="onPickerContractFinal"
          @getCurrentPageContractFinal="getCurrentPageContractFinal"
          @closeSortContractFinal="closeSortContractFinal"
          @onSortingContractFinal="onSortingContractFinal"
          @getPageSizeContractFinal="getPageSizeContractFinal"
          @getDefineWaste="getDefineWaste"
          @onAddContractWaste="onAddContractWaste"
          @getDefineFactoryFinals="getDefineFactoryFinals"
          @onAddContractFinal="onAddContractFinal"
        />
      </div>

      <BaseButtonGroupPermission
        :disabledButton="disabledSubmit"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        @onAddUpdate="onAddUpdate"
        @onBack="onBackChange"
      />
      <BasePopupMessage ref="modal-confirm" @isOK="onDelete" />
      <BasePopupMessage
        ref="modal-warning"
        :title="titleWarning"
        :message="msgWarning"
        :showCancel="false"
        :noCloseOnBackdrop="true"
        @isOK="onOkWarning"
      />
      <BaseProcessing :openDl="openDl" />
    </b-container>
  </div>
</template>

<script>
import BasicInformation from "./basic-information";
import TransportInformation from "./transport-information";
import TransportDestination from "./transport-destination";
import BaseMessageError from "@/components/BaseMessageError.vue";
import BaseProcessing from "@/components/BaseProcessing";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BasePopupMessage from "@/components/BasePopupMessage";
import ContractPartTab from "./contract-part-tab/contract-part-tab-master.vue";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import IMText from "@/data/img-text.json";
import DateTimeFormat from "@/constants/DateTimeFormat";
import FileSaver from "file-saver";
import * as lodash from "lodash";
import moment from "moment";
import { Message } from "@/constants/Message";
import { mapGetters } from "vuex";
import { isNullOrEmpty, isNullOrUndefined } from "@/shared/utilities";
import {
  current,
  common,
  canAction,
  navigation,
  handleOutput
} from "@/shared/utilities";
import BasicInformationReadOnly from "./contract-part-readonly/basic-information-readonly";
import TransportInformationReadOnly from "./contract-part-readonly/transport-information-readonly";
import TransportDestinationReadOnly from "./contract-part-readonly/transport-destination-readonly";
import { Screen, Action } from "@/constants/Screen";
export default {
  components: {
    BasicInformation,
    TransportInformation,
    TransportDestination,
    BaseMessageError,
    BaseButtonGroupPermission,
    ContractPartTab,
    BaseProcessing,
    BasePopupMessage,
    BasicInformationReadOnly,
    TransportInformationReadOnly,
    TransportDestinationReadOnly
  },

  data() {
    return {
      classByWaste: "",
      options: [{ value: null, text: "all" }],
      message: [],
      title: IMText.title.sshi0029Add,
      currentCustomer: current.customer(),
      imgStatus: false,
      openDl: false,
      sectionNumberOption: [],
      disableByWasteClass: true,
      disabledSubmit: false,
      disabled1832: false,
      disabled917: false,
      disabled1932: false,
      visibleTabContractFinal: false,
      param: {
        wasteClass: 0,
        contractCode: 0,
        branchCode: 0,
        sectionNumber: 0
      },
      contractPartDetail: {
        branchCode: 0,
        contractCode: 0,
        createDate: "",
        lastUpdate: "",
        branchName: "",
        contractName: "",
        className: "",
        sectionNumber: 1,
        finalSectionFlag: false,
        memo: "",
        selfTransportFlag: false,
        transportName: "",
        reTransportName: "",
        contractDate: "",
        contractLimit: "",
        transportContractPath: "",
        transportContractFile: "",
        selfDisposeFlag: false,
        desName: "",
        factoryName: "",
        reDesName: "",
        reFactoryName: "",
        disposeContractDate: "",
        disposeContractLimit: "",
        disposeName: "",
        disposeContractPath: "",
        disposeContractFile: "",
        transportSupplierCode: "",
        reentrustTransportSupplierCode: "",
        transportCode: "",
        destSupplierCode: "",
        destFactoryCode: "",
        disposeCode: "",
        reentrustDisposeSupplierCode: "",
        reentrustDisposeFactoryCode: ""
      },
      dataContractWastes: [],
      dataContractFinals: [],
      pageCountContractFinal: 0,
      countContractFinal: 0,
      pageSizeContractFinal: 10,
      pages: AppConfig.Pages,
      contractWaste: {},
      contractFinal: {},
      isDeleteContractWaste: true,
      countMsg: {
        unitQuantityEmpty: 0,
        unitQuantityNumber: 0,
        unitCostEmpty: 0,
        unitCostNumber: 0
      },
      isReadOnly: true,
      titleWarning: IMText.popup.warning,
      msgWarning: "",
      isChangeData: false
    };
  },

  async created() {
    this.onBeforeUnLoad();
    this.setContractWasteTemp({ reset: true, data: [] });
    if (canAction(Action.Update, Screen.SSHI0026)) {
      this.isReadOnly = false;
    } else if (canAction(Action.Read, Screen.SSHI0026)) {
      this.isReadOnly = true;
    }
    this.classByWaste = localStorage.getItem("classByWasteContract");
    this.message = [];
    this.param.wasteClass = +this.$route.params.wasteClass;
    this.param.contractCode = +this.$route.params.contractCode;
    this.param.branchCode = +this.$route.params.branchCode;
    this.param.sectionNumber = +this.$route.params.sectionNumber;

    if (!this.checkValidParams(this.param)) {
      navigation.error404();
    }

    this.getContractBasicInfo(this.param.contractCode);
    this.getContractParts(this.param.contractCode);
    this.getTransportMethods();

    if (this.param.sectionNumber > -1) {
      this.imgStatus = true;
      this.title = IMText.title.sshi0029Update;
      const params = {
        sectionNumber: this.param.sectionNumber,
        contractCode: this.param.contractCode
      };
      await this.getContractPartDetail(params);
      const data = this.$store.getters["contractModule/getContractPartDetail"];
      this.contractPartDetail = data
        ? this.convertObject(data)
        : this.contractPartDetail;
      this.groupUpdate();
    } else {
      this.imgStatus = false;
      this.title = IMText.title.sshi0029Add;
    }
    this.checkWasteClass();
  },

  methods: {
    checkWasteClass() {
      if (this.isWasteClass123()) {
        this.disableByWasteClass = false;
        if (this.contractPartDetail.finalSectionFlag) {
          this.disabled1832 = false;
          this.visibleTabContractFinal = true;
        } else {
          this.disabled1832 = true;
          this.visibleTabContractFinal = false;
        }
      } else {
        this.disableByWasteClass = true;
        this.disabled1832 = true;
        this.visibleTabContractFinal = false;
      }
    },

    groupUpdate() {
      this.isChangeData = false;
      this.onChangeSelfTransportFlag(this.contractPartDetail.selfTransportFlag);
      this.onChangeSelfDisposeFlag(this.contractPartDetail.selfDisposeFlag);
      common.resetPage();
      AppConfig.Pages.orderField = "LastUpdate";
      this.getUnitCodeOption();
      this.getContractWastes();
      const paramContractFinal = { ...this.initParamContractFinal() };
      this.getContractFinals(paramContractFinal);
    },

    async onAddUpdate() {
      this.message = [];
      const item = { ...this.contractPartDetail };
      const detail = this.convertData(item);
      this.validation(item);
      this.validationTabContractWaste(this.dataContractWastes);
      if (!this.message.length) {
        await this.onDispath(detail);
      }
    },

    async onDispath(item) {
      this.openDl = true;
      if (this.imgStatus === true) {
        await this.$store
          .dispatch("contractModule/updateContractPart", item)
          .then(res => {
            if (res.data) {
              this.addAndUpdateContractWaste(this.dataContractWastes);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        await this.$store
          .dispatch("contractModule/addContractPart", item)
          .then(res => {
            if (res.data) {
              this.title = IMText.title.sshi0029Update;
              this.contractPartDetail = { ...this.convertObject(res.data) };
              this.param.sectionNumber = this.contractPartDetail.sectionNumber;
              this.checkWasteClass();
              this.groupUpdate();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      }
      await this.checkAddressContractPart(item);
    },

    async checkAddressContractPart(item) {
      await this.$store
        .dispatch("contractModule/checkAddressContractPart", item)
        .then(res => {
          if (res.data) {
            if (this.imgStatus) {
              this.onBack();
            } else {
              this.imgStatus = true;
              this.onUpdateContractPart();
            }
          } else {
            this.msgWarning = Message.E00043.formatText(
              this.contractPartDetail.transportName
            );
            this.$refs["modal-warning"].showModal();
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    onOkWarning() {
      this.$refs["modal-warning"].hideModal();
      if (!this.message.length) {
        if (this.imgStatus) {
          this.onBack();
        } else {
          this.imgStatus = true;
          this.onUpdateContractPart();
        }
      }
    },

    async getContractPartDetail(params) {
      await this.$store.dispatch(
        "contractModule/getContractPartDetail",
        params
      );
    },

    convertObject(item) {
      item.finalSectionFlag = item.finalSectionFlag === 1 ? true : false;
      item.selfTransportFlag = item.selfTransportFlag === 1 ? true : false;
      item.selfDisposeFlag = item.selfDisposeFlag === 1 ? true : false;
      item.transportContractFile = "";
      item.disposeContractFile = "";
      item.memo = isNullOrEmpty(item.memo) ? "" : item.memo;
      item.contractDate = isNullOrEmpty(item.contractDate)
        ? ""
        : moment(String(item.contractDate)).format(
            DateTimeFormat.DATE_DEFAULT_DATEBOX
          );
      item.contractLimit = isNullOrEmpty(item.contractLimit)
        ? ""
        : moment(String(item.contractLimit)).format(
            DateTimeFormat.DATE_DEFAULT_DATEBOX
          );
      item.disposeContractDate = isNullOrEmpty(item.disposeContractDate)
        ? ""
        : moment(String(item.disposeContractDate)).format(
            DateTimeFormat.DATE_DEFAULT_DATEBOX
          );
      item.disposeContractLimit = isNullOrEmpty(item.disposeContractLimit)
        ? ""
        : moment(String(item.disposeContractLimit)).format(
            DateTimeFormat.DATE_DEFAULT_DATEBOX
          );
      return item;
    },

    convertData(itemOld) {
      let formData = new FormData();
      itemOld.contractDate =
        itemOld.contractDate === "Invalid date" ? "" : itemOld.contractDate;
      itemOld.contractLimit =
        itemOld.contractLimit === "Invalid date" ? "" : itemOld.contractLimit;
      itemOld.disposeContractDate =
        itemOld.disposeContractDate === "Invalid date"
          ? ""
          : itemOld.disposeContractDate;
      itemOld.disposeContractLimit =
        itemOld.disposeContractLimit === "Invalid date"
          ? ""
          : itemOld.disposeContractLimit;
      if (this.imgStatus) {
        formData.append("createDate", itemOld.createDate);
        formData.append("lastUpdate", itemOld.lastUpdate);
        formData.append("sectionNumber", itemOld.sectionNumber);
      }
      formData.append("customerCode", this.currentCustomer.customerCode);
      formData.append("branchCode", this.param.branchCode);
      formData.append("contractCode", this.param.contractCode);
      formData.append("transportCode", itemOld.transportCode);
      formData.append("memo", itemOld.memo);
      if (this.isWasteClass123()) {
        if (!itemOld.finalSectionFlag) {
          formData.append("sectionNumber", itemOld.sectionNumber);
          formData.append("finalSectionFlag", 0);
          formData.append(
            "selfTransportFlag",
            itemOld.selfTransportFlag ? 1 : 0
          );
          formData.append(
            "contractDate",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrEmpty(itemOld.contractDate)
              ? ""
              : moment(String(itemOld.contractDate)).format(
                  DateTimeFormat.DATE_PARAMS
                )
          );
          formData.append(
            "contractLimit",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrEmpty(itemOld.contractLimit)
              ? ""
              : moment(String(itemOld.contractLimit)).format(
                  DateTimeFormat.DATE_PARAMS
                )
          );
          formData.append(
            "transportSupplierCode",
            itemOld.selfTransportFlag ? "" : itemOld.transportSupplierCode
          );
          formData.append(
            "reentrustTransportSupplierCode",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrUndefined(itemOld.reentrustTransportSupplierCode)
              ? ""
              : itemOld.reentrustTransportSupplierCode
          );
          formData.append("destSupplierCode", itemOld.destSupplierCode);
          formData.append("destFactoryCode", itemOld.destFactoryCode);
          formData.append("selfDisposeFlag", itemOld.selfDisposeFlag ? 1 : 0);
          formData.append("disposeContractDate", "");
          formData.append("disposeContractLimit", "");
          formData.append(
            "disposeCode",
            isNullOrUndefined(itemOld.disposeCode) ? "" : itemOld.disposeCode
          );
          formData.append("reentrustDisposeSupplierCode", "");
          formData.append("reentrustDisposeFactoryCode", "");
          formData.append(
            "transportContractFile",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrUndefined(itemOld.transportContractFile)
              ? ""
              : itemOld.transportContractFile
          );
          formData.append("disposeContractFile", "");
        } else {
          formData.append("sectionNumber", itemOld.sectionNumber);
          formData.append("finalSectionFlag", 1);
          formData.append(
            "selfTransportFlag",
            itemOld.selfTransportFlag ? 1 : 0
          );
          formData.append(
            "contractDate",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrEmpty(itemOld.contractDate)
              ? ""
              : moment(String(itemOld.contractDate)).format(
                  DateTimeFormat.DATE_PARAMS
                )
          );
          formData.append(
            "contractLimit",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrEmpty(itemOld.contractLimit)
              ? ""
              : moment(String(itemOld.contractLimit)).format(
                  DateTimeFormat.DATE_PARAMS
                )
          );
          formData.append(
            "transportSupplierCode",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrUndefined(itemOld.transportSupplierCode)
              ? ""
              : itemOld.transportSupplierCode
          );
          formData.append(
            "reentrustTransportSupplierCode",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrUndefined(itemOld.reentrustTransportSupplierCode)
              ? ""
              : itemOld.reentrustTransportSupplierCode
          );
          formData.append(
            "destSupplierCode",
            itemOld.selfDisposeFlag ? "" : itemOld.destSupplierCode
          );
          formData.append(
            "destFactoryCode",
            itemOld.selfDisposeFlag ? "" : itemOld.destFactoryCode
          );
          formData.append("selfDisposeFlag", itemOld.selfDisposeFlag ? 1 : 0);
          formData.append(
            "disposeContractDate",
            itemOld.selfDisposeFlag
              ? ""
              : isNullOrEmpty(itemOld.disposeContractDate)
              ? ""
              : moment(String(itemOld.disposeContractDate)).format(
                  DateTimeFormat.DATE_PARAMS
                )
          );
          formData.append(
            "disposeContractLimit",
            itemOld.selfDisposeFlag
              ? ""
              : isNullOrEmpty(itemOld.disposeContractLimit)
              ? ""
              : moment(String(itemOld.disposeContractLimit)).format(
                  DateTimeFormat.DATE_PARAMS
                )
          );
          formData.append(
            "disposeCode",
            isNullOrUndefined(itemOld.disposeCode) ? "" : itemOld.disposeCode
          );
          formData.append(
            "reentrustDisposeSupplierCode",
            itemOld.selfDisposeFlag
              ? ""
              : isNullOrUndefined(itemOld.reentrustDisposeSupplierCode)
              ? ""
              : itemOld.reentrustDisposeSupplierCode
          );
          formData.append(
            "reentrustDisposeFactoryCode",
            itemOld.selfDisposeFlag
              ? ""
              : isNullOrUndefined(itemOld.reentrustDisposeFactoryCode)
              ? ""
              : itemOld.reentrustDisposeFactoryCode
          );
          formData.append(
            "transportContractFile",
            itemOld.selfTransportFlag
              ? ""
              : isNullOrUndefined(itemOld.transportContractFile)
              ? ""
              : itemOld.transportContractFile
          );
          formData.append(
            "disposeContractFile",
            itemOld.selfDisposeFlag
              ? ""
              : isNullOrUndefined(itemOld.disposeContractFile)
              ? ""
              : itemOld.disposeContractFile
          );
        }
      } else {
        formData.append("sectionNumber", 1);
        formData.append("finalSectionFlag", 1);
        formData.append("selfTransportFlag", itemOld.selfTransportFlag ? 1 : 0);
        formData.append(
          "contractDate",
          itemOld.selfTransportFlag
            ? ""
            : isNullOrEmpty(itemOld.contractDate)
            ? ""
            : moment(String(itemOld.contractDate)).format(
                DateTimeFormat.DATE_PARAMS
              )
        );
        formData.append(
          "contractLimit",
          itemOld.selfTransportFlag
            ? ""
            : isNullOrEmpty(itemOld.contractLimit)
            ? ""
            : moment(String(itemOld.contractLimit)).format(
                DateTimeFormat.DATE_PARAMS
              )
        );
        formData.append(
          "transportSupplierCode",
          itemOld.selfTransportFlag ? "" : itemOld.transportSupplierCode
        );
        formData.append("reentrustTransportSupplierCode", "");
        formData.append("destSupplierCode", "");
        formData.append("destFactoryCode", "");
        formData.append("selfDisposeFlag", "");
        formData.append("disposeContractDate", "");
        formData.append("disposeContractLimit", "");
        formData.append("disposeCode", "");
        formData.append("reentrustDisposeSupplierCode", "");
        formData.append("reentrustDisposeFactoryCode", "");
        formData.append(
          "transportContractFile",
          itemOld.selfTransportFlag ? "" : itemOld.transportContractFile
        );
        formData.append("disposeContractFile", "");
      }
      return formData;
    },

    validation(item) {
      if (!item.selfTransportFlag) {
        if (isNullOrEmpty(item.transportSupplierCode)) {
          this.message.push(Message.E00023.formatText("収集運搬業者"));
        }

        if (isNullOrEmpty(item.contractDate)) {
          this.message.push(Message.E00023.formatText("契約年月日"));
        }
      }

      if (this.isWasteClass123()) {
        if (item.finalSectionFlag) {
          if (!item.selfDisposeFlag) {
            if (isNullOrEmpty(item.destSupplierCode)) {
              this.message.push(Message.E00023.formatText("運搬先業者"));
            }

            if (isNullOrEmpty(item.destFactoryCode)) {
              this.message.push(Message.E00023.formatText("運搬先業者事業場"));
            }

            if (isNullOrEmpty(item.disposeContractDate)) {
              this.message.push(Message.E00023.formatText("契約年月日"));
            }
          }

          if (
            !isNullOrEmpty(item.destSupplierCode) &&
            !isNullOrEmpty(item.reentrustDisposeSupplierCode) &&
            item.destSupplierCode === item.reentrustDisposeSupplierCode
          ) {
            this.message.push(Message.E10045);
          }
        } else {
          if (isNullOrEmpty(item.destSupplierCode)) {
            this.message.push(Message.E00023.formatText("運搬先業者"));
          }

          if (isNullOrEmpty(item.destFactoryCode)) {
            this.message.push(Message.E00023.formatText("運搬先業者事業場"));
          }
        }

        if (
          !isNullOrEmpty(item.transportSupplierCode) &&
          !isNullOrEmpty(item.reentrustTransportSupplierCode) &&
          item.transportSupplierCode === item.reentrustTransportSupplierCode
        ) {
          this.message.push(Message.E10044);
        }
      }
    },

    validationTabContractWaste(dataContractWastes) {
      const countMsg = { ...this.countMsg };
      for (let item of dataContractWastes) {
        // item.stateUnitQuantity = true;
        // item.stateUnitCost = true;
        if (isNullOrEmpty(item.unitQuantity)) {
          countMsg.unitQuantityEmpty++;
          // item.stateUnitQuantity = false;
        } else if (!CountCharacter.isPrecisionNumber(item.unitQuantity)) {
          countMsg.unitQuantityNumber++;
          // item.stateUnitQuantity = false;
        }

        if (isNullOrEmpty(item.unitCost)) {
          countMsg.unitCostEmpty++;
          // item.stateUnitCost = false;
        } else if (!CountCharacter.isPrecisionNumber(item.unitCost)) {
          countMsg.unitCostNumber++;
          // item.stateUnitCost = false;
        }
      }

      if (countMsg.unitQuantityEmpty > 0) {
        this.message.push(Message.E00023.formatText("数量"));
      }

      if (countMsg.unitQuantityNumber > 0) {
        this.message.push(Message.E00028.formatText("数量"));
      }

      if (countMsg.unitCostEmpty > 0) {
        this.message.push(Message.E00023.formatText("単価"));
      }

      if (countMsg.unitCostNumber > 0) {
        this.message.push(Message.E00028.formatText("単価"));
      }
    },

    onUpdateContractPart() {
      const param = {
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode,
        wasteClass: this.param.wasteClass,
        sectionNumber: this.param.sectionNumber
      };
      navigation.sshi0029Update(param);
    },

    onBack() {
      const param = {
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode,
        wasteClass: this.param.wasteClass
      };
      navigation.sshi0028(param);
    },

    onBackChange() {
      if (!this.isReadOnly && this.isChangeData) {
        if (common.showPopupDirtyForm()) {
          this.onBack();
        }
        return;
      }
      this.onBack();
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    },

    onChangeValue() {
      this.isChangeData = true;
    },

    uploadFile(files, key) {
      if (common.checkOneFile(files)) {
        const file = files[0];
        if (key === 1) {
          this.contractPartDetail.transportContractPath = file.name;
          this.contractPartDetail.transportContractFile = file;
        } else if (key === 2) {
          this.contractPartDetail.disposeContractPath = file.name;
          this.contractPartDetail.disposeContractFile = file;
        }
        return;
      }
    },

    downloadFile(pathFile) {
      const params = {
        filePath: pathFile
      };
      this.$store
        .dispatch("fileModule/downloadFile", params)
        .then(res => {
          if (res.data) {
            FileSaver.saveAs(res.data, common.getFileName(pathFile));
          }
        })
        .catch(error => {
          this.message = [];
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    },

    checkValidParams(params) {
      if (
        isNaN(params.wasteClass) ||
        params.wasteClass < 1 ||
        isNaN(params.contractCode) ||
        params.contractCode < 1 ||
        isNaN(params.branchCode) ||
        params.branchCode < 1
      ) {
        return false;
      }
      return true;
    },

    isWasteClass123() {
      if (lodash.includes([1, 2, 3], this.param.wasteClass)) {
        return true;
      } else {
        return false;
      }
    },

    onChangeSectionNumber(sectionNumber) {
      this.message = [];
      const sectionBefore = this.$store.getters[
        "contractModule/getSectionBefore"
      ](sectionNumber);
      if (sectionBefore === null) {
        this.message.push(Message.E00037);
        this.disabledSubmit = true;
      } else if (sectionBefore.finalSectionFlag === 0) {
        this.disabledSubmit = false;
      } else {
        this.message.push(Message.E00038);
        this.disabledSubmit = true;
      }
    },

    onChangeFinalSectionFlag(finalSectionFlag, sectionNumber) {
      if (finalSectionFlag) {
        this.message = [];
        const sectionAfter = this.$store.getters[
          "contractModule/getSectionAfter"
        ](sectionNumber);
        if (sectionAfter != null) {
          this.message.push(Message.E00039);
          this.disabledSubmit = true;
        } else {
          this.disabledSubmit = false;
          this.disabled1832 = false;
        }
        this.visibleTabContractFinal = true;
      } else {
        this.disabled1832 = true;
        this.visibleTabContractFinal = false;
      }
    },

    onChangeSelfTransportFlag(selfTransportFlag) {
      // if item8.ischecked = true
      // 		item 9,10,11,12,13,14,16,17.enable = false
      // else
      // 		item 9,10,11,12,13,14,16,17.enable = true
      if (selfTransportFlag) {
        this.disabled917 = true;
      } else {
        this.disabled917 = false;
      }
    },

    goToUpdateSupplier(value) {
      navigation.sshi0012(value);
    },

    goToUpdateSupplierHandle(value) {
      navigation.sshi0015(value);
    },

    goToUpdateFactory(params) {
      navigation.sshi0018(params);
    },

    onChangeSelfDisposeFlag(selfDisposeFlag) {
      if (selfDisposeFlag) {
        this.disabled1932 = true;
      } else {
        this.disabled1932 = false;
      }
    },

    getContractBasicInfo(params) {
      this.$store.dispatch("contractModule/getContractBasicInfo", params);
    },

    getTransportMethods() {
      const params = {
        key1: "運搬方法"
      };
      this.$store.dispatch("generalModule/getTransportMethod", params);
    },

    getContractParts(params) {
      this.$store.dispatch("contractModule/getContractParts", params);
    },

    getSectionNumberOption(arr) {
      let sectionNumbers = [];
      arr.forEach(item => {
        sectionNumbers.push({
          value: item,
          text: "区間" + item
        });
      });
      return sectionNumbers;
    },

    initParamContractFinal() {
      const params = {
        contractCode: this.contractPartDetail.contractCode,
        param: {
          page: AppConfig.Pages.page,
          orderField: AppConfig.Pages.orderField,
          descending: AppConfig.Pages.descending,
          pageSize: this.pageSizeContractFinal
        }
      };
      return params;
    },

    onDelete() {
      if (this.isDeleteContractWaste) {
        this.onDeleteContractWaste();
      } else {
        this.onDeleteContractFinal();
      }
    },

    onPickerContractFinal(data, key) {
      this.isDeleteContractWaste = key;
      this.contractFinal = data.item;
      this.$refs["modal-confirm"].showModal();
    },

    onDeleteContractFinal() {
      this.$refs["modal-confirm"].hideModal();
      const param = {
        contractCode: this.contractPartDetail.contractCode,
        supplierCode: this.contractPartDetail.destSupplierCode,
        factoryCode: this.contractPartDetail.destFactoryCode,
        finalFactoryCode: this.contractFinal.finalFactoryCode
      };
      this.$store
        .dispatch("contractModule/deleteContractFinal", param)
        .then(resp => {
          this.getCurrentPageContractFinal();
        })
        .catch(error => {
          this.message = [];
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    },

    getCurrentPageContractFinal() {
      let param = { ...this.initParamContractFinal() };
      param.param.page = this.pages.page;
      this.getContractFinals(param);
    },

    getPageSizeContractFinal(data) {
      this.pageSizeContractFinal = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParamContractFinal() };
      this.getContractFinals(params);
    },

    closeSortContractFinal(data) {
      AppConfig.Pages.descending = true;
      AppConfig.Pages.orderField = "LastUpdate";
      const params = { ...this.initParamContractFinal() };
      this.getContractFinals(params);
    },

    onSortingContractFinal(data, isCheck) {
      let params = { ...this.initParamContractFinal() };
      params.param.orderField = CountCharacter.upCase(data);
      params.param.descending = isCheck;
      this.getContractFinals(params);
    },

    getContractFinals(params) {
      this.$store.dispatch("contractModule/getContractFinalsPaging", params);
    },

    onPickerContractWaste(data, key) {
      this.isDeleteContractWaste = key;
      this.contractWaste = data.item;
      this.$refs["modal-confirm"].showModal();
    },

    onDeleteContractWaste() {
      this.$refs["modal-confirm"].hideModal();
      if (this.contractWaste.isNew) {
        this.$store
          .dispatch(
            "contractModule/deleteContractWasteTemp",
            this.contractWaste
          )
          .then(resp => {
            this.dataContractWastes = this.contractWastes.concat(
              this.contractWasteTemp
            );
          });
      } else {
        const param = {
          contractCode: this.contractPartDetail.contractCode,
          sectionNumber: this.contractPartDetail.sectionNumber,
          wasteClass: this.param.wasteClass,
          wasteCode: this.contractWaste.wasteCode
        };
        this.$store
          .dispatch("contractModule/deleteContractWaste", param)
          .then(resp => {
            this.getContractWastes();
          })
          .catch(error => {
            this.message = [];
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      }
    },

    getContractWastes() {
      const param = {
        contractCode: this.contractPartDetail.contractCode,
        sectionNumber: this.contractPartDetail.sectionNumber,
        wasteClass: this.param.wasteClass
      };
      this.$store.dispatch("contractModule/getContractWastes", param);
    },

    getUnitCodeOption() {
      const param = {
        key1: "数量単位"
      };
      this.$store.dispatch("generalModule/getUnitCode", param);
    },

    // Add ContractWaste
    async getDefineWaste() {
      const param = {
        customerCode: this.currentCustomer.customerCode,
        contractCode: this.contractPartDetail.contractCode,
        branchCode: this.contractPartDetail.branchCode,
        wasteClass: this.param.wasteClass,
        sectionNumber: this.contractPartDetail.sectionNumber
      };
      await this.$store.dispatch(
        "customerBranchWasteModule/getCustomerBranchWasteDefineWaste",
        param
      );
    },

    onAddContractWaste(data) {
      this.onChangeValue();
      this.setContractWasteTemp({ reset: false, data: data });
      const contractWasteSelected = data.map(item => {
        const object = {
          wasteName: item.wasteName,
          data1: item.data1,
          data2: item.data2,
          data3: item.data3,
          wasteCode: item.wasteCode,
          unitQuantity: null,
          unitCode: 1,
          unitCost: null,
          collectCycle: null,
          recycleRate: null,
          memo: item.memo,
          isNew: true,
          lastUpdate: new Date()
        };
        return object;
      });
      this.dataContractWastes = this.dataContractWastes.concat(
        contractWasteSelected
      );
    },

    setContractWasteTemp(data) {
      this.$store.dispatch("contractModule/setContractWasteTemp", data);
    },

    addAndUpdateContractWaste(data) {
      const params = { ...this.getFullParams() };
      params.body = data;
      this.$store
        .dispatch("contractModule/addContractWaste", params)
        .then(res => {
          this.setContractWasteTemp({ reset: true, data: [] });
          this.getContractWastes();
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    },

    getDefineFactoryFinals() {
      const param = {
        customerCode: this.currentCustomer.customerCode,
        supplierCode: this.contractPartDetail.destSupplierCode,
        disposeFactoryCode: isNullOrUndefined(
          this.contractPartDetail.destFactoryCode
        )
          ? 0
          : this.contractPartDetail.destFactoryCode,
        redisposeFactoryCode: isNullOrUndefined(
          this.contractPartDetail.reentrustDisposeFactoryCode
        )
          ? 0
          : this.contractPartDetail.reentrustDisposeFactoryCode
      };
      this.$store.dispatch(
        "factoryFinalModule/getFactoryFinalForContractFinal",
        param
      );
    },

    onAddContractFinal(data) {
      const params = {
        contractCode: this.contractPartDetail.contractCode,
        body: data
      };
      this.$store
        .dispatch("contractModule/addContractFinal", params)
        .then(res => {
          common.resetPage();
          AppConfig.Pages.orderField = "LastUpdate";
          const paramContractFinal = { ...this.initParamContractFinal() };
          this.getContractFinals(paramContractFinal);
        })
        .catch(error => {
          this.message = this.message.concat(
            handleOutput.errorHandle(
              error,
              this.contractPartDetail.transportName
            )
          );
        });
    },

    getFullParams() {
      return {
        customerCode: this.currentCustomer.customerCode,
        contractCode: this.contractPartDetail.contractCode,
        branchCode: this.contractPartDetail.branchCode,
        wasteClass: this.param.wasteClass,
        sectionNumber: this.contractPartDetail.sectionNumber
      };
    }
  },

  computed: {
    ...mapGetters({
      contractBasicInfo: "contractModule/getContractBasicInfo",
      contractParts: "contractModule/getContractParts",
      transportMethod: "generalModule/getTransportMethod",
      contractFinals: "contractModule/getContractFinalsPaging",
      contractWastes: "contractModule/getContractWastes",
      unitCodeOption: "generalModule/getUnitCode",
      contractWasteTemp: "contractModule/getContractWasteTemp"
    })
  },

  watch: {
    contractParts() {
      const arraySections = [1, 2, 3, 4, 5];
      if (this.imgStatus) {
        this.sectionNumberOption = this.getSectionNumberOption(arraySections);
      } else if (this.contractParts.length == 0) {
        this.sectionNumberOption = this.getSectionNumberOption(arraySections);
        this.contractPartDetail.finalSectionFlag = true;
        this.disabled1832 = false;
      } else {
        const listSections = this.contractParts.map(item => {
          return item.sectionNumber;
        });
        const sections = arraySections.filter(function(item) {
          return !listSections.includes(item);
        });
        this.sectionNumberOption = this.getSectionNumberOption(sections);
        this.contractPartDetail.finalSectionFlag = false;
        this.disabled1832 = true;
      }

      if (this.sectionNumberOption.length > 0) {
        this.contractPartDetail.sectionNumber = this.sectionNumberOption[0].value;
      }
    },

    transportMethod() {
      if (this.transportMethod.length > 0) {
        if (!this.imgStatus) {
          this.contractPartDetail.transportCode = this.transportMethod[0].value;
        }
      }
    },

    contractFinals() {
      this.dataContractFinals = this.contractFinals.items;
      this.pageCountContractFinal = this.contractFinals.pageCount;
      this.countContractFinal = this.contractFinals.count;
    },

    contractWastes() {
      this.dataContractWastes = this.contractWastes.concat(
        this.contractWasteTemp
      );
    }
  }
};
</script>