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
  name: 'app',
  mounted(){
    console.log("挂载")
    db.collection("configs").where(
      {_id:'d5b22d996089096700018d785236abcb'}
    ).get().then(res => {
      console.log('结果===>',res)
    });
  }
}
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
