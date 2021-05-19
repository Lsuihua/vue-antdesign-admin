<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import cloudbase from "@cloudbase/js-sdk";
// 云开发初始化
const app = cloudbase.init({
  env: "dev-serve-7g46wttx6ced4f15",
  region: "ap-guangzhou"
});
const db = app.database();

export default {
  name: 'app'
}
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  // 登录样式
  .login-form {
  background: #ffffff;
  padding: 26px!important;
  box-sizing: border-box;
  border-radius: 18px;
  width: 100%;
  .hd{
    text-align: center;
    margin-bottom: 20px;
  }
  & > .ant-form-item:last-child {
    margin-bottom: 0;
  }
  .ant-form-item-control {
    .ant-form-item-children {
      display: inherit !important;
      .ant-input {
        display: block;
        height: 40px;
        padding-left: 50px;
      }
      .iconfont {
        position: absolute;
        left: 0px;
        top: 0px;
        background: #1890ff;
        width: 40px;
        text-align: center;
        color: #fff;
        height: 40px;
        border-radius: 5px 0 0 5px;
        line-height: 40px;
      }
    }
  }
  .mobile-box{
    .ant-input {
      padding-left: 12px!important;
    }
  }
  .drag-check {
    text-align: center;
    position: relative;
    background: #e4e4e4;
    height: 40px;
    border-radius: 3px;
    overflow: hidden;
    .drag-item {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
    }
    .drag-bg {
      background: #ff9800;
      z-index: 1;
    }
    .text {
      width: 100%;
      text-align: center;
      z-index: 2;
      color: #8e8e8e;
    }
    .success {
      color: #fff;
    }
    .drag-btn {
      background: #1890ff;
      width: 40px;
      line-height: 44px;
      font-size:16px;
      z-index: 3;
      cursor: pointer;
      color: #fff;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
  .quick-login{
    display: flex;
    justify-content: space-evenly;
  }
  .login-form-forgot{
    float: right;
    text-decoration: underline;
  }
}
</style>
