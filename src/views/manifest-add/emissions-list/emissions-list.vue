<template>
  <div>
    <b-container fluid>
      <Search></Search>
      <Grid @onAdd="onAdd"></Grid>
    </b-container>
  </div>
</template>

<script>
import Search from "./search.vue";
import Grid from "./grid.vue";
export default {
  props: [],
  components: {
    Search,
    Grid
  }
};
</script>
<style lang="scss">
.bottom {
  font-size: 14px;
  text-align: center;
}
</style>

