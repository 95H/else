<template>
    <div class="Home">

    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name:'Home',
    data(){
        return{
            isOk:true,
            swiperData:[],
            AlertImgUrl:'',
            taobaoUrl:''
        }
    },
    created(){

        this.IndexImg(this).then(res=>{
            this.AlertImgUrl = res.imgUrl
            this.taobaoUrl = res.url
        })
    },
    methods:{
        ...mapActions([
          "IndexImg"
        ]),
        close(){
            this.isOk = false;
        },
        open(){
            window.location.href = this.taobaoUrl
        }
    }
}
</script>
<style lang="less" scoped>
    .popupBox{
        width:100%;
        height:100%;
        position: fixed;
        top:0;
        left:0;
        background:rgba(0,0,0,.5);
        .alertBox{
            width:80%;
            height:13rem;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            img{
                width:100%;
                height:100%;
            }
        }
        .closeBtn{
            background:#fff;
            border:1px solid #fff;
            border-radius: 5px;
            height:1.3rem;
            width:2rem;
            position: absolute;
            bottom:10%;
            left:50%;
            transform: translate(-50%,-50%);
            font-size:.186667rem;
        }
    }
</style>
