<template>
  <div>
    <Head :showArrow="true">全列</Head>
    <div class="list">
      <ul>
        <router-link
          v-for="(frut,index) in Alist"
          :key="index"
          :to="{name:'detail',params:{id:frut.id}}"
          tag="li"
        >
          <p>
            <img v-lazy="frut.img" alt>
          </p>
          <p>
            <span>{{frut.name}}</span>
          </p>

           <button @click.stop="addCart(frut)">添加</button>
          <button @click.stop="dele(frut.id)">删除</button>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Head from "../base/head";
import { getAll, getpage, deleteGood } from "../api";
import Loading from "../base/Loading";
import * as Types from '../store/mutations-types.js'
export default {
  name: "lis",
  components: { Head },
  data() {
    return {
      Alist: []
    };
  },
  created() {
    this.getALLlist();
  },
  methods: {
    // 添加商品到购物车
    addCart(good){
      // console.log(this)
      this.$store.commit({
        type:Types.ADD_CAR,
        good
      })
    },
    // 删除商品
    async dele(deleId) {
      await deleteGood(deleId);
      this.Alist = this.Alist.filter(item => item.id !== deleId);
    },
    async getALLlist() {
      // let Alist = await getpage()
      let Alist = await getAll();
      this.Alist = Alist;
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  margin: 50px 0;
  ul {
    width: 100%;
    overflow: hidden;
    button {
      background: #ff0088;
      width: 40%;
      border-radius: 10px;
      margin: 10px auto 0 auto;
      color: #fff;
      padding: 3px 10px;
      border: none;
    }
    li {
      float: left;
      padding: 10px;
      width: 40%;
      margin: 3% 1.5%;
      text-align: center;
      font-weight: bold;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid rosybrown;
      }
      p:nth-of-type(2) {
        background: #ff0088;
        width: 40%;
        border-radius: 10px;
        margin: 10px auto 0 auto;
        color: #fff;
        padding: 3px 10px;
      }
    }
  }
}
</style>


