<template>
  <div class="login">
    <a-row :gutter="24">
      <a-col class="login-box" :lg="{ span: 8,offset:8 }" :md="{ span: 10,offset:7 }" :sm="{ span: 14,offset:5 }"  :xs="{ span: 20,offset:2 }">
        <a-form class="login-form" :form="form" @submit="handleSubmit">
          <h2 class="hd">后台管理系统</h2>
          <a-form-item has-feedback>
            <a-input
              placeholder="请输入账号"
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: '至少输入两位字符'
                    }
                  ]
                }
              ]"
            />
            <i class="iconfont yonghu"></i>
          </a-form-item>
          <a-form-item has-feedback>
            <a-input
              type="password"
              id="warning"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      min: '6',
                      pattern: /^[a-zA-Z0-9]\w{5,17}$/i,
                      message: '请输入6-18位非特殊字符'
                    }
                  ]
                }
              ]"
            />
            <i class="iconfont mima"></i>
          </a-form-item>
          <!--拖动验证-->
          <a-form-item>
            <div class="drag-check">
              <div
                class="drag-item drag-bg"
                :style="{ width: moveX + 'px' }"
              ></div>
              <a-icon
                :style="{ left: moveX + 'px' }"
                :type="success ? 'check' : 'double-right'"
                class="drag-item drag-btn"
                @mousedown="onmousedown($event)"
                @mouseup="onmouseup"
              />
              <span :class="['drag-item text', success ? 'success' : '']">{{
                dragText
              }}</span>
            </div>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button
              :disabled="!success"
              block
              size="large"
              class="submit"
              type="primary"
              html-type="submit"
              >登录</a-button
            >
          </a-form-item>
          <a-divider>快捷登陆</a-divider>
          <!-- 快速登录 -->
          <div class="quick-login">
           <a-button :icon="item.icon" size="large" shape="circle" v-for="(item, index) in quickList" @click="quickHandle(item)"/>
          </div>
        </a-form>
      </a-col>
      <a-modal v-model="visible" @cancel="hideModal" :footer="null" width="400px">
        <img src="../../../static/img/code.jpg"/>
      </a-modal>
    </a-row>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
const app = cloudbase.init({
  env: "dev-serve-7g46wttx6ced4f15",
  region: "ap-guangzhou"
});
const auth = app.auth();
export default {
  name: 'login',
  mounted: function () {
    window.onmouseup = () => {
      this.onmouseup()
    }
  },
  data () {
    return {
      checkOn: false,
      dragText: '请拖动滑块解锁',
      moveX: 0,
      startsX: 0,
      distance: 0,
      success: false,
      form: this.$form.createForm(this),
      quickList:[
        {
          icon:'wechat',
          type:'wechat'
        },
        {
          icon:'qq',
          type:'qq'
        },
        {
          icon:'github',
          type:'github'
        }
      ],
      visible:false,
      codeImg:'../../../static/img/code.jpg'
    }
  },
  methods: {
    quickHandle(item){
      console.log(item)
      // this.visible = true
      if(item.type == 'wechat'){
        const provider = auth.weixinAuthProvider({
          appid: "wx3ac5d72d508f6a26",
          scope: "snsapi_login"
        });
        provider.signInWithRedirect();
        provider.getRedirectResult().then((loginState) => {
          console.log(loginState)
          if (loginState) {
            // 登录成功！
          }
        });
      }else if(item.type == 'qq'){

      }
    },
    hideModal(){
     this.visible = false
    },
    // 登录
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          const {username, password} = values

          // 检查用户存在
          auth.isUsernameRegistered(username).then((registered) => {
            console.log(registered)
            if(registered){
              this.$notification.error({
                message:'该用户名已存在，请重新输入',
                duration: 1.5
              })
              // 重置表单
              this.success = false
              this.checkOn = false
              this.dragText='请拖动滑块解锁'
              this.moveX= 0
              this.startsX= 0
              this.distance=0
              this.form.resetFields()
            }else{
              // auth.signInWithUsernameAndPassword(username, password).then((loginState) => {
              //   console.log(loginState)
              //   // 用户名密码登录成功
              // }).cath((err)=>{
              //   console.log(err)
              // });
              // auth.signUpWithEmailAndPassword(username, password)
              // .then((loginState) => {
              //   console.log(loginState)
              //   // 发送验证邮件成功
              //   this.$notification.error({
              //     message:'发送验证邮件成功,请前往激活',
              //     duration: 1.5
              //   })
              // });
              auth.signInWithEmailAndPassword(username, password)
              .then((loginState) => {
                console.log(loginState)
                // 登录成功
              });
            }
          });
          
          // login(values)
          //   .then(res => {
          //     // 登录成功  前往目标页面
          //     this.$notification.success({
          //       message: res.message,
          //       duration: 2
          //     })
          //     this.$store.dispatch('SAVE_TOKEN', res.token)
          //     setToken('token', res.token)
          //     this.$router.push('/homeConfig')
          //   })
          //   .catch(e => {
          //     this.$notification.error({
          //       message: e.message,
          //       duration: 1.5
          //     })
          //   })
        }
      })
    },
    dragMoveHandle () {
      window.onmousemove = e => {
        if (!this.checkOn || this.success) return
        let offsetX = e.clientX - this.startsX
        if (offsetX <= 0) return
        this.moveX = offsetX
        this.checkWidth()
      }
    },
    checkWidth () {
      let dbWidth = document.querySelector('.drag-check').clientWidth,
        btnWidth = document.querySelector('.drag-btn').clientWidth
      this.distance = dbWidth - btnWidth
      if (this.moveX >= this.distance) {
        this.moveX = this.distance
        this.success = true
        this.dragText = '解锁成功'
      }
    },
    onmousedown (e) {
      this.checkOn = true
      this.startsX = e.clientX
      this.dragMoveHandle()
    },
    onmouseup () {
      this.checkOn = false
      if (!this.success) {
        this.moveX = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-box{
    position: fixed;
    top: 50%;
    transform: translateY(-60%);
}
.login-form {
  background: #ffffff;
  padding: 26px;
  box-sizing: border-box;
  border-radius: 18px;
  width: 100%;
  .hd{
    text-align: center;
    margin-bottom: 20px;
  }
  & > .ant-form-item:last-child {
    margin-bottom: 0;
  }
  .ant-form-item-control {
    .ant-form-item-children {
      display: inherit !important;
      .ant-input {
        display: block;
        height: 40px;
        padding-left: 50px;
      }
      .iconfont {
        position: absolute;
        left: 0px;
        top: 0px;
        background: #1890ff;
        width: 40px;
        text-align: center;
        color: #fff;
        height: 40px;
        border-radius: 5px 0 0 5px;
      }
    }
  }
  .drag-check {
    text-align: center;
    position: relative;
    background: #e4e4e4;
    height: 40px;
    border-radius: 3px;
    overflow: hidden;
    .drag-item {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
    }
    .drag-bg {
      background: #ff9800;
      z-index: 1;
    }
    .text {
      width: 100%;
      text-align: center;
      z-index: 2;
      color: #8e8e8e;
    }
    .success {
      color: #fff;
    }
    .drag-btn {
      background: #1890ff;
      width: 40px;
      line-height: 44px;
      font-size:16px;
      z-index: 3;
      cursor: pointer;
      color: #fff;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
  .quick-login{
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
