<template>
  <div>
    <b-container fluid>
      <BaseMessageError :message="message" :title="title" />
      <div v-if="dataError.length > 0  && dataError[0].notifyClass === 2">
        <BaseTableError
          :dataTable="dataError"
          :fields.sync="fieldsError"
          :tableId="tableErrorId"
          :groupNotification="groupNotification"
          @onApprove="onApproveError"
          @onCancel="onCancelError"
        />
      </div>

      <b-row>
        <b-col cols="2">
          <h6 class="fontColor">マニフェスト新規登録</h6>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="1"></b-col>
        <b-col cols="1">
          <label class="mt-1">
            <span class="asterisk">* {{ imgText.general.inputRequired }}</span>
          </label>
        </b-col>

        <b-col cols="3" class="flex">
          <label class="mt-1 mr-2">
            <span v-if="!isUpdate" class="asterisk">*</span>排出事業場
          </label>
          <b-form-select
            v-if="!isUpdate"
            v-model="currentBranchCode"
            :options="options"
            style="max-width:250px"
            size="sm"
          ></b-form-select>
          <b-input
            v-if="isUpdate"
            style="max-width:250px"
            type="text"
            disabled
            :value="branchName"
            size="sm"
          ></b-input>
        </b-col>

        <b-col cols="3" class="flex">
          <label class="mt-1 mr-2">
            <span class="asterisk">*</span>引渡し日
          </label>
          <b-form-input type="date" style="max-width:250px" v-model="deliveryDate" size="sm"></b-form-input>
        </b-col>

        <b-col cols="3" class="flex">
          <label class="mt-1 mr-2">
            <span class="asterisk">*</span>契約名
          </label>
          <b-link
            size="sm"
            class="underline classContract"
            :disabled="contractName == null || contractName == ''"
            @click="onRedirectToScreenContractUpdate"
          >{{contractName}}</b-link>
          <!-- <b-input class="mr-3" style="max-width:200px" type="text" disabled :value="contractName"></b-input> -->
        </b-col>

        <b-col cols="1">
          <b-button
            size="sm"
            v-if="!isUpdate"
            :disabled="disabledChooseContract"
            @click="showPopUp"
            class="float-right btn-form"
          >契約選択</b-button>
          <b-button
            size="sm"
            v-if="isUpdate && !isManifest45 "
            @click="downLoadBill"
            class="float-right btn-form"
          >受渡確認票出力</b-button>
        </b-col>
      </b-row>

      <div v-if="isManifest45">
        <Manifest45
          :manifestByCustumer="manifestByCustumer"
          :nameRegistation="nameRegistation"
          :transportByWaste45.sync="transportByWaste45"
          :emissionByWaste45.sync="emissionByWaste45"
          :dischargeInformation="dischargeInformation"
          :remark="remark"
          :isVisible="isVisible"
          :classByWaste="classByWaste"
          :onAddManifest45="onAddManifest45"
          :currentBranchCode="currentBranchCode"
          :contractCode="contractCode"
          :currentWasteClass="currentWasteClass"
          :currentCustomerCode="currentCustomerCode"
          :isManifest45="isManifest45"
          :general1="general1"
          :entryCode45="entryCode45"
          :isUpdate="isUpdate"
          :date="date"
          :onUpdateManifest45="onUpdateManifest45"
          :isReadOnly="isReadOnly"
          :general4="general4"
          :general5="general5"
          :emissionPopUp45="emissionPopUp45"
          @onBack="onBack"
        ></Manifest45>
      </div>

      <div v-if="!isManifest45">
        <FormEmission
          :general1="general1"
          :general2="general2"
          :general3="general3"
          :manifestByCustumer="manifestByCustumer"
          :nameRegistation="nameRegistation"
          :currentBranchCode="currentBranchCode"
          :contractCode="contractCode"
          :currentWasteClass="currentWasteClass"
          :dischargeInformation="dischargeInformation"
          :emssions.sync="emssions"
          :countEmission="countEmission"
          :isUpdate="isUpdate"
          :classByWaste="classByWaste"
          :isVisible="isVisible"
          :isManifest45="isManifest45"
          :isReadOnly="isReadOnly"
        />
        <FormTransportation
          :general4="general4"
          :general5="general5"
          :staff="staff"
          :transports="transports"
          :classByWaste="classByWaste"
          :currentCustomerCode="currentCustomerCode"
          :isReadOnly="isReadOnly"
        />
        <FormDisposal
          :currentCustomerCode="currentCustomerCode"
          :currentBranchCode="currentBranchCode"
          :currentWasteClass="currentWasteClass"
          :contractCode="contractCode"
          :dispose="dispose"
          :general6="general6"
          :selectedGeneral6="selectedGeneral6"
          :classByWaste="classByWaste"
          :disposeFlag="disposeFlag"
          :isVisible="isVisible"
          :isUpdate="isUpdate"
          :isReadOnly="isReadOnly"
        />
        <FormDisposalEnd
          :disposeFlag="disposeFlag"
          :disposeEndFlag="disposeEndFlag"
          :disposeEnd="disposeEnd"
          :currentCustomerCode="currentCustomerCode"
          :currentBranchCode="currentBranchCode"
          :dispose="dispose"
          :isUpdate="isUpdate"
          :classByWaste="classByWaste"
          :isVisible="isVisible"
          :isReadOnly="isReadOnly"
        />
        <FormRemarks
          :remark="remark"
          @checkDeliveryDate="checkDeliveryDate"
          :classByWaste="classByWaste"
          :isShowCheckBoxDeivery="isShowCheckBoxDeivery"
          :isVisible="isVisible"
          :isUpdate="isUpdate"
          :isReadOnly="isReadOnly"
        />
        <manifestchange
          v-if="isUpdate"
          :manifestState="manifestState"
          :final="final"
          :transport="transport"
          :reportDispose="reportDispose"
          :reportDeadline="reportDeadline"
          :update="update"
          :classByWaste="classByWaste"
        ></manifestchange>
        <div v-if="!isUpdate" class="float-right mt-2 mb-4">
          <b-button
            variant="primary"
            size="sm"
            style="font-weight: bold"
            @click="onAddRevertation"
            :disabled="isShowReservationButton || isVisible"
          >予約</b-button>
          <b-button
            variant="danger"
            class="ml-4"
            style="font-weight: bold"
            size="sm"
            @click="onAddRegistation"
            :disabled="isVisible"
          >登録</b-button>
          <b-button class="btn-form ml-4" size="sm" @click="onBack">戻る</b-button>
        </div>

        <div v-if="isUpdate" class="float-right mt-2 mb-4">
          <b-button v-if="!isReadOnly" size="sm" class="btn-form" @click="onUpdate104">取消</b-button>
          <b-button
            v-if="!isReadOnly"
            variant="danger"
            class="ml-4"
            style="font-weight: bold"
            size="sm"
            @click="onUpdate100"
            :disabled="isShowReservationButton"
          >予約から登録</b-button>
          <b-button v-if="!isReadOnly" class="ml-4 btn-form" size="sm" @click="onUpdateManifest">修正</b-button>
          <b-button class="btn-form ml-4" size="sm" @click="onBack">戻る</b-button>
        </div>
      </div>
    </b-container>
    <FormContractSelection
      @getData="getDataContract"
      @getContractByWasteClass45="getContractByWasteClass45"
      :currentCustomerCode="currentCustomerCode"
      :currentBranchCode="currentBranchCode"
      :currentWasteClass="currentWasteClass"
      :deliveryDate="deliveryDate"
      :isManifest45="isManifest45"
    />
    <BaseProcessing :openDl="openDl" />
    <BasePopupMessage
      ref="modal-warning"
      :title="titleWarning"
      :message="msgWarning"
      :showCancel="false"
      :noCloseOnBackdrop="true"
      @isOK="onOkWarning"
    />
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import BaseMessageError from "@/components/BaseMessageError.vue";
import FormEmission from "./manifest-emission";
import FormTransportation from "./manifest-transportation";
import FormDisposal from "./manifest-disposal";
import FormRemarks from "./manifest-remarks";
import FormContractSelection from "./contract-selection-popup";
import { Message } from "@/constants/Message";
import FormDisposalEnd from "./manifest-disposal-end";
import IMText from "@/data/img-text";
import manifestchange from "./manifest-change/manifest-change.vue";
import {
  current,
  common,
  handleOutput,
  canAction,
  isNullOrEmpty
} from "@/shared/utilities";
import moment from "moment";
import DateTimeFormat from "@/constants/DateTimeFormat";
import HttpStatus from "http-status-codes";
import FileSaver from "file-saver";
import BaseTableError from "@/components/BaseTableError.vue";
import { mapGetters } from "vuex";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import BaseProcessing from "@/components/BaseProcessing";
import FormatData from "@/shared/FomatData";
import Manifest45 from "./emissions-detail/emisstions-master.vue";
import { ManifestService } from "@/services/manifest.service";
import { Screen, Action } from "@/constants/Screen";
import BasePopupMessage from "@/components/BasePopupMessage";
const manifestService = new ManifestService();
export default {
  components: {
    FormEmission,
    FormTransportation,
    BaseMessageError,
    FormDisposal,
    FormDisposalEnd,
    FormRemarks,
    FormContractSelection,
    manifestchange,
    BaseTableError,
    BaseProcessing,
    Manifest45,
    BasePopupMessage
  },
  data() {
    return {
      imgText: IMText,
      title: "",
      idModal: "modal-manifest-add",
      idModalHistory: "modal-history",
      message: [],
      isUpdate: false,
      currentBranchCode: 0,
      contractName: "",
      manifestByCustumer: [],
      nameRegistation: "",
      entryCode45: "",
      contractCode: 0,
      general1: [],
      general2: [],
      general3: [],
      general4: [],
      general5: [],
      general6: [],
      general7Text: "",
      general8Text: "",
      general9Text: "",
      general10Text: "",
      general11Text: "",
      general12Text: "",
      general13Text: "",
      staff: [],
      final: [],
      transport: [],
      dispose: {},
      disposeEnd: [],
      disposeFlag: {
        isReentrustFlag: false
      },
      disposeEndFlag: {
        isFinalDisposeFlag: true
      },
      selectedGeneral6: 0,
      currentCustomerCode: current.customer().customerCode,
      currentWasteClass: current.wasteClass(),
      deliveryDate: "",
      entryUserCode: 0,
      dischargeInformation: {
        status: "",
        contractNumber1: "",
        contractNumber2: "",
        contractNumber3: "",
        deliveryUserCode: 0,
        manifestNumber: ""
      },
      remark: {
        memo1: "",
        memo2: "",
        memo3: "",
        memo4: "",
        memo5: ""
      },
      reportDeadline: {},
      update: {},
      manifestState: {
        manifestClass: "",
        modifyPendingFlag: "",
        transportReportFlag: "",
        disposeReportFlag: "",
        finalDispodeReportFlag: "",
        confirmQuantity: ""
      },
      reportDispose: {},
      manifests: [],
      transports: [],
      lstTransport: [],
      emssions: [],
      countEmission: 0,
      manifestByEntryCode: {},
      isShowReservationButton: false,
      isShowCheckBoxDeivery: true,
      branchName: "",
      classByWaste: "",
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
          tdClass: "classButton"
        }
      ],
      groupNotification: lodash.cloneDeep(AppConfig.GroupNotification),
      tableErrorId: "sshi0012-table-get-error",
      openDl: false,
      isManifest45: false,
      classManifest: 0,
      reserveLimit: 0,
      isVisible: true,
      transportByWaste45: [],
      emissionByWaste45: [],
      isReadOnly: false,
      manifestByWaste45: {},
      date: {
        createDate: "",
        lastUpdate: ""
      },
      titleWarning: IMText.popup.warning,
      msgWarning: "",
      manifestStatus: "",
      isChangeData: false,
      disabledChooseContract: true
    };
  },

  created() {
    this.isDirty = false;
    this.classByWaste = localStorage.getItem("classByWaste");
    this.initialData();
    const manifest = +this.$route.params.manifestNumber;
    this.isManifest45 =
      this.currentWasteClass === 4 || this.currentWasteClass === 5
        ? true
        : false;
    if (manifest) {
      this.isUpdate = true;
      const param = {
        customerCode: this.currentCustomerCode,
        wasteClass: this.currentWasteClass,
        entryCode: manifest
      };
      if (this.isManifest45) {
        const param45 = localStorage.getItem("params");
        if (canAction(Action.Update, Screen.SSHI0033_45_UPDATE)) {
          this.isReadOnly = false;
        } else if (canAction(Action.Read, Screen.SSHI0033_45_UPDATE)) {
          this.isReadOnly = true;
        }
        this.getManifestByWaste45(JSON.parse(param45));
      } else {
        if (canAction(Action.Update, Screen.SSHI0033_123_UPDATE)) {
          this.isReadOnly = false;
        } else if (canAction(Action.Read, Screen.SSHI0033_123_UPDATE)) {
          this.isReadOnly = true;
        }
        this.getManifestByEntryCode(param);
      }
    } else {
      this.isUpdate = false;
    }
    this.getPersonRegistation();
    this.groupNotification.Approve = true;
    this.groupNotification.Cancel = true;
  },

  methods: {
    initialData() {
      const general = {
        key1: "排出物区分",
        key2: this.currentWasteClass
      };
      this.searchGeneral(general);

      const param = {
        customerCode: this.currentCustomerCode,
        wasteClass: this.currentWasteClass
      };
      this.getCustomerBranchByWastClass(param);

      const data4 = {
        key1: "車種トン数"
      };
      const data5 = {
        key1: "車種"
      };
      this.getGeneral(data4);
      this.getGeneral(data5);

      const general1 = {
        key1: "数量単位"
      };
      this.getGeneral(general1);

      const general2 = {
        key1: "荷姿"
      };

      this.getGeneral(general2);
      const general3 = {
        key1: "数量確定者"
      };

      this.getGeneral(general3);

      const dataDisposePopUp = {
        key1: "処分方法",
        data5: 1
      };
      this.getGeneral(dataDisposePopUp);
    },

    async getDataContract(data, isCheck) {
      this.message = [];
      if (isCheck) {
        this.contractName = data.contractName;
        this.contractCode = data.contractCode;
        this.isVisible = false;
        await this.getManifestUser();
      }
    },

    async getContractByWasteClass45(data) {
      this.contractName = data.contractName;
      this.contractCode = data.contractCode;
      this.isVisible = false;
      await this.getManifestUser();
      this.$bvModal.hide("fshi0011-contract");
    },

    getManifestUser() {
      const params = {
        customerCode: this.currentCustomerCode,
        param: {
          userTypeCode: 3,
          branchCode: this.currentBranchCode
        }
      };
      this.getManifestUserForCustomer(params);
    },

    getPersonRegistation() {
      const role = current.role();
      if (role === "1") {
        const param = {
          customerCode: this.currentCustomerCode,
          param: {
            agentFlag: true
          }
        };
        return this.getManifestRegistration(param);
      }
      this.entryUserCode = +current.user().userCode;
      return (this.nameRegistation = current.user().userName);
    },

    initParamAdd() {
      const param = {
        CustomerCode: this.currentCustomerCode,
        BranchCode: this.currentBranchCode,
        WasteClass: this.currentWasteClass,
        AutoRegisterFlag: 0,
        DeliveryDate: this.deliveryDate,
        ContractCode: this.contractCode,
        EntryUserCode: this.entryUserCode,
        DeliveryUserCode: this.dischargeInformation.deliveryUserCode,
        SelfDisposeFlag: this.dispose.selfDisposeFlag
          ? this.dispose.selfDisposeFlag
          : null,
        DisposeSupplierCode: this.dispose.supplierCode
          ? this.dispose.supplierCode
          : null,
        DisposeFactoryCode: this.dispose.disposeFactoryCode
          ? this.dispose.disposeFactoryCode
          : null,
        ReentrustFlag: this.disposeFlag.isReentrustFlag,
        ReentrustDisposeSupplierCode: this.dispose.reDisposerCode
          ? this.dispose.reDisposerCode
          : null,
        ReentrustDisposeFactoryCode: this.dispose.reDisposeFactoryCode
          ? this.dispose.reDisposeFactoryCode
          : null,
        DisposeCode: this.dispose.selectedGeneral6,
        FinalDisposeDescFlag: this.disposeEndFlag.isFinalDisposeFlag,
        ContactNumber1: this.dischargeInformation.contractNumber1,
        ContactNumber2: this.dischargeInformation.contractNumber2,
        ContactNumber3: this.dischargeInformation.contractNumber3,
        Memo1: this.remark.memo1,
        Memo2: this.remark.memo2,
        Memo3: this.remark.memo3,
        Memo4: this.remark.memo4,
        Memo5: this.remark.memo5,
        Manifests: this.manifestData(),
        Transports: this.transportData(),
        FinalPlan: this.finalPlanData()
      };

      return param;
    },

    initParamAddManifestBy45() {
      const param = {
        CustomerCode: this.currentCustomerCode,
        BranchCode: this.currentBranchCode,
        DeliveryDate: this.deliveryDate.replace(/-/g, ""),
        WasteClass: this.currentWasteClass,
        ManifestStatus: 4,
        ContractCode: this.contractCode,
        EntryUserCode: this.entryUserCode,
        DeliveryUserCode: this.dischargeInformation.deliveryUserCode,
        Memo1: this.remark.memo1,
        Memo2: this.remark.memo2,
        Memo3: this.remark.memo3,
        Memo4: this.remark.memo4,
        Memo5: this.remark.memo5,
        transportRequests: {
          SectionNumber: 0,
          TransportSupplierCode: this.transportByWaste45[0].transporterCode,
          TransportCode: this.transportByWaste45[0].transportCode,
          TransportStaff: this.transportByWaste45[0].transportStaffCode,
          VehicleTypeTon: this.transportByWaste45[0].vehicleTypeTonValue,
          VehicleType: this.transportByWaste45[0].vehicleTypeValue,
          VehicleNumber: this.transportByWaste45[0].vehicleNumber
        },
        contractWasteRequest: this.emissionByWaste45.map(item => {
          return {
            WasteCode: item.wasteCode,
            UnitQuantity: item.unitQuantity,
            UnitCode: item.unitCode
          };
        })
      };
      return param;
    },

    manifestData() {
      const dataUpdate = this.emssions.filter(item => !item.isOnPopUp);
      if (this.isUpdate) {
        return dataUpdate.map(item => {
          return {
            EntryCode: this.$route.params.manifestNumber,
            WasteCode: item.wasteCode,
            UnitQuantity: item.unitQuantity,
            DecisionCode: item.decisionCode,
            UnitCode: item.unitCode,
            PackCode: item.packCode,
            ToxicCode: item.toxicCode
              ? item.toxicCode.map(item => item.toxicCode)
              : null,
            PackQuantity: item.packQuantity
          };
        });
      }
      return dataUpdate.map(item => {
        return {
          WasteCode: item.wasteCode,
          UnitQuantity: item.unitQuantity,
          DecisionCode: item.decisionCode,
          UnitCode: item.unitCode,
          PackCode: item.packCode,
          ToxicCode: item.toxicCode
            ? item.toxicCode.map(item => item.toxicCode)
            : null,
          PackQuantity: item.packQuantity
        };
      });
    },

    transportData() {
      return this.transports.map(item => {
        return {
          SectionNumber: item.sectionNumber,
          SelfTransportFlag: item.selfTransportFlag,
          TransportSupplierCode: item.transporterCode,
          ReentrustTransportSupplierCode:
            item.reTransporterCode === null
              ? item.transporterCode
              : item.isChecboxed
              ? item.reTransporterCode
              : item.transporterCode,
          TransportCode: item.transportCode,
          TransportStaff: item.transportStaffCode,
          VehicleTypeTon: item.vehicleTypeTonValue,
          VehicleType: item.vehicleTypeValue,
          VehicleNumber: item.vehicleNumber,
          ReentrustFlag: item.isChecboxed
        };
      });
    },

    finalPlanData() {
      return this.disposeEnd.map(item => {
        return {
          SupplierCode: this.dispose.supplierCode
            ? this.dispose.supplierCode
            : null, //get from disposer form
          FactoryCode: this.dispose.disposeFactoryCode
            ? this.dispose.disposeFactoryCode
            : null,
          FinalFactoryCode: item.finalFactoryCode
        };
      });
    },

    onAddRevertation() {
      this.message = [];
      const param = { ...this.initParamAdd() };
      if (param.DeliveryUserCode == 0) {
        this.message.push(Message.ErrorNotNull.formatText("引渡し担当者"));
      } else {
        this.$store
          .dispatch("manifestModule/checkDeliveryDate", this.deliveryDate)
          .then(res => {
            if (res.data) {
              return this.addManifestReservation(this.initParamAdd());
            }
            return this.message.push("引渡し日は不正で、予約できません");
          });
      }
    },

    onAddRegistation() {
      this.message = [];
      const delivery = this.deliveryDate;
      const param = { ...this.initParamAdd() };
      if (param.DeliveryUserCode == 0) {
        this.message.push(Message.ErrorNotNull.formatText("引渡し担当者"));
      } else {
        manifestService.checkDeliveryDateRegistration(delivery).then(res => {
          if (res.data) {
            return this.addManifestRegistration(this.initParamAdd());
          }
          return this.message.push("引渡し日は不正で、予約できません");
        });
      }
    },

    onUpdateManifest() {
      this.message = [];
      const data = {
        ...this.initParamAdd(),
        EventCode: 6,
        manifestClass: this.classManifest,
        ManifestStatus: this.manifestStatus
      };
      this.updateManifest(data);
    },

    onUpdate104() {
      this.message = [];
      const data = {
        ...this.initParamAdd(),
        EventCode: 7,
        manifestClass: this.classManifest,
        ManifestStatus: this.manifestStatus
      };
      this.updateManifest104(data);
    },

    onUpdate100() {
      this.message = [];
      const param = {
        manifestClass: this.classManifest,
        deliveryDate: this.deliveryDate,
        reserveLimit: this.reserveLimit === null ? 0 : this.reserveLimit
      };
      manifestService.checkDeliveryDateUpdate(param).then(res => {
        if (res.data) {
          const pr = { ...this.initParamAdd(), EventCode: 3 };
          return this.updateManifest100(pr);
        }
        return this.message.push("引渡し日は不正です");
      });
    },

    onAddManifest45() {
      this.message = [];
      const param = { ...this.initParamAddManifestBy45() };
      const unit = param.contractWasteRequest.reduce((acc, curr) => {
        if (isNullOrEmpty(curr.UnitQuantity)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      if (param.transportRequests.TransportStaff == null) {
        this.msgWarning = Message.ErrorNotNull.formatText("運搬担当者");
        this.$refs["modal-warning"].showModal();
      } else if (unit.length > 0) {
        this.message.push(Message.ErrorNotNull.formatText("数量"));
      } else {
        this.callApiAddManifest45();
      }
    },

    onOkWarning() {
      this.$refs["modal-warning"].hideModal();
    },

    callApiAddManifest45() {
      const param = { ...this.initParamAddManifestBy45() };
      manifestService
        .addManifest45(param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },

    onUpdateManifest45() {
      const param = {
        ...this.initParamAddManifestBy45(),
        EntryCode: +this.$route.params.manifestNumber
      };
      manifestService
        .updateManifest45(param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },

    onChangeRoute() {
      this.$router.push({
        path: MasterProperty.FSHI0011.SSHI0031.Path,
        name: MasterProperty.FSHI0011.SSHI0031.Name
      });
    },

    onBack() {
      setTimeout(() => {
        if (!this.isReadOnly && this.isChangeData) {
          if (this.showPopupDirtyForm()) {
            this.onChangeRoute();
          }
          return;
        }
        this.onChangeRoute();
      });
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    downLoadBill() {
      const data = {
        customerCode: this.currentCustomerCode,
        entryCode: +this.$route.params.manifestNumber
      };
      this.getBill(data);
    },

    checkDeliveryDate(data) {
      this.message = [];
      if (data) {
        return (this.isShowReservationButton = true);
      }
      return (this.isShowReservationButton = false);
    },

    getTransportAndFinalManifest() {
      const manifest1 = {
        customerCode: this.currentCustomerCode,
        branchCode: this.currentBranchCode,
        entryCode: +this.$route.params.manifestNumber
      };
      this.getTransportManifest(manifest1);
      this.getFinalManifest(manifest1);
      this.getTransportByEntryCode(manifest1);
    },

    showPopUp() {
      this.$bvModal.show("fshi0011-contract");
    },

    searchGeneral(param) {
      this.$store.dispatch("manifestModule/searchGeneral", param);
    },

    getCustomerBranchByWastClass(param) {
      this.$store.dispatch(
        "manifestModule/getCustomerBranchByWasteClass",
        param
      );
    },

    getManifestUserForCustomer(param) {
      this.$store.dispatch("manifestModule/getManifestUserForCustomer", param);
    },
    getManifestRegistration(param) {
      this.$store.dispatch("manifestModule/getManifestRegistration", param);
    },

    getGeneral(param) {
      this.$store.dispatch("manifestModule/searchGeneral", param);
    },

    getTransportManifest(param) {
      this.$store.dispatch("manifestModule/getTransportManifest", param);
    },

    getFinalManifest(param) {
      this.$store.dispatch("manifestModule/getFinalManifest", param);
    },

    getDispose(param) {
      this.$store.dispatch("manifestModule/getDispose", param);
    },

    addManifestReservation(param) {
      this.$store
        .dispatch("manifestModule/addManifestReservation", param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },

    addManifestRegistration(param) {
      this.$store
        .dispatch("manifestModule/addManifestRegistration", param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },
    updateManifest(param) {
      this.$store
        .dispatch("manifestModule/updateManifest", param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },

    updateManifest104(param) {
      manifestService
        .updateManifest104(param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },

    updateManifest100(param) {
      manifestService
        .updateManifest100(param)
        .then(res => {
          if (res.status === HttpStatus.OK && res.data) {
            this.onChangeRoute();
          }
        })
        .catch(err => {
          this.message = this.message.concat(handleOutput.errorHandle(err));
        });
    },

    getTransport(param) {
      this.$store.dispatch("manifestModule/getTransport", param);
    },

    getCustomerBranchWasteForManifest(param) {
      this.$store.dispatch(
        "manifestModule/getCustomerBranchWasteForManifest",
        param
      );
    },

    getManifestByEntryCode(param) {
      this.$store.dispatch("manifestModule/getManifestByEntryCode", param);
    },

    getTransportByEntryCode(param) {
      this.$store.dispatch("manifestModule/getTransportByEntryCode", param);
    },

    getGeneral7(value) {
      const data = {
        key1: "マニフェスト区分",
        key2: value
      };
      this.searchGeneral(data);
    },

    getGeneral8(value) {
      const data = {
        key1: "登録情報承認待ちフラグ",
        key2: value
      };
      this.searchGeneral(data);
    },

    getGeneral9(value) {
      const data = {
        key1: "運搬終了報告済フラグ",
        key2: value
      };
      this.searchGeneral(data);
    },

    getGeneral10(value) {
      const data = {
        key1: "処分終了報告済フラグ",
        key2: value
      };
      this.searchGeneral(data);
    },

    getGeneral11(value) {
      const data = {
        key1: "最終処分終了報告済フラグ",
        key2: value
      };
      this.searchGeneral(data);
    },

    getGeneral12(value) {
      const data = {
        key1: "処分報告情報承認待ちフラグ",
        key2: value
      };
      this.searchGeneral(data);
    },

    getGeneral13(value) {
      const data = {
        key1: "処分終了報告区分",
        key2: value
      };
      this.searchGeneral(data);
    },

    getBill(param) {
      this.$store
        .dispatch("manifestModule/getBill", param)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            const fileName = `受渡確認票(${moment(new Date()).format(
              "YYYY-MM-DD HH:mm:ss"
            )}).xlsx`;
            FileSaver.saveAs(response.data, fileName);
          }
        })
        .catch(err => {});
    },

    destructorObj(arr) {
      return arr.map(item => {
        return {
          value: +item.key2,
          text: item.data1
        };
      });
    },

    onApproveError(data) {
      const param = {
        notifyId: data.item.notifyId,
        notifyType: data.item.notifyType,
        notifyText: data.item.notifyText,
        entryCode: data.item.entryCode,
        eventCode: 8
      };
      this.updateNotificationsError(param);
    },

    onCancelError(data) {
      const param = {
        notifyId: data.item.notifyId,
        notifyType: data.item.notifyType,
        notifyText: data.item.notifyText,
        entryCode: data.item.entryCode,
        eventCode: 9
      };
      this.updateNotificationsError(param);
    },

    updateNotificationsError(param) {
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

    getEmissionByWasteClass45(param) {
      this.$store.dispatch("manifestModule/getEmission45", param);
    },

    getTransportByWaste45(param) {
      this.$store.dispatch("manifestModule/getTransportByWaste45", param);
    },

    getManifestByWaste45(param) {
      this.$store.dispatch("manifestModule/getManifestByWaste45", param);
    },

    onRedirectToScreenContractUpdate() {
      this.$router.push({
        path: MasterProperty.FSHI0010.SSHI0028.Path,
        name: MasterProperty.FSHI0010.SSHI0028.Name,
        params: {
          contractCode: this.contractCode,
          branchCode: this.currentBranchCode,
          wasteClass: this.currentWasteClass
        }
      });
    }
  },

  computed: {
    titleForm() {
      return this.$store.state.manifestModule.general;
    },

    options() {
      return this.$store.state.manifestModule.byWasteClass;
    },

    manifestUser() {
      return this.$store.state.manifestModule.manifestUser;
    },

    manifestRegistration() {
      return this.$store.state.manifestModule.manifestRegistration;
    },

    data4() {
      return this.$store.state.manifestModule.general4;
    },

    data5() {
      return this.$store.state.manifestModule.general5;
    },

    transportManifest() {
      return this.$store.state.manifestModule.transportManifest;
    },

    finalManifest() {
      return this.$store.state.manifestModule.finalManifest;
    },

    data1() {
      return this.$store.state.manifestModule.general1;
    },

    data2() {
      return this.$store.state.manifestModule.general2;
    },

    data3() {
      return this.$store.state.manifestModule.general3;
    },

    data6() {
      return this.$store.state.manifestModule.general6;
    },

    data7() {
      return this.$store.state.manifestModule.general7;
    },

    data8() {
      return this.$store.state.manifestModule.general8;
    },

    data9() {
      return this.$store.state.manifestModule.general9;
    },

    data10() {
      return this.$store.state.manifestModule.general10;
    },

    data11() {
      return this.$store.state.manifestModule.general11;
    },

    data12() {
      return this.$store.state.manifestModule.general12;
    },

    data13() {
      return this.$store.state.manifestModule.general13;
    },

    dataDispose() {
      return this.$store.state.manifestModule.dispose;
    },

    dataTransport() {
      return this.$store.state.manifestModule.transport;
    },

    dataCustomerBranchWaste() {
      return this.$store.state.manifestModule.customerBranchWaste;
    },

    dataEmissionSelection() {
      return this.$store.state.manifestModule.emission;
    },

    dataSelectionPopUp() {
      return this.$store.state.manifestModule.disposeFinalSelectionPopUp;
    },

    dataManifestByEntryCode() {
      return this.$store.state.manifestModule.getManifestByEntryCode;
    },

    dataTransportByEntryCode() {
      return this.$store.state.manifestModule.getTransportByEntryCode;
    },

    ...mapGetters({
      dataError: "notificationModule/setDataError"
    }),

    dataTransportByWaste45() {
      return this.$store.state.manifestModule.transportByWaste45;
    },

    dataEmissionByWaste45() {
      return this.$store.state.manifestModule.emission45;
    },

    dataManifestByWaste45() {
      return this.$store.state.manifestModule.manifestByWaste45;
    },

    dataSelectionPopTransport45() {
      return this.$store.state.manifestModule.transposterPopUp45Selection;
    },

    emissionPopUp45() {
      return this.$store.state.manifestModule.dataEmissionPopUp;
    },

    emissionPopUp123() {
      return this.$store.state.manifestModule.dataEmissionPopUp;
    },

    dirtyForm() {
      return this.$store.state.manifestModule.isDirty;
    }
  },

  watch: {
    dirtyForm() {
      this.isChangeData = this.dirtyForm;
    },

    dataSelectionPopTransport45() {
      this.transportByWaste45 = this.dataSelectionPopTransport45;
    },

    emissionPopUp123() {
      const result = this.emissionPopUp123.map((item, index) => {
        return { ...item, id: index + 1 + this.countEmission };
      });
      const data = result.map(item => item.wasteCode);
      this.emssions = this.emssions.filter(item => {
        return !data.includes(item.wasteCode);
      });
      this.emssions = [...this.emssions, ...result];
    },

    emissionPopUp45() {
      const data = this.emissionPopUp45.map(item => {
        return {
          ...item,
          customerCode: this.currentCustomerCode,
          branchCode: this.currentBranchCode,
          contractCode: this.contractCode,
          wasteClass: this.currentWasteClass
        };
      });
      this.emissionByWaste45 = [...this.emissionByWaste45, ...data];
    },

    titleForm() {
      this.title =
        this.titleForm.length > 0 && this.titleForm[0].data1
          ? this.titleForm[0].data1
          : "";
    },

    manifestUser() {
      this.manifestByCustumer = common.destructorObj(this.manifestUser);
    },

    manifestRegistration() {
      if (this.manifestRegistration.length > 0) {
        this.entryUserCode = +this.manifestRegistration[0].userCode;
        this.nameRegistation = this.manifestRegistration[0].userName;
      }
    },

    data4() {
      this.general4 = this.destructorObj(this.data4);
    },

    data5() {
      this.general5 = this.destructorObj(this.data5);
    },

    transportManifest() {
      this.transport = this.transportManifest;
    },

    data1() {
      this.general1 = this.destructorObj(this.data1);
    },

    data2() {
      this.general2 = this.destructorObj(this.data2);
    },

    data3() {
      this.general3 = this.destructorObj(this.data3);
    },
    data6() {
      this.general6 = this.data6.map(item => {
        return {
          value: +item.data4,
          text: isNullOrEmpty(item.data3) ? item.data2 : item.data3
        };
      });
    },

    data7() {
      if (this.data7.length > 0) {
        this.manifestState.manifestClass = this.data7[0].data1;
      }
    },

    data8() {
      if (this.data8.length > 0) {
        this.manifestState.modifyPendingFlag = this.data8[0].data1;
      }
    },

    data9() {
      if (this.data9.length > 0) {
        this.manifestState.transportReportFlag = this.data9[0].data1;
      }
    },

    data10() {
      if (this.data10.length > 0) {
        this.manifestState.disposeReportFlag = this.data10[0].data1;
      }
    },

    data11() {
      if (this.data11.length > 0) {
        this.manifestState.finalDispodeReportFlag = this.data11[0].data1;
      }
    },

    data12() {
      if (this.data12.length > 0) {
        this.reportDispose.disposeReportPendingFlag = this.data12[0].data1;
      }
    },

    data13() {
      if (this.data13.length > 0) {
        this.reportDispose.disposeReportCode = this.data13[0].data1;
      }
    },
    dataDispose() {
      if (this.dataDispose.length > 0) {
        this.dispose = this.dataDispose.map(item => {
          return {
            ...item,
            selectedGeneral6: item.disposeCode,
            isReentrustFlag: false
          };
        })[0];
      }
    },

    dataTransport() {
      this.transports = this.dataTransport.map(item => {
        return {
          ...item,
          isChecboxed: false,
          transportStaffCode: null,
          vehicleTypeTonValue: null,
          vehicleTypeValue: null,
          transportstaff: item.users.map(result => {
            return {
              id: result.userCode,
              text: result.userName
            };
          }),
          vehicle: {
            vehicleTypeTon: this.general4,
            vehicleType: this.general5
          },
          vehicleNumber: null
        };
      });
    },

    dataTransportByEntryCode() {
      this.transports = this.dataTransportByEntryCode.map(item => {
        return {
          ...item,
          isChecboxed: item.reentrustFlag === 1 ? true : false,
          transportStaffCode: item.transportStaff,
          vehicleTypeTonValue: item.vehicleTypeTon,
          vehicleTypeValue: item.vehicleType,
          transportstaff: item.users.map(result => {
            return {
              id: result.userCode,
              text: result.userName
            };
          }),
          vehicle: {
            vehicleTypeTon: this.general4,
            vehicleType: this.general5
          },
          vehicleNumber: item.vehicleNumber
        };
      });
    },

    dataCustomerBranchWaste() {
      this.countEmission = this.dataCustomerBranchWaste.length;
      this.emssions = this.dataCustomerBranchWaste.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          packCode: this.general2[
            this.general2.findIndex(item => item.text === "バラ")
          ].value,
          decisionCode: this.general3[
            this.general3.findIndex(item => item.text === "処分業者")
          ].value,
          unit: this.general1,
          pack: this.general2,
          decision: this.general3,
          listToxic: [],
          isOnPopUp: false
        };
      });
    },

    currentBranchCode() {
      const disposal = {
        customerCode: this.currentCustomerCode,
        branchCode: this.currentBranchCode,
        contractCode: this.contractCode
      };
      const param = {
        customerCode: this.currentCustomerCode,
        branchCode: this.currentBranchCode,
        contractCode: this.contractCode,
        wasteClass: this.currentWasteClass
      };
      this.getManifestUser();
      if (!this.isUpdate) {
        if (this.isManifest45) {
          this.getEmissionByWasteClass45(param);
        }
        if (!this.isManifest45) {
          this.getDispose(disposal);
          this.getTransport(disposal);
        }
        this.getCustomerBranchWasteForManifest(param);
        this.getTransportByWaste45(disposal);
      }
    },

    contractCode() {
      const disposal = {
        customerCode: this.currentCustomerCode,
        branchCode: this.currentBranchCode,
        contractCode: this.contractCode
      };
      const param = {
        customerCode: this.currentCustomerCode,
        branchCode: this.currentBranchCode,
        contractCode: this.contractCode,
        wasteClass: this.currentWasteClass
      };
      if (!this.isUpdate) {
        if (this.isManifest45) {
          this.getEmissionByWasteClass45(param);
        }
        if (!this.isManifest45) {
          this.getDispose(disposal);
          this.getTransport(disposal);
        }
        this.getTransportByWaste45(disposal);
        this.getCustomerBranchWasteForManifest(param);
      }
    },

    dataSelectionPopUp() {
      const data = this.dataSelectionPopUp.map(item => item.finalFactoryCode);
      this.disposeEnd = this.disposeEnd.filter(item => {
        return !data.includes(item.finalFactoryCode);
      });
      if (data.length > 0) {
        this.disposeEnd = [...this.disposeEnd, ...this.dataSelectionPopUp];
      }
    },

    finalManifest() {
      this.final = this.finalManifest.map((item, index) => {
        return {
          ...item,
          id: index
        };
      });
    },

    dataEmissionByWaste45() {
      this.emissionByWaste45 = this.dataEmissionByWaste45.map(item => {
        return {
          ...item,
          unit: this.general1
        };
      });
    },

    dataTransportByWaste45() {
      this.transportByWaste45 = this.dataTransportByWaste45.map(item => {
        return {
          ...item,
          vehicle: {
            vehicleTypeTon: this.general4,
            vehicleType: this.general5
          },
          vehicleNumber: null,
          vehicleTypeTonValue: null,
          vehicleTypeValue: null,
          transportStaff: item.users.map(result => {
            return {
              id: result.userCode,
              text: result.userName
            };
          }),
          transportStaffCode: null
        };
      });
    },

    dataManifestByEntryCode() {
      if (this.dataManifestByEntryCode.length) {
        this.manifestByEntryCode = [...this.dataManifestByEntryCode][0];
        this.getGeneral7(this.manifestByEntryCode.manifestClass);
        this.getGeneral8(this.manifestByEntryCode.modifyPendingFlag);
        this.getGeneral9(this.manifestByEntryCode.transportReportFlag);
        this.getGeneral10(this.manifestByEntryCode.disposeReportFlag);
        this.getGeneral11(this.manifestByEntryCode.finalDispodeReportFlag);
        this.getGeneral12(this.manifestByEntryCode.disposeReportPendingFlag);
        this.getGeneral13(this.manifestByEntryCode.disposeReportCode);
        this.isShowCheckBoxDeivery =
          this.manifestByEntryCode.manifestClass == 1 ? true : false;
        this.classManifest = this.manifestByEntryCode.manifestClass;
        this.manifestStatus = this.manifestByEntryCode.manifestStatus;
        this.reserveLimit = this.manifestByEntryCode.reserveLimit;
        this.branchName = this.manifestByEntryCode.branchName;
        this.contractName = this.manifestByEntryCode.contractName;
        this.currentBranchCode = this.manifestByEntryCode.branchCode;
        this.contractCode = this.manifestByEntryCode.contractCode;
        this.deliveryDate = moment(
          String(this.manifestByEntryCode.deliveryDate)
        ).format("YYYY-MM-DD");
        this.getPersonRegistation();
        this.dischargeInformation = {
          status: this.manifestByEntryCode.status,
          contractNumber1: this.manifestByEntryCode.contactNumber1,
          contractNumber2: this.manifestByEntryCode.contactNumber2,
          contractNumber3: this.manifestByEntryCode.contactNumber3,
          deliveryUserCode: this.manifestByEntryCode.deliveryUserCode,
          manifestNumber: this.manifestByEntryCode.manifestNumber
        };
        this.emssions = [
          {
            id: 1,
            bigName: this.manifestByEntryCode.bigName,
            wasteCode: this.manifestByEntryCode.wasteCode, //1200000
            wasteName: this.manifestByEntryCode.wasteName,
            unitCode: this.manifestByEntryCode.unitCode,
            toxicCode: this.manifestByEntryCode.listToxic,
            listToxic: this.manifestByEntryCode.listToxic,
            unitQuantity: this.manifestByEntryCode.unitQuantity,
            packQuantity: this.manifestByEntryCode.packQuantity,
            packCode: this.manifestByEntryCode.packCode,
            decisionCode: this.manifestByEntryCode.decisionCode,
            unit: this.general1,
            pack: this.general2,
            decision: this.general3,
            isOnPopUp: false
          }
        ];
        this.disposeFlag.isReentrustFlag =
          this.manifestByEntryCode.reenTrustFlag === 1 ? true : false;
        this.dispose = {
          disposerName: this.manifestByEntryCode.disposeName,
          disposeFactoryName: this.manifestByEntryCode.factoryName,
          reDisposerName: this.manifestByEntryCode.reDisposerName,
          reDisposeFactoryName: this.manifestByEntryCode.reFactoryName,
          selectedGeneral6: this.manifestByEntryCode.disposeCode,
          disposeCode: this.manifestByEntryCode.disposeCode,
          disposeFactoryCode: this.manifestByEntryCode.disposeFactoryCode,
          supplierCode: this.manifestByEntryCode.disposeSupplierCode,
          reDisposerCode: this.manifestByEntryCode.reenTrustDisposeSupplierCode,
          reDisposeFactoryCode: this.manifestByEntryCode
            .reenTrustDisposeFactoryCode
        };

        this.remark = {
          memo1: this.manifestByEntryCode.memo1,
          memo2: this.manifestByEntryCode.memo2,
          memo3: this.manifestByEntryCode.memo3,
          memo4: this.manifestByEntryCode.memo4,
          memo5: this.manifestByEntryCode.memo5
        };
        this.getTransportAndFinalManifest();
        this.disposeEndFlag.isFinalDisposeFlag =
          this.manifestByEntryCode.finalDisposeDescFlag === 1 ? true : false;
        this.manifestState.confirmQuantity = this.manifestByEntryCode.confirmQuantity;
        this.reportDispose = {
          disposeDate: this.manifestByEntryCode.disposeDate,
          acceptDate: this.manifestByEntryCode.acceptDate,
          acceptQuantity: this.manifestByEntryCode.acceptQuantity,
          disposeStaff: this.manifestByEntryCode.disposeStaff,
          transportStaff: this.manifestByEntryCode.transportStaff,
          vehicleNumber: this.manifestByEntryCode.vehicleNumber,
          disposeReportDate: this.manifestByEntryCode.disposeReportDate,
          reportStaff: this.manifestByEntryCode.reportStaff,
          finalDisposeDate: this.manifestByEntryCode.finalDisposeDate,
          finalDisposeReportDate: this.manifestByEntryCode
            .finalDisposeReportDate
        };
        this.reportDeadline = {
          disposeReportLimit: this.manifestByEntryCode.disposeReportLimit,
          finalDisposeReportLimit: this.manifestByEntryCode
            .finalDisposeReportLimit,
          reserveLimit: this.manifestByEntryCode.reserveLimit
        };
        this.update = {
          createDate: this.manifestByEntryCode.createDate,
          lastDate: this.manifestByEntryCode.lastDate,
          jwnetEntryDate: this.manifestByEntryCode.jwnetEntryDate,
          jwnetModifyDate: this.manifestByEntryCode.jwnetModifyDate,
          jwnetCancelDate: this.manifestByEntryCode.jwnetCancelDate,
          jwnetLastUpdate: this.manifestByEntryCode.jwnetLastUpdate
        };
      }
    },

    dataManifestByWaste45() {
      this.manifestByWaste45 = { ...this.dataManifestByWaste45 };
      this.branchName = this.manifestByWaste45.branchName;
      this.contractName = this.manifestByWaste45.contractName;
      this.currentBranchCode = this.manifestByWaste45.branchCode;
      this.contractCode = this.manifestByWaste45.contractCode;
      this.nameRegistation = this.manifestByWaste45.u2UserName;
      this.entryCode45 = this.manifestByWaste45.entryCode;
      this.entryUserCode = this.manifestByWaste45.entryUserCode;
      this.deliveryDate = moment(
        String(this.manifestByWaste45.deliveryDate)
      ).format("YYYY-MM-DD");
      this.dischargeInformation = {
        deliveryUserCode: this.manifestByWaste45.deliveryUserCode
      };
      const transport45 = {
        transporterName: this.manifestByWaste45.supplierName,
        transporterCode: this.manifestByWaste45.transportterCode,
        transportCode: this.manifestByWaste45.transportCode,
        data1: this.manifestByWaste45.g1Data1,
        vehicle: {
          vehicleTypeTon: this.general4,
          vehicleType: this.general5
        },
        vehicleNumber: this.manifestByWaste45.vehicleNumber,
        vehicleTypeTonValue: +this.manifestByWaste45.vehicleTypeTon,
        vehicleTypeValue: +this.manifestByWaste45.vehicleType,
        transportStaff: this.manifestByWaste45.users.map(result => {
          return {
            id: result.userCode,
            text: result.userName
          };
        }),
        transportStaffCode: this.manifestByWaste45.transportStaff
      };
      this.transportByWaste45.push(transport45);

      const emission45 = {
        sectionNumber: 0.0,
        wasteClass: this.manifestByWaste45.wasteClass,
        data1: this.manifestByWaste45.g2Data1,
        wasteCode: this.manifestByWaste45.wasteCode,
        wasteName: this.manifestByWaste45.wasteName,
        unitCode: this.manifestByWaste45.unitCode,
        unitQuantity: this.manifestByWaste45.unitQuanlity,
        unitCost: this.manifestByWaste45.unitCost,
        collectCycle: this.manifestByWaste45.collectCycle,
        unit: this.general1
      };
      this.emissionByWaste45.push(emission45);
      this.date = {
        createDate: this.manifestByWaste45.createDate,
        lastUpdate: this.manifestByWaste45.lastUpdate
      };
      this.remark = {
        memo1: this.manifestByWaste45.memo1,
        memo2: this.manifestByWaste45.memo2,
        memo3: this.manifestByWaste45.memo3,
        memo4: this.manifestByWaste45.memo4,
        memo5: this.manifestByWaste45.memo5
      };
    },

    deliveryDate() {
      if (
        isNullOrEmpty(this.deliveryDate) ||
        this.deliveryDate === "Invalid date"
      ) {
        this.disabledChooseContract = true;
      } else {
        this.disabledChooseContract = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.flex .classContract {
  display: block;
  width: 100%;
  max-width: 300px;
  background-color: #ccc;
  background-clip: padding-box;
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
</style>
