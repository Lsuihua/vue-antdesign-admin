<template>
    <div>
        <img class="avatar" src="../../../../static/img/avatar.gif" @click="showDrawer">
        <a-drawer
                title="基本信息设置"
                placement="right"
                :closable="false"
                @close="onClose"
                :visible="visible"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <a-button type="danger" class="logout-btn" @click="logoutHandle">退出登录</a-button>
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
            },
            logoutHandle(){
                this.visible = false
            }
        }
    }
</script>

<style scoped lang="less">
    .avatar{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left: 0;
    }
    .logout-btn{
        position: absolute;
        bottom: 4%;
        width:50%;
        left: 50%;
        transform: translate(-50%,0);
    }
</style>