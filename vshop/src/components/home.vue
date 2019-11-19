<template>
  <div class="container">
    <Head :showArrow="false">首页</Head>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in bannerlist" :key="index">
          <img :src="item.img" alt>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <Loading v-if="load"></Loading>
    <template v-else>
    <div class="list">
      <ul>
        <li v-for="(frut,index) in list" :key="index">
          <p>
            <img :src="frut.img" alt>
          </p>
          <p>
            <span>名称：{{frut.name}}</span>
            <span>价格：${{frut.price}}</span>
          </p>
        </li>
      </ul>
    </div>
     </template>
  </div>
</template>

<script>
import Head from "../base/head";
import Swiper from "swiper";
// import { getNew } from "../api";
import {getHome} from "../api"
import Loading from "../base/Loading"
export default {
  name: "home",
  data() {
    return {
      bannerlist: [
        {
          img: require("../assets/313843.jpg")
        },
        {
          img: require("../assets/321847.jpg")
        },
        {
          img: require("../assets/322271.jpg")
        }
      ],
      list: [],
      load:true
    };
  },
  components: { Head ,Loading},
  created() {
    // this.getNewlist();
     this.getHomeList()
  },
  mounted: () => {
    //配置Swiper  建议关于Swiper配置方面可以前往Swiper官网
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination"
      },
      loop: true,
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      observer: true //很重要
    });
  },
  methods: {
    // async getNewlist() {
    //   let list = await getNew();
    //   this.list = list;
    // }
     async getHomeList(){
      [this.list]=  await getHome();
      this.load= false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container {
  .swiper-container {
    width: 100%;
    height: 300px;
    margin-top: 50px;
    .swiper-slide {
      width: 100%;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .list {
    margin-bottom: 50px;
    padding: 10px;
    ul {
      overflow: hidden;
      li {
        width: 80%;
        margin: 0 auto 20px 10%;

        margin-bottom: 20px;
        float: left;
        display: flex;
        justify-content: space-between;

        p:nth-of-type(1) {
          width: 40%;
          border: 1px solid saddlebrown;

          img {
            width: 100%;
            height: 100%;
          }
        }
        p:nth-of-type(2) {
          width: 40%;
          line-height: 30px;
          margin: auto auto;
          span {
            display: inline-block;
            font-weight: bold;
            line-height: 35px;
            vertical-align: middle;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
