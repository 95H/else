<template>
  <div class="pages">
    <div class="pages-left">
      <ul>
        <li v-for="item in classList" @click="getclass(item.id)" :key="item" :class="[item.id == listid?classA:classB]">
          <span >{{item.titles}}</span>
        </li>
      </ul>
    </div>
    <div class="pages-right">
      <div class="pages-right-top">
        <img :src="classLi.imgUrl" alt>
      </div>
      <p class="pages-right-cen">
        <span></span>
        <span>• {{classLi.name}} •</span>
        <span></span>
      </p>
      <ul class="pages-right-bottom">
        <li v-for="item in classLi.listArr" :key="item +'1'">
          <a href>
            <img :src="item.url" alt>
          </a>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "pages",
  data() {
    return {
      classA: "boldfont",
      classB: "",
      listid: 0,
      classList: [
        { titles: "家居", id: 0 },
        { titles: "文具", id: 1 },
        { titles: "数码", id: 2 },
        { titles: "玩乐", id: 3 },
        { titles: "餐厨", id: 4 },
        { titles: "美食", id: 5 },
        { titles: "服装", id: 6 },
        { titles: "鞋包", id: 7 },
        { titles: "配饰", id: 8 },
        { titles: "美护", id: 9 },
        { titles: "出行", id: 10 },
        { titles: "图书", id: 11 },
        { titles: "艺术", id: 12 },
        { titles: "水具", id: 13 },
        { titles: "运动", id: 14 },
        { titles: "情趣", id: 15 }
      ],
      ClassContent: [
        {
          name: "家居分类",
          imgUrl:
            "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29359.png",
          listArr: [
            {
              title: "家具",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29422.png"
            },
            {
              title: "居家日用",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29425.png"
            },
            {
              title: "装饰摆件",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29429.png"
            },
            {
              title: "香蒸气氛",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29427.png"
            },
            {
              title: "空气净化",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29426.png"
            },
            {
              title: "收纳整理",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30408.png"
            },
            {
              title: "床品布艺",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29419.png"
            },
            {
              title: "家庭清洁",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29423.png"
            },
            {
              title: "儿童家居",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29421.png"
            },
            {
              title: "灯具",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29420.png"
            },
            {
              title: "家用电器",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29424.png"
            },
            {
              title: "植物花器",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29428.png"
            }
          ]
        },
        {
          name: "文具分类",
          imgUrl:
            "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29365.png",
          listArr: [
            {
              title: "办公用品",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29450.png"
            },
            {
              title: "纸本",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29455.png"
            },
            {
              title: "笔具",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29451.png"
            },
            {
              title: "书签",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29453.png"
            },
            {
              title: "红包",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29452.png"
            },
            {
              title: "台历挂历",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29454.png"
            }
          ]
        },
        {
          name: "数码分类",
          imgUrl:
            "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29362.png",
          listArr: [
            {
              title: "耳机",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29468.png"
            },
            {
              title: "音箱",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29473.png"
            },
            {
              title: "手机壳",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29469.png"
            },
            {
              title: "手机配件",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29470.png"
            },
            {
              title: "移动电源",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29472.png"
            },
            {
              title: "智能设备",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29474.png"
            },
            {
              title: "电脑配件",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29467.png"
            },
            {
              title: "车载配件",
              url:
                "https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29466.png"
            }
          ]
        },
        {
          name:"玩乐分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30330.png",
          listArr:[
            {
              title:"玩具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29457.png"
            },
            {
              title:"玩偶",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29458.png"
            },
            {
              title:"益智棋牌",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29459.png"
            }
          ]
        },
        {
          name:"餐厨分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30331.png",
          listArr:[
            {
              title:"厨房清洁",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29513.png"
            },
            {
              title:"厨用电器",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29515.png"
            },
            {
              title:"锅",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29516.png"
            }
          ]
        },
        {
          name:"美食分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30329.png",
          listArr:[
            {
              title:"美酒",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29433.png"
            },
            {
              title:"零食",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29435.png"
            },
            {
              title:"巧克力",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29436.png"
            },
             {
              title:"咖啡",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29434.png"
            },
            {
              title:"茶",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29430.png"
            },
            {
              title:"健康养生",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29432.png"
            },
            {
              title:"地方特产",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29431.png"
            }

          ]
        },
        {
          name:"服装分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29358.png",
          listArr:[
            {
              title:"女装",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29503.png"
            },
            {
              title:"内衣",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29502.png"
            },
            {
              title:"男装",
              url:"https://www.iliangcang.com/i/mob_goodslist/?act=category_goodslist&cat_id=01120257"
            },
             {
              title:"家居服",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29500.png"
            },
            {
              title:"运动服",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29505.png"
            },
            {
              title:"童装",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29504.png"
            }
          ]
        },
        {
          name:"鞋包分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29366.png",
          listArr:[
            {
              title:"男鞋",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29444.png"
            },
            {
              title:"女鞋",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29445.png"
            },
            {
              title:"双肩包",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29449.png"
            },
            {
              title:"单肩包",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29442.png"
            },
            {
              title:"钱包",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29446.png"
            },
            {
              title:"手提包",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29448.png"
            },
            {
              title:"手拿包",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29447.png"
            },
            {
              title:"帆布袋",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29443.png"
            }
          ]
        },
        {
          name:"配饰分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29361.png",
          listArr:[
            {
              title:"项链",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29476.png"
            },
            {
              title:"戒指",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29476.png"
            },
            {
              title:"耳饰",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29475.png"
            },
            {
              title:"手链手镯",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29480.png"
            },
            {
              title:"手表",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29479.png"
            },
            {
              title:"眼镜",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29484.png"
            },
            {
              title:"丝巾围巾",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29482.png"
            },
            {
              title:"袜子",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29481.png"
            }
          ]
        },
        {
          name:"美护分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29360.png",
          listArr:[
            {
              title:"洗发护发",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29496.png"
            },
            {
              title:"身体护理",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29493.png"
            },
            {
              title:"香水精油",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29497.png"
            },
             {
              title:"唇部护理",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29485.png"
            },
            {
              title:"手工皂",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29494.png"
            },
            {
              title:"指甲油",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29499.png"
            },
             {
              title:"男士护肤",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29492.png"
            },
            {
              title:"防晒霜",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29486.png"
            },
            {
              title:"母婴专用",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29498.png"
            },
             {
              title:"美容工具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29490.png"
            },
            {
              title:"面部护理",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29491.png"
            },
            {
              title:"手足护理",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29495.png"
            },
             {
              title:"化妆品",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29487.png"
            },
            {
              title:"口腔清洁",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29489.png"
            },
            {
              title:"洁面",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29488.png"
            }
          ]
        },
        {
          name:"出行分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29357.png",
          listArr:[
            {
              title:"户外装备",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29508.png"
            },
            {
              title:"旅行收纳",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29510.png"
            },
            {
              title:"行李箱",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29507.png"
            },
             {
              title:"雨具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29511.png"
            },
            {
              title:"出行工具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29506.png"
            }
          ]
        },
        {
          name:"图书分类",
          imgUrl:"",
          listArr:[
            {
              title:"文学社科",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29464.png"
            },
            {
              title:"建筑艺术",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29462.png"
            },
            {
              title:"生活方式",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29463.png"
            },
            {
              title:"杂志期刊",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29465.png"
            },
            {
              title:"儿童读物",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29461.png"
            }
          ]
        },
        {
          name:"艺术分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29367.png",
          listArr:[
            {
              title:"装饰画",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29441.png"
            },
            {
              title:"雕塑",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29437.png"
            },
            {
              title:"摄影",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29438.png"
            },
            {
              title:"文化创意",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29439.png"
            }
          ]
        },
        {
          name:"水具分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30294.png",
          listArr:[
            {
              title:"水杯",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30017.png"
            },
            {
              title:"水壶",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30018.png"
            },
            {
              title:"保温杯",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30019.png"
            },
             {
              title:"茶具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30016.png"
            },
            {
              title:"咖啡器具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30020.png"
            },
            {
              title:"马克杯",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30015.png"
            },
             {
              title:"随行杯",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30013.png"
            },
            {
              title:"酒具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30014.png"
            }
          ]
        },
        {
          name:"运动分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30017.png",
          listArr:[
            {
              title:"运动装备",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30032.png"
            },
            {
              title:"运动服饰",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30034.png"
            },
            {
              title:"运动器材",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30033.png"
            },
            {
              title:"健康轻食",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29432.png"
            }
          ]
        },
        {
          name:"情趣分类",
          imgUrl:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30295.png",
          listArr:[
            {
              title:"情趣游戏",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30022.png"
            },
            {
              title:"情趣器具",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30023.png"
            },
            {
              title:"润滑",
              url:"https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30024.png"
            }
          ]
        }
      ],
      classLi: {}
    };
  },
  created() {
    this.classLi = this.ClassContent[0];
  },
  methods: {
    getclass(id) {
      this.listid = id;
      this.classLi = this.ClassContent[id];
    }
  }
};
</script>
<style lang='less' scoped>
.pages {
  width: 100%;
  height: 100%;
  .pages-left {
    float: left;
    width: 2.666667rem;
    height: 100%;
    // height: calc(17.786667rem - 1.5rem);
    background: rgb(218, 218, 218);
    overflow-y: scroll;
    margin-bottom:1.333333rem;
    ul {
      width: 100%;
      height: 100%;
      li {
        text-align: center;
        font-size: 0.266667rem;
        span {
          line-height: 1.466667rem;
          display: inline-block;
        }
      }
      .boldfont {
        span {
          font-weight: bold;
        }
      }
    }
  }
  // .pages-left :hover {
  //   font-weight: bold;
  // }
  .pages-right {
    height: 100%;
    float: right;
    width: 7.33rem;
    // height: calc(17.786667rem - 1.5rem);
    background: #eee;
    overflow-y: scroll;
    .pages-right-top {
      width: 6.5rem;
      padding: 0.066667rem;
      margin: 0.2rem auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pages-right-cen {
      font-size: 0.293333rem;
      margin-bottom: 0.3rem;
      span {
        display: inline-block;
      }
    }
    .pages-right-bottom {
      width: 100%;
      height: 100%;

      overflow: hidden;
      li {
        float: left;
        width: 2rem;
        height: 3rem;
        margin: 0.2rem;
        a {
          color: #000;
          display: block;
          width: 2rem;
          height: 2rem;
          img {
            width: 100%;
            height: 100%;
            display: block;
            border: 1px solid #ffffff;
          }
        }
        span {
          display: block;
          font-size: 0.16rem;
          line-height: 1rem;
        }
      }
    }
  }
  .pages-left::-webkit-scrollbar {
    display: none;
  }
  .pages-right::-webkit-scrollbar {
    display: none;
  }
}
</style>
