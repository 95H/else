<template>
  <div class="sign_box">
    <TitleBack titleName="合同签订"></TitleBack>
    <div class="gray_box"></div>
    <div class="sign">
      <h6>课程合同签订</h6>
      <p class="sign_comment">课程购买后，需要完成合同签订才能激活并观看课程，为了方便课程的学习以及享受课程相关的一系列教学服务，请在合同签订前，确认个人信息无误</p>
    </div>
    <div class="gray_box gray_box2"></div>
    <div class="sign_form_box">
      <div class="form_box">
        <div class="red_must_box" v-show="!twice_sign_info.userName">
          <span class="red_must">*</span>
          <mt-field 
            :state="nameState"
            label="真实姓名" 
            placeholder="请输入身份证上真实姓名" 
            v-model="userInfo.username"
            @input="nameInpChange"
          ></mt-field>
        </div>
        <div class="red_must_box" v-show="!twice_sign_info.idNum">
          <span class="red_must">*</span>
          <mt-field 
            label="身份证号" 
            placeholder="请保持与身份证上一致" 
            v-model="userInfo.identity"
            :state="identityState"
            @input="idInpChange"
          ></mt-field>
        </div>
        <div class="red_must_box" v-show="!twice_sign_info.phoneNum">
          <span class="red_must">*</span>
          <mt-field 
            class="mint_phone"
            label="手机号码" 
            placeholder="请输入本人手机号" 
            type="tel" 
            v-model="userInfo.phone"
            :state="phoneState"
            @input="phoneInpChange"
          ></mt-field>
        </div>
      </div>
      <!-- 二次签订 -->
      <div class="twice_sign">
        <div class="twice_sign_info">
          <ul>
            <li 
              v-show="twice_sign_info.userName"
            >
              <span class="twice_sign_left"><span class="red_true">*</span>真实姓名</span>
              <span class="twice_sign_right">{{twice_sign_info.userName}}</span>
            </li>
            <li 
              v-show="twice_sign_info.idNum"
              :class="twice_sign_info.userName?'':'twice_sign_li'"
            >
              <span class="twice_sign_left"><span class="red_true">*</span>身份证号</span>
              <span class="twice_sign_right">{{twice_sign_info.idNum}}</span>
            </li>
            <li 
              v-show="twice_sign_info.phoneNum"
              :class="twice_sign_info.idNum?'':'twice_sign_li'"
            >
              <span class="twice_sign_left"><span class="red_true">*</span>手机号码</span>
              <span class="twice_sign_right">{{twice_sign_info.phoneNum}}</span>
              <img class="hint" @click="changePopClick" src="../../../static/web/images/contract/change_phone.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="clause_box">
         <el-checkbox class="checkbox" v-model="checked"></el-checkbox>
         <div class="agree_clause">我已阅读协议条款，并同意<span @click="protocolClick">《博学谷学员培训协议》</span></div>
      </div>
      <div 
        class="immediately_btn" 
        :style="checked && isImportTrue?'background:#38ADFF':'background:#DDDDDD'"
        @click="immediaSignClick(checked)"
      >立即签订</div>
      <div class="special_box">
        <div class="special">
          <span class="red_start">*</span>
          <p>因有特殊情况无法签订课程合同，可联系：</p>
          <span class="service" @click="customerService">在线客服</span>
        </div>
      </div>
      <!-- 更换手机号弹框 -->
      <mt-popup
        class="pop_phone_box"
        v-model="changePhonePop"
        :closeOnClickModal="false"
      >
        <div class="change_phone">
          <h6>更换手机</h6>
          <div>更换手机号请到博学谷官网</div>
          <p @click="changePopClose">知道了</p>
        </div>
      </mt-popup>
      <!-- pdf查看 -->
      <mt-popup
        class="pop_big_box"
        v-model="popupVisible"
        :closeOnClickModal="false"
      >
        <span @click="closePopClick" class="close_pop"><i class="el-icon-close"></i></span>
        <div class="iframe_pdf_box">
          <iframe class="iframe_pdf" :src="pdfUrl"></iframe>
          <div @click="downloadClick" class="ifram_dowload">下载</div>
        </div>
      </mt-popup>
      <!-- 弹出手机号验证 -->
      <mt-popup
        class="pop_phone_box"
        v-model="popupPhoneVisible"
        :closeOnClickModal="false"
      >
        <div class="phone_box">
          <div class="inp_phone">
            <span class="white_line"></span>
            <span class="gray_line"></span>
            <mt-field 
              label="手机号:" 
              placeholder="请输入您的手机号" 
              type="tel" 
              :disableClear="true"
              :readonly="true"
              v-model="pop_phone"
              @input="popPhoneInput"
              class="popModule"
            ></mt-field>
          </div>
          <div class="inp_phone inp_code">
            <span class="white_line"></span>
            <span class="gray_line"></span>
            <mt-field 
              label="验证码:" 
              placeholder="请输入验证码" 
              type="tel" 
              v-model="code_phone"
              class="codeInp"
              @input="popCodeInput"
            ></mt-field>
            <div class="get_code" @click="codeClick">{{vcodeTxt}}</div>
          </div>
          <div class="btn_box">
            <div @click="cancleModuleClick" class="cancle" ref="cancleBtn">取消</div>
            <button @click="sureModuleClick" class="sure" ref="sureBtn">确认</button>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TitleBack from "~/components/titleTemp2/titleBack";
