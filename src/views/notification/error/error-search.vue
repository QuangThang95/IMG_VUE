<template>
  <div>
    <b-card>
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
          <b-col></b-col>
          <b-col v-if="condition.notifySource === dataNotifySource.system.key">
            <b-form-group :label="imgtext.general.fshi0012.branch" :label-cols="2">
              <b-form-select v-model="selectedBranch" :options="options"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment';
import { NotifyClass, NotifyType, NotifySource } from '@/constants/General';
import IMText from '@/data/img-text.json';
import DateTimeFormat from '@/constants/DateTimeFormat';
import { isNullOrEmpty } from "@/shared/utilities";
export default {
  props: ['condition', 'options'],

  data() {
    return {
      imgtext: IMText,
      dataNotifyType: NotifyType,
      dataNotifySource: NotifySource,
      selectedBranch: null,
      selectedNotifyType: [],
      displayDateFrom: null,
      displayDateTo: null,
    };
  },

  async created() {
    this.displayDateFrom = this.formatDate(this.condition.dateFrom);
    this.displayDateTo = this.formatDate(this.condition.dateTo);
  },

  methods: {
    onReset() {
      this.displayDateFrom = this.formatDate(this.condition.dateFrom);
      this.displayDateTo = this.formatDate(this.condition.dateTo);
      this.$emit('onReset');
    },

    onSearch() {
      if(!isNullOrEmpty(this.selectedBranch)) 
      {
        this.condition.branchCode = this.selectedBranch;
      }else {
        this.condition.branchCode = null;
      }
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
      this.condition.notifyType = this.selectedNotifyType;
    },

    displayDateFrom() {
      this.condition.dateFrom = new Date(this.displayDateFrom);
    },

    displayDateTo() {
      this.condition.dateTo = new Date(this.displayDateTo);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
