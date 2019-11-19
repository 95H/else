<template>
  <Card>
    <Steps :current="current" style="margin-top:50px;margin-left:12.5%;">
      <Step title="基础信息" content></Step>
      <Step title="发布内容" content></Step>
      <Step title="发布人群" content></Step>
    </Steps>
    <Form :label-width="115" :model="formData" :rules="FormData_tab1" ref="FormData_tab1">
      <div class="StepsDiv basic" v-show="isbasic">
        <Row>
          <Col span="9" offset="2">
            <FormItem label="主标题：" prop="mainTitle">
              <Input placeholder="请输入" v-model="formData.mainTitle"/>
              <span class="input-remark">20字</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="2">
            <FormItem label="内容：" prop="content">
              <Input placeholder="请输入" type="textarea" :rows="15" v-model="formData.content"/>
              <span class="input-remark">50字</span>
            </FormItem>
          </Col>
        </Row>
        <div class="preview">
          预览效果：
          <RadioGroup v-model="preview" @on-change="changePreview">
            <Radio label="IOS 10"></Radio>
            <Radio label="Android"></Radio>
          </RadioGroup>
          <div class="previewImg">
            <img src="@/assets/pushMessage/ios.png" alt v-if="isShowIos">
            <img src="@/assets/pushMessage/Android.png" alt v-if="isShowAndroid">
          </div>
        </div>
      </div>
    </Form>
    <Form :label-width="115" :model="formData2" :rules="FormData_tab2" ref="FormData_tab2">
      <div class="StepsDiv PublishContent" v-show="isPublishContent">
        <Row>
          <p class="RC_label">发布内容：</p>
          <RadioGroup
            class="RadioGroup"
            v-model="formData2.ReleaseContent"
            vertical
            @on-change="changeReleaseContent"
          >
            <Row class="RadioContent">
              <Col span="19" offset="3">
                <Radio class="Radio_" label="课程详情">{{""}}</Radio>
                <FormItem label="课程详情：" prop="ContentCourse_id">
                  <div class="InputBox">
                    <FormItem prop="ContentSubject_id" style="display:inline-block;margin-right:1%;width:14%;">
                      <Select
                        v-model="formData2.ContentSubject_id"
                        placeholder="请选择学科"
                        @on-change="courseIdModify"
                        filterable
                      >
                        <Option
                          v-for="item in formData2.ContentSubject_list"
                          :value="item.menuId"
                          :key="item.menuId"
                        >{{ item.menuName }}</Option>
                      </Select>
                    </FormItem>
                    <Select
                      v-model="formData2.ContentCourse_id"
                      style="width:75%;"
                      placeholder="请选择课程"
                      filterable
                    >
                      <Option
                        v-for="item in formData2.ContentCourse_list"
                        :value="item.id"
                        :key="item.id"
                      >{{ item.courseName }}</Option>
                    </Select>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row class="RadioContent">
              <Col span="19" offset="3">
                <Radio class="Radio_" label="活动专题">{{""}}</Radio>
                <FormItem label="活动专题：" prop="activityTopic_url">
                  <div class="InputBox">
                    <Input
                      placeholder="请输入链接地址URL"
                      v-model="formData2.activityTopic_url"
                      style="width:60%;margin-right:1%;"
                    />
                    <div style="position:relative;display:inline-block;width:29%;">
                      <FormItem prop="activityTopic_title" style>
                        <Input placeholder="请输入标题" v-model="formData2.activityTopic_title"/>
                      </FormItem>
                      <p class="input-remarks">
                        <Icon type="ios-alert"/>
                        <span class>20字</span>
                        <img src="@/assets/pushMessage/Tips.jpg" alt="">
                      </p>
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row class="RadioContent">
              <Col span="19" offset="3">
                <Radio class="Radio_" label="应用内部页面">{{""}}</Radio>
                <FormItem label="应用内部页面：" prop="InternalPage_url">
                  <div class="InputBox">
                    <Select
                      v-model="formData2.InternalPage_url"
                      style="width:90%;"
                      placeholder="请选择应用页面"
                      @on-change="changeInternalPage"
                    >
                      <Option
                        v-for="item in formData2.InternalPage_list"
                        :value="item.url"
                        :key="item.id"
                      >{{ item.title }}</Option>
                    </Select>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row class="RadioContent">
              <Col span="19" offset="3">
                <Radio class="Radio_" label="直播课链接">{{""}}</Radio>
                <FormItem label="直播课链接：" prop="LiveCourse_id">
                  <div class="InputBox">
                    <FormItem prop="LiveSubject_id" style="display:inline-block;margin-right:1%;width:14%;">
                      <Select
                        v-model="formData2.LiveSubject_id"
                        placeholder="请选择学科"
                        @on-change="LiveIdModify"
                        filterable
                      >
                        <Option
                          v-for="item in formData2.LiveSubject_list"
                          :value="item.menuId"
                          :key="item.menuId"
                        >{{ item.menuName }}</Option>
                      </Select>
                    </FormItem>
                    <Select
                      v-model="formData2.LiveCourse_id"
                      style="width:75%;"
                      placeholder="请选择直播课"
                      filterable
                    >
                      <Option
                        v-for="item in formData2.LiveCourse_list"
                        :value="item.id"
                        :key="item.id"
                      >{{ item.name }}</Option>
                    </Select>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </RadioGroup>
        </Row>
      </div>
    </Form>
    <Form :label-width="115" :model="formData3" :rules="FormData_tab3" ref="FormData_tab3">
      <div class="StepsDiv ReleaseCrowd" v-show="isReleaseCrowd">
        <Row>
          <Col span="19" offset="2">
            <FormItem label="发布人群：" prop="ReleaseCrowd">
              <RadioGroup v-model="formData3.ReleaseCrowd" @on-change="changeReleaseCrowd">
                <Radio label="全部人员"></Radio>
                <Radio label="学科"></Radio>
                <Radio label="课程"></Radio>
                <Radio label="自定义用户"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom:50px;">
          <Col span="15" offset="3">
            <div style="margin-left:50px;" v-show="isShowallPersonnel">人数：{{AllNumber}}</div>
            <FormItem label="请选择学科：" prop="CrowdSubject_id" v-show="isShowSubject">
              <Select
                v-model="formData3.CrowdSubject_id"
                placeholder="请选择学科"
                @on-change="changeCrowdSubject"
                multiple
                filterable
              >
                <Option
                  v-for="item in formData3.CrowdSubject_list"
                  :value="item.menuId"
                  :key="item.menuId"
                >{{ item.menuName }}</Option>
              </Select>
              <span class="input-Number">人数：{{SubjectNumber}}</span>
            </FormItem>
            <FormItem label="请选择课程：" prop="CrowdCourse_id" v-show="isShowCourse">
              <Select
                v-model="formData3.CrowdCourse_id"
                placeholder="请选择课程"
                @on-change="changeCrowdCourse"
                multiple
                filterable
              >
                <Option
                  v-for="item in formData3.CrowdCourse_list"
                  :value="item.id"
                  :key="item.id"
                >{{ item.gradeName }}</Option>
              </Select>
              <span class="input-Number">人数：{{CourseNumber}}</span>
            </FormItem>
            <FormItem label="请输入用户UID：" prop="CustomUser" v-show="isShowCustomUser">
              <Input
                placeholder="请输入用户UID，每个UID用“、”隔开"
                type="textarea"
                :rows="6"
                v-model="formData3.CustomUser"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="19" offset="2">
            <FormItem label="推送方式：" prop="PushMode">
              <RadioGroup v-model="formData3.PushMode" @on-change="changePushMode">
                <Radio label="立即推送"></Radio>
                <Radio label="定时推送"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom:100px">
          <Col span="16" offset="3">
            <FormItem label="请选择时间：" prop="TimingPush" v-if="isShowTimingPush">
              <DatePicker
                v-model="formData3.TimingPush"
                type="datetime"
                placeholder="请选择时间"
                style="width:50%"
                :options="options"
                @on-change="changeTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </div>
    </Form>
    <Row>
      <Col span="24" class="btnBox" style="margin-bottom:100px;">
        <Button type="primary" v-if="isShowUp" @click="toUp">上一步</Button>
        <Button type="primary" v-if="isShowNext" @click="toNext">下一步</Button>
        <Button type="primary" v-if="isShowCommit" @click="commit">{{submit}}</Button>
      </Col>
    </Row>
    <div style="position:fixed;top:50%;left:50%;width:200px;height:200px;background:#ccc;transform: translate(-50%,-50%);" v-if="isShowCircle">
      <i-circle :percent="percent" :stroke-color="Circlecolor" style="position:aboslute;top:50%;left:50%;transform: translate(-50%,-50%);">
        <Icon v-if="percent == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
        <span v-else style="font-size:24px">{{ percent }}%</span>
      </i-circle>
    </div>
  </Card>
