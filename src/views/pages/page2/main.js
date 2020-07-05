import Vue from "vue";
import App from "@/views/pages/page1/App.vue";
import router from "@/views/pages/page1/router";
import store from "@/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
Vue.use(Antd);
// import "ant-design-vue/lib/button/style/css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone"
  }
});
