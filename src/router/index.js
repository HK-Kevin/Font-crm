import Vue from 'vue'
import Router from 'vue-router'
import Subject from '@/components/subject/Subject'
import SubOne from '@/components/subject/sub-one'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/subject',
      name: 'Subject',
      component: Subject
    },
    {
      path: '/one/:id',
      name: 'SubOne',
      component: SubOne
    }
  ]
})
