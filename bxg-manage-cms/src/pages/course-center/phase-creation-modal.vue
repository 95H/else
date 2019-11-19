<template>
  <Modal class="creation-modal"
      v-model="modalShow"
      title="新建学习阶段"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      >
    <Form :label-width="108" :model="formData" :rules="ruleFormData" ref="creationForm">
      <Row>
        <Col span="14" offset="5">
          <FormItem label="学科：" prop="subjectId">
            <Select placeholder="请选择学科" v-model="formData.subjectId">
              <Option v-for="item in subjectList" :value="item.menuId" :key="item.menuId">{{ item.menuName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="阶段名称：" prop="name">
            <Input placeholder="请输入阶段名称" v-model="formData.name" />
            <span class="input-remark">50字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="参考学习天数：" prop="referenceStuDays">
            <Input :number="true" placeholder="请输入整数" v-model="formData.referenceStuDays" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="最长学习天数：" prop="maxStuDays">
            <Input :number="true" placeholder="请输入整数" v-model="formData.maxStuDays" />
          </FormItem>
        </Col>
      </Row>
    </Form>      
  </Modal>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: [ 'isShowModal', 'subjectList' ],

  data() {
    return {
      // 
      formData: {
        subjectId: '',
        name: '',
        referenceStuDays : '',
        maxStuDays: ''
      },

      // 
      ruleFormData: {
        subjectId: [
          { required: true, type: 'number', message: '请选择学科', trigger: 'change' }
        ],
        name: [
          { required: true, message: '阶段名称不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字', trigger: 'blur' }
        ],
        referenceStuDays: [
          { type: 'integer', required: true, message: '请输入整数', trigger: 'blur' }
        ],
        maxStuDays: [
          { type: 'integer', required: true, message: '请输入整数', trigger: 'blur' }
        ]
      },

      loading: true
    } 
  },

  computed: {
    modalShow: {
      get() {
        return this.isShowModal
      },

      set(val) {
        this.$emit('update:isShowModal', val)
      }
    }
  },

  methods: {
    ...mapActions({
      createPhase: 'courseCenter/createPhase'
    }),

    ok() {
      let self = this
      this.$refs.creationForm.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
        let status
        let message
        this.createPhase(self.formData)
          .then(data => {
            status = data.status
            message = data.message
          })
          .catch(err => {})
          .finally(() => {
            if (status == 201) {
              self.$Message.success({
                content: '新建成功！',
                duration: 1,
                onClose: function() {
                  self.$refs.creationForm.resetFields()
                  self.$emit('createSuccess')
                  self.modalShow = false
                }
              })
            } else {
              self.modalShow = false
              self.$Message.error(message)
            }
          })
      })
    },
    
    cancel() {
      this.$refs.creationForm.resetFields()
      this.modalShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.creation-modal {
  .input-remark {
    position: absolute;
    top: 0;
    right: -30px;
    color: #ccc;
  }
}
</style>
