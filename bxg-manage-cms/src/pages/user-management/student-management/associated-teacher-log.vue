<template>
  <Modal
    v-model="modal1"
    title="关联后台用户">
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
      <FormItem label="关联后台用户" prop="adminUserId">
        <Select v-model="formItem.adminUserId" filterable clearable>
          <Option v-for="(item,index) in dataList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="ok" :loading="loading">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import api from "@/api/index";
  export default {
    props: {
      onAassociateChange: null
    },
    data () {
      return {
        modal1: false,
        loading: false,
        dataList:[],//数据列表
        formItem: {
          studentId:null,
          adminUserId:null,
        },
        ruleValidate:{
          adminUserId: [
            { required: true, message: '关联用户不能为空', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      //获取关联后台用户数据
      getTeacherData(params){
        if(this.$refs.formItem){
          this.$refs.formItem.resetFields();
        }
        this.formItem = params;
        api.getLearnersTeachers({...this.formItem})
          .then(data => {
            if (data.status === 200) {
              this.dataList=data.result;
            }
          })
          .catch(err => {
            this.$Message.error(err.message);
          })
      },
      //确定-关联老师
      ok () {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            this.loading=true;
            api.associatedTeacher({...this.formItem})
              .then(data => {
                if (data.status === 200) {
                  this.$Message.success(data.result);
                }else{
                  this.$Message.error(data.result);
                }
                this.loading=false;
                this.modal1=false;
                // 重新刷新列表
                if (this.onAassociateChange && typeof this.onAassociateChange === "function") {
                  this.onAassociateChange();
                }
              })
              .catch(err => {
                this.$Message.error("请求失败");
                // 重新刷新列表
                if (this.onAassociateChange && typeof this.onAassociateChange === "function") {
                  this.onAassociateChange();
                }
              })
          }
        })
      },
      //取消
      cancel () {
        this.modal1=false
      }
    }
  }
</script>

<style scoped>

</style>
