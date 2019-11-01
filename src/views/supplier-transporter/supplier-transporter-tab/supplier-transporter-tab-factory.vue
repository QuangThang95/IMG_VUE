<template>
  <div>
    <b-row>
      <b-col>
        <b-button
          v-if="permissionGroup.Create"
          class="float-right btn-form mb-2"
          size="sm"
          @click="onAdd"
        >{{ imgtext.general.btnAdd }}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="dataTable && dataTable.length> 0">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields="fields"
            :tableId="tableId"
            :position="position"
            :permissionGroup="permissionGroup"
            :pageSize="pageSize"
            :pageCount="pageCount"
            :count="count"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            @onSelect="onSelect"
            @closeSort="closeSort"
            @onSorting="onSorting"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
          />
        </div>
      </b-col>
    </b-row>

    <SupplierTransporterPopupFactory
      :item="factory"
      :dataSupplier="dataSupplier"
      :imgStatus="popupStatus"
      @onChangeStatus="onChangeStatus"
      :datadropGeneralTab1="datadropGeneralTab1"
      @loadList="loadList"
      :dataTable="attachSupplierPopupFile"
      :permissionGroup="permissionGroup"
      @getAttachSupplierFileTransporter="getAttachSupplierFileTransporter"
      :isReadOnly="isReadOnly"
      :pagingAttachSupplierPopupFile="pagingAttachSupplierPopupFile"
      :pageSizeAttachSupplierPopupFile="pageSizeAttachSupplierPopupFile"
      @getCurrentPage="getCurrentPageAttachSupplierPopupFile"
      @getPageSize="getPageSizeAttachSupplierPopupFile"
    />

    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onDelete"
    />
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import BaseTablePermission from "@/components/BaseTablePermission";
import IMText from "@/data/img-text.json";
import FormatData from "@/shared/FomatData";
import { isNullOrUndefined, tryMapPathApiEncoded } from "@/shared/utilities";
import moment from "moment";
import { Message } from "@/constants/Message";
import DateTimeFormat from "@/constants/DateTimeFormat";
import BasePopupMessage from "@/components/BasePopupMessage";
import SupplierTransporterPopupFactory from "../supplier-transporter-popup/supplier-transporter-popup-factory";
import { common } from "@/shared/utilities";
import { mapGetters } from "vuex";
import CountCharacter from "@/shared/CountCharacter";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  props: [
    "items",
    "permissionGroup",
    "dataSupplier",
    "datadropGeneralTab1",
    "attachSupplierPopupFile",
    "isReadOnly",
    "pagingAttachSupplierPopupFile",
    "pageSizeAttachSupplierPopupFile"
  ],
  components: {
    BaseTablePermission,
    BasePopupMessage,
    SupplierTransporterPopupFactory,
    BaseProcessing
  },

  data() {
    return {
      imgtext: IMText,
      message: Message.E00021,
      fields: [
        {
          key: "factoryNumber",
          slot: "HEAD_factoryNumber",
          label: IMText.general.factoryNumber,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "factoryName",
          slot: "HEAD_factoryName",
          label: IMText.general.factoryName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: IMText.general.address,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "tel",
          slot: "HEAD_tel",
          label: IMText.general.tel,
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
          key: "displayOrder",
          label: IMText.general.displayOrder,
          tdClass: "classButton"
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
          }
        }
      ],
      tableId: "sshi0012-tab1-table",
      position: 4,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      imgStatus: false,
      popupStatus: false,
      pageCount: 0,
      count: 0,
      pageSize: 10,
      factory: {},
      dataTable: {},
      initParamsPaging: {
        pageSize: 10,
        orderField: "DisplayOrder",
        page: 1,
        descending: true
      },
      openDl: false,
    };
  },

  created() {
    let count = 0;
    if (this.permissionGroup.Update) {
      count++;
    } else if (this.permissionGroup.Read) {
      this.fields = this.fields.filter(item => item.key != "displayOrder");
      count++;
    }
    if (this.permissionGroup.Delete) {
      count++;
    }
    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },

  methods: {
    initParams() {
      const param = {
        supplierCode: this.dataSupplier.supplierCode,
        customerCode: this.dataSupplier.customerCode,
        pageSize: this.pageSize,
        orderField: "DisplayOrder",
        page: 1,
        descending: true
      };
      return param;
    },

    onAdd() {
      this.popupStatus = false;
      this.factory = {
        customerCode: this.dataSupplier.customerCode,
        supplierNumber: "",
        factoryNumber: "",
        factoryClass: Number,
        factoryName: "",
        factoryKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        tel: "",
        memo: "",
        url: "",
        jwnetNumber: ""
      };
      this.$bvModal.show("sshi0012-popup-factory");
    },

    onUpdate(data) {
      this.factory = { ...data.item };
      this.popupStatus = true;
      this.$bvModal.show("sshi0012-popup-factory");
    },
    onSelect(data) {
      this.factory = data.item;
      this.popupStatus = true;
      this.$bvModal.show("sshi0012-popup-factory");
    },
    onChangeStatus(value) {
      this.popupStatus = value;
    },
    loadList() {
      this.$emit("loadList");
    },
    onPicker(data) {
      this.factory = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      this.openDl = true;
      this.$store
        .dispatch("factoryModule/deleteFactory", this.factory)
        .then(res => {
          this.loadList();
          this.getCurrentPage();
        }).finally(() => {
          this.openDl = false;
        });
      this.$refs["modal-confirm"].hideModal();
    },

    getAll(param) {
      this.openDl = true;
      this.$store.dispatch(
        "factoryModule/getFactoryBySupplierCode",
        tryMapPathApiEncoded(param)
      ).finally(() => {
          this.openDl = false;
      });
    },

    buildParamsPagingTab1(condition){

      this.initParamsPaging.pageSize = condition.pageSize;
      this.initParamsPaging.orderField = condition.orderField;
      this.initParamsPaging.page = condition.page;
      this.initParamsPaging.descending = condition.descending;

      return {
        supplierCode: this.dataSupplier.supplierCode,
        customerCode: this.dataSupplier.customerCode,
        param: {
          pageSize: this.initParamsPaging.pageSize,
          orderField: this.initParamsPaging.orderField,
          page: this.initParamsPaging.page,
          descending: this.initParamsPaging.descending
        }
      }
    },

    getCurrentPage(data) {
      let param = { ...this.initParams() };
      param.page = data;
      this.getAll(param);

      let condition = {
        pageSize: this.initParamsPaging.pageSize,
        orderField: this.initParamsPaging.orderField,
        page: data,
        descending: this.initParamsPaging.descending
      }

      let prepareParams = this.buildParamsPagingTab1(condition);

      this.getFactoryCarriers(prepareParams);
    },

    getPageSize(data) {
      this.pageSize = data;
      let param = { ...this.initParams() };
      this.getAll(param);

      let condition = {
        pageSize: data,
        orderField: this.initParamsPaging.orderField,
        page: this.initParamsPaging.page,
        descending: this.initParamsPaging.descending
      }

      let prepareParams = this.buildParamsPagingTab1(condition);

      this.getFactoryCarriers(prepareParams);
    },

    closeSort(data) {
      const param = { ...this.initParams() };
      this.getAll(param);

      let condition = {
        pageSize: this.initParamsPaging.pageSize,
        orderField: 'DisplayOrder',
        page: this.initParamsPaging.page,
        descending: true
      }
      
      let prepareParams = this.buildParamsPagingTab1(condition);

      this.getFactoryCarriers(prepareParams);

    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.initParams() };
      this.getAll(param);

      let condition = {
        pageSize: this.initParamsPaging.pageSize,
        orderField: CountCharacter.upCase(data),
        page: this.initParamsPaging.page,
        descending: isCheck
      }

      let prepareParams = this.buildParamsPagingTab1(condition);

      this.getFactoryCarriers(prepareParams);
      
    },

    getFactoryCarriers(params) {
      this.$store.dispatch("factoryModule/getFactoryCarriers", params);
    },

    getAttachSupplierFileTransporter(data) {
      this.$emit("getAttachSupplierFileTransporter", data);
    },

    getCurrentPageAttachSupplierPopupFile(data) {
      this.$emit("getCurrentPageAttachSupplierPopupFile", data);
    },

    getPageSizeAttachSupplierPopupFile(data) {
      this.$emit("getPageSizeAttachSupplierPopupFile", data);
    }
  },
  computed: {
    ...mapGetters({
      data: "factoryModule/getFactoryCarriers"
    })
  },
  watch: {
    data() {
      this.dataTable = this.data.items;
      this.pageCount = this.data.pageCount;
      this.count = this.data.count;
    }
  }
};
</script>

