<template>
  <div>
    <b-card :class="classByWaste">
      <div slot="header">
        <strong>{{ imgtext.general.titleSearch }}</strong>
        <b-button
          variant="dark"
          class="ml-2 btn-form"
          size="sm"
          @click="onReset"
        >{{ imgtext.general.reset }}</b-button>
        <b-button
          class="float-right btn-form"
          variant="dark"
          size="sm"
          @click="onSearch"
        >{{ imgtext.general.search }}</b-button>
      </div>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group :label="imgtext.general.fshi0012.notifyDate" :label-cols="2">
              <b-input-group style="width: 376px">
                <b-form-input type="date" v-model="displayDateFrom"></b-form-input>
                <label class="mt-1 ml-2 mr-2">~</label>
                <b-form-input type="date" v-model="displayDateTo"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="imgtext.general.fshi0012.branch" :label-cols="2">
              <b-form-select v-model="selectedBranch" :options="options"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group>
              <b-form-checkbox-group
                id="checkbox-group-request"
                name="checkbox-notify-type"
                v-model="selectedNotifyType"
              >
                <b-form-checkbox
                  :value="notifyType.tranfer.key"
                >{{ imgtext.general.fshi0012.tranferCheckbox }}</b-form-checkbox>
                <b-badge
                  pill
                  variant="primary badge-card"
                  :class="classByWaste"
                  v-if="totalTranfer > 0"
                >{{ totalTranfer }}</b-badge>
                <b-form-checkbox
                  :value="notifyType.edit.key"
                  class="ml-3"
                >{{ imgtext.general.fshi0012.editCheckbox }}</b-form-checkbox>
                <b-badge
                  pill
                  variant="primary badge-card"
                  :class="classByWaste"
                  v-if="totalEdit > 0"
                >{{ totalEdit }}</b-badge>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment';
import { WasteClass, NotifyClass, NotifyType } from '@/constants/General';
import IMText from '@/data/img-text.json';
import DateTimeFormat from '@/constants/DateTimeFormat';

export default {
  props: ['condition', 'wasteClass', 'options', 'totalTranfer', 'totalEdit', 'classByWaste'],

  data() {
    return {
      imgtext: IMText,
      notifyType: NotifyType,
      selectedBranch: null,
      selectedNotifyType: [],
      wasteClassSearch: 0,
      displayDateFrom: null,
      displayDateTo: null,
    };
  },

  async created() {
    this.onReset();
  },

  methods: {
    onReset() {
      this.wasteClassSearch = { ...this.wasteClass };
      this.displayDateFrom = this.formatDate(this.condition.dateFrom);
      this.displayDateTo = this.formatDate(this.condition.dateTo);
      this.$emit('onReset');
    },

    onSearch() {
      this.$emit('onSearch', this.condition);
    },

    onChangeBranch(option) {
      this.selectedBranch = option;
      this.$emit('onChangeBranch', this.selectedBranch);
    },

    formatDate(value, event) {
      return moment(value).format(DateTimeFormat.DATE_DEFAULT_DATEBOX);
    },

    formatDateCustom(value, event) {
      return moment(value).format(DateTimeFormat.DATE_YYYYMD);
    },
  },

  watch: {
    condition() {
      this.displayDateFrom = this.formatDate(this.condition.dateFrom);
      this.displayDateTo = this.formatDate(this.condition.dateTo);
      this.selectedNotifyType = [...this.condition.notifyType];
    },

    options() {
      if (!this.options) {
        return [];
      }
      if (this.options.length > 1) {
        this.selectedBranch = this.options[0].value;
        return;
      }
      this.selectedBranch = this.options[0].value;
    },

    selectedNotifyType() {
      this.condition.notifyType = [...this.selectedNotifyType];
    },

    selectedBranch() {
      this.condition.branchCode = this.selectedBranch;
    },

    displayDateFrom() {
      this.condition.dateFrom = this.displayDateFrom;
    },

    displayDateTo() {
      this.condition.dateTo = this.displayDateTo;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
