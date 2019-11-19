<template>
  <div class="seeContract">
    <TitleBack titleName="查看合同"></TitleBack>
    <div class="iframe_pdf_box">
      <iframe class="iframe_pdf" :src="pdfUrl"></iframe>
    </div>
    <a class="download" @click="downloadClick">下载</a>
  </div>
</template>

<script>
import TitleBack from "~/components/titleTemp2/titleBack";
import axios from 'axios'
import { contractApi } from '~/api/index'
import { pdfServe, onlineUrl } from '../../../api/apiurl.js'
import { zhugeTrack } from '~/plugins/filter'
export default {
  name: 'SeeContract',
  components: {
    TitleBack
  },
  data() {
    return {
      pdfUrl: '',
      contractNo: '',
      returnPdfUrl: ''
    }
  },
  methods: {
    async _initState() {
      await contractApi.getSeeContract({
        contractNo: this.contractNo,
        sign: localStorage.getItem('sign')
      })
      .then((re) => {
        if (re.data.status == 200) {
          this.pdfUrl = pdfServe + re.data.result.contractUrl
          this.returnPdfUrl = re.data.result.contractUrl
        } else if (re.data.status == 401) {
          this.$router.push('/loginRegister/login')
        } else {
          Toast(re.data.message + '请联系客服');
        }
      })
    },
    downloadClick() {
      zhugeTrack('H5_合同页_点击按钮', {
        '按钮名称': '下载合同'
      })
      window.location.href = onlineUrl + 
      '/newAttachment/download?fileUrl=' + 
      encodeURIComponent(this.returnPdfUrl) + 
      '&fileName=' + encodeURIComponent(this.contractNo) + '.pdf';
    }
  },
  created () {
    this.contractNo = this.$route.params.seeContract
    this._initState()
  }
}
</script>


<style lang="less" scoped>
@import "../../../static/css/variable.less";
.seeContract{
  margin-top: unit(100/@u, @uu);
  .iframe_pdf_box{
    width: 100%;
    height: 100vh;
    .iframe_pdf{
      width: 100%;
      height: 100%;
    }
  }
  .download{
    width: 100%;
    background: #38ADFF;
    color: #fff;
    font-size: unit(32/@u, @uu);
    text-align: center;
    line-height: unit(88/@u, @uu);
    position: fixed;
    bottom: 0;
  }
}
</style>

