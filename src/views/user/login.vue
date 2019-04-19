<template>
    <div class="login">
        <a-form
                class="login-form"
                :form="form"
                @submit="handleSubmit">
            <a-form-item :wrapper-col="{ span: 8,offset:8}">
                <img class="logo" src="../../../static/img/avatar.gif" alt="">
            </a-form-item>
            <a-form-item has-feedback>
                <a-input placeholder="请输入账号"
                    v-decorator="[
                        'username',
                        {
                          rules: [{ required: true,pattern:/^[a-zA-Z]\w{1,29}$/i, message: 'Username is required!' }],
                        }]"
                />
                <i class="iconfont yonghu"></i>
            </a-form-item>
            <a-form-item has-feedback>
                <a-input type="password" id="warning" placeholder="请输入密码"
                         v-decorator="[
                        'password',
                        {
                          rules: [{ required: true, min:'6',pattern:/^[a-zA-Z]\w{5,17}$/i, message: 'Password is required!' }]
                        }]"
                />
                <i class="iconfont mima"></i>
            </a-form-item>
            <!--拖动验证-->
            <a-form-item>
                <div class="drag-check">
                    <div class="drag-item drag-bg" :style="{width:moveX + 'px'}"></div>
                    <a-icon :style="{left:moveX + 'px'}" :type="success?'check':'double-right'" class="drag-item drag-btn" @mousedown="onmousedown($event)" @mouseup="onmouseup"/>
                    <span :class="['drag-item text',success? 'success':'']">{{dragText}}</span>
                </div>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 24}">
                <a-button :disabled="!success" block size="large" class="submit" type="primary" html-type="submit">登录</a-button>
            </a-form-item>

            <a-form-item class="other-logins">
                <a-button size="large" class="btn wechat-btn" type="default" shape="circle" icon="wechat"></a-button>
                <a-button size="large" class="btn qq-btn" type="primary" shape="circle" icon="qq"></a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        mounted:function(){
            window.onmouseup = ()=>{
                this.onmouseup()
            }
        },
        data(){
            return{
                checkOn:false,
                dragText:'请拖动滑块解锁',
                moveX:0,
                startsX:0,
                distance:0,
                success:false,
                form:this.$form.createForm(this)
            }
        },
        methods:{
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(values);
                    }
                });
            },
            dragMoveHandle(){
                window.onmousemove= e =>{
                    if(!this.checkOn || this.success) return
                    let offsetX = e.clientX - this.startsX
                    if(offsetX <=0)return
                    this.moveX = offsetX
                    this.checkWidth()
                }
            },
            checkWidth(){
                let dbWidth = document.querySelector('.drag-check').clientWidth,
                    btnWidth = document.querySelector('.drag-btn').clientWidth;
                this.distance = dbWidth - btnWidth;
                if(this.moveX >= this.distance){
                    this.moveX = this.distance;
                    this.success = true;
                    this.dragText = '解锁成功'
                }

            },
            onmousedown(e){
                this.checkOn = true;
                this.startsX = e.clientX;
                this.dragMoveHandle();
            },
            onmouseup(){
                this.checkOn = false;
                if(!this.success){
                   this.moveX = 0;
                }
            }
        }
    }
</script>

<style lang="less">
    .login-form{
        width: 25%;
        .logo{
            width: 100%;
        }
        .ant-form-item-control{
            .ant-form-item-children{
                display: inherit!important;
                .ant-input{
                    display: block;
                    height: 40px;
                    padding-left: 50px;
                }
                .iconfont{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    background: #1890ff;
                    width: 40px;
                    text-align: center;
                    color: #fff;
                    height:40px;
                    border-radius: 5px 0 0 5px;
                }
            }
        }
        .drag-check{
            text-align: center;
            position: relative;
            background: #e4e4e4;
            height: 40px;
            border-radius: 3px;
            overflow: hidden;
            .drag-item{
                position: absolute;
                left: 0;
                top:0;
                height: 100%;
            }
            .drag-bg{
                background:#1de406;
                z-index: 1;
            }
            .text{
                width: 100%;
                text-align: center;
                z-index: 2;
            }
            .success{
                color: #fff;
            }
            .drag-btn{
                background:#fff;
                width: 44px;
                line-height: 40px;
                z-index: 3;
                cursor: pointer;
                color: #1890ff;
                -moz-user-select:none;
                -webkit-user-select:none;
                user-select:none;
                box-shadow: 0 2px 4px rgba(0,0,0,.2);
            }
        }
        .other-logins{
            display: flex;
            margin-top: 40px;
            justify-content: space-evenly;
            .btn{
                margin:0 40px;
                width: 45px;
                height: 45px;
            }
            .wechat-btn{
                background: #1de406;
                color: #fff;
                border: none;
            }
        }
    }
</style>