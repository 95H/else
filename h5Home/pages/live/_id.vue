<template>
  <section :class="['page-live', pageLiveClass]" ref="pagelive">
    <no-ssr>
      <LiveBackHeader class="live-titleback" :titleName='titleName' v-if="showTitle"></LiveBackHeader>
    </no-ssr>
      <!-- v-if="pageLiveClass.portrait"
        <LiveBackHeader v-else @back="zoom">
        <template slot="right">
          <div class="slot-right">
            <i class="person-img"></i>
            <p class="person-num">495</p>
          </div>
        </template>
      </LiveBackHeader> -->

      <!-- 直播容器 >>> -->
    <no-ssr>
      <div class="video-container" :style="videoStyle">
        <div class="video-inner" id="livePlayer" ref="videoContainer" style="max-height: 100%;">
          <!-- <video class="video-live" webkit-playsinline v-if="videoSrc" ref="video" :src="videoSrc">
          </video> -->
        </div>
        <p class="video-abstatus" v-if="abnormalStatus">{{abnormalStatus}}</p>
        <!-- <i class="video-zoom" @click="zoom"></i> -->

        <div class="video-bg" v-if="isShowVideoBg" @click="playVideo">
          <div class="video-btn"></div>
        </div>
      </div>
      <!-- 直播容器 <<< -->
    </no-ssr>

    <div class="chatroom-container">
      <div class="titles">
        <p class="room-title" @click="talk"><span :class="contentStatus=='talk' ? 'showTalk' : (publicChatMessage&&'newMessage')">交流区</span></p>
        <p class="room-title" @click="question"><span :class="contentStatus=='question' ? 'showQuestion' : (isReceived&&'newMessage')">提问区</span></p>
      </div>
      <div class="mg20-box"></div>
      <div v-if="contentStatus=='question' && isCloseHint" class="hint-box">
        <div class="hint-text">
          仅支持学员在本次直播中，产生的疑问进行提问，禁止发布一些和课程无关的信息！
          <p @click="closeHint"><i class='close-hint iconfont icon-quxiaoicon'></i></p>
        </div>
      </div>
      <div class="content-container" ref="contentContainer">
        <!-- 聊天容器 >>> -->
        <div v-if="contentStatus=='talk'" class="content-inner" ref="contentInner">
          <template v-for="message in messageList">
            <div class="message-other-piece" v-if="!message.isSelf" :key="message.uniqId">
              <!-- <div class="avatar-other">
                <img class="img-avatar" src="~/assets/live/avatar1.png" alt="avatar" />
              </div> -->
              <div class="detail">
                <div class="info">
                  <p class="nickname">{{message.username | transIp}}</p>
                  <time class="sendtime">{{message.time}}</time>
                </div>
                <div class="message">
                  <p>{{message.msg}}</p>
                  <i class="arrow-left"></i>
                </div>
              </div>
            </div>
            <div class="message-self-piece" :key="message.uniqId" v-else>
              <!-- <div class="avatar-self">
                <img class="img-avatar" src="~/assets/live/avatar2.png" alt="avatar" />
              </div> -->
              <div class="detail">
                <div class="info-self">
                  <p class="nickname">{{message.username | transIp}}</p>
                  <time class="sendtime">{{message.time}}</time>
                </div>
                <div class="message-self">
                  <p>{{message.msg}}</p>
                  <i class="arrow-right"></i>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- 聊天容器 <<< -->

        <!-- 提问容器 >>> -->
        <div v-else class="qw-inner" ref="contentInner">
          <template v-if="isLoginStatus"><QwPrivate :lists="lists" :onlyFlag="onlyFlag" :loginUserId="loginUserId"></QwPrivate></template>
          <template v-else><QwTourist :lists="lists"></QwTourist></template>
        </div>
        <!-- 提问容器 <<<-->
      </div>
    </div>

    <!-- 交流区输入框 -->
    <div v-if="contentStatus=='talk'" class="input-container">
      <div class="input-inner">
        <input class="input" type="text" placeholder="和大家说点什么" v-model="inputMessage" @input="inputTxt" @focus.prevent="inputFocus" @blur="inputBlur" />
        <span class="btn" @click="sendMessage">发送</span>
      </div>
    </div>
    <!-- 交流区输入框 -->

    <!-- 提问区输入框 -->
    <div v-else class="input-container input-question">
      <div class="input-inner">
        <template v-if="isStartLive">
          <p v-if="isLoginStatus">
            <i v-if="onlyFlag" @click="allOrOnly" class='iconfont icon-weidianliang'></i>
            <i v-else @click="allOrOnly" class='iconfont icon-dianliang'></i>
          </p>
          <p v-else >
            <i class='iconfont icon-dianliang'></i>
          </p>
        </template>
        <input class="input" type="text" :placeholder="isStartLive?'请用一句话描述出你的问题...':'直播还未开始，暂停提问'" v-model="questionMessage" @input="questionTxt" @focus.prevent="inputFocus" @blur="inputBlur" />
        <span :class="isStartLive ? 'btn' : 'disableBtn'" @click="questionSub">提问</span>
      </div>
    </div>
    <!-- 提问区输入框 -->

    <div class="layer-backhome" @click="backHome" @touchstart="touchStart" @touchmove.prevent="touchMove" :style="layerStyle" ref="layer">
      <p class="backhome-txt">返回首页</p>
    </div>
  </section>
