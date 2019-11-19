<template>
    <div class="scrollTab" :class="{pr31:isSelectM}">
        <div class="scrollTab-wrap" >
            <div class = "scroll-tab-con">
                <template v-if="!isSelectM">
                    <div ref="scrollTab" class = "scroll-tab">
                        <div v-for="(item,index) in tabArr" 
                        :key="index" class="scroll-tab-item" 
                        @click="tabClick(item,index)" 
                        :class="{selected:index == active,lightAsh:item.count<=0}">
                            {{item.name}}
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div ref="scrollTab" class ="scroll-tab" v-if="radio==1||radio==2">
                        <div v-for="(item,index) in tabArr" 
                            :key="index" class="scroll-tab-item" 
                            @click="tabClick(item,index)" 
                            :class="{selected:index == active,lightAsh:item.count<=0}">
                                {{item.name}}
                        </div>
                    </div>
                    <div ref="scrollTab" class ="scroll-tab" v-if="radio==3">
                         <div v-for="(item,index) in tabArr" 
                        :key="index" class="scroll-tab-item" 
                        @click="tabClick(item,index)" 
                        v-if="item.status==1"
                        :class="{selected:index == active,lightAsh:item.count<=0}">
                            {{item.name}}
                        </div>
                    </div>
                </template>
            </div>
            <span class="scroll-tab-btn scroll-tab-btn-left"  @click="moveTab('before')" :class="{hierarchy:showArrow}"><i class="el-icon-arrow-left" ></i></span>
            <span class="scroll-tab-btn scroll-tab-btn-right"  @click="moveTab('after')"><i class="el-icon-arrow-right" ></i></span>
        </div>
        <el-popover
            class="openSelect"
            v-if="isSelectM"
            placement="top-end"
            width="288"
            v-model="popoverIsShow"
            trigger="click"
            @show="focusInp()">
            <div class="scrollTabSearch">
                <span class="leftSearch">搜索：</span>
                <el-input v-model="searchVal" placeholder="请输入关键字" @keyup.native="isDefaultList" ref="searchInpt"></el-input>
                <!-- <el-button type="primary" size="mini" @click="getSearchData">搜索</el-button> -->
            </div>
           
            <div class="clear search-tab">
                <p class="search-tab-hd">
                    <el-radio v-model="radio" label="1" @change="showAll()">全部展示</el-radio>
                    <el-radio v-model="radio" label="2" @change="showPart()" v-if="isFullPart">仅展示有数据</el-radio>
                    <el-radio v-model="radio" label="3" @change="showCustom()" v-if="isFullPart">自定义展示</el-radio>
                </p>
                <span class="refresh-cont" @click="reset()" v-if="resetFlag">
                    <i class="el-icon-refresh" :class="{refresh:isRefresh}"></i>
                    重置
                </span>
            </div>
            <el-scrollbar>
                <ul class="scrollTabUl" v-if="radio==3">
                    <li v-for="(item,index) in tabArr" :key="index" v-if="item.isShow"  :class="{selected:index == active}" :data-item="JSON.stringify(item)">
                        <el-checkbox 
                        v-model = "item.isChecked" 
                        @change="checkedSheet(item,index)" 
                        :disabled="isLast&&item.isChecked">
                        </el-checkbox>
                        <span class="sheet-name" @click="setTab(item)" :class="{ban:!item.isChecked,active:$store.state.curSheetName==item.name}">{{item.name}}</span>
                    </li>
                </ul>
                <ul class="scrollTabUl" v-else>
                    <li v-for="(item,index) in tabArr" :key="index" v-if="item.isShow"  :class="{selected:index == active}" :data-item="JSON.stringify(item)">
                        <span class="sheet-name" @click="setTab(item)" :class="{active:$store.state.curSheetName==item.name}">{{item.name}}</span>
                    </li>
                </ul>
            </el-scrollbar>
            <span slot="reference"><i class="el-icon-arrow-up"></i></span>
        </el-popover>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                count:0,
                active:0,
                actived:true,
                isShow:true,
                marginLeft:0,
                searchVal:"",
                radio: '1',
                popoverIsShow:false,
                isRefresh:false,
                resetFlag:false, 
            }
        },
        props: {
            tabArr:Array,
            isSelectM:Boolean,
            isFullPart:Boolean,
        },
        mounted(){
            this.setTabArr();
            for(var i = 0;i>this.tabArr.length;i++){
                if(this.tabArr[i].status==1){
                    this.active = i;
                    break;
                }
            }
            //this.active = ;
        },
         computed:{
             isLast(){
                 var arr = [];
                 var flag =false;
                 for(var i =0;i<this.tabArr.length;i++){
                     if(this.tabArr[i].status==1){
                         arr.push(this.tabArr[i]);
                     }
                 }
                 arr.length==1?flag=true:flag=false;
                 return flag;
             },
             showArrow(){
                 return this.$store.state.hierarchy
             }
         },
        methods:{
            tabClick(item,index){
                this.active = index;
                this.$emit('tabClick', item);
                console.log()
            },
            //左右移动
            moveTab(moveTabType){
                if(moveTabType==="before"){
                     if(this.marginLeft>-200){
                        this.marginLeft=0;
                    }else{
                        this.marginLeft+=200;
                    }
                }else if(moveTabType==="after"){
                   let namelen=0;
                   var num = 0;
                   var _this = this;
                   
                    for(var i = 0 ; i < this.tabArr.length; i++){
                      if (this.radio == 3 && this.tabArr[i].name && this.tabArr[i].status==1) {
                          namelen=(namelen+this.tabArr[i].name.length);
                          num++;
                      } else if (this.radio == 2 && this.tabArr[i].name && this.tabArr[i].count > 0) {
                          namelen=(namelen+this.tabArr[i].name.length);
                          num++;
                      } else if (this.radio == 1 && this.tabArr[i].name) {
                          namelen=(namelen+this.tabArr[i].name.length);
                          num++;
                      }
                   }
                    if(num<5)return;
                	let len=namelen*13+num*22-200;
                	this.marginLeft-=200;
                	if(this.marginLeft<=-len){
                		this.marginLeft=-len+200;
                	} 	     
                }
                this.$refs.scrollTab.style.marginLeft=this.marginLeft+"px"
            },
            //搜索
            getSearchData(){
                this.searchVal=this.searchVal.replace(/\s+/g, "");
                if(this.searchVal){
                    for (let i = 0; i < this.tabArr.length; i++) {
                        var tab=this.tabArr[i];
                        if(tab.name&&tab.name.indexOf(this.searchVal)!=-1){
                            this.$set(tab,"isShow",true);
                           
                        }else{
                            this.$set(tab,"isShow",false)
                            
                        }
                    }
                }else{
                    this.setTabArr()
                }
                
            },
            //初始化搜索条件
            setTabArr(){
                for (let i = 0; i < this.tabArr.length; i++) {
                    this.$set(this.tabArr[i],"isShow",true)
                }
            },
            //弹框选中
            setTab(item,scrollDis){
               if(!item.isChecked&&this.radio==3) return;
                var index;
                for(var i = 0;i<this.tabArr.length;i++){
                    if(item.name==this.tabArr[i].name){
                        index = i;
                        break;
                    }
                }
               
                if(!scrollDis){
                    this.tabClick(item,index);
                }
                var arr = [];
                var _this = this;
                
                for(var j =0;j<this.tabArr.length;j++){
                      //全部数据
                    if(this.radio==1){
                        arr.push(this.tabArr[j]);
                    }
                    //仅展示有数据
                    if(this.radio==2&&this.tabArr[j].count>0){
                        arr.push(this.tabArr[j]);
                    }
                    //自定义数据
                    if(this.tabArr[j].status==1&&this.radio==3){
                        arr.push(this.tabArr[j]);
                    }
                  

                }
                var idx;
                for(var i = 0;i<arr.length;i++){
                    if(item.name==arr[i].name){
                        idx = i;
                        break;
                    }
                }
                this.marginLeft=0;
                this.popoverIsShow=false;
                for(var i = 0;i<this.tabArr.length;i++){
                    for(var j= 0;j<idx;j++){
                        if(this.tabArr[i].name==arr[j].name){
                            this.marginLeft-=this.$refs.scrollTab.childNodes[i].offsetWidth;
                        }
                    }
                }
               

               console.log(_this.marginLeft);
                // for (let i = 0; i < idx; i++) {

                //     this.marginLeft-=this.$refs.scrollTab.childNodes[i].offsetWidth;
                // }
                this.$refs.scrollTab.style.marginLeft=this.marginLeft+"px";
            },
            initMarginLeft(){
                this.$refs.scrollTab.style.marginLeft = 0;
            },
            //搜索框内容为空 默认列表回显&&键盘触发搜索
            isDefaultList(event){
                var _this = this;
                this.getSearchData();
                if(this.searchVal===""){
                    this.setTabArr()
                }
                //如果是回车键并且只收索到一条的时候直接跳转
                if(event.keyCode==13){
                    console.log(_this.tabArr);
                    var showArr =[];
                    for(var i=0;i<this.tabArr.length;i++){
                        if(this.tabArr[i].isShow){
                            showArr.push(this.tabArr[i]);
                        }
                    }
                   // var item = JSON.parse($('.scrollTabUl li').eq(0).attr('data-item'));
                   if(showArr.length==1){
                       var obj = showArr[0];
                        _this.setTab(obj);
                   }
                   

                }
            },
            /**单选框 */
            checkedSheet(item,idx){
               this.$parent.checkedSheet(item,idx) 
            },
            /**展示全部数据 */
            showAll(){
               this.searchVal= ''; 
               this.setTabArr();
               this.$parent.showAll();   
               this.resetFlag = false;  
            },  
            /**展示有数据的科目 */ 
            showPart(){
               this.searchVal= ''; 
               this.setTabArr();
               this.$parent.showPart(); 
               this.resetFlag = false;

            },
            /**自定义*/
            showCustom(){
                this.searchVal= ''; 
                this.setTabArr();
                this.$parent.showCustom(); 
                this.resetFlag = true;
            },
            /**重置 */
            reset(){
                this.$parent.reset();
            },
            //pop显示的时候
            focusInp(){
               this.$nextTick(()=>{
                   this.$refs.searchInpt.focus();
               })
                
            }    
        },
        watch:{
            tabArr:{
                handler:function(newD,oldD){
                    this.tabArr = newD;
                    if(newD.length>0 && newD[0].isShow===undefined){
                        this.active=0;
                        this.setTabArr()
                    }
                },
                deep:true
            }
            
        }
    }
