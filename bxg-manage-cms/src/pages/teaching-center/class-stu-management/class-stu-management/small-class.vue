<template>
  <div>
    <Row :gutter="10" class="baseOption" style="margin-bottom:20px;">
      <Col span="6">
        <Select placeholder="课程状态" v-model="searchParams.courseStatus" clearable @on-change="statusChange">
          <Option :value="0">已下架</Option>
          <Option :value="1">已启用</Option>
          <Option :value="2">未启用</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="请选择学科" v-model="searchParams.menuIds" filterable clearable multiple @on-change="subjectChange">
          <Option :title="item.menuName" v-for="(item,index) in subjectList" :value="item.menuId" :key="index">{{ item.menuName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="请选择课程" v-model="searchParams.courseIds" filterable clearable multiple @on-change="courseChange">
          <Option :title="item.gradeName" v-for="(item,index) in coursesList" :value="item.courseId" :key="index">{{ item.courseName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo"><Button>清除</Button></span>
      </Col>
    </Row>
    <Row id="table-employment-course">
      <Col span="24">
        <Table border :height="baseHeight" :loading="loading" :columns="columns" :data="list"></Table>
      </Col>
      <Col class="margin-top-20" span="24">
        <Page placement="top" :current="pageNub.pageNum" :page-size-opts="arrPage" show-total show-elevator show-sizer style="text-align: right; padding-bottom: 1px;" :total="pageNub.total" @on-change="changeCurrentPage" @on-page-size-change="changeSelect"></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
  import api from '@/api/index'
  import util from '@/util/util'
  import { mapActions, mapState, mapMutations,mapGetters } from 'vuex'
  export default {
    data(){
      const haschakan = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students')

      return {
        loading:false,//加载
        baseHeight:0,//高度
        arrPage:[10,20,30,40,100,200],//下拉页
        searchParams:{ //搜索条件
          courseStatus:null,//课程状态
          menuIds:null,//学科
          courseIds:null,//课程
          courseType: '1',//微课
        },
        pageNub:this.$store.state.classStuManagement.smallmentPageInfo,
        list:[],//列表
        columns: [
          {
            title: "序号",
            type: "",
            align: "center",
            width: 60,
            render: (h, params) => {
              return h(
                'span',
                params.index + (this.pageNub.pageNum - 1) * this.pageNub.pageSize + 1
              )
            }
          },
          {
            title: "课程ID",
            key: "courseId",
            width: 80,
            align:"right",
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.courseId
                  }
                },
                params.row.courseId?params.row.courseId:'--'
              )
            }
          },
          {
            title: "学科",
            key: "menuName",
            minWidth: 100,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.menuName
                  }
                },
                params.row.menuName?params.row.menuName:'--'
              )
            }
          },
          {
            title: "课程名称",
            key: "courseName",
            minWidth: 150,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.courseName
                  }
                },
                params.row.courseName?params.row.courseName:'--'
              )
            }
          },
          {
            title: "授课老师",
            key: "lecturerName",
            minWidth: 140,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.lecturerName
                  }
                },
                params.row.lecturerName?params.row.lecturerName:'--'
              )
            }
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "right",
            width: 150,
            render: (h, params) => {
              let d = new Date(params.row.createTime);
              let time=d.toISOString().substring(0,10)+ ' '+d.toTimeString().substring(0,9);
              return h(
                'span',
                time
              )
            }
          },
          {
            title: "创建人",
            key: "createPerson",
            width: 100,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.createPerson
                  }
                },
                params.row.createPerson?params.row.createPerson:'--'
              )
            }
          },
          {
            title: "课程原价/现价",
            key: "originalCost",
            key2:"currentPrice",
            align:"right",
            width: 120,
            render: (h, params) => {
              return h(
                'span',
                params.row.originalCost+"/"+params.row.currentPrice
              )
            }
          },
          {
            title: "实际学习人数",
            key: "learnsCount",
            width: 120,
            align:"right",
            render: (h, params) => {
              return h(
                'span',
                params.row.learnsCount?params.row.learnsCount:'--'
              )
            }
          },
          {
            title: "课程状态",
            key: "courseStatus",
            width: 100,
            ellipsis: true,
            render: (h, params) => {
              let str=params.row.courseStatus;
              let strName;
              if(str===0){
                strName="已下架"
              }else if(str===1){
                strName="已启用"
              }else{
                strName="未启用"
              }
              return h(
                'span',
                {
                  domProps: {
                    title: strName
                  }
                },
                strName
              )
            }
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            fixed: 'right',
            width: 110,
            render: (h, params) => {
              let viewBtn = null
              if (haschakan) {
                viewBtn = h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.studentInfo(params.row);
                    }
                  }
                }, '查看学员')
              }

              return h('div', [
                viewBtn
              ])
            }
          }
        ]
      }
    },
    computed:{
      ...mapState({
        //课程状态
        smallCourseStatus: state => state.classStuManagement.smallCourseStatus,
        //学科id
        smallMenuIds: state => state.classStuManagement.smallMenuIds,
        //课程id
        smallCourseIds:state => state.classStuManagement.smallCourseIds,
        //学科
        subjectList: state => state.student.subjectList,
        //课程
        coursesList: state => state.classStuManagement.coursesList,
        //table列表
        smallList: state => state.classStuManagement.smallList,
        //分页
        smallmentPageInfo: state => state.classStuManagement.smallmentPageInfo,
      })
    },
    watch:{
      smallCourseStatus(){
        this.searchParams.courseStatus=this.smallCourseStatus;
        this.searchParams.menuIds=this.smallMenuIds;
        this.searchParams.courseIds=this.smallCourseIds
      }
    },
    created(){
      this.searchParams.courseStatus=this.smallCourseStatus;
      this.searchParams.menuIds=this.smallMenuIds;
      this.searchParams.courseIds=this.smallCourseIds;
      this.fetchSubjects();
      this.fetchStudentCoursesList({courseType:this.searchParams.courseType,mark:4});
      if(this.smallList){
        this.list=this.smallList.result.list;
      }else{
        this.getList();
      }
    },
    methods:{
      ...mapActions({
        fetchSubjects: "student/fetchSubjects",//学科
        getCoursesList: "student/getCoursesList"//课程
      }),
      ...mapActions([
        "getsmallList",//table列表
        "getsmallCourseStatus",
        "getsmallMenuIds",
        "getsmallCourseIds",
        "fetchStudentCoursesList"
      ]),
      //得到公共列表
      async getList(n){
        if (this.loading) {
          return
        }
        this.loading=true;
        if(n){
          this.pageNub.pageNum=n;
        }
        let obj=JSON.parse(JSON.stringify(this.searchParams));
        if(obj.menuIds){
          obj.menuIds=obj.menuIds.toString();
        }
        if(obj.courseIds){
          obj.courseIds=obj.courseIds.toString();
        }
        await this.getsmallList({...obj, ...{ pageNum: this.smallmentPageInfo.pageNum, pageSize: this.smallmentPageInfo.pageSize }});
        this.list=this.smallList.result.list;
        this.pageNub.total=this.smallList.result.total;
        this.loading=false;
      },
      //课程状态变化
      statusChange(id){
        this.getsmallCourseStatus(id)
      },
      //学科变化
      subjectChange(arr){
        this.getsmallMenuIds(arr)
      },
      //课程变化
      courseChange(arr){
        this.getsmallCourseIds(arr)
      },
      //清除
      clearInfo(){
        this.searchParams={
          courseStatus:null,
          subject:null,
          course:null,
          courseType: '1'
        };
        this.getList(1);
      },
      //搜索
      serchInfo(){
        this.getList(1);
      },
      //分页改变当前页
      changeCurrentPage(page) {
        this.getList(page)
      },
      changeSelect(nub){
        this.pageNub.pageSize = nub;
        this.getList(1)
      },
      //查看学员
      studentInfo(data){
        this.$router.push({
          name: 'see-students-micro',
          query: {
            courseType:data.courseType,
            courseId:data.courseId,
            from: 'class-stu-manage_small-class'
          }
        })
      }
    },
    mounted(){
      //获取table-height
      this.$nextTick(()=>{
        let dom=document.getElementById("table-employment-course");
        this.baseHeight=util.baseHeight(dom,82);
      })
    }
  }
</script>

<style scoped>

</style>
