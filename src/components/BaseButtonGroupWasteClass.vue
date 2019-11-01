<template>
  <div>
    <b-button-group size="sm" v-if="buttonWasteClass.length > 0">
      <b-button
        v-for="(item, idx) in buttonWasteClass"
        :key="idx"
        :pressed.sync="item.state"
        variant="primary"
        :class="item.cssClassButton"
        @click="onClickButtonToggle(item)"
      >{{ item.value }}</b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  props: {
    buttonWasteClass: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    onClickButtonToggle(data) {
      this.$emit("onClickButtonToggle", data);
    }
  }
};
</script>