</script>


<style rel="stylesheet/scss" lang='scss' scoped>
.scrollTab{
    position:relative;
    .scrollTab-wrap{
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        position:relative;
        padding: 0 30px;
       // z-index:100;  //下方tab切换被遮
        .scroll-tab-btn{display:block;width:30px;height:25px;
            >i{width:30px;height:25px;line-height:25px;font-weight: bold;font-size: 18px;color: #A9A9A9;background:#fff;display: inline-block;text-align: center;border:1px solid #ECECEC;}
            .actived{color: #fff;background:#5FA9EC;}
           
        }
        .el-icon-arrow-left:hover,
        .el-icon-arrow-right:hover{background:#5FA9EC;color: #fff;}
        
        .scroll-tab-btn-left{
            position: absolute;
            left: 0;
            top: 0;
        }
        .scroll-tab-btn-right{
            position: absolute;
            right: 0;
            top: 0;
        }
        .scroll-tab-con{height: 25px; position: relative;overflow: hidden;border-bottom:1px solid #ECECEC;border-top:1px solid #ECECEC;cursor: pointer;
            .scroll-tab{height: 25px;word-break: keep-all;white-space: nowrap;background: #F6FAFF;display:flex;margin-left:0;transition: margin-left 1s;
                .scroll-tab-item{height: 25px; line-height:25px;padding:0 15px;padding: 0 10px;border-left: 1px solid #F6FAFF; border-right: 1px solid #F6FAFF;font-size:13px;text-align: center;box-sizing: border-box;
                    &.lightAsh{color:#909090;}
                }
                .selected{height: 25px;background: #5FA9EC; border-left: 1px solid #ECECEC; border-right: 1px solid #ECECEC;color: #fff !important;border-bottom: none;font-weight: bold;}
                 .scroll-tab-item:hover{
                     height: 25px;background: #5FA9EC; border-left: 1px solid #ECECEC; border-right: 1px solid #ECECEC;color: #fff;border-bottom: none;font-weight: bold;
                 }
            }
        }
    }
    .openSelect{
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        width: 30px;
        height: 25px;
        line-height:25px;
        color: #A9A9A9;
        background:#fff;
        display: inline-block;
        text-align: center;
        border:1px solid #ECECEC;
        /deep/ i{
            color: #A9A9A9;
            font-weight: bold;
            font-size: 18px;
            width: 100%;
            height: 98%;
            &:hover{color: #fff;background:#5FA9EC;}
        }
       
    }
}
.scroll-tab-item:hover{
color: #fff;background:#5FA9EC;
}
.pr31{
    padding-right: 30px;
}
.scrollTabSearch{
   // display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 10px;
}
.scrollTabSearch .el-input{
    width: 226px;
}
.leftSearch{
    padding-left:7px;
   // text-align: center;
    // display: table-cell
    // vertical-align：middle;
}
/deep/.scrollTabUl li{
    &:hover{color: #262628;background: #fff;cursor: pointer;}
    .sheet-name{display: inline-block;padding-left:5px;width:248px;
        &.active,&:hover{background:#5FA9EC;color:#fff;}
        &.ban{color:#909090;
            &:hover{background:#fff;color:#909090;cursor:default;}
        }
    }
}
/deep/.el-radio+.el-radio {margin-left: 8px;}
.search-tab{margin-bottom: 14px;border-bottom: 1px solid #e6e6e6;padding-bottom: 5px;
    /deep/ label.is-checked:after {content: '';width: 80%;height: 5px;background-image: url("../../static/img/project_triangle1.png");
        background-position: center;background-size: 100% 100%;background-repeat: no-repeat;display: block;position: absolute;bottom: -8px;left: 25px;}
    .search-tab-hd{margin-bottom:13px;}
    .refresh-cont{cursor:pointer;corlor:#262628;font-size:13px;
        .el-icon-refresh{color:#c0c0c0;font-size:14px}
        &:hover .el-icon-refresh{color:#3a80ec}
        &:hover {color:#3a80ec}
    }
}
.hierarchy{z-index:1002}
.refresh{-webkit-animation: spin 2s linear infinite;animation: spin 2s linear infinite;}
 @keyframes spin {
    0%{
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

</style>
