import '@babel/polyfill'
import Vue from 'vue'
import axios from "axios";
import "./plugins/vuetify";
import VueCookie from "vue-cookie";

import router from './router';
//COMPONENTS
import App from './App.vue'
import LoadingIndicator from '@/components/LoadingIndicator'

//SERVICES
import apiService from "./services/apiService";

//DEPENDENCIES
Vue.use(axios);
Vue.use(apiService);
Vue.use(VueCookie);

Vue.config.productionTip = false;

Vue.component('loading-indicator', LoadingIndicator);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')