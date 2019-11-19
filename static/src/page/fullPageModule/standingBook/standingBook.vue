<template>
  <div class="standing-book-wrapper">
    <div class="standing-book-upside">
      <div class="upload-wrap">
        <label class="standing-book-title">上传公司台账：</label>
        <div>
          <ul class="file-wrap" v-if="uploadFileList.length">
            <li class="file-item clear" v-for="(item, index) in uploadFileList" :key="index">
              <span class="fileName width380 textOverflow1" :title="item.fileName">{{item.fileName}}</span>
              <el-upload
                class="upload-demo reUpload-btn"
                :action="uploadUrl"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload = "beforeUpload"
                :data="uploadData"
                accept="xls,xlsx"
                :headers="uploadHeaders" >
                重新上传
              </el-upload>
            </li>
          </ul>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :limit="1"
            :before-upload = "beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="uploadData"
            :headers="uploadHeaders"
            accept="xls,xlsx"
          >
            <el-button class="reset-btn width120" v-if="!uploadFileList.length"> + 上传资产台账</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>上传填写后端数据文件仅支持xls、xlsx格式，且文件大小不能超过50M</p>
              <p class="upload-attention">* 上传文件后会覆盖部分您已导入的数据，请谨慎操作</p>
            </div>
          </el-upload>
        </div>
      </div>
      <div class="class-tem">
        <label class="standing-book-title">选择模板类别：</label>
        <el-select v-model="selectTemplate" placeholder="请选择" @change="getTemplateDeatail">
          <el-option
            v-for="(item, index) in templates"
            :key="item.value"
            :label="item.name"
            :value="item.name">
            <span style="float: left">{{item.name}}</span>
            <span style="float: right; margin-top: 12px;" v-if="userId === item.createId" class="el-icon-close delete-template" @click.stop="deleteTemplate(item, index)"></span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="standing-book-underPart" v-if="showSubjectFlag"><!--用上传文件的类型判断是否显示，此时已经上传并解析成功-->
      <ul class="import-select-wrap">
        <li class="import-select-con">
          <div class="import-select-header clear">
            <span class="import-select-tit">导入科目选择</span>
            <el-checkbox class="import-select-checkAll" v-model="checkedAllSubject" @change="handleCheckAllSubject">全选</el-checkbox>
          </div>
          <div class="import-select-body cancleScroll">
            <div class="subjectItem clear" v-for="(item, index) in subjectList" :key="index" v-if="showSubjectFlag">
              <div class="width100" >
                <el-checkbox v-model="item.checked" @change="handleCheckSingle" :disabled="standingMatchName[index]==='未匹配'"></el-checkbox>
                <span class="subjectItem-tit" :class="{active: currentSubject === index}" @click="setOtherPart(item.name, index)">{{item.name}}</span>
              </div>
              <div class="matchItem width80" v-if="standingBookSheet.length && standingMatchName.length">
                <span class="standingBookSheet  textOverflow1" :class="{unMatchItem: standingMatchName[index]==='未匹配'}" :title="standingMatchName[index]">{{standingMatchName[index]}}</span><span class="edit el-icon-edit-outline" @click="openDialog(index, false, 'subject', item.name)"></span>
              </div>
            </div>
          </div>
        </li>
        <li class="import-select-con" >
          <div class="import-select-header">
            <span class="import-select-tit">导入基准列选择</span>
          </div>
          <div class="import-select-body" @mousemove="handleMouseEv('left')" ref="standard-column" :style="{height: viewHeight + 'px'}" @scroll="scrollColumn($event, 'left')">
            <ul class="standard-column-left" v-if="standardColumn.standardColumnArr">
              <p class="standard-column-tit">数据基准列</p>
              <li class="standard-column-text" v-for="(item, index) in standardColumn.standardColumnArr" :title="item.name">
                <el-checkbox  v-model="item.checked" @change="handleStandardCheck($event, index, item)" :disabled="standardColumn.standardAccount[index] === '未匹配'">{{item.name}}</el-checkbox>
              </li>
            </ul>
            <ul class="standard-column-right" v-if="standardColumn.standardColumnArr">
              <p class="standard-column-tit">台账表对应列</p>
              <li class="standard-column-text" v-for="(item, index) in standardColumn.standardAccount" :key="index">
                <span class="width60 textOverflow1 interchange" :class="{unMatchItem: item ==='未匹配'}">{{item}}</span><span class="edit el-icon-edit-outline" @click="openDialog(index, true, 'standard')"></span>
              </li>
            </ul>
          </div>
        </li>
        <li class="import-select-con" >
          <div class="import-select-header">
            <span class="import-select-tit">导入补充列选择</span>
          </div>
          <div class="import-select-body" @mousemove="handleMouseEv('right')" ref="addition-column" :style="{height: viewHeight + 'px'}" @scroll="scrollColumn($event, 'right')">
            <ul class="standard-column-left" v-if="standardColumn.additionColumnArr">
              <p class="standard-column-tit additionDetail">明细补充列</p>
              <el-checkbox class="checkAllAddition" v-model="additionCheckAll" @change="checkAllAddition">全选（除基准列）</el-checkbox>
              <li class="standard-column-text" v-for="(item, index) in standardColumn.additionColumnArr" :key="index" :title="item.name">
                <el-checkbox  v-model="item.checked" @change="handleSingleAddition($event, index)" :disabled="standardColumn.additionAccount[index] === '未匹配'">{{item.name}}</el-checkbox>
              </li>
            </ul>
            <ul class="standard-column-right" v-if="standardColumn.additionColumnArr">
              <p class="standard-column-tit">台账表对应列</p>
              <li class="standard-column-text" v-for="(item, index) in standardColumn.additionAccount" :key="index">
                <span class="width60 textOverflow1 interchange" :class="{unMatchItem: item ==='未匹配'}">{{item}}</span><span class="edit el-icon-edit-outline" @click="openDialog(index, true, 'addition')"></span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <CenterDialog ref="centerDialog" :dialogWidth="'320px'" :dialogHeight="'350px'"
                  :dialogTitle="dialogTitle">
      <div slot="dialogContent">
        <p class="dialog-tit">{{smallDialogTitle}}</p>
          <ul class="dialog-list">
            <el-scrollbar style="height: 100%;">
              <li class="match-item" @click="matchItem" :class="{activeItem: unMatchItem}">未匹配</li>
              <li class="match-item" v-for="(val, index) in matchList"
                  @click="matchItem(val, index)"
                  :class="{activeItem: matchIndex === index}"
                  :key="index"
              >
                {{val}}
              </li>
            </el-scrollbar>
          </ul>
        <div class="dialog-footer">
          <a class="search-btn" @click="operateBtn(true)">确认</a>
          <a class="reset-btn" @click="operateBtn(false)">取消</a>
        </div>
      </div>
    </CenterDialog>
    <CenterDialog ref="collectTemplate" :dialogWidth="'500px'" :dialogHeight="'195px'" dialogTitle="提示信息">
      <div slot="dialogContent">
        <div class="print_name">
          <label>模板名称：</label>
          <el-input placeholder="请输入模板名称"  v-model="accountName" class="width260"></el-input>
        </div>
        <div class="dialog-footer">
          <a class="search-btn" @click="addTemplate(true)">确认添加</a>
          <a class="reset-btn" @click="addTemplate(false)">取消</a>
        </div>
      </div>
    </CenterDialog>
  </div>
