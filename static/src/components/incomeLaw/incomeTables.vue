<template>
    <div class="incomeTables">
        <div class="incomeTables-table">
            <template v-if="tabArr.length>0">
                <income-tables-module :incomeTableName="incomeTableName"></income-tables-module>
            </template>
        </div>
        <div class="incomeTables-footer">
            <scroll-tab :tabArr="tabArr" :isSelectM=false @tabClick="tabClick" ref="scrollTab"></scroll-tab>
        </div>
    </div>
</template>
<script>
import scrollTab from '@/components/scrollTab2.vue';
import incomeTablesModule from '@/components/incomeLaw/incomeTablesModule.vue';
import {sheetNameArr} from '@/components/incomeLaw/incomeTableData.js';
export default {
    components:{scrollTab,incomeTablesModule},
    data(){
        return {
            tabArr:sheetNameArr,
            incomeTableName:"",
        }
    },
    created(){
        this.incomeTableName=this.tabArr[0].name;
        this.$store.state.moduleChildId = this.incomeTableName;
        // this.getSheetName()
    },
    methods:{
        getSheetName(){
            this.$http
            .post("/api/incomexls/getSheetName", {
                projectId: this.projectId,
            })
            .then(res => {
                this.tabArr=res.data.map(item=>{
                    return {name:item}
                })
                this.incomeTableName=this.tabArr[0].name;
            })
            .catch(error => {
                this.$messageError(err);
            });
        },
        tabClick(val){
            this.incomeTableName=val.name;
            this.$store.state.moduleChildId = val.name;
        }
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
    .incomeTables{
        .incomeTables-footer{
            padding: 0 10px;
            box-sizing: border-box;
        }
    }
</style>