</template>
<script>
import api from '@/api/index'
import util from '@/util/util'
import {mapState} from "vuex"
export default {
  name: 'message-new',
  data() {
    return {
      // 加载弹框
      percent: 0,
      Circlecolor: '#2db7f5',
      isShowCircle: false,

      // 基本信息
      formData: {
        mainTitle: '', //标题
        content: '' // 内容
      },
      formData2: {
        ReleaseContent: '课程详情', // 发布内容
        Release: 'COURSE_DETAIL_PAGE',
        // 发布内容-课程
        ContentCourse_id: '',
        ContentCourse_list: '',
        // 发布内容-学科
        ContentSubject_id: '',
        ContentSubject_list: '',
        // 活动专题
        activityTopic_url: '',
        activityTopic_title: '',
        // 应用内部页面
        InternalPage_url: '',
        InternalPage_list: [
          { id: 0, title: '首页', url: 'APP_INDEX_PAGE' },
          { id: 1, title: '学习中心', url: 'APP_LEARN_CENTER_PAGE' },
          { id: 2, title: '我的优惠券', url: 'APP_DISCOUNT_COUPONS_PAGE' }
        ],
        // 直播课-课程
        LiveCourse_id: '',
        LiveCourse_list: '',
        // 直播课-学科
        LiveSubject_id: '',
        LiveSubject_list: ''
      },
      formData3: {
        ReleaseCrowd: '全部人员', // 发布人群
        ReleaseCrowd_type: 'ALL', // 发布人群类型
        PushMode: '立即推送', // 推送方式
        TimingPush: '', //定时推送
        TimeString: '',

        // 发布人群-课程
        CrowdCourse_id: [],
        CrowdCourse_list: '',
        // 发布人群-学科
        CrowdSubject_id: [],
        CrowdSubject_list: '',
        // 自定义人群
        CustomUser: '',
        groupIds: ''
      },
      FormData_tab1: {
        mainTitle: [
          { required: true, message: '请输入标题！', trigger: 'blur' },
          { max: 20, message: '标题不能超过20字', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容！', trigger: 'blur' },
          { max: 50, message: '内容不能超过50个字', trigger: 'blur' }
        ]
      },
      FormData_tab2: {
        // 发布内容
        ContentCourse_id: [{ required: false, message: '请选择课程！' }],
        ContentSubject_id: [{ required: false, message: '请选择学科！' }],
        activityTopic_url: [
          { required: false, message: '请输入活动URL！' }
        ],
        activityTopic_title: [
          { required: false, message: '请输入活动标题！', trigger: 'blur' }
        ],
        InternalPage_url: [
          { required: false, message: '请选择应用内部页面！' }
        ],
        LiveCourse_id: [{ required: false, message: '请选择直播课！' }],
        LiveSubject_id: [{ required: false, message: '请选择学科！' }]
      },
      FormData_tab3: {
        // 发布人群
        ReleaseCrowd: [{ required: false, message: '请选择发布人群！' }],
        CrowdSubject_id: [{ required: false, message: '请选择学科！' }],
        CrowdCourse_id: [{ required: false, message: '请选择课程！' }],
        CustomUser: [
          { required: false, message: '请输入用户UID！', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^[0-9\、]*$/,
            message: '请输入数字并用“、”隔开',
            trigger: 'blur'
          }
        ],
        // 推送方式
        PushMode: [{ required: true, message: '请选择推送方式！' }],
        TimingPush: [
          { required: true, message: '请选择推送时间！' },
          { validator: this.validateAge }
        ]
      },

      // 预览效果
      preview: 'IOS 10',
      isShowIos: true,
      isShowAndroid: '',

      // 按钮
      current: 0,
      isShowUp: false,
      isShowNext: true,
      isShowCommit: false,
      submit: '立即推送',
      SubmitNum: 0,

      //form 显示
      isbasic: true,
      isPublishContent: false,
      isReleaseCrowd: false,

      // 发布人群
      isShowallPersonnel: true,
      isShowSubject: false,
      isShowCourse: false,
      isShowCustomUser: false,

      // 人数显示
      AllNumber: '',
      SubjectNumber: 0,
      CourseNumber: 0,

      addData: '',

      // 定时推送
      isShowTimingPush: false,
      // 日期选择器
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  computed: {
    color () {
      this.isShowCircle = true
      let timer = setInterval(()=>{
        this.percent += 20
        if(this.percent == 100){
          this.Circlecolor = '#5cb85c';
          clearInterval(timer)
          this.isShowCircle = false
        }
      },200)
    }
  },
  methods: {
    //  数据初始化
    initData(){
      this.$refs.FormData_tab3.resetFields()
      this.$refs.FormData_tab2.resetFields()
      this.$refs.FormData_tab1.resetFields()
      this.preview = 'IOS 10'
      this.isShowIos = true
      this.isShowAndroid = false

      this.current = 0
      this.isShowUp = false
      this.isShowNext = true
      this.isShowCommit = false

      this.isbasic=true
      this.isPublishContent=false
      this.isReleaseCrowd= false
      this.submit = '立即推送'
      this.SubmitNum =  0

      this.isShowallPersonnel = true 
      this.isShowSubject = false
      this.isShowCourse = false
      this.isShowCustomUser = false

      this.isShowTimingPush = false
      this.formData2.ReleaseContent = '课程详情'

      this.changeReleaseContent()
    },
    // 确定
    commit() {
      let self = this
      switch (this.formData3.ReleaseCrowd_type) {
        case 'ALL':
          this.groupIds = ''
          break
        case 'SUBJECT':
          this.groupIds = this.formData3.CrowdSubject_id.join(',')
          break
        case 'COURSE':
          this.groupIds = this.formData3.CrowdCourse_id.join(',')
          break
        case 'USER':
          var str = this.formData3.CustomUser
          var arr = str.split('、')
          this.groupIds = arr.join(',')
          break
      }

      this.$refs.FormData_tab3.validate(valid => {
        if (valid) {
          if (self.submit == '立即推送') {
            this.$Modal.confirm({
              title: '您确定要推送该消息么？',
              onOk: () => {
                this.SubmitNum = 0
                switch (this.formData2.Release) {
                  case 'COURSE_DETAIL_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      courseId: this.formData2.ContentCourse_id,
                      menuId: this.formData2.ContentSubject_id
                    }
                    break
                  case 'ACTIVITY_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      activityUrl: this.formData2.activityTopic_url,
                      activityTitle: this.formData2.activityTopic_title
                    }
                    break
                  case 'INNER_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      innerPageType: this.formData2.InternalPage_url
                    }
                    break
                  case 'LIVE_ROOM_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      liveId: this.formData2.LiveCourse_id,
                      menuId: this.formData2.LiveSubject_id
                    }
                    break
                }
                var self = this
                // console.log(this.addData)
                
                api.postMessageAdd(this.addData).then(res=>{
                  if(res.status == 200){
                    self.initData()
                    self.$router.push({
                      name: 'message-push',
                      params:{
                        num:Math.random()*10000
                      }
                    })
                  }else if (res.status == 500){
                    alert("Ops，好像出了点毛病？=。=")
                    return
                  }else if(res.status == 400){
                    alert("没有找到对应的UID")
                    return
                  }
                })
              },
              onCancel: () => {

              }
            })
          } else if (self.submit == '定时推送') {
            this.$Modal.confirm({
              title: '您确定要推送该消息么？',
              content: `<p style="color:red;">将于 ${this.formData3.TimeString} 自动推送</p>`,
              onOk: () => {
                this.SubmitNum = 1
                switch (this.formData2.Release) {
                  case 'COURSE_DETAIL_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      pushTime: this.formData3.TimeString,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      courseId: this.formData2.ContentCourse_id,
                      menuId: this.formData2.ContentSubject_id
                    }
                    break
                  case 'ACTIVITY_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      pushTime: this.formData3.TimeString,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      activityUrl: this.formData2.activityTopic_url,
                      activityTitle: this.formData2.activityTopic_title
                    }
                    break
                  case 'INNER_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      pushTime: this.formData3.TimeString,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      innerPageType: this.formData2.InternalPage_url
                    }
                    break
                  case 'LIVE_ROOM_PAGE':
                    this.addData = {
                      title: this.formData.mainTitle,
                      content: this.formData.content,
                      pushTimeType: this.SubmitNum,
                      pushTime: this.formData3.TimeString,
                      contentType: this.formData2.Release,
                      group: this.formData3.ReleaseCrowd_type,
                      groupIds: this.groupIds,
                      liveId: this.formData2.LiveCourse_id,
                      menuId: this.formData2.LiveSubject_id
                    }
                    break
                }
                var self = this
                // console.log(this.addData)
                api.postMessageAdd(this.addData).then(res=>{
                  if(res.status == 200){
                    self.initData()
                    self.$router.push({
                      name: 'message-push',
                      params:{
                        num:Math.random()*10000
                      }
                    })

                  }else if (res.status == 500){
                    alert("Ops，好像出了点毛病？=。=")
                    return
                  }else if(res.status == 400){
                    alert("没有找到对应的UID")
                    return
                  }
                })
                
              },
              onCancel: () => {
                
              }
            })
          }
        }
      })
    },
    // 上一步
    toUp() {
      this.current -= 1
      this.isShowButton()
    },
    // 下一步
    toNext() {
      let self = this
      if (this.current == 0) {
        this.$refs.FormData_tab1.validate(valid => {
          if (valid) {
            self.current += 1
            self.isShowButton()
            self.ReleaseContentFun()
          } else {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            return
          }
        })
      } else if (this.current == 1) {
        this.$refs.FormData_tab2.validate(valid => {
          if (valid) {
            self.current += 1
            self.isShowButton()
          } else {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            return
          }
        })
      }
    },
    //
    validateAge(rule, value, callback) {
      var nowDate = new Date().getTime()
      var setDate = value.getTime()
      function add(m) {
        return m < 10 ? '0' + m : m
      }
      var time = value

      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      var nowtime =
        y +
        '-' +
        add(m) +
        '-' +
        add(d) +
        ' ' +
        add(h) +
        ':' +
        add(mm) +
        ':' +
        add(s)

      this.formData3.TimeString = nowtime
      if (setDate <= nowDate + 5 * 60 * 1000) {
        return callback(new Error('选择的时间要大于当前时间5分钟以上！'))
      } else {
        callback()
      }
    },
    changeTime() {
    
    },
    // 预览效果单选
    changePreview() {
      this.isShowIos = false
      this.isShowAndroid = false
      if (this.preview == 'IOS 10') {
        this.isShowIos = true
      } else if (this.preview == 'Android') {
        this.isShowAndroid = true
      }
    },
    // 发布内容单选
    changeReleaseContent() {
      this.FormData_tab2.ContentCourse_id[0].required = false
      this.FormData_tab2.activityTopic_url[0].required = false
      this.FormData_tab2.activityTopic_url[1] = ''
      this.FormData_tab2.activityTopic_title[0].required = false
      this.FormData_tab2.activityTopic_title[1] = ''
      this.FormData_tab2.InternalPage_url[0].required = false
      this.FormData_tab2.LiveCourse_id[0].required = false
      this.ReleaseContentFun()
    },
    ReleaseContentFun() {
      if (this.formData2.ReleaseContent == '课程详情') {
        this.FormData_tab2.ContentCourse_id[0].required = true
        this.formData2.Release = 'COURSE_DETAIL_PAGE'
      } else if (this.formData2.ReleaseContent == '活动专题') {
        this.FormData_tab2.activityTopic_url[0].required = true
        this.FormData_tab2.activityTopic_url[1] = {
          type: 'string',
          pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/,
          message: '请输入正确的URL',
          trigger: 'blur'
        }
        this.FormData_tab2.activityTopic_title[0].required = true
        this.FormData_tab2.activityTopic_title[1] = {  
          max: 20, 
          message: '标题不能超过20个字', 
          trigger: 'blur' 
        }
        this.formData2.Release = 'ACTIVITY_PAGE'
      } else if (this.formData2.ReleaseContent == '应用内部页面') {
        this.FormData_tab2.InternalPage_url[0].required = true
        this.formData2.Release = 'INNER_PAGE'
      } else if (this.formData2.ReleaseContent == '直播课链接') {
        this.FormData_tab2.LiveCourse_id[0].required = true
        this.formData2.Release = 'LIVE_ROOM_PAGE'
      }
    },
    // 发布人群单选
    changeReleaseCrowd() {
      this.FormData_tab3.CrowdSubject_id[0].required = false
      this.FormData_tab3.CrowdCourse_id[0].required = false
      this.FormData_tab3.CustomUser[0].required = false

      this.isShowallPersonnel = false
      this.isShowSubject = false
      this.isShowCourse = false
      this.isShowCustomUser = false


      if (this.formData3.ReleaseCrowd == '全部人员') {
        this.isShowallPersonnel = true
        this.formData3.ReleaseCrowd_type = 'ALL'
      } else if (this.formData3.ReleaseCrowd == '学科') {
        this.isShowSubject = true
        this.FormData_tab3.CrowdSubject_id[0].required = true
        this.formData3.ReleaseCrowd_type = 'SUBJECT'
      } else if (this.formData3.ReleaseCrowd == '课程') {
        this.isShowCourse = true
        this.FormData_tab3.CrowdCourse_id[0].required = true
        this.formData3.ReleaseCrowd_type = 'COURSE'
      } else if (this.formData3.ReleaseCrowd == '自定义用户') {
        this.isShowCustomUser = true
        this.FormData_tab3.CustomUser[0].required = true
        this.formData3.ReleaseCrowd_type = 'USER'
      }
    },
    // 发送方式单选
    changePushMode() {
      if (this.formData3.PushMode == '立即推送') {
        this.submit = '立即推送'
        this.isShowTimingPush = false
      } else if (this.formData3.PushMode == '定时推送') {
        this.submit = '定时推送'
        this.isShowTimingPush = true
      }
    },
    // 获取应用内部页面
    changeInternalPage() {

    },
    // 获取学科人数
    changeCrowdSubject() {
      var idsString = this.formData3.CrowdSubject_id.join(',')
      api
        .getMessagePlanCount({
          group: 'SUBJECT',
          ids: idsString
        })
        .then(res => {
          this.SubjectNumber = res.result
          if(this.SubjectNumber == ""){
            this.SubjectNumber = 0
          }
        })
    },
    // 获取课程人数
    changeCrowdCourse() {
      var idsString = this.formData3.CrowdCourse_id.join(',')
      api
        .getMessagePlanCount({
          group: 'COURSE',
          ids: idsString
        })
        .then(res => {
          this.CourseNumber = res.result
          if(this.CourseNumber == ''){
            this.CourseNumber = 0
          }
        })
    },
    // 获取课程详情的课程
    courseIdModify() {
      api
        .getMessageCourses({
          menuId: this.formData2.ContentSubject_id
        })
        .then(res => {
          this.formData2.ContentCourse_list = res.result
        })
    },
    // 获取直播课
    LiveIdModify() {
      if(this.formData2.LiveSubject_id == undefined){
        this.formData2.LiveSubject_id = 999999918
      }
      api
        .getMessageLiveList({
          menuId: this.formData2.LiveSubject_id
        })
        .then(res => {
          this.formData2.LiveCourse_list = res
        })
    },
    // 显示按钮、内容
    isShowButton() {
      if (this.current == 0) {
        // 按钮
        this.isShowUp = false
        this.isShowNext = true
        this.isShowCommit = false
        // 内容
        this.isbasic = true
        this.isPublishContent = false
        this.isReleaseCrowd = false
      } else if (this.current == 1) {
        // 按钮
        this.isShowUp = true
        this.isShowNext = true
        this.isShowCommit = false
        // 内容
        this.isbasic = false
        this.isPublishContent = true
        this.isReleaseCrowd = false
      } else if (this.current == 2) {
        // 按钮
        this.isShowUp = true
        this.isShowNext = false
        this.isShowCommit = true
        // 内容
        this.isbasic = false
        this.isPublishContent = false
        this.isReleaseCrowd = true
      }
    }
  },
  watch:{
    $route: {
      handler(newValue, oldValue) {
        if(newValue.query.newMassage == "newMassage"){
          this.initData()
          newValue.query.newMassage = ""
        }
      },
      deep: true
    }
  },
  created() {
    
    api.getMessageMenus().then(res => {
      this.formData2.ContentSubject_list = res.result
      this.formData3.CrowdSubject_list = res.result
      this.formData2.LiveSubject_list = res.result
    })
    api.getMessageCourselis().then(res => {
      this.formData3.CrowdCourse_list = res.result
    })
    api
      .getMessagePlanCount({
        group: 'ALL',
        ids: ''
      })
      .then(res => {
        this.AllNumber = res.result
      })
  },
  mounted() {
    if(this.$route.query.newMassage == "newMassage"){
      this.initData()
      this.$route.query.newMassage = ""
    }
  }
}
</script>
<style lang="less" scoped>
@widht: 100%;
.ivu-card {
  overflow: hidden!important;
  
}
.StepsDiv {
  margin-top: 80px;
  .RC_label {
    position: absolute;
    top: -50px;
    left: 10%;
    float: left;
    font-size: 14px;
    color: #515a6e;
    &:before {
      content: '*';
      display: inline-block;
      margin-right: 4px;
      line-height: 1;
      font-family: SimSun;
      font-size: 12px;
      color: #ed4014;
    }
  }
}
.basic {
  position: relative;
  .preview {
    width: 30%;
    position: absolute;
    top: 0;
    right: 15%;
    .ivu-radio-group {
      display: inline;
    }
    .previewImg {
      width: 300px;
      margin-top: 20px;
      img {
        width: 100%;
      }
    }
  }
}
.PublishContent {
  position: relative;
  .RadioContent {
    > .ivu-col {
      position: relative;
    }
    .ivu-form-item-required .ivu-form-item-label:before {
      display: none !important;
    }
    .Radio_ {
      position: absolute;
      left: -25px;
    }
    margin-bottom: 40px;
  }
}
.ivu-steps .ivu-steps-title {
  font-size: 18px;
  line-height: 27.5px;
}
.input-remark {
  position: absolute;
  top: 0;
  right: -30px;
  color: #ccc;
}
.input-Number {
  position: absolute;
  top: 0;
  left: 101%;
  width:130px;
}
.input-remarks {
  width: 24px;
  height: 20px;
  position: absolute;
  top: 0;
  right: -35px;
  color: #ccc;
  i {
    position: absolute;
    top: 0px;
    color: #333;
    font-size: 20px;
  }
  span {
    position: absolute;
    top: 10px;
    left: -2px;
  }
  img{
    display: none;
    opacity: 0;
    position: absolute;
    transition: all 1s ease;
    width: 350px;
    top: -150px;
    right: 30px;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,.5);
  }
  &:hover{
    img{
      display: block;
      opacity: 1;
    }
  }
}
.btnBox {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  button {
    margin: 0 10px;
    span {
      display: inline-block;
      // width: 36px;
      text-align: center;
    }
  }
}

.ivu-radio-group {
  width: 100%;
  .RadioBox {
    width: 100%;
    position: relative;
    padding-left: 20px;
    margin-bottom: 50px;
    > span {
      display: inline-block;
      width: 8%;
      margin-right: 10px;
      text-align: right;
    }
    .Radio_ {
      position: absolute;
      left: -15px;
    }
  }
}
</style>