<template>
    <div>
        <el-table :data="data" border ref="tableTree" style="width: 100%" :row-style="showTr" class="table-tree" highlight-current-row :class="{'has-table-header':!tableHeader}">
            <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" :width="column.width">
                <template slot-scope="scope">
                    <span v-if="spaceIconShow(index) && column.text != '操作'" v-for="(space, levelIndex) in scope.row._level" :key="levelIndex" class="ms-tree-space"></span>
                    <i v-if="toggleIconShow(index,scope.row) && column.text != '操作'" :class="{'el-icon-caret-right':!scope.row._expanded,'el-icon-caret-bottom':scope.row._expanded}" class="fs16 toggleIcon" aria-hidden="true" @click="toggle(scope.$index)"></i>
                    <span v-else-if="index===0 && column.text != '操作'" class="ms-tree-space"></span>
                    <input type="text" class="input" :class="{'frist-tr text-left':index===0}" v-if="column.type=='input' && column.text != '操作'" v-model="scope.row[column.dataIndex]" />
                    <input type="text" class="input" :class="{'frist-tr text-left':index===0}" v-else-if="column.type=='person' && column.text != '操作'" readonly v-model="scope.row[column.dataIndex]" @focus="selectPersons(scope.row,'leaderUser')" />
                    <!--树节点名称，只需展示，无需操作节点-->
                    <span class="text textOverflow1" :class="{'frist-tr text-left':index===0}" v-else-if="column.text != '操作' && column.text != '项目编号' && column.text != '项目经理' && column.text != '盖章份数' && column.text != '审核情况'" :title="scope.row[column.dataIndex]">{{scope.row[column.dataIndex]}}</span>
                    <!--展示树节点对应的状态信息-->
                    <div v-if="column.text == '审核情况'" class="status_wrapper">
                        <div class="current_progress" v-if="scope.row[column.dataIndex]" v-for="(value, key) in scope.row[column.dataIndex]" :key="key">
                            <span class="audit_progress">{{progressInfo[key]}}</span>
                            <span class="audit_status unsubmit" v-if="value== 0 || value== '' ">
                                <i class="icon_con icon-block"></i>未送审</span>
                            <span class="audit_status pass" v-if="value == 3">
                                <i class="icon_con el-icon-check"></i>已通过</span>
                            <span class="audit_status unpass" v-else-if="value == 2">
                                <i class="icon_con el-icon-close"></i>不通过</span>
                            <span class="audit_status submited" v-else-if="value == 1">
                                <i class="icon_con el-icon-caret-right"></i>已送审</span>
                            <span class="audit_status back" v-else-if="value == 4">
                                <i class="iconfont icon-back"></i>已撤回</span>
                        </div>
                    </div>
                    <!--操作列的增加与删除事件-->
                    <i class="el-icon-circle-plus-outline fs13 add" v-if="column.text == '操作' && treeType === 'normal'" @click="addNode(scope)"></i>
                    <i class="el-icon-circle-close-outline fs13 delete" v-if="column.text == '操作' && treeType === 'normal'" @click="deleteNode(scope)"></i>
                    <i class="iconfont icon-Shape fs12 add" v-if="column.text == '操作' && treeType === 'btn'" @click="operationNode(scope)"></i>
                    <!--新增进入详情-->
                    <span v-if="column.text === '操作' && treeType==='enter' && /projectImplementation|projectAuditing/.test($route.path) && !/examineModification|externalOffLineAudit/.test($route.path)" class="enterBtn" @click="enterDetail(scope)">进入详情</span>
                    <span v-if="column.text === '操作' && treeType==='enter' && /examineModification|externalOffLineAudit/.test($route.path) && scope.row['statusList']['2'] == 3" class="enterBtn" @click="enterDetail(scope)">{{/externalOffLineAudit/.test($route.path) ? '进入审核': '进入修改'}}</span>
                    <input type="text" class="input text-center" :class="{'frist-tr':index===0}" v-if="column.type=='inputspan' && column.text != '操作' && column.text == '项目编号' && scope.row.parentId == '-1'" v-model="scope.row[column.dataIndex]" @input="editorNumber(scope)" />
                    <span v-else-if="column.text == '项目编号' && scope.row.parentId != '-1' && column.type=='inputspan' && column.text != '操作'" class="ms-tree-space pnumber textOverflow1" :title="scope.row[column.dataIndex]">{{scope.row[column.dataIndex]}}</span>
                    <span v-else-if="column.text == '项目编号' && column.type=='text' && column.text != '操作'" class="ms-tree-space pnumber textOverflow1" :title="scope.row[column.dataIndex]">{{scope.row[column.dataIndex]}}</span>
                    <input type="text" class="input" :class="{'frist-tr':index===0,'inputBor':classBor}" v-if="column.type=='iFperson' && column.text != '操作' && column.text == '项目经理' && scope.row.sealStatus == '1'" v-model="scope.row[column.dataIndex]" @focus="selectPersons(scope.row,'sealOwner')" />
                    <span v-else-if="column.text == '项目经理' && scope.row.sealStatus != '1' && (column.type=='iFperson' || 'text') && column.text != '操作'" class="ms-tree-space pnumber textOverflow1" :title="scope.row[column.dataIndex]">{{scope.row[column.dataIndex]}}</span>
                    <input type="text" class="input" :class="{'frist-tr':index===0,'inputBor':classBor}" v-if="column.type=='inputspans' && column.text != '操作' && column.text == '盖章份数' && scope.row.sealStatus == '1'" v-model="scope.row[column.dataIndex]" @focus="dataColor(scope.row,$event)" @blur="removeColor($event)" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    <span v-else-if="column.text == '盖章份数' && scope.row.sealStatus != '1' && (column.type=='inputspans' || 'text') && column.text != '操作'" class="ms-tree-space pnumber textOverflow1" :title="scope.row[column.dataIndex]">{{scope.row[column.dataIndex]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <persons-dialog ref="selectPersonsDialog" v-on:setPersonId="setPersonsId"></persons-dialog>
    </div>
</template>
<script>
import DataTransfer from '@/components/tableTree.js'
import personsDialog from '@/components/personsDialog'
//  import Vue from 'vue'
export default {
    name: 'tree-grid',
    components: {
        personsDialog
    },
    props: {
        // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        treeStructure: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        // 这是相应的字段展示
        columns: {
            type: Array,
            default: function() {
                return []
            }
        },
        // 这是数据源
        dataSource: {
            type: Array,
            default: function() {
                return []
            }
        },
        // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
        requestUrl: {
            type: String,
            default: function() {
                return ''
            }
        },
        // 这个是是否展示操作列
        treeType: {
            type: String,
            default: function() {
                return 'normal'
            }
        },
        // 是否默认展开所有树
        defaultExpandAll: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        //是否默认显示表头
        tableHeader: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        //人员字段
        peasonField: {
            type: String,
            default: function() {
                return 'leaderUser'
            }
        }
    },
    data() {
        return {
            classBor: true,
            progressInfo: ['初审', '复审', '签发'],
            status: ['未送审', '待审核', '已拒绝', '已通过', '已撤回']
        }
    },
    computed: {
        // 格式化数据源
        data: function() {
            let me = this
            if (me.treeStructure) {
                let data = DataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
                return data
            }
            //debugger
            return me.dataSource
        }
    },
    methods: {
        // 显示行
        showTr: function({ row, index }) {
            let show = row._parent ? row._parent._expanded && row._parent._show : true
            row._show = show
            return show ? '' : 'display:none;'
        },
        // 展开下级
        toggle: function(trIndex) {
            let me = this
            let record = me.data[trIndex]
            record._expanded = !record._expanded
        },
        // 显示层级关系的空格和图标
        spaceIconShow(index) {
            let me = this
            if (me.treeStructure && index === 0) {
                return true
            }
            return false
        },
        // 点击展开和关闭的时候，图标的切换
        toggleIconShow(index, record) {
            let me = this
            if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
            }
            return false
        },
        //增加子节点
        addNode(scope) {
            this.$emit('addNodeFun', scope)
        },
        //删除子节点
        deleteNode(scope) {
            this.$emit('deleteNodeFun', scope)
        },
        //操作节点
        operationNode(scope) {
            this.$emit('operationNodeFun', scope)
        },
        selectPersons(type, index) {
            this.$refs.selectPersonsDialog.showPersonDialog(type, type[this.peasonField + 'Ids'], type[this.peasonField + 'Names'])
        },
        setPersonsId(type, name, id) {
            type[this.peasonField + 'Ids'] = id.join(',')
            type[this.peasonField + 'Names'] = name.join(',')
        },
        editorNumber(scope) {
            this.$emit('editorNumberFun', scope)
        },
        dataColor(scope, event) {
            //event.target.style = "border:1px solid #88C6FF;background:#fff";
            this.$refs.tableTree.setCurrentRow(scope)
        },
        removeColor(event) {
            //event.target.style = ""
        },
        enterDetail(scope) {
            this.$emit('enterDetail', scope)
        }
    }
}
</script>
<style scoped>
.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 23px;
}

