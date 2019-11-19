<template>
  <div class="contract_box">
    <TitleBack titleName="我的合同"></TitleBack>
    <div class="my_contract_box" v-if="my_contract_list.length">
      <mt-loadmore 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        @bottom-status-change="handleBottomChange"
        :auto-fill="autoFill"
        ref="loadmore"
      >
        <ul ref="loadmoreUl">
          <li
            v-for="(item, index) in my_contract_list"
            :key="item.id"
            @click="item.isConclude === '去签订'?
            goSignClick(item.courseId):
            watchContract(item)"
          >
            <div class="my_contract_li">
              <h6>合同号：<span>{{item.my_contract_num}}</span></h6>
              <div class="class_name">
                <h5>课程名称：{{item.class_name}}</h5>
                <span 
                  class="conclude conclude_red" 
                  v-if="item.isConclude === '去签订'"
                >需签订</span>
                <span 
                  v-else-if="item.isConclude === '生效中'"
                  class="conclude conclude_blue" 
                >生效中</span>
                <span class="conclude" v-else>已失效</span>
              </div>
              <h4>￥{{item.contract_price}}</h4>
              <div class="validity_box">
                <h3>有效期：{{item.validity_date}}</h3>
                <div 
                  class="goSign" 
                  v-if="item.isConclude === '去签订'?true:false"
                >去签订</div>
              </div>
            </div>
            <div v-if="index !== conListLast" class="gray_box" ref="grayBox"></div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus === 'pull'">{{bottomPullText}}</span>
          <span v-show="bottomStatus === 'drop'">{{bottomDropText}}</span>
          <span 
            v-show="bottomStatus === 'loading'"
          >
              <mt-spinner 
                type="fading-circle" 
                class="loading_spinner"
                :size="30"
              ></mt-spinner>
          </span>
        </div>
        <div class="on_earth_box">
          <span v-show="on_earth" class="on_earth">已经到底啦~</span>
        </div>
      </mt-loadmore>
    </div>
    <div class="emptyData" v-show="isEmptyData">
      <div class="img_box">
        <img src="../../static/web/images/contract/empty_data.png">
        <span>数据为空</span>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBack from "~/components/titleTemp2/titleBack";
