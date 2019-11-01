<template>
  <div>
    <b-row>
      <b-col>
        <div v-if="permissionGroup.Create">
          <b-button
            class="float-right btn-form mt-2 mb-2"
            size="sm"
            @click="onAdd"
            v-if="permissionGroup.Create"
          >追加</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="itemsFactoryFinal && itemsFactoryFinal.length > 0">
        <BaseTablePermission
          :dataTable="itemsFactoryFinal"
          :fields="fields"
          :tableId="tableId"
          :position="position"
          @onUpdate="onUpdate"
          @onPicker="onPicker"
          :permissionGroup="permissionGroup"
          @onSelect="onSelect"
          @getCurrentPage="getCurrentPage"
          @getPageSize="getPageSize"
          @onSorting="onSorting"
          @closeSort="closeSort"
          :count="countTab2"
          :pageCount="pageCountTab2"
          :pageSize="pageSizeTab2"
        ></BaseTablePermission>
        </div>
        <BasePopupMessage
          ref="modal-confirm"
          :title="titlePopupCustom"
          :sizePopup="sizePopup"
          :message="msgPopup"
          @isOK="onDeleteTab2"
        />
        <PopUp2AddUpdate
          :items="dataFactoryFinal"
          :imgStatus="popupStatus"
          :popupId="popupId"
          :itemsDatadropGeneral="datadropGeneral"
          :readOnly="isReadOnly"
          :checkShowTitle="checkShowTitle"
          @resetList="resetList"
        />
        <PopUp2AddUpdateReadOnly
          :items="dataFactoryFinal"
          :imgStatus="popupStatus"
          :popupId="popupIdReadOnly"
          :itemsDatadropGeneral="datadropGeneral"
          :readOnly="isReadOnly"
          :checkShowTitle="checkShowTitle"
          @resetList="resetList"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BaseTablePermission from "@/components/BaseTablePermission.vue";