.ms-tree-space::before {
    content: '';
}

.pnumber {
    width: 100%;
    line-height: 23px;
    padding: 0 12px;
    box-sizing: border-box;
}

table td {
    line-height: 26px;
}

.add,
.delete,
.toggleIcon {
    cursor: pointer;
    line-height: 25px;
    margin-left: 5px;
}
.add:hover,
.delete:hover {
    opacity: 0.7;
}

.has-table-header /deep/ .el-table__header-wrapper {
    display: none;
}

.table-tree /deep/ td {
    padding: 0;
    height: 25px;
    line-height: 25px;
}

.table-tree /deep/ tbody .cell {
    padding: 0;
    height: 25px;
    line-height: 25px;
    display: -webkit-flex;
    -webkit-flex-direction: row;
    display: flex;
    flex-direction: row;
}

.table-tree .text {
    padding: 0 10px;
    width: 100%;
}

.table-tree .input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 10px;
    box-sizing: border-box;
    background: none;
}

.frist-tr {
    -webkit-flex: 1;
    flex: 1;
    -ms-flex: 1 0 auto;
}

.add {
    color: #3a80ec;
    margin: 0 10px;
}

.delete {
    color: #f09237;
}

/deep/.inputBor {
    border: solid 1px #88c6ff !important;
    background: #fff !important;
    margin: 5px;
    height: 80% !important;
}
/deep/ .el-table__body tr > td {
    text-align: center;
}
/deep/ .el-table__body tr.current-row > td {
    background: #fff5eb !important;
}
/*关于审核界面状态显示的样式*/
.status_wrapper {
    width: 100%;
    padding: 0px 35px;
    display: flex;
    justify-content: space-between;
}
.current_progress {
    overflow: hidden;
    line-height: 25px;
}
.audit_progress {
    display: inline-block;
    width: 45px;
    height: 20px;
    background-color: #3a80ec;
    color: #ffffff;
    font-size: 12px;
    float: left;
    box-sizing: border-box;
    text-align: center;
    line-height: 20px;
    margin-top: 3px;
}
.audit_status {
    display: inline-block;
    width: 90px;
    height: 18px;
    float: left;
    margin-top: 3px;
    line-height: 18px;
}
.pass {
    border: 1px solid #98c268;
    color: #98c268;
}
.unpass {
    border: 1px solid #f25454;
    color: #f25454;
}
.unsubmit {
    border: 1px solid #bfbfbf;
    color: #bfbfbf;
}
.back {
    border: 1px solid #bfbfbf;
    color: #f09237;
}
.submited {
    border: 1px solid #3a80ec;
    color: #3a80ec;
}
.icon_con,
.iconfont {
    margin: 0 10px 0 20px;
}
.icon-block {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #bfbfbf;
    border-radius: 2px;
}
.el-icon-close {
    color: #f25454;
}
.el-icon-check {
    color: #98c268;
}
.icon_con.el-icon-caret-right {
    color: #3a80ec;
}
.icon-back {
    color: #f09237;
    font-size: 12px;
}
.enterBtn {
    color: #f09237;
    font-size: 12px;
    cursor: pointer;
    margin-left: 30px;
}
</style>
