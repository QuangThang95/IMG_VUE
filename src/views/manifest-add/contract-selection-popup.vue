<template>
  <div>
    <b-modal size="huge" id="fshi0011-contract" hide-header hide-footer centered @hidden="onHidden">
      <BaseMessageError :message="message" :title="title" />
      <b-row>
        <b-col cols="2">
          <!-- <table class="table table-box table-sm">
            <tr>
              <td class="titleColumn">排出事業場</td>
              <td>排出事業場</td>
            </tr>
          </table>-->
          <b-input-group prepend="排出事業場" size="sm">
            <b-form-input :readonly="true" value="排出事業場"></b-form-input>
          </b-input-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="契約名" :label-cols="3">
            <b-form-input type="text" autocomplete="name" v-model="search.contractName" size="sm"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="業者名" :label-cols="3">
            <b-form-input type="text" autocomplete="name" v-model="search.supplierName" size="sm"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="排出物名" :label-cols="4">
            <b-form-input type="text" autocomplete="name" v-model="search.wasteName" size="sm"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="1">
          <b-button class="btn-form float-right" @click="onSearch" size="sm">検索</b-button>
        </b-col>
      </b-row>
      <BaseTable
        :fields="fields"
        :dataTable="contract"
        :idTable="idTable"
        :position="position"
        :dataButton="dataButton"
        :pageSize="pageSize"
        :pageCount="pageCount"
        :count="count"
        @onUpdate="getData"
        @getCurrentPage="getCurrentPage"
        @closeSort="closeSort"
        @onSorting="onSorting"
        @getPageSize="getPageSize"
        @orderByUp="orderByUp"
        @orderByDown="orderByDown"
        :isShowPagging="false"
      ></BaseTable>
    </b-modal>
  </div>
</template>
<script>
import { Vue } from "vue-property-decorator";
import BaseMessageError from "@/components/BaseMessageError.vue";
import BaseTable from "@/components/BaseTable.vue";
import { current, handleOutput } from "@/shared/utilities";
export default {
  props: [
    "currentCustomerCode",
    "currentBranchCode",
    "currentWasteClass",
    "deliveryDate",
    "isManifest45"
  ],

  components: {
    BaseTable,
    BaseMessageError
  },
  data() {
    return {
      currentPage: 1,
      fields: [
        {
          key: "contractName",
          slot: "HEAD_contractName",
          label: "契約名"
        },
        {
          key: "supplierName1",
          slot: "HEAD_supplierName1",
          label: "収集運搬業者1"
        },

        {
          key: "supplierFactoryName1",
          slot: "HEAD_supplierFactoryName1",
          label: "運搬先1"
        },
        {
          key: "supplierName2",
          slot: "HEAD_supplierName2",
          label: "収集運搬業者2"
        },
        {
          key: "supplierFactoryName2",
          slot: "HEAD_supplierFactoryName2",
          label: "運搬先2"
        },
        {
          key: "supplierName3",
          slot: "HEAD_supplierName3",
          label: "収集運搬業者3"
        },
        {
          key: "supplierFactoryName3",
          slot: "HEAD_supplierFactoryName3",
          label: "運搬先3"
        },
        {
          key: "supplierName4",
          slot: "HEAD_supplierName4",
          label: "収集運搬業者4"
        },
        {
          key: "supplierFactoryName4",
          slot: "HEAD_supplierFactoryName4",
          label: "運搬先4"
        },
        {
          key: "supplierName5",
          slot: "HEAD_supplierName5",
          label: "収集運搬業者5"
        },

        {
          key: "supplierFactoryName5",
          slot: "HEAD_supplierFactoryName5",
          label: "運搬先5"
        },
        {
          key: "actionDirective",
          label: "選択",
          tdClass: "classOneButton"
        }
      ],
      position: -1,
      dataButton: [
        {
          id: 1,
          label: "選択",
          class: "btn-form pl-2 pr-2"
        }
      ],
      idTable: "fshi0011contract",
      contract: [],
      pageCount: 0,
      count: 0,
      pageSize: 10,
      contractNextItem: {},
      contractPreviousItem: {},
      message: [],
      title: "契約選択",
      search: {
        contractName: "",
        supplierName: "",
        wasteName: ""
      }
    };
  },

  created() {
    this.message = [];
    const data = { ...this.getInitParam() };
    this.getContract(data);
  },
  methods: {
    getInitParam() {
      const data = {
        customerCode: this.currentCustomerCode,
        param: {
          branchCode: this.currentBranchCode,
          wasteClass: this.currentWasteClass,
          contractName: this.search.contractName,
          supplierName: this.search.supplierName,
          wasteName: this.search.wasteName
        }
      };
      return data;
    },

    onHidden() {
      this.message = [];
    },
    getData(data) {
      const param = {
        contractCode: data.item.contractCode,
        deliveryDate: this.deliveryDate.replace(/-/g, "")
      };
      this.message = [];
      if (!this.isManifest45) {
        return this.$store
          .dispatch("manifestModule/checkContractToCreateManifest", param)
          .then(res => {
            if (res.data) {
              this.$emit("getData", data.item, res.data);
              this.$bvModal.hide("fshi0011-contract");
            }
          })
          .catch(err => {
            this.message = this.message.concat(handleOutput.errorHandle(err));
            this.$emit("getData", data.item, false);
          });
      }
      return this.$emit("getContractByWasteClass45", data.item);
    },

    getCurrentPage() {},

    getPageSize(data) {},

    closeSort(data) {},

    onSorting(data, isCheck) {},

    orderByUp() {},

    orderByDown() {},

    getContract(param) {
      this.$store.dispatch("manifestModule/getContract", param);
    },

    onSearch() {
      const data = { ...this.getInitParam() };
      this.getContract(data);
    }
  },

  computed: {
    dataTable() {
      return this.$store.state.manifestModule.contract;
    }
  },

  watch: {
    dataTable() {
      this.contract = this.dataTable.items;
    },

    currentBranchCode() {
      const data = {
        customerCode: this.currentCustomerCode,
        param: {
          branchCode: this.currentBranchCode,
          wasteClass: this.currentWasteClass
        }
      };
      this.getContract(data);
    }
  }
};
</script>
<style lang="scss" scoped>
table td {
  table-layout: fixed;
  width: 180px;
}
</style>