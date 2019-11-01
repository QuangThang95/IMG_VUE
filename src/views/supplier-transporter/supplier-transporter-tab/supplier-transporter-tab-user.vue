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
        <div v-if="dataTable && dataTable.length">
          <BaseTablePermission
            :dataTable="dataTable"
            :fields="fields"
            :tableId="tableId"
            :position="position"
            :permissionGroup="permissionGroup"
            @onPicker="onPicker"
            @onUpdate="onUpdate"
            @onSelect="onSelect"
            @getCurrentPage="getCurrentPage"
            @closeSort="closeSort"
            @onSorting="onSorting"
            @getPageSize="getPageSize"
            :pageCount="pageCount"
            :count="count"
            :pageSize="pageSize"
          />
        </div>
      </b-col>
    </b-row>
    <PopupUser
      @loadList="loadList"
      :dataSupplier="dataSupplier"
      :imgStatus="popupStatus"
      :item="supplierUser"
      @onChangeStatus="onChangeStatus"
      :isReadOnly="isReadOnly"
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
import { mapGetters } from "vuex";
import BasePopupMessage from "@/components/BasePopupMessage";
import PopupUser from "../supplier-transporter-popup/supplier-transporter-popup-user";
import { Message } from "@/constants/Message";
import { common } from "@/shared/utilities";
import BaseProcessing from "@/components/BaseProcessing";
export default {
  props: [
    "items",
    "dataSupplier",
    "permissionGroup",
    "pageCount",
    "count",
    "pageSize",
    "isReadOnly"

  ],
  components: {
    BaseTablePermission,
    PopupUser,
    BasePopupMessage,
    BaseProcessing
  },
  data() {
    return {
      imgtext: IMText,
      fields: [
        {
          key: "department",
          slot: "HEAD_departmentr",
          label: IMText.general.department,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "userName",
          slot: "HEAD_userName",
          label: IMText.general.userName,
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
          key: "email",
          slot: "HEAD_email",
          label: IMText.general.email,
          isSortable: true,
          isDesc: true,
          isAsc: true
        }
      ],
      tableId: "sshi0012-tab4-table",
      position: 0,
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      imgStatus: false,
      popupStatus: false,
      supplierUser: {},
      message: Message.E00021,
      user: {},
      popupId: "sshi0012-popup-user",
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
    onAdd(data) {
      this.popupStatus = false;
      this.supplierUser = {
        department: null,
        userName: null,
        userKane: null,
        tel: null,
        email: null,
        memo: null
      };
      this.$bvModal.show(this.popupId);
    },
    loadList() {
      this.$emit("loadList");
    },
    onUpdate(data) {
      this.popupStatus = true;
      this.supplierUser = {...data.item};
      this.$bvModal.show(this.popupId);
    },
    onSelect(data) {
      this.popupStatus = true;
      this.supplierUser = {...data.item};
      this.$bvModal.show(this.popupId);
    },
    onChangeStatus(value) {
      this.popupStatus = value;
    },

    onPicker(data) {
      this.supplierUser = {...data.item};
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      this.openDl = true;
      let paramsDelete = {
        userCode: this.supplierUser.userCode,
        lastUpdate: this.supplierUser.lastUpdate
      };
      this.$store
        .dispatch("supplierHandleModule/deleteSupplierUser", paramsDelete)
        .then(() => {
          this.$emit("loadList");
        }).finally(() => {
          this.openDl = false;
        });
      this.$refs["modal-confirm"].hideModal();
    },

    // Todo Paging
    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    closeSort(data) {
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      this.$emit("onSorting", data, ischeck);
    }
  },
  computed: {
    dataTable: function() {
      return this.items;
    }
  }
};
</script>

