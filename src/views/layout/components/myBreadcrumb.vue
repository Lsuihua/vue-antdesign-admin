<template>
    <div class="breadcrumb">
        <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> this.$store.dispatch('CHANGE_COLLAPSED',!collapsed)"
        />
        <a-breadcrumb>
            <a-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "my-breadcrumb",
        data(){
            return{

            }
        },
        computed:{
                ...mapGetters(['collapsed','breadcrumb'])
        }
    }
</script>

<style scoped>
    .breadcrumb{
        height:60px;
        /*background: #ddd;*/
    }
    .trigger{
        font-size:20px;
        cursor: pointer;
    }
    .trigger,.ant-breadcrumb{
        float: left;
        height:60px;
        line-height:60px;
        margin-left:30px;
    }
</style>