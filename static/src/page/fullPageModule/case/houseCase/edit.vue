<template>
    <div class="edit-panel" v-if="$store.state.readonly">
        <i class="el-icon-edit-outline" @click="startEdit" v-if="!editFlag"></i>
        <span v-if="editFlag" class="btn-group">
            <a class="btn btn-blue min-btn" href="javascript:;" @click="save">保存</a>
            <a class="btn btn-default min-btn" href="javascript:;" @click="cancel">取消</a>
        </span>
    </div>
</template>
<script>
export default {
    props:["editFlag"],
    data(){
        return{

        }
    },
    methods:{
        startEdit(){
            this.$emit("startEdit");
            this.$store.state.caseTabFlag = false;
        },
        save(){
            this.$emit("save");
            this.$store.state.caseTabFlag = true;
        },
        cancel(){
            this.$emit("cancel");
             this.$store.state.caseTabFlag = true;
        },
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.edit-panel{display: inline-block;
        /deep/ .el-icon-edit-outline{cursor: pointer; color: #3A80EC; margin-left: 5px; font-size: 13px;
        &:hover{opacity: .7;}
    }
    
}
</style>
