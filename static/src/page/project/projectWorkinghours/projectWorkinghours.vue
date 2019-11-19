<template>
    <div class="projectWorkinghours">
        <div class="zlpg-content">
            <div class="zlpg-content-header">
                <ul class="list-group">
                    <li><span>项目工时</span></li>
                    <li v-for="(item,index) in gsMenu" :key="index"><router-link :to="'/zlpg'+item.functionUrl">{{item.functionName}}</router-link></li>
                    <!-- <li><router-link to="projectWorkinghoursQuery">工时查询</router-link></li> -->
                </ul>
            </div>
        </div>
        <div class="projectWorkinghours-view">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            gsMenu : this.$store.state.projectMenu.child[localStorage.getItem('index')].children
        }
    },
    created(){

    },
    methods:{
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.projectWorkinghours{
    .list-group{text-align: center;line-height: 34px;
        li{
          a{position: relative;}
          a.is-active{display:block;color: #145FD2;}
          a.is-active:after{content:"";left:0;position: absolute;bottom: -1px; width: 100%;height: 2px;background: #145FD2;}
          a:hover{display:block;color: #145FD2;}
          }
        li:first-child>span{position: relative;}
        li:first-child>span:after{content:"";position: absolute;right: -14px;top: -1px;height: 20px;width: 2px;background: #C8C8C8;}
        li:nth-child(2){margin-left:30px;}
    }
    .projectWorkinghours-view{
        padding: 15px 20px;
        box-sizing: border-box;
        background: #fff;
    }
}
</style>
