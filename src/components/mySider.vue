<template>
    <a-layout-sider
        style="background: #fff"
        :trigger="null"
        collapsible
        v-model="collapsed"
    >
        <a-menu
           mode="inline"
           :defaultSelectedKeys="defaultMenuKey"
           :style="{ lineHeight: '64px' }"
           @select="selectHandle"
           :openKeys="openKeys"
           @openChange="onOpenChange"
        >
            <template v-for="item in menuSelect">
                <a-menu-item v-if="!item.children || item.children.length==0" :data-path="item.path" :data-title="item.title" :key="item.key">
                    <i :class="['iconfont',item.icon]" />
                    <span>{{item.title}}</span>
                </a-menu-item>
                <a-sub-menu v-else :key="item.key" :data-title="item.title">
                    <span slot="title">
                     <i :class="['iconfont',item.icon]" />
                    {{collapsed ? '':item.title}}
                    </span>
                    <a-menu-item :key="temp.key" v-for="temp in item.children" :data-path="temp.path" :data-title="temp.title"> {{temp.title}}
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script>
    import {mapGetters } from 'vuex'
    import { setToken} from "@/utils/auth";

    export default {
        name: "my-sider",
        data(){
            return{
                openKeys:[]
            }
        },
        created:function(){
            this.openKeys = this.openKey
        },
        methods:{
            //手风琴下拉菜单
            onOpenChange (openKeys) {
                if(openKeys.length>1){
                    let n = parseInt(openKeys.length-1)
                    this.openKeys = [openKeys[n]];
                }else{
                    this.openKeys = openKeys;
                }
                this.$store.dispatch('SAVE_OPEN_KEY',this.openKeys);
                setToken('openKeys',JSON.stringify(this.openKeys));
            },
            selectHandle(item){
                let url = item.item.$el.dataset.path,
                    key = item.key,
                    title = item.item.$el.dataset.title;
                //默认选中菜单
                this.$store.dispatch('SAVE_MENU_KEY',item.selectedKeys);
                setToken('menuDfKey',JSON.stringify(item.selectedKeys));
                //面包屑
                let keyArr = key.split('.'),bread = [],a,b,c =0;
                console.log(keyArr)
                for(let i =0;i<keyArr.length;i++){
                    if(i == 0){
                        a = keyArr[i]-1;
                        bread.push(this.menu[a].title);
                    }
                    else if(i == 1){
                        b = keyArr[i]-1;
                        bread.push(this.menu[a].children[b].title);
                    }else{
                        c = keyArr[i]-1;
                        bread.push(this.menu[a].children[b].children[c].title);
                    }
                }
                this.$store.dispatch('SAVE_BREAD_CRUMB',bread);
                setToken('breadCrumb',JSON.stringify(bread));
                this.$router.push(url);
            }
        },
        watch:{
            currentMenu(newVal,oldVal){
                if(newVal != oldVal){
                    //重置数组
                    this.openKeys.splice(0,this.openKeys.length);
                }
            }
        },
        computed:{
            ...mapGetters(
               ['collapsed','menuSelect','currentMenu','breadcrumb','menu','defaultMenuKey','openKey'])
        }
    }
</script>

<style scoped lang="less">
    .ant-layout-sider{
        overflow: hidden scroll;
    }
    .iconfont{
        font-size: 20px;
        margin-right:6px;
        transform: translateY(3px);
        display: inline-block;
    }
    .ant-layout-sider::-webkit-scrollbar {display:none}
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }
    .ant-menu-inline-collapsed{
        li{
            span{
                display: none;
            }
        }
        .ant-tooltip--open{
            i{
                display: none;
            }
        }
    }
    .ant-menu-inline-collapsed li span[data-v-7a6ae2de] {
        display: block;
    }
</style>