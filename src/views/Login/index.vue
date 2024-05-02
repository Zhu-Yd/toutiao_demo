<template>
  <div class="container">
    <van-nav-bar class='page_nav_bar'
                 title="登录"
                 left-arrow
                 @click-left="$router.back()"
    />
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type:digit
        maxlength="11"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      >
        <template #left-icon>
          <i class="iconfont toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type:digit
        maxlength="6"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #left-icon>
          <i class="iconfont toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down :time="time" format="ss s" @finish="isShowTime = false" v-if="isShowTime"/>
          <van-button class="send-sms-btn" native-type="button" round size="small" type="default" @click="sendSms" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button  round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式有误' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码格式有误' }]
      },
      time: 6000,
      isShowTime: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登录中',
        forbidClick: true,
        duration: 0
      })
      try {
        const result = await login(this.user)
        if (result.status === 0) {
          this.$store.commit('setUser', result.token)
          this.$toast.success('登录成功')
          this.$router.push('/layout')
        } else {
          this.$toast.fail('登录失败')
        }
      } catch (err) {
        this.$toast.fail('登录失败')
        if (err.response.status === 500) {
          console.log(err)
        }
      }
    },
    async sendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      this.isShowTime = true
    }
  }
}
</script>

<style scoped lang="less">
.container {

  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn{
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
    color: #666;
  }
  .login-btn-wrap{
    padding:53px 33px;
    button{
      color: darkred;
      background-color: #f5f7f9;
      border: 2px solid darkred;
    }
  }
}
</style>
