<template>
  <!-- 综合信息 -->
  <div class="projectInfo_Container" v-if="dataShow">
    <div class="projectInfo_ContL fl">
      <!-- 项目概况 -->
      <div class="projectInfo_Overview">
        <div class="projectInfo_OverviewTit">
          <p class="fl"><i class="iconfont icon-xiangmugaikuang marginRight10"></i>项目概况</p>
          <p class="fr underlineCommon" @click="showDetail">详情 >></p>
        </div>
        <div class="projectInfo_OverviewCont">
          <div class="hInfo">
            <el-row :gutter="24" class="fl">
              <el-col :span="5"><b>项目名称：</b></el-col>
              <el-col :span="19"><span>{{projectInfoAllData.projectInfo.projectName}}</span></el-col>
            </el-row>
            <el-row :gutter="24" class="fl">
              <el-col :span="6"><b>评估基准日：</b></el-col>
              <el-col :span="18"><span>{{projectInfoAllData.projectInfo.assessmentBaseDate}}</span></el-col>
            </el-row>
          </div>
          <div class="hInfo">
            <el-row :gutter="24" class="fl">
              <el-col :span="5"><b>来源途径：</b></el-col>
              <el-col :span="19"><span>{{commonData.projectSourceId[projectInfoAllData.projectInfo.ASprojectSourceId]}}</span></el-col>
            </el-row>
            <el-row :gutter="24" class="fl">
              <el-col :span="5"><b>项目级别：</b></el-col>
              <el-col :span="19"><span>{{commonData.projectLevelId[projectInfoAllData.projectInfo.projectLevelId]}}</span></el-col>
            </el-row>
          </div>
          <div class="hInfo">
            <el-row :gutter="24" class="fl">
              <el-col :span="5"><b>评估对象：</b></el-col>
              <el-col :span="19"><span>{{projectInfoAllData.free.assessmentTarget}}{{projectObj}}</span></el-col>
            </el-row>
            <el-row :gutter="24" class="fl">
              <el-col :span="7"><b>评估报告类型：</b></el-col>
              <el-col :span="17"><span>{{commonData.assetReportTypeId[projectInfoAllData.projectInfo.assetReportTypeId]}}</span></el-col>
            </el-row>
          </div>
          <div class="hInfo">
            <el-row :gutter="24" class="fl">
              <el-col :span="5"><b>项目性质：</b></el-col>
              <el-col :span="19"><span>{{commonData.projectNatureId[projectInfoAllData.projectInfo.projectNatureId]}}</span></el-col>
            </el-row>
            <el-row :gutter="24" class="fl">
              <el-col :span="5"><b>资产总额：</b></el-col>
              <el-col :span="19"><span v-if="projectInfoAllData.projectInfo.totalAssets!=''">{{projectInfoAllData.projectInfo.totalAssets}}万元</span></el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 项目底稿统计 -->
      <div class="projectInfo_ManuscriptStatistics marginTop10">
        <div class="projectInfo_ManuscriptStatisticsTit">
          <p class="fl flicon"><i class="iconfont icon-xiangmudigao marginRight10"></i>项目底稿统计</p>
          <!-- <p class="fr frarrow">
            <router-link to="/zlpg/project/projectCont/projectManuscript"><i class="iconfont icon-gengduo_xiangqing"></i></router-link>
          </p> -->
        </div>
        <div class="projectInfo_ManuscriptStatisticsCont">
          <div class="fl" v-for="(item,index) in projectInfoAllData.docs" :key="index">
            <!-- <router-link :to="item.routerPath"> -->
              <div class="projectInfo_ManuscriptStatisticsIcon fl"><img :src="picList[index].picUrl" alt=""></div>
              <div class="projectInfo_ManuscriptStatisticsTip fl">
                <p>{{item.fileCount}}</p>
                <p>{{item.fileName}}</p>
              </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
      <!-- 动态 -->
      <div class="projectInfo_Dynamic marginTop10">
        <div class="projectInfo_DynamicTit">
          <p class="fl"><i class="iconfont icon-xiangmudongtai- marginRight10"></i>项目动态</p>
        </div>
        <div class="projectInfo_DynamicCont">
          <div class="noData" v-if="noProjectDynamicData">暂无数据</div>
          <vue-recyclist
            v-else
            :list = "projectDynamicData"
            :size="rows"
            :offset="200"
            :tombstone="false"
            :nomore = "nomore"
            :loadmore="loadmore">
            <div slot="item" slot-scope="props">
              <div class="step">
                <img src="../../../assets/common/stepClock.png" alt="">
                <div class="projectInfo_DynamicTime fr">时间：<span>{{props.data.createTime}}</span></div>
              </div>
              <div class="projectInfo_DynamicItem clear">
                <!--<b></b>-->
                <div class="projectInfo_DynamicPhoto fl"><i class="iconfont icon-renyuan"></i></div>
                <div class="projectInfo_DynamicDetail fl">
                  <p><span :style="{color: '#262628','font-weight':'500'}">{{props.data.userName}}</span><span class="marginLeft10">{{props.data.roleName}}</span></p>
                  <p><span style="display: block">{{ props.data.onlineOffline+'' === "0" ? "线下" : props.data.onlineOffline+'' === "1" ? "线上" : ''}}{{props.data.operContent}}{{props.data.investorName ? '-'+props.data.investorName :''}}</span></p>
                  <p v-if="props.data.processStateId"><span>审核结果：</span><span :style="{color:getColor(props.data.processStateId)}">{{(props.data.processStateId*1 == 1099 || props.data.processStateId*1 == 1100) ? commonData['nodeTypeId'][props.data.processStateId] : commonData['processStateId'][props.data.processStateId]}}</span></p>
                </div>
                <div class="projectInfo_projectName" :title="$store.state.projectInfo.projectName">
                  <i></i>
                  {{$store.state.projectInfo.projectName}}
                </div>
              </div>
            </div>
            <div slot="nomore"></div>
          </vue-recyclist>
        </div>
      </div>
    </div>
    <div class="projectInfo_ContR fr">
      <!-- 集群统计 -->
      <!-- <div class="projectInfo_ClusterStatistics">
          <div class="projectInfo_ClusterStatisticsTit">
              <p class="fl flicon"><i class="iconfont icon-pingguduixiangtongji marginRight10"></i>集群统计</p>
              <p class="fr frarrow"><i class="iconfont icon-gengduo_xiangqing"></i></p>
          </div>
          <div class="projectInfo_ClusterStatisticsCont">
              <div id="clusterStatisticsEchart" class="echarts"></div>
          </div>
      </div> -->
      <!-- 项目进度 -->
      <!-- marginTop10 -->
      <div class="projectInfo_Progress">
        <div class="projectInfo_ProgressTit">
          <p class="fl flicon"><i class="iconfont icon-xiangmujindu marginRight10"></i>项目进度</p>
          <!-- <p class="fr frarrow">
            <router-link to="/zlpg/projectCont/projectSchedule"><i class="iconfont icon-gengduo_xiangqing"></i></router-link>
          </p> -->
        </div>
        <div class="projectInfo_ProgressCont">
          <div>
            <p>总体进度：</p>
            <div>
              <ul class="line-time">
                <li :class="item.status" v-for="(item,index) in projectStatuss" :key="index + '1'">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p>里程碑：</p>
            <div>
              <p><span>总计：</span><span class="textOverflow1" :title="projectInfoAllData.milestonePlan.totalfinishcount + '个'">{{ projectInfoAllData.milestonePlan.totalfinishcount != '' ? projectInfoAllData.milestonePlan.totalfinishcount : 0 }}个</span></p>
              <p><span>完成：</span><span class="textOverflow1" :title="projectInfoAllData.milestonePlan.finishcount + '个'">{{ projectInfoAllData.milestonePlan.finishcount != '' ? projectInfoAllData.milestonePlan.finishcount : 0 }}个</span></p>
              <p><span>占比：</span><span class="textOverflow1" :title=" projectInfoAllData.milestonePlan.percentage != '' ? (projectInfoAllData.milestonePlan.percentage).toFixed(2) : 0  + '%'">{{ projectInfoAllData.milestonePlan.percentage != '' ? (projectInfoAllData.milestonePlan.percentage).toFixed(2) : 0 }}%</span></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 项目作业 -->
      <div class="projectInfo_Implementation marginTop10">
        <div class="projectInfo_ImplementationTit">
          <p class="fl flicon"><i class="iconfont icon-xiangmushishi marginRight10"></i>项目作业</p>
          <!-- <p class="fr frarrow">
            <router-link to="/zlpg/projectCont/projectImplementation/projectOnlineTask/projectInfo"><i class="iconfont icon-gengduo_xiangqing"></i></router-link>
          </p> -->
        </div>
        <div class="projectInfo_ImplementationCont">
          <div class="marginBottom10 paddingBottom10">
            <p><span>现场作业任务总数量：</span><span class="textOverflow1" :title="projectInfoAllData.field.totalcount + '个'">{{ projectInfoAllData.field.totalcount != '' ? projectInfoAllData.field.totalcount : 0 }}个</span></p>
            <div>
              <p class="fl"><span>已完成：</span><span class="textOverflow1" :title="projectInfoAllData.field.finishcount + '个'">{{ projectInfoAllData.field.finishcount != '' ? projectInfoAllData.field.finishcount : 0 }}个</span></p>
              <p class="fl"><span>进行中：</span><span class="textOverflow1" :title="projectInfoAllData.field.unfinishcount + '个'">{{ projectInfoAllData.field.unfinishcount != '' ? projectInfoAllData.field.unfinishcount : 0 }}个</span></p>
            </div>
          </div>
          <div>
            <p><span>评估作业任务总数量：</span><span class="textOverflow1" :title="projectInfoAllData.job.totalcount + '个'">{{ projectInfoAllData.job.totalcount != '' ? projectInfoAllData.job.totalcount : 0 }}个</span></p>
            <div>
              <p class="fl"><span>已完成：</span><span class="textOverflow1" :title="projectInfoAllData.job.jobfinishcount + '个'">{{ projectInfoAllData.job.jobfinishcount != '' ? projectInfoAllData.job.jobfinishcount : 0 }}个</span></p>
              <p class="fl"><span>进行中：</span><span class="textOverflow1" :title="projectInfoAllData.job.unfinishcount + '个'">{{ projectInfoAllData.job.unfinishcount != '' ? projectInfoAllData.job.unfinishcount : 0 }}个</span></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 项目人员 -->
      <div class="projectInfo_Personnel marginTop10">
        <div class="projectInfo_PersonnelTit">
          <p class="fl flicon"><i class="iconfont icon-renyuan marginRight10"></i>项目人员</p>
          <!-- <p class="fr frarrow">
            <router-link to="/zlpg/projectCont/projectPersonnel"><i class="iconfont icon-gengduo_xiangqing"></i></router-link>
          </p> -->
        </div>
        <div class="projectInfo_PersonnelCont">
          <div class="marginBottom10 paddingBottom10">
            <p><span>负责人：</span><span class="textOverflow1" :title="projectInfoAllData.person.chargeleadername">{{projectInfoAllData.person.chargeleadername}}</span></p>
            <p><span>其他负责人：</span><span class="textOverflow1" :title="projectInfoAllData.person.leadername">{{projectInfoAllData.person.leadername}}</span></p>
            <p><span>项目成员：</span><span class="textOverflow1" :title="projectInfoAllData.person.memberUser">{{projectInfoAllData.person.memberUser}}</span></p>
          </div>
          <p><span>项目总人数：</span><span class="textOverflow1" :title="projectInfoAllData.person.totalCount + '人'">{{ projectInfoAllData.person.totalCount != '' ? projectInfoAllData.person.totalCount : 0 }}人</span></p>
        </div>
      </div>
      <!-- 项目预算 -->
      <div class="projectInfo_Budget marginTop10">
        <div class="projectInfo_BudgetTit">
          <p class="fl flicon"><i class="iconfont icon-yusuan marginRight10"></i>项目预算</p>
          <!-- <p class="fr frarrow"><i class="iconfont icon-gengduo_xiangqing"></i></p> -->
        </div>
        <div class="projectInfo_BudgetCont">
          <div class="marginBottom10 paddingBottom10">
            <p><span>人员安排及费用：</span><span class="textOverflow1" :title="projectInfoAllData.free.rewardSum + '元'">{{ projectInfoAllData.free.rewardSum != '' ? projectInfoAllData.free.rewardSum : 0 }}元</span></p>
            <p><span>差旅费用：</span><span class="textOverflow1" :title="projectInfoAllData.free.travelbudgetSum + '元'">{{ projectInfoAllData.free.travelbudgetSum != '' ? projectInfoAllData.free.travelbudgetSum : 0 }}元</span></p>
            <p><span>本地费用：</span><span class="textOverflow1" :title="projectInfoAllData.free.hjLocalSum + '元'">{{ projectInfoAllData.free.hjLocalSum != '' ? projectInfoAllData.free.hjLocalSum : 0 }}元</span></p>
          </div>
          <p><span>总预算：</span><span class="textOverflow1" :title="projectInfoAllData.free.projectTotalSum + '元'">{{ projectInfoAllData.free.projectTotalSum != '' ? projectInfoAllData.free.projectTotalSum : 0 }}元</span></p>
        </div>
      </div>
      <!-- 项目工时 -->
      <div class="projectInfo_WorkingHours marginTop10">
        <div class="projectInfo_WorkingHoursTit">
          <p class="fl flicon"><i class="iconfont icon-gongshi marginRight10"></i>项目工时</p>
          <!-- <p class="fr frarrow">
            <router-link to="/zlpg/projectCont/projectWorkinghours"><i class="iconfont icon-gengduo_xiangqing"></i></router-link>
          </p> -->
        </div>
        <div class="projectInfo_WorkingHoursCont">
          <div class="marginBottom10 paddingBottom10">
            <p><span>本周线上工时：</span><span class="textOverflow1" :title="projectInfoAllData.timeMap1.onlineSumWeekly + '小时'">{{ projectInfoAllData.timeMap1.onlineSumWeekly != '' ? projectInfoAllData.timeMap1.onlineSumWeekly : 0 }}小时</span></p>
            <p><span>本周线下工时：</span><span class="textOverflow1" :title="projectInfoAllData.timeMap1.offlineSumWeekly + '小时'">{{ projectInfoAllData.timeMap1.offlineSumWeekly != '' ? projectInfoAllData.timeMap1.offlineSumWeekly : 0 }}小时</span></p>
          </div>
          <p><span>本周总工时：</span><span class="textOverflow1" :title="projectInfoAllData.timeMap1.timeSheetSumWeekly + '小时'">{{ projectInfoAllData.timeMap1.timeSheetSumWeekly != '' ? projectInfoAllData.timeMap1.timeSheetSumWeekly : 0 }}小时</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueRecyclist from "vue-recyclist";
