<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <my-header></my-header>
        <my-silder></my-silder>
        <my-content></my-content>
    </a-layout>
</template>

<script>
    import myHeader from '@/components/myHeader';
    import mySilder from '@/components/mySider';
    import myContent from '@/components/myContent';
    export default {
        name: "layout",
        components:{myHeader,mySilder,myContent}
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