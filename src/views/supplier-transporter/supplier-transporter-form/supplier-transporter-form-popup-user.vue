<template>
  <div>
    <table v-if="!isReadOnly" class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="4">
          <span class="asterisk pl-4">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">登録日時</td>
        <td colspan="2" style="min-width: 165px" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">最終更新日時</td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">業者番号</td>
        <td colspan="3">
          <label>{{dataSupplier.supplierNumber}}</label>
        </td>
        <td class="titleColumn">業者名</td>
        <td colspan="5">
          <label>{{dataSupplier.supplierName}}</label>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">所属部署</td>
        <td colspan="11">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.department"></b-form-input>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>担当者名
        </td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.userName"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn" colspan="1">担当者名カナ</td>
        <td colspan="3">
          <b-input-group size="sm">
            <b-form-input v-model.trim="item.userKana"></b-form-input>
          </b-input-group>
        </td>
        <td class="titleColumn">{{ imgText.general.tel }}</td>
        <td colspan="3">
          <BaseInput
            @onValueChange="onValueChange"
            :nameInput="appConfig.Tel"
            :maxlength="maxlengthTel"
            :formattedInputValue="item.tel"
          />
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>Email
        </td>
        <td colspan="11">
          <b-form-input v-model.trim="item.email" size="sm"></b-form-input>
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          <b-form-textarea no-resize v-model.trim="item.memo"></b-form-textarea>
        </td>
      </tr>
    </table>

    <table v-else class="table table-box table-sm">
      <tr>
        <td class="border-none"></td>
        <td class="border-none" colspan="4">
          <span class="asterisk pl-4">* {{ imgText.general.inputRequired }}</span>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">登録日時</td>
        <td colspan="2" style="min-width: 165px" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.createDate | formatDate }}</span>
          </b-input-group>
        </td>

        <td class="titleColumn" v-if="imgStatus === true">最終更新日時</td>
        <td colspan="2" v-if="imgStatus === true">
          <b-input-group size="sm">
            <span>{{ item.lastUpdate | formatDate }}</span>
          </b-input-group>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">業者番号</td>
        <td colspan="3">
          <label>{{dataSupplier.supplierNumber}}</label>
        </td>
        <td class="titleColumn">業者名</td>
        <td colspan="5">
          <label>{{dataSupplier.supplierName}}</label>
        </td>
      </tr>
      <tr>
        <td class="titleColumn">所属部署</td>
        <td colspan="11">
          {{item.department}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn" colspan="1">
          <span class="asterisk">*</span>担当者名
        </td>
        <td colspan="3">
          {{item.userName}}
        </td>
        <td class="titleColumn" colspan="1">担当者名カナ</td>
        <td colspan="3">
          {{item.userKana}}
        </td>
        <td class="titleColumn">{{ imgText.general.tel }}</td>
        <td colspan="3">
          {{item.tel}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn">
          <span class="asterisk"></span>Email
        </td>
        <td colspan="11">
          {{item.email}}
        </td>
      </tr>
      <tr>
        <td class="titleColumn titleColumn-textarea">備考</td>
        <td colspan="11">
          {{item.memo}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import AppConfig from "@/constants/AppConfig";
import BaseTable from "@/components/BaseTable.vue";
import IMText from "@/data/img-text";

export default {
  props: ["item", "imgStatus", "dataSupplier", "isReadOnly"],

  components: {
    BaseInput,
    BaseTable
  },
  data() {
    return {
      imgText: IMText,
      appConfig: AppConfig.Name,
      maxlengthTel: AppConfig.MaxLength.Tel,
      selected: null
    };
  },

  methods: {
    onDelete() {},
    onValueChange(data) {
      this.item.tel = data;
    }
  }
};
</script>
