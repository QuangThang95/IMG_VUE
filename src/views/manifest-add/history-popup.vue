<template>
  <div>
    <b-modal
      size="xl"
      id="sshi0033-history"
      hide-header
      hide-footer
      centered
      no-close-on-backdrop
      style="height: 800px"
    >
      <h6 class="fontColor mt-2 mb-4">変更履歴</h6>
      <b-container fluid>
        <div>
          <table class="table table-box table-sm">
            <tr>
              <td class="titleColumn">排出事業場</td>
              <td colspan="3">{{brandName}}</td>
            </tr>
            <tr>
              <td class="titleColumn">状況</td>
              <td colspan="3">{{name}}</td>
            </tr>
            <tr>
              <td class="titleColumn">引渡し日</td>
              <td colspan="3">{{deliveryDate|formatDate}}</td>
            </tr>
            <tr>
              <td class="titleColumn">番号</td>
              <td colspan="3">{{manifestNumber}}</td>
            </tr>
            <tr>
              <td class="titleColumn">引渡し担当者</td>
              <td colspan="3">{{userName}}</td>
            </tr>
          </table>
          <div class="fix-padding">
            <b-row>
              <b-col>
                <b-table
                  :fields="fields"
                  :items="dataTable"
                  :bordered="true"
                  :outlined="true"
                  :small="true"
                  selectable
                  :select-mode="selectMode"
                  @row-selected="onRowSelected"
                  id="manifestHistory"
                  sticky-header="stickerHeader"
                >
                  <template slot="NO" slot-scope="data">{{ data.index + 1 }}</template>
                  <template slot="userName">{{ userName }}</template>
                </b-table>
              </b-col>
            </b-row>
          </div>
          <div class="float-right mt-5 mb-4">
            <b-button class="btn-form ml-4" size="sm" @click="onClosePopUp">閉じる</b-button>
          </div>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import { current } from "@/shared/utilities";
export default {
  data() {
    return {
      fields: [
        {
          key: "NO",
          slot: "HEAD_NO",
          label: "NO"
        },

        {
          key: "modfyReson",
          slot: "HEAD_modfyReson",
          label: "変更理由"
        },
        {
          key: "updateHistory",
          slot: "HEAD_updateHistory",
          label: "変更内容"
        },
        {
          key: "userName",
          slot: "HEAD_userName",
          label: "登録担当"
        },
        {
          key: "createDate",
          slot: "HEAD_createDate",
          label: "変更時間"
        }
      ],
      brandName: "",
      name: "",
      deliveryDate: "",
      manifestNumber: "",
      userName: current.user().userName,
      currentCustomerCode: current.customer().customerCode,
      selectMode: "single",
      selected: [],
      stickerHeader: "500px"
    };
  },

  created() {
    const param = {
      entryCode: +this.$route.params.manifestNumber,
      customerCode: this.currentCustomerCode
    };
    this.getManifestHistory(param);
  },

  methods: {
    onRowSelected(items) {
      this.selected = items;
    },

    getManifestHistory(param) {
      this.$store.dispatch("manifestModule/getManifestHistory", param);
    },

    onClosePopUp() {
      let selBox = document.createElement("textarea");
      if (this.selected.length > 0) {
        selBox.value = this.selected[0].updateHistory;
        document.body.appendChild(selBox);
        setTimeout(() => {
          selBox.select();
          document.execCommand("copy");
          document.body.removeChild(selBox);
        }, 100);
      }
      this.$bvModal.hide("sshi0033-history");
    }
  },

  computed: {
    dataTable() {
      return this.$store.state.manifestModule.manifestHistory;
    }
  },

  watch: {
    dataTable() {
      if (this.dataTable.length > 0) {
        this.brandName = this.dataTable[0].branchName;
        this.name = this.dataTable[0].data1;
        this.deliveryDate = this.dataTable[0].deliveryDate;
        this.manifestNumber = this.dataTable[0].manifestNumber;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table td {
  table-layout: fixed;
  width: 180px;
}

.fix-padding {
  height: 300px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
