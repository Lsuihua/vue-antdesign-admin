import error403 from "../views/errorPage/403.vue";
import error404 from "../views/errorPage/404.vue";
import error500 from "../views/errorPage/500.vue";
import imgs from "../views/resources/imgs/index.vue";
import material from "../views/resources/material/index.vue";
import music from "../views/resources/musics/index.vue";
import article from "../views/service/articles/index.vue";
import event from "../views/service/events/index.vue";
import store from "../views/service/stores/index.vue";
import user from "../views/service/users/index.vue";
import homeConfig from "../views/system/homeConfig.vue";
import menuConfig from "../views/system/menuConfig.vue";
import roleConfig from "../views/system/roleConfig.vue";

export default [
  {
    path: 'error403',
    name: '403',
    alias: '403',
    component: error403,
  },
  {
    path: 'error404',
    name: '404',
    alias: '404',
    component: error404,
  },
  {
    path: 'error500',
    name: '500',
    alias: '500',
    component: error500,
  },
  {
    path: 'imgs',
    name: 'imgs',
    component: imgs,
  },
  {
    path: 'material',
    name: 'material',
    component: material,
  },
  {
    path: 'music',
    name: 'music',
    component: music,
  },
  {
    path: "article",
    name: "article",
    component: article,
  },
  {
    path: 'event',
    name: 'event',
    component: event,
  },
  {
    path: 'store',
    name: 'store',
    component: store,
  },
  {
    path: 'user',
    name: 'user',
    component: user,
  },
  {
    path: 'homeConfig',
    name: 'homeConfig',
    component: homeConfig,
  },
  {
    path: 'menuConfig',
    name: 'menuConfig',
    component: menuConfig,
  },
  {
    path: 'roleConfig',
    name: 'roleConfig',
    component: roleConfig,
  },
];