import axios from 'axios'
import { contractApi } from '~/api/index'
import { Toast, Loadmore, Spinner } from 'mint-ui';
import { zhugeTrack } from '~/plugins/filter'
export default {
  name: 'Contract',
  components: {
    TitleBack
  },
  data() {
    return {
      my_contract_list: [],
      sign: '',
      allLoaded: true,
      autoFill: false,//若为真，loadmore 会自动检测并撑满其容器
      currentpageNum: 1,
      limit: 10, //每页条数
      totalNum: null, //总数
      bottomStatus: '',
      bottomPullText: '上拉加载更多',
      bottomDropText: '释放更新',
      on_earth: false, //是否到底
      isEmptyData:false, //是否是空数据
      conListLast: null, //最后一个indexNum
    }
  },
  methods: {
    //上拉加载
    loadBottom() {
      setTimeout(() => {
        if (this.totalNum - this.currentpageNum * this.limit > 0) {
          this.on_earth = false;
          this.currentpageNum++;
          this._initState(this.currentpageNum, this.limit)
        } else {
            this.allLoaded = true;
            this.on_earth = true
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    watchContract(item) {
      zhugeTrack('H5_合同页_点击按钮', {
        '按钮名称': '查看合同'
      })
      if (item.isConclude === '已失效' && !item.my_contract_num) {
        Toast('该合同无法查看，因课程已退费且未签订合同');
        return
      } 
      this.$router.push(`/contractPage/watchContract/${item.my_contract_num}`)
    },
    goSignClick(num) {
      zhugeTrack('H5_合同页_点击按钮', {
        '按钮名称': '去签订'
      })
      sessionStorage.setItem('isPayPage', true)
      this.$router.push({
        path: `/contract`,
        query: {
          courseId: num
        }
      })
    },
    async _initState(pageNum, pageSize) {
      this.$indicator.open()
      await contractApi.getContractList({
        pageNum,
        pageSize,
        sign: localStorage.getItem('sign')
      })
      .then((re) => {
        this.$indicator.close()
        let result = re.data;
        if (result.status == 200) {
          this.totalNum = result.result.total
          //判断第一次是否可以加载
          if (this.totalNum - pageNum * pageSize > 0) {
            this.allLoaded = false
          }
          let clist = result.result.list
          if (!clist.length) {
            this.isEmptyData = true
          }
          clist.forEach((e, i) => {
            let newData = {}
            if (e.contractStatus == '2') {
              e.contractStatus = '生效中'
            } else if (e.contractStatus == '3') {
              e.contractStatus = '已失效'
            } else if (e.contractStatus == '1') {
              e.contractStatus = '去签订'
            }
            Object.assign(newData, {
              id: e.contractNo,
              stuCourseId: e.stuCourseId,
              my_contract_num: e.contractNo,
              class_name: e.courseName,
              isConclude: e.contractStatus,
              contract_price: e.amount,
              contractUrl: e.contractUrl,
              courseId: e.courseId,
              validity_date: `${e.effectiveDate?e.effectiveDate:''}——${e.endDate?e.endDate:''}`
            })
            this.my_contract_list.push(newData)
          })
          this.conListLast = this.my_contract_list.length - 1
        } else if (result.status == 401) {
          this.$router.push('/loginRegister/login')
        }
      })
      .catch((e) => {
        Toast('网络异常');
      })
    }
  },
  created () {
    this._initState(this.currentpageNum, this.limit)
  },
  mounted () {
    zhugeTrack('H5_进入我的合同页');
  }
}
</script>

<style lang="less" scoped>
@import "../../static/css/variable.less";
.contract_box{
  padding-top: unit(100/@u, @uu);
  width: 100%;
  height: 100vh;
  .my_contract_box{
    ul{
      li{
        background: #fff;
        .my_contract_li{
          padding: unit(30/@u, @uu);
          h6{
            font-size: unit(24/@u, @uu);
            color: #999;
          }
          .class_name{
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            h5{
              font-size: unit(30/@u, @uu);
              color: #333;
              width: 86%;
            }
            .conclude{
              font-size: unit(24/@u, @uu);
              color: #999;
              line-height: 18px;
            }
            .conclude_red{
              color: #FF5346;
            }
            .conclude_blue{
              color: #38ADFF;
            }
          }
          h4{
            font-size: unit(30/@u, @uu);
            color: #333;
            margin-top: unit(20/@u, @uu);
          }
          .validity_box{
            margin-top: unit(72/@u, @uu);
            display: flex;
            justify-content: space-between;
            h3{
              font-size: unit(24/@u, @uu);
              color: #999;
              line-height: unit(40/@u, @uu);
            }
            .goSign{
              width: unit(136/@u, @uu);
              height: unit(40/@u, @uu);
              background: #38ADFF;
              color: #fff;
              font-size: unit(24/@u, @uu);
              text-align: center;
              line-height: unit(40/@u, @uu);
              border-radius: unit(40/@u, @uu);
            }
          }
        }
        .gray_box{
          width: 100%;
          height: unit(20/@u, @uu);
          background: #f5f5f5;
        }
      }
    }
  }
  .emptyData{
    background: #fff;
    width: 100%;
    height: 100vh - unit(120/@u, @uu);
    .img_box{
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: unit(-150/@u, @uu);
      margin-top: unit(-202/@u, @uu);
      width: unit(300/@u, @uu);
      height: unit(404/@u, @uu);
      img{
        display: inline-block;
        width: unit(199/@u, @uu);
        height: unit(187/@u, @uu);
        margin-left: unit(50/@u, @uu);
      }
      span{
        display: block;
        font-size: unit(33/@u, @uu);
        color: #333;
        margin-top: unit(30/@u, @uu);
      }
    }    
  }
}
.contract_box /deep/ .mint-loadmore-bottom{
  span{
    line-height: unit(100/@u, @uu);
  }
  .loading_spinner{
    display: block;
    margin-left:unit(340/@u, @uu);
  }
}
.contract_box /deep/ .on_earth_box{
    text-align: center;
    margin-top: unit(50/@u, @uu);
    .on_earth{
      font-size: unit(24/@u, @uu);
      color: #999;
    }
  }
</style>


