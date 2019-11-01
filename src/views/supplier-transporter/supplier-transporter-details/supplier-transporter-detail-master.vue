<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message" />
      <div v-if="dataError.length > 0  && dataError[0].notifyClass !== 2">
        <BaseTableError
          :dataTable="dataError"
          :fields.sync="fields"
          :tableId="tableErrorId"
          :groupNotification="groupNotification"
          @onUpdate="onUpdateError"
          @onCancel="onCancelError"
        />
      </div>
      <SupplierTransporterFormDetailReadOnly
        v-if="isReadOnly"
        ref="supplierTransporterForm"
        :item="supplier"
        :isReadOnly="isReadOnly"
        :imgStatus="imgStatus"
        :permissionGroup="permissionGroup"
      />

      <SupplierTransporterFormDetail
        v-else
        ref="supplierTransporterForm"
        :item="supplier"
        :isReadOnly="isReadOnly"
        :imgStatus="imgStatus"
        :isChange="isChange"
        @onSearchAddress="onSearchAddress"
        :permissionGroup="permissionGroup"
      />

      <div class="grid-screen" v-if="imgStatus">
        <b-tabs content-class="mt-3">
          <b-tab disabled></b-tab>
          <b-tab :title="imgText.title.sshi0012Tab01" active>
            <TabFactory
              :dataSupplier="dataUpdateSupplier"
              @loadList="getDataTab1"
              :permissionGroup="permissionTab"
              :datadropGeneralTab1="datadropGeneralTab1"
              :attachSupplierPopupFile="attachSupplierPopupFile"
              :isReadOnly="isReadOnly"
              @getAttachSupplierFileTransporter="getAttachSupplierFileTransporter"
              :pagingAttachSupplierPopupFile="pagingAttachSupplierPopupFile"
              :pageSizeAttachSupplierPopupFile="pageSize"
              @getCurrentPageAttachSupplierPopupFile="getCurrentPageAttachSupplierPopupFile"
              @getPageSizeAttachSupplierPopupFile="getPageSizeAttachSupplierPopupFile"
            />
          </b-tab>
          <b-tab :title="imgText.title.sshi0012Tab02">
            <TabSupplierLicense
              :items="tableSupplierLicense"
              :dataDropboxLicense="datadropGeneral"
              :dataSupplier="dataUpdateSupplier"
              :permissionGroup="permissionTab"
              @loadList="getDataTab2"
              :dataSource4="dataSource4"
              :count="countTab2"
              :pageCount="pageCountTab2"
              :pageSize="initParamsTab2.pageSize"
              @getCurrentPage="getCurrentPageTab2"
              @onSorting="onSortingTab2"
              @getPageSize="getPageSizeTab2"
              @closeSort="closeSortTab2"
              :isReadOnly="isReadOnly"
              :dataTypeNum="dataDropDowBoxTypeNum"
            />
          </b-tab>
          <b-tab :title="imgText.title.sshi0012Tab03">
            <TabSupplierFile
              :dataTable="attachSupplierFile"
              :isReadOnly="isReadOnly"
              :permissionGroup="permissionTab"
              @uploadFile="uploadFile"
              @deleteFile="deleteFile"
              @dowloadFile="dowloadFile"
              @getCurrentPage="getCurrentPageTab3"
              @getPageSize="getPageSizeTab3"
              @onSorting="onSortingTab3"
              :count="countTab3"
              :pageCount="pageCountTab3"
              :pageSize="initParamsTab3.pageSize"
            />
          </b-tab>
          <b-tab :title="imgText.title.sshi0012Tab04">
            <TabUser
              :items="tableSupplierUser"
              :dataSupplier="dataUpdateSupplier"
              @loadList="getDataTab4"
              :permissionGroup="permissionTab"
              @onSorting="onSortingTab4"
              @getCurrentPage="getCurrentPageTab4"
              :pageCount="pageCount"
              :count="count"
              :pageSize="initParamsTab4.pageSize"
              @getPageSize="getPageSizeTab4"
              @closeSort="closeSortTab4"
              :isReadOnly="isReadOnly"
            />
          </b-tab>
        </b-tabs>
      </div>

      <BaseButtonGroupPermission
        :isPopup="isPopup"
        :isReadOnly="isReadOnly"
        :imgStatus="isUpdate"
        @onAddUpdate="onAddUpdate"
        @onBack="onBack"
      />

      <BaseProcessing :openDl="openDl" />
    </b-container>
  </div>
