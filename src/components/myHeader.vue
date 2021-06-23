<template>
  <a-layout-header class="header">
    <div class="logo">L&Y</div>
    <div class="menu-box">
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
      <div class="menu-right flex-center">
        <a-tooltip placement="bottomRight">
          <template slot="title">
            <span>视口切换</span>
          </template>
          <a-button :icon="viewSize == 'default'? 'fullscreen' : 'fullscreen-exit'" type="link" ghost @click="changeView"/>
        </a-tooltip>
        
        <a-popover placement="bottomRight" arrow-point-at-center>
          <template slot="title">
            <span>系统消息</span>
          </template>
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-badge dot>
            <a-icon type="notification" :style="{'color':'#fff','font-size':'16px'}"/>
          </a-badge>
        </a-popover>
        <user-control/>
      </div>
    </div>
    
  </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex'
import { setToken } from '@/utils/auth'
export default {
  name: 'my-header',
  mounted: function () {
    this.$store.dispatch('CHANGE_CURRENT_MENU', this.currentMenu)
    
  },
  methods: {
    toMenuHandle (index, title) {
      this.$store.dispatch('CHANGE_CURRENT_MENU', index)
      setToken('currentMenu', index)
      let arr = [title]
      this.$store.dispatch('SAVE_BREAD_CRUMB', arr)
    },
    // 切换全屏视口
    changeView(){
      let size = ''
      if (document.fullscreenElement) {
        document.exitFullscreen()
        size = 'default'
      } else {
        size = 'scale'
        document.documentElement.requestFullscreen()
      }
      this.$store.dispatch('CHANGE_VIEW',size)
    }
  },
  computed: {
    ...mapGetters(['menu', 'currentMenu','viewSize'])
  },
  watch:{
    menu:{
      handler(newVal){
        // 初始显示二级菜单
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
  .menu-box{
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  
}
.ant-menu-horizontal {
  float: left;
}

</style>
