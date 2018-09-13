<!-- 登录页面 -->
<template>
  <div class="login-page">
    <el-card class="login-card">
      <el-tabs v-model="loginType" @tab-click="handleClick">
        <el-tab-pane label="学号登录" name="stuNumber">
          <el-form ref="stuForm" :model="stuFormData" label-width="80px">
            <el-form-item label="学号">
              <el-input v-model="stuFormData.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="stuFormData.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </el-form-item>
            <el-button type="primary" @click="stuLoginHandle" :loading="logining">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="telNumber">手机登录</el-tab-pane>
      </el-tabs>
      
    </el-card>
  </div>
</template>

<script>
import HTTP from '../http/http.js'

export default {
  name: 'login',
  data () {
    return {
      loginType: 'stuNumber',
      stuFormData: {
        name: '',
        password: ''
      },
      checked: true, // 记住密码
      logining: false,
      rules: {
        account: [
          { required: true, message: '请输入账号' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    stuLoginHandle () {
      console.info(this.stuFormData)
      HTTP.HttpLogin({stuFormData: this.stuFormData.name, password: this.stuFormData.password})
        .end((err, res) => {

          console.info(res)

          if (!err) {
            let {code, message, user} = res.body
            console.info(code)
            console.info(message)
            // console.info('user' + JSON.stringify(user))
            if (code === '200') { // 登录成功
              sessionStorage.setItem('access-user', JSON.stringify(user))
              // if (user.role === '0') {
              //   index.options.routes[6].menuShow = true
              // } else {
              //   index.options.routes[6].menuShow = false
              // }
              // setTimeout(this.pushHome(), 1000)
            } else {
              this.$message({
                duration: 1500,
                type: 'error',
                message: '账号或是密码错误!'
              })
            }
          }
        })
      }
    }
}
</script>

<style lang="scss">
.login-page {
  .login-card {
    margin: 0 auto;
    width: 600px;
  }
}
</style>

