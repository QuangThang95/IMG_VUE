<template>
<em v-if="data.field.isSortable" style="float: right">
    <div class="sort-wrap">
      <div class="up-down-sort">
        <button v-if="data.field.isDesc" class="btn-sort" @click="handleState(data,'up')">
          <i class="fa fa-sort-asc" aria-hidden="true"></i>
        </button>
        <button v-if="data.field.isAsc" class="btn-sort" @click="handleState(data,'down')">
          <i class="fa fa-sort-desc" aria-hidden="true"></i>
        </button>
      </div>
      <div class="close-sort">
        <button v-if="!data.field.isAsc||!data.field.isDesc" class="btn-sort" @click="handleState(data)">
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </em>
</template>

<script>
import SortTable from "@/shared/SortTable.ts";
export default {
    props: ["data", "fields"],
    methods: {
        handleState(data, ischeck) {
            if (ischeck !== 'up' && ischeck !== 'down') {
                this.$emit('closeSort', data);
            } else {
                this.$emit("onSorting", data,ischeck);
            }
            SortTable.prototype.handleButton(data, ischeck, this.fields);
        },
    }
};
</script>

<style lang="scss">

.sort-wrap {
  display: flex;
  flex-direction: row;
  .btn-sort {
    height: 0px;
    padding: 0px;
  }
  .close-sort {
    margin-left: 3px;
  }
}

.up-down-sort {
  display: flex;
  flex-direction: column;
  .fa-sort-asc,
  .fa-sort-desc  {
    font-size: 20px;  
  }
}

/*Fix IE browser*/
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .sort-wrap {
    display: flex;
    flex-direction: row;
    .btn-sort {
      height: 0px;
      padding: 0px;
    }
    .close-sort {
      margin-left: 3px;
      margin-top: -20px;
    }
  }
}

</style>
