<template>
  <div>
    <b-card tag="article" class="mb-2 card-item" :class="cardData.class">
      <div slot="header">
        <strong>{{cardData.headerTitle}}</strong>
      </div>
      <div class="text-center mb-5">
        <b-button :disabled="!permission.item1_17" @click="goToManifest(cardData.cardId)" class="img-btn">
          <img :src="cardData.img" />
        </b-button>
      </div>
      <div v-if="cardData.button">
        <div class="text-center mb-2">
          <div class="btn-group">
            <b-button
              size="sm"
              class="button-card"
              @click="goToNotificationPage(dataNotifyClass.important.key, cardData.headerTitle)"
              :disabled="!permission.item1_17"
            >{{ imgtext.home.homeCard.btnTitleWaste1 }}</b-button>
            <b-badge
              pill
              variant="danger"
              class="ml-2 badge-card"
              v-if="permission.item1_17 && cardData.button.totalNotify01 > 0"
            >{{ cardData.button.totalNotify01 }}</b-badge>
          </div>
        </div>
        <div class="text-center mb-2">
          <div class="btn-group">
            <b-button
              size="sm"
              class="button-card"
              @click="goToNotificationPage(dataNotifyClass.request.key, cardData.headerTitle)"
              :disabled="!permission.item1_17"
            >{{ imgtext.home.homeCard.btnTitleWaste2 }}</b-button>
            <b-badge
              pill
              variant="primary"
              class="ml-2 badge-card"
              v-if="permission.item1_17 && cardData.button.totalNotify02 > 0"
            >{{ cardData.button.totalNotify02 }}</b-badge>
          </div>
        </div>
        <div class="text-center mb-2">
          <div class="btn-group">
            <b-button
              size="sm"
              class="button-card"
              @click="goToNotificationPage(dataNotifyClass.report.key, cardData.headerTitle)"
              :disabled="!permission.item1_17"
            >{{ imgtext.home.homeCard.btnTitleWaste3 }}</b-button>
            <b-badge
              pill
              variant="success"
              class="ml-2 badge-card"
              v-if="permission.item1_17 && cardData.button.totalNotify03 > 0"
            >{{ cardData.button.totalNotify03 }}</b-badge>
          </div>
        </div>
        <div class="text-center mb-2">
          <div class="btn-group">
            <b-button
              size="sm"
              class="button-card"
              @click="goToNotificationPage(dataNotifyClass.other.key, cardData.headerTitle)"
              :disabled="!permission.item1_17"
            >{{ imgtext.home.homeCard.btnTitleWaste4 }}</b-button>
            <b-badge
              pill
              variant="secondary badge-card"
              class="ml-2"
              v-if="permission.item1_17 && cardData.button.totalNotify04 > 0"
            >{{ cardData.button.totalNotify04 }}</b-badge>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import IMText from "@/data/img-text.json";
import { WasteClass, NotifyClass } from "@/constants/General";
import { navigation, current } from "@/shared/utilities";

export default {
  props: ["cardData", "permission"],

  data() {
    return {
      imgtext: IMText,
      dataNotifyClass: NotifyClass,
      dataWasteClass: WasteClass,
      wasteClassUrl: null
    };
  },

  methods: {
    goToNotificationPage(notifyClass, headerTitle) {
      switch (headerTitle) {
        case WasteClass.industrialWaste.value:
          this.wasteClassUrl = WasteClass.industrialWaste.key;
          break;
        case WasteClass.industrialSpecialWaste.value:
          this.wasteClassUrl = WasteClass.industrialSpecialWaste.key;
          break;
        case WasteClass.constructionWaste.value:
          this.wasteClassUrl = WasteClass.constructionWaste.key;
          break;
        case WasteClass.valuableWaste.value:
          this.wasteClassUrl = WasteClass.valuableWaste.key;
          break;
        case WasteClass.municipalWaste.value:
          this.wasteClassUrl = WasteClass.municipalWaste.key;
          break;
        default:
          this.wasteClassUrl = null;
          break;
      }
      switch (notifyClass) {
        case NotifyClass.important.key:
          navigation.sshi0035Important(this.wasteClassUrl);
          break;
        case NotifyClass.request.key:
          navigation.sshi0035Request(this.wasteClassUrl);
          break;
        case NotifyClass.report.key:
          navigation.sshi0035Report(this.wasteClassUrl);
          break;
        case NotifyClass.other.key:
          navigation.sshi0035Other(this.wasteClassUrl);
          break;
        default:
          break;
      }
    },

    goToManifest(data) {
      current.setWasteClass(data)
      navigation.sshi0031();
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/scss/dashboard/_dashboard.scss";
</style>
