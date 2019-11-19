<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <Row :gutter="10" class="baseOption" type="flex">
            <Col>
              <Button type="primary" v-if="hasSomeApiAccess('teaching_groups_post')" @click="createGroup">
                <Icon type="md-add" />新建阶段群
              </Button>
            </Col>
            <Col span="6">
                <Input placeholder="请输入阶段群名称" v-model="queryData.groupName" clearable/>
            </Col>
             <Col span="5">
              <Select placeholder="请选择学科" @on-change="changeData" v-model="queryData.subjectId" clearable>
                <Option :title="item.menuName" class="Options" v-for="item in subjectList" :value="item.menuId" :key="item.menuId">{{ item.menuName }}</Option>
              </Select>
             </Col>
              <Col span="5">
                  <Select placeholder="请选择阶段" v-model="queryData.phaseId" clearable>
                <Option class="Options" v-for="item in phaseName" :value="item.stageId" :key="item.stageId">{{ item.stageName }}</Option>
              </Select>
              </Col>
              <Col span="4">
              <Button type="primary" icon="md-search"  @click="searchHandler">搜索</Button>
              <Button @click="handleClear">清除</Button>
            </Col>
          </Row>
          <Row class="margin-top-20 base-margin-top" id="table-stage">
            <Col span="24">
              <Table border :height="baseHeight" :loading="groupInfo.loading" :columns="groupInfo.columns" :data="groupInfo.list"></Table>
            </Col>
            <Col class="margin-top-20" span="24">
               <Page placement="top" :page-size-opts="arrPage" :current="pageInfo.pageNumber" show-total show-elevator show-sizer style="text-align: right;" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changeSelect"></Page>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <createStageGroup @addUpdata="addUpdata" @clearData="handleClear" ref="createStageGroup"></createStageGroup>
    <phaseGroupLog ref="phaseGroupLog"></phaseGroupLog>
  </div>
