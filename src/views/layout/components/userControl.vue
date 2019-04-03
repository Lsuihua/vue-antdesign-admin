<template>
    <div>
        <img class="avatar" src="../../../../static/img/avatar.gif" @click="showDrawer">
        <a-drawer
                title="Basic Drawer"
                placement="right"
                :closable="false"
                @close="onClose"
                :visible="visible"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </div>

</template>

<script>
    export default {
        name: "user-control",
        data(){
            return{
                visible: false
            }
        },
        methods:{
            showDrawer() {
                this.visible = true
            },
            onClose() {
                this.visible = false
            }
        }
    }
</script>

<style scoped>
    .avatar{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left: 0;
    }
</style>