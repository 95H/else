<template>
  <Modal class="updation-modal"
      v-model="modalShow"
      title="修改学习阶段"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      >
    <Form :label-width="108" :model="formData" :rules="ruleFormData" ref="updationForm">
      <Row>
        <Col span="14" offset="5">
          <FormItem label="学科：" prop="subjectName">
            <span>{{ formData.subjectName }}</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="阶段名称：" prop="phaseName">
            <Input placeholder="请输入阶段名称" v-model="formData.phaseName" />
            <span class="input-remark">50字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="参考学习天数：" prop="referenceStuDays">
            <Input :number="true" v-model="formData.referenceStuDays" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="最长学习天数：" prop="maxStuDays">
            <Input :number="true" v-model="formData.maxStuDays" />
          </FormItem>
        </Col>
      </Row>
    </Form>      
  </Modal>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  props: [ 'isShowModal', 'phaseItem' ],
  
  data() {
    return {
      loading: true
    }
  },

  beforeCreate() {
    this.ruleFormData = {
      phaseName: [
        { required: true, message: '阶段名称不能为空', trigger: 'blur' },
        { max: 50, message: '阶段名称不能超过50字', trigger: 'blur' }
      ],
      referenceStuDays: [
        { type: 'number', required: true, message: '请输入整数', trigger: 'blur' }
      ],
      maxStuDays: [
        { type: 'number', required: true, message: '请输入整数', trigger: 'blur' }
      ]
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
    },

    formData() {
      return this.phaseItem
    }
  },

  methods: {
    ...mapMutations({
      opPatchPhaseItem: 'courseCenter/opPatchPhaseItem'
    }),

    ...mapActions({
      updatePhaseItem: 'courseCenter/updatePhaseItem'
    }),

    ok() {
      let self = this
      let _ = this._
      let formData = this.formData
      let phaseItem = this.phaseItem

      let originItem = {
        stageId: phaseItem.id,
        name: phaseItem.phaseName,
        referenceStuDays: phaseItem.referenceStuDays,
        maxStuDays: phaseItem.maxStuDays
      }

      let item = {
        stageId: formData.id,
        subjectId: Number(formData.subjectId),
        name: formData.phaseName,
        referenceStuDays: formData.referenceStuDays,
        maxStuDays: formData.maxStuDays
      }
      
      this.$refs.updationForm.validate(valid => {
        if (valid) {
          let status
          // 更新
          this.opPatchPhaseItem(item)
          self.modalShow = false

          this.updatePhaseItem(item)
            .then(data => {
              status = data.status
            })
            .catch(err => {})
            .finally(() => {
              if (status == 200) {
                self.$Message.success('修改成功！')
              } else {
                this.opPatchPhaseItem(originItem)
                self.$Message.error('修改失败，请重试！')
              }
              
            })
        } else {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }
      })
    },
    
    cancel() {
    }
  }
}
</script>

<style lang="less" scoped>
.updation-modal {
  .input-remark {
    position: absolute;
    top: 0;
    right: -30px;
    color: #ccc;
  }
}
</style>
