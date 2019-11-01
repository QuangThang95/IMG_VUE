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
            <b-col md="7" v-b-tooltip.top.hover :title="items.supplierName" class="text-elipsis">{{items.supplierName}}</b-col>
            <b-col v-if="imgStatus == false" md="2">
              <b-button class="btn-form float-right" size="sm" @click="showAgent">選択</b-button>
            </b-col>
            <b-col md="3">
              <b-form-checkbox
                value="1"
                class="float-right"
                v-model="items.reportFlag"
                :disabled="isReadOnly"
                @change="onChange(true)"
              >行政報告不要</b-form-checkbox>
            </b-col>
          </b-row>
        </td>
        <td class="titleColumn" v-if="imgStatus == true">業者番号</td>
        <td colspan="5" v-if="imgStatus == true">{{items.supplierNumber}}</td>
      </tr>
      <tr>
        <td class="titleColumn">事業場番号(任意)</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input v-model="items.factoryNumber" :readonly="isReadOnly" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">事業場区分</td>
        <td colspan="5">
          <b-form-select
            size="sm"
            :disabled="isReadOnly"
            :options="itemsDataDropHeader"
            v-model="changeSelected"
            @change="onChange(true)"
          ></b-form-select>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk">*</span>
          事業場名
        </td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input v-model.trim="items.factoryName" :readonly="isReadOnly" :maxlength="maxName" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">事業場名カナ</td>
        <td colspan="5">
          <b-input-group size="sm">
            <b-form-input v-model.trim="items.factoryKana" :readonly="isReadOnly" :maxlength="maxKana" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">郵便番号</td>
        <td colspan="3">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.PostalCode"
            :maxlength="appConfig.MaxLength.PostalCode"
            :formattedInputValue="items.postalCode"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td colspan="8">
          <b-button class="btn-form" size="sm" @click="onSearchAddress" :disabled="isReadOnly">住所検索</b-button>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">都道府県</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="items.address1" :readonly="isReadOnly" :maxlength="maxAddress1" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">市区町村</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="items.address2" :readonly="isReadOnly" :maxlength="maxAddress2" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">町域</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="items.address3" :readonly="isReadOnly" :maxlength="maxAddress3" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">番地・建物名</td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input v-model.trim="items.address4" :readonly="isReadOnly" :maxlength="maxAddress4" @change="onChange(true)"></b-form-input>
          </b-input-group>
        </td>
      </tr>

      <tr>
        <td class="titleColumn">TEL</td>
        <td colspan="2">
          <BaseInputPermission
            @onValueChange="onValueChange"
            :nameInput="appConfig.Name.Tel"
            :maxlength="appConfig.MaxLength.Tel"
            :formattedInputValue="items.tel"
            :readonly="isReadOnly"
            @onChange="onChangeInput"
          />
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>JWNET加入者番号
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              v-model.trim="items.jwnetNumber"
              :readonly="isReadOnly"
              :maxlength="maxlengthJwnetNumber"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>公開確認番号
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              v-model.trim="items.jwnetPassword"
              :readonly="isReadOnly"
              :maxlength="maxlengthJwnetPassword"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">
          <span class="asterisk">*</span>JWNET事業場コード
        </td>
        <td colspan="2">
          <b-input-group size="sm">
            <b-form-input
              v-model.trim="items.jwnetFactoryCode"
              :readonly="isReadOnly"
              :maxlength="jwnetCode"
              @change="onChange(true)"
            ></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea
            no-resize
            size="lg"
            v-model.trim="items.memo"
            :readonly="isReadOnly"
            :maxlength="maxMemo"
            @change="onChange(true)"
          ></b-form-textarea>
        </td>
      </tr>
    </table>
    <Agent @selectSupplier="selectSupplier" :permissionGroup="permissionGroup"
    :popupId="popupId"></Agent>
  </div>
</template>

<script>
import BaseInputPermission from "@/components/BaseInputPermission.vue";
import AppConfig from "@/constants/AppConfig";
import Agent from "../factory-detail-popup/factory-master-search-popup";
import CountCharacter from "@/shared/CountCharacter";
export default {
  props: [
    "items",
    "imgStatus",
    "itemsDataDropHeader",
    "isReadOnly",
    "permissionGroup",
    "selected",
    "isChange"
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
      popupId:"agentModal1",
      isChangeData: false,
    };
  },
  created() {
    this.onBeforeUnLoad();
    this.changeSelected = this.selected;
  },

  destroyed() {
    this.isChangeData = false;
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
      this.$bvModal.show(this.popupId);
    },
    selectSupplier(data) {
      this.items.supplierCode = data.supplierCode;
      this.items.supplierNumber = data.supplierNumber;
      this.items.supplierName = data.supplierName;
    },
    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    },
    onChange(data) {
      this.isChangeData = data;
    },

    onChangeInput(data) {
      this.isChangeData = data;
    },
    canDeactivate() {
      return this.isChangeData;
    },

  },
  watch: {
    selected() {
      this.changeSelected = this.selected;
    },

    isChange() {
      this.isChangeData = false;
    }
  }
};
</script>
<style>
.text-elipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>