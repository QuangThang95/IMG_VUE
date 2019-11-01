<template>
  <div>
    <b-container fluid>
      <BaseMessageError :message="message" :title="title" />
      <SupplierHandleForm
        v-if="!isReadOnly"
        ref="supplierHandleForm"
        :item="item"
        :isUpdate="isUpdate"
        :isChange="isChange"
        @getAddressByPostalCode="getAddressByPostalCode"
      />
      <SupplierHandleReadOnly v-if="isReadOnly" :item="item" />
      <div v-if="isUpdate">
        <SupplierHandleTab
          ref="supplierHandleTab"
          :supplierCode="supplierCode"
          :supplierNumber="item.supplierNumber"
          :supplierName="item.supplierName"
          :isReadOnly="isReadOnly"
          :permissionGroup="permissionGroup"
          :fields="fields"
          :attachSupplierFile="attachSupplierFile"
          @uploadFile="uploadFile"
          @deleteFile="deleteFile"
          @dowloadFile="dowloadFile"
          :pagingAttachSupplierFile="pagingAttachSupplierFile"
          :pageSizeAttachSupplierFile="pageSize"
          @getCurrentPageAttachSupplierFile="getCurrentPageAttachSupplierFile"
          @getPageSizeAttachSupplierFile="getPageSizeAttachSupplierFile"
        />
      </div>
      <BaseButtonGroupPermission
        :imgStatus="isUpdate"
        :isReadOnly="isReadOnly"
        @onAddUpdate="onAddUpdate"
        @onBack="onCloses"
      />
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import SupplierHandleTab from "./supplier-handle-tab.vue";
import SupplierHandleForm from "./supplier-handle-form-detail.vue";
import BaseMessageError from "@/components/BaseMessageError.vue";
import BaseButtonGroupPermission from "@/components/BaseButtonGroupPermission";
import SupplierHandleReadOnly from "./supplier-handle-readonly.vue";
import CountCharacter from "@/shared/CountCharacter";
import { Message } from "@/constants/Message";
import { MasterProperty } from "@/shared/MasterProperty";
import { SupplierHandle } from "@/models/supplier-handle.model";
import {
  current,
  handleOutput,
  isNullOrEmpty,
  common,
  canAction
} from "@/shared/utilities";
import { mapGetters } from "vuex";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import FormatData from "@/shared/FomatData";
import HttpStatus from "http-status-codes";
import BaseProcessing from "@/components/BaseProcessing";
import IMText from "@/data/img-text";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      imgText: IMText,
      message: [],
      title: "",
      supplierHandle: new SupplierHandle(),
      currentCustomerCode: current.customer().customerCode,
      isUpdate: false,
      supplierByCode: {},
      fields: [
        {
          key: "department",
          label: "所属部署",
          slot: "HEAD_department",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "userName",
          label: "担当者名",
          slot: "HEAD_userName",
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
          key: "email",
          label: "Email",
          slot: "HEAD_email",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "actionDirective",
          label: "操作",
          tdClass: "classButton"
        }
      ],
      item: {
        supplierNumber: "",
        supplierName: "",
        supplierKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        tel: "",
        fax: "",
        url: "",
        memo: ""
      },
      supplierCode: "",
      isReadOnly: false,
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      isBack: false,
      isRedirect: false,
      attachSupplierFile: [],
      pagingAttachSupplierFile: {
        pageCount: 0,
        count: 0
      },
      pageSize: 10,
      fileName: "",
      openDl: false,
      isChange: {}
    };
  },
  components: {
    SupplierHandleForm,
    SupplierHandleTab,
    BaseMessageError,
    BaseButtonGroupPermission,
    SupplierHandleReadOnly,
    BaseProcessing
  },
  created() {
    let count = 0;
    this.message = [];
    this.isRedirect = false;
    const supplierCode = +this.$route.params.supplierCode;
    if (supplierCode) {
      this.supplierCode = supplierCode;
      const data = {
        customerCode: this.currentCustomerCode,
        supplierCode: supplierCode
      };
      const param = {
        supplierCode: supplierCode,
        customerCode: this.currentCustomerCode,
        userTypeCode: 6
      };
      if (canAction(Action.Update, Screen.SSHI0015)) {
        this.title = "処分業者変更";
        this.isReadOnly = false;
        this.permissionGroup.Update = true;
        count++;
      } else if (canAction(Action.Read, Screen.SSHI0015)) {
        this.title = "処分業者参照";
        this.isReadOnly = true;
        this.permissionGroup.Read = true;
        count++;
      }
      if (canAction(Action.Delete, Screen.SSHI0015)) {
        this.permissionGroup.Delete = true;
        count++;
      }
      if (count > 0) {
        this.fields.push(common.actionDirective(count));
      }
      this.getSupplierHandleTab(param);
      this.getAttachSupplierFile(data);
      this.getSupplierCode(data);
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
      this.title = "処分業者追加";
    }
  },

  methods: {
    onAddUpdate() {
      this.isBack = false;
      this.message = [];
      this.onValidate();
      if (!this.message.length) {
        let data = this.dataInit();
        let dataUpdate = {
          ...data,
          supplierCode: this.item.supplierCode,
          lastUpdate: this.item.lastUpdate
        };
        this.openDl = true;
        if (this.isUpdate) {
          return this.$store
            .dispatch("supplierHandleModule/updateSupplierHandle", dataUpdate)
            .then(res => {
              this.onBack();
            })
            .catch(err => {
              this.message = this.message.concat(handleOutput.errorHandle(err));
            })
            .finally(() => {
              this.openDl = false;
            });
        } else {
          this.$store
            .dispatch("supplierHandleModule/addSupplierHandle", data)
            .then(res => {
              this.item = res.data;
              this.supplierCode = this.item.supplierCode;
              const param = {
                customerCode: this.currentCustomerCode,
                supplierCode: this.item.supplierCode
              };
              this.getSupplierCode(param);
              this.onRedirect(res.data.supplierCode);
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

    onRedirect(supplierCode) {
      this.isChange = {};
      this.isUpdate = true;
      this.isRedirect = true;
      this.$router.push({
        path: MasterProperty.FSHI0005.SSHI0015.Path,
        name: MasterProperty.FSHI0005.SSHI0015.Name,
        params: {
          supplierCode: supplierCode
        }
      });
      if (canAction(Action.Update, Screen.SSHI0015)) {
        this.title = "処分業者変更";
        this.permissionGroup.Update = true;
      } else if (canAction(Action.Read, Screen.SSHI0015)) {
        this.title = "処分業者参照";
        this.permissionGroup.Read = true;
      }
      if (canAction(Action.Delete, Screen.SSHI0015)) {
        this.permissionGroup.Delete = true;
      }
    },

    dataInit() {
      this.supplierHandle.customerCode = this.currentCustomerCode;
      this.supplierHandle.supplierName = this.item.supplierName;
      this.supplierHandle.supplierNumber = this.item.supplierNumber;
      this.supplierHandle.supplierKana = this.item.supplierKana;
      this.supplierHandle.postalCode = this.item.postalCode;
      this.supplierHandle.address1 = this.item.address1;
      this.supplierHandle.address2 = this.item.address2;
      this.supplierHandle.address3 = this.item.address3;
      this.supplierHandle.address4 = this.item.address4;
      this.supplierHandle.tel = this.item.tel;
      this.supplierHandle.fax = this.item.fax;
      this.supplierHandle.url = this.item.url;
      this.supplierHandle.reportFlag = this.item.reportFlag;
      this.supplierHandle.jwnetNumber = this.item.jwnetNumber;
      this.supplierHandle.jwnetPassword = this.item.jwnetNumber;
      this.supplierHandle.displayOrder = this.item.displayOrder;
      this.supplierHandle.memo = this.item.memo;
      this.supplierHandle.supplierClass = 3;

      return this.supplierHandle;
    },

    onBack() {
      const param = {
        supplierClass: 3,
        customerCode: this.currentCustomerCode,
        pageSize: 10,
        orderField: "DisplayOrder",
        page: 1
      };
      this.getAll(param);
      this.$router.push({
        path: MasterProperty.FSHI0005.SSHI0013.Path
      });
    },

    onCloses() {
      this.isBack = true;
      const isChangeFormAdd = this.$refs["supplierHandleForm"]
        ? this.$refs["supplierHandleForm"].canDeactivate()
        : false;
      if (isChangeFormAdd) {
        if (this.showPopupDirtyForm()) {
          this.onBack();
        }
        return;
      }
      this.onBack();
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    onValidate() {
      const data = this.$refs["supplierHandleForm"].getData();
      // Supplier Name
      if (isNullOrEmpty(data.supplierName)) {
        this.message.push(Message.E00023.formatText("業者名"));
      }

      // Customer Kana
      if (
        !isNullOrEmpty(data.supplierKana) &&
        !CountCharacter.isKatakanaHasSpace(data.supplierKana)
      ) {
        this.message.push(Message.E00028.formatText("業者名カナ"));
      }

      // PostalCode
      if (
        !isNullOrEmpty(data.postalCode) &&
        !CountCharacter.isPostalCode(data.postalCode)
      ) {
        this.message.push(Message.E00028.formatText("郵便番号"));
      }

      // Address1
      if (
        !isNullOrEmpty(data.address1) &&
        !CountCharacter.isFullSize(data.address1)
      ) {
        this.message.push(Message.E00013.formatText("都道府県"));
      }

      // Address2
      if (
        !isNullOrEmpty(data.address2) &&
        !CountCharacter.isFullSize(data.address2)
      ) {
        this.message.push(Message.E00013.formatText("市区町村"));
      }

      // Address3
      if (
        !isNullOrEmpty(data.address3) &&
        !CountCharacter.isFullSize(data.address3)
      ) {
        this.message.push(Message.E00013.formatText("町域"));
      }

      // Address4
      if (
        !isNullOrEmpty(data.address4) &&
        !CountCharacter.isJWZH(data.address4)
      ) {
        this.message.push(Message.E00015.formatText("番地・建物名"));
      }

      // TEL
      if (!isNullOrEmpty(data.tel) && !CountCharacter.isTelNumber(data.tel)) {
        this.message.push(Message.E00028.formatText("TEL"));
      }

      // FAX
      if (!isNullOrEmpty(data.fax) && !CountCharacter.isTelNumber(data.fax)) {
        this.message.push(Message.E00028.formatText("FAX"));
      }
    },

    getAddressByPostalCode() {
      if (!isNullOrEmpty(this.item.postalCode)) {
        this.$store.dispatch(
          "addressModule/getByPostalCode",
          this.item.postalCode
        );
      }
    },

    getSupplierCode(param) {
      this.$store
        .dispatch("supplierHandleModule/getSupplierHandleByCode", param)
        .then(res => {
          this.item = res.data;
        });
    },

    getSupplierHandleTab(param) {
      this.$store
        .dispatch("supplierHandleModule/getSupplierHandleTab", param)
        .then(res => {});
    },

    getAll(param) {
      this.$store
        .dispatch("supplierHandleModule/getAll", param)
        .then(res => {});
    },

    getAttachSupplierFile(params) {
      this.openDl = true;
      this.$store
        .dispatch("attackModule/getAttackSupplierTransporter", params)
        .then(resp => {
          this.attachSupplierFile = resp.data.items;
          this.pagingAttachSupplierFile.count = resp.data.count;
          this.pagingAttachSupplierFile.pageCount = resp.data.pageCount;
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
      this.openDl = true;
      if (!data) {
        this.$store
          .dispatch("attackModule/uploadFileSupplier", params)
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
          .dispatch("attackModule/updateAttackSupplier", params)
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
        .dispatch("attackModule/deleteAttackSupplier", params.fileCode)
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
        .dispatch("attackModule/downloadFileSupplier", params.fileCode)
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

    initParamsTab() {
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

    getCurrentPageAttachSupplierFile(data) {
      let params = { ...this.initParamsTab() };
      params.paging.page = data;
      this.getAttachSupplierFile(params);
    },

    getPageSizeAttachSupplierFile(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let params = { ...this.initParamsTab() };
      this.getAttachSupplierFile(params);
    }
  },

  computed: {
    ...mapGetters({
      address: "addressModule/getByPostalCode"
    })
  },

  watch: {
    address() {
      if (!this.address) {
        this.message.push(Message.E00029);
      } else {
        this.message = [];
        this.item.address1 = this.address.address1;
        this.item.address2 = this.address.address2;
        this.item.address3 = this.address.address3;
        this.item.address4 = this.address.address4;
      }
    }
  }
};
</script>
