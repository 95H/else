<template>
  <Modal
    v-model="modal"
    :title="title"
    @on-cancel="cancel"
    :mask-closable="false">
    <Form ref="formItem" :model="formItem" :rules="ruleFormItem" :label-width="100" inline v-if="isCreate">
      <FormItem label="阶段群名称：" prop="name">
        <Input v-model="formItem.name"  :maxlength=50 style="width: 125px" clearable></Input>
      </FormItem>
      <FormItem label="选择学科：" prop="subject">
        <Select placeholder="请选择学科" :disabled="isShow" @on-change="changeData" style="width:125px; margin-right: 5px; text-align: left;" v-model="formItem.subject" clearable>
          <Option class="Options" v-for="(item,index) in subjectList" :value="item.menuId" :key="index">{{ item.menuName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择阶段" prop="stageId">
        <Select placeholder="请选择阶段" :disabled="isShow" v-model="formItem.stageId" style="width:125px" clearable>
          <Option class="Options" v-for="(item,index) in phaseName" :value="item.stageId" :key="index" :title="item.stageName">{{ item.stageName }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer" v-if="isCreate">
      <Button type="primary" @click="next" :loading="loading">下一步</Button>
    </div>
    <div v-if="!isCreate">
      <Form ref="formItem" :model="formItem" :rules="ruleFormItem" :label-width="50" inline>
        <FormItem label="角色" prop="role">
          <Select placeholder="请选择角色" v-model="formItem.role" style="width:125px" @on-change="roleChange" clearable>
            <Option class="Options" v-for="(item, index) in rolesData" :key="index" :value="index">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="人员" prop="personnel">
          <Select placeholder="请选择人员" v-model="formItem.personnel" style="width:125px" @on-change="personelChange" clearable>
            <Option class="Options" v-for="(item,index) in rolesMan" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <Button type="primary" @click="addRoles" :loading="loading">添加</Button>
      </Form>
      <div class="tips">注：如果目前没有安排老师，可以直接点击确定。</div>
      <Table border :columns="columns" :data="dataList" :loading="tableLoading"></Table>
    </div>
    <div slot="footer" v-if="!isCreate">
      <Button @click="last" :loading="loading">上一步</Button>
      <Button type="primary" @click="cancel" :loading="loading">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import {mapState, mapGetters, mapActions } from 'vuex';
  import api from "@/api/index";
  export default {
    name: "new-template",
    components: {
    },
    data () {
      const numReg = (rule, value, callback) => {
        let Reg = /^[0-9]*[1-9][0-9]*$/;
        //大于零的整数校验需要补充
        if (value == '') {
          callback(new Error('请输入内容'));
        } else if (Reg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入大于零的整数'));
        }
      };
      return {
        //名称是否改变
        nameIsChange:'',
        tableLoading:false,
        title:"新建阶段群",
        isShow:false,
        isCreate:true,
        dataId:'',
        //阶段名称
        phaseName: [],
        //人员名称
        rolesMan: [],
        baseData:{},
        loading: false, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
        modal: false,
        email:'',
        templateListName: '',
        formItem: {
          name: '',
          subject: '',
          stageId:'',
          role: '',
          personnel:''
        },
        ruleFormItem: {
          name: [
            { required: true, message: '请填写阶段群名称',trigger: 'blur' },
            { type: 'string', trigger: 'change' }
          ],
          subject: [
            { required: true, message: '请选择学科',type:'number',  trigger: 'change' }
          ],
          stageId: [
            { required: true, message: '请选择阶段',type:'number',  trigger: 'change' }
          ],
          role: [
            { required: true, message: '请选择角色',type:'string',  trigger: 'change' }
          ],
          personnel: [
            { required: true, message: '请选择人员',type:'number',  trigger: 'change' }
          ]
        },
        dataList:[],
        //数据列表
        columns: [
          {
            title: "序号",
            type: "index",
            align: "center"
          },
          {
            title: "角色",
            key: "roleLevel",
            align: "left"
          },
          {
            title: "名称",
            key: "name",
            align: "left"
          },
          {
            title: "添加时间",
            key: "createTime",
            width: 145,
            align: "right"
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                  },
                  on: {
                    click: () => {
                      this.delTeacher(params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      }
    },
    computed:{
      ...mapGetters({
        subjectList: "student/subjectList"
      }),
      ...mapState({
        rolesData: state => state.stageGroup.rolesData//角色
      })
    },
    mounted(){
      this.getRoles()//获取角色
    },
    methods: {
      ...mapActions([
        "addStageGroup",
        "getStageGroup",
        "getRoles"
      ]),
      //获取老师记录
      getTeacherLog(){
        let data={groupId:this.dataId};
        this.fetchPhases(data)
      },
      fetchPhases(data) {
        return api.getGroupsTeacher(data)
          .then(res => {
            if (res.status === 200) {
              this.dataList=res.result;
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
          })
      },
      //添加角色
      addRoles(){
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            this.tableLoading = true;
            this.loading = true;
            let data = {groupId: this.dataId, type: this.formItem.role, email: this.email};
            api.postAddGroupsTeacher(data).then(res => {
              if (res.status === 201) {
                this.$emit('addUpdata');
                this.getTeacherLog();
                this.getPersonnel();
              } else {
                this.$Message.error(res.message);
              }
              this.loading = false;
              this.tableLoading = false;
            })
           }
          })
      },
      //删除老师或者班主任
      delTeacher(id){
        this.tableLoading = true;
        let data={groupAssistantId:id};
        api.deleteGroupsTeacher(data).then(res=>{
          if (res.status === 200) {
            this.$Message.success('删除成功！');
            this.$emit('addUpdata');
            this.getTeacherLog();
          }else{
            this.$Message.error(res.message);
          }
          this.loading=false;
          this.tableLoading = false;
        })
      },
      //创建阶段群
      createGroup(){
        this.title="创建阶段群";
        this.modal=true;
      },
      //更新阶段群
      updataGroup(info){
        this.modal=true;
        this.title="修改阶段群";
        this.dataId=info.id;
        this.nameIsChange=this.formItem.name=info.stageGroupName;
        this.formItem.subject=info.subjectId;
        this.changeData();
        this.formItem.stageId=info.stageId;
        this.$set(this.baseData,"groupId", info.id);
      },
      //人员改变->邮箱
      personelChange(id){
        if(id){
          let arr=this.rolesMan.filter(function(item){
            return id==item.id
          });
          this.email=arr[0].email;
        }
      },
      //学科名称改变->阶段id
      changeData(){
        this.formItem.stageId='';
        let data={subjectId:this.formItem.subject};
        console.log(data.subjectId);
        if(!data.subjectId){this.phaseName=[];return;}
        api.getClassStage(data).then(res=>{
          if (res.status === 200) {
            this.phaseName=res.result;
          }
        }).catch(err => {
          this.$Message.error(err.message);
        })
      },
      //点击角色
      roleChange(){
        this.formItem.personnel='';
        this.getPersonnel()
      },
      //公共角色改变->人员
      getPersonnel(){
        let data={groupId:this.dataId,type:this.formItem.role};
        if(data.type){
          api.getRolesMan(data).then(res=>{
            if (res.status === 200) {
              this.rolesMan=res.result;
            }
          }).catch(err => {
            this.$Message.error(err.message);
          })
        }else{
          this.rolesMan=[]
        }
      },
      //上一步
      last(){
        this.nameIsChange=this.formItem.name;
        if(this.title=="修改阶段群" || this.title=="修改相关老师"){
            this.isShow=true;
            if(this.title=="修改相关老师"){
              this.title="修改阶段群";
            }
        }else{
          this.isShow=false;
        }
        this.isCreate=true;
      },
      createStument (list) {
        this.modal = true;
        //this.templateListName = list;
      },
      //对重复名称的处理
      repeatName(data){
        if(this.formItem.name==this.nameIsChange){
          if(data){
            this.title="修改相关老师";
          }
          this.getTeacherLog();
          this.isCreate=false;
          this.loading=false;
        }
      },
      //添加或者修改
      next () {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            this.loading=true;
            if(this.title=="修改阶段群"){
              if(this.formItem.name==this.nameIsChange){
                this.repeatName(true);
                return;
              }
              this.baseData={name:this.formItem.name,groupId:this.baseData.groupId};
              api.patchUpdataGroups(this.baseData).then(res=>{
                if (res.status === 200) {
                  this.$Message.info({
                    content: '阶段群修改成功',
                    duration: 3
                  });
                  this.$emit('addUpdata');
                  this.isCreate=false;
                  this.getTeacherLog();
                  this.title="修改相关老师";
                }else{
                  this.$Message.error(res.message);
                }
                this.isShow=false;
                this.loading=false;
              });
              return;
            }
            if(this.formItem.name==this.nameIsChange){
              this.repeatName();
              return;
            }
            this.baseData={name:this.formItem.name,oeTeachingStageId:this.formItem.stageId};
            api.postAddGroups(this.baseData).then(res=>{
              if (res.status === 201) {
                this.$Message.info({
                  content: '阶段群创建成功，请设置相关老师！',
                  duration: 3
                });
                this.$emit('clearData');
                this.$emit('addUpdata');
                this.dataId=res.result;
                this.isCreate=false;
                this.getTeacherLog();
                this.title="设置相关老师";
              }else{
                this.$Message.error(res.message);
              }
              this.loading=false;
              this.isShow=false;
            });
          } else {
          }
        });
      },
      cancel () {
        this.isShow=false;
        this.isCreate=true;
        this.modal=false;
        this.rolesMan=[];
        this.formItem={
          name: '',
          subject: '',
          stageId:'',
          role: '',
          personnel:''
        };
        if(this.$refs.formItem) {
          this.$refs.formItem.resetFields();
        }
      },
    }
  }
</script>

<style scoped>
  .Options{
    width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tips{
    position: relative;
    top:-5px;
    color:#F83939;
  }
</style>
