<template>
  <div>
    <b-row>
      <b-col>
        <div v-if="dataTable.length">
          <b-table
            :id="tableId"
            :items="dataTable"
            :fields="fields"
            :striped="true"
            :bordered="true"
            :outlined="true"
            :small="true"
            :sticky-header="stickerHeader"
          >
            <template slot="unitQuantity" class="text-center" slot-scope="data">
              <b-form-input
                v-model.trim="data.item.unitQuantity"
                :state="data.item.stateUnitQuantity"
                :maxlength="appConfig.MaxLength.UnitQuantity"
                size="sm"
                :disabled="true"
              ></b-form-input>
            </template>

            <template slot="unitCode" class="text-center" slot-scope="data">
              <b-form-select size="sm" v-model="data.item.unitCode" :options="unitCodeOption" :disabled="true"></b-form-select>
            </template>

            <template slot="unitCost" class="text-center" slot-scope="data">
              <b-form-input
                v-model.trim="data.item.unitCost"
                :maxlength="appConfig.MaxLength.UnitCost"
                :state="data.item.stateUnitCost"
                @keypress="onKeyPress"
                size="sm"
                :disabled="true"
              ></b-form-input>
            </template>

            <template slot="collectCycle" class="text-center" slot-scope="data">
              <b-form-input v-model.trim="data.item.collectCycle" :maxlength="appConfig.MaxLength.CollectCycle" size="sm" :disabled="true"></b-form-input>
            </template>

            <template slot="recycleRate" class="text-center" slot-scope="data">
              <b-form-input
                v-model.trim="data.item.recycleRate"
                :maxlength="appConfig.MaxLength.RecycleRate"
                size="sm"
                style="margin-top: -2px;"
                :disabled="true"
              ></b-form-input>
              <span>%</span>
            </template>

            <!-- <template slot="actionDirective" class="text-center" slot-scope="data">
              <div v-if="dataButton.length>0">
                <span v-for="item in dataButton" :key="item.id">
                  <b-button
                    v-if="item.id === 3"
                    :class="item.class"
                    size="sm"
                    @click="onPicker(data)"
                  >{{item.label}}</b-button>
                </span>
              </div>
            </template> -->
          </b-table>
        </div>
      </b-col>
    </b-row>
    <ContractWasteAdd
      :popupId="popupId"
      :loadPopup="loadPopup"
      @getDefineWaste="getDefineWaste"
      @onAddContractWaste="onAddContractWaste"
    />
  </div>
</template>

<script>
import ContractWasteAdd from "./contract-waste-add-popup.vue";
import IMText from "@/data/img-text.json";
import FormatData from "@/shared/FomatData";
import AppConfig from "@/constants/AppConfig";
import { common } from "@/shared/utilities";

export default {
  props: ["dataTable", "unitCodeOption"],
  components: {
    ContractWasteAdd
  },
  data() {
    return {
      appConfig: AppConfig,
      fields: [
        {
          key: "wasteName",
          slot: "HEAD_wasteName",
          label: "大分類",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data1",
          slot: "HEAD_data1",
          label: "中分類",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data2",
          slot: "HEAD_data2",
          label: "処分類",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "data3",
          slot: "HEAD_data3",
          label: "排出物名",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "wasteCode",
          slot: "HEAD_wasteCode",
          label: "分類コード",
          isSortable: true,
          isDesc: true,
          isAsc: true
        },
        {
          key: "unitQuantity",
          slot: "HEAD_unitQuantity",
          label: "数量",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "th-width"
        },
        {
          key: "unitCode",
          slot: "HEAD_unitCode",
          label: "単位",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "th-width"
        },
        {
          key: "unitCost",
          slot: "HEAD_unitCost",
          label: "単価",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "th-width"
        },
        {
          key: "collectCycle",
          slot: "HEAD_collectCycle",
          label: "回収頻度",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "th-width"
        },
        {
          key: "recycleRate",
          slot: "HEAD_recycleRate",
          label: "リサイクル率",
          isSortable: true,
          isDesc: true,
          isAsc: true,
          thClass: "th-width",
          tdClass: "display-flex"
        },
        {
          key: "lastUpdate",
          label: IMText.general.lastUpdate,
          width: "auto",
          formatter: value => {
            return FormatData.displayDate(value);
          }
        }
      ],
      tableId: "sshi0029UpdateTab1",
      dataButton: [
        {
          id: 3,
          label: IMText.general.btnDelete,
          class: "btn-form btn-arrow-right pl-2 pr-2"
        }
      ],
      stickerHeader: "500px",
      popupId: "sshi0030-contract-waste-popup-add",
      dataTableAdd: [],
      loadPopup: {}
    };
  },

  methods: {
    onAdd() {
      this.loadPopup = { ...this.loadPopup };
      this.$bvModal.show(this.popupId);
    },

    onPicker(data) {
      this.$emit("onPicker", data, false);
    },

    getDefineWaste() {
      this.$emit("getDefineWaste");
    },

    onAddContractWaste(data) {
      this.$emit("onAddContractWaste", data);
    },

    onKeyPress(evt) {
      common.onKeyPressOnlyNumber(evt);
    }
  }
};
</script>
