<template>
  <a-layout-header class="header">
    <div class="logo">L&Y</div>
    <a-menu
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="[currentMenu]"
      :style="{ lineHeight: '60px' }"
    >
      <a-menu-item
        :key="index"
        v-for="(item, index) in menu"
        @click="toMenuHandle(index, item.title)"
        >{{ item.title }}</a-menu-item>
    </a-menu>
    <user-control/>
  </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex'
import { setToken } from '@/utils/auth'
import userControl from './userControl'
export default {
  name: 'my-header',
  components: { userControl },
  mounted: function () {
    this.$store.dispatch('CHANGE_CURRENT_MENU', this.currentMenu)
    
  },
  methods: {
    toMenuHandle (index, title) {
      this.$store.dispatch('CHANGE_CURRENT_MENU', index)
      setToken('currentMenu', index)
      let arr = [title]
      this.$store.dispatch('SAVE_BREAD_CRUMB', arr)
    }
  },
  computed: {
    ...mapGetters(['menu', 'currentMenu'])
  },
  watch:{
    menu:{
      handler(newVal){
        // 初始显示二级菜单
        console.log(newVal)
        if(newVal.length>0){
          const nextMenu  = newVal[this.currentMenu].children
          this.$store.dispatch('SAVE_MENU_SELECT', nextMenu)
        }
      },
      immediate:true
    }
  }
}
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  left: 0;
  text-align: left;
  padding: 0;
  height: 60px;
  line-height: 60px;
  .logo {
    width: 120px;
    height: 32px;
    margin: 14px 40px;
    float: left;
    color: #fff;
    text-align: center;
    line-height: 32px;
    font-size: 25px;
    font-family: '-webkit-pictograph';
    cursor: pointer;
  }
  .user-control{
      float: right;
  }
}
.ant-menu-horizontal {
  float: left;
}
</style>
