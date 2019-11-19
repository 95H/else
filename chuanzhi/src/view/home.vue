<template>
  <div id="admin">父级
    <Loop :list="list" @send="change"></Loop>
    <div>{{message}}=={{username}}</div>
    <Page1></Page1>
    <Page2></Page2>
    <router-link to="/icom">去Icom</router-link>
    <form>
      <input v-model="userList.id" placeholder="请输入ID">
      <input v-model="userList.userName" placeholder="请输入用户名">
      <input v-model="userList.age" placeholder="请输入年龄">
      <button type="button" @click="addData">提交数据</button>
    </form>
  </div>
</template>
<script>
import Loop from "../client/loop";
import Page1 from "../client/page1";
import Page2 from "../client/page2";
export default {
  components: { Loop, Page1, Page2 },
  data() {
    return {
      list: [1, 2, 3],
      message: "",
      username: "",
      userList: {
        id: "",
        userName: "",
        age: ""
      }
    };
  },
  methods: {
    change(msg, username) {
      this.message = msg;
      this.username = username;
    },
    addData() {
      const params = {
        id: this.userList.id,
        userName: this.userList.userName,
        age: this.userList.age
      };
      this.$http
        .post("/addUser", params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$emit("senddata", this.userlist);
    this.$http
      .get("/hot")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
#admin {
  width: 100%;
  height: 100%;
  background: gray;
}
</style>
