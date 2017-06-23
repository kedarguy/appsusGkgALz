// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import * as VueGoogleMaps from 'vue2-google-maps';


// export const bus = new Vue();

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDttjEj13b4EcZYvLZZpoX0RZ-nqSzFTg4', //not realy my api key
    v: '3.27'
    // libraries: 'places', //// If you need to use place input
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
