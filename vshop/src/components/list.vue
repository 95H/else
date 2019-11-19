<template>
  <div class="container">
    <Head :showArrow="true" ref="mhead">分列</Head>
    <swiper :swiperSlides="slider"></swiper>
    <div class="list" ref="scroll" @scroll="sload">
      <ul>
        <router-link
          v-for="(frut,index) in Alist"
          :key="index"
          :to="{name:'detail',params:{id:frut.id}}"
          tag="li"
        >
          <p>
            <img :src="frut.img" alt>
          </p>
          <p>
            <span>{{frut.name}}</span>
            <span>$:{{frut.price}}</span>
          </p>
        </router-link>
      </ul>
      <div class="center_block">
        <button @click="loadmore">{{hasmoretext}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../base/head";
import Swiper from "../base/swiper";
import { getBanner, getpage ,deleteGood} from "../api";

// import * as T from '../api'

export default {
  name: "list",
  data() {
    return {
      slider: [],
      page: 1,
      Alist: [],
      hasmore: true,
      hasmoretext: "点击加载更多"
    };
  },
  mounted() {
    // 获取原生dom 直接操作子组件
    // console.log(this.$refs.scroll)
    // console.log(this.$refs.mhead)
  },
  created() {
    this.getImglist();
    // await getBanner()
    //  T.getBanner()
    this.getA();

  },
  components: { Head, Swiper },
  methods: {
    // 删除商品
    //  deleGood(index){
    //   this.Alist.splice(index,1)
    //  }
   async dele(deleid) {
     await deleteGood()
      // this.Alist = this.Alist.filter(item => item.id !== deleid);
    },

    // 滚动事件
    sload() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.loadmore();
        }
      }, 13);
    },
    async getImglist() {
      let slider = await getBanner();
      this.slider = slider;
    },
    async getA() {
      let { data: Alist, hasmore } = await getpage(this.page);
      this.Alist = [...this.Alist, ...Alist];
      // 合并已经拿到的数据和新请求的数据
      // this.Alist = this.Alist.concat(Alist)
      this.hasmore = hasmore;
      if (!hasmore) {
        this.hasmoretext = "没有更多了";
      }
    },
    // 获取分页数据
    loadmore() {
      if (this.hasmore) {
        this.page += 1;
        this.getA();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  top: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  .list {
    padding: 4%;
    height: 250px;
    overflow: auto;
    ul {
      box-sizing: border-box;
      li {
        box-sizing: border-box;
        float: left;
        width: 30%;
        height: 120px;
        margin: 1.6%;
        p:nth-of-type(1) {
          width: 100%;
          height: 75%;
          img {
            width: 100%;
            height: 100%;
            border: 1px solid salmon;
          }
        }
        p:nth-of-type(2) {
          padding: 0 10%;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          span:nth-of-type(2) {
            color: orangered;
          }
        }
      }
    }
  }
  .center_block {
    text-align: center;
    button {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      outline: none;
      border: none;
      -webkit-appearance: none;
      background: #ff0088;
      border-radius: 10px;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>
