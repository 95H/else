<template>
	<div class=" orderPage">
		<titleBack titleName="我的订单" isShowRight="isHide"></titleBack>
		<div class="orderlistWarp containerOnlyHeader">
			<mt-navbar v-model="selected" class="orderState">
			    <mt-tab-item id="0" @click.native="orderZhuge('待支付')">待支付</mt-tab-item>
			    <mt-tab-item id="1" @click.native="orderZhuge('已完成')">已完成</mt-tab-item>
			    <mt-tab-item id="-1" @click.native="orderZhuge('已失效')">已关闭</mt-tab-item>
			</mt-navbar>
      <no-ssr>
      <mt-tab-container v-model="selected" ref="mtTabContainer">
          <mt-tab-container-item id="0">
            <mt-loadmore v-if="this.upPayOrderLists.items.length!=0 && this.upPayOrderLists.items"
                         :bottomMethod="loadBottom"
                         :bottom-all-loaded="allLoaded"
                         :autoFill="isFull"
                         @bottom-status-change="handleTopChange"
                         :class="{classTop:classTop}"
                         ref="loadmore">
              <div class="orderContent" v-for="(item, orderIndex) in this.upPayOrderLists.items" :key="orderIndex">
                <h3 class="orderTitle bdB">{{item.create_time|changTimer}}<span>订单号：</span>{{item.order_no}}</h3>
                <div class="courseInfo bdB" v-for="(itemDetail, index) in item.orderDetail" :key="index">
                  <div class="courseImg">
                    <img v-lazy="itemDetail.smallimg_path" />
                  </div>
                  <div class="courseTitle">
                    <p class="title">{{itemDetail.grade_name}}</p>
                   <!-- <p class="expiress">(课程有效期至{{item.expires,'-'|changTimer}})</p>-->
                    <div class="priceInfo">
                      <div class="info-price">￥{{itemDetail.price,2|toFixed}}</div>
                    </div>
                  </div>
                </div>
                <div class="allPrice bdB">
                  <div class="info-detail" @click.stop="viewDetail($event, 0, orderIndex, item)">查看明细</div>
                  <Tip :tipPosition="tipPosition[0]" :ref="'tip' + '-0-' + orderIndex"></Tip>
                  <span>已付金额：￥{{item.paid_amount,2|toFixed}}</span>
                </div>
                <div class="payBtnWarp">
                  <span class="cancel" @click="cancelOrder('H5_点击取消订单',item)" v-if="item.pay_status==0">取消订单</span>
                  <button class="toPay">
                    <a href="javascript:;" @click="toPay('H5_我的订单-点击去支付',item)">去支付</a>
                  </button>
                </div>
              </div>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">{{loadingText}}</span>
                <span v-if="bottomStatus === 'loading'">加载中...</span>
              </div>
            </mt-loadmore>
            <div class="orderContent" v-else>
              <emptyTemp></emptyTemp>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <mt-loadmore v-if="this.doneOrderLists.items.length!=0 && this.doneOrderLists.items"
                         :bottom-all-loaded="allLoaded2"
                         :autoFill="isFull2"
                         :bottomMethod="loadBottom2"
                         @bottom-status-change="handleTopChange2"
                         :class="{classTop:classTop2}"
                         ref="loadmore2">
              <div class="orderContent" v-for="(item, orderIndex) in this.doneOrderLists.items" :key="orderIndex">
                <h3 class="orderTitle bdB">{{item.create_time|changTimer}}<span>订单号：</span>{{item.order_no}}</h3>
                <div class="courseInfo bdB" v-for="(itemDetail,index) in item.orderDetail" :key="index">
                  <div class="courseImg">
                    <img v-lazy="itemDetail.smallimg_path" />
                  </div>
                  <div class="courseTitle">
                    <p class="title">{{itemDetail.grade_name}}</p>
                    <!--<p class="expiress">(课程有效期至{{item.expires,'-'|changTimer}})</p>-->
                    <div class="priceInfo">
                      <div class="info-price">￥{{itemDetail.price,2|toFixed}}</div>
                    </div>
                  </div>
                </div>
                <div class="allPrice bdB">
                  <div class="info-detail" @click.stop="viewDetail($event, 1, orderIndex, item)">查看明细</div>
                  <Tip :tipPosition="tipPosition[1]" :ref="'tip' + '-1-' + orderIndex"></Tip>
                  <span>已付金额：￥{{item.paid_amount,2|toFixed}}</span>
                </div>
                <div class="payBtnWarp">
                  <span class="">已完成</span>
                  <!--  <button class="toPay">去支付</button>-->
                </div>
              </div>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus2 !== 'loading'" :class="{ 'rotate': bottomStatus2 === 'drop' }">{{loadingText2}}</span>
                <span v-if="bottomStatus2 === 'loading'">加载中...</span>
              </div>
            </mt-loadmore>
            <div class="orderContent" v-else>
                <emptyTemp></emptyTemp>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="-1">
            <mt-loadmore v-if="this.invalidOrderLists.items.length!=0 &&this.invalidOrderLists.items"
                         :bottomMethod="loadBottom3"
                         :bottom-all-loaded="allLoaded3"
                         :autoFill="isFull3"
                         @bottom-status-change="handleTopChange3"
                         :class="{classTop:classTop3}"
                         ref="loadmore3">
              <div class="orderContent" v-for="(item, orderIndex) in this.invalidOrderLists.items" :key="orderIndex">
                <h3 class="orderTitle bdB">{{item.create_time|changTimer}}<span>订单号：</span>{{item.order_no}}</h3>
                <div class="courseInfo bdB" v-for="(itemDetail,index) in item.orderDetail" :key="index">
                  <div class="courseImg">
                    <img v-lazy="itemDetail.smallimg_path" />
                  </div>
                  <div class="courseTitle">
                    <p class="title">{{itemDetail.grade_name}}</p>
                    <!--<p class="expiress">(课程有效期至{{item.expires,'-'|changTimer}})</p>-->
                    <div class="priceInfo">
                      <div class="info-price">￥{{itemDetail.price,2|toFixed}}</div>    
                    </div>
                  </div>
                </div>
                <div class="allPrice bdB">
                  <div class="info-detail" @click.stop="viewDetail($event, 2, orderIndex, item)">查看明细</div>
                  <Tip :tipPosition="tipPosition[2]" :ref="'tip' + '-2-' + orderIndex"></Tip>
                  <span>已付金额：￥{{item.paid_amount,2|toFixed}}</span>
                </div>
                <div class="payBtnWarp">
                  <span class="cancel" v-if="item.pay_status==-1">已退费</span>
                  <span class="cancel" v-if="item.pay_status==0">未支付</span>
                  <button class="toPay" v-if="item.orderDetail.length==1"><a href="javascript:;" @click="upPayzhuge('H5_我的订单-点击重新购买',item,'/payment/?courseId=' + item.orderDetail[0].id)">重新购买</a></button>
                  <button class="toPay noToPay" v-else>重新购买</button>
                </div>
              </div>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus3 !== 'loading'" :class="{ 'rotate': bottomStatus3 === 'drop' }">{{loadingText3}}</span>
                <span v-if="bottomStatus3 === 'loading'">加载中...</span>
              </div>
            </mt-loadmore>
            <div class="orderContent" v-else>
              <emptyTemp></emptyTemp>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </no-ssr>
    </div>
	</div>
