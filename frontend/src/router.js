import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import Forum from '@/components/Forum.vue';

import store from './store/store.js'; 

Vue.use(Router);

function isAuthenticated () {
  return store.getters.getAuthentificationState;
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        if (isAuthenticated()) {
          next(false);
        } else {
          next();
        }
      }
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum,
      beforeEnter(to, from, next) {
        if (isAuthenticated()) {
          next();
        } else {
          next({name: "login"});
        }
      }
    }
  ],
});