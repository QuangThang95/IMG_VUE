<template>
  <div>
    <b-modal
      size="xl"
      class="popup-modal popup-height"
      :id="popupId"
      hide-header
      hide-footer
      centered
    >
      <template slot="default">
        <BaseMessageError :title="title" :message="message" classBase></BaseMessageError>
        <div class="base-select-popup">
          <b-row class="base-select-search-popup">
            <b-col cols="12">
              <b-row class="mb-3">
                <b-col cols="5">
                  <b-input-group prepend="処分業者" class="mt-3" size="sm">
                    <b-form-input :disabled="true" v-model="contractPartDetail.desName"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="5">
                  <b-input-group prepend="処分業者事業場" class="mt-3" size="sm">
                    <b-form-input
                      :disabled="true"
                      v-model="contractPartDetail.factoryName"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div v-if="dataTable.length">
                <BaseTableNotPaging :dataTable="dataTable" :fields="fields" :tableId="tableId" />
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <BaseButtonGroup
                :imgStatus="imgStatus"
                :visibleClose="false"
                @onAddUpdate="onAddContractFinal"
              />
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import BaseMessageError from "@/components/BaseMessageError";
import BaseTableNotPaging from "@/components/BaseTableNotPagging.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup.vue";
import IMText from "@/data/img-text.json";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseTableNotPaging,
    BaseButtonGroup,
    BaseMessageError
  },
  props: ["contractPartDetail", "popupId", "loadPopup"],
  data() {
    return {
      imgText: IMText,
      message: [],
      title: IMText.title.sshi0030AddContractFinal,
      dataAll: {},
      fields: [
        {
          key: "finalFactoryName",
          slot: "HEAD_finalFactoryName",
          label: "事業場名"
        },
        {
          key: "address",
          slot: "HEAD_address",
          label: "所在地"
        },
        {
          key: "tel",
          slot: "HEAD_tel",
          label: "TEL"
        },
        {
          key: "disposeName",
          slot: "HEAD_disposeName",
          label: "処分方法"
        },
        {
          key: "capability",
          slot: "HEAD_capability",
          label: "施設処理能力"
        },
        {
          key: "checkbox",
          label: IMText.general.btnChoice,
          tdClass: "classButton"
        }
      ],
      tableId: "table" + this.popupId,
      imgStatus: false,
      dataTable: []
    };
  },

  methods: {
    onAddContractFinal() {
      this.$emit("onAddContractFinal", this.dataSelect());
      this.$bvModal.hide(this.popupId);
    },

    getData() {
      this.$emit("getDefineFactoryFinals");
    },

    dataSelect() {
      const dataSelected = this.dataTable.filter(
        item => item.checkbox === true
      );
      const finalFactoryCodes = dataSelected.map(item => {
        return item.finalFactoryCode;
      });
      return finalFactoryCodes;
    },

    dataNotSelect() {
      const dataNotSelected = this.dataTable.filter(
        item => item.checkbox === false
      );
      return dataNotSelected;
    }
  },

  computed: {
    ...mapGetters({
      dataDefineFactoryFinals:
        "factoryFinalModule/getFactoryFinalForContractFinal"
    })
  },

  watch: {
    loadPopup() {
      this.getData();
    },

    dataDefineFactoryFinals() {
      this.dataTable = this.dataDefineFactoryFinals.map(item => {
        item.checkbox = false;
        return item;
      });
    }
  }
};
</script>