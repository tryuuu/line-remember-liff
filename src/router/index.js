import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from '@/components/MainComponent.vue'
import SubComponent from '@/components/SubComponent.vue'
//import Test2Component from '@/components/Test2Component.vue'

const routes = [
  {
    path: '/',
    name: 'MainComponent',
    component: MainComponent
  },
  {
    path: '/:id',
    name: 'SubComponent',
    component: SubComponent,
    props: route => ({ id: route.params.id, tag: route.query.tag })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router