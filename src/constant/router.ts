import type { RouteRecordRedirectOption } from 'vue-router'

/** @description 主要布局式样 */
export const MAIN_LAYOUT = () => import('@/layouts/MainLayout.vue')

/** @description 无边栏布局样式 */
export const NONE_SIDEBAR_LAYOUT = () =>
  import('@/layouts/NoneSidebarLayout.vue')

/** @description 路由路径 */
export const ROUTE_PATH = {
  /** @description 首页 */
  HOME: '/',
  /** @description 登入 */
  LOGIN: '/login',

  /** @description 新建帖文 */
  NEW_TOPIC: 'new-topic',

  /** @description 版块 */
  PLATE: '/plate',
  /** @description 版块 - 具体某一版块 */
  PLATE_ITEM: '/plate/:routeName',

  /** @description 漫画 */
  COMMIC: '/commic/:id',
  /** @description 文章 */
  ARTICLE: '/article/:id',
}

/** @description 路由名 */
export const ROUTE_NAME = {
  /** @description 首页 */
  HOME: 'Home',
  /** @description 登入 */
  LOGIN: 'Login',

  /** @description 新建帖文 */
  NEW_TOPIC: 'NewTopic',

  /** @description 版块 */
  PLATE_ITEM: 'PlateItem',

  /** @description 漫画 */
  COMMIC: 'Commic',
  /** @description 文章 */
  ARTICLE: 'Article',
}

/** @description 版块根目录重定向 */
export const PLATE_ROOT_REDIRECT: RouteRecordRedirectOption = {
  name: ROUTE_NAME.PLATE_ITEM,
  params: { routeName: 'localization' },
}
