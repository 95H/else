<template>
    <div>
      <Modal
        v-model="modal"
        title="新建模板"
        @on-ok="ok"
        :loading="loading"
        :mask-closable="false"
        @on-cancel="cancel">
        <Form ref="formItem" :model="formItem" :rules="ruleFormItem" :label-width="120">
          <FormItem label="预报名费名称：" prop="courseId">
            <span style="margin-right: 10px">预付</span>
            <Select v-model="formItem.courseId " style="width:250px" clearable  filterable>
              <Option class="Options" v-for="(item , index) in templateListName.result"
                      :title="item.gradeName"
                      :value="item.id"
                      :key="index">{{item.id}}-{{item.gradeName}}</Option>
            </Select>
            <span style="margin-left: 10px">课程报名费</span>
          </FormItem>
          <FormItem label="预报名费金额：" prop="amount">
            <Input v-model="formItem.amount"  :maxlength=5 style="width: 250px"></Input>
            <span>元</span>
          </FormItem>
          <FormItem label="失效时长：" prop="expiresTime">
            <Input v-model="formItem.expiresTime" :maxlength=5 style="width: 250px"></Input>
            <span>小时</span>
          </FormItem>
          <FormItem label="备注说明：" prop="description">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import api from "@/api/index";
    export default {
        name: "new-template",
      data () {
        const numReg = (rule, value, callback) => {
          let Reg = /^[0-9]*[1-9][0-9]*$/;
          //大于零的整数校验需要补充
          if (value == '') {
            callback(new Error('请输入内容'));
          } else if (Reg.test(value)) {
            callback();
          } else {
            callback(new Error('请输入大于零的整数'));
          }
        };
        return {
          loading: true, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
          modal: false,
          templateListName: '',
          formItem: {
            courseId: '',
            amount: '',
            expiresTime: '',
            description: ''
          },
          ruleFormItem: {
            courseId: [
              { required: true, message: '请选择预报名费名称', type: "number", trigger: 'change' }
            ],
            amount: [
              { required: true, message: '请输入预报名费金额', trigger: 'blur' },
              { validator: numReg, trigger: 'change' }
            ],
            expiresTime: [
              { required: true, message: '请填写失效时长', trigger: 'blur' },
              { validator: numReg, trigger: 'change' }
            ],
            description: [
              { required: true, message: '请填写备注说明', trigger: 'blur' },
              { type: 'string', max: 1000, message: '最多输入1000字', trigger: 'change' }
            ]
          }
        }
      },
      methods: {
        // ...mapActions([
        //   "getDepositInformationList"
        // ]),
        newTemplate (list) {
          this.modal = true;
          this.templateListName = list;
        },
        ok () {
          this.$refs.formItem.validate((valid) => {
            if (valid) {
              this.postTemplateFn(this.formItem).then(res => {
                if (res.status === 200) {
                  this.modal = false;
                  this.$Message.success('创建成功！');
                  // this.getDepositInformationList({
                  //   pageNumber: 1,
                  //   pageSize: 10
                  // });
                  this.$refs.formItem.resetFields();
                  this.$emit('refreshData');
                } else {
                  this.$emit('refreshData');
                  this.loading = false;
                  this.$Message.error(res.message);
                }
              });
              this.loading = true;
            } else {
              this.loading = false;
            }
          });
          this.$nextTick(() => {
            this.loading = true;
          });
        },
        cancel () {
          this.$refs.formItem.resetFields();
        },
        async postTemplateFn (params) { //禁用
          let result = await api.postDepositTemplate(params);
          return result;
        }
      }
    }
</script>

<style scoped>
.Options{
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
