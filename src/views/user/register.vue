<template>
  <div class="login">
    <a-row :gutter="24">
      <a-col class="login-box" :lg="{ span: 8,offset:8 }" :md="{ span: 10,offset:7 }" :sm="{ span: 14,offset:5 }"  :xs="{ span: 20,offset:2 }">
        <a-form class="login-form" :form="form" @submit="handleSubmit">
          <h2 class="hd">后台管理系统</h2>
          <!-- 手机号验证码 -->
          <div v-if="loginType == 'mobile'" class="mobile-box">
            <a-form-item>
              <a-input
                placeholder="请输入手机号"
                v-decorator="[
                  'phoneNumber',
                  {
                    rules: [{ required: true, pattern: /^1\d{10}$/i, message: '请检查手机号格式' }],
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
                :enter-button="btntext"
                size="large"
                @search="onSendCode"
                :disabled="disabled"
              />
            </a-form-item>  
          </div>
          <!-- 邮箱 密码 -->
          <div v-if="loginType == 'mail'">
            <a-form-item>
              <a-input default-value="mysite"
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
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button
              block
              size="large"
              class="submit"
              type="primary"
              html-type="submit"
              >注册</a-button
            >
            <a class="login-form-forgot" @click="toLogin">
            已有账号去登录！
            </a>
          </a-form-item>
          <a-divider>其他方式</a-divider>
          <!-- 快速登录 -->
          <div class="quick-login">
           <a-button :icon="item.icon" size="large" shape="circle" :type="index == current ?'primary':''" v-for="(item, index) in quickList" @click="quickHandle(item,index)"/>
          </div>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {testPhone} from '@/utils/auth'
let auth = null
export default {
  name: 'login',
  mounted(){
    auth = this.$app.auth();
  },
  data () {
    return {
      form: this.$form.createForm(this),
      current:0,
      loginType:'mobile',
      disabled:false,
      time:60,
      btntext:'获取验证码',
      quickList:[
        {
          icon:'mobile',
          type:'mobile'
        },
        {
          icon:'mail',
          type:'mail'
        }
      ]
    }
  },
  methods: {
    toLogin(e){
      e.preventDefault()
      // 去登录
      this.$router.replace('/login')
    },
    onSendCode(){
      // 发送验证码
      let _mobile = this.form.getFieldValue('phoneNumber')
      
      if(testPhone(_mobile)){
        auth.sendPhoneCode(_mobile).then((res) => {
            if (res === true) {
              this.disabled = true
              let timer = setInterval(()=>{
                this.time --
                this.btntext = this.time+'S后重新获取'
                if(this.time<= 0){
                  clearInterval(timer)
                  this.disabled = false
                  this.btntext = '获取验证码'
                }
              },1000)
            }
        });
      }
      
    },
    quickHandle(item,index){
      //注册方式
      if(index == this.current) return
      this.current = index
      this.loginType = item.type
    },
    handleSubmit (e) {
      // 登录
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 验证通过 弹出滑动检测
          switch(this.loginType){
            case 'mobile':
              // 手机号登录（支持短信验证码 or 密码方式）
              const {phoneNumber, phoneCode} = values

              auth.signUpWithPhoneCode(phoneNumber, phoneCode).then((res) => {
                // 注册及登录成功
                this.$router.replace('/')
              });
              break;
            case 'mail':
              const {email , upwd } = values
              auth.signUpWithEmailAndPassword(email, upwd)
              .then((loginState) => {
                console.log(loginState)
                // 发送验证邮件成功
                this.$notification.error({
                  message:'发送验证邮件成功,请前往激活',
                  duration: 1.5
                })
              });
              break
          }
        }
      })
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
