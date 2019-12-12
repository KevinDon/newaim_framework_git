<template>
  <div class="Login">
    <el-container>
      <el-header>
        <div style="display: none">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">My Account</el-breadcrumb-item>
            <el-breadcrumb-item>Bind Account</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="display: flex;">
            <h3 style="line-height: 20px;">Bind Account</h3>
          </div>
        </div>
      </el-header>
      <el-main style="min-height: 760px;">
        <div class="LoginWin">
          <div class="LoginWin-body">
            <div style="flex: 1;border-right: 1px solid rgb(239,239,239)">
              <img :src="logosrc" alt="LOGO" style="width: 260px;height: 235px;margin-right: 20px"/>
            </div>
            <div style="flex: 1">
              <div style="margin-left: 10px">
                <p class="login-label">Enter your email address:</p>
                <el-input v-model="account" placeholder="Dropshipzone Account" size="mini" ref="account"></el-input>
                <p class="login-label">Enter your email address:</p>
                <el-input v-model="password" placeholder="Password"  size="mini" ref="password" type="password"></el-input>
                <el-button size="mini" type="primary" round plain style="margin: 15px auto;display: block;width: 150px" @click="handleLogin">
                  &nbsp;&nbsp;&nbsp;BIND&nbsp;
                </el-button>
                <h4 style="font-size: 14px">NO Account?</h4>
                <p><router-link to='/DashBoard'>Sign up</router-link>  for Dropshipzone.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <p style="text-align: center">©2012-2019 XXXXXX All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'Login',
    created: function () {
    // let url = this.HOME + '/verify?email=jenny_leon@163.com&password=newaim'
    // this.$http.post(url).then(function (response) {
    //   console.log(888, response)
    // })
    },
    mounted: () => {
        console.log();
    },
    methods: {
        handleLogin: function () {
            let account = this.$refs.account.value;
            let password = this.$refs.password.value;

            if (!account && !password) {
                this.$message({
                    message: 'Account and Password cannot be empty',
                    type: 'error',
                    duration: 5000
                });
                return;
            }

            let url = this.HOME + '/verify';
            let params = {};
            params['email'] = account;
            params['password'] = password;

            let me = this;
            // 显示遮罩
            this.$store.dispatch('showloadingMask');

            // 开始请求api
            this.$http.post(url, params).then(function (response) {
                console.log(response);
                me.$store.dispatch('hideloadingMask');
                // 请求成功
                if (response.data.status === true) {
                    me.$message({
                        message: response.data.message,
                        type: 'success',
                        duration: 5000
                    });
                    me.$store.dispatch('handleLogin', account);
                    me.$router.push('/MyAccount');
                } else {
                    me.$message({
                        message: response.data.message,
                        type: 'error',
                        duration: 5000
                    });
                }
            }).catch(function (error) {
                console.log(error);
                me.$store.dispatch('hideloadingMask');
                me.$message({
                    message: 'Login Failed',
                    type: 'error',
                    duration: 5000
                });
            });
        }
    },
    data () {
        return {
            msg: '',
            account: '',
            password: '',
            logosrc: '../../static/logo.png'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Login{ width: calc(100% - 40px);height: calc(100% - 40px);padding: 20px; background-color: rgb(239,239,239); }
  .LoginWin{ background-color: #FFFFFF;width:660px;height: 400px;border-radius: 10px;margin: 160px auto 0px; }
  .LoginWin-body{ height: 250px;position: relative;top: 75px;left: 60px;width: 510px;display: flex }
  .login-label{ margin: 10px }
</style>
