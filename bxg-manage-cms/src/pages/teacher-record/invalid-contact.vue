<template>
<div>
    <Form ref="formbox" label-position="top" :model="formValidate" :rules="ruleValidate">
        <FormItem label="是否失联:" prop="contactState">
            <Select v-model="formValidate.contactState"  placeholder="休学类型" style="width:250px;" >
                <Option value="0">失联</Option>
                <Option value="1">未失联</Option>
            </Select>
        </FormItem>
        <FormItem label="备注:" prop="contactRemark">
            <Input v-model="formValidate.contactRemark" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入备注"></Input>
            <p class="p-right">500字</p>
        </FormItem>
     </Form>
     <!-- <Row style="margin-top:20px; text-align: center;">
            <Col span="24">
                <span style="margin-right:30px;"><Button @click="determineClick" size="large" type="primary"  :loading="loading">确定</Button></span>
                <span><Button size="large" @click="cancel">取消</Button></span>
            </Col>
    </Row> -->
</div>
</template>

<script>
import api from '@/api/index'
export default {
  props: {
    studentTaskId: String
  },
  data() {
    return {
      loading: false,
      formValidate: {
        studentTaskId: this.studentTaskId || '',
        studentId: this.$route.query.studentId || '',
        courseId: this.$route.query.courseId || '',
        contactState: '',
        contactRemark: ''
      },
      ruleValidate: {
        contactState: [
          {
            required: true,
            message: '是否失联不能为空',
            trigger: 'change'
          }
        ],
        contactRemark: [
          {
            type: 'string',
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ]
      }
    }
  },
  updated(){
    let invalidformObj = {}
    invalidformObj.contactState = this.formValidate.contactState;
    invalidformObj.contactRemark = this.formValidate.contactRemark;
    this.$emit('invalidformData', invalidformObj);
  }
}
</script>
<style scope>
.p-right{
    position: absolute;
    right: 10px;
    bottom: -5px;
    color: #ccc;
}
</style>
