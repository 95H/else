<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <Row>
                         <Col span="24">
                            <span @click="newLiveFn" style="margin-right:6px;">
                              <Button type="primary" v-if="hasSomeLiveAccess('resources_lives_post')"><Icon type="md-add" />新建直播</Button>
                            </span>
                            <Input v-model="queryObj.name" placeholder="请输入直播名称" style="width:150px;margin-right:6px;" />
                            <Select v-model="queryObj.menuIds" placeholder="请选择学科" style="width:350px;margin-right:6px;" multiple>
                              <Option v-for="(item,index) in menus" :key="index" :value="item.menuId">
                                {{item.menuName}}
                              </Option>
                            </Select>
                            <Input v-model="queryObj.teacherName" placeholder="请输入直播导师" style="width: 150px;margin-right:6px;" />
                            <Select v-model="queryObj.status" style="width:150px" placeholder="请选择状态" clearable>
                                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <span @click="handleSearch" style="margin: 0 6px;"><Button type="primary" icon="md-search">搜索</Button></span>
                            <Button @click="handleClear">清除</Button>
                         </Col>
                    </Row>
                    <Row class="margin-top-20 searchable-table-con1" id="table-stage-list">
                        <Col span="24">
                             <Table border :height="baseHeight" :columns="columns" :data="listData['items']"></Table>
                        </Col>
                         <Col class="margin-top-20" span="24">
                              <Page placement="top" style="text-align: right;" :total="listData.totalCount" :page-size="pageSize" :page-size-opts="arrPage" @on-change="handleCurrentChange" :current="listData.currentPage" show-total show-elevator show-sizer @on-page-size-change="handlePageSize"></Page>
                          </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
         <Modal
            v-model="cmodal"
            :title="liveTitle"
            class-name="vertical-center-modal"
            @on-ok="asyncOK"
            @on-cancel="cancel"
            :loading="loading"
             width="600">
             <Form v-if="cmodal" ref="formcraet" :model="formValidate" :rules="ruleValidate" :label-width="90">
                <Row>
                    <Col span="12">
                      <FormItem label="选择学科:" prop="menuId">
                          <Select placeholder="选择学科" :label-in-value="true" v-model="formValidate.menuId" @on-change="v=>{ getMenuIds(v)}">
                              <Option v-for="(item,index) in menus" :key="index" :value="item.menuId">
                                    {{item.menuName}}
                              </Option>
                          </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="直播名称:" prop="name">
                          <Input placeholder="输入直播名称" v-model="formValidate.name"></Input>
                      </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                      <FormItem label="直播导师:" prop="teacherId">
                          <Select placeholder="直播导师" :label-in-value="true" @on-change="v=>{ getTeacherId(v)}" v-model="formValidate.teacherId">
                              <Option v-for="(item,index) in teachers" :key="index" :value="item.lecturerId">
                                    {{item.lecturerName}}
                              </Option>
                          </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="直播主持人:" prop="assistantName">
                          <Input placeholder="输入直播主持人" v-model="formValidate.assistantName"></Input>
                      </FormItem>
                    </Col>
                </Row>
               <Row>
                    <Col span="12">
                        <FormItem label="开始时间:" prop="startTime">
                            <DatePicker
                            type="datetime"
                            format="yyyy-MM-dd HH:mm"
                            placeholder="开始日期"
                            v-model="formValidate.startTime"
                            :options="optionsDate"
                            style="width:100%"></DatePicker>
                        </FormItem>
                    </Col>
                     <Col span="11">
                          <FormItem label="结束时间:" prop="endTime">
                              <DatePicker
                              type="datetime"
                              format="yyyy-MM-dd HH:mm"
                              placeholder="结束日期"
                              v-model="formValidate.endTime"
                              :options="optionsDate"
                              style="width:100%"></DatePicker>
                          </FormItem>
                      </Col>
                </Row>
                <Row>
                    <Col span="24" label-position="top">
                     <FormItem label="直播描述:" prop="description">
                        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入直播描述"></Input>
                    </FormItem>
                    </Col>
                </Row>
             </Form>
        </Modal>
        <qx-modal
        v-if="true"
        ref="qxmodal"
        :isQxShowFlag.sync="isQxShowFlag"
        :liveId="liveId"
        @refreshList="handleRefresh"
        ></qx-modal>
        <status-modal
        :isStatusFlag.sync="isStatusFlag"
        :liveId="liveId"
        :status="kgStatus"
        @refreshList="handleRefresh"
        >
        </status-modal>
        <link-modal
          ref="linkref"
         :isLinkFlag.sync="isLinkFlag"
         :liveId="liveId"
        >
        </link-modal>
    </div>
