<template>
  <div>
    <b-row>
      <b-col>
        <label class="float-right" v-if="permissionGroup.Create">
          <div
            class="btn float-right btn-form mb-2 btn-secondary btn-sm upload-file"
          >{{ imgtext.general.btnAdd }}</div>
          <b-file class="hide-status" multiple v-on:change="onChange($event)" v-model="supplierFile" hidden></b-file>
        </label>
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
            :nameButtonGroup="checkText"
            :isUpdateFile="true"
            :permissionGroup="permissionGroup"
            @onChangeTable="onChangeTable"
            @onSelect="onSelect"
            @onPicker="onPicker"
            :pageCount="pageCount"
            :count="count"
            :pageSize="pageSize"
            @getCurrentPage="getCurrentPage"
            @getPageSize="getPageSize"
            @onSorting="onSorting"
          ></BaseTablePermission>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BaseTablePermission from "@/components/BaseTablePermission";
import IMText from "@/data/img-text.json";
import { mapGetters } from "vuex";
import AppConfig from "@/constants/AppConfig";
import FormatData from "@/shared/FomatData";
import { Message } from "@/constants/Message";
import { canAction, isNullOrEmpty, common } from "@/shared/utilities";
import { Screen, Action } from "@/constants/Screen";
import * as lodash from "lodash";
export default {
  props: ["tableId", "permissionGroup", "dataTable", "pageCount", "count", "pageSize"],
  components: {
    BaseTablePermission
  },
  data() {
    return {
      message: Message.E00021,
      imgtext: IMText,
      fields: [
        {
          key: "logicalFileName",
          slot: "HEAD_logicalFileName",
          label: IMText.general.physicalFileName,
          isSortable: true,
          isDesc: true,
          isAsc: true
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

      position: 0,
      supplierFile: [],
      files: [],
      dataAttachFile: {},
      checkText: {
        update: "選択",
        read: "参照",
        delete: "削除"
      }
    };
  },
  created() {
    let count = 0;
    if (this.permissionGroup.Update) {
      count++;
    }
    if (this.permissionGroup.Read) {
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
    onSelect(data) {
      this.$emit("onSelect", data);
    },
    onPicker(data) {
      this.$emit("onPicker", data);
    },

    onChange(event) {
      this.checkFile(event);
    },
    onChangeTable(event, data) {
      this.dataAttachFile = data.item;
      this.checkFile(event, this.dataAttachFile);
    },

    checkFile(event, data) {
      let totalSize = 0;
      this.files = event.target.files;
      if (!this.files || this.files.length > AppConfig.MaxLength.FileSize) {
        alert("File > 10");
        this.files = [];
        return false;
      } else {
        for (let item of this.files) {
          if (!this.onCheckExtention(item.name)) {
            this.files = [];
            return false;
          }
          totalSize += item.size;
          if (totalSize / (1014 * 1024) > AppConfig.MaxLength.FileSize) {
            this.files = [];
            return false;
          }
        }
        var resultArray = Object.keys(this.files).map(personNamedIndex => {
          let person = this.files[personNamedIndex];
          return person;
        });
        this.$emit("uploadFile", resultArray, data);
      }
    },
    onCheckExtention(file) {
      const res = file.split(".");
      if (
        res &&
        AppConfig.File.ExtensionWhite.includes(res[res.length - 1].toLowerCase())
      ) {
        return true;
      }
      return false;
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
    },
  },

  computed: {}
};
</script>