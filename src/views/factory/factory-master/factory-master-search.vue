<template>
  <div>
    <b-card>
      <div slot="header">
        <strong class="titleForm">検索条件</strong>
        <b-button
          variant="dark"
          class="ml-2 btn-form"
          size="sm"
          @click="onReset"
        >{{imgtext.general.reset}}</b-button>
        <b-button
          class="float-right btn-form"
          variant="dark"
          size="sm"
          @click="onSearch"
        >{{imgtext.general.search}}</b-button>
      </div>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group label="処分業者" :label-cols="2">
              <b-input-group>
                <b-form-input v-model.trim="search.supplierName"></b-form-input>
                <b-input-group-append>
                  <b-button variant="dark" @click="showAgent" class="btn-form">選択</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="事業場番号" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.factoryNumber"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="事業場名" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.factoryName"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="事業場名カナ" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.factoryKana"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="所在地" :label-cols="2">
              <b-form-input type="text" autocomplete="name" v-model.trim="search.address"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="TEL" :label-cols="2">
              <b-form-input
                type="text"
                autocomplete="name"
                class="input-width"
                v-model.trim="search.tel"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <!-- <Agent ref="agent-Modal" @selectSupplier="selectSupplier"></Agent> -->
        <Agent @selectSupplier="selectSupplier" :popupId="popupId"></Agent>
  </div>
</template>

<script>
import IMText from "@/data/img-text";
import Agent from "../factory-detail-popup/factory-master-search-popup";
export default {
  props: ["search"],
  components: {
    Agent
  },

  data() {
    return {
      imgtext: IMText,
      popupId: "agentModalSearch"
    };
  },
  created() {},
  methods: {
    showAgent() {
      this.$bvModal.show(this.popupId);
    },
    onReset() {
      this.search.supplierCode = 0;
      this.search.supplierName = "";
      this.search.factoryNumber = "";
      this.search.factoryName = "";
      this.search.factoryKana = "";
      this.search.address = "";
      this.search.tel = "";
      this.$emit("onReset");
    },
    onSearch() {
      this.$emit("onSearch");
    },
    selectSupplier(data) {
      this.search.supplierName = data.supplierName;
      this.search.supplierCode = data.supplierCode;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
