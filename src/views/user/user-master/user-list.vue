<template>
  <div>
    <b-row>
      <b-col>
    <b-button
      class="float-right btn-form mb-2"
      size="sm"
      v-if="permissionGroup.Create"
      @click="onAdd"
    >{{ imgtext.general.btnAdd }}</b-button>
    </b-col>
    </b-row>
    <b-row>
      <b-col>
    <div v-if="dataTable.length">
      <BaseTablePermission
        :dataTable="dataTable"
        :fields.sync="fields"
        :tableId="tableId"
        :pageSize="pageSize"
        :pageCount="pageCount"
        :count="count"
        :permissionGroup="permissionGroup"
        :isUserScreen="true"
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
    <BasePopupMessage
      ref="modal-confirm"
      :title="titlePopupCustom"
      :sizePopup="sizePopup"
      :message="msgPopup"
      @isOK="onDelete"
    />
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import BaseTable from "@/components/BaseTable.vue";
import FormatData from "@/shared/FomatData";
import { isNullOrUndefined, canAction, common } from "@/shared/utilities";
import moment from "moment";
import { MasterProperty } from "@/shared/MasterProperty";
import IMText from "@/data/img-text";
import { mapGetters } from "vuex";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import DateTimeFormat from "@/constants/DateTimeFormat";
import * as lodash from "lodash";
import AppConfig from "@/constants/AppConfig";
import { Screen, Action } from "@/constants/Screen";
import BaseTablePermission from "@/components/BaseTablePermission.vue";
export default Vue.extend({
  props: ["onAdd", "items", "pageCount", "count", "pageSize"],
  components: {
    BaseTable,
    BasePopupMessage,
    BaseTablePermission
  },

  data() {
    return {
      imgtext: IMText,
      fields: [
        {
          key: "userType",
          slot: "HEAD_userType",
          label: IMText.general.usertypeName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "userRole",
          slot: "HEAD_userRole",
          label: IMText.general.userRoleName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "companyName",
          slot: "HEAD_companyName",
          label: IMText.general.userCustomerName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "branchName",
          slot: "HEAD_branchName",
          label: IMText.general.sshi0019.branchName,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "department",
          slot: "HEAD_userDepartment",
          label: IMText.general.userDepartment,
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "userCode",
          slot: "HEAD_userCode",
          label: IMText.general.userCode,
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
          label: IMText.general.sshi0021.tel,
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
        },
        {
          key: "lastLogin",
          slot: "HEAD_userLastLogin",
          label: IMText.general.userLastLogin,
          isSortable: true,
          isDesc: true,
          isAsc: true,
          formatter: value => {
            return isNullOrUndefined(value)
              ? ""
              : moment(String(value)).format(DateTimeFormat.DATE_DISPLAY);
          }
        },

        {
          key: "actionDirective",
          label: IMText.general.actionDirective,
          tdClass: "classButton"
        }
      ],
      tableId: "user-table",
      position: 4,
      dataButton: [
        {
          id: 1,
          label: IMText.general.btnUpdate,
          class: "btn-form btn-arrow-left pl-2 pr-2"
        },
        {
          id: 3,
          label: IMText.general.btnDelete,
          class: "btn-form btn-arrow-right pl-2 pr-2"
        }
      ],
      titlePopupCustom: "",
      sizePopup: "",
      msgPopup: "",
      permissionGroup: lodash.cloneDeep(AppConfig.PermissionGroup),
      user: {}
    };
  },
  created() {
    let count = 0;
    this.permissionGroup.Create = canAction(Action.Create, Screen.SSHI0020);
    if (canAction(Action.Update, Screen.SSHI0019)) {
      this.permissionGroup.Update = true;
      count++;
    } else if (canAction(Action.Read, Screen.SSHI0019)) {
      this.permissionGroup.Read = true;
      count++;
    }
    if (canAction(Action.Delete, Screen.SSHI0019)) {
      this.permissionGroup.Delete = true;
      count++;
    }

    if (count > 0) {
      this.fields.push(common.actionDirective(count));
    }
  },
  methods: {
    onPicker(data) {
      this.user = data.item;
      this.titlePopupCustom = this.imgtext.popup.confirm;
      this.sizePopup = "sm";
      this.msgPopup = this.imgtext.popup.confirmMsgDelete.formatText(
        this.imgtext.general.btnDelete
      );
      this.$refs["modal-confirm"].showModal();
    },

    onDelete() {
      this.$emit("onDelete", this.user);
      this.$refs["modal-confirm"].hideModal();
    },

    onUpdate(data) {
      this.$router.push({
        path: MasterProperty.FSHI0007.SSHI0021.Path,
        name: MasterProperty.FSHI0007.SSHI0021.Name,
        params: {
          userCode: data.item.userCode,
          roleCode: data.item.roleCode
        }
      });
    },
    onSelect(data) {
      this.$router.push({
        path: MasterProperty.FSHI0007.SSHI0021.Path,
        name: MasterProperty.FSHI0007.SSHI0021.Name,
        params: {
          userCode: data.item.userCode,
          roleCode: data.item.roleCode
        }
      });
    },
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
  mounted() {},

  computed: {
    ...mapGetters({}),

    dataTable() {
      return this.items;
    }
  }
});
</script>

<style>
</style>