import PopUp2AddUpdate from "../factory-detail-popup/factory-details-tab2-popup2.vue";
import PopUp2AddUpdateReadOnly from "../factory-detail-popup/factory-details-tab2-popup2-readonly.vue";
import FormatData from "@/shared/FomatData";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import FactoryFinal from "@/models/factoryFinal.model";
import IMText from "@/data/img-text";
import { current, navigation } from "@/shared/utilities";
import { isNullOrEmpty } from "@/shared/utilities";
import CountCharacter from "@/shared/CountCharacter";
import { Message } from "@/constants/Message";
import { mapGetters } from "vuex";
export default {
  props: [
    "itemsfactoryNumberName",
    "isReadOnly",
    "permissionGroup",
    "itemsFactoryFinal",
    "pageCountTab2",
    "countTab2",
    "pageSizeTab2"
  ],
  components: {
    BaseTablePermission,
    PopUp2AddUpdate,
    PopUp2AddUpdateReadOnly,
    BasePopupMessage
  },
  data() {
    return {
      fields: [
        {
          key: "finalFactoryName",
          label: "事業場名",
          slot: "HEAD_finalFactoryName",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "address",
          label: "所在地",
          slot: "HEAD_address",
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
          key: "disposeName",
          label: "処分方法",
          slot: "HEAD_disposeName",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "capability",
          label: "最終更新日時",
          slot: "HEAD_capability",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "lastUpdate",
          label: "最終更新日",
          formatter: value => {
            return FormatData.displayDate(value);
          }
        },
        {
          key: "actionDirective",
          label: "操作",
          tdClass: "classButton"
        }
      ],
      tableId: "sshi0008-table",
      position: -1,
      factoryFinal: FactoryFinal,
      titlePopupCustom: "",
      sizePopup: "",
      imgtext: IMText,
      msgPopup: "",

      popupId: "factoryTab2Popup1",
      popupIdReadOnly: "factoryTab2Popup1ReadOnly",
      popupStatus: Boolean,
      dataFactoryFinal: {
        customerCode: 0,
        supplierCode: 0,
        factoryCode: 0,
        finalFactoryCode: 0,
        finalFactoryName: "",
        finalFactoryKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        tel: "",
        disposeCode: 0,
        capability: "",
        memo: "",
        createDate: "",
        lastUpdate: "",
        disposeName: ""
      },
      datadropGeneral: [],
      checkShowTitle: true
    };
  },
  async created() {
    this.factoryCode = +this.$route.params.factoryCode;
    this.supplierCode = +this.$route.params.supplierCode;
    const params = {
      customerCode: current.customer().customerCode,
      supplierCode: this.supplierCode,
      factoryCode: this.factoryCode
    };
  },

  methods: {
    getDetailsFactoryFinal(data) {
      const factoryCode = +this.$route.params.factoryCode;
      const supplierCode = +this.$route.params.supplierCode;
      const params = {
        customerCode: current.customer().customerCode,
        supplierCode: supplierCode,
        factoryCode: factoryCode,
        finalFactoryCode: data.finalFactoryCode
      };
      this.$store
        .dispatch("factoryFinalModule/getFactoryFinalById", params)
        .then(resp => {
          this.dataFactoryFinal = resp.data;
          this.dataFactoryFinal.factoryNumber = this.itemsfactoryNumberName.factoryNumber;
          this.dataFactoryFinal.factoryName = this.itemsfactoryNumberName.factoryName;
          this.dataFactoryFinal.factoryCode = this.itemsfactoryNumberName.factoryCode;
          this.dataFactoryFinal.supplierCode = this.itemsfactoryNumberName.supplierCode;
          this.dataFactoryFinal.customerCode = this.itemsfactoryNumberName.customerCode;
          this.dataFactoryFinal.supplierName = this.itemsfactoryNumberName.supplierName;
        });
      let paramsGeneral = {
        key1: "処分方法",
        data5: 3,
        data6: 1
      };
      this.$store
        .dispatch("generalModule/getGeneralIndustryCode1", paramsGeneral)
        .then(resp => {
          this.datadropGeneral = resp.data;
        });
    },

    onUpdate(data) {
      this.checkShowTitle = true;
      this.popupStatus = true;
      this.getDetailsFactoryFinal(data.item);
      this.$bvModal.show(this.popupId);
    },
    onSelect(data) {
      this.checkShowTitle = false;
      this.popupStatus = true;
      this.getDetailsFactoryFinal(data.item);
      this.$bvModal.show(this.popupIdReadOnly);
    },

    onAdd() {
      this.dataFactoryFinal = {
        factoryNumber: this.itemsfactoryNumberName.factoryNumber,
        factoryName: this.itemsfactoryNumberName.factoryName,
        factoryCode: this.itemsfactoryNumberName.factoryCode,
        supplierCode: this.itemsfactoryNumberName.supplierCode,
        customerCode: this.itemsfactoryNumberName.customerCode,
        supplierName: this.itemsfactoryNumberName.supplierName,
        finalFactoryCode: 0,
        finalFactoryName: "",
        finalFactoryKana: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        tel: "",
        disposeCode: 0,
        capability: "",
        memo: "",
        disposeName: ""
      };
      this.popupStatus = false;
      this.$bvModal.show(this.popupId);
    },

    onPicker(data) {
      this.dataFactoryFinal = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDeleteTab2() {
      this.$emit("onDeleteTab2", this.dataFactoryFinal);
      this.$refs["modal-confirm"].hideModal();
    },

    resetList(data) {
      this.$emit("resetListTab2", data);
    },

    getPageSize(data) {
      this.$emit("getPageSizeTab2", data);
    },

    closeSort(data) {
      this.$emit("closeSortTab2", data);
    },

    onSorting(data, ischeck) {
      this.$emit("onSortingTab2", data, ischeck);
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPageTab2", data);
    }
  },
  watch: {},
  computed: {}
};
</script>
