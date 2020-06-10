<template>
  <div class="user-control flex-center">
    <div class="avatar">
      <img
        src="../../static/img/avatar.gif"
        @click="showDrawer"
      />
      <a-drawer
        title="基本信息设置"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <a-button type="danger" class="logout-btn" @click="logoutHandle"
          >退出登录</a-button
        >
      </a-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-control',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    logoutHandle () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="less">
.user-control {
   .badge{
       font-size: 16px;
       color: #fff;
   }
  .avatar {
    background: rgba(255, 255, 255, 0.2);
    height: 44px;
    width: 44px;
    margin: 8px 12px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .logout-btn {
      position: absolute;
      bottom: 4%;
      width: 50%;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
