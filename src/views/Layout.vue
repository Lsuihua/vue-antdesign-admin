<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <my-header/>
        <my-sider/>
        <my-content/>
    </a-layout>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style scoped>
#components-layout-demo-custom-trigger{
    padding-top: 60px;
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
}
</style>