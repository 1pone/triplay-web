<template>
  <div class="login-page">
    <img class="bg" src="@/assets/img/bg_login.svg" alt="bg_login" />
    <!-- <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    /> -->
    <img class="logo" src="@/assets/img/logo.png" alt="logo" />
    <van-form
      ref="loginForm"
      @submit="login"
      @falied="onFailed"
      :show-error="false"
      :show-error-message="false"
      validate-first
    >
      <van-cell-group class="login-cell-group" inset>
        <van-field
          v-model="user.email"
          :rules="loginRules.moibile"
          placeholder="请输入邮箱"
          label="邮箱"
          name="email"
        />
        <van-field
          v-model="user.pwd"
          clearable
          :rules="loginRules.code"
          placeholder="请输入密码"
          label="密码"
          name="code"
        >
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button block round type="info" class="login-btn">登录</van-button>
      </div>
    </van-form>

    <van-divider>快捷登录</van-divider>
    <van-row>
      <van-col span="6"></van-col>
      <van-col span="6"
        ><van-image
          class="icon_fastLogin"
          src="https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_tripPal.png"
          alt="bg_tripPal"
          fit="cover"
          round
      />
      <p class="text_fastLogin">TripPal</p></van-col>
      <van-col span="6"
        ><van-image
          class="icon_fastLogin"
          src="https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_ctrip.png"
          alt="bg_ctrip"
          fit="cover"
          round
      />
      <p class="text_fastLogin">SSO</p></van-col>
      <van-col span="6"></van-col>
    </van-row>
  </div>
</template>

<script>
import { loginApi } from "@/api/user";
import { getUserLabel } from "@/api/label"
import { loginRules } from "@/utils/validateRules";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "asdf@qq.com",
        pwd: "123456",
      },
      loginRules,
      isCountDown: false,
      isSendLoad: false,
    };
  },
  methods: {
    // 登录
    async login() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });

      const res = await loginApi(this.user);
      const data = res.data;
      console.log(res);
      switch (data.code) {
        case 0:
          {
            this.$toast.success("登录成功");
            // 本地保存用户数据
            sessionStorage.setItem("user", JSON.stringify(data.data));
            // 获取用户标签
            const labelRes = await getUserLabel(data.data.userId);
            console.log(labelRes);
            // 若已经选择标签，则跳转首页
            if (!labelRes.data.userLabel) {
              this.$router.push("/");
            } else {  // 否则跳转标签选择页 hobby
              this.$router.push("/hobby");
            }
          }
          break;
        case 1001:
          this.$toast.fail("登录失败，邮箱或密码错误");
          break;
      }
    },

    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    }, // onFailed
  }, // method

  created: function(){
    // this.login();
  }
};
</script>

<style lang="less">
.login-page {
  .bg {
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 60%;
    z-index: -1;
  }
  .logo {
    position: relative;
    margin-top: 15%;
    left: 15%;
    width: 70%;
  }
  .login-cell-group {
    margin: 0.75rem 0.875rem;
  }
  .login-btn-wrap {
    padding: 0.25rem 0.75rem 0;
    .login-btn {
      width: 80%;
      margin: 0 auto;
      padding-bottom: 0;
      background-color: #1989fa;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .van-row {
    text-align: center;
    .icon_fastLogin {
      width: 50%;
    }
    .text_fastLogin {
      font-size: 0.373rem;
      color: #969799;
      margin: 0;
    }
  }
}
</style>
