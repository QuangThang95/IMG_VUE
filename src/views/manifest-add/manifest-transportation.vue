<template>
  <div>
    <b-card
      header-tag="header"
      :class="classByWaste"
      body-class="p-0 m-0"
      id="card-header-trans"
      footer-tag="footer"
    >
      <div slot="header">
        <b>取集運搬情報</b>
      </div>
      <div v-if="transportsForm.length > 0">
        <b-table
          :fields="fields"
          :items="transportsForm"
          :bordered="true"
          :outlined="true"
          :small="true"
          :id="idTable"
          class="tranportation"
        >
          <template slot="transportstaff" slot-scope="data">
            <Select2
              class="optionStaff"
              :options="data.value"
              :settings="{ tags: true, disabled: isReadOnly }"
              v-model="data.item.transportStaffCode"
              @change="onChangeValueSelectBox(data)"
            />
          </template>
          <template slot="vehicle" slot-scope="vehicle">
            <b-form-select
              :options="vehicle.value.vehicleTypeTon"
              class="col-6"
              v-model="vehicle.item.vehicleTypeTonValue"
              :disabled="isReadOnly"
              @change="onChange(true)"
            ></b-form-select>
            <b-form-select
              :options="vehicle.value.vehicleType"
              class="col-6"
              v-model="vehicle.item.vehicleTypeValue"
              :disabled="isReadOnly"
              @change="onChange(true)"
            ></b-form-select>
          </template>
          <template slot="vehicleNumber" slot-scope="number">
            <b-input
              v-if="!isReadOnly"
              v-model.trim="number.item.vehicleNumber"
              @change="onChange(true)"
            ></b-input>
            <span v-if="isReadOnly">{{number.item.vehicleNumber}}</span>
          </template>
          <template slot="isChecboxed" slot-scope="data">
            <b-form-checkbox v-model="data.value" @input="getCheckBox(data)" :disabled="isReadOnly"></b-form-checkbox>
          </template>
          <template slot="HEAD_transporterName" slot-scope="data">
            <span class="asterisk">*</span>
            {{data.label}}
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>
<script>
import CountCharacter from "@/shared/CountCharacter";
import Select2 from "v-select2-component";
import { SupplierHandleService } from "@/services/supplier-handle.service";
import HttpStatus from "http-status-codes";
const supplierHandleService = new SupplierHandleService();
export default {
  props: [
    "general4",
    "general5",
    "transports",
    "classByWaste",
    "currentCustomerCode",
    "isReadOnly"
  ],
  components: { Select2 },
  data() {
    return {
      isVisible: true,
      fields: [
        {
          key: "sectionNumber",
          slot: "HEAD_section_number",
          label: "区間",
          thClass: "titleColumn"
        },
        {
          key: "transporterName",
          slot: "HEAD_transporterName",
          label: "収集運搬業者",
          thClass: "titleColumn"
        },

        {
          key: "factoryName",
          slot: "HEAD_factoryName",
          label: "積替保管施設",
          thClass: "titleColumn"
        },
        {
          key: "isChecboxed",
          slot: "HEAD_isChecboxed",
          label: "再委託",
          tdClass: "classOneButton",
          thClass: "titleColumn"
        },
        {
          key: "reTransporterName",
          slot: "HEAD_supplier_name1",
          label: "再委託先業者",
          thClass: "titleColumn"
        },
        {
          key: "data1",
          slot: "HEAD_transport_code",
          label: "運搬方法",
          thClass: "titleColumn"
        },
        {
          key: "transportstaff",
          slot: "HEAD_transportstaff",
          label: "運搬担当者",
          thClass: "staffClass titleColumn"
        },
        {
          key: "vehicle",
          slot: "HEAD_vehicle",
          label: "車種",
          thClass: "titleColumn"
        },
        {
          key: "vehicleNumber",
          slot: "HEAD_vehicleNumber",
          label: "車両番号",
          thClass: "titleColumn"
        }
      ],
      idTable: "sshi0032-table",
      transportsForm: this.transports,
      isCheck: false,
      inputSupplier: 0,
      staff: []
    };
  },
  created() {
    this.onBeforeUnLoad();
  },

  methods: {
    getCheckBox(data) {
      if (data.value) {
        const data1 = {
          customerCode: this.currentCustomerCode,
          param: {
            userTypeCode: 5,
            supplierCode: data.item.reTransporterCode
          }
        };
        this.getTransportStaff(data1, data);
      } else {
        const data1 = {
          customerCode: this.currentCustomerCode,
          param: {
            userTypeCode: 5,
            supplierCode: data.item.transporterCode
          }
        };
        this.getTransportStaff(data1, data);
      }
    },

    onChangeValueSelectBox(data) {
      const index = data.item.transportstaff.findIndex(
        i => i.id == data.item.transportStaffCode
      );
      if (index === -1) {
        const param = {
          customerCode: this.currentCustomerCode,
          usertypeCode: 5,
          supplierCode:
            data.item.reTransporterCode === null
              ? data.item.transporterCode
              : data.item.isChecboxed
              ? data.item.reTransporterCode
              : data.item.transporterCode,
          userName: data.item.transportStaffCode
        };
        this.addUser(param, data);
      }
    },

    addUser(param, data) {
      supplierHandleService.createSupplierUser(param).then(res => {
        if (res.status === HttpStatus.OK) {
          const arr = [];
          arr.push(res.data);
          data.item.transportstaff = data.item.transportstaff.concat(
            arr.map(el => {
              return {
                id: el.userCode,
                text: el.userName
              };
            })
          );
          data.item.transportStaffCode = res.data.userCode;
        }
      });
    },

    getTransportStaff(param, data) {
      this.$store
        .dispatch("manifestModule/getTransportStaff", param)
        .then(res => {
          if (res.status === HttpStatus.OK) {
            data.item.transportstaff = res.data.map(el => {
              return {
                id: el.userCode,
                text: el.userName
              };
            });
          }
        });
    },

    onChange(data) {
      this.isChangeData = data;
      this.$store.dispatch("manifestModule/checkDirtyForm", data);
    },

    onBeforeUnLoad() {
      window.addEventListener("beforeunload", event => {
        CountCharacter.outFocus();
        if (this.isChangeData) {
          event.preventDefault();
          event.returnValue = "";
        }
      });
    }
  },

  computed: {
    transportStaff() {
      return this.$store.state.manifestModule.transportStaff;
    }
  },

  watch: {
    transportStaff() {
      this.staff = this.transportStaff.map(item => {
        return { id: item.userCode, text: item.userName };
      });
    },

    transports() {
      this.transportsForm = this.transports;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/custom/manifest/_transporter.scss";

#card-header-trans .card-header {
  padding: 5px 0px 5px 2px;
}
</style>