<template>
    <div class="login">
         <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                   <Icon :size="18" type="ios-log-in" />
                    欢迎登录
                </p>
               <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="18" type="ios-person" />
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="18" type="ios-lock" />
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button  type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                   <!--  <p class="login-tip">输入任意用户名和密码即可</p> -->
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("https://camo.githubusercontent.com/6797bdc1a11d35369611c817bbd5dae9a162d775/68747470733a2f2f7261772e6769746875622e636f6d2f4a61636b736f6e5469616e2f666b732f6d61737465722f666967757265732f666b732e6a7067");
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>


