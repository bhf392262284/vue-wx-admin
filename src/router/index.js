import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login/index";
import layout from '@/pages/layout/index';
import Home from '@/pages/home/index'
import affairList from '@/pages/Administration/HandlingOfEvents/index'
import dutyList from '@/pages/Administration/Duty/index'
import meetingList from '@/pages/Administration/Assistant/index'
import Seex from '@/pages/Administration/Duty/See/index'
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [{
          path: '/',
          name: 'home',
          component: Home
        }, {
          path: 'affairList',
          name: 'affairList',
          component: affairList
        }, {
          path: 'dutyList',
          name: 'dutyList',
          component: dutyList,
        },
        {
          path: 'Seex',
          name: "Seex",
          component: Seex
        },
        {
          path: 'meetingList',
          name: 'meetingList',
          component: meetingList
        }
      ]
    }
  ]
});
