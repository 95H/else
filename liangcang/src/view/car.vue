<template>
  <div class="container">
    



    <div class="gwc">
      <p>购物车</p>
    </div>
    <div class="cart">
      <div class="cart-img">
        <img src="../assets/29910.png" alt>
      </div>
    </div>
    <p class="like">
      <span></span>
      <span>
        <img src="../assets/23442.png" alt>
      </span>
      <span></span>
    </p>
    <ul class="detai">
      <li v-for="item in listArr" :key="item">
        <a href="">
          <img :src="item.imgUrl" alt="">
        </a>

        <span>{{item.title}}</span>
        <span>{{item.miaoshu}}</span>
        <span>￥ {{item.price}}</span>
      </li>
    </ul>
    <div class="bode"></div>
    <div class="jiesuan">
      <div class="jiesuan-left">
        <input type='checkbox'/>
        <span>全部选中</span>
      </div>
      <div class="jiesuan-right">
        <div class="jiesuan-right-l">
          <span>合计：￥0.00</span><span>已节省：￥0.00</span>
        </div>
        <div class="jiesuan-right-r">
          <span>结 算</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
          listArr:[
            {
              imgUrl:"https://imgs-qn.iliangcang.com/ware/goods/icon/2/263/263562.jpg",
              title:"拾趣一刻茶器新春礼盒套 | 一家人一壶茶 共享暖心时刻",
              miaoshu:"哲品",
              sprice:"599.00"
            },
            {
              imgUrl:"https://imgs-qn.iliangcang.com/ware/goods/tmb/2/263/263561.jpg",
              title:"锡与金箔十二生肖酒杯-金色 | 储茶色味不变 盛酒淳厚清冽",
              miaoshu:"NOUSAKU能作",
              sprice:"480.00"
            },
            {
              imgUrl:"https://imgs-qn.iliangcang.com/ware/goods/tmb/2/263/263560.jpg",
              title:"限量款双色编织衬衫 | 高级的灰色随意搭配外套",
              miaoshu:"NOUSAKU能作",
              sprice:"720.00"
            },
            
            {
              imgUrl:"https://imgs-qn.iliangcang.com/ware/goods/icon/2/263/263559.jpg",
              title:"拾趣一刻茶器新春礼盒套 | 一家人一壶茶 共享暖心时刻",
              miaoshu:"NOUSAKU能作",
              sprice:"598.00"
            }
          ]
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  .gwc {
    width: 100%;
    height: 1.333333rem;
    background: #fff;
    font-size: 0.5rem;
    color: #000;
    line-height: 1.333333rem;
  }
  .cart {
    width: 100%;
    height: 8rem;
    background: #fafafa;
    position: relative;
    .cart-img {
      width: 3.153333rem;
      height: 2.546667rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .like {
    width: 9rem;
    padding: 0 0.5rem;
    margin:.5rem 0;
    span {
      display: inline-block;
      width: 34%;
      border: 1px solid #000;
    }
    span:nth-of-type(1) {
      float: left;
      margin-top: 0.666667rem;
    }
    span:nth-of-type(2) {
      border: none;
      width: 1.733333rem;
      height: 0.35rem;
      img {
        float: left;
        width: 100%;
        height: 100%;
      }
    }
    span:nth-of-type(3) {
      float: right;
      margin-top: 0.666667rem;
    }
  }
  .detai {
    width: 10rem;
    // height: auto;
    padding: 0 0.2rem;
    overflow: hidden;

    li {
      border: 1px solid #eee;
      font-size: 0.16rem;
      text-align: left;
      float: left;
      width: 4.5rem;
      // height: 8rem;
      margin: 0.15rem;
      a {
        display: block;
        width: 4.5rem;
        height: 4.5rem;
        background: #eee;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      span {
        padding: 0 0.133333rem;
        display: block;
        margin-top: 0.2rem;
      }
      span:nth-of-type(1) {
        margin-top: 0.266667rem;
        font-weight: bold;
      }
      span:nth-of-type(2) {
        color: rgba(0, 0, 0, 0.6);
      }
      span:nth-of-type(3) {
        color: #5881cf;
        padding-bottom: 0.2rem;
      }
    }
  }
  .bode{
    width: 100%;
    height: .6rem;
    margin-top: .266667rem;
    border:1px solid #aaa;
    background: #fafafa;
    border-left:none;
    border-right: none;
  }
  .jiesuan{
    font-size: .266667rem;
    width:90%;
    padding: 0 5%;
    height: 3rem;
    .jiesuan-left{
      width: 2rem;
      height: .6rem;
      float:left;
      margin-top: .4rem;
      font-weight: bold;
      font-size: .266667rem;
      input{
        width: .4rem;
        height: .4rem;
       float: left;
       margin-top: .066667rem;
       background: #fff;
      }
      span{
        float:right;
        display: block;
         font-size: .366667rem;
        line-height: .533333rem;
        padding-left: .133333rem;
      }
    }
    .jiesuan-right{
      float: right;
      width: 60%;
      .jiesuan-right-l{
        float: left;
        span{
          display: block;
          text-align: left;
        }
        span:nth-of-type(1){
          font-weight: bold;
          color: #000;
          font-size: .366667rem;
           margin-top: .2rem;
        }
        span:nth-of-type(2){
          color: #ccc;
          font-size: .266667rem;
          margin-top: .066667rem;
        }
      }
      .jiesuan-right-r{
        float: right;
        display: block;
        background: #000;
        padding: .333333rem .566667rem;
        color: #fff;
        margin-top: .166667rem;
      }
    }
  }
}
</style>

