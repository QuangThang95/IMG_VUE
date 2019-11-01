<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <ContractFormDetail
        v-if="!isReadOnly"
        ref="contractFormDetail"
        :wasteClass="param.wasteClass"
        :detailData="contractData"
        :listBranch="listBranch"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        :visibleRequired="visibleRequired"
        :isChange="isChange"
        @onShowError="onShowError"
        @onBack="onBack"
      />

      <ContractFormDetailReadOnly
        :wasteClass="param.wasteClass"
        :detailData="contractData"
        :listBranch="listBranch"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        :visibleRequired="visibleRequired"
        @onShowError="onShowError"
        @onBack="onBack"
        v-else
      />
      <div class="grid-screen" v-if="imgStatus">
        <b-tabs content-class="mt-3">
          <b-tab disabled></b-tab>
          <b-tab title="個別契約">
            <ContractTab
              :imgStatus="imgStatus"
              :readOnly="isReadOnly"
              :dataTable="dataTable"
              :enableAdd="enableAdd"
              @onAddContractPart="onAddContractPart"
              @onUpdateContractPart="onUpdateContractPart"
              @onDeleteContractPart="onDeleteContractPart"
              @onSelectContractPart="onSelectContractPart"
            />
          </b-tab>
        </b-tabs>
      </div>
      <BaseButtonGroupPermission
        :isPopup="isPopup"
        :imgStatus="imgStatus"
        :isReadOnly="isReadOnly"
        :hiddenCopy="false"
        @onAddUpdate="onAddUpdate"
        @onBack="onBack"
        @onCopy="onCopyConfirm"
      />
    </b-container>

    <BaseProcessing :openDl="openDl" />
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onCopy"
    />
  </div>
</template>

