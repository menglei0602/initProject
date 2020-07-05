import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/pages/index/Home.vue";

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
    component: () => import(/* webpackChunkName: "about" */ "@/views/pages/index/About.vue")
    // beforeEnter (to, from, next) {
    //   window.location = "/page1.html";
    // }
  },
  {
    path: "/antd",
    name: "Antd",
    component: () => import(/* webpackChunkName: "about" */ "@/views/pages/index/Antd.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
