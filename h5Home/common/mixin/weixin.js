import Vue from 'vue'
import { wxShare, shareInfo } from '~/plugins/filter'

export const wxMixin = {
  // data() {
  //   return {
  //     // 微信分享标题
  //     wxTitle: '',
  //     // 微信分享描述
  //     wxDesc: ''
  //   }
  // },

  methods: {
    weixinShare(title, description, imgUrl = '') {
      imgUrl = imgUrl || document.location.origin + '/web/images/defaultImg/share.png'
      
      let shareUrl = window.location.href.split("#")[0]
      wxShare(shareUrl)

      let obj = {
        title: title, // 分享标题  
        desc: description, // 分享描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        fail: function(res) {
          // alert(JSON.stringify(res))
        }
      }
      shareInfo(obj)
    }
  }
}