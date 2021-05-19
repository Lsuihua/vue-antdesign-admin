<template>
  <div class="login">
    <a-row :gutter="24">
      <a-col class="login-box" :lg="{ span: 8,offset:8 }" :md="{ span: 10,offset:7 }" :sm="{ span: 14,offset:5 }"  :xs="{ span: 20,offset:2 }">
        <a-form class="login-form" :form="form" @submit="handleSubmit">
          <h2 class="hd">后台管理系统</h2>
          <!-- 用户密码 -->
          <div v-if="loginType == 'user'">
            <a-form-item>
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
            <a-form-item>
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
          </div>
          <!-- 手机号验证码 -->
          <div v-if="loginType == 'mobile'" class="mobile-box">
            <a-form-item>
              <a-input
                v-decorator="[
                  'phoneNumber',
                  {
                    rules: [{ required: true, message: '请输入手机号码' }],
                  },
                ]"
              >
                <a-select
                  slot="addonBefore"
                  v-decorator="['prefix', { initialValue: '86' }]"
                  style="width: 70px"
                >
                  <a-select-option value="86">
                    +86
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item>
               <a-input-search
               v-decorator="[
                  'phoneCode',
                  {
                    rules: [{ required: true, message: '请输入验证码' }],
                  },
                ]"
                placeholder="请输入验证码"
                enter-button="发送验证码"
                size="large"
                @search="onSendCode"
              />
            </a-form-item>  
          </div>
          <!-- 邮箱 密码 -->
          <div v-if="loginType == 'mail'">
            <a-form-item>
              <a-input
                placeholder="请输入邮箱"
                v-decorator="[
                  'email',
                  {
                    rules: [{ required: true, message: '请输入邮箱' }],
                  },
                ]"
              >
              </a-input>
              <a-icon class="iconfont" type="mail" />
            </a-form-item>
            <a-form-item>
              <a-input
                type="password"
                id="warning"
                placeholder="请输入密码"
                v-decorator="[
                  'upwd',
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
          </div>
          <!--拖动验证-->
          <!-- <a-form-item>
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
          </a-form-item> -->
          <a-form-item :wrapper-col="{ span: 24 }">
             <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  },
                ]"
              >
                记住密码
              </a-checkbox>
              <a class="login-form-forgot" @click="toRegister">
                去注册？
              </a>
            <a-button
              block
              size="large"
              class="submit"
              type="primary"
              html-type="submit"
              >登录</a-button
            >
          </a-form-item>
          <a-divider>其他登陆</a-divider>
          <!-- 快速登录 -->
          <div class="quick-login">
           <a-button :icon="item.icon" size="large" shape="circle" :type="index == current ?'primary':''" v-for="(item, index) in quickList" @click="quickHandle(item,index)"/>
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
import { testPhone } from '@/utils/auth'
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
      current:0,
      loginType:'user',
      quickList:[
        {
          icon:'user',
          type:'user'
        },
        {
          icon:'mobile',
          type:'mobile'
        },
        // {
        //   icon:'wechat',
        //   type:'wechat'
        // },
        {
          icon:'mail',
          type:'mail'
        }
      ],
      visible:false
    }
  },
  methods: {
    toRegister(e){
      e.preventDefault()
      // 去注册
      this.$router.replace('/register')
    },
    onSendCode(){
      // 发送验证码
      let _mobile = this.form.getFieldValue('phoneNumber')
      if(testPhone(_mobile)){
        auth.sendPhoneCode(_mobile).then((res) => {
            if (res === true) {
                console.log("验证码发送成功!");
            }
        });
      }
    },
    quickHandle(item,index){
      // 登陆方式
      if(index == this.current) return
      this.current = index
      this.loginType = item.type
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
      }
    },
    hideModal(){
     this.visible = false
    },
    handleSubmit (e) {
      // 登录
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          // 验证通过 弹出滑动检测
          switch(this.loginType){
            case 'user':
              const {username, password} = values
              auth.signInWithEmailAndPassword(username, password)
              .then((loginState) => {
                // 登录成功
                this.$router.replace('/')
                this.$notification.success({
                  message:'登录成功',
                  description:"欢迎回来"
                })
              }).catch(err =>{
                this.$notification.error({
                  message:'登录失败',
                  description:"账号或密码填写错误"
                })
              })
              break;
            case 'mobile':
              // 手机号登录（支持短信验证码 or 密码方式）
              const {phoneNumber, phoneCode} = values

              auth.signInWithPhoneCodeOrPassword({
                  phoneNumber,
                  phoneCode
                })
                .then((res) => {
                  // 登录成功
                });
              break;
            case 'mail':
              const {email , upwd } = values
              auth.signInWithEmailAndPassword(email, upwd)
              .then((loginState) => {
                console.log("登录结果",loginState)
                // 登录成功
                this.$router.replace('/')
                this.$notification.success('登录成功')
              }).catch(err =>{
                this.$notification.error({
                  message:'登录失败',
                  description:"邮箱或密码填写错误"
                })
              })
              break;
          }
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

</style>
