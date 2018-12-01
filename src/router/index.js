import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import lightbox from 'vlightbox'
import Layout from '../commons/Layout'

Vue.use(Router)
Vue.use(lightbox)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
