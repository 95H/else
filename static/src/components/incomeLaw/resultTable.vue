<template>
     <div class="wrap-table" id="wrap_table">
        <div class="wrap-table-scroll">
            <table>
                <thead>
                    <tr>
                        <th v-for="(item,index) in tableHeader" :key="index">
                            <div class="cell">{{item}}</div>
                        </th>
                    </tr>
                </thead> 
                <tbody>
                    <tr v-for="(tableR,tableInd) in tableData" :key="tableInd"> 
                        <td v-for="(item,index) in tableHeader" :key="index">
                            <div class="cell" :title="$store.state.commafyNumber(tableR[index],4)">{{$store.state.commafyNumber(tableR[index],4)}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

export default {
    props:["tableHeader","tableData"],
    data(){
        return{

        }
    },
    mounted() {
        // this.reckonHg();
    },
    methods:{
        scrollBody(event){
            this.scrollLeft = event.target.scrollLeft;
            this.$refs.tableHead.style.left = "-" + this.scrollLeft + "px";
        },
        //计算高度
        reckonHg() {
            var pageModuleHeight = parseFloat(this.$store.state.oElemHg) - 57,
                tabHeight = 30,
                incomeTablesModuleHeight = document.querySelector(
                ".incomeTablesModule-checkboxs"
                ).clientHeight;
            this.$refs.tableScroll.style.height =
                pageModuleHeight -
                50 -
                this.$refs.tableHead.offsetHeight -
                tabHeight -
                incomeTablesModuleHeight +
                "px";
        },
    },
    watch: {
        "$store.state.oElemHg": {
            handler: function(newD, oldD) {
                // this.reckonHg();
            }
        },
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
 .wrap-table{width: calc( 100% - 2px );border: 1px solid #e5e5e5;border-top:none;border-bottom: none;
        .wrap-table-scroll{width:100%;overflow-x: scroll;}
        table{width:100%;}
        tr {height: 21px;
            td,th {border: 1px solid #e5e5e5;text-align: center;
                &:first-child{border-left: none;}
                &:last-child{border-right:none;}
            }
            .cell{min-width: 100px;line-height: 20px;}
        }
        thead{
            tr{background: #f6faff;height: 28px;line-height: 28px;color: #262628;font-size:13px;
                th{border-bottom:none;}
                .cell{height:28px;line-height: 28px;}
            }
        }
        tbody{font-size:12px;}
    }
</style>
