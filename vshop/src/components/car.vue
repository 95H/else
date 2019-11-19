<template>
  <div class="container">
    <Head :showArrow="true">购物车</Head>
    <p class="p_t">
      <span>
        <label for="checkallA" class="flexstart">
          <input type="checkbox" v-model="checkallA">
        </label>
      </span>
      <!-- <span>全选</span> -->
      <span>商品</span>
      <span>名称</span>
      <span>单价</span>
      <span>数量</span>
      <span>总价</span>
      <span>操作</span>
    </p>
    <p></p>
    <ul v-for="(item,index) in goodlist" :key="index">
      <li>
        <p>
          <span>
            <label for="check" class="check-box">
              <input type="checkbox" @change="changeone(item)" v-model="item.sele">
              {{item.sele}}
            </label>
          </span>
          <span>{{index+1}}</span>
          <span>
            <img :src="item.img">
          </span>
          <span>{{item.name}}</span>
          <span>${{item.price}}</span>
          <span>
            <button @click="reduceGood(index)">-</button>
            {{item.count}}
            <button @click="addGood(index)">+</button>
          </span>
          <span class="all">${{item.price*item.count}}</span>
          <span>
            <button class="dele" @click="dele(index)">删除</button>
          </span>
        </p>
      </li>
    </ul>
    <div class="end">
      <p>
        <span>共买：</span>
        <span>{{allCount}}</span>
      </p>
      <p>
        <span>共计：</span>
        <span>{{totalPrice}}</span>
      </p>
    </div>

    <!-- {{goodlist}} -->
  </div>
</template>

<script>
import Head from "../base/head";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "list",
  data() {
    return {};
  },
  computed: {
    checkallA: {
      get() {
        return this.$store.getters.checkall;
        // return this.getAllcheck;
      },
      // set里面会接收一个参数 val 是当前双向绑定的val
      set(val) {
        this.$store.commit("checkall", val);

        // commit 三种传参方式 第一种必须要结合 ...mapMutations写 不然不知道传到哪里去了
        // vuex 表单
        // 如果是双向绑定的值使用vuex 一般通过设置值的get和set 或者用监听事件的形式来实现值
        // 1.this.checkall(val)
        // 2.this.$store.commit('checkall',val)
        // 3.this.$store.commit({type:'checkall',val})
      }
    },
    // ...mapMutations('checkall'),
    ...mapGetters(["checkall", "allCount", "totalPrice"]),
    //  ...mapGetters(["getallcheck"]),
    ...mapState(["goodlist"])
  },
  components: { Head },
  methods: {
    reduceGood(index) {
      this.$store.commit("jian", index);
    },
    addGood(index) {
      this.$store.commit("jia", index);
    },
    changeone(item) {
      this.$store.commit("change", item);
    },
    ...mapMutations({
      dele: "DELETE_CAR"
    })
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 120px;
  .flexstart {
    input {
      margin: 0 10px;
      -webkit-appearance: none;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #e3e3e3;
      border-radius: 5px;
      outline: none;
    }
    input:checked:before {
      content: "";
      display: inline-block;
      border: 3px solid #000;
      font-weight: bold;
      border-top-width: 0;
      border-right-width: 0;
      width: 12px;
      height: 8px;
      transform: rotate(-50deg);
      position: relative;
      left: 2px;
    }
  }
  .p_t {
    display: flex;
    span {
      flex: 1;
      text-align: center;
      border: 0.2px solid darkgrey;
      box-sizing: content-box;
      font-size: 14px;
      padding: 10px 0;
    }
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      height: 60px;
      line-height: 60px;
      // border: 1px solid salmon;
      text-align: center;
      p {
        display: flex;
        height: 60px;
        .all {
          color: red;
        }
        span {
          display: inline-block;
          flex: 1;
          border: 0.2px solid darkgrey;
          //  border: 1px solid salmon;
          box-sizing: content-box;
          img {
            width: 90%;
            height: 90%;
            overflow: hidden;
          }
          input {
            width: 20px;
            height: 20px;
            -webkit-appearance: none;
            border-radius: 3px;
            border: 1px solid silver;
          }
          input:checked:before {
            content: "";
            display: inline-block;
            border: 2px solid #000;
            font-weight: bold;
            border-top-width: 0;
            border-right-width: 0;
            width: 10px;
            height: 6px;
            transform: rotate(-40deg);
            position: relative;
            left: 3px;
          }
          button {
            border: none;
            border: 1px solid transparent; //自定义边框
            outline: none; //消除默认点击蓝色边框效果
            cursor: pointer;
          }
        }
      }
      .dele{
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .end {
    // padding: 10px;
    text-align: center;
    float: right;
    p {
      display: flex;
      font-weight: bold;
      padding-right: 20px;
      //  border: 1px solid darkgray;
      //  border-radius: 5px;
      margin: 5px 0;
      span {
        justify-content: space-around;
        display: inline-block;
        width: 70px;
      }
      span:nth-of-type(2) {
        color: red;
      }
    }
  }
}
</style>