</template>

<script>
  import sheetData from '@/page/fullPageModule/tableJson/sheetData.js'
  import tableJson from '@/page/fullPageModule/tableJson.js'
  import CenterDialog from '@/components/centerDialog'
  import Public from "@/public.js";
  export default {
    data() {
      return {
        templates:[],
        sheetType: '',
        uploadFileList: [],  // 上传文件的文件列表
        subjectList: [  //'车辆', '电子设备', '机械设备', '房屋建筑物'
          {
            name: '车辆',
            checked: false,
            matchName: '',
            standardColumnArr: [],
            standardAccount: [],
            additionColumnArr: [],
            additionAccount:[]
          },
          {
            name: '电子设备',
            checked: false,
            matchName: '',
            standardColumnArr: [],
            standardAccount: [],
            additionColumnArr: [],
            additionAccount:[]
          },
          {
            name: '机器设备',
            checked: false,
            matchName: '',
            standardColumnArr: [],
            standardAccount: [],
            additionColumnArr: [],
            additionAccount:[]
          },
          {
            name: '房屋建筑物',
            checked: false,
            matchName: '',
            standardColumnArr: [],
            standardAccount: [],
            additionColumnArr: [],
            additionAccount:[]
          }
        ],
        standingMatchName: [], // 台账匹配页签
        matchList: [],

        uploadHeaders:{
          token:this.$getCookie('token'),
        },
        uploadData: {
          investorId: this.$store.state.investorId,
          projectId: this.$store.state.projectId,
          uploadType:"account",
        },
        standardColumn: {},
        addtionColumn: {},

        userId: JSON.parse(this.$getCookie('user'))['id'],
        selectTemplate: '',
        uploadUrl: '/api/file/uploadAssetsPossessionXls',
        checkedAllSubject: false,
        dialogTitle: '选择基准对应列',
        additionCheckAll: false,
        matchIndex: '', // 接收弹窗内的下标
        matchVal: '',  // 接收
        currentSubject: '',  // 接收当前科目的下标
        viewHeight: window.screen.availHeight-410 ,
        position: '', // 用于判断鼠标的位置
        subjectItem: '', // 用于暂存上一次操作后的列
        standBookIndex: '', // 用于接收台账表对应列的下标
        standBookFlag: '', // 用于判断基准列或补充列
        accountName: '', // 台账名字
        fullscreenLoading: '', // 用于控制全屏加载
        accountSheetAndAccountColumn: '', // 传给后台的台账页签与列
        standingBookSheet: [], // 台账页签（多页签时）
        standingBookHeadObj: {}, // 存储弹窗中台账多个页签的表头
        standingBookHead: [], // 存储弹窗中台账当前页签的表头
        templateDetail: {}, // 存储后台解析的台账excel
        showSubjectFlag: false, // 用于判断是否展示下方表格和科目
        fileContent: {}, // 存储文件内容
        unMatchItem: false,
        smallDialogTitle: '',
        allCheck: false,
        autoMatch: false,
      };
    },
    created() {

    },

    watch: {
      subjectList: {
        handler: function (newVal, oldVal) {
          this.subjectList = newVal;
        },
        deep: true
      },

      showSubjectFlag: {
        handler: function(newVal, oldVal) {
          this.$store.state.showCollectFlag = newVal;
        }
      },

    },

    mounted() {

    },

    components: {
      CenterDialog
    },

    methods: {
        //  前端自行取出数据，现弃用
      getData(name) {
        let nameArr = this.subjectList.filter(item =>item.name=== name);
        //if(nameArr[0].standardColumnArr.length) return // 用于判断——若已做过选择，不再重新拿取数据
        let type = '';
        let standardColumnArr= [];
        let standardColumn = {}
        tableJson.dataSurface.forEach((item, index) =>{
          if(nameArr[0].name === item.name) type= item.type;
        });
        standardColumn=tableJson.tableHead[type][1];
        for (let key in standardColumn) {
          if(standardColumn[key]['standingBookShow']){
            if(standardColumn[key]['subHead']){
              standardColumnArr.push({name:standardColumn[key]['subHead'] + '-' + standardColumn[key]['label'], checked: false})
            }else{
              standardColumnArr.push({name:standardColumn[key]['label'], checked: false})
            }
          }
        }
        this.subjectList.forEach(item=>{
          if(item.name=== name){
            this.$set(item, 'standardColumnArr', standardColumnArr)
            this.$set(item, 'additionColumnArr', standardColumnArr)
            this.$set(item, 'standardAccount', [])
            this.$set(item, 'additionAccount', [])
          }
        })
      },

      // 删除自定义的模板
      deleteTemplate(item, index) {
        this.$confirm('确认删除此模板？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          this.$http.post('api//accountTemplate/deleteAccountTemplate', {
            name: item.name,
            templateType: this.sheetType
          }).then(res=> {
            if(item.name === this.selectTemplate) {
              this.$store.state.switchIcon = false;
              this.selectTemplate = '';
              this.showSubjectFlag = false;
            }
            this.templates.splice(index, 1);
            this.subjectList.forEach(item=> {
              this.$set(item, 'checked', false);
            })
          }).catch(err=> {
            this.$messageError(err)
          })
        }).catch((err)=> {
          this.$messageError(err)
        })

      },

      // 处理模板解析数据（原本由后台返回，现弃用）
      /*handleTemplate(data) {
        this.subjectList= [];
        for(let key in data) {
          let ColumnArr = this.handleExcelTitle(data[key]);
          this.subjectList.push({name: key, checked: false,  standardColumnArr: ColumnArr.headArr, additionColumnArr: ColumnArr.headArr, standardAccount: ColumnArr.additionHeadArr, additionAccount: ColumnArr.additionHeadArr})
        }
      },*/

      // 处理模板数据返回的表头（原本由后台返回，现弃用）
      /*handleExcelTitle(data) {
        let headArr = [],
          additionHeadArr = [];
        data.forEach((item, index)=> {
          let head = '',
            additionHead= '';
          head = item.split(':')[0];
          if(/~/.test(item)){
            additionHead = item.split('~')[1].split(':')[0];
            additionHeadArr.push(additionHead)
          }else{
            additionHeadArr.push('未匹配');
          }
          headArr.push({name: head, checked: false});
        })
        return {headArr, additionHeadArr};
      },*/

      // 上传之前
      beforeUpload(file) {
        var typeStr=file.name.substr(file.name.lastIndexOf(".")+1).toLowerCase() ;
        if(typeStr ==="xls" || typeStr ==="xlsx"){
          if(file.size>52428800){
            fileList.shift();
            this.$messageWarning('导入文件不能大于50M');
            return false; // 返回false时，文件停止上传
          }
        }else{
          this.$messageWarning('导入文件仅支持xls、xlsx格式');
          return false;
        }
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
      },

      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.fullscreenLoading.close();
        this.$store.state.switchIcon = false;
        this.resetData();
        this.uploadFileList.push(res.data);
        this.fileContent = res.data;  // 存储上传文件成功后的内容
        this.$http.post('api/xls/getAccountColumns', {
          investorId: this.$store.state.investorId,
          projectId: this.$store.state.projectId,
          alyPath: this.fileContent.fileDir,
          templateType: this.selectTemplate
        }).then(res=>{
          let templateType = '';
          if(Object.keys(res.data).length>1) {
            templateType = 'many'
            this.standingBookSheet = Object.keys(res.data);
            this.templateDetail = res.data;
          }else {
            templateType = 'single'
            this.standingBookSheet = [];
          }
          this.sheetType = templateType;
          this.getTemplates(templateType)
          this.getStandingBookHead(res.data); //获取列弹窗值
          this.accountSheetAndAccountColumn = this.parcelTemplate(res.data);
          this.showSubjectFlag = false;
        }).catch(err=>{
          this.$messageError(err);
        })
      },

      // 上传失败
      uploadError(err, file, fileList){
        Public.$emit('uploadError',err, file, fileList);
      },

      resetData() {
        this.sheetType = ''
        this.currentSubject = ''; // 上传成功后，需要将原有的值置空
        this.subjectList.forEach(item=>{
          this.$set(item, 'standardColumnArr', []);
          this.$set(item, 'additionColumnArr', []);
          this.$set(item, 'standardAccount', []);
          this.$set(item, 'additionAccount', []);
          this.$set(item, 'matchName', []);
          this.$set(item, 'checked', false);
        })
        this.checkedAllSubject = false;
        this.standardColumn = {};
        this.uploadFileList = [];
        this.templates = [];
        this.standingBookSheet = [];
        this.standingMatchName = [];
        this.selectTemplate = '';
        this.matchIndex= ''; // 接收弹窗内的下标
        this.matchVal= ''
      },

      getTemplates(type) {
        this.$http.post('api/accountTemplate/accountTemplate',{
          templateType: type
        }).then(res=>{
          this.templates = res.data;
        }).catch(err=> {
          this.$messageError(err)
        })
      },

      // 获取弹窗中台账的表头
      getStandingBookHead(data) {
        this.standingBookHead = [];
        this.standingBookHeadObj = {};
        if(this.sheetType === 'single') {
          for(let key in data['all'][0]) {
            this.standingBookHead.push(key);
          }
        }else {
          for(let sheet in data) {
            let headArr = [];
            for(let head in data[sheet][0]) {
              headArr.push(head);
            }
            this.standingBookHeadObj[sheet] = headArr;
          }
        }
      },

      /*
      * 解析模板，获取台账的详情
      * @data —— 传入的参数为对象
      * */
      parcelTemplate(data) {
        let accountSheetAndAccountColumn= {};
        for(let key in data) {
          accountSheetAndAccountColumn[key] = [];
          for(let sheet in data[key][0]) {
            accountSheetAndAccountColumn[key].push(sheet);
          }
        }
        return JSON.stringify(accountSheetAndAccountColumn);
      },

      // 查询台账类别模板详情
      getTemplateDeatail() {
        this.$store.state.switchIcon = (this.selectTemplate !== '自动匹配');
        this.showSubjectFlag = false;
        this.currentSubject = ''; // 切换模板后，需要将原有的值置空
        this.$http.post('api/accountTemplate/accountTemplateDetails', {
          name: this.selectTemplate,
          accountSheetAndAccountColumn: this.accountSheetAndAccountColumn
        }).then(res=> {
          this.standingMatchName = [];
          this.standardColumn = {};
          this.subjectList.forEach(item=> {
            this.getData(item.name);
          })
          if(Object.keys(res.data).length) {
            this.matchStandingBook(res.data)
          }else {
            this.matchStandingBook(res.data);
          };
          this.showSubjectFlag = true;
        }).catch(err=> {
          this.$messageError(err)
        })
      },

      // 匹配多（单）页签的台账与模板
      matchStandingBook(data) {
        let sheetArr = Object.keys(data);
        let Sheet = [],
            matchSheet= [];
        sheetArr.forEach(item => {
          Sheet.push(item.split('~')[0])
          matchSheet.push(item.split('~')[1]);
        })
        this.subjectList.forEach((item) => {
          if(Sheet.indexOf(item.name) !== -1) {
            this.standingMatchName.push(matchSheet[Sheet.indexOf(item.name)]); // 将匹配到的数据下标取出，并用于匹配值
            let columnArr = [], matchColumnArr = [];
            data[item.name +'~' + matchSheet[Sheet.indexOf(item.name)]].forEach((column) => {
              columnArr.push(column.split('~')[0]);
              matchColumnArr.push(column.split('~')[1]);
            }) ;
            item.standardColumnArr.forEach((standardCol) => {
              if(columnArr.indexOf(standardCol.name) !== -1) {
                item.standardAccount.push(matchColumnArr[columnArr.indexOf(standardCol.name)]);
                item.additionAccount.push(matchColumnArr[columnArr.indexOf(standardCol.name)]);
              }else {
                item.standardAccount.push('未匹配');
                item.additionAccount.push('未匹配');
              }
            })
          }else {
            this.standingMatchName.push('未匹配');
            item.standardColumnArr.forEach(col => {
              item.standardAccount.push('未匹配');
              item.additionAccount.push('未匹配');
            })
          }
        });
        if(this.sheetType === 'single') this.standingMatchName = []; // 单页签时，不进行匹配
      },

      // 当多页签时，点击科目后获取右侧对应关系
      matchColumn(name, index, resolve) {
        let StandingBook = this.standingMatchName[index];
        let param = {};
        this.standingBookHead = this.standingBookHeadObj[StandingBook];
        param[StandingBook] = this.templateDetail[StandingBook];
        this.$http.post('api/accountTemplate/designationSheetAutoMatch', {
          sheetName: name,
          accountSheetAndAccountColumn: this.parcelTemplate(param),
        }).then(res=> {
          let matchCol = [];
          if(!res.data[name +'~'+StandingBook]) {
            resolve && resolve();
            return; // 不存在匹配关系则返回
          }
          res.data[name +'~'+StandingBook].forEach((col, colIdx)=> {
            matchCol.push(col.split('~')[0]);
          });
          this.subjectList.forEach((item)=> {
            if(item.name === name) {
              item.standardColumnArr.forEach((column, colIndex) => {
                this.$set(column, 'checked', false);
                this.$set(item.additionColumnArr[colIndex], 'checked', false);
                if(matchCol.indexOf(column.name) !== -1) {
                  this.$set(item.standardAccount, colIndex, matchCol[matchCol.indexOf(column.name)])
                  this.$set(item.additionAccount, colIndex, matchCol[matchCol.indexOf(column.name)])
                }else {
                  this.$set(item.standardAccount, colIndex, '未匹配')
                  this.$set(item.additionAccount, colIndex, '未匹配')
                }
              })
            }
          })
          this.autoMatch = false;
          resolve && resolve();
        }).catch(err=> {
          this.$messageError(err);
        })
      },

      // 选择全部科目
      handleCheckAllSubject() {
        let _this = this;
        _this.subjectList.forEach((item, index)=> {
          if(_this.checkedAllSubject && _this.standingMatchName[index] !=='未匹配'){
            _this.$set(item, 'checked', true)
          }else {
            _this.$set(item, 'checked', false)
          }
        })
      },

      // 选择单个科目时
      handleCheckSingle() {
        let _this = this;
        let checkedArr = [];
        let num = 0;
        _this.subjectList.forEach((item, index)=> {
          if(!item.checked) {
            _this.checkedAllSubject = false;
            return
          }else {
            checkedArr.push(item);
          }
        })
        this.standingMatchName.forEach((item, index)=> {
          if(item !== '未匹配') num++ ;
        })
        if((checkedArr.length === _this.subjectList.length) || (num === checkedArr.length)) _this.checkedAllSubject = true;
      },

      // 设置其余列的内容
      setOtherPart(name, index) {
        // this.getData(name);
        if(this.sheetType === 'many' && this.standingMatchName[index] !== '未匹配' && this.selectTemplate === '自动匹配' && this.autoMatch) {
          new Promise((resolve, reject)=> {
            this.matchColumn(name, index, resolve);
          }).then(res=>{
            this.clickSubject(name, index)
          }).catch(err=> {
            this.$messageError(err)
          })
        }else if(this.sheetType === 'many' && this.standingMatchName[index] !== '未匹配' && (this.selectTemplate !== '自动匹配' || !this.autoMatch)){
          this.standingBookHead = this.standingBookHeadObj[this.standingMatchName[index]];
          this.clickSubject(name, index)
        }else if(this.sheetType === 'many' && this.standingMatchName[index] === '未匹配'){
          this.$messageError('请选择匹配的科目！');
        }else if(this.sheetType === 'single'){
          this.clickSubject(name, index)
        }
      },

      // 点击科目后的操作
      clickSubject(name, index) {
        if((this.currentSubject || this.currentSubject === 0)){ //当前下标存在时，将值进行补充赋值
          for(let key in this.subjectItem) {
            if(key != 'checked'){
              this.$set(this.subjectList[this.currentSubject], key, this.subjectItem[key]);
            }
          }
        }
        this.subjectList.forEach((item, index)=>{
          if(item.name === name) {
            this.standardColumn = JSON.parse(JSON.stringify(item));
          }
        })
        this.smallDialogTitle = this.standardColumn.name;
        this.currentSubject = index;
        this.subjectItem = this.standardColumn;
        this.handleSingleAddition();
      },

      // 选择弹窗中对应的值
      matchItem(val, index) {
        if(val && (index || index === 0)) {
          this.matchIndex = index;
          this.matchVal = val; // 用于匹配后的值
          this.unMatchItem = false;
        }else {
          this.matchVal = event.target.innerText;
          this.unMatchItem = true;
          this.matchIndex = '';
        }
      },

      // 点击编辑图标，打开弹窗
      openDialog(index, flag, type, title) {
        this.standBookIndex = '';
        this.standBookFlag = '';   //每次打开弹窗都将下标与标志置空
        this.matchIndex = '';
        this.matchVal = '';
        this.$refs.centerDialog.showDialog();
        switch(type) {
          case 'subject':
            this.dialogTitle = '选择对应科目';
            this.smallDialogTitle = title;
            this.matchList = this.standingBookSheet;
            break;
          case 'standard' :
            this.dialogTitle = '选择对应基准列';
            this.matchList = this.standingBookHead;
            break;
          case 'addition' :
            this.dialogTitle = '选择对应补充列';
            this.matchList = this.standingBookHead;
            break;
          default:
            this.matchList = [];
        }
        this.standBookIndex = index;
        this.standBookFlag = flag;
      },

      // 弹窗确认替换的值
      operateBtn(flag) {
        if(flag){
          if(!this.matchVal) {
            this.$messageError('请选择后再点击确认！')
            return;
          }
          if(this.standBookFlag){
            this.$set(this.standardColumn.standardAccount, this.standBookIndex, this.matchVal)
            this.uniqueValue(this.standardColumn.standardAccount, this.matchVal, this.standBookIndex);
            this.$set(this.standardColumn.additionAccount, this.standBookIndex, this.matchVal)
            this.uniqueValue(this.standardColumn.additionAccount, this.matchVal, this.standBookIndex);
            if(this.matchVal === '未匹配') {
              this.$set(this.standardColumn.standardColumnArr[this.standBookIndex], 'checked', false);
              this.$set(this.standardColumn.additionColumnArr[this.standBookIndex], 'checked', false);
            }
            this.handleSingleAddition();
            if(this.$store.state.switchIcon) this.$store.state.switchIcon = !this.$store.state.switchIcon;
          }else {
            this.currentSubject = '';
            this.autoMatch = true;
            this.$set(this.standingMatchName, this.standBookIndex, this.matchVal);
            this.uniqueValue(this.standingMatchName, this.matchVal, this.standBookIndex);
            this.$set(this.subjectList[this.standBookIndex], 'matchName', this.matchVal);
            if(this.matchVal === '未匹配') {
              this.$set(this.subjectList[this.standBookIndex], 'checked', false);
              this.autoMatch = false;
            }
            this.handleCheckSingle();
            this.setOtherPart(this.subjectList[this.standBookIndex]['name'], this.standBookIndex)
            if(this.$store.state.switchIcon) this.$store.state.switchIcon = !this.$store.state.switchIcon;
          }
          this.$refs.centerDialog.closeDialog();
        }else{
          this.unMatchItem = false;
          this.$refs.centerDialog.closeDialog();
        }
      },

      // 科目和台账对应列的值唯一
      uniqueValue(data, value, currentIndex) {
        if(value !== '未匹配'){
          data.forEach((item, index)=> {
            if(item === value && currentIndex !== index) {
              this.$set(data, index, '未匹配');
              if(this.dialogTitle === '选择对应科目') {
                this.$set(this.subjectList[index], 'checked', false);
              }else {
                this.$set(this.standardColumn.standardColumnArr[index], 'checked', false);
                this.$set(this.standardColumn.additionColumnArr[index], 'checked', false);
              }
            }
          })
        }
      },

      // 全选补充列
      checkAllAddition() {
        this.standardColumn.additionColumnArr.forEach((item, index)=>{
          if(this.additionCheckAll && this.standardColumn.additionAccount[index] !== '未匹配') {
            if(!this.standardColumn.standardColumnArr[index]['checked']){
              this.$set(item, 'checked', true);
            }
          }else {
            this.$set(item, 'checked', false)
          }
        })
        this.handleSingleAddition();
      },

      // 基准列单个点击
      handleStandardCheck(event, index, currentItem) {
        this.standardColumn.standardColumnArr.forEach((item, index)=> {
          if(item.checked) {
            if(this.standardColumn.additionColumnArr[index]['checked']){
              this.$set(this.standardColumn.additionColumnArr[index], 'checked', false)
            }
          }
        })
        this.handleSingleAddition();
      },

      // 补充列的单个点击
      handleSingleAddition(event, position) {
        let checkedArr = [],
            num= 0,
            standNum= 0,
            unCheckStandard= [];
        this.standardColumn.additionColumnArr.forEach((item, index)=>{
          if(!item.checked){
            if(!this.standardColumn.standardColumnArr[index]['checked']) this.additionCheckAll = false;
            return
          }else{
            if(this.standardColumn.standardColumnArr[index]['checked']){
              this.$set(this.standardColumn.standardColumnArr[index], 'checked', false)
            }
            checkedArr.push(item);
          }
        })
        this.standardColumn.standardColumnArr.forEach((item, index)=> {
          if(!item.checked) {
            unCheckStandard.push(item);
          }else {
            standNum ++;
          }
        })
        this.standardColumn.additionAccount.forEach(item=> {
          if(item !== '未匹配') num++;
        })
        this.additionCheckAll = (checkedArr.length === unCheckStandard.length) || (checkedArr.length === num && checkedArr.length !== 0) || ((standNum + checkedArr.length) === num && checkedArr.length !== 0);
      },

      // 滚动事件
      scrollColumn(event, type) {
        if(this.position !== type) return;
        let scrollTop = event.target.scrollTop;
        if(type === 'left'){
          this.$refs['addition-column'].scrollTop = scrollTop;
        }else {
          this.$refs['standard-column'].scrollTop = scrollTop;
        }

      },

      // 确定鼠标移动的位置
      handleMouseEv(type) {
        this.position = type;
      },

      // 收藏模板调用的方法
      addBtnHandler() {
        if(this.$store.state.switchIcon) return;
        if(!Object.keys(this.standardColumn).length) {
          this.$messageError('请进行匹配选择后再收藏！')
          return
        }
        this.$refs.collectTemplate.showDialog();
      },

      // 添加模板调用接口
      addTemplate(flag) {
        if(flag){
          this.clickSubject(this.subjectList[this.currentSubject]['name'], this.currentSubject); // 用于将上次操作保留
          let xlsAndAccount = JSON.stringify(this.handleParams());
          if(!this.accountName) {
            this.$messageError('请输入模板名！');
            return
          }
          this.$http.post('api/accountTemplate/insertAccountTemplate', {
            name: this.accountName,
            xlsAndAccount,
          }).then(res=> {
            this.getTemplates(this.sheetType);
            this.selectTemplate = this.accountName;
            this.accountName = ''; // 将模板名字置空
            this.$store.state.switchIcon = true;
            this.$refs.collectTemplate.closeDialog();
          }).catch(err=> {
            this.$messageError(err)
          })
        }else {
          this.accountName = '';
          this.$refs.collectTemplate.closeDialog();
        }
      },

      // 处理收藏模板时传递的参数
      handleParams() {
        let dataObj= {};
        this.subjectList.forEach((item, index)=> {
          dataObj[item.name] = {};
          item.standardAccount.forEach((val, valIndex)=> {
            if(val !== '未匹配'){
              if(this.sheetType === 'single') {
                dataObj[item.name][item.standardColumnArr[valIndex]['name']] = val
              }else {
                dataObj[item.name][item.standardColumnArr[valIndex]['name']] = this.standingMatchName[index] + '.' + val;
              }
            }
          })
          if(!Object.keys(dataObj[item.name]).length) delete dataObj[item.name];
        })
        return dataObj
      },

      // 点击提交按钮时的接口
      childMethod() {
        this.$store.state.getUploadStatu(()=> {
          this.submitStandingBook();
        }, 'allImp')
      },

      // 点击右上角提交时
      submitStandingBook() {
        this.allCheck = false;
        this.clickSubject(this.subjectList[this.currentSubject]['name'], this.currentSubject); // 用于将上次操作保留
        let condition = [];
        this.subjectList.forEach((item, index)=> {
          let dataObj = {};
          if(item.checked) {
            if(this.sheetType=== 'single'){
              dataObj['sheetName'] = item.name;
            }else {
              dataObj['sheetName'] = item.name + '~' + this.standingMatchName[index];
            }
            let benchmarkColumn = '';
            let supplementaryColumn = '';
            item.standardColumnArr.forEach((col, colIndex)=> {
              if(col.checked) {
                benchmarkColumn += (col.name + '~' +item.standardAccount[colIndex] + ',')
              }
            })
            item.additionColumnArr.forEach((addCol, addColIndex)=> {
              if(addCol.checked) {
                supplementaryColumn += (addCol.name + '~' + item.additionAccount[addColIndex] + ',')
              }
            })
            benchmarkColumn = benchmarkColumn.substring(0, benchmarkColumn.length-1);
            supplementaryColumn = supplementaryColumn.substring(0, supplementaryColumn.length-1);
            if(!benchmarkColumn || !supplementaryColumn) {
              this.allCheck = true ;
            }
            dataObj['benchmarkColumn'] = benchmarkColumn;
            dataObj['supplementaryColumn'] = supplementaryColumn;
          }
          if(Object.keys(dataObj).length) {
            condition.push(dataObj);
          }
        })
        if(!condition.length || this.allCheck) {
          this.$messageError('注意：科目、基准列与补充列都勾选后再提交！');
          return
        }
        condition = JSON.stringify(condition);
        this.$http.post('api/xls/accountUploadExcel', {
          investorId: this.$store.state.investorId,
          projectId: this.$store.state.projectId,
          alyPath: this.fileContent.fileDir,
          fileName: this.fileContent.fileName,
          showLoading: false,
          condition
        }).then(res=> {
          this.allCheck = false;
        }).catch(err=> {
          this.$messageError(err);
        })
        setTimeout(()=> {
          this.$store.commit('changeShowCommon');
          this.$store.state.getUploadStatu();
          this.$store.state.intervalFn();
        }, 100)
      },

      // 取消按钮
      extraChildMethod() {
        this.$store.commit('changeShowCommon');
      }

    },

    beforeDestroy() {
      this.$store.state.showCollectFlag = false;
      this.$store.state.switchIcon = false;
    }

  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.standing-book-wrapper{
  padding: 20px;
  .standing-book-title{color: #686868;}
  .class-tem{margin-top: 13px;}
  /*上半部分*/
  .standing-book-upside{padding-left: 65px; font-size: 13px; margin-bottom: 20px;
    .upload-wrap{display: flex;
      .file-wrap{width: 580px; border: 1px dashed #DCDCDC; padding: 5px 10px; margin-left: 4px; box-sizing: border-box;
        .fileName{color:#676767; float: left;}
        .reUpload-btn{color: #3A80EC; float: right; margin-right: 10px; font-size: 13px;
          /deep/ .el-upload--text{color: #3A80EC;}
        }
        .file-item{padding: 3px 0; font-size: 13px;
          &:hover{background:rgba(251,250,250,1);}
        }
      }
      .upload-demo{margin-left: 4px;
        .reset-btn{margin-bottom: 10px;}
      }
      .upload-attention{color: #F09237;}
      .el-upload__tip{border: 1px dashed #DCDCDC; width: 580px; box-sizing: border-box; padding: 5px 15px;
        >p{padding: 5px 0;}
      }
    }
  }
  /*下半部分*/
  .standing-book-underPart{ height: 100%;
    .import-select-wrap{display: flex; border: 1px solid #E5E5E5; width: 100%;
      .import-select-con{border-right: 1px solid #E5E5E5;}
      .import-select-con:nth-child(1){width: 232px;}
      .import-select-con:nth-child(2){width: 265px;}
      .import-select-con:nth-child(3){width: 265px;}
      .import-select-header{height: 32px; background:rgba(246,250,255,1); line-height: 32px; box-sizing: border-box; padding: 0 14px;font-weight:400;border-bottom: 1px solid #E5E5E5;}
      .import-select-tit{color:#262628; font-size: 13px;}
      .import-select-checkAll{float: right; margin-left: 10px;}
    }
    .import-select-body{overflow-x: hidden; overflow-y: auto; display: flex;
      .subjectItem{height: 37px; line-height: 37px;padding:0 15px; box-sizing: border-box; border-bottom: 1px solid #E5E5E5; display: flex;}
      .subjectItem-tit{font-size: 12px; color: #6A6A6A; margin-left: 10px; cursor: pointer;
        &:hover{color: #3A80EC;}
      }
      .matchItem{margin-left: 20px; font-size: 12px; display: flex;
        .edit{display: inline-block; height: 37px; line-height: 37px;}
      }
      .standingBookSheet{display: inline-block; width: 55px; text-align: left; color: #6A6A6A;}
      .subjectItem-tit.active{color: #3A80EC;}
      .standard-column-left{width: 135px; padding: 20px 15px; padding-right: 0; box-sizing: border-box; /*float:left;*/ }
      .standard-column-right{width: 110px; padding: 20px 15px; padding-right: 0;box-sizing: border-box; /*float:right; */ }
      .standard-column-tit{font-size: 13px; color: #262628; margin-bottom: 30px; box-sizing: border-box; padding-left: 5px;}
      .additionDetail{margin-bottom: 0;}
      .standard-column-text{font-size: 12px; color: #6A6A6A; box-sizing: border-box; padding: 3px 5px; height:25px; text-align: left;line-height: 25px; display: flex; align-items: center;
        /deep/ .el-checkbox{display: flex; align-items: center;}
        /deep/ .el-checkbox__label{width: 90px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
      }
      .interchange{display: inline-block;}
      .unMatchItem{color: red;}
      .edit{color: #3A80EC; font-size: 13px; cursor:pointer;}
      .checkAllAddition{height: 30px; text-align: left; line-height: 30px; box-sizing: border-box;padding-left: 5px;}
    }
    .cancleScroll{overflow-y: hidden; display: block;}
  }
  /*对话框部分*/
  .dialog-tit{font-size: 13px; color:#262628; margin-bottom: 10px;
    &:before{content:''; display: inline-block; width:6px; height: 6px; border-radius: 3px; background-color: #F09237; margin-right: 10px; margin-bottom: 3px;}
  }
  .dialog-list{height: 210px; border: 1px solid #E5E5E5; margin-bottom: 15px;
    .match-item{height: 22px; box-sizing: border-box; line-height: 22px; text-align: center; border-bottom: 1px solid #E5E5E5; font-size: 12px;
      &:hover{color: #91BDFF; cursor: pointer;}
    }
    .match-item.activeItem{background:rgba(237,245,255,1);color: #91BDFF;}
  }
  .print_name{text-align: center; margin-bottom: 42px; margin-top: 10px; color:#686868; font-size: 13px;}
  .dialog-footer{text-align: center;}
  /deep/ .el-upload{text-align: left;}
  /deep/ .el-upload__tip{margin-top: 0;}
  /deep/ .el-icon-edit-outline{display: inline-block;}
  /deep/ .el-scrollbar__wrap{overflow-x: hidden;}
  /deep/ .el-upload-list{display: none;}
}
</style>
