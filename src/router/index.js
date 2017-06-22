import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TopNav from '@/components/TopNav'
import EMail from '@/components/EMail'
import Places from '@/components/Places'
import BookStore from '@/components/BookStore'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/email',
      name: 'EMail',
      component: EMail
    },
    {
      path: '/places',
      name: 'Places',
      component: Places
    },
    {
      path: '/book-store',
      name: 'BookStore',
      component: BookStore
    },
  ]
})