</template>

<script>
import FormatData from "@/shared/FomatData";
import { Supplier } from "@/models/supplier.model";
import moment from "moment";
import { Message } from "@/constants/Message";
import AppConfig from "@/constants/AppConfig";
import CountCharacter from "@/shared/CountCharacter";
import BaseTable from "@/components/BaseTable.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import { MasterProperty } from "@/shared/MasterProperty";
import BaseAttachmentsTab from "@/components/BaseAttachmentsTab.vue";
import IMText from "@/data/img-text";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import BaseMessageError from "@/components/BaseMessageError";
import { mapGetters } from "vuex";
import FileSaver from "file-saver";

import {
  isNullOrEmpty,
  current,
  tryMapPathApiEncoded,
  isNullOrUndefined
} from "@/shared/utilities";
import { HttpStatus } from "@/constants/HttpStatus";
import TabFactory from "../supplier-transporter-tab/supplier-transporter-tab-factory";
import TabSupplierLicense from "../supplier-transporter-tab/supplier-transporter-tab-supplier-license";
import TabSupplierFile from "../supplier-transporter-tab/supplier-transporter-tab-supplier-file";
import TabUser from "../supplier-transporter-tab/supplier-transporter-tab-user";
import SupplierTransporterFormDetail from "../supplier-transporter-form/supplier-transporter-form-detail";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import { canAction, handleOutput, navigation } from "@/shared/utilities";
import SupplierTransporterFormDetailReadOnly from "../supplier-transporter-form/supplier-transporter-form-detail-readonly";
import BaseProcessing from "@/components/BaseProcessing";
import BaseTableError from "@/components/BaseTableError.vue";
export default {
  components: {
    BaseMessageError,
    SupplierTransporterFormDetail,
    BaseButtonGroupPermission,
    BaseTable,
    TabFactory,
    TabSupplierLicense,
    TabSupplierFile,
    TabUser,
    BaseAttachmentsTab,
    SupplierTransporterFormDetailReadOnly,
    BaseProcessing,
    BaseTableError
  },
  data() {
    return {
      imgText: IMText,
      title: IMText.title.sshi0011,
      supplierCode: 0,
      currentCustomerCode: current.customer().customerCode,
      supplier: {
        customerCode: "",
        supplierCode: "",
        supplierNumber: "",
        supplierName: "",
        supplierKana: "",
        reportFlag: false,
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address: "",
        tel: "",
        fax: "",
        jwnetNumber: "",
        jwnetPassword: "",
        displayOrder: "",
        memo: "",
        deleteFlag: "",
        createDate: "",
        lastUpdate: ""
      },
      fields: [
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
      newSupplier: new Supplier(),
      dataUpdateSupplier: [],
      message: [],
      tableFactory: [],
      tableSupplierLicense: [],
      datadropGeneral: [],
      tableSupplierUser: [],
      datadropGeneralTab1: [],
      imgStatus: false,
      isPopup: false,
      ReadOnlyO004: false,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      permissionTab: lodash.cloneDeep(AppConfig.PermissionGroup),
      dataSource4: [],
      pageCount: 0,
      count: 0,
      pageSize: 10,
      initParams1: {},
      isReadOnly: true,
      initParamsTab4: {
        orderField: "CreateDate",
        descending: AppConfig.Descending,
        page: 1,
        pageSize: 10
      },
      attachSupplierFile: [],
      attachSupplierPopupFile: [],
      fileName: "",
      initParamsTab2: {
        orderField: "CreateDate",
        descending: AppConfig.Descending,
        page: 1,
        pageSize: 10
      },
      pageCountTab2: 0,
      countTab2: 0,
      pageCountTab3: 0,
      countTab3: 0,
      initParamsTab3: {
        orderField: "CreateDate",
        descending: AppConfig.Descending,
        page: 1,
        pageSize: 10
      },
      pagingAttachSupplierPopupFile: {
        count: 0,
        pageCount: 0
      },
      openDl: false,
      tableErrorId: "sshi0012-table-get-error",
      groupNotification: lodash.cloneDeep(AppConfig.GroupNotification),
      dataDropDowBoxTypeNum: [],
      isChange: {}
    };
  },
  created() {
    this.message = [];
    this.supplierCode = +this.$route.params.supplierCode;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0011);
    this.permissionGroup.Update = canAction(Action.Update, Screen.SSHI0012);
    this.permissionGroup.Delete = canAction(Action.Delete, Screen.SSHI0010);
    this.permissionGroup.Read = canAction(Action.Read, Screen.SSHI0012);

    if (this.supplierCode > 0) {
      this.imgStatus = true;
      if (this.permissionGroup.Update) {
        this.title = this.imgText.title.sshi0012;
        this.permissionTab.Create = true;
        this.permissionTab.Update = true;
        this.permissionTab.Delete = true;
        this.isReadOnly = false;
      } else {
        this.title = this.imgText.title.sshi0012Detail;
        this.permissionTab.Read = true;
        this.isReadOnly = true;
      }
      this.getDataUpdate(this.supplierCode);
      this.getSupplier(this.supplierCode);
      const params = {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode
      };
      this.getAttachSupplierFile(params);
      this.getAttachSupplierFileTransporter(params);
    } else {
      this.imgStatus = false;
      this.isReadOnly = false;
      this.title = this.imgText.title.sshi0011;
    }

    this.groupNotification.Update = true;
  },

  methods: {
    initParams() {
      const param = {
        supplierClass: 2,
        customerCode: this.currentCustomerCode,
        pageSize: this.pageSize,
        orderField: "DisplayOrder",
        page: 1,
        descending: false
      };
      return param;
    },

    onBack() {
      if (!this.isReadOnly) {
        const isChangeDate = this.$refs[
          "supplierTransporterForm"
        ].canDeactivate();
        if (isChangeDate) {
          if (this.showPopupDirtyForm()) {
            navigation.sshi0010();
          }
          return;
        }
      }
      this.$router.push({
        path: MasterProperty.FSHI0004.SSHI0010.Path,
        name: MasterProperty.FSHI0004.SSHI0010.Name
      });
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    onAddUpdate() {
      this.message = [];
      this.newSupplier = { ...this.supplier };
      this.onValidate(this.newSupplier);
      if (!this.message.length) {
        this.onDispath();
      }
    },

    async onDispath() {
      let newSupplierAdd = {
        customerCode: current.customer().customerCode,
        supplierClass: 2,
        supplierNumber: this.newSupplier.supplierNumber,
        supplierName: this.newSupplier.supplierName,
        supplierKana: this.newSupplier.supplierKana,
        postalCode: this.newSupplier.postalCode,
        address1: this.newSupplier.address1,
        address2: this.newSupplier.address2,
        address3: this.newSupplier.address3,
        address4: this.newSupplier.address4,
        tel: this.supplier.tel,
        fax: this.supplier.fax,
        memo: this.newSupplier.memo,
        url: this.newSupplier.url,
        reportFlag: this.newSupplier.reportFlag ? 1 : 0,
        jwnetNumber: this.newSupplier.jwnetNumber,
        jwnetPassword: this.newSupplier.jwnetPassword
      };
      this.openDl = true;
      if (this.imgStatus) {
        newSupplierAdd.supplierCode = this.newSupplier.supplierCode;
        newSupplierAdd.lastUpdate = this.newSupplier.lastUpdate;
        await this.$store
          .dispatch("supplierModule/updateSupplier", newSupplierAdd)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.$router.push({
                path: MasterProperty.FSHI0004.SSHI0010.Path,
                name: MasterProperty.FSHI0004.SSHI0010.Name
              });
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
          .dispatch("supplierModule/addSupplier", newSupplierAdd)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.onRedirect(response.data);
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

    onRedirect(supplier) {
      this.isChange = {};
      this.supplierCode = supplier.supplierCode;
      this.dataUpdateSupplier = { ...supplier };
      this.supplier = { ...supplier };
      // this.getDataUpdate(supplier.supplierCode);
      this.getSupplier(supplier.supplierCode);
      this.supplier.reportFlag = this.supplier.reportFlag == 1 ? true : false;
      this.imgStatus = true;
      this.isReadOnly = false;
      this.title = this.imgText.title.sshi0012;
      this.permissionGroup.Update = true;
      this.permissionTab.Create = true;
      this.permissionTab.Update = true;
      this.permissionTab.Delete = true;
      this.$router.push({
        path: MasterProperty.FSHI0004.SSHI0012.Path,
        name: MasterProperty.FSHI0004.SSHI0012.Name,
        params: { supplierCode: supplier.supplierCode }
      });
    },

    onValidate(supplier) {
      // Supplier Name
      if (isNullOrEmpty(supplier.supplierName)) {
        this.message.push(Message.E00023.formatText("業者名"));
      }
      // Check IsJWZH
      else if (!CountCharacter.isJWZH(supplier.supplierName)) {
        this.message.push(Message.E00014.formatText("業者名"));
      }

      // Customer Kana
      if (
        !isNullOrEmpty(supplier.supplierKana) &&
        !CountCharacter.isKatakanaHasSpace(supplier.supplierKana)
      ) {
        this.message.push(Message.E00028.formatText("業者名カナ"));
      }

      // PostalCode
      if (
        !isNullOrEmpty(supplier.postalCode) &&
        !CountCharacter.isPostalCode(supplier.postalCode)
      ) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }

      // Address1
      if (
        !isNullOrEmpty(supplier.address1) &&
        !CountCharacter.isJWZ(supplier.address1)
      ) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // Address2
      if (
        !isNullOrEmpty(supplier.address2) &&
        !CountCharacter.isJWZ(supplier.address2)
      ) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // Address3
      if (
        !isNullOrEmpty(supplier.address3) &&
        !CountCharacter.isJWZ(supplier.address3)
      ) {
        this.message.push(Message.E00013.formatText("町域"));
      }

      // Address4
      if (
        !isNullOrEmpty(supplier.address4) &&
        !CountCharacter.isJWZH(supplier.address4)
      ) {
        this.message.push(Message.E00015.formatText("番地・建物名"));
      }

      // TEL
      if (
        !isNullOrEmpty(supplier.tel) &&
        !CountCharacter.isTelNumber(supplier.tel)
      ) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      // FAX
      if (
        !isNullOrEmpty(supplier.fax) &&
        !CountCharacter.isFaxNumber(supplier.fax)
      ) {
        this.message.push(Message.E00028.formatText("FAX"));
      }

      // CHECK BOX
      if (!supplier.reportFlag) {
        if (isNullOrEmpty(supplier.jwnetNumber)) {
          this.message.push(Message.E00023.formatText("JWNET加入者番号"));
        } else if (!CountCharacter.isJWH(supplier.jwnetNumber)) {
          this.message.push(Message.E00013.formatText("JWNET加入者番号"));
        }
        if (isNullOrEmpty(supplier.jwnetPassword)) {
          this.message.push(Message.E00023.formatText("公開確認番号"));
        } else if (!CountCharacter.isJWH(supplier.jwnetPassword)) {
          this.message.push(Message.E00013.formatText("公開確認番号"));
        }
      }
    },
    getSupplier(id) {
      this.getDataTab1();
      this.getDataTab2();
      this.getDataTab4();
    },

    getDataUpdate(id) {
      this.$store
        .dispatch(
          "supplierModule/getSupplierById",
          this.currentCustomerCode + "/" + id
        )
        .then(resp => {
          this.supplier = resp.data;
          this.dataUpdateSupplier = lodash.cloneDeep(resp.data);
          this.supplier.reportFlag =
            this.supplier.reportFlag == 1 ? true : false;
        });
    },
    getDataTab1() {
      const params = {
        supplierCode: this.supplierCode,
        customerCode: this.currentCustomerCode,
        param: {
          pageSize: this.pageSize,
          orderField: "DisplayOrder",
          page: 1,
          descending: true
        }
      };

      let paramsGeneral = {
        key1: "事業場区分",
        key3: 2
      };
      this.openDl = true;
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneral)
        .then(resp => {
          this.datadropGeneralTab1 = resp.data;
        });

      let paramsGeneralTypeNum = {
        key1: "業の種類",
        deleteFlag: 0
      };

      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneralTypeNum)
        .then(resp => {
          this.dataDropDowBoxTypeNum = resp.data;
        });
      this.$store
        .dispatch("factoryModule/getFactoryCarriers", params)
        .finally(() => {
          this.openDl = false;
        });
    },

    defaultParamsTab2() {
      return {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode
      };
    },

    getDataTab2() {
      let paramslicense = `?customerCode=${this.currentCustomerCode}&supplierCode=${this.supplierCode}`;
      let paramsGeneral = {
        key1: "許可区分",
        key3: 2
      };
      let paramsDataSource4 = {
        key1: "政令市番号"
      };
      this.openDl = true;
      this.$store
        .dispatch(
          "supplierLicenseModule/getSupplierLicense",
          Object.assign({}, this.defaultParamsTab2(), this.initParamsTab2)
        )
        .then(resp => {
          this.tableSupplierLicense = resp.data.items;
          this.pageCountTab2 = resp.data.pageCount;
          this.countTab2 = resp.data.count;
        })
        .finally(() => {
          this.openDl = false;
        });
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneral)
        .then(resp => {
          this.datadropGeneral = resp.data;
        });
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsDataSource4)
        .then(resp => {
          this.dataSource4 = resp.data;
        });
    },

    getDataTab4() {
      this.openDl = true;
      let params = this.defaultParamsTab4();

      this.$store
        .dispatch(
          "supplierHandleModule/getSupplierHandleTab",
          Object.assign({}, params, this.initParamsTab4)
        )
        .then(resp => {
          this.tableSupplierUser = resp.data.items;
          this.pageCount = resp.data.pageCount;
          this.count = resp.data.count;
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    async onSearchAddress(postalCode) {
      if (postalCode !== "" && postalCode.length < 7) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }
      await this.$store.dispatch("addressModule/getByPostalCode", postalCode);
    },

    defaultParamsTab4() {
      return {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode,
        userTypeCode: 4
      };
    },

    onSortingTab4(data, isCheck) {
      let params = this.initParamsTab4;
      params.orderField = CountCharacter.upCase(data);
      params.descending = isCheck;
      this.getDataTab4();
    },

    getCurrentPageTab4(data) {
      let params = this.initParamsTab4;
      params.page = data;
      this.getDataTab4();
    },

    getPageSizeTab4(data) {
      let params = this.initParamsTab4;
      params.pageSize = data;
      this.getDataTab4();
    },

    closeSortTab4(data) {
      let params = this.initParamsTab4;
      params.orderField = "CreateDate";
      params.descending = AppConfig.Descending;
      params.page = 1;
      params.pageSize = 10;
      this.getDataTab4();
    },

    getAttachSupplierFile(params) {
      this.openDl = true;
      this.$store
        .dispatch("attackModule/getAttackSupplierTransporter", params)
        .then(resp => {
          this.attachSupplierFile = resp.data.items;
          this.pageCountTab3 = resp.data.pageCount;
          this.countTab3 = resp.data.count;
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    resetListAttachSupplierFile(data) {
      this.getAttachSupplierFile(data);
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

      this.supplierCode = +this.$route.params.supplierCode;
      const params = {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode,
        form: formData,
        dataAttactFile: data
      };
      if (!data) {
        this.$store
          .dispatch("attackModule/uploadFileSupplierTransporter", params)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.resetListAttachSupplierFile(response.data[0]);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      } else {
        this.$store
          .dispatch("attackModule/updateAttackSupplierTransporter", params)
          .then(response => {
            if (response.status === HttpStatus.OK) {
              this.resetListAttachSupplierFile(response.data);
            }
          })
          .catch(error => {
            this.message = this.message.concat(handleOutput.errorHandle(error));
          });
      }
    },

    deleteFile(params) {
      this.openDl = true;
      this.$store
        .dispatch(
          "attackModule/deleteAttackSupplierTransporter",
          params.fileCode
        )
        .then(resp => {
          this.resetListAttachSupplierFile(resp.data);
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    dowloadFile(params) {
      this.openDl = true;
      this.fileName = params.logicalFileName;
      this.$store
        .dispatch(
          "attackModule/downloadFileSupplierTransporter",
          params.fileCode
        )
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

    getAttachSupplierFileTransporter(params) {
      this.$store
        .dispatch("attackModule/getAttackSupplierTransporterPopup", params)
        .then(resp => {
          this.attachSupplierPopupFile = resp.data.items;
          this.pagingAttachSupplierPopupFile.count = resp.data.count;
          this.pagingAttachSupplierPopupFile.pageCount = resp.data.pageCount;
        });
    },

    resetListAttachSupplierTransporterFile(data) {
      this.getAttachSupplierFileTransporter(data);
    },

    getCurrentPageTab2(data) {
      let params = this.initParamsTab2;
      params.page = data;
      this.getDataTab2();
    },

    onSortingTab2(data, isCheck) {
      let params = this.initParamsTab2;
      params.orderField = CountCharacter.upCase(data);
      params.descending = isCheck;
      this.getDataTab2();
    },

    getPageSizeTab2(data) {
      let params = this.initParamsTab2;
      params.pageSize = data;
      this.getDataTab2();
    },

    closeSortTab2(data) {
      let params = this.initParamsTab2;
      params.orderField = "CreateDate";
      params.descending = AppConfig.Descending;
      params.pageSize = 10;
      this.getDataTab2();
    },

    buildParamsPagingTab3(condition) {
      this.initParamsTab3.pageSize = condition.pageSize;
      this.initParamsTab3.orderField = condition.orderField;
      this.initParamsTab3.page = condition.page;
      this.initParamsTab3.descending = condition.descending;

      return {
        supplierCode: this.supplierCode,
        customerCode: this.currentCustomerCode,
        paging: {
          pageSize: this.initParamsTab3.pageSize,
          orderField: this.initParamsTab3.orderField,
          page: this.initParamsTab3.page,
          descending: this.initParamsTab3.descending
        }
      };
    },

    getCurrentPageTab3(data) {
      let condition = {
        pageSize: this.initParamsTab3.pageSize,
        orderField: this.initParamsTab3.orderField,
        page: data,
        descending: this.initParamsTab3.descending
      };

      let prepareParams = this.buildParamsPagingTab3(condition);

      this.getAttachSupplierFile(prepareParams);
    },

    getPageSizeTab3(data) {
      let condition = {
        pageSize: data,
        orderField: this.initParamsTab3.orderField,
        page: this.initParamsTab3.page,
        descending: this.initParamsTab3.descending
      };

      let prepareParams = this.buildParamsPagingTab3(condition);

      this.getAttachSupplierFile(prepareParams);
    },

    onSortingTab3(data, isCheck) {
      let condition = {
        pageSize: this.initParamsTab3.pageSize,
        orderField: CountCharacter.upCase(data),
        page: this.initParamsTab3.page,
        descending: isCheck
      };

      let prepareParams = this.buildParamsPagingTab3(condition);

      this.getAttachSupplierFile(prepareParams);
    },

    initParamsPagingAttachSupplierPopupFile() {
      const param = {
        customerCode: this.currentCustomerCode,
        supplierCode: this.supplierCode,
        paging: {
          page: AppConfig.Pages.page,
          orderField: "CreateDate",
          descending: AppConfig.Pages.descending,
          pageSize: this.pageSize
        }
      };
      return param;
    },

    getCurrentPageAttachSupplierPopupFile(data) {
      let params = { ...this.initParamsPagingAttachSupplierPopupFile() };
      params.paging.page = data;
      this.getAttachSupplierFileTransporter(params);
    },

    getPageSizeAttachSupplierPopupFile(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParamsPagingAttachSupplierPopupFile() };
      this.getAttachSupplierFileTransporter(params);
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
      options: "generalModule/getGeneralIndustryCode1",
      address: "addressModule/getByPostalCode",
      dataError: "notificationModule/setDataError"
    }),
    isUpdate() {
      return this.imgStatus;
    }
    // return common.formatObjectSelection(this.dataDropbox, ['key2', 'data1'])
  },
  watch: {
    address() {
      if (!this.address) {
        this.message.push(Message.E00029);
      } else {
        this.message = [];
        this.supplier.address1 = this.address.address1;
        this.supplier.address2 = this.address.address2;
        this.supplier.address3 = this.address.address3;
        this.supplier.address4 = this.address.address4;
      }
    }
  }
};
</script>
