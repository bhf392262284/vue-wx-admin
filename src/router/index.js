import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login/index";
import layout from '@/pages/layout/layout';
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/layout",
      name: 'layout',
      component: layout
    }
  ]
});
