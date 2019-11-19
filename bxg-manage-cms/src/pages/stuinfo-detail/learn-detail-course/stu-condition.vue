<template>
  <div class="stu_condition">
    <!-- 目前任务 -->
    <div 
      class="has_task" 
      style="width:100%;" 
      v-if="item.communicationList.length !== 0 || item.id > 0"
      v-for="(item, index) in taskList" 
      :key="index"
    >
      <div class="now_task">
        <h6 class="now_task_title">
          <span class="strip"></span>
          <span class="task_title_text">目前任务</span>
        </h6>
        <h5 class="no_task" v-if="item.id == 0">暂无任务</h5>
        <div class="retract_box" v-else>
          <div class="now_task_body">
            <p>阶段名称：<span>{{item.stageName}}</span></p>
            <p>任务目标：<span>{{item.taskName}}</span></p>
            <p>布置时间：<span>{{item.taskStartDate}}</span></p>
          </div>
          <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">任务要求：{{item.taskRemark}}</p>
        </div>
      </div>
      <div 
        class="now_task tea_communication" 
        v-for="(v, i) in item.communicationList" 
        :key="i"
        v-if="v.type == 0" 
      >
        <div class="tea_communication_wrap">
          <h6 class="now_task_title">
            <span class="strip" style="background:#00cc00;"></span>
            <span class="task_title_text">导师沟通记录</span>
          </h6>
          <div class="retract_box">
            <div class="now_task_body">
              <p>导师：<span>{{v.creator}}</span></p>
              <p>时间：<span>{{v.createTime}}</span></p>
            </div>
            <div class="grade_box" v-if="v.scored">
              <div>任务评分：<Rate disabled allow-half v-model="v.taskScore"/></div>
              <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">任务点评：{{v.taskComment}}</p>
            </div> 
            <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">沟通要点：{{v.essential}}</p>
            <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">评价：{{v.comment}}</p>
            <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">指导：{{v.guide}}</p>
            <div class="study_result_risk">
              <div class="sr_risk_title">学习效果风险评估：</div>
              <div class="retract_box">
                <p v-if="v.riskEffectStatus == 0">目前状态：<span>正常</span></p>
                <p v-else-if="v.riskEffectStatus == 1">目前状态：<span>预警</span></p>
                <p v-else>目前状态：<span>问题</span></p>
                <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">原因：{{v.riskReason}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        class="now_task tea_communication_charge" 
        v-for="(n, ix) in item.communicationList" 
        :key="ix"
        v-if="n.type == 1" 
      >
        <div class="tea_communication_wrap">
          <h6 class="now_task_title">
            <span class="strip" style="background:#cb3333;"></span>
            <span class="task_title_text">班主任沟通记录</span>
          </h6>
          <div class="retract_box" v-if="!n.contactState">
            <template v-if="n.essential">
              <div class="now_task_body">
              <p>班主任：<span>{{n.creator}}</span></p>
              <p>时间：<span>{{n.createTime}}</span></p>
            </div>
            <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">沟通要点：{{n.essential}}</p>
            <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">班主任评价：{{n.comment}}</p>
            <div class="study_result_risk">
              <div class="sr_risk_title">学习状态风险评估：</div>
              <div class="retract_box">
                <p v-if="n.riskStudyStatus == 0">目前状态：<span>正常</span></p>
                <p v-else-if="n.riskStudyStatus == 1">目前状态：<span>预警</span></p>
                <p v-else>目前状态：<span>问题</span></p>
                <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">原因：{{n.riskReason}}</p>
              </div>
            </div>
            </template>
            <template v-else>
               <div class="now_task_body">
                <p>班主任：<span>{{n.creator}}</span></p>
                <p>时间：<span>{{n.createTime}}</span></p>
              </div>
               <div class="study_result_risk">
              <div class="sr_risk_title">是否失联：<span>{{n.contactState == 0?'失联':'未失联'}}</span></div>
              <div class="retract_box">
                <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">备注：{{n.contactRemark}}</p>
              </div>
            </div>
            </template>
          </div>
          <div class="retract_box" v-else> 
            <div class="now_task_body">
              <p>班主任：<span>{{n.creator}}</span></p>
              <p>时间：<span>{{n.createTime}}</span></p>
            </div>
            <div class="study_result_risk">
              <div class="sr_risk_title">是否失联：<span>{{n.contactState == 0?'失联':'未失联'}}</span></div>
              <div class="retract_box">
                <p class="task_demand" style="word-break:break-all;word-wrap:break-word;">备注：{{n.contactRemark}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isShowEmpty" class="no_available">该学员暂无学员动态</div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'stuCondition',
  data() {
    return {
      valueHalf: 0, //x
      isGrade: true, //是否点评
      stuComInfo: '',
      taskList: [], //目标任务列表
      no_taskList: [], //无目标任务列表 */
    }
  },
  mounted() {
    let uInfo = this.$route.query
    this.fetchStuDynamic({
      courseId: uInfo.courseId,
      studentId: uInfo.userId
    }).then(() => {
      //这里操作
      this.taskList = this.$store.state.stuCondition.stu_communication
    })
  },
  methods: {
    ...mapActions(['fetchStuDynamic'])
  },
  computed: {
    ...mapState({
      stu_communication: state => state.stuCondition.stu_communication
    }),
    isShowEmpty() {
      if (this.taskList) {
        if (this.taskList.length === 1 && 
            this.taskList[0].communicationList.length === 0 && 
            this.taskList[0].id == 0
        ) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.stu_condition {
  .has_task {
    background: #fff;
    .now_task {
      position: relative;
      padding: 16px;
      .now_task_title {
        display: flex;
        .task_title_text {
          font-size: 16px;
          font-weight: normal;
          line-height: 24px;
          margin-left: 4px;
        }
        .strip {
          display: block;
          width: 4px;
          height: 20px;
          background: #0f8ee9;
        }
      }
      .retract_box {
        padding-left: 16px;
        .now_task_body {
          display: flex;
          margin-top: 15px;
          p {
            span {
              color: #a2a2a2;
            }
          }
          p + p {
            margin-left: 20px;
          }
        }
        .task_demand {
          margin-top: 10px;
          span {
            color: #a2a2a2;
          }
        }
      }
    }
    .no_task {
      padding-left: 20px;
      font-size: 28px;
      color: #a1a1a1;
    }
    .tea_communication {
      padding: 0;
      background: #ebfbff;
      .tea_communication_wrap {
        padding: 16px;
        .study_result_risk {
          // border-bottom: 1px dashed #a1a1a1;
          padding-bottom: 20px;
          .sr_risk_title,
          .retract_box {
            margin-top: 10px;
          }
        }
      }
    }
    .tea_communication_charge {
      background: #f7ffea;
      .study_result_risk {
        margin-top: 10px;
        .sr_risk_title {
          span {
            color: #a1a1a1;
          }
        }
      }
    }
  }
  .has_task + .has_task {
    margin-top: 20px;
  }
}
//下滑虚线
.imaginary_line {
  border-bottom: 1px dashed #a1a1a1;
  padding-bottom: 20px;
}
//////iview
.stu_condition /deep/ .ivu-card-body {
  padding: 0;
}
.no_available{
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
</style>


