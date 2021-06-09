/*
 * @author: Spring
 * @create: 2021-06-07 15:23 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-06-07 15:40 PM
 * @desc: 
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
