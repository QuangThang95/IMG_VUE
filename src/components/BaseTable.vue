<template>
  <div>
    <b-table
      :id="tableId"
      :items="dataTable"
      :fields="initData"
      :striped="true"
      :bordered="true"
      :outlined="true"
      :small="true"
      :per-page="pageSize"
      :current-page="1"
      @row-clicked="onRowClicked"
      sticky-header="stickerHeader"
    >
      <template v-for="field in fields" :slot="[field.slot]" slot-scope="data">
        {{data.label}}
        <BaseSort
          v-bind:key="field.key"
          :data="data"
          :fields="fields"
          @closeSort="closeSort"
          @onSorting="onSorting"
          v-if="field.isSortable === true"
        ></BaseSort>
      </template>
      <template slot="displayOrder" class="text-center">
        <b-button size="sm" class="btn-form btn-arrow-left">
          <i class="fa fa-long-arrow-up fa-sm pl-2 pr-2"></i>
        </b-button>
        <b-button size="sm" class="btn-form btn-arrow-right">
          <i class="fa fa-long-arrow-down fa-sm pl-2 pr-2"></i>
        </b-button>
      </template>
      <template slot="actionDirective" class="text-center" slot-scope="data">
        <div v-if="dataButton.length>0">
          <span v-for="item in dataButton" :key="item.id">
            <b-button
              v-if="item.id === 1"
              :class="item.class"
              size="sm"
              @click="onUpdate(data)"
            >{{item.label}}</b-button>
            <b-button
              v-if="item.id === 2"
              :class="item.class"
              size="sm"
              @click="onSelect(data)"
            >{{item.label}}</b-button>
            <b-button
              v-if="item.id === 3"
              :class="item.class"
              size="sm"
              @click="openModalDelete(data)"
            >{{item.label}}</b-button>
          </span>
        </div>
      </template>
      <template slot="checkbox" class="text-center">
        <b-form-checkbox id="checkbox-1" name="checkbox-1"></b-form-checkbox>
      </template>
    </b-table>
    <div v-if="isShowPagging">
      <BasePaging
        :items="dataTable"
        :tableId="tableId"
        :pageCount="pageCount"
        :count="count"
        :pageSize="pageSize"
        @getCurrentPage="getCurrentPage"
        @getPageSize="getPageSize"
      />
    </div>
  </div>
</template>

<script>
import BasePaging from "@/components/BasePaging.vue";
import BaseSort from "@/components/BaseSort.vue";
import BasePopupMessage from "@/components/BasePopupMessage.vue";
import AppConfig from "@/constants/AppConfig";

export default {
  props: {
    dataTable: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    tableId: {
      type: String,
      default: ""
    },
    onClickOK: {
      type: Function,
      default: () => 1
    },
    position: {
      type: Number,
      default: -1
    },
    isShowPagging: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    },
    dataButton: {
      type: Array,
      default: () => []
    },
    stickerHeader: {
      type: String,
      default: "500px"
    }
  },

  components: {
    BasePaging,
    BaseSort,
    BasePopupMessage
  },

  data() {
    return {
      titlePopupCustom: "",
      isVisible: true,
      pages: AppConfig.Pages,
      initData: this.fields
    };
  },

  methods: {
    closeSort(data) {
      this.isVisible = true;
      this.$emit("closeSort", data);
    },

    onSorting(data, ischeck) {
      this.isVisible = false;
      const sort = ischeck === "up" ? true : false;
      this.$emit("onSorting", data.column, sort);
    },

    openModalDelete(data) {
      this.$emit("onPicker", data);
    },

    onUpdate(data) {
      this.$emit("onUpdate", data);
    },

    onSelect(data) {
      this.$emit("onSelect", data);
    },

    onRowClicked() {
      this.$emit("onRowClicked");
    },

    getCurrentPage(data) {
      this.$emit("getCurrentPage", data);
    },

    getPageSize(data) {
      this.$emit("getPageSize", data);
    },

    orderByUp(data) {
      this.$emit("orderByUp", data);
    },

    orderByDown(data) {
      this.$emit("orderByDown", data);
    }
  },
  beforeCreate() {
    this.isVisible = true;
  },

  watch: {
    isVisible() {
      if (this.position && this.position > 0) {
        if (!this.isVisible) {
          this.fields[this.position].tdClass = "hidenColunm";
          this.fields[this.position].thClass = "hidenColunm";
        } else {
          this.fields[this.position].tdClass = "classButton";
          this.fields[this.position].thClass = "";
        }
      }
    }
  }
};
</script>
