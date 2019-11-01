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
      <FactoryDetail
        v-if="!isReadOnly"
        ref="factoryDetail"
        :items="factory"
        @onSearchAddress="onSearchAddress"
        :imgStatus="imgStatus"
        :itemsDataDropHeader="dataDropHeader"
        :permissionGroup="permissionGroup"
        :isReadOnly="isReadOnly"
        :selected="selected"
        :isChange="isChange"
        @checkPopupAddress="checkPopupAddress"
      />
      <FactoryDetailReadOnly
        v-if="isReadOnly"
        ref="factoryDetail"
        :items="factory"
        @onSearchAddress="onSearchAddress"
        :imgStatus="imgStatus"
        :itemsDataDropHeader="dataDropHeader"
        :permissionGroup="permissionGroup"
        :isReadOnly="isReadOnly"
        :selected="selected"
        @checkPopupAddress="checkPopupAddress"
      />

      <div class="grid-screen" v-if="imgStatus == true">
        <b-tabs content-class="mt-3" @input="getCurrentTab">
          <b-tab :title="Tab1" @click="onClickTab(0)" active>
            <FactoryTab1
              :itemsfactoryNumberName="factoryNumberName"
              :permissionGroup="permissionGroup"
              :isReadOnly="isReadOnly"
              @resetListTab1="resetListTab1"
              :itemsFactoryLicenseGeneral="factoryLicenseGeneral"
              @onDeleteTab1="onDeleteTab1"
              :pageCount="pageCountTab1"
              :count="countTab1"
              :pageSize="pageSize"
              @getPageSizeTab1="getPageSizeTab1"
              @closeSortTab1="closeSortTab1"
              @onSortingTab1="onSortingTab1"
              @getCurrentPageTab1="getCurrentPageTab1"
            />
          </b-tab>
          <b-tab :title="Tab2" @click="onClickTab(1)">
            <FactoryTab2
              :itemsfactoryNumberName="factoryNumberName"
              :permissionGroup="permissionGroup"
              :isReadOnly="isReadOnly"
              @resetListTab2="resetListTab2"
              :itemsFactoryFinal="factoryFinal"
              :pageCountTab2="pageCountTab2"
              :countTab2="countTab2"
              :pageSizeTab2="pageSize"
              @onDeleteTab2="onDeleteTab2"
              @getPageSizeTab2="getPageSizeTab2"
              @closeSortTab2="closeSortTab2"
              @onSortingTab2="onSortingTab2"
              @getCurrentPageTab2="getCurrentPageTab2"
            />
          </b-tab>
          <b-tab :title="Tab3" @click="onClickTab(2)">
            <FactoryTab3
              :dataTable="attachSupplierFile"
              :isReadOnly="isReadOnly"
              :permissionGroup="permissionGroup"
              @uploadFile="uploadFile"
              @deleteFile="deleteFile"
              @dowloadFile="dowloadFile"
              :pageCountTab3="pageCountTab3"
              :countTab3="countTab3"
              :pageSizeTab3="pageSize"
              @getCurrentPageTab3="getCurrentPageTab3"
              @getPageSizeTab3="getPageSizeTab3"
            />
          </b-tab>
        </b-tabs>
      </div>
      <BaseButtonGroupPermission
        :isPopup="isPopup"
        :imgStatus="imgStatus"
        @onAddUpdate="onAddUpdate"
        @onBack="onBack"
        :isReadOnly="isReadOnly"
      />
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseMessageError from "@/components/BaseMessageError";
import FactoryDetail from "../factory-details/factory-details-header";
import FactoryDetailReadOnly from "../factory-details/factory-details-readonly";
import FactoryTab1 from "../factory-details-tab/factory-detail-tab1";
import FactoryTab2 from "../factory-details-tab/factory-detail-tab2";
import FactoryTab3 from "../factory-details-tab/factory-detail-tab3";
import IMText from "@/data/img-text";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import { mapGetters } from "vuex";
import BaseProcessing from "@/components/BaseProcessing";
import BaseTableError from "@/components/BaseTableError.vue";
import FileSaver from "file-saver";

