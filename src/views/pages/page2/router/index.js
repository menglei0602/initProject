import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/pages/page1/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter (to, from, next) {
      window.location = "/index.html";
    }
  // },
  // {
  //   path: "/antd",
  //   name: "Antd",
  //   component: () => import(/* webpackChunkName: "about" */ "@/views/pages/page1/Antd.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
