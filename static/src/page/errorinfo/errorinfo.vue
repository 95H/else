<template>
    <div class="errorinfo">
        <div class="errorinfo-bg">
            <img src="/static/img/404bg.png" alt="">
            <div class="errorinfo-cont">
                <div class="errorinfo-h">很抱歉，您访问的页面已失联！</div>
                <!-- <div class="errorinfo-text">5秒后自动跳转到主页，如没有跳转请点击下方“跳到主页”按钮。</div> -->
                <div class="errorinfo-btn"><button class="search-btn" @click="jumpHome">跳到主页</button></div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    methods:{
        jumpHome(){
            this.$router.push({
                path: '/zlpg'
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
    .errorinfo{
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        .errorinfo-bg{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            img{
                width: 100%;
            }
        }
        .errorinfo-cont{
            position: absolute;
            left: 0;
            bottom: 20%;
            width: 100%;
        }
        .errorinfo-h{
            text-align:center;
            font-size:18px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:#262628;
            line-height:25px;
            
        }
        .errorinfo-text{
            text-align:center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#262628;
            line-height:20px;
        }
        .errorinfo-btn{
            text-align: center;
            margin-top: 23px;
        }
    }
</style>