</template>
<style lang="less">
	@import "order.less";
	.orderlistWarp{
    margin-top: unit(20/@u,@uu);
    .mint-tab-item{
      display:inline-block;
      flex:none;
    }
    .mint-navbar{
      justify-content: space-around;
    }
    .mint-tab-container{
        height:100%;
        overflow:inherit;
    }
		.orderState{
			background: #FFFFFF;
			.mint-tab-item{
				padding:unit(34/@u,@uu) 0;
        width:unit(140/@u,@uu);
				.mint-tab-item-label{
					font-size:unit(32/@u,@uu) ;
				}
			}
		}
	}
</style>
<script>
import {appBaseUrl,fetch,noTarget} from '~/api/apiurl'
import { Toast,MessageBox,Loadmore,Indicator} from 'mint-ui';
import {mapMutations,mapState} from 'vuex';
import {getCookie,zhugeTrack} from '~/plugins/filter'
import axios from 'axios'
import { orderApi } from '~/api/index'
import Tip from '~/components/order/Tip'

export default {
  name:'order',
  components: {
    Tip
  },
  data() {
    return {
      zhugeTrack:zhugeTrack,
      selected:"0",
      orderData1:{
        orderStatus:0,
        pageNumber:1,
        pageSize:20
      },
      orderData2:{
        orderStatus:1,
        pageNumber:1,
        pageSize:20
      },
      orderData3:{
        orderStatus:-1,
        pageNumber:1,
        pageSize:20
      },
      user_id:'',
      sign:'',
      allLoaded:false, //控制是否加载完成
      isFull:false,
      classTop:false, //解决list被加载中样式顶置问题
      bottomStatus:'',//加载中状态值
      loadingText:'',
      allLoaded2:false, //控制是否加载完成
      isFull2:false,
      classTop2:false, //解决list被加载中样式顶置问题
      bottomStatus2:'',//加载中状态值
      loadingText2:'',
      allLoaded3:false, //控制是否加载完成
      isFull3:false,
      classTop3:false, //解决list被加载中样式顶置问题
      bottomStatus3:'',//加载中状态值
      loadingText3:'',
      tipPosition: [ {}, {}, {} ],
      orderDetailCache: {}
    }
  },
  fetch ({req,store,route,redirect}) {
    var cookieValue="";
    var cookieList=[];
    var signId='';
    if(process.server&&req){
      cookieValue=req.headers.cookie;
      if (cookieValue) {
        var new_cookie=cookieValue.replace(/=/g,':').split(';');
        for(var i=0;i<new_cookie.length;i++){
          cookieList.push(new_cookie[i].split(':'));
        }
        for(var j=0;j<cookieList.length;j++){
          if(cookieList[j][0].indexOf('sign')!=-1){
            signId=cookieList[j][1]
          }
        }
      }
    } else if(process.client){
      console.log('sign')
      signId=getCookie('sign');
    }
    function getData(type){
      return axios({
        url:appBaseUrl+"/bxg/order/getMyOrder",
        method:'post',
        params:{
          orderStatus:type,
          pageNumber:1,
          pageSize:20,
          sign:signId
        },
        headers:{'cookie': cookieValue?cookieValue:''}
      })
    }
    function getUnpayOrderLists(){
      return getData(0)
    };
    function getDoneOrderLists(){
      return getData(1)
    }
    function getInvalidOrderLists(){
      return getData(-1)
    }
    
    return axios.all([getUnpayOrderLists(),getDoneOrderLists(),getInvalidOrderLists()]).then((res)=>{
      console.log(res[0].data)
      if(res[0].data.success){
        store.commit('getLoginState',true)//登陆状态
        store.commit('getupPayOrderLists',res[0].data)//未支付
        store.commit('getdoneOrderLists',res[1].data)//已完成
        store.commit('getinvalidOrderLists',res[2].data)//无效
      }else{
        if(res[0].data.errorMessage=='1001'){//未登录
          redirect('/loginRegister/phoneLogin')
          // store.commit('getLoginState',false)
          // store.commit('getupPayOrderLists', { resultObject: { items: [] }})//未支付
          // store.commit('getdoneOrderLists', { resultObject: { items: [] }})//已完成
          // store.commit('getinvalidOrderLists', { resultObject: { items: [] }})//无效
        }
      }
    }).catch((res) =>{
      console.log(res[0])
    })
  },

  beforeMount(){
    if(!this.loginState || !getCookie('sign') || !localStorage.getItem('sign')){
      window.location='/loginRegister/phoneLogin';
      window.localStorage.setItem('redirectUrl',window.location.href);
    }

    // 
    this.orderDetailCache = {}
    this.activeTip = null
    this.clickTipHandler = () => {
      if (this.activeTip) {
        this.activeTip.hide()
        this.activeTip = null
      }
    }
    document.addEventListener('click', this.clickTipHandler, false)
  },
  mounted(){
    zhugeTrack('H5_进入我的订单页');
    this.sign=localStorage.getItem('sign');
    this.user_id=localStorage.getItem('userId');
    this.getUnpayOrderLists();
    if(this.upPayOrderLists.totalCount<this.orderData1.pageSize){
        this.loadingText=''
      }else{
        this.loadingText='上拉加载更多'
      }
      if(this.doneOrderLists.totalCount<this.orderData2.pageSize){
        this.loadingText2=''
      }else{
        this.loadingText2='上拉加载更多'
      }
      if(this.invalidOrderLists.totalCount<this.orderData3.pageSize){
        this.loadingText3=''
      }else{
        this.loadingText3='上拉加载更多'
      }
  },
  computed:{
    ...mapState({
      upPayOrderLists:function(state){
        return state.orderState.orderLists.upPayOrderLists
      },
      doneOrderLists:function(state){
        return state.orderState.orderLists.doneOrderLists
      },
      invalidOrderLists:function(state){
        return state.orderState.orderLists.invalidOrderLists
      },
      loginState:function(state){
        return state.loginModules.loginState
      }
    })
  },
  methods:{
    ...mapMutations(['getupPayOrderLists','getLoginState','getinvalidOrderLists','getdoneOrderLists']),
    orderZhuge:function(tabname){
      zhugeTrack('H5_我的订单-点击分类',{'分类名称':tabname});
      if(tabname=='待支付'){
        this.getUnpayOrderLists();
      }else if(tabname=='已完成'){
        this.getDoneOrderLists();
      }else if(tabname=='已失效'){
        this.getInvalidOrderLists();
      }
    },
    toPay:function(clickname,obj){
      var orderUpData = {
        orderId: '', //	订单ID
        orderNo: '', //	订单号
        payType: 0, //支付类型 0:微信 1:支付宝 2:网银
        payTerminal: 3, //支付终端，0官网，1微信，2App，3移动web
        sign: localStorage.getItem("sign")
      };
      if(obj.orderDetail){
        obj.orderDetail.forEach(function(val){
          orderUpData.orderId=val.id;
          orderUpData.orderNo=val.order_no;
          zhugeTrack(clickname,{
            "课程类型":val.course_type==0?"就业课":"微课",
            "课程id":val.id,
            "课程名称":val.grade_name,
            "应付金额":obj.actual_pay,
            "学科":val.menu_id,
            "订单日期":obj.create_time,
            "订单号":val.order_no
          });
        })
      }
      axios({
        url:noTarget+'/bxg/order/topay',
        method:'POST',
        data:orderUpData,
        transformRequest:[function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then(res=>{
        if(res.data.success){
          window.location.href=res.data.resultObject.payment_url;
        }else if(res.data.errorMessage == 1001){
          window.localStorage.setItem('redirectUrl', window.location.href);
          window.location.href = "/loginRegister/phoneLogin";
        }else{
          this.$toast(res.data.errorMessage);
        }
      }).catch(err=>{});
    },
    upPayzhuge:function(clickname,obj,skipurl){
      if(obj.orderDetail){
        obj.orderDetail.forEach(function(val){
          zhugeTrack(clickname,{
            "课程类型":val.course_type==0?"就业课":"微课",
            "课程id":val.id,
            "课程名称":val.grade_name,
            "应付金额":obj.actual_pay,
            "学科":val.menu_id,
            "订单日期":obj.create_time,
            "订单号":val.order_no
          },skipurl);
        })
      }
    },
    getUnpayOrderLists:function(){
      Indicator.open();
      axios({
        url:appBaseUrl+'/bxg/order/getMyOrder',
        method:'POST',
        params:{
          user_id:this.user_id,
          orderStatus:this.orderData1.orderStatus,
          pageNumber:1,
          pageSize:this.orderData1.pageSize,
          sign:this.sign
        }
      }).then((res) => {
        Indicator.close();
        if(res.data.success){
          this.$store.commit('getupPayOrderLists',res.data)
          //this.orderLists.upPayOrderLists.items=res.data.resultObject.items;
          //this.orderLists.upPayOrderLists.totalCount=res.data.resultObject.totalCount;
          if(res.data.resultObject.items.length==0){
            this.loadingText='';
          }
        }else{
          if(res.data.errorMessage=="1001"){
            window.location='/loginRegister/phoneLogin';
            window.localStorage.setItem('redirectUrl',window.location.href);
          }else{
            Toast(res.data.errorMessage)
          }
        }
      })
    },
    getDoneOrderLists:function(){
      Indicator.open();
      axios({
        url:appBaseUrl+'/bxg/order/getMyOrder',
        method:'POST',
        params:{
          user_id:this.user_id,
          orderStatus:this.orderData2.orderStatus,
          pageNumber:1,
          pageSize:this.orderData2.pageSize,
          sign:this.sign
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then((res) => {
          Indicator.close();
        if(res.data.success){
          this.$store.commit('getdoneOrderLists',res.data)
          if(res.data.resultObject.items.length==0){
            this.loadingText='';
          }
        }else{
            if(res.data.errorMessage=="1001"){
            window.location='/loginRegister/phoneLogin';
            window.localStorage.setItem('redirectUrl',window.location.href);
          }else{
            Toast(res.data.errorMessage)
          }
        }
      })
    },
    getInvalidOrderLists:function(){
      Indicator.open();
      axios({
        url:appBaseUrl+'/bxg/order/getMyOrder',
        method:'POST',
        params:{
          user_id:this.user_id,
          orderStatus:this.orderData3.orderStatus,
          pageNumber:1,
          pageSize:this.orderData3.pageSize,
          sign:this.sign
        }
      }).then((res) => {
        Indicator.close();
        if(res.data.success){
            this.$store.commit('getinvalidOrderLists',res.data)
          if(res.data.resultObject.items.length==0){
            this.loadingText='';
          }
        }else{
          if(res.data.errorMessage=="1001"){
            window.location='/loginRegister/phoneLogin';
            window.localStorage.setItem('redirectUrl',window.location.href);
          }else{
            Toast(res.data.errorMessage)
          }
        }
      })
    },
    cancelOrder:function(clickname,obj,skipurl){
      this.upPayzhuge(clickname,obj,skipurl);
      Indicator.open();
      axios({
        url:appBaseUrl+'/bxg/order/updateOrderStatus',
        method:'POST',
        params:{
          user_id:this.user_id,
          type:1,//取消订单
          orderNo:obj.order_no,//订单号
          sign:this.sign
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then((res) => {
        if(res.data.success){
          Indicator.close();
          Toast(res.data.resultObject);
          this.getUnpayOrderLists();
          this.getInvalidOrderLists();
        }else{
          Indicator.close();
          if(res.data.errorMessage=="1001"){
            window.location='/loginRegister/phoneLogin';
            window.localStorage.setItem('redirectUrl',window.location.href);
          }else{
            Toast(res.data.errorMessage);
          }
        }
      })
    },
    loadBottom(){
      if(this.upPayOrderLists.items.length!=0){
        this.classTop=true;
        if(this.orderData1.pageSize>=this.upPayOrderLists.totalCount){
          this.orderData1.pageSize=this.upPayOrderLists.totalCount;
        }else{
          this.orderData1.pageSize+=10;
        }
        this.getUnpayOrderLists();
        if(this.orderData1.pageSize>=this.upPayOrderLists.totalCount){
          this.allLoaded=true;
          this.classTop=false;
          this.$refs.loadmore.onBottomLoaded();
          this.loadingText=""
        }
      }
    },
    handleTopChange(status) {
      this.bottomStatus = status;
    },
    loadBottom2(){
      if(this.doneOrderLists.items.length!=0){
        this.classTop2=true;
        if(this.orderData2.pageSize>=this.doneOrderLists.totalCount){
          this.orderData2.pageSize=this.doneOrderLists.totalCount;
        }else{
          this.orderData2.pageSize+=10;
        }
        this.getDoneOrderLists();
        if(this.orderData2.pageSize>=this.doneOrderLists.totalCount){
          this.allLoaded2=true;
          this.classTop2=false;
          this.$refs.loadmore2.onBottomLoaded();
          this.loadingText2=""
        }
      }
    },
    handleTopChange2(status) {
      this.bottomStatus2 = status;
    },
    loadBottom3(){
      if(this.invalidOrderLists.items.length!=0){
        this.classTop3=true;
        if(this.orderData3.pageSize>=this.invalidOrderLists.totalCount){
          this.orderData3.pageSize=this.invalidOrderLists.totalCount;
        }else{
          this.orderData3.pageSize+=10;
        }
        this.getInvalidOrderLists();
        if(this.orderData3.pageSize>=this.invalidOrderLists.totalCount){
          this.allLoaded3=true;
          this.classTop3=false;
          this.$refs.loadmore3.onBottomLoaded();
          this.loadingText3=""
        }
      }
    },
    handleTopChange3(status) {
      this.bottomStatus3 = status;
    },

    /**
     * 查看详情点击方法
     * 
     * @praam event
     * @param tabIndex {number} 标签栏tab的索引
     * @param orderIndex {number} 单个订单的索引
     * @param item 单个订单对象
     * 
     * @param index {number} 单个订单中的课程索引
     */
    async viewDetail(event, tabIndex, orderIndex, item) {
      if (this.loadOrderDetail) {
        return
      }

      let orderId = item.order_no
      // {
      //   coursePrice 课程价格
      //   chargeAgainstAmount 报名费冲抵
      //   discountAmount 优惠
      // }
      let cache = this.orderDetailCache[orderId]

      if (!cache) {
        try {
          this.loadOrderDetail = true

          let { data } = await orderApi.getOrderDetail(orderId, this.sign)
          
          if (data.status == 200) {
            cache = this.orderDetailCache[orderId] = data.result
          } else {
            this.$toast(data.message)
          }

          this.loadOrderDetail = false
        } catch(err) {}
      }
      
      let target = event.target
      let { width: targetWidth, top: targetTop, left: targetLeft } = target.getBoundingClientRect()
      let { top: containerTop, left: containerLeft } = target.parentNode.getBoundingClientRect()
      
      this.tipPosition[tabIndex].x = targetLeft - containerLeft + targetWidth
      this.tipPosition[tabIndex].y = targetTop - containerTop + 5
      
      let tipComponent = this.$refs[`tip-${tabIndex}-${orderIndex}`][0]
      
      if (this.activeTip) {
        this.activeTip.hide()
      }
      
      if (this.activeTip !== tipComponent) {
        this.activeTip = tipComponent
        tipComponent.show(cache)

        // 埋点
        zhugeTrack('H5_我的订单页_点击查看明细', {
          // '课程ID': itemDetail.id,
          // '课程类型': itemDetail.course_type,
          // '课程名称': itemDetail.grade_name,
          // '课程金额': itemDetail.amount,
          '订单ID': item.order_no,
          '订单日期': item.create_time
        })
      } else {
        this.activeTip = null
      }
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickTipHandler, false)
  }
}
</script>
