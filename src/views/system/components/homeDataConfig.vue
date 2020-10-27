<template>
    <div class="config-show">
        <!--显示模块-->
        <a-collapse v-model="activeKey">
            <a-collapse-panel header="功能模块" key="1">
                <!--选中显示-->
                <div class="show-model model-item">
                    <span>当前显示：</span>
                    <div class="show-item">
                        <div class="item-box" v-for="(item,index) in showModelList" :key="index">
                            <a-icon :class="['icon',item.bg]" :type="item.icon" />
                            <span class="text">{{item.text}}</span>
                        </div>
                    </div>
                </div>
                <!--全部模块-->
                <div class="all-model model-item">
                    <span>全部功能：</span>
                    <a-checkbox-group @change="onChange" :value="selectOptions">
                        <a-checkbox :checked="item.checked" :value="item.value" v-for="(item,index) in allModel" :key="index">{{item.text}}</a-checkbox>
                    </a-checkbox-group>
                </div>
            </a-collapse-panel>
            <a-collapse-panel header="基础信息配置" key="2" :disabled='false'>
                <p>基础信息配置</p>
            </a-collapse-panel>
            <a-collapse-panel header="高级配置" key="3">
                <p>高级配置</p>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
    export default {
        name: "home-data-config",
        data(){
            return{
                activeKey:['1'],
                showModelList:[],
                selectOptions:[],
                allModel:[
                    {
                        icon:'picture',
                        text:'轮播图',
                        value:'0',
                        checked:true,
                        bg:'primary-bg'
                    },
                    {
                        icon:'bars',
                        text:'分类',
                        value:'1',
                        checked:false,
                        bg:'primary-bg'
                    },
                    {
                        icon:'bell',
                        text:'消息',
                        value:'2',
                        checked:false,
                        bg:'primary-bg'
                    },
                    {
                        icon:'block',
                        text:'功能',
                        value:'3',
                        bg:'primary-bg'
                    },
                    {
                        icon:'ellipsis',
                        text:'其他',
                        value:'4',
                        checked:false,
                        bg:'primary-bg'
                    }
                ]
            }
        },
        methods:{
            onChange (checkedValues) {
                this.selectOptions = checkedValues;
                let arr = [];
                for(let item of this.allModel){
                    for(let temp of checkedValues){
                        if(item.value === temp){
                            arr.push(item);
                            break;
                        }
                    }
                };
                this.showModelList = arr;
            }
        }
    }
</script>

<style scoped lang="less">
    .model-item:not(:last-child){
        margin-bottom: 10px;
    }
    .show-model{
        display: flex;
        .show-item {
            &>.item-box:not(:last-child){
                margin-right: 10px;
            }
            .item-box{
                display: inline-block;
                text-align: center;
                .icon{
                    border-radius: 50%;
                    display: block;
                    height:36px;
                    width:36px;
                    line-height:42px;
                    margin-bottom:2px;
                    font-size:18px;
                }
                .text{
                    font-size: 12px;
                }
            }
        }
    }
</style>