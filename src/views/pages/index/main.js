import Vue from "vue";
import App from "@/views/pages/index/App.vue";
import router from "@/views/pages/index/router";
import store from "@/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import qs from "qs";
import echarts from "echarts";
Vue.use(Antd);
// import "ant-design-vue/lib/button/style/css";
window.axios = axios;
window.qs = qs;
Vue.config.productionTip = false;
Vue.prototype.echarts = echarts;
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode, oldVnode) {
    console.log(el, binding, vnode, oldVnode);
    // 聚焦元素
    el.focus();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// axios({
//   method: "post",
//   url: "/user/12345",
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone"
//   }
// });