import { Indicator, Field, Checklist, Toast, Popup } from 'mint-ui';
import {regPhone, noempty, checkCardId } from '~/plugins/vue-validator/validator';
import { contractApi, authApi } from '~/api/index'
import { pdfServe, onlineUrl, noTarget } from '../../../api/apiurl.js'
import { zhugeTrack } from '~/plugins/filter'
export default {
  name: 'SignContract',
  components: {
    TitleBack
  },
  data() {
    return {
      userInfo: {
        username: '',
        identity: '',
        phone: ''
      },
      checked: false,
      nameState: '',
      identityState: '',
      phoneState: '',
      popupVisible: false,
      popupPhoneVisible: false,
      pop_phone: '',
      code_phone: '',
      twice_sign_info: {
        userName: '',
        idNum: '',
        phoneNum: ''
      },
      pdfUrl: '', //拼上服务的链接
      returnPdfUrl: '', //后端返回的链接
      courseId: '',
      stuCourseId: '',
      contractNo: '',
      sign: '',
      vcodeDisabled: false,
      secs: 90,
      changePhonePop: false,
      isInpState: {
        name: false,
        id: false,
        phone: false
      },
      isSendCode: false, //是否发送验证码
    }
  },
  methods: {
    nameInpChange(val) {
      if (val || this.twice_sign_info.userName) {
        this.isInpState.name = true
      } else {
        this.isInpState.name = false
      }
    },
    idInpChange(val) {
      if (val || this.twice_sign_info.idNum) {
        this.isInpState.id = true
      } else {
        this.isInpState.id = false
      }
    },
    phoneInpChange(val) {
      if (val || this.twice_sign_info.phoneNum) {
        this.isInpState.phone = true
      } else {
        this.isInpState.phone = false
      }
    },
    customerService() {
      zhugeTrack('H5_签订页_点击按钮', {
        '按钮名称': '在线客服'
      })
      qimoChatClick();
    },
    changePopClick() {
      zhugeTrack('H5_签订页_点击按钮', {
        '按钮名称': '更换'
      })
      this.changePhonePop = true
    },
    changePopClose() {
      this.changePhonePop = false
    },
    downloadClick() {
      window.location.href = onlineUrl + 
      '/newAttachment/download?fileUrl=' + 
      encodeURIComponent(this.returnPdfUrl) + 
      '&fileName=' + encodeURIComponent(this.contractNo) + '.pdf';
    },
    closePopClick() {
      this.popupVisible = false
    },
    async protocolClick() {
      zhugeTrack('H5_签订页_点击按钮', {
        '按钮名称': '查看协议'
      })
      await contractApi.getPreviewCon({
        sign: this.sign,
        stuCourseId: this.stuCourseId
      })
      .then((re) => {
        if (re.data.status == 200) {
          this.popupVisible = true
          this.pdfUrl = pdfServe + re.data.result.contractUrl
          this.returnPdfUrl = re.data.result.contractUrl
        } else if (re.data.status == 410) {
          Toast({
            message: re.data.message,
            duration: 2000,
            className: 'codeToast'
           });
          this.addToastIndex()
        } else {
          Toast('合同异常，请联系在线客服')
        }
      })
      .catch(err => {
        this.popupVisible = false
        console.log(err)
        Toast('网络异常')
      })
    },
    immediaSignClick(checked) {
      zhugeTrack('H5_签订页_点击按钮', {
        '按钮名称': '立即签订'
      })
      if (!checked || !this.isImportTrue) {
        return
      }
      if (!this.twice_sign_info.userName && 
          this.userInfo.username.length < 2 || 
          this.userInfo.username.length > 20) {
        Toast('请输入正确的姓名')
        return
      }
      if (!this.twice_sign_info.idNum && !checkCardId(this.userInfo.identity)) {
        Toast('请输入正确的身份证号')
        return
      }
      if (!this.twice_sign_info.phoneNum && !regPhone(this.userInfo.phone)) {
        Toast('请输入正确的手机号')
        return
      }
      //验证码重置
      this.vcodeDisabled = false
      this.secs = 90
      this.code_phone = ''
      clearTimeout(this.vcodeTimer)
      //手机号码回显
      this.pop_phone = this.twice_sign_info.phoneNum?
      this.twice_sign_info.phoneNum:
      this.userInfo.phone
      this.popupPhoneVisible = true
    },
    cancleModuleClick() {
      if (this.isSendCode) {
        return
      }
      this.popupPhoneVisible = false
      this.pop_phone = ''
      this.code_phone = ''
    },
    popPhoneInput() {
      if (!this.pop_phone) {
        return
      }
    },
    popCodeInput() {
      if (!this.code_phone) {
        return
      }
    },
    codeClick() {
      if (!this.pop_phone) {
        return
      }
      if (!this.vcodeDisabled) {
        this.vcodeDisabled = true
        // 获取验证码
        authApi
        .getMobileCode({
          phone: this.pop_phone,
          vtype: 1
        })
        .then(res => {
          let data = res.data
          if (data.success) {
            // 验证码倒计时
            this._vocdeTimer()
          } else {
            Toast({
              message: data.errorMessage,
              duration: 2000,
              className: 'codeToast'
            });
            this.addToastIndex()
            this.vcodeDisabled = false
          }
        })
        .catch(err => {
          console.log(err)
          Toast('网络异常')
        })
      }
    },
    async sureModuleClick() {
      if (!this.pop_phone || !this.code_phone) {
        Toast('请输入内容')
        return
      }
      this.isSendCode = true
      if (this.isSendCode) {
        this.$refs.sureBtn.style.backgroundColor = '#eee'
        this.$refs.cancleBtn.style.backgroundColor = '#eee'
      }
      Indicator.open();
      await contractApi.getGoSign({
        sign: this.sign,
        stuCourseId: this.stuCourseId,
        mobile: this.pop_phone,
        code: this.code_phone,
        stuName: this.twice_sign_info.userName?
                  this.twice_sign_info.userName:
                  this.userInfo.username,
        IDCardNO: this.twice_sign_info.idNum?
                  this.twice_sign_info.idNum:
                  this.userInfo.identity
      })
      .then((re) => {
        Indicator.close();
        this.isSendCode = false
        this.$refs.sureBtn.style.backgroundColor = '#38ADFF'
        this.$refs.cancleBtn.style.backgroundColor = '#fff'
        if (re.data.status == 200) {
          zhugeTrack('H5_合同签订成功')
          this.$router.push(`/contractPage/signSucc/${this.contractNo}`)
        } else if (re.data.status == 401) {
          this.$router.push({
            path: '/loginRegister/login',
            query: {
              backurl: '/contract/?courseId=' + this.$route.query.courseId
            }
          })
        } else if (re.data.status == 404) {
          this.popupPhoneVisible = false
          Toast(re.data.message + '请联系客服');
        } else if (re.data.status == 405) { //实名认证错误
          this.popupPhoneVisible = false
          Toast(re.data.message);
        } else if (re.data.status == 406) {
           Toast({
            message: re.data.message,
            duration: 2000,
            className: 'codeToast'
           });
          this.addToastIndex()
        } else if (re.data.status == 410) {
          this.popupPhoneVisible = false
          Toast(re.data.message + '请联系客服');
        } else if (re.data.status == 417) {
          this.popupPhoneVisible = false
          Toast(re.data.message + '请联系客服');
        } else {
          this.popupPhoneVisible = false
          Toast(re.data.message + '请联系客服');
        }
      })
      .catch((err) => {
        Indicator.close();
        console.log(err)
        this.isSendCode = false
        this.$refs.sureBtn.style.backgroundColor = '#38ADFF'
        this.$refs.cancleBtn.style.backgroundColor = '#fff'
        Toast({
          message: '网络异常',
          duration: 2000,
          className: 'codeToast'
        });
        this.addToastIndex()
      })
    },
    //给toast加层级
    addToastIndex() {
      this.toastTimer = setTimeout(() => {
        let codeToast = document.getElementsByClassName('codeToast')[0];
        codeToast.style.zIndex = '9999'
      }, 20)
    },
    async _isAutonym() { //是否实名认证
      await contractApi.getAutonym({
        sign: this.sign
      })
      .then((re) => {
        if (re.data.status == 200) { //已认证
          let result = re.data.result
          if (!result.mobile) {
            this.userInfo.phone = result.mobile
          } else {
            this.twice_sign_info.phoneNum = result.mobile
          }
          this.twice_sign_info.userName = result.name
          this.twice_sign_info.idNum = result.idcard
          this.isInpState.name = result.name?true:false
          this.isInpState.id = result.idcard?true:false
          this.isInpState.phone = result.mobile?true:false
        } else if (re.data.status == 401) { //未登录
          if (this.$route.query.courseId) {
            this.$router.push({
              path: '/loginRegister/login',
              query: {
                backurl: '/contract/?courseId=' + this.$route.query.courseId
              }
            })
          }
        } else if (re.data.status == 417) { //未认证
          let result = re.data.result
          if (result.mobile) {
            this.twice_sign_info.phoneNum = result.mobile
          } else {
            this.userInfo.phone = result.mobile
          }
          this.userInfo.username = result.name
          this.userInfo.identity = result.idcard
          this.isInpState.name = result.name?true:false
          this.isInpState.id = result.idcard?true:false
          this.isInpState.phone = result.mobile?true:false
        }
      })
      .catch((e) => {
        console.log(err)
        Toast('网络异常');
      })
    },
    async _isSignCon() { //是否签订合同
      this.$indicator.open()
      this.courseId = this.$route.query.courseId 
      this.sign = localStorage.getItem('sign')?localStorage.getItem('sign'):''
      await contractApi.getIsSiganContract({
        sign: this.sign,
        courseId: this.courseId
      })
      .then((re) => {
        this.$indicator.close()
        let result = re.data.result
        if (re.data.status == 200) {
          if (result.courseContractStatus == 0) {
            this.$router.push('/studyCenter')
          } else if (result.courseContractStatus == 2) {
            this.$router.push(`/contractPage/signSucc/${result.contractNo}`)
          } else {
            this.stuCourseId = result.stuCourseId
            this.contractNo = result.contractNo
          }
        } else if (re.data.status == 401) {
          if (this.$route.query.courseId) {
            this.$router.push({
              path: '/loginRegister/login',
              query: {
                backurl: '/contract/?courseId=' + this.$route.query.courseId
              }
            })
          }
        }
      })
      .catch((e) => {
        console.log(err)
        Toast('网络异常');
      })
    },
    //倒计时
    _vocdeTimer() {
      this.vcodeTimer = setTimeout(() => {
        --this.secs
        if (this.secs > 0) {
          this._vocdeTimer()
        } else {
          this.vcodeDisabled = false
          this.secs = 90
          clearTimeout(this.vcodeTimer)
        }
      }, 1000)
    },
  },
  computed: {
    isImportTrue() {
      if (this.isInpState.name && this.isInpState.id && this.isInpState.phone) {
        return true
      } else {
        return false
      }
    },
    vcodeTxt() {
      if (!this.vcodeDisabled) {
        return "获取验证码"
      } else if (this.secs == 90) {
        return "发送中..."
      } else {
        return `${this.secs}s`
      }
    },
  },
  async created () {
    await this._isSignCon()
    this._isAutonym()
  },
  mounted () {
    zhugeTrack('H5_进入合同签订页')
  },
  destroyed () {
    this.toastTimer = null //清除定时器
    sessionStorage.removeItem('isPayPage')
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/variable.less";
.gray_box{
  background: #F5F5F5;
  height: unit(20/@u, @uu);
  width: 100%;
  margin-top: unit(100/@u, @uu);
}
.gray_box2{
  margin: 0;
}
.sign_box{
  width: 100%;
  height: 100vh;
  .sign{
    padding: 0 unit(30/@u, @uu);
    padding-bottom: unit(30/@u, @uu);
    h6{
      font-size: unit(32/@u, @uu);
      color: #333;
      margin-top: unit(30/@u, @uu);
      border-bottom: unit(1/@u, @uu) solid #F5F5F5;
      padding-bottom: unit(20/@u, @uu);
    }
    .sign_comment{
      line-height: unit(50/@u, @uu);
      letter-spacing: unit(2/@u, @uu);
      color: #999;
      margin-top: unit(14/@u, @uu);
    }
  }
  .sign_form_box{
    margin-top: unit(30/@u, @uu);
    padding: 0 unit(30/@u, @uu);
    .form_box{
      .red_must_box{
        position: relative;
        .red_must{
          position: absolute;
          color: red;
          font-size: unit(20/@u, @uu);
          left: unit(0/@u, @uu);
          top: unit(32/@u, @uu);
          z-index: 9;
        }
      }
      .red_must_box{
        margin-top: unit(30/@u, @uu);
      }
    }
    .twice_sign{
      margin-bottom: unit(70/@u, @uu);
      margin-top: unit(50/@u, @uu);
      .twice_sign_info{
        ul{
          li{
            display: flex;
            .twice_sign_left{
              font-size: unit(32/@u, @uu);
              color: #151515;
              .red_true{
                color: red;
              }
            }
            .twice_sign_right{
              font-size: unit(32/@u, @uu);
              color:#666;
              margin-left: unit(47/@u, @uu);
            }
            .hint{
              display: block;
              width: unit(36/@u, @uu);
              height: unit(36/@u, @uu);
              margin-left: unit(30/@u, @uu);
            }
          }
          li+li{
            margin-top: unit(86/@u, @uu);
          }
          .twice_sign_li{
            margin: 0;
          }
        }
      }
    }
    .clause_box{
      display: flex;
      margin-top: unit(33/@u, @uu);
      .checkbox{
        width: unit(24/@u, @uu);
        height: unit(26/@u, @uu);
        margin-right: unit(20/@u, @uu);
      }
      .agree_clause{
        cursor: pointer;
        font-size: unit(24/@u, @uu);
        color: #999;
        line-height: unit(30/@u, @uu);
        span{
          color: #38ADFF;
        }
      }
    }
    .immediately_btn{
      width: unit(690/@u, @uu);
      height: unit(80/@u, @uu);
      background: #38ADFF;
      color: #fff;
      text-align: center;
      line-height: unit(80/@u, @uu);
      border-radius: unit(50/@u, @uu);
      margin: 0 auto;
      margin-top: unit(75/@u, @uu);
    }
    .special_box{
      width: 100%;
      display: flex;
      justify-content: space-around;
      .special{
        display: flex;
        font-size: unit(24/@u, @uu);
        margin-top: unit(30/@u, @uu);
        line-height: unit(30/@u, @uu);
        .red_start{
          font-size: unit(20/@u, @uu);
          color: red;
          line-height: unit(30/@u, @uu);
        }
        p{
          color: #3F3F3F;
          line-height: unit(30/@u, @uu);
        }
        .service{
          cursor: pointer;
          color: #38ADFF;
          line-height: unit(30/@u, @uu);
        }
      }
    }
  }
}
//popup
.pop_big_box{
  width: unit(690/@u, @uu);
  height: unit(977/@u, @uu);
  top: 54%;
  .close_pop{
    position: absolute;
    display: block;
    width: unit(58/@u, @uu);
    height: unit(58/@u, @uu);
    font-size: unit(60/@u, @uu);
    font-weight: 600;
    color: #fff;
    right: unit(-10/@u, @uu);
    top: unit(-70/@u, @uu);
  }
  .iframe_pdf_box{
    width: 100%;
    height: 100%;
    position: relative;
    .iframe_pdf{
      display: block;
      width: 100%;
      height: 100%;
    }
    .ifram_dowload{
      position: absolute;
      left: 0;
      bottom: -1px;
      right: 0;
      width: 100%;
      height: unit(88/@u, @uu);
      background: #38ADFF;
      color: #fff;
      font-size: unit(32/@u, @uu);
      text-align: center;
      line-height: unit(88/@u, @uu);
    }
  }
}
.pop_phone_box{
  width: unit(630/@u, @uu);
  height: unit(366/@u, @uu);
  border-radius: unit(22/@u, @uu);
  padding-top: unit(20/@u, @uu);
  .phone_box{
    .inp_phone{
      position: relative;
      .white_line{
        display: block;
        width: unit(630/@u, @uu);
        height: unit(1/@u, @uu);
        background: #fff;
        position: absolute;
        bottom: 0;
        z-index: 2;
        left: 0;
      }
      .gray_line{
        display: block;
        width: unit(550/@u, @uu);
        height: unit(1/@u, @uu);
        background: #F5F5F5;
        position: absolute;
        left: unit(40/@u, @uu);;
        bottom: 0;
        z-index: 3;
      }
      .get_code{
        font-size: unit(28/@u, @uu);
        color: #38ADFF;
      }
    }
    .inp_code{
      display: flex;
      position: relative;
      .get_code{
        position: absolute;
        right: unit(36/@u, @uu);
        top: unit(30/@u, @uu);
      }
    }
    .btn_box{
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      .cancle,.sure{
        width: unit(315/@u, @uu);
        height: unit(100/@u, @uu);
        text-align: center;
        line-height: unit(100/@u, @uu);
        font-size: unit(36/@u, @uu);
        color: #666666;
      }
      .cancle{
        cursor: pointer;
        border-top: unit(1/@u, @uu) solid #F5F5F5;
      }
      .sure{
        cursor: pointer;
        background: #38ADFF;
        color: #fff;
        border-radius: 0 0 unit(22/@u, @uu) 0; 
      }
      .cancle{
        border-radius: 0 0 0 unit(22/@u, @uu); 
      }
    }
  }
  .change_phone{
    text-align: center;
    h6{
      font-size: unit(38/@u, @uu);
      color: #151515;
      margin-top: unit(20/@u, @uu);
    }
    div{
      font-size: unit(34/@u, @uu);
      color: #666;
      margin-top: unit(50/@u, @uu);
      padding-bottom: unit(80/@u, @uu);
      border-bottom: 1px solid #F5F5F5;
    }
    p{
      color: #38ADFF;
      font-size: unit(34/@u, @uu);
      margin-top: unit(40/@u, @uu);
    }
  }
}
.sign_box /deep/ .textLayer{
  width: 100%;
  height: 100%;
}
.sign_box /deep/ .mint-cell-wrapper{
  padding: 0 unit(10/@u, @uu);
  background: none;
}
.sign_box /deep/ .pop_phone_box .mint-cell-wrapper{
  padding: 0 unit(36/@u, @uu);
}
.sign_box /deep/ .mint-field .mint-cell-title{
  width: unit(155/@u, @uu);
}
.sign_box /deep/ .codeInp{
  padding-right: unit(140/@u, @uu);
  .mint-cell-title{
    width: unit(120/@u, @uu);
  }
}
.sign_box /deep/ .popModule .mint-cell-title{
  width: unit(120/@u, @uu);
}
</style>


