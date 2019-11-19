<template>
  <div class="dredge_class">
    <Card>
      <div class="dc_header">
        <div class="dc_header_l">
          <div class="search_box">
            <Row :gutter="10" class="row_bottom">
              <Col span="6">
                <Button
                  type="primary"
                  class="open_class"
                  v-if="hasSomeApiAccess('sales_imports_courses_post')"
                  @click="openClasshandle"
                >开通课程</Button>
                <Button
                  @click="handleSelectAll(true)"
                  v-if="hasSomeApiAccess('sales_imports_courses_batches_post')"
                  type="primary"
                  class="open_class batch"
                >批量开通课程</Button>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col span="4" class="row_bottom_10">
                <Select
                  v-model="searchData.courseStatus"
                  placeholder="状态"
                  class="sel"
                >
                    <Option
                      v-for="item in statusList"
                      :value="item.value"
                      :key="item.value"
                      :title="item.label"
                    >{{ item.label }}</Option>
                </Select>
              </Col>
              <Col span="4" class="row_bottom_10">
                <Select
                  v-model="searchData.menuId"
                  :multiple="true"
                  placeholder="学科"
                  class="sel"
                  @on-change="subjectChange"
                >
                    <Option
                      v-for="item in subjectListSe"
                      :value="item.value"
                      :key="item.value"
                      :title="item.label"
                    >{{ item.label }}</Option>
                </Select>
              </Col>
              <Col span="4" class="row_bottom_10">
                <Select
                  v-model="searchData.courseId"
                  :multiple="true"
                  :filterable="true"
                  placeholder="课程名称"
                  class="sel"
                >
                    <Option
                      v-for="item in courseListSe"
                      :value="item.value"
                      :key="item.value"
                      :title="item.label"
                    >{{ item.label }}</Option>
                </Select>
              </Col>
              <Col span="4" class="row_bottom_10">
                <Input
                  v-model="searchData.creator"
                  placeholder="开通人姓名"
                  class="sel"
                />
              </Col>
              <Col span="4" class="row_bottom_10">
                <Input
                  v-model="searchData.mark"
                  placeholder="uid/手机号"
                  class="sel"
                />
              </Col>
              <Col span="4" class="row_bottom_10">
                <Select
                  v-model="searchData.operationType"
                  class="sel"
                >
                    <Option
                      v-for="item in timeList"
                      :value="item.value"
                      :key="item.value"
                      :title="item.label"
                    >{{ item.label }}</Option>
                </Select>
              </Col>
              <Col span="6" class="row_bottom_10">
                <div class="choose_date_box">
                  <DatePicker
                    type="daterange"
                    placeholder="请选择时间"
                    ref="dateStart"
                    split-panels
                    @on-change="dateChange"
                  ></DatePicker>
                  <!-- <DatePicker
                    type="date"
                    placeholder="结束时间"
                    ref="dateEnd"
                    @on-change="dateChangeEnd"
                  ></DatePicker> -->
                </div>
              </Col>
              <Col span="8">
                <div class="dc_header_r">
                  <Button
                    type="primary"
                    icon="ios-search"
                    class="search"
                    @click="searchClick"
                  >搜索</Button>
                  <Button @click="clearClick" class="clear">清除</Button>
                  <Button
                    type="primary"
                    icon="ios-paper-plane-outline"
                    class="export"
                    @click="exportClick"
                    v-if="hasSomeApiAccess('sales_imports_courses_data')"
                  >导出数据</Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div class="dc_body">
        <Row id="table-stage-list">
          <Col span="24">
            <Table
              border
              ref="selection"
              :columns="table.tableColumns"
              :data="table.tableData"
              :height="baseHeight"
              :loading="tloading"
            ></Table>
          </Col>
        </Row>
        <div class="page_box">
          <Page
            :total="totalPage"
            show-sizer
            :current="currentPage"
            :page-size-opts="[10,20,30,40,100,200]"
            show-elevator
            show-total
            :page-size="pageSize"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </Card>
    <!-- 开通课程 -->
    <Modal
      v-model="modalM"
      title="开通课程"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="moduleChange"
    >
      <div class="open_module">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem label="手机号" prop="phone">
            <Input
              v-model="formValidate.phone"
              placeholder="请输入手机号"
            />
          </FormItem>
          <FormItem label="学科" prop="subject">
            <Select
              v-model="formValidate.subject"
              placeholder="请选择学科"
              @on-change="seSubjectChange"
            >
                <Option
                  v-for="item in seSubjectList"
                  :value="item.value"
                  :key="item.value"
                  :title="item.label"
                >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程名称" prop="className">
            <Select
              v-model="formValidate.className"
              placeholder="请选择课程"
              filterable
            >
                <Option
                  v-for="item in seCourseList"
                  :value="item.value"
                  :key="item.value"
                  :title="item.label"
                >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="OA单号" prop="oa">
            <Input
              v-model="formValidate.oa"
              placeholder="请输入OA单号"
            />
          </FormItem>
          <FormItem label="备注" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              @on-change="wordsChange"
              placeholder="请输入备注"
            />
            <p class="hundred_words">{{words}}</p>
          </FormItem>
          <FormItem class="form_btn_box">
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
              :loading="cloading"
            >确定</Button>
            <Button @click="moduleCancel">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 批量开通课程 -->
    <Modal
      v-model="modalBatch"
      title="批量开通课程"
      :mask-closable="false"
      @on-visible-change="modalBatchChange"
      :footer-hide="true"
    >
      <div class="batch_class">
        <a class="down_template" href="../../../static/批量开通课程模板.xlsx">下载模板</a>
        <div class="choose_file">
          <p><span class="red_must">*</span>Excel</p>
          <Upload
            class="choose_btn"
            action="no-use"
            :before-upload="handleUpload"
            :show-upload-list="false"
            :format="['.xlsx', '.xls']"
            :accept="'.xlsx, .xls'"
          >
            <Button>选择文件</Button>
          </Upload>
          <div v-if="file" class="file">{{ file.name }}</div>
          <div class="file" v-else>未选择任何文件</div>
        </div>
        <div class="btn_box">
          <Button
            class="batch_sub" type="primary"
            @click="modalBatchSub"
            :loading="bLoading"
          >确定</Button>
          <Button @click="modalBatchCancle">取消</Button>
        </div>
      </div>
    </Modal>
    <!-- 显示开通结果 -->
    <Modal
      v-model="modalOpenResult"
      title="批量开通结果"
      :mask-closable="false"
      width="800"
    >
      <div class="batch_result">
        <div class="result">
          <h6>结果概要</h6>
          <p>上传数据{{batchResult.uploadData}}条,成功开通记录{{batchResult.successData}}条,失败条数{{batchResult.failData}}条</p>
        </div>
        <div class="fail_record">
          <h6>失败记录</h6>
          <Table
            height="520"
            border
            :columns="fail.failColumns"
            :data="fail.failData"
            :loading="mloading"
          ></Table>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import configapi from '@/config/apiconfig'
