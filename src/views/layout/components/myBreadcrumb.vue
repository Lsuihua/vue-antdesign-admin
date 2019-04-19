<template>
    <div class="breadcrumb flex-center">
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
    @import "../../../../static/css/common.css";
    .breadcrumb{
        height:60px;
    }
    .trigger{
        font-size:22px;
        cursor: pointer;
    }
    .trigger,.ant-breadcrumb{
        margin-left:20px;
    }
</style>