export default {
  data() {
    return {
      projectInfoAllData: {},
      projectObj: "",
      picList: [
        { picUrl: require("../../../../static/img/pgbg.png") },
        { picUrl: require("../../../../static/img/pgsm.png") },
        { picUrl: require("../../../../static/img/cbfmxb.png") },
        { picUrl: require("../../../../static/img/syfmxb.png") },
        { picUrl: require("../../../../static/img/scfmxb.png") },
        { picUrl: require("../../../../static/img/czldg.png") },
        { picUrl: require("../../../../static/img/zj.png") }
        //  routerPath: "/zlpg/projectCont/projectManuscript"
      ],
      dataShow: false,
      projectDynamicData: [], //项目动态数据
      page: 1,
      rows:10,
      commonData: window.commonData,
      nomore: false,
      noProjectDynamicData: false,
      personData: {},
      projectStatuss: [],
    };
  },
  methods: {
    init() {
      this.draw(
        "clusterStatisticsEchart",
        "/api/projects/getProjectAssessmentTargetCount",
        {
          data: ["已提交机构", "未提交机构"],
          name: "评估对象",
          color: ["#7C9FEE", "#F7B543"]
        }
      );
    },
    draw(id, url, obj) {
      this.$http
        .post(url, {
          findType: this.type,
          groupIds: this.$store.state.groupId,
          year: this.$store.state.year
        })
        .then(
          response => {
            obj.seriesName = response.data.list;
            //初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(id));
            //使用制定的配置项和数据显示图表
            myChart.setOption(this.option(obj));
          },
          response => {
            console.log("数据加载失败");
          }
        );
    },
    option(data) {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          y: "170px",
          data: data.data,
          formatter: function(name) {
            let str = name;
            let seriesValue;
            for (let item in data.seriesName) {
              if (data.seriesName[item].name == name) {
                seriesValue = data.seriesName[item].value;
              }
            }
            let len = 32 - name.length * 3 - seriesValue.length;
            for (let i = 0; i < len; i++) {
              str += " ";
            }
            str += seriesValue + "个";
            return str;
          }
        },
        series: [
          {
            name: data.name,
            type: "pie",
            radius: ["60%", "80%"],
            center: ["50%", "90px"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.seriesName,
            color: data.color
          }
        ]
      };
    },
    // 项目概况跳详情
    showDetail() {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "项目详情";
      this.$store.state.commonBtn = "";
      this.$store.state.componentsType = "projectDetail";
      this.$store.state.isScroll = false;
    },
    //项目动态懒加载
    loadmore() {
      if(this.nomore) return;
      this.getprojectDynamicList();
    },
    //获取项目动态数据
    getprojectDynamicList() {
      const _this = this
      const { projectId } = _this.$store.state;
      const { page,rows } = _this;
      //      const projectId = 1;
      _this.$http
        .post("/api/projectDynamic/findPageList", { projectId,page,rows })
        .then(response => {
          _this.projectDynamicData = [
            ..._this.projectDynamicData,
            ...response.data
          ];
          if(response.count*1 === 0){
            _this.noProjectDynamicData = true;
            _this.nomore = true;
          }else if(_this.projectDynamicData.length < response.count*1){
            _this.page+=1
          }else if (_this.projectDynamicData.length >= response.count*1) {
            _this.nomore = true;
          }
        })
        .catch(error => {
          _this.nomore = true;
          _this.$messageError(error);
        });
    },
    //判断审核结果
    getColor(processStateId){
      switch (processStateId){
        case 1099:
          return '#20C34B';
        case 1100:
          return "#ED8939";
        default:
          const state = commonData['processStateId'][processStateId];
          if(state.indexOf('通过') !== -1){
            return '#20C34B'
          }
          else if(state.indexOf('拒绝') !== -1){
            return "#ED8939"
          }
      }
    }
    // 取cookie方法
    // getCookie: function(cname) {
    //   var name = cname + "=";
    //   var ca = document.cookie.split(";");
    //   for (var i = 0; i < ca.length; i++) {
    //     var c = ca[i];
    //     while (c.charAt(0) == " ") c = c.substring(1);
    //     if (c.indexOf(name) != -1) {
    //       return c.substring(name.length, c.length);
    //     }
    //   }
    //   return "";
    // }
  },
  // created() {
  //   // 通过coolie取出得值判断
  //   if (this.getCookie("queryUserSysFunction")) {
  //     var lists = JSON.parse(this.getCookie("queryUserSysFunction"))[1].list;
  //     for (var i = 0; i < lists.length; i++) {
  //       console.log(lists[i]);
  //     }
  //   }
  // },
  mounted() {
    var _this = this;
    // 信息
    this.$http
      .post("/api/projects/getProjectInfo", {
        projectId: this.$store.state.projectId
      })
      .then(function(data) {
        _this.dataShow = true;
        _this.projectInfoAllData = data.data;
        _this.projectStatuss = data.data.projectStatus;
        if (_this.projectInfoAllData.free.details) {
          _this.projectObj = "(" + _this.projectInfoAllData.free.details + ")";
        } else {
          _this.projectObj = "";
        }
        //        _this.getprojectDynamicList();
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  },
  components: { VueRecyclist }
};
</script>
<style lang="scss" scoped>
.projectInfo_Container {
  .projectInfo_ContL /deep/ {
    width: 760px;
    // 项目概况
    .projectInfo_Overview {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_OverviewTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding: 0 10px 0 20px;
        > p:first-child {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #98c268;
          }
        }
        > p:last-child {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(58, 128, 236, 1);
          cursor: pointer;
        }
      }
      .projectInfo_OverviewCont {
        padding: 24px 40px;
        .hInfo {
          clear: both;
          line-height: 31px;
          height: 31px;
          .el-row {
            margin-left: 0!important;
            margin-right: 0 !important;
            width: 48%;
            .el-col {
              padding: 0 !important;
              b {
                color: #777777;
                font-size: 13px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
              }
              span {
                color: #1D1C1E;
                font-size: 13px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                word-wrap:break-word;
              }
            }
          }
          .el-row:last-child {
            margin-left: 4%!important;
          }
        }
      }
    }
    // 项目底稿统计
    .projectInfo_ManuscriptStatistics {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_ManuscriptStatisticsTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #7c9fee;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_ManuscriptStatisticsCont {
        padding: 16px 8px 4px 20px;
        display: inline-block;
        > div {
          width: 168px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(236, 236, 236, 1);
          margin-right: 12px;
          margin-bottom: 12px;
          .projectInfo_ManuscriptStatisticsIcon {
            margin: 14px 10px 14px 14px;
            width: 32px;
            height: 32px;
          }
          .projectInfo_ManuscriptStatisticsTip {
            > p:first-child {
              margin-top: 10px;
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(38, 38, 40, 1);
              line-height: 22px;
              min-height: 22px;
            }
            > p:last-child {
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(99, 99, 99, 1);
            }
          }
        }
      }
    }
    // 动态
    .projectInfo_Dynamic {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_DynamicTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        > p {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          height: 35px;
          i {
            color: #4fc69f;
          }
        }
      }
      .projectInfo_DynamicCont {
        width: 100%;
        /*   .projectInfo_DynamicItem {
          position: relative;
          height: 70px;
          background: rgba(249, 249, 249, 1);
          margin-left: 10px;
          b {
            display: inline-block;
            width: 0;
            height: 0;
            position: absolute;
            vertical-align: middle;
            border-top: 8px solid transparent;
            border-right: 8px solid #f9f9f9;
            border-bottom: 8px solid transparent;
            left: -8px;
            top: 15px;
          }
          .projectInfo_DynamicPhoto {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #fff;
            margin: 9px 12px 9px 24px;
            text-align: center;
            line-height: 52px;
            i {
              color: #e7e7e7;
              font-size: 30px;
            }
          }
          .projectInfo_DynamicDetail {
            margin-top: 12px;
            > p:first-child {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(106, 106, 106, 1);
              line-height: 22px;
            }
            > p:last-child {
              font-size: 12px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(106, 106, 106, 1);
              line-height: 24px;
              span:last-child {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(80, 173, 238, 1);
                cursor: pointer;
              }
            }
          }
          .projectInfo_DynamicTime {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(106, 106, 106, 1);
            margin-right: 35px;
            line-height: 70px;
          }
        }*/
        /*display: flex;*/
        /*.projectInfo_DynamicLine {
          .projectInfo_steps {
            .projectInfo_step {
              .el-step__head .el-step__line {
                width: 1px;
                bottom: -14px;
              }
            }
            .projectInfo_stepOne .icon-IconClock {
              color: #50adee;
            }
            .icon-IconClock {
              color: #bfbfbf;
            }
          }
        }
        .projectInfo_DynamicList {
          flex: 1;
          .projectInfo_DynamicItem {
            position: relative;
            height: 70px;
            background: rgba(249, 249, 249, 1);
            margin-left: 10px;
            b {
              display: inline-block;
              width: 0;
              height: 0;
              position: absolute;
              vertical-align: middle;
              border-top: 8px solid transparent;
              border-right: 8px solid #f9f9f9;
              border-bottom: 8px solid transparent;
              left: -8px;
              top: 15px;
            }
            .projectInfo_DynamicPhoto {
              width: 52px;
              height: 52px;
              border-radius: 50%;
              background: #fff;
              margin: 9px 12px 9px 24px;
              text-align: center;
              line-height: 52px;
              i {
                color: #e7e7e7;
                font-size: 30px;
              }
            }
            .projectInfo_DynamicDetail {
              margin-top: 12px;
              > p:first-child {
                font-size: 12px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(106, 106, 106, 1);
                line-height: 22px;
              }
              > p:last-child {
                font-size: 12px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(106, 106, 106, 1);
                line-height: 24px;
                span:last-child {
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(80, 173, 238, 1);
                  cursor: pointer;
                }
              }
            }
            .projectInfo_DynamicTime {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(106, 106, 106, 1);
              margin-right: 35px;
              line-height: 70px;
            }
          }
        }*/
      }
      .vue-recyclist {
        width: 100%;
        max-height: 460px;
        padding-top: 20px;
        padding-bottom: 20px;
        .projectInfo_DynamicItem {
          margin-right: 27px;
          position: relative;
          background: rgba(249, 249, 249, 1);
          margin-left: 27px;
          /*b {
            display: inline-block;
            width: 0;
            height: 0;
            position: absolute;
            vertical-align: middle;
            border-top: 8px solid transparent;
            border-right: 8px solid #f9f9f9;
            border-bottom: 8px solid transparent;
            left: -8px;
            top: 15px;
          }*/
          .projectInfo_DynamicPhoto {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #fff;
            margin: 9px 12px 9px 24px;
            text-align: center;
            line-height: 52px;
            i {
              color: #e7e7e7;
              font-size: 30px;
            }
          }
          .projectInfo_DynamicDetail {
            margin-top: 15px;
            margin-bottom: 15px;
            >p{
              line-height: 17px;
              margin-bottom: 5px;
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
            }
            > p:first-child {
              color: rgba(106, 106, 106, 1);
            }
            > p:nth-child(2) {
              color: #ED8939;
              span{
                display: block;
                width: 300px;
              }
            }
            > p:last-child {
              color: rgba(106, 106, 106, 1);
              margin-bottom: 0;
              span:last-child {
                color: #145fd2;
              }
            }
          }
          .projectInfo_projectName{
            max-width: 425px;
            height:18px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color: #262628;
            line-height:18px;
            margin-top: 15px;
            margin-right: 20px;
            position: absolute;
            right: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-indent: 10px;
            i{
              display: block;
              float: left;
              width:4px;
              height:4px;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              margin: auto;
              background: #F09237;
              border-radius:7px;
            }
          }
        }
        .step {
          height: 60px;
          margin-left: 27px;
          position: relative;
          img{
            display: block;
            position: absolute;
            top:27px;
            left:0;
          }
          .projectInfo_DynamicTime {
            height:17px;
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(106,106,106,1);
            line-height:17px;
            position: absolute;
            left:29px;
            top: 28px;
          }
          /*.icon-IconClock {*/
            /*color: #bfbfbf;*/
          /*}*/
          /*.activeClock {*/
            /*color: #50adee;*/
          /*}*/
        }
        .step::after,.step::before {
          content: "";
          display: block;
          width: 1px;
          background-color: #bfbfbf;
          position: absolute;
          left: 10px;
        }
        .step::before{
          height: 22px;
          top: 2px;
        }
        .step::after{
          height: 9px;
          bottom: 2px;
        }
      }
    }
  }
  .projectInfo_ContR {
    width: 260px;
    // 集群统计
    .projectInfo_ClusterStatistics {
      height: 280px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_ClusterStatisticsTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #f09237;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_ClusterStatisticsCont {
        .echarts {
          width: 180px;
          height: 250px;
          margin: 0 auto 10px;
        }
      }
    }
    // 项目进度
    .projectInfo_Progress {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_ProgressTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #7c9fee;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_ProgressCont {
        padding: 12px 20px;
        > div {
          width: 100%;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(38, 38, 40, 1);
            line-height: 22px;
          }
        }
        > div:first-child {
          .line-time {
            border-top: 1px dashed hsl(0, 0%, 59%);
            margin: 38px 0 20px;
            li {
              width: 14px;
              height: 14px;
              float: left;
              margin-left: 32px;
              margin-top: -7px;
              border-radius: 100%;
              background: url(../../home/img/unfinished.png) no-repeat;
              background-size: 14px 14px;
              position: relative;
              span {
                width: 40px;
                color: #b9b9b9;
                line-height: 17px;
                text-align: center;
                position: absolute;
                top: -22px;
                left: -14px;
                font-size: 13px;
              }
            }
            .accomplish {
              background: url(../../home/img/complete.png) no-repeat;
              span {
                color: #98c268;
              }
            }
            .underway {
              background: url(../../home/img/doing.png) no-repeat;
              span {
                color: #83b3ff;
              }
            }
          }
        }
        > div:last-child {
          > div {
            display: inline-block;
            width: inherit;
            p {
              float: left;
              width: 50%;
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #777777;
              line-height: 22px;
              display: flex;
              span:last-child {
                flex: 1;
                -ms-flex:1 0 auto;
                color: #ea7f2b;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    // 项目实施
    .projectInfo_Implementation {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_ImplementationTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #5fa9ec;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_ImplementationCont {
        padding: 12px 20px;
        > div:first-child {
          border-bottom: 1px dashed #e1e1e1;
        }
        > div {
          clear: both;
          display: inline-block;
          width: 100%;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #777777;
            line-height: 22px;
            display: flex;
            span:last-child {
              flex: 1;
              -ms-flex:1 0 auto;
              font-size: 16px;
              color: #ea7f2b;
            }
          }
          > div {
            > p {
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #777777;
              width: 50%;
              line-height: 22px;
              display: flex;
              span:last-child {
                flex: 1;
                -ms-flex:1 0 auto;
                color: #1D1C1E;
              }
            }
          }
        }
      }
    }
    // 项目人员
    .projectInfo_Personnel {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_PersonnelTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #57bfb2;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_PersonnelCont {
        padding: 12px 20px;
        > div {
          border-bottom: 1px dashed #e1e1e1;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #777777;
            line-height: 24px;
            display: flex;
            span:last-child {
              color: #1D1C1E;
              flex: 1;
              -ms-flex:1 0 auto;
            }
          }
        }
        > p {
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          line-height: 26px;
          display: flex;
          span:last-child {
            color: #ea7f2b;
            font-size: 16px;
            flex: 1;
            -ms-flex:1 0 auto;
          }
        }
      }
    }
    // 项目预算
    .projectInfo_Budget {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_BudgetTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #c3a2eb;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_BudgetCont {
        padding: 12px 20px;
        > div {
          border-bottom: 1px dashed #e1e1e1;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #777777;
            line-height: 24px;
            display: flex;
            span:last-child {
              color: #1D1C1E;
              flex: 1;
              -ms-flex:1 0 auto;
            }
          }
        }
        > p {
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          line-height: 26px;
          display: flex;
          span:last-child {
            color: #ea7f2b;
            font-size: 16px;
            flex: 1;
            -ms-flex:1 0 auto;
          }
        }
      }
    }
    // 项目工时
    .projectInfo_WorkingHours {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      .projectInfo_WorkingHoursTit {
        background: #fafafa;
        height: 35px;
        line-height: 35px;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        padding-left: 20px;
        p.flicon {
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          i {
            color: #7c9fee;
          }
        }
        p.frarrow {
          width: 35px;
          height: 35px;
          border-left: 1px solid rgba(236, 236, 236, 1);
          cursor: pointer;
          i {
            color: #c0c0c0;
            text-align: center;
            width: 35px;
            display: inline-block;
          }
        }
      }
      .projectInfo_WorkingHoursCont {
        padding: 12px 20px;
        > div {
          border-bottom: 1px dashed #e1e1e1;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #777777;
            line-height: 24px;
            display: flex;
            span:last-child {
              color: #1D1C1E;
              flex: 1;
              -ms-flex:1 0 auto;
            }
          }
        }
        > p {
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(38, 38, 40, 1);
          line-height: 26px;
          display: flex;
          span:last-child {
            flex: 1;
            -ms-flex:1 0 auto;
            color: #ea7f2b;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
