<template>
    <a-tabs @change="callback" type="card">
        <a-tab-pane :tab="item.text" :key="index" v-for="(item,index) in tabList">
            <home-data-config v-if="item.key == 'home'? true:false"></home-data-config>
            <banner-config v-if="item.key == 'banner'? true:false"></banner-config>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" @click="otherHandle">其他设置</a-button>
    </a-tabs>
</template>

<script>
    import homeDataConfig from './components/homeDataConfig';
    import bannerConfig from './components/bannerConfig';
    export default {
        name: "home-config",
        components:{homeDataConfig,bannerConfig},
        data(){
            return{
                tabList:[
                    {
                        text:'数据配置',
                        key:'home',

                    },
                    {
                        text:'banner配置',
                        key:'banner',
                    }]
            }
        },
        methods:{
            callback (key) {
                console.log(key);
            },
            otherHandle(){
                console.log(111);
            }
        }
    }
</script>

<style scoped>
</style>