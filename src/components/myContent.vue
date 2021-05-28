<template>
  <a-layout-content class="main">
    <my-breadcrumb class="breadcrumb"></my-breadcrumb>
    <a-layout style="height:100%;">
      <a-layout-content class="container">
        <div class="content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout-content>
</template>

<script>
export default {
  name: 'my-content'
}
</script>

<style scoped lang="less">
.main {
  position: relative;
  padding-top:60px;
  height: 100%;
  overflow: hidden;
  .breadcrumb {
    box-shadow: 2px 0 4px rgba(0,0,0,.2);
    background: #FFF;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    font-size: 12px;
    /deep/ .ant-breadcrumb {
      font-size: 12px;
    }
  }
  .container {
    margin: 0 10px;
    height: 100%;
    border-radius: 5px;
    .content::-webkit-scrollbar {
      display: none;
    }
    .content {
      height: 100%;
      width: 100%;
      overflow: hidden scroll;
      box-sizing: border-box;
    }
  }
}
</style>
