<template>
    <div>
      <Row>
        <Card>
          <Row :gutter="10" class="m-b20">
            <Col span="24">
              <Form ref="searchParams" :model="searchParams" :rules="searchRule" inline>
                <FormItem>
                  <Select v-model="searchParams.contractStatus" style="width:200px;margin-right:-4px" clearable placeholder="合同状态">
                    <Option v-for="item in contractState" :value="item.key" :key="item.key">{{ item.value }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="searchParams.subjectId" @on-change=" v=> {getCourseIds(v)}" style="width:200px;margin-right:-4px" clearable placeholder="请选择学科">
                    <Option v-for="item in getMenus" :value="item.menuId" :key="item.menuId">{{ item.menuName }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="searchParams.courseId" style="width:200px;margin-right:-4px" clearable placeholder="请选择课程">
                    <Option v-for="item in getCourse" :value="item.id" :key="item.id">{{ item.gradeName }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="searchParams.mark" placeholder="uid/账号/姓名" style="width: 100px;margin-right:-4px" />
                </FormItem>
                <FormItem>
                  <Input v-model="searchParams.contractCode" placeholder="合同编号" style="width: 100px;margin-right:-13px" />
                </FormItem>
                <FormItem class="margin-left-10">
                  <DatePicker
                    placeholder="签订时间"
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm"
                    @on-change="sendTimes"
                    v-model="initTime"
                    style="width: 200px;margin-right:-4px"></DatePicker>
                </FormItem>
                <Button type="primary" style="margin-right:6px" icon="ios-search" @click="search">搜索</Button>
                <Button type="primary" style="margin-right:6px" @click="exportData" v-if="hasSomeApiAccess('affairs_contracts_data')">导出数据</Button>
                <Button style="margin-right:6px" @click="clearSearchClick">清除</Button>
              </Form>
            </Col>
          </Row>
            <Row id="table-stage-list">
              <Col span="24">
                <Table border :height="baseHeight" :columns="tabListTitle" :data="getDate.listData"></Table>
              </Col>
              <Col class="margin-top-20" span="24">
                <Page placement="top" style="text-align: right;padding-bottom: 1px"
                      :total="getDate.total"
                      :page-size="getDate.pageSize"
                      :page-size-opts="arrPage"
                      @on-change="handleCurrentChange"
                      @on-page-size-change="handlePageSize"
                      :current="getDate.pageNum"
                      :transfer="true"
                      show-elevator show-sizer  >
                </Page>
              </Col>
            </Row>
        </Card>
      </Row>
    </div>
</template>

<script>
  import apiconfig from '@/config/apiconfig'
  import { mapActions, mapState } from "vuex";
  import util from "@/util/util.js";
    export default {
        name: "electronic-contract",
      data() {
        const hascontracts_infos = this.hasSomeApiAccess('affairs_contracts_infos');  //查看电子合同
        
        return {
          baseHeight: 0,
          initTime: '',
          arrPage:[10,20,30,40,100,200],
          contractState: [
            {
              key: '1',
              value: '需签订'
            },
            {
              key: '2',
              value: '生效中'
            },
            {
              key: '3',
              value: '已失效'
            },
            {
              key: '4',
              value: '无需签订'
            }
          ],
          searchParams: {
            contractStatus: '',
            subjectId: '',
            courseId: '',
            mark: '',
            contractCode: '',
            startDate: '',
            endDate: '',
            pageNumber: 1,
            pageSize: 10
          },
          searchRule: {

          },
          tabListTitle: [
            {
              title: '序号',
              type: '',
              align: 'center',
              width: 100,
              render: (h, params) => {
                return h(
                  'span',
                  params.index + (this.getDate.pageNum - 1) * this.getDate.pageSize + 1
                )
              }
            },
            {
              title: '合同状态',
              key: 'status',
              align: 'center',
              width: 100,
              render: (h, params) => {
                // 合同状态：1:生效中、2:待签定、3:已失效、4:无需签订
                let status = '';
                if (params.row.contractStatus === 1) {
                  status = '需签订';
                } else if (params.row.contractStatus === 2) {
                  status = '生效中';
                } else if (params.row.contractStatus === 3) {
                  status = '已失效';
                } else if (params.row.contractStatus === 4) {
                  status = '无需签订';
                };
                return h('div', [
                  h(
                    'span',
                    {
                      style: {
                        color: (params.row.contractStatus === 1 && params.row.days > '3') ? "red" : ''
                      }
                    },
                    status
                  )
                ]);
              }
            },
            {
              title: '合同编号',
              key: 'contractNo',
              align: 'right',
              width: 250,
              render: (h, params) => {
                return h('div', [
                  h(
                    'span',
                    params.row.contractNo ? params.row.contractNo : '--'
                  )
                ])
              }
            },
            {
              title: '学科',
              key: 'menuName',
              align: 'center',
              width: 150
            },
            {
              title: '课程ID',
              key: 'courseId',
              align: 'right',
              width: 100
            },
            {
              title: '课程名称',
              key: 'gradeName',
              align: 'center',
              width: 220
            },
            {
              title: 'uid',
              key: 'itcastUUID',
              align: 'right',
              width: 100
            },
            {
              title: '学员姓名',
              key: 'name',
              align: 'center',
              width: 100
            },
            {
              title: '课程购买时间',
              align: 'right',
              width: 150,
              render: (h, params) => {
                return h('div', [
                  h(
                    'span',
                    params.row.orderEffDate ? util.disposeTime(params.row.orderEffDate, 'yyyy-MM-dd hh:mm') : '--'
                  )
                ])
              }
            },
            {
              title: '签订时间',
              align: 'right',
              width: 150,
              render: (h, params) => {
                return h('div', [
                  h(
                    'span',
                    params.row.effDate ? util.disposeTime(params.row.effDate, 'yyyy-MM-dd hh:mm') : '--'
                  )
                ])
              }
            },
            {
              title: '失效日期',
              align: 'right',
              width: 150,
              render: (h, params) => {
                return h('div', [
                  h(
                    'span',
                    params.row.effDate ? util.disposeTime(params.row.endDate, 'yyyy-MM-dd hh:mm') : '--'
                  )
                ])
              }
            },
            {
              title: '操作',
              key: 'status',
              fixed: 'right',
              width: 100,
              render: (h, params) => {
                
                let $dianzichakanButton = null; //查看

                if (hascontracts_infos) {
                  $dianzichakanButton =  h(
                    'Button',
                    {
                      props: {
                        type: 'primary',
                        size: 'small',
                        disabled: params.row.contractUrl === '' ? true : false
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          window.open(apiconfig.pdfServe + params.row.contractUrl);
                        }
                      }
                    },
                    '查看'
                  )
                }
                return h("div", [ $dianzichakanButton ]);
              }
            }
          ]
        }
      },
      mounted() {
        this.fetchListData({
          pageNumber: 1,
          pageSize: 10
        });
        this.fetchMenus();
        //获取table-height
        this.$nextTick(()=> {
          let dom = document.getElementById("table-stage-list");
          this.baseHeight = util.baseHeight(dom, 82);
        })
      },
      methods: {
        ...mapActions([
          `getElectronicContractList`,
          `fetchMenus`,
          `getLiveCourse`
        ]),
        fetchListData(params) {
          this.getElectronicContractList(params);
        },
        async getCourseIds(id) {
          this.searchParams.courseId = '';
          this.$store.state.liveku.course = [];
          //获取课程
          let params = {
            menuIds: id
          };
          this.getLiveCourse(params);
        },
        sendTimes(e) {
          //获取时间控件的时间
          this.searchParams.startDate = e[0];
          this.searchParams.endDate = e[1];
        },
        handleCurrentChange(num) {
          //翻页
          this.searchParams.pageNumber = num;
          this.fetchListData(this.searchParams);
        },
        handlePageSize(size) {
          //改变每页条数
          this.searchParams.pageNumber = this.getDate.pageNum;
          this.searchParams.pageSize = size;
          this.fetchListData(this.searchParams);
        },
        search() {
          this.searchParams.pageNumber = 1;
          this.searchParams.pageSize = 10;
          this.fetchListData(this.searchParams);
        },
        exportData() {
          let exportParams = {
            ...this.searchParams
          };
          let urlParams = '';
          for (let i in exportParams) {
            urlParams += `${i}=${(!exportParams[i]?'':exportParams[i])}&`;
          }
          urlParams = urlParams.slice(0, urlParams.length - 1);
          window.location = `${apiconfig.bmfUrl}/contractManage/exportPageContract?${urlParams}`;
        },
        clearSearchClick() {
          this.searchParams = {
            contractStatus: '',
            subjectId: '',
            courseId: '',
            mark: '',
            contractCode: '',
            startDate: '',
            endDate: '',
            pageNumber: 1,
            pageSize: 10
          };
          this.initTime = '';
          this.fetchListData(this.searchParams);
        }
      },
      computed: {
        ...mapState({
          getDate: state => state.electronicContract.getDate,
          getMenus: state => state.liveku.menus,
          getCourse: state => state.liveku.course
        })
      }
    }
</script>

<style scoped>
  .m-b20{
    margin-bottom: 20px;
  }
</style>
