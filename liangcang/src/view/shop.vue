<template>
  <div class="shop">
    <!-- <div class="popupBox" v-if="isOk">
        <div class="alertBox">
          <img :src="AlertImgUrl" alt @click="open()">
        </div>
        <input type="button" class="closeBtn" @click="close()" value="关闭">
    </div>-->
    <div class="box-t">
      <div class="search">
        <img src="../assets/29708.png" alt>圣诞
      </div>
      <div class="daohang">
        <ul>
          <li v-for="(item,index) in classgood" :key="index" @click=getclass(item.id)>
            <a>{{item.name }}</a>
          </li>
          
          <!-- <li>
            <a>
              <img src="../assets/30379.png" alt>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
   
    <!-- 轮播组件 -->
    <div class="box">
      <swipers :ImgUrl="swiperImg"></swipers>
    </div>
     <div>
      <ul>
        <li v-for="(item,index) in classGoodTop" :key="index+'1'" >
          <span>
           
          </span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="special">
        <div class="name">{{lists.name}}</div>
        <div class="special-bottom">
          <img v-for="(item,index) in lists.picter" :key="index+'0'" :src="item.src" alt>
        </div>
      </div>
      <!-- 圣诞清单 梦幻圣诞夜 -->
      <div class="suprice" v-for="(items,index) in lists.shengdan" :key="index+'1'">
        <div class="name">{{items.name}}</div>
        <div class="txt">{{items.txt}}</div>
        <div class="contents">
          <div class="smallbox" v-for="(it,index) in items.content" :key="index+'2'">
            <img :src="it.img" alt>
            <div class="jianjie">{{it.shuoming}}</div>
            <div class="price">
              <span>{{it.newprice}}</span>
              <span>{{it.oldprice}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 八张图 -->
      <div class="fourpricter" v-for="(is,index) in lists.container" :key="index+'3'">
        <div class="small_picter">
          <img v-for="(i,indexa) in is.img" :key="indexa" :src="i.imgs" alt>
        </div>
      </div>
      <!-- 新品速递  好污热卖 -->
      <div class="suprice" v-for="(items,index) in lists.newgood" :key="index+'4'">
        <div class="name">{{items.name}}</div>
        <div class="txt">{{items.txt}}</div>
        <div class="contents">
          <div class="smallbox" v-for="(it,index) in items.content" :key="index+'5'">
            <img :src="it.img" alt>
            <div class="jianjie">{{it.shuoming}}</div>
            <div class="price">
              <span>{{it.newprice}}</span>
              <span>{{it.oldprice}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 良仓大人心爱之物 -->
      <div class="beloved">
        <img :src="lists.beloved" alt>
      </div>
      <!-- 摩羯座 -->
      <div class="appera" v-for="(ite,index) in lists.appearance" :key="index+'6'">
        <div class="title">{{ite.title}}</div>
        <div class="txt">{{ite.txt}}</div>
        <img :src="ite.bigimg" alt>
        <div class="data">
          <div class="smallbox" v-for="(ites,index) in ite.arr" :key="index+'7'">
            <img :src="ites.smallimg" alt>
            <div class="name">{{ites.name}}</div>
            <div class="price">{{ites.price}}</div>
          </div>
        </div>
        <div class="sees">{{ite.sees}}</div>
      </div>
      <!-- 最美日历 寒冬保暖 -->
      <div class="suprice" v-for="(items,index) in lists.detailed" :key="index+'8'">
        <div class="name">{{items.name}}</div>
        <div class="txt">{{items.txt}}</div>
        <div class="contents">
          <div class="smallbox" v-for="(it,index) in items.content" :key="index+'9'">
            <img :src="it.img" alt>
            <div class="jianjie">{{it.shuoming}}</div>
            <div class="price">
              <span>{{it.newprice}}</span>
              <span>{{it.oldprice}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 每一次亲密接触 -->
      <div class="appera" v-for="(ite,index) in lists.close" :key="index+'10'">
        <div class="title">{{ite.title}}</div>
        <div class="txt">{{ite.txt}}</div>
        <img :src="ite.bigimg" alt>
        <div class="data">
          <div class="smallbox" v-for="(ites,index) in ite.arr" :key="index+'11'">
            <img :src="ites.smallimg" alt>
            <div class="name">{{ites.name}}</div>
            <div class="price">{{ites.price}}</div>
          </div>
        </div>
        <div class="sees">{{ite.sees}}</div>
      </div>
      <!-- 产品  水具  家居... -->
      <div class="bigproduct" v-for="(iten,index) in lists.productes" :key="index+'12'">
        <div class="middlebox">
          <div class="name">{{iten.name}}</div>
          <div class="smallproduct">
            <dl v-for="(it,index) in iten.product" :key="index+'13'">
              <dt class="imgs">
                <img :src="it.img" alt>
              </dt>
              <dt class="texts">
                <div class="name1">{{it.name1}}</div>
                <div class="name2">{{it.name2}}</div>
                <div class="txt">{{it.txt}}</div>
                <div class="price">{{it.price}}</div>
              </dt>
            </dl>
          </div>
          <div class="mores">{{iten.sees}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swipers from "../components/swiper";
import { mapActions } from "vuex";
export default {
  name: "shop",
  data() {
    return {
      swiperImg: [],
      isOk: true,
      swiperData: [],
      AlertImgUrl: "",
      taobaoUrl: "",
      lists: {}, //页面数据,
       classgood:[],
      classGoodTop:[]
    };
  },
  components: {
    swipers
  },
  created() {
    this.pupopapi(this).then(res => {
      this.swiperImg = res;
    });
    this.IndexImg(this).then(res => {
      this.AlertImgUrl = res.imgUrl;
      this.taobaoUrl = res.url;
    });
    this.getList(this).then(res => {
      this.lists = res;
    });
    this.getNav(this).then(res=>{
      console.log(res.classGood)
      //  console.log(res.swipers)
      this.classGoodTop = res.classGood
      console.log(this.classGoodTop[index].name)
      // this.swiperstop=res.swipers
    })
    this.getTop(this).then(res=>{
      // console.log(res)
      this.classgood=res
    })
    //  this.classLi = this.classgood[0];
    //  console.log(this.classgood)
  },
  methods: {
    ...mapActions(["pupopapi", "IndexImg", "getList","getTop","getNav"]),
    close() {
      this.isOk = false;
    },
    open() {
      window.location.href = this.taobaoUrl;
    },
    // getclass(id){
    //   this.classid = id;

    // }
    getclass(data){
      this.$emit('sendData',data)
    }
  }
};
</script>

<style lang='less' scoped>
.shop {
  text-align: left;
  overflow: hidden;
  .box-t {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background: teal;
    overflow: hidden;
    // margin:.2rem 0;
    .search {
      width: 8rem;
      height: 0.8rem;
      background: rgb(243, 243, 243);
      color: rgb(153, 153, 153);
      margin: 0.2rem auto;
      font-size: 0.32rem;
      line-height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      img {
        width: 0.346667rem;
        height: 0.346667rem;
        display: inline-block;
        margin: 0 0.133333rem;
      }
    }
    .daohang {
      width: 100%;
      background: #fff;
      ul {
        padding: 0.133333rem 0.266667rem;
        display: flex;
        li {
          color: #333;
          font-size: 24px;
          flex: 1;
          float: left;
          font-size: 0.32rem;
          line-height: 53px;
          
          a {
            color: #333;
            display: inline-block;
            display: flex;
            align-items: center;
            /*垂直居中*/
            justify-content: center;
            /*水平居中*/
          }
          img {
            display: block;
            width: 0.666667rem;
            height: 0.666667rem;
            // margin: 0 auto;
            margin-top: 25%;
            
          }
        }
        li:nth-of-type(1) {
          font-size: 0.533333rem;
          border-bottom: 2px solid #000;
          font-weight: bold;
        }
      }
    }
  }
  .box {
    width: 9.5rem;
    background: #fff;
    height: 5.066667rem;
    margin:0 auto;
    margin-top: 2.846667rem;
  }
  .popupBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .alertBox {
      width: 80%;
      height: 13rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .closeBtn {
      background: #fff;
      border: 1px solid #fff;
      border-radius: 5px;
      height: 1.3rem;
      width: 2rem;
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.186667rem;
    }
  }
  .content {
    // 专题
    .special {
      width: 95%;
      height: 4.666667rem;
      // margin-top: 6rem;
      .name {
        font-size: 0.48rem;
        font-weight: bold;
        overflow: hidden;
        margin-left: 0.266667rem;
      }
      .special-bottom {
        //不滚动
        display: flex;
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        img {
          display: inline-block;
          width: 4rem;
          height: 4rem;
          margin-top: 0.133333rem;
          margin-left: 0.2rem;
        }
      }
    }
    .suprice {
      width: 95%;
      height: 6.666667rem;
      margin-top: 0.4rem;
      .name {
        font-size: 0.48rem;
        font-weight: bold;
        overflow: hidden;
        margin-left: 0.266667rem;
      }
      .txt {
        font-size: 0.4rem;
        color: #999999;
        margin-left: 0.266667rem;
        margin-top: 0.16rem;
      }
      .contents {
        width: 100%;
        height: 5.066667rem;
        margin-top: 0.4rem;
        display: flex;
        overflow-x: scroll;
        white-space: nowrap;
        .smallbox {
          width: 3.733333rem;
          height: 5.066667rem;
          margin-left: 0.266667rem;
          img {
            width: 3.76rem;
            height: 3.76rem;
          }
          .jianjie {
            font-size: 0.293333rem;
            margin-top: 0.186667rem;
            line-height: 1.5;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            width: 100%;
            height: 0.533333rem;
            span:nth-of-type(1) {
              font-size: 0.533333rem;
              color: #5781d0;
            }
            span:nth-of-type(2) {
              margin-left: 0.133333rem;
              margin-top: 0.133333rem;
              height: 0.266667rem;
              color: rgb(153, 153, 153);
              text-decoration: line-through;
              font-size: 0.266667rem;
            }
          }
        }
      }
    }
    //
    .fourpricter {
      width: 100%;
      height: 9.933333rem;
      margin-top: 0.266667rem;
      .small_picter {
        width: 95%;
        height: 100%;
        margin: 0 auto;
        img:nth-of-type(1) {
          width: 4.5rem;
          height: 5.493333rem;
          margin-left: 0.1rem;
          float: left;
        }
        img:nth-of-type(2) {
          width: 4.5rem;
          height: 4.266667rem;
          margin-left: 0.333333rem;
          float: left;
        }
        img:nth-of-type(3) {
          width: 4.5rem;
          height: 4.266667rem;
          margin-top: 1.3rem;
          margin-left: -4.4312rem;
          float: left;
        }
        img:nth-of-type(4) {
          width: 4.5rem;
          height: 5.493333rem;
          margin-top: 0.1rem;
          margin-left: 0.23rem;
          float: left;
        }
      }
    }
    .beloved {
      width: 100%;
      height: 2.066667rem;
      img {
        width: 95%;
        height: 2.026667rem;
        margin-left: 0.266667rem;
        margin-top: 0.32rem;
      }
    }
    .appera {
      width: 95%;
      height: 13.6rem;
      margin: 0 auto;
      margin-top: 1rem;
      .title {
        font-size: 0.48rem;
        font-weight: bold;
        overflow: hidden;
        margin-left: 0.266667rem;
      }
      .txt {
        font-size: 0.4rem;
        color: #999999;
        margin-left: 0.266667rem;
        margin-top: 0.3rem;
      }
      img {
        width: 95%;
        height: 4.773333rem;
        margin-left: 0.266667rem;
        margin-top: 0.3rem;
      }
      .data {
        display: flex;
        width: 95%;
        height: 5.066667rem;
        margin-left: 0.266667rem;
        margin-top: 0.3rem;
        overflow-x: scroll;
        white-space: nowrap;
        .smallbox {
          width: 3.76rem;
          height: 5.066667rem;
          margin-right: 0.2rem;
          img {
            width: 100%;
            height: 4rem;
            margin-left: 0;
            margin-top: 0;
          }
          .name {
            font-size: 0.293333rem;
            margin-top: 0.186667rem;
            line-height: 1.5;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            font-size: 0.373333rem;
            color: #5781d0;
            margin-top: 0.08rem;
          }
        }
      }
      .sees {
        width: 95%;
        height: 1.333333rem;
        line-height: 1.333333rem;
        margin-left: 0.266667rem;
        text-align: center;
        font-size: 0.373333rem;
        color: #999999;
        border-bottom: solid 0.013333rem;
        clear: both;
      }
    }
    .bigproduct {
      width: 100%;
      height: 28rem;
      .middlebox {
        width: 95%;
        height: 100%;
        margin: 0 auto;
        .name {
          font-size: 0.55rem;
          font-weight: bold;
          overflow: hidden;
          margin-left: 0.266667rem;
          width: 8rem;
          height: 0.666667rem;
        }
        .smallproduct {
          width: 100%;
          height: 24rem;
          margin-top: 0.5rem;
          overflow: hidden;
          dl {
            width: 4.333333rem;
            height: 7.5rem;
            float: left;
            margin-top: 0.4rem;
            .imgs {
              width: 100%;
              height: 4rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .texts {
              width: 100%;
              height: 3.253333rem;
              .name1 {
                line-height: 1.5;
                font-size: 0.32rem;
                margin-top: 0.266667rem;
                margin-left: 0.2rem;
                word-break: break-all;
                width: 3.466667rem;
                height: 0.386667rem;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .name2 {
                line-height: 1.5;
                font-size: 0.32rem;
                margin-top: 0.133333rem;
                margin-left: 0.2rem;
                word-break: break-all;
                width: 3.466667rem;
                height: 0.386667rem;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .txt {
                color: #999999;
                font-size: 0.24rem;
                padding-top: 0.133333rem;
                padding-left: 0.213333rem;
                line-height: 1.5;
                word-break: break-all;
                width: 3.466667rem;
                height: 0.773333rem;
              }
              .price {
                padding-left: 0.186667rem;
                float: left;
                margin-top: 0.666667rem;
                height: 0.32rem;
                color: #5881cf;
                font-size: 0.45rem;
                font-weight: bold;
              }
            }
          }
          dl:nth-of-type(2) {
            float: right;
          }
          dl:nth-of-type(4) {
            float: right;
          }
          dl:nth-of-type(6) {
            float: right;
          }
        }
        .mores {
          width: 8rem;
          line-height: 1.333333rem;
          margin-left: 0.266667rem;
          text-align: center;
          font-size: 0.45rem;
          color: #999999;
          border-bottom: solid 0.013333rem;
          clear: both;
        }
      }
    }
  }
  *::-webkit-scrollbar{
    display: none;
  }
}
</style>
