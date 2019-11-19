<template>
    <div class="market-law">
       <div class="case-tab-header">
            <ul class="menu-list">
                <li v-for="(item,index) in tabList" :key="index" :class="{actived:index==activeNum}" @click="tabChange(index,item)">{{item}}</li>
            </ul>
        </div> 
        <!-- <keep-alive>
            <component :is="view"></component>             
        </keep-alive>     -->
        <market-house  :tableBodyData="tableDataArr" :tabType ="tabType" ></market-house>
    </div>    
</template>
<script>

import marketHouse from '@/page/fullPageModule/case/houseCase/marketLaw/marketHouse.vue'
export default {
    components:{marketHouse},
    data(){
        return{
            tabList:["市场法住宅","市场法办公","市场法商业"],
            activeNum:0,
            tabContList:{
                "市场法住宅":marketHouse,
                // "市场法办公":marketHouse,
                // "市场法商业":marketHouse
            },
            tableDataArr:[],//市场法住宅数据
            tabType:'',
            noDataArr:[],//没有数据的页签
           

        }
    },
    trPatchWidth(){
        var _this = this;
        return this.patchWidth;
    },
    mounted(){
        //  for(var i =0;i<33;i++){
        //     this.marketHouseData.push(this.mtableData[0]);
        // }
         this.tabType = this.tabList[this.activeNum]
    },
    watch:{
        
    },
    methods:{
        tabChange(index,item){
            var _this = this;
            if(!this.$store.state.caseTabFlag){
                this.$messageError("请先保存当前数据");
                return;
            }
           if(this.activeNum ==index) return;
           this.activeNum = index;
           
           this.tabType = item;
           this.initData(item,'search');
           //this.view = this.tabContList[item];
        },
        /**
         * sheetName
         * type
         */
        initData(sheetName,type){
            var _this = this;
            if(sheetName&&!type){
                sheetName.indexOf(this.tabList[this.activeNum])>-1?sheetName = this.tabList[this.activeNum]:sheetName='';
                if(sheetName=='') return;
            }
             _this.tableDataArr =[];
            this.$http.post('api/case/getCaseDetails', {
                projectId: this.$store.state.projectId,
                investorId: this.$store.state.investorId,
                sheetName:sheetName||this.tabList[this.activeNum],
                ruleType:'市场法',
                dataId: this.$store.state.caseDataId
            }).then(res=> {
               
               _this.tableDataArr = res.data.data;
              
              
            }).catch(err=> {
                this.$messageError(err);
            })
             return;
        },
        tidyActiveNumFn(){
            this.activeNum = 0;
            this.tabType = this.tabList[this.activeNum];
        },
        deleteCase(arr){
             this.noDataArr = arr;
             this.emptyTable();
        },
        emptyTable(){
            for(var i = 0;i<this.noDataArr.length;i++){
                if(this.noDataArr[i]==this.tabList[this.activeNum]){
                    //需要判断相对应的 清空
                     this.tableDataArr = [];   
                    break;
                }
            }
        },  
    }
}
</script>

