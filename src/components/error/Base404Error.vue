<template>
  <div id='404-error' class='page-wrap d-flex flex-row align-items-center'>
      <div class='container'>
        <div class='row justify-content-center'>
            <div class='col-md-12 text-center'>
                <span class='display-1 d-block'>404</span>
                <div class='mb-4 lead'>The page you are looking for was not found.</div>
                 <router-link to='/'>Back to Home</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';

export default Vue.extend({});
</script>