</template>

<script>
// '~/components/titleTemp2/titleBack'
import LiveBackHeader from '~/components/live/LiveBackHeader'
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import { apiBaseUrl, appBaseUrl } from '~/api/apiurl'
import { escape, isWXBuiltIn } from '~/common/utils/index'
import { wxShare, shareInfo } from '~/plugins/filter'
import { zhugeTrack } from '~/plugins/filter'
import QwTourist from './qwTourist'
import QwPrivate from './qwPrivate'

let IScroll = null
if (process.browser) {
  IScroll = require('iscroll')
}

let uniqId = 0
function getUniqId() {
  return uniqId++
}

const ipReg = /^(?:\d{1,3}\.){3}\d{1,3}\s*(,)?/
function isCCIp(str = '') {
  return ipReg.test(str)
}

export default {
  middleware: ['device'],

  validate({ params, store }) {
    return !isNaN(+params.id)
  },

  data() {
    return {
      showTitle: true,
      // 是否显示视频背景
      isShowVideoBg: false,
      titleName: '',
      // 横屏添加 landscape, 竖屏添加 portrait
      pageLiveClass: {
        landscape: false,
        portrait: false,
        pagezoomin: false,
        pagezoomout: true
      },
      videoStyle: {},
      // 直播异常信息
      abnormalStatus: '',
      messageList: [],
      inputMessage: '',
      // 返回首页浮层样式
      layerStyle: {
        left: '82%',
        top: '76%'
      },
      publicChatMessage: false,    //是否收到新消息

      isLoginStatus: false,        //是否用户登录
      loginUserId: '',
      isCloseHint: true,           //提示
      isStartLive: false,          //是否开始直播
      isReceived: false,           //收到回答
      isDisableSendMsg: false,     //禁言
      contentStatus: 'talk',       //tab 切换
      onlyFlag: 0,                 //0：公聊 | 1：私聊 falg
      questionMessage: '',         //提问内容
      lists: []
    }
  },

  head() {
    return {
      title: this.titleName,
      script: [
        { src: '/lib/jquery-1.9.1.js' },
        { src: '/lib/liveSDK.js' },
        // { src: "https://unpkg.com/video.js/dist/video.js" }
        // { src: "/lib/vConsole.js" }
      ]
    }
  },

  components: {
    LiveBackHeader,
    QwTourist,
    QwPrivate
  },

  filters: {
    transIp(value) {
      if (isCCIp(value)) {
        return '游客'
      }
      return value
    }
  },

  async asyncData({ params, store }) {
    // 直播间状态查询&直播间是否需要登录
    // liveId
    // liveRoomId
    // livePlayStatus: NOT_START | STARTED | FINISHED |
    // login
    let liveStatus = await axios({
      method: "get",
      url: `${appBaseUrl}/getLiveStatus`,
      params: {
        liveId: params.id
      }
    })
      .then(res => {
        let data = res.data;
        if (data.status == 200) {
          return data.result
        }
      })
      .catch(e => {})

    let liveInfo;

    // 根据直播id获取直播间信息
    liveInfo = await axios({
      method: "get",
      // 虽然这里接口名叫ByRoomId, 但其实是直播id
      url: `${apiBaseUrl}/online/live/getLiveInfoByRoomId`,
      params: {
        liveId: params.id
      }
    })
      .then(res => {
        let data = res.data
        if (data.status == 200) {
          return data.result
        }
      })
      .catch(e => {})

    return {
      liveStatus,
      liveInfo
    }
  },


  created() {
    if (this.liveInfo) {
      this.titleName = this.liveInfo.info.name
    }
  },

  computed: {
    ...mapState({
      userId(state) {
        return state.userModule.user && state.userModule.user.userId
      }
    })
  },

  beforeMount() {
    this.orientationCheck(true)

    this.liveId = Number(this.$route.params.id)
    this.viewertoken = "anonymous"
    if (this.userId) {
      this.viewertoken = "boxuegu"
      this.loginUserId = this.userId;
    }

    // this.boundCheck = this.checkAll.bind(this)
    // window.addEventListener('orientationchange', this.boundCheck, false)

    if (!this.liveStatus) {
      this.showAbnormalStatus("直播异常...")
      return
    }

    // TODO:
    // 默认匿名用户直接通过
    this.isPassLoginCheck = true

    //直播需要登录时更改直播状态
    if(this.liveStatus.login){
      this.isLoginStatus = true
    }
    // 直播需要登录但用户未登录
    if (this.liveStatus.login && !this.userId) {
      this.isPassLoginCheck = false;
      localStorage.setItem("redirectUrl", `/live/${this.$route.params.id}`)
      this.$router.push("/loginRegister/phoneLogin")
      return
    }

    // 微信内置浏览器和QQ内置浏览器去除头部
    let userAgent = navigator.userAgent.toLowerCase()
    const isQQBuiltIn = userAgent.indexOf(" qq") > -1
    const isWXBuiltIn = userAgent.indexOf("micromessenger") > -1

    if (isQQBuiltIn || isWXBuiltIn) {
      this.showTitle = false
      this.videoStyle.marginTop = 0
    }

    // 直播异常...
    if (!this.liveInfo) {
      this.showAbnormalStatus("直播异常...")
      return
    }
  },

  mounted() {
    if (this.abnormalStatus || !this.isPassLoginCheck) return

    var shareUrl = window.location.href.split("#")[0]
    wxShare(shareUrl)
    var obj = {
      title: this.titleName, // 分享标题
      desc: this.liveInfo.info.description, // 分享描述
      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "", // 分享图标
      fail: function(res) {
        alert(JSON.stringify(res))
      }
    }
    shareInfo(obj)

    // 展现埋点
    let liveInformation = this.liveInfo.info
    zhugeTrack('H5_进入直播播放页', {
      '学科': liveInformation.menuName,
      '直播课程': '',
      '直播名称': liveInformation.name,
      '直播时间': liveInformation.startTime + '/' + liveInformation.endTime,
    })

    this.liveInit()

    this.$nextTick(() => {
      this.iScroll = new IScroll(this.$refs.contentContainer, {
        disableTouch: false,
        click: true,
        tap: true
      })
    })

    //问答
    this.QW()

    document.addEventListener('touchmove', function (e) { e.preventDefault() }, {
      capture: false,
      passive: false
    })

  },

  watch: {

    messageList(val, oldVal) {

      let prevContentContainer = this.$refs.contentContainer
      let isInBottom = false
      // y是负值
      if (Math.abs(this.iScroll.y - (prevContentContainer.clientHeight - prevContentContainer.scrollHeight)) < 10) {
        isInBottom = true
      }

      this.$nextTick(() => {
        this.iScroll.refresh()
        // 最后一条为自己的消息
        if (val[val.length - 1].isSelf || isInBottom) {
          setTimeout(() => {
            let curContentContainer = this.$refs.contentContainer
            this.iScroll.scrollTo(0, curContentContainer.clientHeight - curContentContainer.scrollHeight)
          }, 0)
        }
      })
    },

    lists:{
      deep:true,
      handler: function (val, oldVal) {
        let prevContentContainer = this.$refs.contentContainer
        let isInBottom = false
        // y是负值
        if (Math.abs(this.iScroll.y - (prevContentContainer.clientHeight - prevContentContainer.scrollHeight)) < 10) {
          isInBottom = true
        }
        this.$nextTick(() => {
          this.iScroll.refresh()
          // 最后一条为自己的消息
          if (val[val.length - 1].value || isInBottom) {
            setTimeout(() => {
              let curContentContainer = this.$refs.contentContainer
              this.iScroll.scrollTo(0, curContentContainer.clientHeight - curContentContainer.scrollHeight)
            }, 0)
          }
        })
      }
    }
  },

  methods: {
    playVideo() {
      this.isShowVideoBg = false
      let video = document.getElementsByTagName('video')[0];
      video.play()
      // 点击播放视频
      let liveInformation = this.liveInfo.info
      zhugeTrack('H5_进入直播播放页_点击播放按钮', {
        '学科': liveInformation.menuName,
        '直播名称': liveInformation.name,
        '直播时间': liveInformation.startTime + '/' + liveInformation.endTime,
      })
    },

    // 发送消息
    sendMessage() {
      if (this.inputMessage.trim()) {
        DWLive.sendPublicChatMsg(escape(this.inputMessage))
        this.inputMessage = ""
      }

      // this.messageList.push({ "isSelf": isSelf, "userid": "edeaab0661df4357b8d619ccd44484ff","username":"14.130.112.18","userrole":"student","useravatar":"","msg":this.inputMessage, "time":"","usercustommark":""})
    },

    inputFocus() {
      setTimeout(function() {
        let activeElement = document.activeElement
        if ("scrollIntoView" in activeElement) {
          activeElement.scrollIntoView()
        } else {
          activeElement.scrollIntoViewIfNeeded()
        }
      }, 200)
    },

    inputBlur() {
      setTimeout(function() {
        let activeElement = document.activeElement
        activeElement.scrollTop = 0
      }, 200)
    },

    showAbnormalStatus(msg = "") {
      this.abnormalStatus = msg
    },

    liveInit() {
      let self = this
      let liveInfo = this.liveInfo
      let info = liveInfo.info

      let ccUserId = liveInfo.userid
      let liveRoomId = info.liveRoomId
      DWLive.logout()

      // 直播初始化
      DWLive.init({
        userid: ccUserId,
        roomid: liveRoomId,
        viewername: this.userId || "",
        viewertoken: this.viewertoken
      })

      DWLive.onLiveTime = (j) => {
        if(j&&j.liveDuration == -1){
          this.isStartLive = false
        } else {
          this.isStartLive = true
        }
      }

      DWLive.onLiveStarting = (j) => {
        this.isStartLive = true;
        this.isShowVideoBg=true;
        this.showAbnormalStatus("")
      }

      DWLive.onLiveEnd = () => {
        this.showAbnormalStatus("直播已结束")
        this.isStartLive = false
      }

      DWLive.customFns = {
        getUserId(data) {
          self.viewerId = data.id;
        },

        // https://stackoverflow.com/questions/51837051/video-autoplay-on-safari-11
        // https://github.com/gnipbao/iblog/issues/11
        videoAppend() {
          if (self.liveStatus.livePlayStatus == 'STARTED') {
            this.isShowVideoBg = true
          }
          // 去除自动播放视频
          // let videoElem = self.$refs.videoContainer.children[0];

          // function playVideo() {
          //   return videoElem.play()
          // }
          // // 针对微信内置浏览器特殊处理
          // if (isWXBuiltIn(navigator.userAgent.toLowerCase())) {
          //   document.addEventListener('WeixinJSBridgeReady', playVideo, false)
          // } else {
          //   let promise = playVideo()
          //   if (promise !== undefined) {
          //     promise.then(function() {}).catch(function() {})
          //   }
          // }
        }
      }

      /*
        {"userid": "edeaab0661df4357b8d619ccd44484ff","username":"14.130.112.18","userrole":"student","useravatar":"","msg":"消息内容 ","time":"","usercustommark":""}
      */
      DWLive.onPublicChatMessage = msg => {
        this.publicChatMessage = true
        // 最多显示100条消息
        if (this.messageList.length >= 100) {
          this.messageList = this.messageList.slice(-99)
        }

        let msgObj = JSON.parse(msg);
        if (msgObj.userid === self.viewerId) {
          msgObj.isSelf = true
        }
        msgObj.uniqId = getUniqId()
        this.messageList.push(msgObj)
      }

      // 登录错误的回调 --- 操作失败
      DWLive.onLoginError = data => {
        this.$toast(data.msg)
      }

      // 登录成功的回调
      DWLive.onLoginSuccess = (j) => {
        // 只从boxuegu后台返的
        if (this.liveStatus.livePlayStatus === 'NOT_START') {
          this.showAbnormalStatus('直播等待中')
        }
        // else if (this.liveStatus.livePlayStatus  == 'FINISHED') {
        //   this.showAbnormalStatus('直播已结束')
        // }
      }

      // 收到通知（禁言）
      DWLive.onInformation = (j) => {
        if(this.isDisableSendMsg){
          this.$toast("直播还未开始，暂停提问");
        } else if(j) {
          this.$toast(j);
        } else {
          this.$toast("您已经被禁言！")
        }
      }
    },

    // 更换zoomin, zoomout类, 主要控制图标
    zoom() {
      if (this.checkRotated()) {
        this.resumeRotate()
      } else {
        this.beginRotate()
      }

      this.pageLiveClass.portrait = !this.pageLiveClass.portrait
      this.pageLiveClass.landscape = !this.pageLiveClass.landscape

      this.pageLiveClass.pagezoomin = !this.pageLiveClass.pagezoomin
      this.pageLiveClass.pagezoomout = !this.pageLiveClass.pagezoomout
    },

    checkRotated() {
      return (
        ((window.orientation == 0 || window.orientation == 180) &&
          this.pageLiveClass.landscape) ||
        ((window.orientation == 90 || window.orientation == -90) &&
          this.pageLiveClass.portrait)
      )
    },

    checkAll(init) {
      let pagelive = this.$refs.pagelive;
      let clientWidth = document.documentElement.clientWidth
      let clientHeight = document.documentElement.clientHeight

      pagelive.style.width = clientHeight + "px"
      pagelive.style.height = clientWidth + "px"
      pagelive.style.transform = "none"

      // 旋转前是横屏
      if (clientWidth > clientHeight) {
        this.setPortraitCls()
      } else {
        this.setLandscapeCls()
      }
    },

    // 仅初始时候调用
    orientationCheck() {
      if (Math.abs(window.orientation) === 90) {
        this.setLandscapeCls()
      } else {
        this.setPortraitCls()
      }
    },

    setPortraitCls() {
      this.pageLiveClass.portrait = true
      this.pageLiveClass.landscape = false

      this.pageLiveClass.pagezoomin = false
      this.pageLiveClass.pagezoomout = true
    },

    setLandscapeCls() {
      this.pageLiveClass.portrait = false
      this.pageLiveClass.landscape = true

      this.pageLiveClass.pagezoomin = true
      this.pageLiveClass.pagezoomout = false
    },

    inputTxt() {
      if (this.inputMessage.length > 50) {
        this.inputMessage = this.inputMessage.substr(0, 50)
      }
    },

    beginRotate() {
      let pagelive = this.$refs.pagelive
      let clientWidth = document.documentElement.clientWidth
      let clientHeight = document.documentElement.clientHeight

      pagelive.style.width = clientHeight + "px"
      pagelive.style.height = clientWidth + "px"
      pagelive.style.transformOrigin = "50vw 50vw"
      pagelive.style.transform = "rotate(90deg)"
    },

    resumeRotate() {
      let pagelive = this.$refs.pagelive
      let clientWidth = document.documentElement.clientWidth
      let clientHeight = document.documentElement.clientHeight

      pagelive.style.width = clientWidth + "px"
      pagelive.style.height = clientHeight + "px"
      pagelive.style.transform = "none"
    },

    touchStart(event) {
      const target = event.currentTarget
      const touchObj = event.touches[0]
      const clientRect = target.getBoundingClientRect()
      this.boundingRect = document.body.getBoundingClientRect()

      this.startDragPosition = { left: clientRect.left, top: clientRect.top }
      this.initialTouchPos = { x: touchObj.clientX, y: touchObj.clientY }
    },

    touchMove(event) {
      const target = event.currentTarget
      const touchObj = event.touches[0]
      const dx = touchObj.clientX - this.initialTouchPos.x
      const dy = touchObj.clientY - this.initialTouchPos.y

      let currentDragPosition = {
        left: this.startDragPosition.left + dx,
        top: this.startDragPosition.top + dy
        }

			currentDragPosition = getPosWithBoundaries(target.getBoundingClientRect(), this.boundingRect, currentDragPosition.left, currentDragPosition.top)

      // update element style
      this.layerStyle.left = currentDragPosition.left + 'px'
      this.layerStyle.top = currentDragPosition.top + 'px'

      function getPosWithBoundaries(elementRect, boundingRect, left, top) {
        const adjustedPos = { left, top }
        const { width, height } = elementRect
        const topRect = top
        const bottomRect = top + height
        const leftRect = left
        const rightRect = left + width
        if (topRect < boundingRect.top) {
          adjustedPos.top = boundingRect.top
        } else if (bottomRect > boundingRect.bottom) {
          adjustedPos.top = boundingRect.bottom - height
        }
        if (leftRect < boundingRect.left) {
          adjustedPos.left = boundingRect.left
        } else if (rightRect > boundingRect.right) {
          adjustedPos.left = boundingRect.right - width
        }
        return adjustedPos
      }
    },

    // 点击返回首页
    backHome() {
      if (this.liveInfo) {
        let liveInformation = this.liveInfo.info

        zhugeTrack('H5_直播教室页', {
          '直播名称': liveInformation.name,
          '直播ID': liveInformation.id,
          '直播日期': liveInformation.startTime,
          '直播学科': liveInformation.menuName
        })
      }

      window.location.href = `/?utm_source=zhiboH5_${this.liveId}`
      // this.$router.push({ path: '/', query: { 'utm_source': `zhiboH5_${this.liveId}` }})
    },

    //tab 切换
    talk(){
      this.contentStatus = 'talk';
      this.isReceived = false;
      this.publicChatMessage = false;
      this.$nextTick(() => {
        this.iScroll.refresh()
      })
    },

    question(){
      this.contentStatus = 'question';
      this.publicChatMessage = false;
      this.isReceived = false;
      this.$nextTick(() => {
        this.iScroll.refresh()
      })
    },

    //关闭问答提示
    closeHint(){
      this.isCloseHint = false;
      this.$nextTick(() => {
        this.iScroll.refresh()
      })
    },

    //切换群聊\私聊
    allOrOnly(){
      this.onlyFlag = !!this.onlyFlag ? 0 : 1;
      this.$nextTick(() => {
        this.iScroll.refresh()
      })
      if(this.onlyFlag){
        this.$toast('查看自己的问题')
      }else{
        this.$toast('查看全部的问题')
      }
    },

    //提问区提问
    async questionSub(){
      if(this.questionMessage.trim()){
        DWLive.sendQuestionMsg(escape(this.questionMessage)); // 发送问题
        this.questionMessage = ''
      }else if(this.isStartLive){
        this.$toast('请输入提问内容')
      }
      let liveInformation = this.liveInfo.info
      zhugeTrack('H5_直播间_提问区_提交按钮', {
        '学科': liveInformation.menuName,
        '直播名称': liveInformation.name,
        '直播时间': liveInformation.startTime + '/' + liveInformation.endTime,
      })
    },

    questionTxt(){
      if (this.questionMessage.trim().length > 300) {
        this.$toast('字数不超过300字')
      }
    },

    //问答
    QW() {
      let _this = this
      let question = null
      let answer = null

      //回显问题提问内容
      DWLive.onQuestion = function(question){
        question = JSON.parse(question);
        if(_this.isLoginStatus){
          if((_this.userId != question.value.userId)&&(!!question.value.isPublish)){
            _this.isReceived = false
          }
        }else{
          _this.isReceived = true
        }

        question.value.triggerTime = question.value.triggerTime.split(' ')[1].substr(':',5)
        Object.assign(question, {
          isPrivate: 1,
          isPublish: 0,
          answer: []
        })
        _this.lists.push(question);
      }

      //问题回答内容
      DWLive.onAnswer = function(answer) {

        if(!_this.isLoginStatus){
          _this.isReceived = true;
        }

        answer = JSON.parse(answer);
        answer.value.triggerTime = answer.value.triggerTime.split(' ')[1].substr(':',5)
        let isPrivatA = answer.value.isPrivate
        _this.lists.forEach(item=>{
          if(item.value.id == answer.value.questionId){
            if(isPrivatA == 0){
              item.isPrivate = 0
            }
            item.answer.push(answer.value)
            if(answer.value.isPrivate === 0 || (_this.userId==item.value.userId && answer.value.isPrivate === 1)){
              _this.isReceived = true;
            }
          }
        })
      }

      //发布问题的回调
      DWLive.onQaPublish = function(publish) {
        let questionId = publish.value.questionId
        _this.lists.map(item=>{
          if(item.value.id == questionId){
            item.isPublish = 1
            if(item.value.userId!==_this.userId){
              _this.isReceived = true
            }
          }
        })
      }
    }

  },

 // beforeDestroy() {
    //console.log('beforeDestroy')
  // window.removeEventListener('orientationchange', this.boundCheck, false)
  //  DWLive = null
  //}
}
</script>

<style lang="stylus">
html, body
  height: 100%
  overflow: hidden

#__nuxt,
#__layout
  height: 100%
</style>
<style lang="stylus">
@import '//at.alicdn.com/t/font_229347_90eo59p1i6f.css'
@import '../../static/css/index'
@import './_id'
</style>
