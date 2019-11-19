<template>
     <Modal
        title="修改服务时间"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="asyncOK"  
        :loading="loading"
        width="500px"
        @on-cancel="cancel">
        <div>
           <Form ref="frombox" :model="formValidate" :rules="ruleValidate">
           <Row>
              <Col span="10">
               <FormItem>
                  报名时间：{{effectiveDate}}
               </FormItem>
              </Col>
              <Col span="14">
               <FormItem>
              剩余时间（天）：{{remainingDays}}
               </FormItem>
              </Col>
          </Row>
          <Row style="margin-top:20px;">
              <Col span="10">
              <FormItem>
                  整体进度:{{totalProgress}}
              </FormItem>
              </Col>
              <Col span="14">
               <FormItem label="服务截止日期:" prop="applyExpires">
                    <DatePicker 
                    v-model="formValidate.applyExpires"
                    type="date" 
                    format="yyyy-MM-dd"   
                    placeholder="服务截止日期"
                    >
                    </DatePicker>
                </FormItem>
              </Col>
          </Row>
          <Row>
            <Col span="24">
               <FormItem label="修改原因" prop="reason">
                  <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入修改原因"></Input>
              </FormItem>
            </Col>
          </Row>
          </Form>
        </div>
    </Modal>
</template>

<script>
import api from '@/api/index'
import dateUtil from 'iview/src/utils/date'
export default {
  data() {
    return {
      effectiveDate: '',
      remainingDays: '',
      totalProgress: '',
      courseName: '',
      modal: false,
      loading: true,
      formValidate: {
        originalExpires: '',
        stuCourseId: '',
        applyExpires: '',
        reason: ''
      },
      ruleValidate: {
        applyExpires: [
          {
            required: true,
            type: 'date',
            message: '服务日期不能为空',
            trigger: 'blur'
          }
        ],
        reason: [
          {
            required: true,
            message: '修改原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    asyncOK() {
      setTimeout(() => {
        this.loading = false
        this.$refs.frombox.validate(async valid => {
          if (valid) {
            this.loading = true
            const parmas = Object.assign({}, this.formValidate)
            parmas.applyExpires = dateUtil.format(
              parmas.applyExpires,
              'yyyy-MM-dd'
            )
            parmas.logDesc = `修改服务期(${this.courseName}服务期为${
              parmas.applyExpires
            })`
            parmas.desc = `修改服务期(${this.courseName}服务期为${
              parmas.applyExpires
            })`
            let result = await api.postpones(parmas)
            if (result.status == 200) {
              this.$Message.success('修改服务时间成功')
              this.$refs.frombox.resetFields()
              this.$emit('refreshList')
            } else {
              this.$Message.error(result.message)
            }
            this.modal = false
          }
        })
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    cancel() {
      this.$refs.frombox.resetFields()
    }
  }
}
</script>

<style>
</style>
