<template>
  <div>
    <table class="table table-box table-sm">
      <tr>
        <td colspan="6" class="asterisk" style="border-right: 0px;">
          <b-row>
            <b-col></b-col>
            <b-col>* は必須入力</b-col>
            <b-col></b-col>
          </b-row>
        </td>
        <td class="titleColumn" v-if="imgStatus == true">登録日時</td>
        <td colspan="2" v-if="imgStatus == true">{{items.createDate | formatDate}}</td>
        <td class="titleColumn" v-if="imgStatus == true">最終更新日時</td>
        <td colspan="2" v-if="imgStatus == true">{{items.lastUpdate | formatDate}}</td>
      </tr>

      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>業者名
        </td>
        <td colspan="5">
          <b-row>
            <b-col>{{items.supplierName}}</b-col>
            <b-col v-if="imgStatus == false">
              <b-button class="btn-form float-right" size="sm" @click="showAgent">選択</b-button>
            </b-col>
            <b-col>
              <b-form-checkbox
                value="1"
                class="float-right"
                v-model="items.reportFlag"
                :disabled="isReadOnly"
              >行政報告不要</b-form-checkbox>
            </b-col>
          </b-row>
        </td>
        <td class="titleColumn" v-if="imgStatus == true">業者番号</td>
        <td colspan="5" v-if="imgStatus == true">{{items.supplierNumber}}</td>
      </tr>
      <tr>
        <td class="titleColumn">事業場番号</td>
        <td colspan="5">
          {{items.factoryNumber}}
        </td>
        <td class="titleColumn">事業場区分</td>
        <td colspan="5">
          {{dataSelect}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          事業場名
        </td>
        <td colspan="5">
          {{items.factoryName}}
        </td>
        <td class="titleColumn">事業場名カナ</td>
        <td colspan="5">
          {{items.factoryKana}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn">郵便番号</td>
        <td colspan="3">
          {{items.postalCode}}
        </td>
        <td colspan="8">
        </td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="3">
          {{items.address1}}
        </td>
        <td class="titleColumn">市区町村</td>
        <td colspan="3">
          {{items.address2}}
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="3">
          {{items.address3}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">
          {{items.address4}}
        </td>
      </tr>

      <tr>
        <td class="titleColumn">TEL</td>
        <td colspan="2">
          {{items.tel}}
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>JWNET加入者番号
        </td>
        <td colspan="2">
          {{items.jwnetNumber}}
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>公開確認番号
        </td>
        <td colspan="2">
          {{items.jwnetPassword}}
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>JWNET事業場コード
        </td>
        <td colspan="2">
          {{items.jwnetFactoryCode}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          {{items.memo}}
        </td>
      </tr>
    </table>
    <Agent ref="agent-Modal" @selectSupplier="selectSupplier"></Agent>
  </div>
</template>

<script>
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import AppConfig from "@/constants/AppConfig";
import Agent from "../factory-detail-popup/factory-master-search-popup";
export default {
  props: [
    "items",
    "imgStatus",
    "itemsDataDropHeader",
    "isReadOnly",
    "permissionGroup",
    "selected",
  ],
  components: {
    BaseInputPermission,
    Agent
  },

  data() {
    return {
      message: [],
      appConfig: AppConfig,
      checkPopupAddress: "header",
      maxlengthJwnetPassword: AppConfig.MaxLength.JwnetPassword,
      maxlengthJwnetNumber: AppConfig.MaxLength.JwnetNumber,
      jwnetCode: AppConfig.MaxLength.FwnetCode,
      maxMemo: AppConfig.MaxLength.Memo,
      maxAddress1: AppConfig.MaxLength.Address1,
      maxAddress2: AppConfig.MaxLength.Address2,
      maxAddress3: AppConfig.MaxLength.Address3,
      maxAddress4: AppConfig.MaxLength.Address4,
      maxKana: AppConfig.MaxLength.Kana,
      maxName: AppConfig.MaxLength.Name,
      selectedHeder: "",
      changeSelected: null,
      dataSelect: ""
    };
  },
  created() {
    this.changeSelected = this.selected;
    this.dataSelect = this.itemsDataDropHeader.find(x => x.value == this.selected);
  },
  methods: {
    getData() {
      this.items.factoryClass = this.changeSelected;
      return this.items;
    },
    onSearchAddress() {
      this.$emit("checkPopupAddress", this.checkPopupAddress);
      this.$emit("onSearchAddress", this.items.postalCode);
    },
    onValueChange(data, name) {
      switch (name) {
        case this.appConfig.Name.PostalCode:
          this.items.postalCode = data;
          break;
        case this.appConfig.Name.Tel:
          this.items.tel = data;
          break;
        default:
          break;
      }
    },
    showAgent() {
      this.$refs["agent-Modal"].showModal();
    },
    selectSupplier(data) {
      this.items.supplierCode = data.supplierCode;
      this.items.supplierNumber = data.supplierNumber;
      this.items.supplierName = data.supplierName;
    },
    canDeactivate() {
      return false;
    },
  },
  watch: {
    selected() {
      this.changeSelected = this.selected;
    },
    itemsDataDropHeader() {
      if(this.itemsDataDropHeader.length > 0 && this.selected != null)
      this.dataSelect = this.itemsDataDropHeader.find(x => x.value == this.selected).text
    },
    items() {
      if(this.itemsDataDropHeader.length > 0 && this.selected != null)
      this.dataSelect = this.itemsDataDropHeader.find(x => x.value == this.selected).text
    }
  }
};
</script>
