<template>
  <div id="popup-message">
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      v-model="isShow"
      :size="sizePopup"
      :no-close-on-backdrop="noCloseOnBackdrop"
      @shown="focusMyElement"
      hide-header-close
    >
      <template slot="modal-title">{{ title }}</template>
      <div>{{ message }}</div>
      <div slot="modal-footer" class="w-100">
        <b-button
          v-if="showCancel"
          ref="focusCancel"
          size="sm"
          class="float-right"
          style="width: 60px;"
          @click="isShow=false"
        >{{ imgtext.popup.cancel }}</b-button>
        <b-button
          ref="focusOK"
          variant="primary"
          size="sm"
          class="float-right mr-3"
          style="width: 60px;"
          @click="onOK"
        >{{ imgtext.popup.ok }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import IMText from "@/data/img-text.json";

export default Vue.extend({
  props: {
    title: {
      default: IMText.popup.confirm,
      type: String
    },
    sizePopup: {
      default: "sm",
      type: String
    },
    message: {
      default: IMText.popup.confirmMsgDelete.formatText(
        IMText.general.btnDelete
      ),
      type: String
    },
    showCancel: {
      default: true,
      type: Boolean
    },
    noCloseOnBackdrop: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      isShow: false,
      imgtext: IMText
    };
  },
  methods: {
    showModal() {
      if (this.isShow) {
        return;
      }
      this.isShow = true;
    },

    hideModal() {
      if (!this.isShow) {
        return;
      }
      this.isShow = false;
    },

    onOK() {
      this.$emit("isOK", true);
    },

    focusMyElement() {
      if(this.showCancel){
        (this.$refs["focusCancel"] as HTMLElement).focus();
      } else {
        (this.$refs["focusOK"] as HTMLElement).focus();
      }
    }
  }
});
</script>
