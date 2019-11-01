<template>
  <div v-if="dataTable && dataTable.length">
    <BaseTablePermission
      :dataTable="dataTable"
      :fields.sync="fields"
      :tableId="tableId"
      :position="position"
      :class="classByWaste"
      :permissionGroup="permissionGroup"
      @onRowClicked="onRowClicked"
      :pageSize="pageSize"
      :pageCount="pageCount"
      @closeSort="closeSort"
      @onSorting="onSorting"
      :count="count"
      @getCurrentPage="getCurrentPage"
      @getPageSize="getPageSize"
    ></BaseTablePermission>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator';
import BaseTablePermission from '@/components/BaseTablePermission.vue';
import { Notification } from '@/models/notification.model';
import IMText from '@/data/img-text.json';
import FormatData from '@/shared/FomatData';
import AppConfig from '@/constants/AppConfig';
import { canAction, common } from '@/shared/utilities';
import { Screen, Action } from '@/constants/Screen';
import * as lodash from 'lodash';
import { navigation } from '@/shared/utilities';

export default {
  props: ['items', 'wasteClass', 'classByWaste', 'pageCount', 'count', 'pageSize'],

  components: {
    BaseTablePermission
  },

  data() {
    return {
      imgtext: IMText,
      tableId: 'sshi0012-report-table',
      fields: [{
        key: 'createDate',
        label: IMText.general.fshi0012.createDate,
        slot: 'HEAD_createDate',
        isSortable: true,
        isDesc: true,
        isAsc: true,
        formatter: value => {
          return FormatData.displayDateTime(value);
        }
      },
      {
        key: 'branchName',
        label: IMText.general.fshi0012.branchName,
        slot: 'HEAD_branchName',
        isSortable: true,
        isDesc: true,
        isAsc: true
      },
      {
        key: 'notifyText',
        label: IMText.general.fshi0012.notifyText,
        slot: 'HEAD_notifyText',
        isSortable: true,
        isDesc: true,
        isAsc: true
      },
      {
        key: 'manifestNumber',
        label: IMText.general.fshi0012.manifestNumber,
        slot: 'HEAD_manifestNumber',
        isSortable: true,
        isDesc: true,
        isAsc: true
      },
      {
        key: 'contactNumber1',
        label: IMText.general.fshi0012.contactNumber1,
        slot: 'HEAD_contactNumber1',
        isSortable: true,
        isDesc: true,
        isAsc: true
      },
      {
        key: 'contactNumber2',
        label: IMText.general.fshi0012.contactNumber2,
        slot: 'HEAD_contactNumber2',
        isSortable: true,
        isDesc: true,
        isAsc: true
      },
      {
        key: 'contactNumber3',
        label: IMText.general.fshi0012.contactNumber3,
        slot: 'HEAD_contactNumber3',
        isSortable: true,
        isDesc: true,
        isAsc: true
      },
      {
        key: 'deliveryDate',
        label: IMText.general.fshi0012.deliveryDate,
        slot: 'HEAD_deliveryDate',
        isSortable: true,
        isDesc: true,
        isAsc: true,
        formatter: value => {
          return FormatData.displayDate(value);
        }
      },
      {
        key: 'endDate',
        label: IMText.general.fshi0012.endDate,
        slot: 'HEAD_endDate',
        isSortable: true,
        isDesc: true,
        isAsc: true,
        formatter: value => {
          return FormatData.displayDate(value);
        }
      },
      {
        key: 'sectionNumber',
        label: IMText.general.fshi0012.sectionNumber,
        slot: 'HEAD_sectionNumber',
        isSortable: true,
        isDesc: true,
        isAsc: true
      }
      ],
      position: -1,
      notification: Notification,
      permissionGroup: lodash.clone(AppConfig.PermissionGroup),
    }
  },

  created() {
    this.permissionGroup.Read = canAction(Action.Read, Screen.SSHI0035);
  },

  methods: {
    onRowClicked(data) {
      this.$store.dispatch('notificationModule/setDataError', data);
      navigation.sshi0033Update(data);
    },

    getCurrentPage(data) {
      this.$emit('getCurrentPage', data);
    },

    getPageSize(data) {
      this.$emit('getPageSize', data);
    },

    closeSort(data) {
      this.$emit('closeSort', data);
    },

    onSorting(data, ischeck) {
      this.$emit('onSorting', data, ischeck);
    },
  },

  computed: {
    dataTable() {
      return this.items;
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/scss/style.scss";
</style>
