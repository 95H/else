<template>
  <div>
    <Row :gutter="10" v-if="!type" class="baseOption">
      <Col span="6">
        <Input placeholder="请输入阶段群名称" v-model="searchParams.stageGroupName" clearable/>
      </Col>
      <Col span="6">
        <Select placeholder="请选择学科" @on-change="changeData" v-model="searchParams.subjectId" filterable clearable>
          <Option :title="item.menuName" class="Options" v-for="item in subjectList" :value="item.menuId" :key="item.menuId">{{ item.menuName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="阶段名称" v-model="searchParams.stageIds" filterable clearable>
          <Option :title="item.stageName" class="Options" v-for="item in phaseName" :value="item.stageId" :key="item.stageIds">{{ item.stageName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button>清除</Button></span>
      </Col>
    </Row>
    <Row style="margin-top:16px;" class="stage" id="table-stage-list">
      <Col style="padding-left:1px;">
        <Table border :height="baseHeight" :loading="loading" :columns="columns" :data="list"></Table>
      </Col>
      <Col class="m-t20">
        <Page style="text-align: right; padding-bottom: 1px"
              :current="pageInfo.pageNumber"
              :page-size-opts="arrPage"
              :total="pageInfo.total"
              @on-change="changeCurrent"
              @on-page-size-change="changePageSize"
              :transfer="true"
              show-total show-elevator show-sizer></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
  import api from '@/api/index'
  import util from '@/util/util'
  import { mapActions, mapState, mapMutations,mapGetters } from 'vuex'
  export default {
    props: {
      from: String,
      type: Number,
    },
    data() {
      let self = this

      let haschakan
      
      if (this.from == 'learning-manage-headteacher') {
        haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students')
      } else if (this.from == 'learning-manage-mentor') {
        haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students')
      } else if (this.from == 'learning-manage-stat') {
        haschakan = this.hasSomeApiAccess('teaching_students_process_data_groups_students')
      }

      return {
        list:[],//数据列表
        arrPage:[10,20,30,40,100,200],
        baseHeight:0,//table-高
        loading:true,
        //阶段名称
        phaseName: [],
        obj:{},//传递的对象
        searchParams: {
          pageNumber: 1,
          pageSize: 10,
          stageGroupName:"",
          stageIds:"",
          subjectId:""
        },
        // 分页信息
        pageInfo: {
          // 当前页码
          pageNumber: 1,
          // 数据总条数
          total: 0,
          // 每页条数
          pageSize: 10
        },
        columns: [
          {
            title: '序号',
            align: 'center',
            key: '',
            width: 80,
            render: (h, params) => {
              return h(
                'span',
                params.index +
                (this.searchParams.pageNumber - 1) *
                this.searchParams.pageSize +
                1
              )
            }
          },
          {
            title: '学科',
            key: 'subjectName',
            width: 140,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.subjectName
                  }
                },
                params.row.subjectName?params.row.subjectName:'--'
              )
            }
          },
          {
            title: '阶段群名称',
            key: 'stageGroupName',
            minWidth: 120,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.stageGroupName
                  }
                },
                params.row.stageGroupName?params.row.stageGroupName:'--'
              )
            }
          },
          {
            title: '导师',
            key: 'mainAssistant',
            key2: 'subAssistant',
            width: 120,
            ellipsis: true,
            render(h, params) {
              let div = 'div'
              let Tooltip = 'Tooltip'
              let Button = 'Button'
              let Icon = 'Icon'
              let p = 'p'
              if(params.row.mainAssistant || params.row.subAssistant){
                return (
                  <div class="flex">
                  <p>{params.row.mainAssistant}</p>
                {params.row.subAssistant && (
                <Tooltip
                  content="Right Center text"
                  placement="right"
                  theme="light"
                    >
                    <Button>
                    <Icon class="m-l15" size="16" type="md-alert" />
                  </Button>
                  <div slot="content">
                  <p class="blue">副导师：</p>
                  {params.row.subAssistant.split(',').map(item => {
                    return <p class="t-d20">{item}</p>
                  })}
                </div>
                </Tooltip>
                )}
              </div>
              )
              }else{
                return h("div", [
                  h(
                    "span",
                    "--"
                  )
                ]);
              }
            }
          },
          {
            title: '班主任',
            key: 'mainTeacher',
            ket2: 'subTeacher',
            width: 120,
            ellipsis: true,
            render(h, params) {
              let div = 'div'
              let Tooltip = 'Tooltip'
              let Button = 'Button'
              let Icon = 'Icon'
              let p = 'p'
              if(params.row.mainTeacher || params.row.subTeacher){
                return (
                  <div class="flex">
                  <p>{params.row.mainTeacher}</p>
                {params.row.subTeacher && (
                <Tooltip
                  content="Right Center text"
                  placement="right"
                  theme="light"
                    >
                    <Button>
                    <Icon class="m-l15" size="16" type="md-alert" />
                  </Button>
                  <div slot="content">
                  <p class="blue">副班主任：</p>
                  {params.row.subTeacher.split(',').map(item => {
                    return <p class="t-d20">{item}</p>
                  })}
                </div>
                </Tooltip>
                )}
              </div>
              )
              }else{
                return h("div", [
                  h(
                    "span",
                    "--"
                  )
                ]);
              }
            }
          },
          {
            title: '目前人数',
            key: 'currentPeopleNumber',
            width: 90,
            align: 'right',
            ellipsis: true
          },
          {
            title: '休学人数',
            key: 'outOfSchoolNumber',
            width: 90,
            align: 'right',
            ellipsis: true
          },
          {
            title: '失联人数',
            key: 'lostNumber',
            width: 90,
            align: 'right',
            ellipsis: true
          },
          {
            title: '学习效果高风险人数',
            key: 'highRiskEffectNumber',
            width: 150,
            align: 'right',
            ellipsis: true,
            render(h, params) {
              let div = 'div'
              let Tooltip = 'Tooltip'
              let Button = 'Button'
              let Icon = 'Icon'
              let p = 'p'
              let span = 'span'
              return (
                <div class="flex right">
                <p>{params.row.highRiskEffectNumber.split(',')[2]}</p>
              <Tooltip
              content="Right Center text"
              placement="right"
              theme="light"
                >
                <Button>
                <Icon class="m-l15" size="16" type="md-alert" />
                </Button>
                <div slot="content">
                <p class="blue">学习效果高风险评估：</p>
              <p class="t-d20">
                正常：
                      {params.row.highRiskEffectNumber.split(',')[0]}
            &emsp;人
              </p>
              <p class="t-d20">
                预警：
                      {params.row.highRiskEffectNumber.split(',')[1]}
            &emsp;人
              </p>
              <p class="t-d20">
                问题：
                      {params.row.highRiskEffectNumber.split(',')[2]}
            &emsp;人
              </p>
              </div>
              </Tooltip>
              </div>
            )
            }
          },
          {
            title: '学习状态高风险人数',
            key: 'highRiskStudyNumber',
            width: 150,
            align: 'right',
            ellipsis: true,
            render(h, params) {
              let div = 'div'
              let Tooltip = 'Tooltip'
              let Button = 'Button'
              let Icon = 'Icon'
              let p = 'p'
              let span = 'span'
              return (
                <div class="flex right">
                <p>{params.row.highRiskStudyNumber.split(',')[2]}</p>
              <Tooltip
              content="left Center text"
              placement="right"
              theme="light"
                >
                <Button>
                <Icon class="m-l15" size="16" type="md-alert" />
                </Button>
                <div slot="content">
                <p class="blue">学习状态高风险评估：</p>
              <p class="t-d20">
                正常：
                      {params.row.highRiskStudyNumber.split(',')[0]}
            &emsp;人
              </p>
              <p class="t-d20">
                预警：
                      {params.row.highRiskStudyNumber.split(',')[1]}
            &emsp;人
              </p>
              <p class="t-d20">
                问题：
                      {params.row.highRiskStudyNumber.split(',')[2]}
            &emsp;人
              </p>
              </div>
              </Tooltip>
              </div>
            )
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 160,
            align: 'center',
            render: (h, params) => {
              let chakanBtn = null

              if (haschakan) {
                chakanBtn = h(
                  'Button',
                  {
                    props: {
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        this.lookStudent(params.row)
                      }
                    }
                  },
                  '查看学员'
                )
              }

              return h('div', [
                chakanBtn
              ])
            }
          }
        ]
      }
    },
    created(){
      // 获取学科
      this.getData()
    },
    computed: {
      ...mapState({
        pageLists: state => state.stageOf.stageOfData.pageLists,
        stageOfList: state => state.stageOf.stageOfData.list,
      }),
      ...mapGetters({
        //学科
        subjectList: "student/subjectList"
      })
    },
    mounted() {
      this.fetchListData();
      //获取table-height
      this.$nextTick(()=> {
        let dom = document.getElementById("table-stage-list");
        this.baseHeight = util.baseHeight(dom, 82);
      })
    },
    methods: {
      ...mapActions(['getStageOf']),
      ...mapActions({
        fetchSubjects: "student/fetchSubjects"
      }),
      async fetchListData() {
        this.loading=true;
        /*let obj=JSON.parse(JSON.stringify(this.searchParams));
        if(obj.stageIds){
          obj.stageIds=obj.stageIds.toString();
        }
        if(obj.subjectId){
          obj.subjectId=obj.subjectId.toString()
        }*/
        if(this.type){
          this.$set(this.obj,"type", this.type)
        }else{
          this.$set(this.obj,"dataTab","DATA")
        }
        await api.getGroupsList({
          ...this.obj,
          ...this.searchParams,
        }).then(data => {
          if (data.status === 200) {
            this.list=data.result.list;
            this.pageInfo.total=data.result.total;
          }
        }).catch(err => {
          this.$Message.error(err.message);
        })
          .finally(() => {
            this.loading = false
          })
      },
      async getData(){
        this.loading=true;
        await this.fetchSubjects();
        this.loading=false;
      },
      //学科名称改变->阶段id
      async changeData(str){
        if(str){
          var obj={subjectId:str};
          //获取阶段
          var data=await api.getStagesList(obj);
          console.log(data);
          if(data.status==200){
            this.phaseName=data.result;
          }else{
            this.$Message.error("获取阶段信息失败");
          }
          return;
        }
        this.phaseName=[];
        this.searchParams.stageIds=null;
      },
      //搜索
      serchInfo(){
        this.fetchListData()
      },
      //清空
      clearInfo(){
        this.searchParams={
          pageNumber: 1,
          pageSize: 10,
          stageGroupName:"",
          stageIds:"",
          subjectId:""
        };
        this.fetchListData()
      },
      lookStudent(row) {
        if (this.type === 1) {
          this.$router.push({
            name: 'mentor_students_list',
            query: {
              groupId: row.id,
              menuId: row.subjectId,
              from: 'learning-manage-mentor_stage-of'
            }
          })
        } else if(this.type === 2) {
          this.$router.push({
            name: 'teacher_students_list',
            query: {
              groupId: row.id,
              menuId: row.subjectId,
              from: 'learning-manage-headteacher_stage-of'
            }
          })
        }else {
         this.$router.push({
            name: 'data-students-list',
            query: {
              groupId: row.id,
              menuId: row.subjectId,
              from: 'learning-manage-stat_stage-of',
            }
          })
          // this.$router.push({
          //   name: 'learning_manage_stat',
          //   query: {
          //     str: "student_list",
          //     groupId: row.id,
          //     menuId: row.subjectId,
          //     from: 'learning-manage-stat_stage-of',
          //     //t: +new Date()
          //   }
          // })
        }
      },
      async changeCurrent(num) {
        this.loading=true;
        //翻页
        this.searchParams.pageNumber = num
        await this.fetchListData()
      },
      async changePageSize(size) {
        this.loading=true;
        //改变每页条数
        this.searchParams.pageSize = size
        await this.fetchListData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .stage /deep/ .bg-b {
    background: #2d8cf0;
    color: #fff;
    &:hover {
      background: #57a3f3;
    }
  }
  .stage /deep/ .ivu-table-body .flex {
    height: 50px;
    display: flex;
    align-items: center;
    .ivu-btn {
      border: none;
      background: rgba(0, 0, 0, 0);
      .m-l15 {
        color: #2d8cf0;
        &:hover {
          cursor: pointer;
          color: #57a3f3;
        }
      }
    }
  }

  .stage /deep/ .ivu-table-body .right{
    float: right;
  }

  .stage /deep/ .blue {
    color: #2d8cf0;
  }
  .stage /deep/ .t-d20 {
    text-indent: 26px;
  }
  .m-t20 {
    margin-top: 20px;
  }
</style>