</template>

<script>
import api from "@/api/index";
import util from '@/util/util'
import { mapActions, mapState, mapMutations } from "vuex";
import dateUtil from "iview/src/utils/date";
import qxModal from "./qx-modal";
import statusModal from "./status-mnodal";
import linkModal from "./link-modal";

export default {
  name: "liveku",
  components: {
    qxModal,
    statusModal,
    linkModal
  },
  data() {

    const haslivepermissions_post = this.hasSomeLiveAccess('resources_lives_permissions_post');  //权限
    const haslivestatus_put = this.hasSomeLiveAccess('resources_lives_status_put');  //禁用
    const haslivelives_put = this.hasSomeLiveAccess('resources_lives_put');  //编辑
    const haslivelives_links = this.hasSomeLiveAccess('resources_lives_links');  //链接
    const hasliverecords_patch = this.hasSomeLiveAccess('resources_lives_synchronization_records_patch');  //同步回放
    const haslivelives_records = this.hasSomeLiveAccess('resources_lives_records');  //回放
    const haslivestatistics = this.hasSomeLiveAccess('resources_lives_statistics');  //数据

    //const self = this
    const startTimes = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("开始时间不能为空"));
      } else if (value > Date.now()) {
        callback();
      } else {
        callback(new Error("开始时间不能小于当前时间"));
      }
    };
    const endTimes = (rule, value, callback) => {
      if (this.formValidate.startTime >= value) {
        callback(new Error("结束时间不能小于开始时间"));
      } else {
        callback();
      }
    };
    return {
      baseHeight: 0,
      currentPage: 1,
      pageSize: 10,
      arrPage:[10,20,30,40,100,200],
      newLive: true,
      liveTitle: "新建直播课程",
      queryObj: {
        name: "",
        menuIds: "",
        teacherName: "",
        status: ""
      },
      status: [
        {
          value: "0",
          label: "禁用"
        },
        {
          value: "1",
          label: "开启"
        }
      ],
      cmodal: false,
      loading: true,
      isQxShowFlag: false,
      isStatusFlag: false,
      isLinkFlag: false,
      liveId: 0,
      kgStatus: 0,
      optionsDate: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      columns: [
        {
          title: "直播名称",
          key: "name",
          align: "left",
          width: 300
        },
        {
          title: "学科",
          key: "menuName",
          align: "left",
          width: 200
        },
        {
          title: "来源",
          key: "origin",
          align: "left",
          width: 100,
          render: (h, params) => {
            return h(
              "span",
              {
                props: {}
              },
              params.row.origin === "DIRECT" 
                ? "直播库" 
                : params.row.origin === "CONSTRUE"
                  ? '串讲'
                  // LIVE_BROADCAST
                  : '直播课' 
            );
          }
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "right",
          width: 200
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "right",
          width: 200
        },
        {
          title: "时长(分钟)",
          key: "duration",
          align: "right",
          width: 100
        },
        {
          title: "直播导师",
          key: "teacherName",
          align: "left",
          width: 100
        },
        {
          title: "创建人",
          key: "creatorName",
          align: "left",
          width: 100
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "right",
          width: 200
        },
        {
          title: "状态",
          key: "status",
          align: "left",
          width: 100,
          render: (h, params) => {
            return h(
              "span",
              {
                props: {}
              },
              params.row.status ? "开启" : "禁用"
            );
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 410,
          render: (h, params) => {

              let $LivejurisdictionBtn = null; //权限
              let $LiveprohibitBtn = null; //禁用
              let $LiveeditBtn = null; //编辑
              let $LivelinkBtn = null; //链接
              let $LiveplaybackBtn = null; //回放
              let $LivedataBtn = null; //数据
              let $LivesynchronousplayBtn = null; //同步回放

              if (haslivepermissions_post) {
                  $LivejurisdictionBtn = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                        disabled:
                          params.row.startStatus === "N"
                            ? params.row.origin === "DIRECT"
                              ? false
                              : true
                            : true
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.isQxShowFlag = !this.isQxShowFlag;
                          this.liveId = params.row.id;
                          this.$refs.qxmodal.getPermissions(params.row.id);
                        }
                      }
                    },
                    "权限"
                  )
              }

              if (haslivestatus_put) {
                  $LiveprohibitBtn = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                        disabled:
                          params.row.startStatus === "N"
                            ? params.row.origin === "DIRECT"
                              ? false
                              : true
                            : true
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.isStatusFlag = !this.isStatusFlag;
                          this.liveId = params.row.id;
                          this.kgStatus = params.row.status;
                        }
                      }
                    },
                    params.row.status ? "禁用" : "开启"
                  )
              }

              if (haslivelives_put) {
                  $LiveeditBtn = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                        disabled:
                          params.row.startStatus === "N"
                            ? params.row.origin === "DIRECT"
                              ? false
                              : true
                            : true
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.cmodal = true;
                          this.fetchTeachers({
                            menuIds: params.row.menuId
                          });
                          this.liveTitle = "编辑直播课程";
                          this.newLive = false;
                          this.formValidate.status = params.row.status;
                          this.formValidate.id = params.row.id;
                          this.formValidate.name = params.row.name;
                          this.formValidate.origin = params.row.origin;
                          this.formValidate.menuId = params.row.menuId;
                          this.formValidate.menuName = params.row.menuName;
                          this.formValidate.name = params.row.name;
                          this.formValidate.teacherId = params.row.teacherId;
                          this.formValidate.teacherName = params.row.teacherName;
                          this.formValidate.assistantName =
                            params.row.assistantName;
                          this.formValidate.startTime = params.row.startTime;
                          this.formValidate.endTime = params.row.endTime;
                          this.formValidate.description = params.row.description;
                        }
                      }
                    },
                    "编辑"
                  )
              }

              if (haslivelives_links) {
                  $LivelinkBtn = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.isLinkFlag = !this.isLinkFlag;
                          this.$refs.linkref.fetchRooms(
                            params.row.id,
                            params.row.name
                          );
                        }
                      }
                    },
                    "链接"
                  )
              }

              if (haslivelives_records) {
                  $LiveplaybackBtn = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            name: "liveplayback_index",
                            query: { liveId: params.row.id }
                          });
                        }
                      }
                    },
                    "回放"
                  )
              }

              if (haslivestatistics) {
                  $LivedataBtn =  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            name: "livevisual_index",
                            query: { liveId: params.row.id }
                          });
                        }
                      }
                    },
                    "数据"
                  )
              }

              if (hasliverecords_patch) {
                  $LivesynchronousplayBtn = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          api.patchLiveRecord({ id: params.row.id })
                            .then(res => {
                              if (res === 'OK') {
                                this.$Message.success('同步成功')
                              }
                            })
                            .catch(err => {
                              this.$Message.error('同步失败')
                            })
                        }
                      }
                    },
                    "同步回放"
                  )
              }

              return h("div", [ $LivejurisdictionBtn, $LiveprohibitBtn, $LiveeditBtn, $LivelinkBtn, $LiveplaybackBtn, $LivedataBtn, $LivesynchronousplayBtn,]);


            // let quanxianBtn = null
            // if (self.hasSomeLiveAccess(self.liveResource['permissions_post'])) {
            //   quanxianBtn = h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small",
            //         disabled:
            //           params.row.startStatus === "N"
            //             ? params.row.origin === "DIRECT"
            //               ? false
            //               : true
            //             : true
            //       },
            //       style: {
            //         marginRight: "10px"
            //       },
            //       on: {
            //         click: () => {
            //           this.isQxShowFlag = !this.isQxShowFlag;
            //           this.liveId = params.row.id;
            //           this.$refs.qxmodal.getPermissions(params.row.id);
            //         }
            //       }
            //     },
            //     "权限"
            //   )
            // }

            // return h("div", [
            //   quanxianBtn,
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small",
            //         disabled:
            //           params.row.startStatus === "N"
            //             ? params.row.origin === "DIRECT"
            //               ? false
            //               : true
            //             : true
            //       },
            //       style: {
            //         marginRight: "10px"
            //       },
            //       on: {
            //         click: () => {
            //           this.isStatusFlag = !this.isStatusFlag;
            //           this.liveId = params.row.id;
            //           this.kgStatus = params.row.status;
            //         }
            //       }
            //     },
            //     params.row.status ? "禁用" : "开启"
            //   ),
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small",
            //         disabled:
            //           params.row.startStatus === "N"
            //             ? params.row.origin === "DIRECT"
            //               ? false
            //               : true
            //             : true
            //       },
            //       style: {
            //         marginRight: "10px"
            //       },
            //       on: {
            //         click: () => {
            //           this.cmodal = true;
            //           this.fetchTeachers({
            //             menuIds: params.row.menuId
            //           });
            //           this.liveTitle = "编辑直播课程";
            //           this.newLive = false;
            //           this.formValidate.status = params.row.status;
            //           this.formValidate.id = params.row.id;
            //           this.formValidate.name = params.row.name;
            //           this.formValidate.origin = params.row.origin;
            //           this.formValidate.menuId = params.row.menuId;
            //           this.formValidate.menuName = params.row.menuName;
            //           this.formValidate.name = params.row.name;
            //           this.formValidate.teacherId = params.row.teacherId;
            //           this.formValidate.teacherName = params.row.teacherName;
            //           this.formValidate.assistantName =
            //             params.row.assistantName;
            //           this.formValidate.startTime = params.row.startTime;
            //           this.formValidate.endTime = params.row.endTime;
            //           this.formValidate.description = params.row.description;
            //         }
            //       }
            //     },
            //     "编辑"
            //   ),
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small"
            //       },
            //       style: {
            //         marginRight: "10px"
            //       },
            //       on: {
            //         click: () => {
            //           this.isLinkFlag = !this.isLinkFlag;
            //           this.$refs.linkref.fetchRooms(
            //             params.row.id,
            //             params.row.name
            //           );
            //         }
            //       }
            //     },
            //     "链接"
            //   ),
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small"
            //       },
            //       style: {
            //         marginRight: "10px"
            //       },
            //       on: {
            //         click: () => {
            //           this.$router.push({
            //             name: "liveplayback_index",
            //             query: { liveId: params.row.id }
            //           });
            //         }
            //       }
            //     },
            //     "回放"
            //   ),
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small"
            //       },
            //       style: {
            //         marginRight: "10px"
            //       },
            //       on: {
            //         click: () => {
            //           this.$router.push({
            //             name: "livevisual_index",
            //             query: { liveId: params.row.id }
            //           });
            //         }
            //       }
            //     },
            //     "数据"
            //   ),
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "primary",
            //         size: "small"
            //       },
            //       on: {
            //         click: () => {
            //           api.patchLiveRecord({ id: params.row.id })
            //             .then(res => {
            //               if (res === 'OK') {
            //                 this.$Message.success('同步成功')
            //               }
            //             })
            //             .catch(err => {
            //               this.$Message.error('同步失败')
            //             })
            //         }
            //       }
            //     },
            //     "同步回放"
            //   )
            // ]);
          }
        }
      ],
      formValidate: {
        menuId: "",
        menuName: "",
        name: "",
        teacherId: "",
        teacherName: "",
        assistantName: "",
        startTime: "",
        endTime: "",
        description: ""
      },
      ruleValidate: {
        menuId: [
          {
            required: true,
            message: "请选择学科",
            type: "number",
            trigger: "change"
          }
        ],
        menuName: [
          {
            required: true,
            message: "请选择学科",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "直播名称不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 30,
            message: "不能超过30个字",
            trigger: "blur"
          }
        ],
        teacherId: [
          {
            required: true,
            message: "直播导师不能为空",
            type: "number",
            trigger: "change"
          }
        ],
        teacherName: [
          {
            required: true,
            message: "直播导师不能为空",
            trigger: "change"
          }
        ],
        assistantName: [
          {
            required: false,
            message: "直播主持人不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 10,
            message: "不能超过10个字",
            trigger: "blur"
          }
        ],
        startTime: [
          {
            required: true,
            type: "date",
            message: "开始时间不能为空",
            trigger: "blur"
          },
          {
            validator: startTimes,
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            type: "date",
            message: "结束时间不能为空",
            trigger: "blur"
          },
          {
            validator: endTimes,
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            message: "直播描述不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 300,
            message: "不能大于300字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchMenus();
    this.handleRefresh();
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions(["fetchLiveList", "fetchMenus", "fetchTeachers"]),
    handleRefresh() {
      this.fetchLiveList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    },
    asyncOK() {
      setTimeout(() => {
        this.loading = false;
        this.$refs.formcraet.validate(async valid => {
          if (valid) {
            this.loading = true;
            this.formValidate.startTime = dateUtil.format(
              this.formValidate.startTime,
              "yyyy-MM-dd HH:mm"
            );
            this.formValidate.endTime = dateUtil.format(
              this.formValidate.endTime,
              "yyyy-MM-dd HH:mm"
            );
            if (this.newLive) {
              let result = await api.postLives(this.formValidate);
              if (result === "OK") {
                this.$Message.success("创建直播成功");
                this.formValidate = {
                  menuId: "",
                  menuName: "",
                  name: "",
                  teacherId: "",
                  teacherName: "",
                  assistantName: "",
                  startTime: "",
                  endTime: "",
                  description: ""
                };
                this.handleRefresh();
              } else {
                this.$Message.error(result);
              }
            } else {
              let result = await api.putEditorLives(this.formValidate);
              if (
                result === "OK" ||
                result === "修改学科后，请重新设置权限！"
              ) {
                let msg =
                  result === "OK"
                    ? "修改直播成功"
                    : "修改学科后，请重新设置权限！";
                this.$Message.success(msg);
                this.handleRefresh();
              } else {
                this.$Message.error(result);
              }
              this.formValidate = {
                menuId: "",
                menuName: "",
                name: "",
                teacherId: "",
                teacherName: "",
                assistantName: "",
                startTime: "",
                endTime: "",
                description: ""
              };
            }
            this.cmodal = false;
          }
        });
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 500);
    },
    cancel() {
      this.formValidate = {
        menuId: "",
        menuName: "",
        name: "",
        teacherId: "",
        teacherName: "",
        assistantName: "",
        startTime: "",
        endTime: "",
        description: ""
      };
    },
    newLiveFn() {
      this.cmodal = true;
      this.newLive = true;
      this.liveTitle = "新建直播课程";
    },
    getMenuIds(val) {
      if (val) {
        this.formValidate.menuName = val.label.replace(/^\s+|\s+$/g, "");
        this.fetchTeachers({
          menuIds: this.formValidate.menuId
        });
        this.formValidate.teacherId = "";
      }
    },
    getTeacherId(val) {
      if (val) {
        this.formValidate.teacherName = val.label.replace(/^\s+|\s+$/g, "");
      }
    },
    handleSearch() {
      let obj = Object.assign(
        {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        },
        this.queryObj
      );
      for (let key in obj) {
        if (!obj[key]) {
          delete obj[key];
        }
      }
      if (obj.menuIds) {
        obj.menuIds = obj.menuIds.join(",");
      }
      console.log(obj);
      this.fetchLiveList(obj);
    },
    handleClear() {
      this.queryObj = {
        name: "",
        menuIds: "",
        teacherName: "",
        status: ""
      };
      this.handleRefresh();
    },
    handleCurrentChange(num) {
      let obj = Object.assign(
        {
          currentPage: (this.currentPage = num),
          pageSize: this.pageSize
        },
        this.queryObj
      );
      for (let key in obj) {
        if (!obj[key]) {
          delete obj[key];
        }
      }
      if (obj.menuIds) {
        obj.menuIds = obj.menuIds.join(",");
      }
      this.fetchLiveList(obj);
    },
    handlePageSize(size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.fetchLiveList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    }
  },
  computed: {
    ...mapState({
      listData: state => state.liveku.livekuData,
      menus: state => state.liveku.menus,
      teachers: state => state.liveku.teachers
    })
  }
};
</script>

<style lang="less">
.margin-top-20 {
  margin-top: 20px;
}
</style>

