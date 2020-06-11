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
