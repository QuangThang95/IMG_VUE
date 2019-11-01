import 'babel-polyfill';
import 'date-input-polyfill';
import '@/shared/StringCustom';
import store from '@/store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import DateTimeFormat from './constants/DateTimeFormat';
import '@/assets/scss/style.scss';
import { common } from './shared/utilities';
import '@/shared/helpers/Interceptor';
import axios from 'axios';
import AppConfig from '@/constants/AppConfig';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);
Vue.filter('formatDate', (value: any) => {
  if (value) {
    return moment(String(value)).format(DateTimeFormat.DATE_YYYYMMDDHHmm);
  }
});
Vue.filter('formatDateDisplay', (value: any) => {
  if (value) {
    return moment(String(value)).format(DateTimeFormat.DATE_DISPLAY);
  }
});
Vue.filter('getFileName', (value: any) => {
  if (value) {
    return common.getFileName(value, -30);
  }
});
const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'DataType': 'application/json'
  }
};
axios.get(`/config.json`, options).then((resp: any) => {
  new Vue({
    router,
    store,
    created() {
      axios.defaults.baseURL = resp.data.BASE_URL + AppConfig.EndPoint;
    },
    render: (h) => h(App),
  }).$mount('#app');
});
