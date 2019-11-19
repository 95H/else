<template>
    <Modal
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        width="500px">
        <h3 slot="header">
           {{title}}
        </h3>
        <div v-if="type===0">
            <Row>
                <Col span="12">   
                    报名时间：{{resData.effectiveDate}}
                </Col>
                <Col span="12">   
                    剩余时间：{{resData.remainingDays}}
                </Col>
            </Row>
            <Row style="margin-top:20px;">
                <Col span="12">   
                    整体进度：{{resData.totalProgress}}%（{{resData.learnedModuleTotalQty}}/{{resData.moduleTotalQty}}）
                </Col>
                <Col span="12">   
                    服务截止日期：{{resData.serviceExpires}}
                </Col>
            </Row>
             <Row style="margin-top:20px;">
                <Col span="24" style="word-break: break-all;word-wrap: break-word;">   
                    修改原因：{{resData.reason}}
                </Col>
            </Row>
        </div>
        <div v-else-if="type===1">
             <Row>
                <Col span="12">   
                    休学课程：{{resData.courseName}}
                </Col>
                <Col span="12">   
                    课程服务截止时间：{{resData.originalExpires}}
                </Col>
            </Row>
            <Row style="margin-top:20px;">
                <Col span="12">   
                    预计休学时间：{{resData.suspensionDays}}
                </Col>
                <Col span="12">   
                    预计课程服务截止时间：{{predictExpires}}
                </Col>
            </Row>
             <Row style="margin-top:20px;">
                <Col span="24">   
                    休学类型：{{suspensionType}}
                </Col>
            </Row>
            <Row style="margin-top:20px;">
                <Col span="24" style="word-break: break-all;word-wrap: break-word;">   
                    休学原因：{{resData.reason}}
                </Col>
            </Row>
        </div>
        <div v-else-if="type===2">
           <Row>
                <Col span="12">   
                    关闭课程：{{resData.courseName}}
                </Col>
                <Col span="12">   
                    课程服务截止时间：{{resData.serviceExpires}}
                </Col>
            </Row>
            <Row style="margin-top:20px;">
                <Col span="12">   
                    关闭类型：{{refundType}}
                </Col>
            </Row>
             <Row style="margin-top:20px;">
                <Col span="24" style="word-break: break-all;word-wrap: break-word;">   
                    关闭原因：{{resData.reason}}
                </Col>
            </Row>
        </div>
        <div v-else-if="type===3">
            <Row>
                <Col span="24">   
                    锁定原因：{{resData.reason}}
                </Col>
            </Row>
        </div>
    </Modal>
</template>

<script>
import api from '@/api/index'
export default {
  data() {
    return {
      modal: false,
      id: '',
      type: '',
      operationType: '',
      resData: {}
    }
  },
  methods: {
    async getDetails() {
      let result = await api.getLogsInfo({
        id: this.id,
        type: this.type
      })
      if (result.status === 200) {
        this.resData = result.result
      }
    }
  },
  computed: {
    refundType() {
      //'关闭类型:TRANSFER_OFFLINE(转线下);TRANSFER_SUBJECT(转学科);DROP_OUT(退学);OTHERS(其他)'
      const obj = [
        {
          value: 'TRANSFER_OFFLINE',
          label: '转线下'
        },
        {
          value: 'TRANSFER_SUBJECT',
          label: '转学科'
        },
        {
          value: 'DROP_OUT',
          label: '退学'
        },
        {
          value: 'OTHERS',
          label: '其他'
        }
      ]
      for (const { value, label } of obj) {
        if (this.resData.refundType === value) {
          return label
        }
      }
    },
    suspensionType() {
      const restType = [
        {
          value: 'SICK_LEAVE',
          label: '病假'
        },
        {
          value: 'AFFAIR_LEAVE',
          label: '事假'
        },
        {
          value: 'MATERNITY_LEAVE',
          label: '产假'
        },
        {
          value: 'OTHERS',
          label: '其他'
        }
      ]
      for (const { value, label } of restType) {
        if (this.resData.suspensionType === value) {
          return label
        }
      }
    },
    predictExpires() {
      let day = this.resData.suspensionDays
      let nowDate = new Date(this.resData.predictExpires)

      let date
      // 休学详情直接取predictExpires字段
      if (this.type == 1) {
        date = nowDate
      } else {
        date = new Date(nowDate.getTime() + day * 24 * 60 * 60 * 1000)
      }
      
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    },
    title() {
      if (this.type === 0) {
        return '修改服务期详情'
      } else if (this.type === 1) {
        return '休学详情'
      } else if (this.type === 2) {
        return '关闭课程详情'
      } else if (this.type === 3) {
        if (this.operationType === 4) {
          return '锁定详情'
        } else {
          return '解锁详情'
        }
      }
    }
  }
}
</script>

<style>
</style>