import api from '@/api'
import util from '@/util/util'
import axios from 'axios'
export default {
  data() {
    const hascourses_users = this.hasSomeApiAccess('sales_imports_courses_users');  //查看学员UID

    let validatorPhone = function(rule, value, callback) {
      if (!(/^1[0-9]\d{9}$/.test(value))) {
        return callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    let validatorClass = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请选择课程"));
      } else {
        callback();
      }
    };
    let validatorOa = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入OA单号"));
      } else {
        callback();
      }
    };
    let validatorOac = function(rule, value, callback) {
      if (value.length > 100) {
        return callback(new Error("您已超出100个字符"));
      } else {
        callback();
      }
    };
    let validatorDesc = function(rule, value, callback) {
      if (value.length > 100) {
        return callback(new Error("您已超出100字"));
      } else {
        callback();
      }
    };
    return {
      baseHeight: 0,
      words: '100字',
      currentPage: 1,
      totalPage: 1,
      pageSize: 10,
      statusList: [
        {
          value: '',
          label: '状态'
        },
        {
          value: '1',
          label: '已开通'
        },
        {
          value: '2',
          label: '已关闭'
        }
      ],
      subjectListSe: [],
      courseListSe: [],
      timeList: [
        {
          value: '1',
          label: '开通时间'
        },
        {
          value: '2',
          label: '关闭时间'
        }
      ],
      table: {
        tableColumns: [
          {
            title: '序号',
            key: 'num',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('span', params.index + 1 + this.pageSize * (this.currentPage - 1))
            }
          },
          {
            title: 'OA单号',
            key: 'oa',
            width: 150,
            align: 'right'
          },
          {
            title: '开通编号',
            key: 'openNum',
            width: 100,
            align: 'right'
          },
          {
            title: 'UID',
            width: 120,
            align: 'right',
            render: (h, params) => {

               let $studentmainId = null; //查看学员UID
                if(hascourses_users){
                  $studentmainId =  h('div', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.uidHandle(params)
                        }
                      }
                    }, 
                    params.row.uid
                  )
                }else{
                  $studentmainId = h('div', {
                      style: {
                        color: '',
                      }
                    }, 
                    params.row.uid
                  )
                }
                return h('div', [ $studentmainId ]);
            }
          },
          {
            title: '昵称',
            key: 'nickName',
            width: 150,
            align: 'left'
          },
          {
            title: '手机号',
            key: 'phone',
            width: 120,
            align: 'right'
          },
          {
            title: '课程ID',
            key: 'classId',
            width: 100,
            align: 'right'
          },
          {
            title: '学科',
            key: 'subject',
            width: 150,
            align: 'left'
          },
          {
            title: '课程名称',
            key: 'className',
            width: 150,
            align: 'left'
          },
          {
            title: '课程价格',
            key: 'classPrice',
            width: 100,
            align: 'right'
          },
          {
            title: '课程生效时间',
            key: 'openTime',
            width: 150,
            align: 'right'
          },
          {
            title: '开通人',
            key: 'opener',
            width: 150,
            align: 'left'
          },
          {
            title: '备注',
            key: 'remark',
            width: 150,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h('div', {
                  attrs: {
                    title: params.row.remark
                  },
                  style: {
                    display: '-webkit-box',
                    width: '70px',
                    height: '36px',
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': '2'
                  },
                  on: {
                    click: () => {
                      this.uidHandle(params)
                    }
                  }
                }, params.row.remark)
              ]);
            }
          },
          {
            title: '关闭人',
            key: 'closer',
            width: 100,
            align: 'left'
          },
          {
            title: '课程关闭时间',
            key: 'closeTime',
            width: 150,
            align: 'right'
          },
          {
            title: '课程状态',
            key: 'closeStatus',
            width: 100,
            align: 'left'
          }
        ],
        tableData: []
      },
      modalM: false,
      formValidate: {
        phone: '',
        subject: '',
        className: '',
        oa: '',
        desc: ''
      },
      ruleValidate: {
        phone: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur', validator: validatorPhone }
        ],
        className: [
          { required: true, message: '请选择课程', trigger: 'blur', validator: validatorClass }
        ],
        oa: [
          { required: true, message: '请输入OA单号', trigger: 'blur', validator: validatorOa },
          { required: true, message: '您已超出100个字符', trigger: 'blur', validator: validatorOac }
        ],
        desc: [
          { required: false, message: '您已超出100字了', trigger: 'change', validator: validatorDesc }
        ]
      },
      seSubjectList: [],
      seCourseList: [],
      modalBatch: false,
      file: '', //上传的文件
      batchResult: { //批量开通结果数据
        uploadData: '',
        successData: '',
        failData: ''
      },
      modalOpenResult: false,
      fail: {
        failColumns: [
          {
            title: '序号',
            key: 'num',
            width: 60,
            align: 'center'
          },
          {
            title: '课程ID',
            key: 'courseId',
            width: 100,
            align: 'right'
          },
          {
            title: '开通课程名称',
            key: 'openCourseName',
            width: 150,
            align: 'left'
          },
          {
            title: '手机号',
            key: 'phone',
            width: 116,
            align: 'right'
          },
          {
            title: 'OA审核单号',
            key: 'oaNo',
            width: 150,
            align: 'right'
          },
          {
            title: '失败原因',
            key: 'fail',
            width: 150,
            align: 'left'
          }
        ],
        failData: []
      },
      searchData: {
        courseStatus: '1',
        menuId: '',
        courseId: '',
        creator: '',
        mark: '',
        operationType: '1',
        startDate: '',
        endDate: ''
      },
      tloading: true,
      mloading: true,
      bLoading: false,
      cloading: false
    }
  },
  methods: {
    ...mapActions([
      "fetchOpenClassList",
      "fetchCourseList",
      "fetchSubjectList"
    ]),
    searchClick() {
      this.currentPage = 1;
      let obj = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      Object.assign(obj, this.searchData);
      for (let k in obj) {
        if (!obj[k] && obj[k] != '0') {
          obj[k] = null;
        }
        if (k === 'menuId' || k === 'courseId') {
          if (obj[k]) {
            if (obj[k].length !== 0) {
              obj[k] = obj[k].join(',');
            } else {
              obj[k] = null;
            }
          }
        }
      }
      this._initState(obj);
    },
    exportClick() {
      let obj = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      Object.assign(obj, this.searchData);
      let href;
      for (let k in obj) {
        if (obj[k]) {
          if (k === 'menuId' || k === 'courseId') {
            !obj[k].length ? obj[k] = '' : obj[k] = obj[k].join(',')
          }
          href = `${k}=${obj[k]}&` + href;
        }
      }
      href = (href.split('undefined')[0]).slice(0, href.lastIndexOf('&'));
      window.location.href = `${configapi.bmfUrl}/import/course/export/data?${href}`;
    },
    wordsChange() {
      if (this.formValidate.desc.length < 100) {
        this.words = (100 - this.formValidate.desc.length) + '字';
      } else {
        this.words = 0 + '字';
      }
    },
    subjectChange(val) {
      this._courseState({
        menuIds: val.length ? val.join(',') : null,
        mark: '2'
      });
    },
    seSubjectChange(val) {
      this._courseState({
        menuIds: val,
        mark: '1'
      });
    },
    dateChange(nDate, date) {
      this.searchData.startDate = nDate[0];
      this.searchData.endDate = nDate[1];
    },
    handleSelectAll () {
      this.modalBatch = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let newData = {};
          Object.assign(newData, {
            mobile: this.formValidate.phone,
            courseId: this.formValidate.className,
            oaBillNo: this.formValidate.oa,
            remark: this.formValidate.desc ? this.formValidate.desc : null
          });
          this.cloading = true
          let result = await api.getOpenClassSave(newData);
          if (result.status === 200 || result.status === 201) {
            this.cloading = false
            this.$Message.success('提交成功!');
            this.timer = setTimeout(() => {
              this.currentPage = 1
              this._initState({
                pageNum: this.currentPage,
                pageSize: this.pageSize
              })
              this.modalM = false
            }, 1000);
          } else if(result.status === 417) {
            this.cloading = false
            this.$Message.error(result.message);
          } else {
            this.$Message.error('网络异常');
          }
        }
      })
    },
    moduleCancel() {
      this.modalM = false;
    },
    modalBatchChange(val) {
      if (!val) {
        this.file = '';
        this.bLoading = false
      }
    },
    async modalBatchSub() {
      if (!this.file) return;
      this.bLoading = true
      let formData = new FormData();
      formData.append("file", this.file);
      axios.post(`${configapi.bmfUrl}/import/course/batchSave`, formData)
      .then(res => {
        if (res.data.status == 200 || res.data.status == 201) {
          this.bLoading = false
          this.$Message.success('上传成功!');
          this.modalBatch = false;
          this.modalOpenResult = true;
          this.currentPage = 1;
          this._initState({
            pageNum: this.currentPage,
            pageSize: this.pageSize
          });
          let result = res.data.result;
          this.batchResult.uploadData = result.totalQty;
          this.batchResult.successData = result.successQty;
          this.batchResult.failData = result.failQty;
          let arr = [];
          result.failList.forEach((e, i) => {
            let newData = {};
            Object.assign(newData, {
              num: i + 1,
              courseId: e.courseId,
              openCourseName: e.courseName,
              phone: e.stuMobile,
              oaNo: e.oaBillNo,
              fail: e.remark
            });
            arr.push(newData)
          });
          this.fail.failData = arr;
          this.mloading = false
        } else {
          this.$Message.error('网络异常!');
        }
      });
    },
    modalBatchCancle() {
      this.modalBatch = false;
    },
    openClasshandle() {
      this.modalM = true;
      this._subjectState({ mark: '1' });
      this._courseState({ mark: '1' });
    },
    uidHandle(params) {
      this.$router.push({
        name: 'student_info',
        query: {
          userId: params.row.userId,
          uuid: params.row.uid,
          from: 'sales-manage_dredge-class'
        }
      })
    },
    moduleChange(val) {
      if (!val) {
        this.cloading = false
        this.$refs.formValidate.resetFields();
      }
    },
    clearClick() {
      for (let k in this.searchData) {
        if (k === 'courseStatus' || k === 'operationType') {
          this.searchData[k] = '1';
        } else {
          this.searchData[k] = '';
        }
      }
      this.$refs.dateStart.handleClear();
      this.currentPage = 1;
      this._initState();
      this._courseState({ mark: '2' });
    },
    handleUpload(file) {
      if (!this.fileError) {
        this.file = file;
      }
    },
    pageChange(page) {
      this.currentPage = page;
      this._pageChange()
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._pageChange()
    },
    _pageChange() {
      let obj = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      Object.assign(obj, this.searchData);
      for (let k in obj) {
        if (!obj[k] && obj[k] != '0') {
          obj[k] = null;
        }
        if (k === 'menuId' || k === 'courseId') {
          if (obj[k]) {
            if (obj[k].length !== 0) {
              obj[k] = obj[k].join(',');
            } else {
              obj[k] = null;
            }
          }
        }
      }
      this._initState(obj);
    },
    async _initState(obj = {
      pageNum: this.currentPage,
      pageSize: this.pageSize,
      courseStatus: this.searchData.courseStatus,
      operationType: this.searchData.operationType
    }) {
      await this.fetchOpenClassList(obj);
      let result = this.openClassList;
      this.totalPage = result.total;
      let arr = [];
      if (!result) return;
      result.list.forEach((e, i) => {
        let newData = {};
        Object.assign(newData, {
          oa: e.oaBillNo,
          openNum: e.courseNo,
          uid: e.uid,
          nickName: e.nickname,
          phone: e.stuMobile,
          classId: e.courseId,
          subject: e.menuName,
          className: e.courseName,
          classPrice: e.coursePrice,
          openTime: e.effeDate,
          opener: e.creator,
          remark: e.remark,
          closer: e.operator ? e.operator : '-',
          closeTime: e.closeTime ? e.closeTime : '-',
          closeStatus: e.operationType == 1 ? '已开通' : '已关闭',
          userId: e.userId
        });
        arr.push(newData);
      });
      this.table.tableData = arr;
      this.tloading = false
    },
    async _subjectState(status) {
      await this.fetchSubjectList(status);
      let result = this.subjectList;
      if (!result) return;
      let arr = [];
      result.forEach(e => {
        let newData = {};
        Object.assign(newData, {
          label: e.menuName,
          value: e.menuId
        });
        arr.push(newData);
      });
      if (status.mark === '2') {
        this.subjectListSe = arr;
      } else {
        this.seSubjectList = arr;
      }
    },
    async _courseState(state) {
      await this.fetchCourseList(state);
      let result = this.courseList;
      if (!result) return;
      let arr = [];
      result.forEach(e => {
        let newData = {};
        Object.assign(newData, {
          label: e.courseId + e.courseName,
          value: e.courseId
        });
        arr.push(newData);
      });
      if (state.mark === '2') {
        this.courseListSe = arr;
      } else {
        this.seCourseList = arr;
      }
    }
  },
  computed: {
    ...mapState({
      openClassList: state => state.financial.openClassList,
      courseList: state => state.financial.courseList,
      subjectList: state => state.financial.subjectList
    })
  },
  created() {
    this._initState();
    this._subjectState({ mark: '2' }); //包含（已启用、已禁用）
    this._courseState({ mark: '2' });
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  destroyed() {
    this.timer = null;
  }
}
</script>

