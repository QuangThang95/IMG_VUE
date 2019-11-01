<template>
  <div>
    <b-container fluid>
      <BaseMessageError :title="title" :message="message"></BaseMessageError>
      <div v-if="!isShow">
        <FormSearch
          :options="options"
          :classByWaste="classByWaste"
          :currentCustomerCode="currentCustomerCode"
          :currentWasteClass="currentWasteClass"
          @onSearch="onSearch"
          @onChangeBranch="onChangeBranch"
        />
        <FormList
          @uploadFile="uploadFile"
          :classByWaste="classByWaste"
          :manifests="manifests"
          :name="name"
          :pageCount="pageCount"
          :count="count"
          :pageSize="pageSize"
          @onAdd="onAdd"
          @getCurrentPage="getCurrentPage"
          @getPageSize="getPageSize"
          @closeSort="closeSort"
          @onSorting="onSorting"
        />
      </div>
      <div v-if="isShow">
        <EmissionsSearch
          :options="options"
          :currentCustomerCode="currentCustomerCode"
          :currentWasteClass="currentWasteClass"
          :classByWaste="classByWaste"
          @onSearch="onSearch"
          @onChangeBranch="onChangeBranch"
        ></EmissionsSearch>
        <EmissionsGrid
          @uploadFile="uploadFile"
          :classByWaste="classByWaste"
          :manifests="manifests"
          :name="name"
          :pageCount="pageCount"
          :count="count"
          :pageSize="pageSize"
          @onAdd="onAdd"
          @getCurrentPage="getCurrentPage"
          @getPageSize="getPageSize"
          @closeSort="closeSort"
          @onSorting="onSorting"
        ></EmissionsGrid>
      </div>

      <b-row class="justify-content-md-center bottom">
        <BaseButtonGroupWasteClass
          :buttonWasteClass="buttons"
          @onClickButtonToggle="onClickButtonToggle"
        />
      </b-row>
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import { MasterProperty } from "@/shared/MasterProperty";
import FormSearch from "./manifest-search";
import FormList from "./manifest-list";
import EmissionsGrid from "../manifest-add/emissions-list/grid.vue";
import EmissionsSearch from "../manifest-add/emissions-list/search.vue";
import { WasteClass } from "@/constants/General";
import moment from "moment";
import contractGridVue from "../contract/contract-main/contract-grid.vue";
import {
  current,
  common,
  handleOutput,
  isNullOrUndefined
} from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";
import BaseMessageError from "@/components/BaseMessageError";
import { Message } from "@/constants/Message";
import BaseProcessing from "@/components/BaseProcessing";
import CountCharacter from "@/shared/CountCharacter";
import { mapGetters } from "vuex";
import BaseButtonGroupWasteClass from "@/components/BaseButtonGroupWasteClass";
import { ManifestService } from "@/services/manifest.service";
const manifestService = new ManifestService();
export default {
  components: {
    FormSearch,
    FormList,
    EmissionsGrid,
    EmissionsSearch,
    BaseMessageError,
    BaseProcessing,
    BaseButtonGroupWasteClass
  },

  data() {
    return {
      currentWasteClass: 1,
      wasteClasses: WasteClass,
      buttons: [],
      count: 0,
      pageCount: 0,
      pageSize: 10,
      pages: AppConfig.Pages,
      manifests: [],
      disposeReport: [],
      finalDisposeRepor: [],
      transportReport: [],
      classByWaste: "",
      name: "",
      isShow: false,
      // dataSelectBox: [],
      currentCustomerCode: current.customer().customerCode,
      title: "排出状況一覧",
      message: [],
      isSearch: false,
      openDl: false,
      currentUser: current.user()
    };
  },

  async created() {
    if (!isNullOrUndefined(this.currentUser.branchCode)) {
      await this.onChangeBranch(this.currentUser.branchCode);
    } else {
      await this.onChangeBranch(0);
    }
    this.currentWasteClass = current.wasteClass() ? current.wasteClass() : 1;
    this.setWasteColor(this.currentWasteClass);
    const param = {
      customerCode: this.currentCustomerCode,
      wasteClass: this.currentWasteClass
    };
    this.getCustomerBranchByWastClass(param);

    if (this.currentWasteClass === 4 || this.currentWasteClass === 5) {
      this.isShow = true;
    }

    AppConfig.Pages.page = 1;
    let param2 = { ...this.innitParam() };
    this.getListManifest(param2);
    const general = {
      key1: "排出物区分",
      key2: this.currentWasteClass
    };
    this.searchGeneral(general);
  },

  methods: {
    uploadFile(files, onButton) {
      let formData = new FormData();
      formData.append("fileUpload", files[0]);
      const param = {
        customerCode: this.currentCustomerCode,
        fileUpload: formData
      };
      if (this.isShow) {
        if (onButton === "upload") {
          return this.uploadFile45(param);
        }
        return this.deleteFile45(param);
      } else {
        if (onButton === "upload") {
          return this.uploadFile123(param);
        }
        return this.deleteFile123(param);
      }
    },

    innitParam() {
      const param = {
        CustomerCode: this.currentCustomerCode,
        WasteClass: this.currentWasteClass,
        pageSize: this.pageSize,
        page: AppConfig.Pages.page,
        descending: AppConfig.Pages.descending,
        orderField: "CreateDate"
      };
      return param;
    },

    onAdd() {
      this.$router.push({
        path: MasterProperty.FSHI0011.SSHI0032.Path,
        name: MasterProperty.FSHI0011.SSHI0032.Name
      });
    },
    mappingWasteClassToListButton(wasteClasses) {
      const listButton = [];
      for (const prop in wasteClasses) {
        if (wasteClasses[prop].id !== 0) {
          listButton.push({
            key: wasteClasses[prop].key,
            value: wasteClasses[prop].value,
            background: wasteClasses[prop].background,
            cssClassButton: wasteClasses[prop].cssClassButton,
            state:
              this.currentWasteClass === wasteClasses[prop].key ? true : false
          });
        }
      }
      return listButton;
    },

    onClickButtonToggle(btn) {
      this.isShow = false;
      this.buttons = this.buttons.map(b => {
        if (b !== btn) {
          b.state = false;
        } else {
          if (b.key === 4 || b.key === 5) {
            this.isShow = true;
          }
          this.currentWasteClass = b.key;
          current.setWasteClass(b.key);
        }
        return b;
      });
      this.setWasteColor(this.currentWasteClass);
      let param = { ...this.innitParam() };
      this.getListManifest(param);
    },

    setWasteColor(wasteClass) {
      switch (wasteClass) {
        case WasteClass.industrialWaste.key:
          this.classByWaste = WasteClass.industrialWaste.class;
          break;
        case WasteClass.industrialSpecialWaste.key:
          this.classByWaste = WasteClass.industrialSpecialWaste.class;
          break;
        case WasteClass.constructionWaste.key:
          this.classByWaste = WasteClass.constructionWaste.class;
          break;
        case WasteClass.valuableWaste.key:
          this.classByWaste = WasteClass.valuableWaste.class;
          break;
        case WasteClass.municipalWaste.key:
          this.classByWaste = WasteClass.municipalWaste.class;
          break;
        default:
          this.classByWaste = WasteClass.all.class;
          break;
      }
      localStorage.setItem("classByWaste", this.classByWaste);
    },
    getFlagName(arr, field1, field2) {
      return arr.map(item => {
        let newObject = new Object();
        if (item[field1] === 1) {
          newObject["flag"] = "済";
          newObject["varian"] = "secondary";
          item[field1] = newObject;
        } else {
          if (moment(item[field2], "YYYYMMDD").isAfter(moment())) {
            newObject["flag"] = "期限";
            newObject["varian"] = "danger";
            item[field1] = newObject;
          } else if (
            moment(item[field2], "YYYYMMDD").isAfter(moment().add(14, "day"))
          ) {
            newObject["flag"] = "期限";
            newObject["varian"] = "warning";
            item[field1] = newObject;
          }
        }
        return item;
      });
    },

    getCurrentPage() {
      let param = { ...this.innitParam() };
      param.page = this.pages.page;
      this.getListManifest(param);
    },

    getPageSize(data) {
      this.pageSize = data;
      AppConfig.Pages.page = 1;
      let param = { ...this.innitParam() };
      this.getListManifest(param);
    },

    getCustomerBranchByWastClass(param) {
      this.$store.dispatch(
        "manifestModule/getCustomerBranchByWasteClass",
        param
      );
    },

    deleteFile123(param) {
      this.message = [];
      manifestService
        .deleteFile123(param)
        .then(res => {
          if (res.data) {
            AppConfig.Pages.page = 1;
            let param = { ...this.innitParam() };
            this.getListManifest(param);
          }
        })
        .catch(
          err =>
            (this.message = this.message.concat(handleOutput.errorHandle(err)))
        );
    },

    deleteFile45(param) {
      this.message = [];
      manifestService
        .deleteFile45(param)
        .then(res => {
          if (res.data) {
            AppConfig.Pages.page = 1;
            let param = { ...this.innitParam() };
            this.getListManifest(param);
          }
        })
        .catch(
          err =>
            (this.message = this.message.concat(handleOutput.errorHandle(err)))
        );
    },

    uploadFile45(param) {
      this.message = [];
      manifestService
        .uploadFile45(param)
        .then(res => {
          if (res.data) {
            AppConfig.Pages.page = 1;
            let param = { ...this.innitParam() };
            this.getListManifest(param);
          }
        })
        .catch(
          err =>
            (this.message = this.message.concat(handleOutput.errorHandle(err)))
        );
    },

    uploadFile123(param) {
      this.message = [];
      manifestService
        .uploadFile123(param)
        .then(res => {
          if (res.data) {
            AppConfig.Pages.page = 1;
            let param = { ...this.innitParam() };
            this.getListManifest(param);
          }
        })
        .catch(
          err =>
            (this.message = this.message.concat(handleOutput.errorHandle(err)))
        );
    },

    getListManifest(param) {
      this.openDl = true;
      this.$store
        .dispatch("manifestModule/getListManifest", param)
        .then(res => {
          if (res.data.items.length < 1 && this.isSearch) {
            this.isSearch = false;
            this.message.push(Message.E00021);
          }
        })
        .catch(error => {
          this.message = this.message.concat(handleOutput.errorHandle(error));
        })
        .finally(() => {
          this.openDl = false;
        });
    },

    searchGeneral(param) {
      this.$store.dispatch("manifestModule/searchGeneral", param);
    },

    onSearch(data) {
      let param = { ...this.innitParam() };
      data.CustomerCode = param.CustomerCode;
      data.WasteClass = param.WasteClass;
      data.descending = param.descending;
      data.page = param.page;
      data.pageSize = param.pageSize;
      this.isSearch = true;
      this.message = [];
      this.getListManifest(data);
    },

    closeSort(data) {
      AppConfig.Pages.descending = true;
      const param = { ...this.innitParam() };
      this.getListManifest(param);
    },

    onSorting(data, isCheck) {
      AppConfig.Pages.orderField = CountCharacter.upCase(data);
      AppConfig.Pages.descending = isCheck;
      let param = { ...this.innitParam() };
      this.getListManifest(param);
    },

    async onChangeBranch(value) {
      await this.getDischargeWasteClassByBranch(
        this.currentCustomerCode,
        value
      );

      let listButtons = common.getButtonDischargeWasteClass(
        this.wasteClasses,
        this.dischargeWaste
      );
      this.buttons = common.mappingWasteClassToListButton(
        listButtons,
        this.currentWasteClass
      );
    },

    async getDischargeWasteClassByBranch(customerCode, branchCode) {
      this.openDl = true;
      await this.$store
        .dispatch("customerBranchModule/getDischargeWasteClassByBranch", {
          customerCode,
          branchCode
        })
        .finally(() => {
          this.openDl = false;
        });
    }
  },

  computed: {
    options() {
      return this.$store.state.manifestModule.byWasteClass;
    },

    dataTable() {
      return this.$store.state.manifestModule.manifests;
    },

    generalData() {
      return this.$store.state.manifestModule.general;
    },

    ...mapGetters({
      dischargeWaste: "customerBranchModule/getDischargeWasteClassByBranch"
    })
  },

  watch: {
    dataTable() {
      this.manifests = this.getFlagName(
        this.getFlagName(
          this.getFlagName(
            this.dataTable.items,
            "disposeReportFlag",
            "disposeReportLimit"
          ),
          "finalDisposeReportFlag",
          "finalDisposeReportLimit"
        ),
        "transportReportFlag",
        "disposeReportLimit"
      );
      this.count = this.dataTable.count;
      this.pageCount = this.dataTable.pageCount;
    },

    generalData() {
      this.name = (this.generalData.length > 0 && this.generalData[0].data1)?this.generalData[0].data1 : '';
    },

    currentWasteClass() {
      const param = {
        customerCode: this.currentCustomerCode,
        wasteClass: this.currentWasteClass
      };
      this.getCustomerBranchByWastClass(param);
      const general = {
        key1: "排出物区分",
        key2: this.currentWasteClass
      };
      this.searchGeneral(general);
    }
  }
};
</script>

<style>
</style>