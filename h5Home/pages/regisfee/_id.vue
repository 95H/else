<template src="./_id.html"></template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { authApi, regisfeeApi } from '~/api/index'
import { setCookie, zhugeTrack } from '~/plugins/filter'
import { checkPhone, subString, escape } from '~/common/utils/index'
import { wxMixin } from '~/common/mixin/index'
import CountDown from '~/components/common/CountDown'
import SimpleModal from '~/components/common/SimpleModal'

export default {
  validate({ params }) {
    let valid = false
    // eg.: sIBvd&utm_source=duanxin
    let id = params.id
    let realId = id.split('&')[0]

    if (realId && realId.length == 5) {
      valid = true
    }

    return valid
  },

  async asyncData({ params }) {
    let messageInfo
    let id = params.id
    let realId = id.split('&')[0]

    try {
      let { data } = await regisfeeApi.getMessageInfo(realId)
      messageInfo = data
    } catch (err) {}
    
    return {
      messageInfo: messageInfo || { message: '网络异常' }
    }
  },

  mixins: [wxMixin],

  data() {
    return {
      // 当前获取短信验证码是否为禁用状态
      vcodeDisabled: false,
      // 验证码的时间
      secs: 90,
      phoneNumber: '',
      vcodeValue: '',
      // 预报名费的通知id
      messageId: escape(this.$route.params.id.split('&')[0]),
      isShowModal: false,
      paying: false,
      modalTxt: ''
    }
  },

  components: {
    CountDown,
    SimpleModal
  },

  beforeMount() {
    let messageInfo = this.messageInfo

    if (messageInfo.result) {
      this.phoneNumber = messageInfo.result.mobile
    }
  },

  mounted() {
    // messageInfo始终是一个对象, 模板取其属性不会报错
    let messageInfo = this.messageInfo
    
    if (messageInfo.status === 200) {
      this.messageInfo = messageInfo.result
      
      this.weixinShare('学习要趁早，报名快点我', `预付${messageInfo.result.courseName}课程报名费，可先抢占优惠名额，交学费也要替你省`)

      // 展现埋点
      zhugeTrack('H5_进入预报名费页', {
        '课程ID': this.messageInfo.courseId,
        '课程类型': this.messageInfo.courseType,
        '课程名称': this.messageInfo.courseName,
        '报名费金额': this.messageInfo.amount
      })
    
    // 410 报名消息已失效
    } else if (messageInfo.status === 410) {
      this.messageInfo = messageInfo.result
      this.showModal('页面链接已失效，有问题请联系咨询老师！')
    // 423 课程已下架
    } else if (messageInfo.status === 423) {
      this.messageInfo = messageInfo.result
      this.showModal(messageInfo.message)
    // 404 记录不存在或已删除
    } else if (messageInfo.status === 404) {
      this.showModal(messageInfo.message)
    } else {
      this.$toast(messageInfo.message)
    }

  },

  computed: {
    vcodeTxt() {
      if (!this.vcodeDisabled) {
        return "获取验证码"
      } else if (this.secs == 90) {
        return "发送中..."
      } else {
        return `${this.secs}s`
      }
    },

    ...mapGetters({
      sign: "userSign"
    })
  },
  
  filters: {
    subString(v) {
      if (v) {
        return subString(v, 44)
      }
    }
  },

  methods: {
    queryVcode() {
      if (this.phoneNumber === "") {
        this.$toast("请输入手机号")
        return
      } else if (this.phoneNumber !== "" && !checkPhone(this.phoneNumber)) {
        this.$toast("手机格式错误")
        return
      }
      if (!this.vcodeDisabled) {
        this.vcodeDisabled = true
        // 获取验证码
        authApi
          .getMobileCode({
            phone: this.phoneNumber,
            vtype: 1
          })
          .then(res => {
            let data = res.data
            if (data.success) {
              // 验证码倒计时
              this.vocdeTimer()
            } else {
              this.$toast(data.errorMessage)
              this.vcodeDisabled = false
            }
          })
          .catch(err => {
            this.$toast('网络异常')
          })
      }
    },

    vocdeTimer() {
      this.vcodeTimer = setTimeout(() => {
        --this.secs
        if (this.secs > 0) {
          this.vocdeTimer()
        } else {
          this.vcodeDisabled = false
          this.secs = 90
          clearTimeout(this.vcodeTimer)
        }
      }, 1000)
    },

    /**
     * 支付预报名费
     */
    async payRegisFee() {
      if (this.paying) {
        return
      }

      if (this.phoneNumber === "") {
        return this.$toast("请输入手机号")
      } else if (this.phoneNumber !== "" && !checkPhone(this.phoneNumber)) {
        return this.$toast("手机格式错误")
      }

      if (this.vcodeValue == "") {
        return this.$toast("请输入验证码")
      } else if (isNaN(+this.vcodeValue) || this.vcodeValue.length !== 6) {
        return this.$toast("验证码错误")
      }

      this.paying = true

      let messageInfo = this.messageInfo

      let saveData = {
        mobile: this.phoneNumber,
        messageId: this.messageId,
        code: this.vcodeValue,
        source: 3
      }

      try {
        let { data } = await regisfeeApi.saveDeposit(saveData)

        this.paying = false

        // 417 存在相同课程的有效预报名订单
        if (data.status === 417) {
          this.$toast({
            message : '你已存在一门同样课程的报名费订单',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push('/myregisfee')
          }, 1000)

          this.$store.commit("setUserByRegisFee", data.result.loginRst)
          return
        // 423 存在相同课程的有效订单
        // 424 课程已下架
        } else if (data.status !== 200) {
          this.$toast(data.message)
          return
        }

        this.paying = true
        let result = data.result
        this.$store.commit("setUserByRegisFee", result.loginRst)
        window.location.href = result.redirectUrl + `&sign=${this.sign}`

      } catch (err) {}
    },

    showModal(txt) {
      this.modalTxt = txt
      this.isShowModal = true
    },

    modalClose() {
      window.location.href = '/'
    }
  }
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

<style lang="stylus" scoped>
@import '../../static/css/index'
@import './_id'
</style>