<style lang="less" scoped>
.row_bottom{
  margin-bottom: 20px;
}
.row_bottom_10{
  margin-bottom: 10px;
}
.dredge_class{
  .dc_header{
    .dc_header_l{
      .search_box{
        .sel{
          margin-bottom: 10px;
          margin-right: 10px;
        }
        .open_class{
          height: 32px;
          margin-right: 7px;
        }
      }
    }
    .dc_header_r{
      .search,.clear,.export{
        margin-bottom: 6px;
      }
      .clear,.export{
        margin-left: 6px;
      }
    }
  }
  .dc_body{
    margin-top: 20px;
    .batch{
      margin-top: 20px;
    }
    .page_box{
      margin: 20px 0 10px 0;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.open_module{
  .form_btn_box{
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
.batch_class{
  .down_template{
    color: #666;
    &:hover{
      color: #2d8cf0;
    }
  }
  .choose_file{
    display: flex;
    line-height: 30px;
    margin: 30px 40px;
    .choose_btn{
      height: 30px;
      margin-left: 20px;
    }
    .red_must{
      color: red;
    }
    .file{
      margin-left: 10px;
    }
  }
  .btn_box{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    .batch_sub{
      margin-right: 10px;
    }
  }
}
.batch_result{
  padding-bottom: 50px;
  .result{
    p{
      margin-top: 10px;
    }
  }
  .fail_record{
    margin-top: 40px;
    h6{
      margin-bottom: 10px;
    }
  }
}
.hundred_words{
  color: #ccc;
  position: absolute;
  right: 0;
  bottom: -28px;
  text-align: right;
}
.open_module /deep/ ul.ivu-select-dropdown-list, .dredge_class /deep/ ul.ivu-select-dropdown-list{
  max-width: 100px;
  li{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
.dredge_class /deep/ .ivu-tag-text{
  max-width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.dredge_class /deep/ .ivu-tag .ivu-icon-ios-close{
  top: -8px;
}
.dredge_class /deep/ .ivu-date-picker{
  width: 100%;
}
</style>


