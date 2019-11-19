<template>
    <div class="payDiscountCouponWrap">
      <titleBack titleName="我的优惠券"></titleBack>
      <div class="containerOnlyHeader">
        <mt-navbar v-model="selected" class="tab">
          <mt-tab-item id="0" @click.native="getCoupons(1)">可用优惠券</mt-tab-item>
          <mt-tab-item id="1" @click.native="getCoupons(0)">不可用优惠券</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="0">
            <div class="conversion">
              <label>兑换码：</label>
              <input type="text" placeholder="请输入优惠券码" v-model="serialNoValue"/>
              <span @click="conversion">兑换</span>
            </div>
            <div class="discountLists" v-for="(items,index) in getData" v-if="getData.length!=0" :key="index">
              <div class="discountPoupon applicableBG1"  :class="items.id==id?'applicableBG1':'applicableBG2'">
                <div class="money">
                  <h3 class="discountsMoney" v-if="items.type == 'CASH'">￥{{items.discount,0 |toFixed}}</h3>
                  <h3 class="discountsMoney" v-if="items.type == 'DISCOUNT'">{{items.discount,1 |toFixed}}折</h3>
                  <p class="failureTime" v-if="items.expireDay !== 0">({{items.expireDay}}天后失效)</p>
                  <p class="failureTime" v-if="items.expireDay == 0">(1天内失效)</p>
                </div>
                <div class="subject">
                  <h3 class="ticketName">课程劵</h3>
                  <p class="scope">使用课程：{{items.courseNames}}</p>
                  <p class="classNumber" v-if="items.courseAmount !== 1">等{{items.courseAmount}}个课程</p>
                  <p class="timer">{{items.startTime |timer}}-{{items.endTime |timer}}</p>
                </div>
                <div class="use zhugeUse">
                  <a href="javascript:;" @click="zhugeTrack('H5-选择优惠券页-点击立即使用',{},'/payment/?courseId='+parameter.courseId+'&courseCoupon='+parameter.courseId+':'+items.id)">立即使用</a>
                </div>
              </div>
            </div>
            <div class="discountLists" v-if="getData.length==0">
              <emptyTemp imgUrl="/web/images/defaultImg/disCountEmpty.png"></emptyTemp>
            </div>
            <div class="noUse cl" v-show="noUseCoupon">
              <a id="noUseCoupon" href="javascript:;" @click="zhugeTrack('H5-选择优惠券页-点击不使用',{},'/payment/?courseId='+parameter.courseId+'&courseCoupon='+parameter.courseId+':-1')">不使用优惠券</a>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <div class="discountLists" v-for="(items,index) in getData"  v-if="getData.length!=0" :key="index">
                  <div class="discountPoupon notApplicableBG">
                    <div class="money">
                      <h3 class="discountsMoney" v-if="items.type == 'CASH'">￥{{items.discount,0 |toFixed}}</h3>
                      <h3 class="discountsMoney" v-if="items.type == 'DISCOUNT'">{{items.discount,1 |toFixed}}折</h3>
                      <p class="failureTime" v-if="items.expireDay !== 0">({{items.expireDay}}天后失效)</p>
                      <p class="failureTime" v-if="items.expireDay == 0">(1天内失效)</p>
                    </div>
                    <div class="subject">
                      <h3 class="ticketName">课程劵</h3>
                      <p class="scope">使用课程：{{items.courseNames}}</p>
                      <p class="classNumber" v-if="items.courseAmount !== 1">等{{items.courseAmount}}个课程</p>
                      <p class="timer">{{items.startTime |timer}}-{{items.endTime |timer}}</p>
                    </div>
                    <div class="use">
                      <a href="javascript:;" style="color:#999;">不可使用</a>
                    </div>
                  </div>
            </div>
            <div class="discountLists" v-if="getData.length==0">
              <emptyTemp imgUrl="/web/images/defaultImg/disCountEmpty.png"></emptyTemp>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {appBaseUrl} from "../../../api/apiurl";
  import {zhugeTrack} from "../../../plugins/filter";
  export default {
        name: "payDiscountCoupon",
        data(){
          return{
            zhugeTrack:zhugeTrack,
            selected:"0",
            serialNoValue:'',
            parameter:{
              courseId: this.$route.query.courseId,//使用优惠券的课程id
              couponIds: -1,//	优惠券id集合(array)
              useStatus: 1,//该用户优惠券相对于此课程可使用状态，=1 可使用，=0 不可使用
              sign : ''
            },
            id : this.$route.query.id,
            getData:{},
            noUseCoupon:false
          }
        },
      mounted(){
          if(localStorage.getItem('couponIds')){
            this.parameter.couponIds=localStorage.getItem('couponIds');
          }
          this.parameter.sign=localStorage.getItem('sign');
          zhugeTrack('H5-进入选择优惠券页');
          this.getCoupons(1);
      },
      methods:{
        getCoupons:function(useStatus){
           this.getData={};
           this.parameter.useStatus=useStatus;
            axios({
              url:appBaseUrl+'/bxg/coupon/getCouponsByUserIdAndCouponIds',
              method:'POST',
              data:this.parameter,
              transformRequest:[function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }]
            }).then(res=>{
              if(res.data.errorMessage==1001){
                window.location.href="/loginRegister/phoneLogin";
                window.localStorage.setItem('redirectUrl',window.location.href);
              }else{
                if(res.data.resultObject.length!=0 &&useStatus==1){
                  this.noUseCoupon=true;
                }else{
                  this.noUseCoupon=false;
                }
                this.getData=res.data.resultObject;
              }
            }).catch(err=>{})
          },
        conversion:function(){
          axios({
            url:appBaseUrl+'/bxg/coupon/bindCouponToUser',
            method:'POST',
            data:{
              serialNo : this.serialNoValue,
              course_id: this.parameter.courseId,
              sign:this.parameter.sign
            },
            transformRequest:[function (data) {
              // Do whatever you want to transform the data
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }]
          }).then(res=>{
            this.serialNoValue="";
            if(res.data.success){
              if(res.data.resultObject.isCouver ==true){
                if(this.parameter.couponIds == ''){
                  this.parameter.couponIds=res.data.resultObject.couponId;
                }else{
                  this.parameter.couponIds += ','+res.data.resultObject.couponId;
                }
                localStorage.setItem("couponIds", this.parameter.couponIds);
                this.getCoupons(1)
              }else{
                this.$toast('此优惠券，不适用此课程！');
                this.getCoupons(1)
              }
            }else if(res.data.errorMessage==1001){
                window.location.href="/loginRegister/phoneLogin"
            }else{
              this.$toast(res.data.errorMessage);
            }
          }).catch(err=>{})
        }
      }
    }
</script>

<style lang="less">
@import "payDiscountCoupon.less";
</style>
