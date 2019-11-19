<template>
  <div class="RecordOfCommunication">
    <Card class="nowthetask">
      <h3>目前任务</h3>
      <Row>
        <!-- 新建任务 -->
        <Button v-show="!nowTaskList" style="margin-top:10px;" type="primary" @click="goNewthetask"><Icon type="md-add" />新建目标任务</Button>
        <NewthetaskModal :isNewthetask.sync ="isNewthetask" :newStageList="newStageList" :query="query"/>
        <!-- 历史任务 -->
        <Row v-if="nowTaskList" class="phase">
          <Row v-if="!ischangeTask">
            <Row :gutter="16" class="m-t20">
              <Col span="6"><strong>阶段任务名称：</strong><span>{{nowTaskList.stageName}}</span></Col>
              <Col span="6" ><strong>任务目标：</strong><span>{{nowTaskList.taskName}}</span></Col>
              <Col span="6" ><Checkbox v-model="finsh">该任务目标已完成</Checkbox></Col>
              <Col v-if="!finsh" span="6" class="btn"><Button @click="changeTask" type="primary" size="small">修改</Button></Col>
            </Row>
            <Row class="m-t20"><Col style="word-break:break-all;word-wrap:break-word;"><strong>任务要求：</strong>{{nowTaskList.taskRemark}}</Col></Row>
          </Row>
        </Row>
        <!-- 修改任务 -->
        <Row v-show="ischangeTask">
          <Form ref="formChangeTask" :model="formChangeTask" :rules="ruleChangeTask">
            <Row v-if="nowTaskList" class="m-t20" :gutter="16">
              <Col span="8">
                <FormItem label="阶段名称：" prop="stageName">
                  <Select class="margin-left-20" filterable style="width:160px" :placeholder="nowTaskList.stageName" v-model="formChangeTask.stageName" @on-open-change="openChange" @on-change="changeVal">
                    <Option v-for="(item, index) in newStageList" :value="item.stageId" :key="index">{{ item.stageName }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="任务目标：" prop="taskName">
                  <Select class="margin-left-20" filterable style="width:160px" :placeholder="nowTaskList.taskName" v-model="formChangeTask.taskName" @on-change="changetext">
                    <Option v-for="(item, index) in newTasList" :value="`${item.taskId}-${item.taskRemark}`" :key="index">{{ item.taskName }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row v-if="nowTaskList">
              <Col v-if="formChangeTask.taskRemark!=''" style="word-break:break-all;word-wrap:break-word;">任务要求：{{formChangeTask.taskRemark}}</Col>
              <Col v-else style="word-break:break-all;word-wrap:break-word;">任务要求：{{nowTaskList.taskRemark}}</Col>
            </Row>
            <Row class="m-t20">
              <FormItem label="修改原因：" prop="changeCause" label-position="top">
                <Input v-model="formChangeTask.changeCause" type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." />
                <p class="p-right">500字</p>
              </FormItem>
            </Row>
            <Row style="margin-top:20px; text-align: center;">
              <Col span="24">
                <span style="margin-right:30px;"><Button @click="save" size="large" type="primary"  :loading="loading">保存</Button></span>
                <span><Button size="large" @click="back">返回</Button></span>
              </Col>
            </Row>
          </Form>
        </Row>
      </Row>
    </Card>
    <!-- 任务完成导师评价 -->
    <Card v-show="finsh">
      <h3>导师评价</h3>
      <Row>
        <Form ref="formTeachComment" :model="formTeachComment" :rules="ruleTeachComment" label-position="top">
          <Col class="m-t20">
            <FormItem label="任务评分：" prop="valueHalf">
              <Rate allow-half v-model="formTeachComment.valueHalf" style="font-size:30px;" />
            </FormItem>
          </Col>
          <Col>
            <FormItem label="任务点评：" prop="taskComment">
              <Input v-model="formTeachComment.taskComment" type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." />
              <p class="p-right">500字</p>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <!-- 沟通记录 -->
    <Card>
      <h3>沟通记录</h3>
      <p style="margin-top:20px;"><strong>学员姓名：</strong>{{studentName}}</p>
      <Row>
        <Form ref="formTalkRecord" :model="formTalkRecord" :rules="ruleTalkRecord" label-position="top">
        <Col class="m-t20">
          <FormItem label="沟通要点：" prop="point">
            <Input v-model="formTalkRecord.point" type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." />
            <p class="p-right">500字</p>
          </FormItem>
        </Col>
        <Col class="m-t20">
          <FormItem label="评价：" prop="evaluate">
            <Input v-model="formTalkRecord.evaluate" type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." />
            <p class="p-right">500字</p>
          </FormItem>
        </Col>
        <Col class="m-t20">
          <FormItem label="指导：" prop="guidance">
            <Input v-model="formTalkRecord.guidance" type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." />
            <p class="p-right">500字</p>
          </FormItem>
        </Col>
        <Col class="m-t20">
          <FormItem label="学习效果风险评估：" prop="currentState">
            <Select style="width:200px;" placeholder="请选择状态" v-model="formTalkRecord.currentState">
              <Option v-for="item in currentState" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="原因：" prop="cause">
            <Input v-model="formTalkRecord.cause" type="textarea" :rows="2" placeholder="请输入" />
            <p class="p-right">500字</p>
          </FormItem>
        </Col>
        <Col>
          <p>正常：该学员能够按照导师制定的学习计划进行学习，按时观看视频，有良好的学习习惯；或该学员明确表示自己为自由学习者，不需要导师指导。</p>
          <p>预警：该学员在学习时遇到的问题比较多，完成任务的过程中心态也有些着急，需要重点关注下；或该学员学习方法有问题，一直处于学不会的状态，但是学习态度还比较积极。</p>
          <p>问题：该学员不听导师的指导，自定步调学习，而且学习速度缓慢；或这段时间都没有时间学习，没有学习进度；或明确告知已放弃学习的学员。</p>
        </Col>
        </Form>
      </Row>
      </Row>
    </Card>
    <!-- 任务已完成 布置新的任务 -->
    <Card v-if="finsh">
      <h3>布置新任务</h3>
      <Row>
        <Row class="m-t20" :gutter="16">
          <Col span="8"><strong>阶段名称：</strong>
            <Select class="margin-left-20" filterable style="width:160px" placeholder="阶段名称" @on-open-change="openChange" @on-change="changeVal">
              <Option v-for="(item, index) in newStageList" :value="item.stageId" :key="index">{{ item.stageName }}</Option>
            </Select>
          </Col>
          <Col span="8"><strong>任务目标：</strong>
            <Select class="margin-left-20" filterable style="width:160px" placeholder="任务目标名称" @on-change="changetext">
              <Option v-for="(item, index) in newTasList" :value="`${item.taskId}-${item.taskRemark}`" :key="index">{{ item.taskName }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="m-t20"><Col style="word-break:break-all;word-wrap:break-word;"><strong>任务要求：</strong>{{formChangeTask.taskRemark}}</Col></Row>
      </Row>
    </Card>
    <!-- 关联沟通计划 -->
    <relevance-communication v-on:planId="associatedPlanId"/>
    <!-- 下次沟通计划 -->
    <Card>
      <next-communication :groupId="query.groupId" :initStuCourse="studentCourseId"/>
      <Row style="margin-top:50px; text-align: center;">
          <Col span="24">
            <span style="margin-right:30px;"><Button @click="submit" size="large" type="primary"  :loading="loading1">确定</Button></span>
            <span><Button size="large" @click="over">取消</Button></span>
          </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations } from 'vuex'
import NewthetaskModal from './newthetask-modal'
import RelevanceCommunication from '../components/relevance-communication/relevance-communication'
import NextCommunication from '../components/next-communication/next-communication'
export default {
  components: { NewthetaskModal, NextCommunication, RelevanceCommunication},
  data() {
    return {
      currentPageName: this.$route.name,
      query: {},
      isNewthetask: false, //新建任务
      finsh: false, //任务是否完成
      ischangeTask: false,
      loading: false,
      loading1: false,
      studentName: '',
      studentCourseId: null,
      relevancePlanId: null,//关联
      value: '',
      //修改任务
      formChangeTask: {
        stageName: '',
        taskName: '',
        taskRemark: '',
        changeCause: '',//修改原因 input
        taskId: '',
        studentTaskId: ''
      },
      ruleChangeTask: {
        stageName: [
          {
            required: true,
            message: '阶段名称不为空'
          }
        ],
        taskName: [
          {
            required: true,
            message: '任务名称不为空'
          }
        ],
        changeCause: [
          {
            required: true,
            message: '修改原因不为空',
            trigger: 'blur'
          },
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ]
      },
      //导师评价
      formTeachComment: {
        valueHalf:0,
        taskComment: ''//任务点评 input
      },
      ruleTeachComment: {
        valueHalf: [
          {
            required: true,
            message: '请对任务进行评分'
          }
        ],
        taskComment: [
          {
            required: true,
            message: '点评内容不为空',
            trigger: 'blur'
          },
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ]
      },
      //沟通记录
      formTalkRecord: {
        point: '',//沟通要点 input
        evaluate: '',//评价 input
        guidance: '',//指导 input
        currentState: '',
        cause: ''//原因 input
      },
      ruleTalkRecord: {
        point: [
          {
            required: true,
            message: '请输入沟通要点'
          },
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ],
        evaluate: [
          {
            type: 'string',
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ],
        guidance: [
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ],
        currentState: [
          {
            required: true,
            message: '学习状态风险评估不为空'
          }
        ],
        cause: [
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'change'
          }
        ]
      },
      //数据
      currentState: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '预警'
        },
        {
          value: 2,
          label: '问题'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      nowTaskList: state => state.recordOfCommunication.nowTaskData,
      newStageList: state => state.recordOfCommunication.newStageData,
      newTasList: state => state.recordOfCommunication.newTaskData
    })
  },
  created() {
    // console.log(this.$route.query)
    this.fetchInit()
    this.fetchRecordData()
  },
  methods: {
    ...mapActions([
      'getOfCommunication',
      'getChooseStage',
      'getChooseTask',
      'postChangetask',
      'postSaveTask',
      'getRelevance',
      'postSubmit'
    ]),
    fetchInit() {
      this.query = this.$route.query
      api.getInitCommunication({
        groupId: this.query.groupId,
        studentId: this.query.userId,
        courseId: this.query.courseId
      }).then(res=>{
        if(res.status === 200){
          this.studentName = res.result[0].studentName;
          this.studentCourseId = res.result[0].studentCourseId;
          this.getRelevance({
            groupId: this.query.groupId,
            studentCourseId: res.result[0].studentCourseId
          })
        }
      })
    },
    //获取任务内容
    fetchRecordData() {
      this.query = this.$route.query
      this.getOfCommunication({
        studentId: this.query.userId,
        courseId: this.query.courseId
      })
      this.formChangeTask.studentTaskId = this.nowTaskList ? this.nowTaskList.id : ''
    },
    //新建任务
    async goNewthetask() {
      //选择阶段
      await this.getChooseStage({
        subjectId: this.query.menuId
      })
      this.isNewthetask = true
    },
    //修改任务
    changeTask() {
      this.formChangeTask.studentTaskId = this.nowTaskList ? this.nowTaskList.id :''
      this.ischangeTask = true
    },
    //选择任务
    openChange() {
      this.getChooseStage({
        subjectId: this.query.menuId
      })
    },
    changeVal(value) {
      this.getChooseTask({
        stageId: value
      })
    },
    //获取taskId&&任务描述
    changetext(value) {
      this.formChangeTask.taskId = value ? value.split('-')[0] : ''
      this.formChangeTask.taskRemark = value ? value.split('-')[1] : ''
    },
    save() {
      this.$refs.formChangeTask.validate(valid => {
        if (!valid) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
          })
          return
        }
        //保存修改任务
        this.loading = true
        setTimeout(() => {
          this.postChangetask({
            studentTaskId: this.formChangeTask.studentTaskId,
            reason: this.formChangeTask.changeCause,
            taskId: this.formChangeTask.taskId
          })
            .then(data => {
              status = data.status
              return status
            })
            .catch(err => {
              console.log('error', err)
            })
            .finally(() => {
              if (status == 201) {
                this.$Message.success('修改成功！')
                this.fetchRecordData()
                this.loading = false
                this.$refs.formChangeTask.resetFields()
                this.ischangeTask = false
              } else {
                this.$Message.error('修改失败！')
                this.loading = false
                this.$refs.formChangeTask.resetFields()
                this.ischangeTask = false
              }
            })
        }, 500)
      })
    },
    back() {
      this.$refs.formChangeTask.resetFields()
      this.ischangeTask = false
    },
    //完成后新建任务
    openChange() {
      this.getChooseStage({
        subjectId: this.query.menuId
      })
    },
    associatedPlanId(val){
      this.relevancePlanId = val
    },
    //整体提交
    submit() {
      this.formChangeTask.studentTaskId = this.nowTaskList
        ? this.nowTaskList.id
        : ''
      if (this.finsh) {
        this.$refs.formTeachComment.validate(valid => {
          if (!valid) {
            this.loading1 = true
            setTimeout(() => {
              this.loading1 = false
            })
            return
          }
          this.$refs.formTalkRecord.validate(valid => {
            if (!valid) {
              this.loading1 = true
              setTimeout(() => {
                this.loading1 = false
              })
              return
            }
            this.loading1 = true
            setTimeout(() => {
              this.funcSub()
            }, 500)
          })
        })
      } else {
        this.$refs.formTalkRecord.validate(valid => {
          if (!valid) {
            return
          }
          this.loading1 = true
            setTimeout(() => {
              this.funcSub()
            }, 500)
        })
      }
    },
    //取消
    over() {
      this.$refs.formTeachComment.resetFields();
      this.$refs.formTalkRecord.resetFields();
      this.$router.back();
      this.$store.commit("removeTag", 'mentor_record');
      this.$store.commit("closePage", 'mentor_record');
    },
    funcSub() {
      let subInfo = {
        studentTaskId: this.formChangeTask.studentTaskId,//一直
        essential: this.formTalkRecord.point,
        comment: this.formTalkRecord.evaluate,
        guide: this.formTalkRecord.guidance,
        riskEffectStatus: this.formTalkRecord.currentState,
        riskReason: this.formTalkRecord.cause,
        taskScore: this.formTeachComment.valueHalf,
        taskComment: this.formTeachComment.taskComment,
        studentId: this.query.userId,
        courseId: this.query.courseId,
        taskId:  this.finsh ? this.formChangeTask.taskId : null,//完成在新建时候
        planId: this.relevancePlanId,//关联的计划 Id
        groupId: this.query.groupId,

      }
      this.postSubmit(subInfo)
      .then(data => {
        status = data.status
        return status
      })
      .catch(err => {
        console.log('error', err)
      })
      .finally(() => {
        switch(true){
          case status == 201:
            this.$Message.success('创建成功！')
            this.loading1 = false;
            this.$refs.formTeachComment.resetFields();
            this.$refs.formTalkRecord.resetFields();
            this.$router.back();
            this.$store.commit("removeTag", 'mentor_record');
            this.$store.commit("closePage", 'mentor_record');
            break;
          case status == 423:
            this.$Message.error('学员已经有该课程下进行中的任务，无法再次创建！')
            this.loading1 = false
            break;
          case status == 401:
            this.$Message.error('当前登录人不是学员所在群的导师或副导师，不能完成或新建任务！')
            this.loading1 = false
            break;
          case status == 403:
            this.$Message.error('当前登录人不是学员所在群的班主任或导师！')
            this.loading1 = false
            break;
          case status == 404:
            this.$Message.error('任务不存在或被删除或未启用！')
            this.loading1 = false
            break;
          case status == 405:
            this.$Message.error('当前登录人不是导师或班主任！')
            this.loading1 = false
            break;
          case status == 406:
            this.$Message.error('学员任务不是进行中状态，不能完成！')
            this.loading1 = false
            break;
          case status == 409:
            this.$Message.error('登录人角色与所要创建的沟通记录类型不匹配！')
            this.loading1 = false
            break;
          case status == 410:
            this.$Message.error('学员任务不存在或已删除或已完成！')
            this.loading1 = false
            break;
          case status == 417:
            this.$Message.error('该学员状态已退费或已休学！')
            this.loading1 = false
            break;
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.RecordOfCommunication {
  h3 {
    line-height: 20px;
    font-size: 16px;
    border-left: 5px solid #2d8cf0;
    padding-left: 15px;
  }
  .p-right{
    position: absolute;
    right: 10px;
    bottom: -5px;
    color: #ccc;
  }
}
.m-t20 {
  margin-top: 20px;
}
.RecordOfCommunication /deep/ .ivu-card {
  margin-top: 10px;
}
.m-t50 {
  margin-top: 80px;
  margin-bottom: 50px;
}
</style>