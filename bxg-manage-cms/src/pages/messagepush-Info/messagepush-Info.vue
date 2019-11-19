<template>
    <div>
        <Row>
            <Card>
                <div class="messmains">
                     <Row :gutter="16">
                        <Col span="4"><span>主标题：</span></Col>
                        <Col span="20"><span>{{title}}</span></Col>
                    </Row>
                    <Row :gutter="16" style="margin-top: 54px;">
                        <Col span="4"><span class="neirong">内容：</span></Col>
                        <Col span="20"><span>{{content}}</span></Col>
                    </Row>
                     <Row :gutter="16" style="margin-top: 54px;">
                        <Col span="4"><span>发布内容：</span></Col>
                        <Col span="20"><span>{{contentstaus}}</span><span class="contentval">{{courseIdval}}</span></Col>
                    </Row>
                    <Row :gutter="16" style="margin-top: 54px;">
                        <Col span="4"><span>发布人群：</span></Col>
                        <Col span="20"><span>{{groupIdstatus}}</span><span class="groupIdke" ref="groupIdke" :domWidth="domWidth">{{groupIdsubject}}</span><span class="spanperson">{{groupIdsval}}</span></Col>
                    </Row>
                     <Row :gutter="16" style="margin-top: 54px;">
                        <Col span="4"><span>推送方式：</span></Col>
                        <Col span="20"><span>{{pushTimeType}}</span></Col>
                    </Row>
                </div>
            </Card>
        </Row>
    </div>
</template>
<script>
import api from '@/api/index'
import util from '@/util/util'
export default {
  name: 'messagepush-Info',
  data() {
    return {
        querys: this.$route.query,
        title: '', //主标题
        content: '', //内容
        contentstaus:'', //发布内容
        contentval:"",//内容显示
        courseId:'',   //课程详情选项
        innerPageType:'',   //内部页面类型
        liveId:'',   //直播ID,
        groupIdstatus: '', //发布人群
        groupIdsval:'',//发布人群树
        pushTimeType:'', //推动方式
        pushTime:'', //推送时间
        courseIdval: '',
        groupIdsubject:'',  //发布人前面的科目
        domWidth:'' //学科详情显示的width
    }
  },
  created() {
      this.getMessagesee();
  },
  mounted() {
  },
  methods: {
      //获取查兰
    getMessagesee() {
      api.getMessagePush({
        id: this.querys.id
        // id:69
      }).then(res=>{
        if(res.status === 200){
          this.title = res.result.title;
          this.content = res.result.content;
          this.contentstausFunc(res.result);
          this.groupIdsFunc(res.result);
          this.groupIdsFuncxue(res.result);
          this.groupIdsFunclass(res.result);
          this.pushTimeTypeFunc(res.result);
        }
      })
    },
    //发布内容的分类
    contentstausFunc (results){
        let data = results.contentType;
        let innerPageTypelis = results.innerPageType; //应用内部页面的详情
        let courseIdlis = results.courseId; //课程详情的iD
        let activityUrllis = results.activityUrl; //活动专题选项选项连接
        let liveIdlis = results.liveId; //直播ID

        if(data == 'COURSE_DETAIL_PAGE' ){
            this.contentstaus = '课程详情:';
            api.getMessageCourselis({
                ids: courseIdlis
            }).then(res=>{
                if(res.status === 200){
                    var arr = res.result;
                    for( var index in arr){
                        this.courseIdval = arr[index].gradeName;
                    }
                }
            })        

        }else if(data == 'ACTIVITY_PAGE'){
            this.contentstaus = '活动专题:'
            this.courseIdval = activityUrllis;
        }else if(data == 'INNER_PAGE'){
            this.contentstaus = '应用内部页面：';
            if(innerPageTypelis == 'APP_INDEX_PAGE' ){
                this.courseIdval = '首页'
            }else if(innerPageTypelis == 'APP_LEARN_CENTER_PAGE'){
                this.courseIdval = '学习中心'
            }else if(innerPageTypelis == 'APP_DISCOUNT_COUPONS_PAGE'){
                this.courseIdval = '优惠券'
            }
        }else if(data == 'LIVE_ROOM_PAGE'){
            this.contentstaus = '直播课链接:'
            api.getMessageLivexiangq({  //直播详情接口
                ids: liveIdlis
            }).then(res=>{
                for( var index in res){
                    this.courseIdval = res[index].name;
                }
            }) 
        }
    },
    //发布人的数
    groupIdsFunc (res){
        let data = res.group;
        let groupIds = res.groupIds;
        if(data == 'ALL' ){
            this.groupIdstatus = '全部成员:';
            this.$refs.groupIdke.textContent = "";
            this.$refs.groupIdke.style.width = 0;
            
        }else if(data == 'SUBJECT'){
            this.groupIdstatus = '学科:'
        }else if(data == 'COURSE'){
            this.groupIdstatus = '课程:'
        }else if(data == 'USER'){
            this.groupIdstatus = '自定义用户:';
            this.$refs.groupIdke.textContent = "";
        }else{
            this.$refs.groupIdke.textContent = "";
        }
         api.getMessagePlanCount({  //获取人数
                group:data,
                ids: groupIds
        }).then(res=>{
            if(res.status === 200){
                var arrren = res.result;
                this.groupIdsval = '共'+ arrren + '人';
                if(data == 'ALL' ){
                    this.groupIdsval = '共'+ arrren + '人';
                }else if(data == 'SUBJECT'){
                    this.groupIdsval = '( 共'+ arrren + '人 )';
                }else if(data == 'COURSE'){
                    this.groupIdsval = '( 共'+ arrren + '人 )';
                }else if(data == 'USER'){
                    this.groupIdsval = groupIds;
                }
            }
        })
    },
    //发布人群的学科人数前显示
    groupIdsFuncxue (res){
        let menuIdperson = res.groupIds;
        //console.log(menuIdperson)
        api.getMessageMenus({  
                ids:menuIdperson,
        }).then(res=>{
            if(res.status === 200){
                var cursepers = res.result;
                for( var index in cursepers){
                    this.groupIdsubject += cursepers[index].menuName+ "、 "
                }
                var str = this.groupIdsubject;
                this.groupIdsubject = this.groupIdsubject.substring(0,str.length-2);
            }
        }) 
    },
    //发布人群的课程人数前显示
    groupIdsFunclass (res){
        let groupIds = res.groupIds;
        api.getMessageCourselis({  
                ids:groupIds,
        }).then(res=>{
            if(res.status === 200){
                var curoursepers = res.result;
                for( var index in curoursepers){
                    this.groupIdsubject += curoursepers[index].gradeName + "、 "
                }
                var str1 = this.groupIdsubject;
                this.groupIdsubject = this.groupIdsubject.substring(0,str1.length-2);
            }
        }) 
    },


    //推送的类型
    pushTimeTypeFunc (result){
        this.pushTime = result.pushTime;
        let nowTime = new Date().getTime();
        this.pushTimeType = result.pushTimeType ? "定时推送 "+'('+this.pushTime +')' : "立即推送" ;
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.messmains{
    padding: 64px 0 200px 95px;
}
.neirong{
    margin-left: 10px;
}
.spanperson{
    word-wrap: break-word;
}
.spanperson, .contentval, .groupIdke{
    margin-left: 12px;
}
// .groupIdke{
//     display:inline-block;
//     max-width: 271px;
//     min-width:60px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     vertical-align: middle;
// }
</style>