import {
  current,
  navigation,
  common,
  canAction,
  isNumber,
  isNullOfEmpty,
  isNullOrEmpty,
  isNullOrUndefined,
  handleOutput
} from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import { Message } from "@/constants/Message";
import CountCharacter from "@/shared/CountCharacter";
import { Factory } from "@/models/factory.model";
import HttpStatus from "http-status-codes";
import { MasterProperty } from "@/shared/MasterProperty";
import moment from "moment";
import FormatData from "@/shared/FomatData";
export default {
  components: {
    BaseMessageError,
    FactoryDetail,
    FactoryDetailReadOnly,
    FactoryTab1,
    FactoryTab2,
    FactoryTab3,
    BaseButtonGroupPermission,
    BaseProcessing,
    BaseTableError
  },
  data() {
    return {
      imgText: IMText,
      Tab1: "処分業許可",
      Tab2: "最終処分事業場",
      Tab3: "取引先データ",
      message: [],
      title: "",
      imgStatus: false,
      isPopup: false,
      currentCustomerCode: current.customer().customerCode,
      factoryCode: "",
      supplierCode: "",
      factoryNumberName: {
        factoryNumber: "",
        factoryName: "",
        supplierName: "",
        factoryCode: 0,
        supplierCode: 0,
        customerCode: 0
      },
      dataDropHeader: [],
      selected: null,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      isReadOnly: true,
      newFactory: new Factory(),
      factory: {
        customerCode: "",
        supplierCode: "",
        factoryCode: 1,
        factoryNumber: "",
        factoryClass: "",
        factoryName: "",
        factoryKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address: "",
        tel: "",
        reportFlag: "",
        jwnetNumber: "",
        jwnetPassword: "",
        jwnetFactoryCode: "",
        memo: "",
        deleteFlag: 0,
        supplierNumber: null,
        supplierName: ""
      },
      popupStatusTab2: false,
      popupStatusTab1: false,
      dataFactoryFinal: {},
      messageFinal: [],
      messageLicense: [],
      openDl: false,
      checkAddress: "",
      factoryLicenseGeneral: [],
      factoryFinal: [],
      attachSupplierFile: [],
      supplierFile: [],
      fileName: "",
      countTab1: 0,
      pageCountTab1: 0,
      countTab2: 0,
      pageCountTab2: 0,
      countTab3: 0,
      pageCountTab3: 0,
      currentTab: 0,
      pages: AppConfig.Pages,
      pageSize: 10,
      dataSelect: "",
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
      groupNotification: lodash.cloneDeep(AppConfig.GroupNotification),
      tableErrorId: "sshi0012-table-get-error",
      isChange: {}
    };
  },
  async created() {
    await this.getDataDropHeader();
    this.factoryCode = +this.$route.params.factoryCode;
    this.supplierCode = +this.$route.params.supplierCode;
    const params = {
      customerCode: this.currentCustomerCode,
      supplierCode: this.supplierCode,
      factoryCode: this.factoryCode
    };
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0016);
    if (this.factoryCode > 0 && this.supplierCode > 0) {
      await this.getDetails(params);
      await this.loadDataTab1(params);
      await this.loadDataTab2(params);
      await this.getAttachSupplierFile(params);
      this.imgStatus = true;
      if (canAction(Action.Update, Screen.SSHI0016)) {
        this.title = "処分事業場変更";
        this.permissionGroup.Update = true;
        this.isReadOnly = false;
      } else if (canAction(Action.Read, Screen.SSHI0016)) {
        this.title = "処分事業場参照";
        this.permissionGroup.Read = true;
        this.isReadOnly = true;
      }
      if (canAction(Action.Delete, Screen.SSHI0016)) {
        this.permissionGroup.Delete = true;
      }
    } else {
      this.imgStatus = false;
      this.isReadOnly = false;
      this.title = "処分事業場追加";
    }
    this.groupNotification.Update = true;
  },
  methods: {
    onAddUpdate() {
      this.message = [];
      this.factory = this.$refs["factoryDetail"].getData();
      this.newFactory = { ...this.factory };
      if (this.newFactory.reportFlag != null) {
        this.newFactory.reportFlag = this.factory.reportFlag ? 1 : 0;
      }
      this.newFactory.customerCode = this.currentCustomerCode;
      this.onValidate();
      if (!this.message.length) {
        this.onDispath(this.newFactory);
      }
    },

    onValidate() {
      var jwnetFactoryCode = String(this.factory.jwnetFactoryCode);
      if (isNullOrEmpty(this.factory.supplierName)) {
        this.message.push(Message.E00023.formatText("業者名"));
      }
      if (isNullOrEmpty(this.factory.factoryName)) {
        this.message.push(Message.E00023.formatText("事業場名"));
      }
      // Check JWZH
      else if (!CountCharacter.isJWZH(this.factory.factoryName)) {
        this.message.push(Message.E00014.formatText("事業場名"));
      }

      // Customer Kana
      if (
        !isNullOrEmpty(this.factory.factoryKana) &&
        !CountCharacter.isKatakanaHasSpace(this.factory.factoryKana)
      ) {
        this.message.push(Message.E00028.formatText("事業場名カナ"));
      }

      // PostalCode
      if (
        !isNullOrEmpty(this.factory.postalCode) &&
        !CountCharacter.isPostalCode(this.factory.postalCode)
      ) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }

      // Address1
      // check JWZ
      if (
        !isNullOrEmpty(this.factory.address1) &&
        !CountCharacter.isJWZ(this.factory.address1)
      ) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // check JWZ
      if (
        !isNullOrEmpty(this.factory.address2) &&
        !CountCharacter.isJWZ(this.factory.address2)
      ) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // check JWZ
      if (
        !isNullOrEmpty(this.factory.address3) &&
        !CountCharacter.isJWZ(this.factory.address3)
      ) {
        this.message.push(Message.E00013.formatText("町域"));
      }

      // Address4
      // check isJWZH
      if (
        !isNullOrEmpty(this.factory.address4) &&
        !CountCharacter.isJWZH(this.factory.address4)
      ) {
        this.message.push(Message.E00015.formatText("番地・建物名"));
      }

      if (
        !isNullOrEmpty(this.factory.tel) &&
        !CountCharacter.isTelNumber(this.factory.tel)
      ) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      if (!this.factory.reportFlag) {
        if (isNullOrEmpty(this.factory.jwnetNumber)) {
          this.message.push(Message.E00023.formatText("JWNET加入者番号"));
        } else if (!CountCharacter.isJWH(this.factory.jwnetNumber)) {
          this.message.push(Message.E00014.formatText("JWNET加入者番号"));
        }

        if (isNullOrEmpty(this.factory.jwnetPassword)) {
          this.message.push(Message.E00023.formatText("公開確認番号"));
        } else if (!CountCharacter.isJWH(this.factory.jwnetPassword)) {
          this.message.push(Message.E00014.formatText("公開確認番号"));
        }

        if (isNullOrEmpty(jwnetFactoryCode)) {
          this.message.push(Message.E00023.formatText("JWNET事業場コード"));
        } else if (!CountCharacter.isNumber(jwnetFactoryCode)) {
          this.message.push(Message.E00010.formatText("JWNET事業場コード"));
        }
      } else {
        if (
          !isNullOrEmpty(this.factory.jwnetNumber) &&
          !CountCharacter.isJWH(this.factory.jwnetNumber)
        ) {
          this.message.push(Message.E00014.formatText("JWNET加入者番号"));
        }

        if (
          !isNullOrEmpty(this.factory.jwnetPassword) &&
          !CountCharacter.isJWH(this.factory.jwnetPassword)
        ) {
          this.message.push(Message.E00014.formatText("公開確認番号"));
        }

        if (
          !isNullOrEmpty(jwnetFactoryCode) &&
          !CountCharacter.isNumber(jwnetFactoryCode)
        ) {
          this.message.push(Message.E00010.formatText("JWNET事業場コード"));
        }
      }

      if (
        !isNullOrEmpty(this.factory.factoryNumber) &&
        !CountCharacter.isNumber(this.factory.factoryNumber)
      ) {
        this.message.push(Message.E00013.formatText("事業場番号"));
      }
    },
    onDispath(factory) {
      this.openDl = true;
      if (this.imgStatus) {
        factory.supplierCode = +this.$route.params.supplierCode;
        this.$store
          .dispatch("factoryModule/updateFactory", factory)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              navigation.sshi0016();
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        this.$store
          .dispatch("factoryModule/addFactory", factory)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.isChange = {};
              navigation.sshi0016();
              this.onUpdate(response.data);
              this.getDetails(response.data);
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

    onUpdate(factory) {
      this.$router.push({
        path: MasterProperty.FSHI0006.SSHI0018.Path,
        name: MasterProperty.FSHI0006.SSHI0018.Name,
        params: {
          factoryCode: factory.factoryCode,
          supplierCode: factory.supplierCode
        }
      });
      this.imgStatus = true;
      this.factory.factoryCode = factory.factoryCode;
      this.factory.lastUpdate = factory.lastUpdate;
      this.factory.createDate = factory.createDate;
    },

    onBack() {
      const isChangeDate = this.$refs["factoryDetail"].canDeactivate();
      if (isChangeDate) {
        if (this.showPopupDirtyForm()) {
          navigation.sshi0016();
        }
        return;
      }
      navigation.sshi0016();
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    getDetails(params) {
      this.$store
        .dispatch("factoryModule/getFactorysById", params)
        .then(resp => {
          this.factory = resp.data;
          this.factoryNumberName = {
            factoryCode: resp.data.factoryCode,
            supplierCode: +this.$route.params.supplierCode,
            customerCode: this.currentCustomerCode,
            factoryNumber: resp.data.factoryNumber,
            factoryName: resp.data.factoryName,
            supplierName: resp.data.supplierName
          };
          this.selected = resp.data.factoryClass;
        });
    },

    loadDataTab1(params) {
      this.openDl = true;
      let conditionParams = {
        customerCode: params.customerCode,
        factoryCode: params.factoryCode,
        supplierCode: params.supplierCode,
        paging: {
          pageSize: 10,
          orderField: "CreateDate",
          page: 1,
          descending: true
        }
      };

      this.$store
        .dispatch(
          "factoryLicenseModule/getFactoryLicenseGeneral",
          conditionParams
        )
        .then(resp => {
          this.factoryLicenseGeneral = resp.data.items;
          this.countTab1 = resp.data.count;
          this.pageCountTab1 = resp.data.pageCount;
        })
        .finally(() => {
          this.openDl = false;
        });
    },
    resetListTab1(data) {
      this.loadDataTab1(data);
    },

    onDeleteTab1(factoryLicenl) {
      this.factoryCode = +this.$route.params.factoryCode;
      this.supplierCode = +this.$route.params.supplierCode;
      const params = {
        customerCode: current.customer().customerCode,
        supplierCode: this.supplierCode,
        factoryCode: this.factoryCode,
        licenseClass: factoryLicenl.licenseClass,
        rowNumber: factoryLicenl.rowNumber,
        lastUpdate: factoryLicenl.lastUpdate
      };
      this.openDl = true;
      this.$store
        .dispatch("factoryLicenseModule/deleteFactoryLicense", params)
        .then(resp => {
          this.resetListTab1(params);
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    loadDataTab2(params) {
      let conditionParams = {
        customerCode: params.customerCode,
        factoryCode: params.factoryCode,
        supplierCode: params.supplierCode,
        paging: {
          pageSize: 10,
          orderField: "CreateDate",
          page: 1,
          descending: true
        }
      };
      this.openDl = true;
      this.$store
        .dispatch("factoryFinalModule/getFactoryFinal", conditionParams)
        .then(resp => {
          this.factoryFinal = resp.data.items;
          this.countTab2 = resp.data.count;
          this.pageCountTab2 = resp.data.pageCount;
        })
        .finally(() => {
          this.openDl = false;
        });
    },
    resetListTab2(data) {
      this.loadDataTab2(data);
    },

    onDeleteTab2(dataFactoryFinal) {
      this.factoryCode = +this.$route.params.factoryCode;
      this.supplierCode = +this.$route.params.supplierCode;
      let params = {
        customerCode: current.customer().customerCode,
        supplierCode: this.supplierCode,
        factoryCode: this.factoryCode,
        finalFactoryCode: dataFactoryFinal.finalFactoryCode,
        lastUpdate: dataFactoryFinal.lastUpdate
      };
      this.openDl = true;
      this.$store
        .dispatch("factoryFinalModule/deleteFactoryFinal", params)
        .then(resp => {
          this.resetListTab2(resp.data);
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    getAttachSupplierFile(params) {
      let conditionParams = {
        customerCode: params.customerCode,
        factoryCode: params.factoryCode,
        supplierCode: params.supplierCode,
        paging: {
          pageSize: 10,
          orderField: "CreateDate",
          page: 1,
          descending: true
        }
      };

      this.openDl = true;
      this.$store
        .dispatch("attackModule/getAttack", conditionParams)
        .then(resp => {
          this.attachSupplierFile = resp.data.items;
          this.countTab3 = resp.data.count;
          this.pageCountTab3 = resp.data.pageCount;
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    resetListAttachSupplierFile(data) {
      this.getAttachSupplierFile(data);
    },

    getDataDropHeader() {
      let paramsGeneralHeader = {
        key1: "事業場区分",
        key3: 3
      };
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneralHeader)
        .then(resp => {
          this.dataDropHeader = common.formatObjectSelection(resp.data, [
            "key2",
            "data1"
          ]);
          if (
            isNullOrUndefined(this.$route.params.factoryCode) &&
            isNullOrUndefined(this.$route.params.supplierCode)
          ) {
            this.selected = this.dataDropHeader[0].value;
          }
        });
    },

    async onSearchAddress(postalCode) {
      if (!isNullOrEmpty(postalCode)) {
        this.message = [];
        if (!CountCharacter.isPostalCode(postalCode)) {
          if (this.checkAddress == "header") {
            this.message.push(Message.E00028.formatText("郵便番号"));
          }
        } else {
          await this.$store.dispatch(
            "addressModule/getByPostalCode",
            postalCode
          );
        }
      }
    },

    uploadFile(files, data) {
      let formData = new FormData();
      if (!data) {
        files.forEach(item => {
          formData.append("files", item);
        });
      } else {
        files.forEach(item => {
          formData.append("file", item);
        });
      }

      this.factoryCode = +this.$route.params.factoryCode;
      this.supplierCode = +this.$route.params.supplierCode;
      const params = {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode,
        factoryCode: this.factoryCode,
        form: formData,
        dataAttactFile: data
      };
      this.openDl = true;
      if (!data) {
        this.$store
          .dispatch("attackModule/uploadFile", params)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.resetListAttachSupplierFile(response.data[0]);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          })
          .finally(() => {
            this.openDl = false;
          });
      } else {
        this.$store
          .dispatch("attackModule/updateAttack", params)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.resetListAttachSupplierFile(response.data);
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

    deleteFile(params) {
      this.openDl = true;
      this.$store
        .dispatch("attackModule/deleteAttack", params.fileCode)
        .then(resp => {
          this.resetListAttachSupplierFile(resp.data);
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    dowloadFile(param) {
      this.openDl = true;
      this.fileName = param.logicalFileName;
      this.$store
        .dispatch("attackModule/downloadFile", param.fileCode)
        .then(response => {
          if (response.status === HttpStatus.OK) {
            FileSaver.saveAs(response.data, this.fileName);
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    checkPopupAddress(check) {
      this.checkAddress = check;
    },

    onCheckExtention(file) {
      const res = file.split(".");
      if (
        res &&
        AppConfig.File.ExtensionWhite.includes(
          res[res.length - 1].toLowerCase()
        )
      ) {
        return true;
      }
      return false;
    },

    initParamsTab() {
      const param = {
        customerCode: this.currentCustomerCode,
        supplierCode: +this.$route.params.supplierCode,
        factoryCode: +this.$route.params.factoryCode,
        paging: {
          page: AppConfig.Pages.page,
          orderField: "CreateDate",
          descending: AppConfig.Pages.descending,
          pageSize: this.pageSize
        }
      };
      return param;
    },

    getDataPagingTab1(params) {
      this.$store
        .dispatch("factoryLicenseModule/getFactoryLicenseGeneral", params)
        .then(resp => {
          this.factoryLicenseGeneral = resp.data.items;
          this.countTab1 = resp.data.count;
          this.pageCountTab1 = resp.data.pageCount;
        });
    },

    getCurrentPageTab1(data) {
      let params = { ...this.initParamsTab() };
      params.paging.page = data;
      this.getDataPagingTab1(params);
    },

    getPageSizeTab1(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParamsTab() };
      this.getDataPagingTab1(params);
    },

    onSortingTab1(data, ischeck) {
      let params = { ...this.initParamsTab() };
      params.paging.orderField = CountCharacter.upCase(data);
      params.paging.descending = ischeck;
      this.getDataPagingTab1(params);
    },

    closeSortTab1(data) {
      let params = { ...this.initParamsTab() };
      params.paging.orderField = "CreateDate";
      params.paging.descending = true;
      this.getDataPagingTab1(params);
    },

    getDataPagingTab2(params) {
      this.$store
        .dispatch("factoryFinalModule/getFactoryFinal", params)
        .then(resp => {
          this.factoryFinal = resp.data.items;
          this.countTab2 = resp.data.count;
          this.pageCountTab2 = resp.data.pageCount;
        });
    },

    getCurrentPageTab2(data) {
      let params = { ...this.initParamsTab() };
      params.paging.page = data;
      this.getDataPagingTab2(params);
    },

    getPageSizeTab2(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParamsTab() };
      this.getDataPagingTab2(params);
    },

    onSortingTab2(data, ischeck) {
      let params = { ...this.initParamsTab() };
      params.paging.orderField = CountCharacter.upCase(data);
      params.paging.descending = ischeck;
      this.getDataPagingTab2(params);
    },

    closeSortTab2(data) {
      let params = { ...this.initParamsTab() };
      params.paging.orderField = "CreateDate";
      params.paging.descending = true;
      this.getDataPagingTab2(params);
    },

    getDataPagingTab3(params) {
      this.$store.dispatch("attackModule/getAttack", params).then(resp => {
        this.attachSupplierFile = resp.data.items;
        this.countTab3 = resp.data.count;
        this.pageCountTab3 = resp.data.pageCount;
      });
    },

    getCurrentPageTab3(data) {
      let params = { ...this.initParamsTab() };
      params.paging.page = data;
      this.getDataPagingTab3(params);
    },

    getPageSizeTab3(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParamsTab() };
      this.getDataPagingTab3(params);
    },

    getCurrentTab(data) {
      this.currentTab = data;
    },

    onClickTab(data) {
      if (this.currentTab != data) {
        common.resetPage();
        if (data === 0) {
          this.getDataPagingTab1(this.initParamsTab());
        }
        if (data === 1) {
          this.getDataPagingTab2(this.initParamsTab());
        }
        if (data === 2) {
          this.getDataPagingTab3(this.initParamsTab());
        }
      }
    },

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
    }
  },
  computed: {
    ...mapGetters({
      address: "addressModule/getByPostalCode",
      dataError: "notificationModule/setDataError"
    })
  },
  watch: {
    address() {
      if (this.checkAddress == "header") {
        if (!this.address) {
          this.message.push(Message.E00029);
        } else {
          this.message = [];
          this.factory.address1 = this.address.address1;
          this.factory.address2 = this.address.address2;
          this.factory.address3 = this.address.address3;
          this.factory.address4 = this.address.address4;
          this.checkAddress = null;
        }
      }
    }
  }
};
</script>
