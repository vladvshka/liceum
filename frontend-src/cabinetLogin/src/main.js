import '@babel/polyfill'
import Vue from 'vue'
import axios from "axios";
import "./plugins/vuetify";

import router from './router';
//COMPONENTS
import App from './App.vue'

//SERVICES
import apiService from "./services/apiService";

//DEPENDENCIES
Vue.use(axios);
Vue.use(apiService);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')