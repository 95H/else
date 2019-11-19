<template>
  <div>
    <div class="enlargeImg" v-for="(item,index) in ImgSrc" :key="index">
      <img @click="changeImg(item.src)" :src='item.src' alt />
    </div>
    <div id="tbody"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ImgSrc: [
        {
          src: require("../assets/logo.png")
        },
        {
          src: require("../assets/logo.png")
        },
        {
          src: require("../assets/logo.png")
        }
      ]
    };
  },
  methods:{
      changeImg(src){
          let body = document.querySelector('#tbody')
          let mask = document.createElement('div')
          let img = document.createElement('img')
          img.src=src
          mask.classList.add('mask')
          this.setStyle(mask,img)
          this.setEventListener(body,mask)
          img.onload=function(){
              mask.appendChild(img)
              body.appendChild(mask)
          }
      },
      setStyle(mask,img){
          mask.style.position='fixed';
          mask.style.top='0'
          mask.style.bottom='0'
          mask.style.left='0'
          mask.style.right='0'
          mask.style.background='rgba(0,0,0,0.8)'
          img.style.position='absolute'
          img.style.top='50%'
          img.style.left='50%'
          img.style.width='100%'
          img.style.transform='translate(-50%,-50%)'
      },
      setEventListener(body,mask){
          mask.addEventListener('click',function(){
              body.removeChild(mask)
          })
      }
  }
};
</script>
<style lang="css" scoped>
.enlargeImg {
  width: 100px;
  height: 100px;
  border: 1px solid pink;
}
.enlargeImg img {
  width: 100px;
  height: 100px;
}
</style>