<template>
    <div class="class">
        <div class="class-page">
            <div class="class-left">
                <ul>
                    <li v-for="item in classList" @click="getclass(item.id)" :class="[item.id == listid?classA:classB]">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
            <div class="class-right">
                <div class="topBox">
                    <div class="imgBox">
                        <img :src="classLi.imgUrl" alt="">
                    </div>
                    <div class="title">• {{classLi.name}} •</div>
                    <ul class="imglistBox">
                        <li v-for="item in classLi.listArr">
                            <div class="listimgBox"><img :src="item.url" alt=""></div>
                            <div class="imgTitle">{{item.title}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Tab></Tab>
    </div>
</template>
<script>
import Tab from "../components/Tab"
export default {
    components:{
      Tab
    },
    name:'class',
    data(){
        return{
            classA:"boldfont",
            classB:'',
            listid:0,
            classList:[
                {title:'家居',id:0},
                {title:'文具',id:1},
                {title:'数码',id:2},
                {title:'玩乐',id:3},
                {title:'餐厨',id:4},
                {title:'美食',id:5},
                {title:'服装',id:6},
                {title:'鞋包',id:7},
                {title:'配饰',id:8},
                {title:'美护',id:9},
                {title:'出行',id:10},
                {title:'图书',id:11},
                {title:'艺术',id:12},
                {title:'水具',id:13},
                {title:'运动',id:14},
                {title:'情趣',id:15}
            ],
            ClassContent:[
                {
                    name:'家居分类',
                    imgUrl:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29359.png',
                    listArr:[
                        {title:'家具',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29422.png'},
                        {title:'居家日用',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29425.png'},
                        {title:'装饰摆件',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29429.png'},
                        {title:'香蒸气氛',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29427.png'},
                        {title:'空气净化',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29426.png'},
                        {title:'收纳整理',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30408.png'},
                        {title:'床品布艺',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29419.png'},
                        {title:'家庭清洁',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29423.png'},
                        {title:'儿童家居',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29421.png'},
                        {title:'灯具',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29420.png'},
                        {title:'家用电器',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29424.png'},
                        {title:'植物花器',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29428.png'}
                    ]
                },
                {
                    name:'文具分类',
                    imgUrl:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29365.png',
                    listArr:[
                        {title:'办公用品',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29450.png'},
                        {title:'纸本',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29455.png'},
                        {title:'笔具',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29451.png'},
                        {title:'书签',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29453.png'},
                        {title:'红包',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29452.png'},
                        {title:'台历挂历',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29454.png'}
                    ]
                },
                {
                    name:'数码分类',
                    imgUrl:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29362.png',
                    listArr:[
                        {title:'耳机',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29468.png'},
                        {title:'音箱',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29473.png'},
                        {title:'手机壳',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29469.png'},
                        {title:'手机配件',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29470.png'},
                        {title:'移动电源',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29472.png'},
                        {title:'智能设备',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29474.png'},
                        {title:'电脑配件',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29467.png'},
                        {title:'车载配件',url:'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29466.png'}
                    ]
                }
            ],
            classLi:{}
        }
    },
    created(){
        
        this.classLi = this.ClassContent[0]
    },
    methods:{
        getclass(id){
            this.listid = id
            this.classLi = this.ClassContent[id]
        }
    }
}
</script>
<style lang="less" scoped>
.class{
    height:100%;
    .class-page{
        width:100%;
        height:100%;
        .class-left{
            float: left;
            width:2.7rem;
            height:calc(100% - 1.6rem);
            overflow-y: scroll; 
            ul{
                width:100%;
                height: 100%;
                li{
                    height:1.32rem;
                    line-height: 1.32rem;
                    text-align: center;
                    background:#dadada;
                    // font-weight: bold;
                    span{
                        font-size:.4rem;
                    }
                }
                .boldfont{
                    span{
                        font-weight: bold;
                    }
                }
            }
        }
        .class-right{
            width:7.3rem;
            height:calc(100% - 1.6rem);
            float:left;
            background:#eeeeee;
            overflow-y: scroll; 
            .imgBox{
                width:6.653333rem;
                height:3.1111rem;
                margin:.33rem 0 0 .33rem;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .title{
                margin-top:.8rem;
                text-align: center;
                font-size:.4rem;
                color:#666666;
            }
            .imglistBox{
                li{
                    float: left;
                    margin:.65rem 0 0 .5rem;
                    width:1.8rem;
                    height:2.4rem;
                    .listimgBox{

                        height:1.8rem;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .imgTitle{
                        font-size:.4rem;    
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>