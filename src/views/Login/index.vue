<template>
  <div class="login-page">
    <div class="back">
      <van-icon name="arrow-left" />
    </div>
    <van-nav-bar title="头条登录" class="title"> </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '不符合手机的格式',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '不符合验证码的格式',
          },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            native-type="button"
            class="code"
            v-else
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
  <!-- /表单 -->
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  name: 'LoginPage',
  created () { },
  data () {
    return {
      mobile: '',
      code: 246810,
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败! 请重试')
        }
      } catch (err) {
        this.$toast.fail('手机号格式不对')
      }
    },
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(values)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-page {
  padding: 32px 40px !important;
}
.back {
  height: 60px;
  display: flex;
  align-items: center;
  .van-icon {
    font-size: 40px;
    color: #999;
    position: relative;
    left: -15px;
  }
}
.toutiao {
  font-size: 37px;
}
.code {
  width: 152px;
  height: 46px;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.van-button {
  width: 100%;
  color: #fff;
  font-size: 16px;
  border: none;
  background: linear-gradient(to right, #ff9999, #ffa179);
}
.submit {
  margin-top: 40px;
  height: 70px;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 90px;
  top: 300px;
}
</style>
