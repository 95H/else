<template>
  <div>
    <Head :showArrow="true">详情页</Head>
    <div class="container">
      <div class="cont_t">
        <div class="cont_t_l">
          <img :src="good.img" alt>
        </div>
        <div class="cont_t_r">
          <p>
            <span>名称：</span>
            <input type="text" v-model="good.name">
          </p>
          <p>
            <span>价格：</span>
            <input type="text" v-model="good.price">
          </p>
          <p>
            <span>产地：</span>
            <input type="text" v-model="good.production">
          </p>
          <p>
            <span>描述：</span>
            <input type="text" v-model="good.describe">
          </p>
          <p>
            <span>店铺：</span>
            <input type="text" v-model="good.shop">
          </p>
        </div>
      </div>
      <div class="cont_b">
        <p>简介：</p>
        <p>{{good.introduction}}</p>
      </div>
      <div class="btnbox">
        <button @click="update">确认修改</button>
        <button @click="addGood">添加</button>
      </div>
      <!-- <label for="">简介</label> -->
      <!-- <input type="text" v-model="good.name"> -->
    </div>
  </div>
</template>

<script>
import Head from "../base/head";
import { getOne, modifyGood,addNew } from "../api";
export default {
  name: "detail",
  data() {
    return {
      good: {}
    };
  },
  created() {
    this.getGoods();
  },
  computed: {
    gid() {
      return this.$route.params.id;
    }
  },
  components: { Head },
  methods: {
    // 添加
    async addGood() {
      await addNew(this.good);
      // this.$router.push("/deta");
    },
    // 修改
    async update() {
      await modifyGood(this.gid, this.good);
      // this.$router.push("/deta");
    },
    async getGoods() {
      let good = await getOne(this.gid);
      console.log(good);
      this.good = good[0];
    }
  },
  mounted() {
    this.getGoods();
    // let this.gid=this.$route.params.id
    console.log(this.$route.params.id);
    // let foot = (document.getElementsByClassName("footer")[0].style.display =
    // "none");
    // console.log(foot);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.container {
  overflow-y: auto;
  position: absolute;
  top: 50px;
  margin-bottom: 50px;
  padding: 15px 5px;
  button {
    background: #ff0088;
    width: 30%;
    border-radius: 10px;
    line-height: 25px;
    margin-left: 35%;
    margin-top: 20px;
    color: #fff;
    padding: 3px 10px;
    border: none;
  }
  .cont_t {
    display: flex;
    justify-content: space-around;
    padding-bottom: 20px;
    .cont_t_l {
      width: 40%;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid darkkhaki;
        border-radius: 5px;
      }
    }
    .cont_t_r {
      width: 40%;
      p {
        display: flex;
        justify-content: space-between;
        line-height: 25px;
        span {
          width: 40%;
          color: #000;
          font-size: 8px;
        }
        input {
          width: 60%;
          margin: 5px 0;
          line-height: 20px;
          outline: none;
          border: 1px solid plum;
          padding-left: 5px;
          overflow: hidden;
          color: blueviolet;
        }
      }
    }
  }
  .cont_b {
    border: 1px solid salmon;
    padding: 5px 10px;
    border-radius: 5px;
    p:nth-of-type(1) {
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 3px;
    }
    p:nth-of-type(2) {
      text-indent: 30px;
      line-height: 25px;
    }
  }
}
.container::-webkit-scrollbar {
  display: none;
}
</style>
