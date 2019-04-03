<template>
    <a-layout-header class="header">
        <div class="logo">L&Y</div>
        <a-menu
                theme="dark"
                mode="horizontal"
                :defaultSelectedKeys="[currentMenu]"
                :style="{ lineHeight: '64px' }"
        >
            <a-menu-item :key="index" v-for="(item,index) in menu" @click="toMenuHandle(index,item.title)">{{item.title}}</a-menu-item>
        </a-menu>
        <user-control class="user-control"></user-control>
    </a-layout-header>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { setToken } from "../../../utils/auth";
    import userControl from './userControl'
    export default {
        name: "my-header",
        components:{userControl},
        created:function(){
            this.$store.dispatch('CHANGE_CURRENT_MENU',this.currentMenu);
        },
        methods:{
            toMenuHandle(index,title){
                this.$store.dispatch('CHANGE_CURRENT_MENU',index);
                setToken('currentMenu',index);
                let arr = [title];
                this.$store.dispatch('SAVE_BREAD_CRUMB',arr)
            }
        },
        computed:{
                ...mapGetters(['menu','currentMenu'])
        }
    }
</script>

<style scoped>
    .header{
        position: fixed;
        z-index: 1;
        width: 100%;
        top: 0;
        left: 0;
        text-align: left;
    }
    .ant-layout-header{
        padding: 0;
    }
    .header .logo{
        width: 120px;
        height: 32px;
        margin: 16px 40px;
        float: left;
        color: #fff;
        text-align: center;
        line-height: 32px;
        font-size: 25px;
        font-family:"-webkit-pictograph";
        cursor: pointer;
    }
    .ant-menu-horizontal{
        float: left;
    }
    .header .user-control{
        float: right;
        background: rgba(255,255,255,.2);
        height:48px;
        width: 48px;
        margin:8px 18px;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
    }
</style>