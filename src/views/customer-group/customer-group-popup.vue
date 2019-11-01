<template>
  <div>
    <b-container fluid>
      <div>
        <b-modal
          id="sshi0009PopUp"
          ref="modal"
          hide-footer
          hide-header
          size="xl"
          style="height: 800px"
          class="huss"
          v-model="isShow"
          centered
          no-close-on-backdrop
        >
          <h6 class="fontColor">排出事業場グループ編集</h6>
          <div class="ml-3">
            <b-row class="mt-5 mb-3">
              <b-col md="2">
                <label class="fontColor" for="input-small">グループ</label>
              </b-col>
              <b-col md="3">
                <b-form-input size="sm" :placeholder="groupName" disabled></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="2">
                <label for="input-small">選択済み</label>
              </b-col>
              <b-col md="5">
                <label for="input-small"></label>
              </b-col>
              <b-col md="5">
                <label for="input-small">未選択</label>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="5">
                <b-form-select
                  v-model="selected1"
                  :options="options1"
                  multiple
                  :select-size="4"
                  style="height: 300px"
                ></b-form-select>
              </b-col>
              <b-col md="2" style="text-align: center; padding-top:100px">
                <div>
                  <b-button class="btn-form" @click="onRightClick">{{ moveRight }}</b-button>
                </div>
                <div style="padding-top : 15px;">
                  <b-button class="btn-form" @click="onLeftClick">{{ moveLeft }}</b-button>
                </div>
              </b-col>
              <b-col md="5">
                <b-form-select
                  v-model="selected2"
                  :options="options2"
                  multiple
                  :select-size="4"
                  style="height: 300px"
                ></b-form-select>
              </b-col>
            </b-row>
            <div class="float-right mt-3">
              <b-button class="btn-form" size="sm" @click="onSave">変更</b-button>
              <b-button class="btn-form ml-4" size="sm" @click="onClosePopUp">閉じる</b-button>
            </div>
          </div>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import IMText from "@/data/img-text";
export default {
  props: ["groupName", "groupCode", "currentCustomerCode", "isShowPopup"],
  data() {
    return {
      imgText: IMText,
      isShow: false,
      isSubmit: false,
      moveLeft: "<",
      moveRight: ">",
      selected1: [],
      selected2: [],
      options1: [],
      options2: [],
      dataUpdate: [],
      originalArr1: [],
      originalArr2: []
    };
  },

  methods: {
    loadInit() {
      this.isSubmit = false;
      const groupCode = +this.$route.params.groupCode;
      const paramLeft = {
        customerCode: this.currentCustomerCode,
        groupCode: groupCode | this.groupCode,
        belongToGroup: true
      };
      const paramRight = {
        customerCode: this.currentCustomerCode,
        groupCode: groupCode | this.groupCode,
        belongToGroup: false
      };
      this.getDataRight(paramRight);
      this.getDataLeft(paramLeft);
    },

    difArray(arr1, arr2) {
      return new Set([...new Set(arr1)].filter(x => !new Set(arr2).has(x)));
    },

    move(value, arrFrom, arrTo) {
      const index = arrFrom.findIndex(el => {
        return el.value === value;
      });
      const item = arrFrom[index];
      arrFrom.splice(index, 1);
      arrTo.push(item);
    },

    onRightClick() {
      const selected = this.selected1;
      for (let i = 0; i < selected.length; ++i) {
        this.move(selected[i], this.options1, this.options2);
      }
    },

    onLeftClick() {
      const selected = this.selected2;
      for (let i = 0; i < selected.length; ++i) {
        this.move(selected[i], this.options2, this.options1);
      }
    },

    onClosePopUp() {
      if (!this.isSubmit && this.getSizeDataUpdate() > 0) {
        if (this.showPopupDirtyForm()) {
          this.$emit("onClosePopUp");
        }
        return;
      }
      this.$emit("onClosePopUp");
    },

    showPopupDirtyForm() {
      return window.confirm(this.imgText.popup.confirmDirtyForm);
    },

    onSave() {
      this.isSubmit = true;
      let dataUpdate = this.getDataUpdate();
      dataUpdate = dataUpdate.map(item => {
        return {
          customerCode: item.customerCode,
          branchCode: item.branchCode,
          groupCode: this.groupCode,
          belongToGroup: item.belongToGroup ? false : true
        };
      });
      if (this.getSizeDataUpdate() > 0) {
        this.$store
          .dispatch("customerGroupModule/updateCustomerGroupLink", dataUpdate)
          .then(() => {
            this.onClosePopUp();
          });
      } else {
        this.onClosePopUp();
      }
    },

    getDataUpdate() {
      const dataChangeGroupLeft = this.difArray(
        this.originalArr1,
        this.options1
      );
      const dataChangeGroupRight = this.difArray(
        this.originalArr2,
        this.options2
      );
      const dataUpdate = [...dataChangeGroupLeft, ...dataChangeGroupRight];
      return dataUpdate;
    },

    getSizeDataUpdate() {
      return this.getDataUpdate().length;
    },

    getDataLeft(param) {
      this.$store
        .dispatch("customerGroupModule/getCustomerBranchByGroup", param)
        .then(res => {
          const data = res.data.map(item => {
            return {
              ...item,
              text: item.branchName,
              value: item.id,
              belongToGroup: true
            };
          });
          this.originalArr1 = [...data];
          this.options1 = data;
        });
    },

    getDataRight(param) {
      this.$store
        .dispatch("customerGroupModule/getCustomerBranchByGroup", param)
        .then(res => {
          const arr = res.data.map(item => {
            return {
              ...item,
              text: item.branchName,
              value: item.id,
              belongToGroup: false
            };
          });
          this.originalArr2 = [...arr];
          this.options2 = arr;
        });
    }
  },

  watch: {
    isShowPopup() {
      this.loadInit();
    }
  }
};
</script>