</template>
<script>
  import api from '@/api';
  import util from '@/util/util'
  import {mapState, mapGetters, mapActions } from 'vuex';
  import createStageGroup from "./create-stage-group";
  import phaseGroupLog from "./phase-group-log"
  export default {
    components: {
      createStageGroup,
      phaseGroupLog
    },

    data() {
      let self = this;

      const hasxiugai = this.hasSomeApiAccess('teaching_groups_patch')
      const hasrizhi = this.hasSomeApiAccess('teaching_groups_logs')
      const hasshanchu = this.hasSomeApiAccess('teaching_groups_delete')

      return {
        arrPage:[10,20,30,40,100,200],
        baseHeight:0,
        modal:true,
        //对象是否为空
        //清空
        queryData:{
          groupName:'',
          subjectId:'',
          phaseId:''
        },
        //删除后本页数据.
        delNub:'',
        //阶段名称
        phaseName: [
        ],
        // 阶段群信息
        groupInfo: {
          loading: false,
          // 学习阶段列表
          list: [],

          // 表格的配置数据
          columns: [
            {
              title: "序号",
              type: "",
              align: "center",
              width: 60,
              render: (h, params) => {
                return h(
                  'span',
                  params.index + (this.pageInfo.pageNumber - 1) * this.pageInfo.pageSize + 1
                )
              }
            },
            {
              title: "学科",
              key: "subjectName",
              align: "left",
              width: 120,
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
              title: "阶段群名称",
              key: "stageGroupName",
              align: "left",
              width: 120,
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
              title: "阶段名称",
              key: "stageName",
              align: "left",
              minWidth: 150,
              ellipsis: true,
              render: (h, params) => {
                return h(
                  'span',
                  {
                    domProps: {
                      title: params.row.stageName
                    }
                  },
                  params.row.stageName?params.row.stageName:'--'
                )
              }
            },
            {
              title: "导师负责人",
              key: "mainAssistant",
              align: "left",
              width: 100,
              ellipsis: true,
              render: (h, params) => {
                return h(
                  'span',
                  {
                    domProps: {
                      title: params.row.mainAssistant
                    }
                  },
                  params.row.mainAssistant?params.row.mainAssistant:'--'
                )
              }
            },
            {
              title: "副导师",
              key: "subAssistant",
              align: "left",
              width: 100,
              ellipsis: true,
              render: (h, params) => {
                return h(
                  'span',
                  {
                    domProps: {
                      title: params.row.subAssistant
                    }
                  },
                  params.row.subAssistant?params.row.subAssistant:'--'
                )
              }
            },
            {
              title: "班主任负责人",
              key: "mainTeacher",
              align: "left",
              width: 120,
              ellipsis: true,
              render: (h, params) => {
                return h(
                  'span',
                  {
                    domProps: {
                      title: params.row.mainTeacher
                    }
                  },
                  params.row.mainTeacher?params.row.mainTeacher:'--'
                )
              }
            },
            {
              title: "副班主任",
              key: "subTeacher",
              align: "left",
              width: 100,
              ellipsis: true,
              render: (h, params) => {
                return h(
                  'span',
                  {
                    domProps: {
                      title: params.row.subTeacher
                    }
                  },
                  params.row.subTeacher?params.row.subTeacher:'--'
                )
              }
            },
            {
              title: "目前人数",
              key: "currentPeopleNumber",
              align: "right",
              width: 100,
              ellipsis: true,
            },
            {
              title: "创建时间",
              key: "createTime",
              align: "right",
              width: 150,
            },
            {
              title: "创建人",
              key: "createPerson",
              align: "left",
              width: 180,
              ellipsis: true,
            },
            {
              title: "操作",
              key: "action",
              align: "center",
              fixed: 'right',
              width: 200,
              render: (h, params) => {
                let xiugaiBtn = null
                if (hasxiugai) {
                  xiugaiBtn = h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$refs.createStageGroup.updataGroup(params.row);
                        this.$refs.createStageGroup.isShow=true;
                      }
                    }
                  }, '修改')
                }

                let rizhiBtn = null
                if (hasrizhi) {
                  rizhiBtn = h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$refs.phaseGroupLog.modal=true;
                        this.$refs.phaseGroupLog.dataInfo(params.row.id);
                      }
                    }
                  }, '日志')
                }

                let shanchuBtn = null
                if (hasshanchu) {
                  shanchuBtn = h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.del(params.row);
                      }
                    }
                  }, '删除')
                }

                return h('div', [
                  xiugaiBtn,
                  rizhiBtn,
                  shanchuBtn
                ])
              }
            }
          ]
        },
        // 分页信息
        pageInfo: {
          // 当前页码
          pageNumber: 1,
          // 数据总条数
          total: 0,
          // 每页条数
          pageSize: 10
        }
      }
    },
    computed: {
      ...mapGetters({
        // [ { menuId: 199, menuName: 'Web前端' } ]
        subjectList: "student/subjectList"
      }),
      ...mapState({
        pageData: state => state.stageGroup.pageData,
        stageGroupData: state => state.stageGroup.stageGroupData,
        searchData: state => state.stageGroup.searchData
      })
    },

    created() {
      // 获取学科
      this.fetchSubjects();
      //获取阶段群
      this.searchHandler();
    },
    methods: {
      ...mapActions({
        fetchSubjects: "student/fetchSubjects"
      }),
      ...mapActions([
        "getStageGroup"
      ]),
      //子传父修改
      addUpdata(){
        this.fetchPhases(this.pageInfo);
      },
      //学科名称改变->阶段id
      changeData(){
        this.queryData.phaseId='';
        let data={subjectId:this.queryData.subjectId};
        if(!data.subjectId){this.phaseName=[];return;}
        api.getClassStage(data).then(res=>{
          if (res.status === 200) {
            this.phaseName=res.result;
          }
        })

      },
      //清空-初始化
      handleClear() {
        this.queryData={
            groupName:'',
            subjectId:'',
            phaseId:''
        };
        this.pageInfo.pageNumber=1;
        this.pageInfo.pageSize=this.pageInfo.pageSize;
        this.searchHandler();
      },
      // 设置阶段群内容
      setGroupInfo(result) {
        this.groupInfo.list = result.list;
        // 设置分页总数据
        this.pageInfo.total = result.total
      },
      //合并对象
      fetchPhasesParams(searchInfo, pageInfo = {}) {
        let params = {}
        _.reduce(searchInfo, function(result, value, key) {
          if (value !== '') {
            result[key] = value
          }
          return result
        }, params)
        _.assign(params, pageInfo)
        return params
      },
      //公共查询
      fetchPhases(pageInfo) {
        let params = this.fetchPhasesParams(this.queryData, pageInfo);
        this.groupInfo.loading = true;
        return api.getSearchGroups(params)
          .then(data => {
            if (data.status === 200) {
              this.delNub=data.result.list.length;
              this.setGroupInfo(data.result);
            }
          })
          .catch(err => {
            this.$Message.error(err.message);
          })
          .finally(() => {
            this.groupInfo.loading = false
          })
      },
      //点击新建阶段群
      createGroup() {
        this.$refs.createStageGroup.createGroup();
      },
      //删除阶段群
      del(info) {
        if(info.currentPeopleNumber){
          this.$Modal.info({
            title: '提示',
            content: '<p>该数据中存在数据无法删除！！</p>'
          });
        }else{
          this.$Modal.confirm({
            title: '提示',
            content: '<p>你确定要删除该消息！</p>',
            loading: true,
            onOk: () => {
              let id={groupId:info.id};
              api.deleteGroups(id).then(res=>{
              if (res.status === 200) {
                console.log(res);
                if(this.delNub==0){
                  this.pageInfo.pageNumber=this.pageInfo.pageNumber-1;
                  if(this.pageInfo.pageNumber<=1){
                    this.pageInfo.pageNumber=1;
                  }
                }
                 this.fetchPhases(this.pageInfo);
                 this.$Message.success('删除成功！');
                }
                this.$Modal.remove();
              }).catch(err => {
              this.$Message.error(err.message);
             })
            },
            onCancel: () => {

            }
          });
        }
      },
      //点击搜索
      searchHandler() {
        let page={pageNumber:this.pageInfo.pageNumber=1, pageSize:this.pageInfo.pageSize};
        this.fetchPhases(page);
      },
      //分页改变当前页
      changeCurrentPage(page) {
        this.pageInfo.pageNumber = page;
        this.fetchPhases({
          pageNumber: page,
          pageSize: this.pageInfo.pageSize
        })
      },
      changeSelect(nub){
        this.pageInfo.pageSize = nub;
        this.fetchPhases({
          pageNumber: this.pageInfo.pageNumber,
          pageSize: nub
        })
      }
    },
    mounted(){
      //获取table-height
      this.$nextTick(()=> {
        let dom = document.getElementById("table-stage");
        this.baseHeight = util.baseHeight(dom, 82);
      })
    }
  }
</script>

<style scoped lang="less">
  .base-margin-top{
    margin-top:20px;
  }
  /* .Options{
    width:150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  } */
</style>
