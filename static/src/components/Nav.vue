<template>
  <div class="nav-list-container">
    <!--<div class="nav-list">-->
      <slot name="navName"></slot>
      <ul class="nav-content">
        <li><router-link v-for="(item,index) in navoptions" :key="index" :to=item.href @click.native="navclick(item.name)">{{ item.label }}</router-link></li>
      </ul>
    <!--</div>-->
    <slot name="right-model"></slot>
  </div>
</template>
<script>
  export default {
    props:{
      navoptions: Array
    },
    methods:{
      navclick(name){
        this.$emit('onnavlistclick',name);
      }
    }
  }
</script>
<style scoped>
  .nav-list-container {display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:0 4px 0 11px;height: 34px;line-height: 34px;}
  /*.nav-list{display:flex;justify-content: flex-start}*/
  /* .nav-content{display:flex;flex-direction:row;} */
  .nav-content li a{padding-bottom:7px;margin:0 9px;font-size:13px;font-weight:400;color:rgba(38,38,40,1);}
  .nav-content li a:hover{font-weight:500;color:#145FD2;}
  .nav-content li a.is-active{font-weight:600;border-bottom:2px solid #145FD2;color:#145FD2;}
  .btn{padding:0;width:120px;height:27px;background:rgba(58,128,236,1);border-radius:2px;border:none;font-size:13px;font-weight:600;color:rgba(255,255,255,1);cursor:pointer}
</style>
