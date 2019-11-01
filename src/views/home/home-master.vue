<template>
  <div id="home-screen">
    <b-container fluid>
      <h6 class="mt-2 mb-2 fontColor">ホーム</h6>
      <div class="mb-3">
        <b-row v-if="dataCard.length > 0">
          <b-col v-for="item in dataCard" :key="item.cardId" style="max-width: 420px;">
            <HomeCard :cardData="item" :permission="permission" />
          </b-col>
          <b-col v-for="item in dataCardInvisibe" :key="item.cardId"></b-col>
        </b-row>
      </div>
      <div v-if="permission.groupSetting">
        <b-card class="card-widget" v-bind:class="{ hidden: !isShow }">
          <div slot="header">
            <strong>設定</strong>
            <b-badge
              pill
              variant="danger"
              class="ml-1 badge-card"
              v-if="totalSupplier > 0"
            >{{ totalSupplier }}</b-badge>
            <span class="float-right" @click="hidenForm">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </span>
          </div>
          <b-card-body v-if="this.isShow">
            <b-form>
              <b-row>
                <b-col v-for="item in dataWidget" :key="item.id">
                  <HomeWidget :data="item" :permission="permission" />
                </b-col>
                <b-col>
                  <span class="float-right">
                    <i class="fa fa-cog fa-4x btn-setting" aria-hidden="true" @click="onSetting"></i>
                  </span>
                </b-col>
              </b-row>
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </b-container>
    <BaseProcessing :openDl="openDl" />
  </div>
</template>

<script>
import HomeWidget from "./home-widget.vue";
import HomeCard from "./home-card.vue";
import { HomeWidgetData, HomeCardData } from "@/constants/Home";
import { navigation, canAction, current } from "@/shared/utilities";
import AppConfig from "@/constants/AppConfig";
import { Screen, Action } from "@/constants/Screen";
import BaseProcessing from "@/components/BaseProcessing";
import { mapGetters } from "vuex";

export default {
  components: {
    HomeWidget,
    HomeCard,
    BaseProcessing
  },

  data() {
    return {
      isShow: true,
      isSetting: false,
      dataWidget: HomeWidgetData,
      homeCardData: HomeCardData,
      dataCard: [],
      dataCardInvisibe: [],
      colorHeader: AppConfig.ColorHex.Dark,
      customerCode: current.customer().customerCode,
      totalSupplier: 0,
      permission: {
        groupSetting: false,
        item1_17: false,
        item18_29: false,
        item36: false,
        item35_46_47: false,
        item31: false
      },
      openDl: false
    };
  },

  async created() {
    this.setColorHeader();
    this.setPermission();
    this.openDl = true;
    await this.getInitData(this.customerCode);
    this.openDl = false;
  },

  methods: {
    hidenForm() {
      this.isShow = !this.isShow;
    },

    handleResize(data) {
      if (data.matches) {
        return (this.isSetting = true);
      }
      this.isSetting = false;
    },

    onSetting() {
      navigation.sshi0022();
    },

    setColorHeader() {
      this.colorHeader = AppConfig.ColorHex.Dark;
      this.$store.dispatch(
        "menuModule/setHeaderColor",
        AppConfig.ColorHex.Pink
      );
    },

    setPermission() {
      this.permission.groupSetting = canAction(
        Action.Read,
        Screen.SSHI0038_GROUP_43
      );
      this.permission.item1_17 = canAction(
        Action.Read,
        Screen.SSHI0038_ITEM_1_TO_17
      );
      this.permission.item18_29 = canAction(
        Action.Read,
        Screen.SSHI0038_ITEM_18_TO_29
      );
      this.permission.item31 = canAction(Action.Read, Screen.SSHI0038_ITEM_31);
      this.permission.item36 = canAction(Action.Read, Screen.SSHI0038_ITEM_36);
      this.permission.item35_46_47 = canAction(
        Action.Read,
        Screen.SSHI0038_ITEM_35_46_47
      );

      this.dataWidget[0].button2.permission = this.permission.item31;
      this.dataWidget[3].button1.permission = this.permission.item35_46_47;
      this.dataWidget[3].button2.permission = this.permission.item36;
      this.dataWidget[3].button3.permission = this.permission.item35_46_47;
    },

    async getInitData(customerCode) {
      await this.$store.dispatch(
        "notificationModule/getNotifyWaste",
        customerCode
      );
      await this.$store.dispatch(
        "notificationModule/getNotifySupplier",
        customerCode
      );
    }
  },

  mounted() {
    this.$store.dispatch("menuModule/getMenuSshi0038");
    const screen = window.matchMedia("(max-width: 1024px)");
    screen.addListener(this.handleResize);
    this.handleResize(screen);
  },

  beforeDestroy() {
    this.$store.dispatch("menuModule/setHeaderColor", AppConfig.ColorHex.Dark);
    this.$store.dispatch("menuModule/getMenus");
  },

  computed: {
    ...mapGetters({
      notifyWaste: "notificationModule/getNotifyWaste",
      notifySupplier: "notificationModule/getNotifySupplier"
    })
  },

  watch: {
    notifyWaste() {
      this.notifyWaste.map((item, index) => {
        this.homeCardData[index].wasteVisible = item.wasteVisible;
        this.homeCardData[index].button = item.wasteClass;
      });
      this.dataCard = this.homeCardData.filter(
        item => item.wasteVisible === true
      );
      this.dataCardInvisibe = this.homeCardData.filter(
        item => item.wasteVisible === false
      );

      let wasteClassList = [];
      this.dataCard.map((item, index) => {
        wasteClassList.push(item.cardId);
      });
      current.setWasteClassList(wasteClassList);
    },

    notifySupplier() {
      this.notifySupplier.forEach((item, index) => {
        this.dataWidget[index].button3.totalNotify = item.totalNotify;
        if (index === 4) {
          if (this.permission.item35_46_47) {
            this.totalSupplier += item.totalNotify;
          }
        } else {
          this.totalSupplier += item.totalNotify;
        }
      });
    }
  }
};
</script>

<style>
.hidden .card-body {
  padding: 0px;
}
</style>