<script>
import moment from "moment";
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BaseMessageError from "@/components/BaseMessageError";
import BaseProcessing from "@/components/BaseProcessing";
import ContractFormDetail from "../contract-details/contract-form-detail";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import ContractFormDetailReadOnly from "../contract-details/contract-details-readonly";
import ContractTab from "@/views/contract/contract-tabs/contract-part-tab";
import CountCharacter from "@/shared/CountCharacter";
import {
  isNullOrEmpty,
  navigation,
  handleOutput,
  current,
  common,
  canAction
} from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import { Message } from "@/constants/Message";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseMessageError,
    ContractFormDetail,
    BaseButtonGroupPermission,
    BaseTable,
    BaseProcessing,
    ContractTab,
    BasePopupMessage,
    ContractFormDetailReadOnly
  },
  data() {
    return {
      imgText: IMText,
      title: IMText.title.sshi0027,
      param: {
        wasteClass: 0,
        contractCode: 0,
        branchCode: 0
      },
      contractData: {
        branchCode: null,
        branchName: null,
        customerCode: current.customer().customerCode,
        contractName: "",
        decisionCode: null,
        memo: "",
        createDate: undefined,
        lastUpdate: undefined
      },
      message: [],
      imgStatus: false,
      isPopup: false,
      openDl: false,
      isReadOnly: false,
      currentCustomer: current.customer(),
      visibleRequired: {
        jwnetNumber: false,
        ediKey: false
      },
      enableAdd: false,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      isChange: {}
    };
  },

  async created() {
    this.onBeforeUnLoad();
    this.param.wasteClass = +this.$route.params.wasteClass;
    this.param.wasteClass = common.getWasteClass(this.param.wasteClass);
    this.param.contractCode = +this.$route.params.contractCode;
    this.param.branchCode = +this.$route.params.branchCode;

    if (this.param.contractCode > 0 && this.param.branchCode > 0) {
      const param = this.initParam();
      await this.$store.dispatch("contractModule/getContractDetail", param);

      const data = this.$store.getters["contractModule/getContractDetail"];
      this.contractData = data != null ? data : this.contractData;
      await this.initUpdateData(param);
      if (canAction(Action.Update, Screen.SSHI0026)) {
        this.isReadOnly = false;
      } else if (canAction(Action.Read, Screen.SSHI0026)) {
        this.message = [];
        this.isReadOnly = true;
      }
    } else {
      this.imgStatus = false;
      this.isReadOnly = false;
      this.title = this.imgText.title.sshi0027;
    }
    await this.getBranchByWasteClass();
    this.openDl = false;
  },

  methods: {
    async initUpdateData(param) {
      this.isChange = {};
      this.message = [];
      this.imgStatus = true;
      this.isReadOnly = false;
      this.openDl = true;
      this.title = this.imgText.title.sshi0028;
      if (this.contractData.contractStatus === 0) {
        this.message.push(Message.E10043);
        this.enableAdd = true;
      } else {
        this.enableAdd = false;
      }
      await this.$store
        .dispatch("contractModule/getContractPart", param)
        .finally(() => {
          this.openDl = false;
        });
    },

    initParam() {
      const param = {
        customerCode: this.currentCustomer.customerCode,
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode
      };
      return param;
    },

    onShowError(error) {
      this.message = [error];
    },

    onAddUpdate() {
      const contract = this.$refs["contractFormDetail"].getFormData();
      if (this.onValidate(contract)) {
        this.message = [];
        if (this.imgStatus) {
          this.$store
            .dispatch("contractModule/updateContract", contract)
            .then(res => {
              if (res.data && res.data.contractCode) {
                current.setWasteClass(this.param.wasteClass);
                navigation.sshi0026();
              }
            })
            .catch(error => {
              this.message = this.message.concat(
                handleOutput.errorHandle(error)
              );
            });
        } else {
          this.$store
            .dispatch("contractModule/addContract", contract)
            .then(res => {
              if (res.data) {
                navigation.sshi0028(res.data);
                this.contractData = res.data;
                this.param.contractCode = this.contractData.contractCode;
                this.param.branchCode = this.contractData.branchCode;
                const param = this.initParam();
                this.initUpdateData(param);
              }
            })
            .catch(error => {
              this.message = this.message.concat(
                handleOutput.errorHandle(error)
              );
            });
        }
      }
    },

    onCopy() {
      this.$refs["modal-confirm"].hideModal();
      const param = {
        customerCode: this.currentCustomer.customerCode,
        branchCode: this.contractData.branchCode,
        contractCode: this.contractData.contractCode
      };
      this.$store
        .dispatch("contractModule/copyContract", param)
        .then(res => {
          if (res.data) {
            this.contractData = res.data;
            navigation.sshi0028(this.contractData);
            const param = {
              customerCode: this.currentCustomer.customerCode,
              branchCode: this.contractData.branchCode,
              contractCode: this.contractData.contractCode
            };
            this.initUpdateData(param);
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    },

    onCopyConfirm() {
      this.titlePopupCustom = this.imgText.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgText.popup.confirmMsg.formatText(
        this.imgText.general.btnCopy
      );
      this.$refs["modal-confirm"].showModal();
    },

    onAddContractPart() {
      const param = {
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode,
        wasteClass: this.param.wasteClass
      };
      navigation.sshi0029Add(param);
    },

    onUpdateContractPart(data) {
      const param = {
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode,
        wasteClass: this.param.wasteClass,
        sectionNumber: data.sectionNumber
      };
      navigation.sshi0029Update(param);
    },

    onSelectContractPart(data) {
      const param = {
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode,
        wasteClass: this.param.wasteClass,
        sectionNumber: data.sectionNumber
      };
      navigation.sshi0029Detail(param);
    },

    async onDeleteContractPart(data) {
      const param = {
        customerCode: this.currentCustomer.customerCode,
        branchCode: this.param.branchCode,
        contractCode: this.param.contractCode,
        sectionNumber: data.sectionNumber
      };
      await this.$store
        .dispatch("contractModule/deleteContractPart", param)
        .then(res => {
          if (res && res.data) {
            this.$store.dispatch("contractModule/getContractPart", param);
          }
        })
        .catch(error => {
          this.message = [];
          this.message = this.message.concat(handleOutput.errorHandle(error));
        });
    },

    onValidate(data) {
      this.message = [];
      let validationResult = true;
      if (isNullOrEmpty(data.branchCode)) {
        this.message.push(Message.E00023.formatText("事業場"));
        validationResult = false;
      }

      if (isNullOrEmpty(data.contractName)) {
        this.message.push(Message.E00023.formatText("契約名"));
        validationResult = false;
      }
      return validationResult;
    },

    async getBranchByWasteClass() {
      await this.$store.dispatch("customerBranchModule/getBranchByWasteClass", {
        customerCode: this.currentCustomer.customerCode,
        wasteClass: this.param.wasteClass
      });
    },

    isChangeData() {
      return this.$refs["contractFormDetail"].canDeactivate();
    },

    onBack() {
      current.setWasteClass(this.param.wasteClass);
      if (!this.isReadOnly && this.isChangeData()) {
        if (common.showPopupDirtyForm()) {
          navigation.sshi0026();
        }
        return;
      }
      navigation.sshi0026();
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData()) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }
  },

  computed: {
    ...mapGetters({
      dataTable: "contractModule/getContractPart",
      listBranch: "customerBranchModule/getBranchByWasteClass"
    })
  },

  watch: {
    dataTable() {
      if (this.dataTable.length < 1) {
        this.enableAdd = true;
      }
    }
  }
};
</script>
