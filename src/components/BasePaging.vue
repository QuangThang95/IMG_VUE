<template>
  <div class="paging">
    <div class="demo">
      <div class="mt-3">
        <b-row align-h="center">
          <b-pagination
            v-model="pages.page"
            :total-rows="count"
            :per-page="initPageSize"
            :aria-controls="tableId"
            @input="changePage(pages.page)"
          ></b-pagination>
          <span class="text-in-row">&nbsp;表示件数</span>
          <b-col cols="1">
            <b-form-select
              id="per-page-select"
              v-model="initPageSize"
              :options="optionsPage"
              @input="changePageSize(initPageSize)"
            ></b-form-select>
          </b-col>
          <span class="text-in-row">{{ pages.page }} / {{ pageCount }} ページ ({{count}} 件)</span>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue } from "vue-property-decorator";
import { PagingConfig } from "@/constants/Paging";
import AppConfig from "../constants/AppConfig";
export default Vue.extend({
  props: ["tableId", "items", "pageCount", "count", "pageSize"],

  data() {
    return {
      pages: AppConfig.Pages,
      optionsPage: PagingConfig.OPTION_PAGE,
      initPageSize: this.pageSize
    };
  },

  methods: {
    totalPages() {
      return Math.ceil(this.count / this.pages.pageSize);
    },

    changePage(page: any) {
      this.$emit("getCurrentPage", page);
    },

    changePageSize(page: any) {
      this.$emit("getPageSize", page);
    }
  }
});
</script>

<style lang='scss' scoped>
@import "@/assets/scss/custom/_paging.scss";
</style>

