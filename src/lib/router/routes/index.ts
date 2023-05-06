import type { RouteRecordRaw } from 'vue-router'

import {
  MAIN_LAYOUT,
  NONE_SIDEBAR_LAYOUT,
  ROUTE_NAME,
  ROUTE_PATH,
} from '@/constant/router'
import plates from './plates'
import topic from '@/lib/router/routes/topic'

const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATH.HOME,
    component: MAIN_LAYOUT,

    children: [
      {
        path: '',
        name: ROUTE_NAME.HOME,
        redirect: ROUTE_PATH.PLATE,
      },

      {
        path: ROUTE_PATH.NEW_TOPIC,
        name: ROUTE_NAME.NEW_TOPIC,
        component: () => import('@/views/computer/NewTopic.vue'),

        beforeEnter(to, from) {
          to.meta.from = from.name
          to.meta.plateRouteName = from.meta.plateRouteName ?? from.name
        },
      },

      ...topic,
    ],
  },

  {
    path: ROUTE_PATH.LOGIN,
    component: NONE_SIDEBAR_LAYOUT,

    children: [
      {
        path: '',
        name: ROUTE_NAME.LOGIN,
        component: () => import('@/views/computer/Login.vue'),
      },
    ],
  },

  ...plates,
]

export default routes
