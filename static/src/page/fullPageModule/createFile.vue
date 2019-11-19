<template>
	<div class="zlpg-assessmentDescription" v-loading="loading"
            :element-loading-text='loadTxt'
            element-loading-spinner="loading-upload-icon">
    <div class="zlpg-assessmentDescription-left">
    	<div class="btn_box">
    		<a class="search-btn mini-btn" :class="{'noClick' : !readonly}" @click="showDialog('addMenu')">添加</a>
    		<a class="save-btn mini-btn" :class="{'noClick' : !readonly}" @click="showDialog('removeMenu')">删除</a>
    	</div>
    	<div class="catalog_box">
        <!-- <div class="tree-mask" v-if='treeMask'></div> -->
    		<!-- <span class="fs14"><i class="iconfont icon-mulu"></i> <em>封面目录</em></span> -->
    		<div class="catalog">
        	<el-scrollbar>
	          <!-- <el-tree :data="editorMenuArr" :props="defaultProps" :default-expand-all="defaultExpandAll" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree> -->
            <zlpg-tree-node ref="addMenuTree" v-for="(item,index) in editorMenuArr" :key="index" :node="item" :show-checkbox="false">{{item.indexNumString + item.directoryName}}</zlpg-tree-node>
	        </el-scrollbar>
	      </div>
      </div>
    </div>
    <div class="zlpg-assessmentDescription-right">
      <div class="right-header marginBottom5 fs13 padding010" style="position:relative;">
      	<div class="catalog_tt fl">
      		<div v-if="catalogTitleFlag" >
            <span class="fl" :class="{'lockFalg':lockFalg=='no'}" :title="editorTit" style="width:200px;">{{editorTit}}</span>
            <a href="javascript:;" class="el-icon-edit-outline fs16 fl marginLeft10 marginTop10" v-if="!thisIsEdit" @click="catalogTitleFlag=false"></a>
          </div>
      		<div v-else>
            <el-input class="fl" style="width:200px;" v-model="editorTit"></el-input>
            <a class="mini-btn save-btn" @click="changeTitle">保存</a>
          </div>
      	</div>
        <span style="position:absolute;left:200px;" v-if="(lockFalg==='no') && lockUserName">
           <b style="color:red;">{{lockUserName}}正在编辑此模块，请先编辑其他模块</b>
        </span>
        <div class="fr">
          <a href="javascript:;" class="search-btn el-button--warning" v-if="$store.state.readonly"
             :style="(lockFalg=='no')?'pointer-events: none;border-color:#ccc!important;background-color:#ccc!important;':''" @click="saveContent(1)">保存</a>
      	  <a href="javascript:;" class="search-btn" @click="flush">刷新</a>
          <a class="search-btn"  @click="exportFile">导出</a>
          <a class="search-btn looking" @click="filePreview">{{this.$route.params.tabId == 7 ? '报告预览' : '说明预览'}}</a>
        </div>
      </div>
      <div class="editorBox" v-show='!loading' id="editorCon">
      	<!--<div id="editorToolbar" v-show='loading'></div>
      	<div id="editorContent" v-show='loading' @click="handleMenu = false" @keyup="handleMenu = false" @contextmenu="insertRelation"></div>-->
      	<div id="editor" class="ueditor-con"></div>
      </div>
    </div>
    <!-- 添加目录 -->
    <center-dialog ref="addMenu" dialogTitle="添加目录" dialogWidth="450px" dialogHeight="237px">
    	<div slot="dialogContent" class="addMenuContent">
    		<el-form ref="addMenuForm" :model="addMenuForm" label-width="80px" :rules="addMenuNode">
					<el-form-item label="上级目录：">
        		<el-cascader :options="addEditorMenuArr" change-on-select v-model="addMenuForm.parentMenuName" filterable :show-all-levels="false" :props="defaultProps"></el-cascader>
					</el-form-item>
					<el-form-item label="目录名称：" prop="menuName">
        		<el-input placeholder="请输入新增目录名称" v-model="addMenuForm.menuName" maxLength="30"></el-input>
					</el-form-item>
					<div class="margin0 text-center">
    				<a href="javascript:;" class="search-btn" @click="addMenuSure">保存</a>
    				<a href="javascript:;" class="reset-btn" @click="closeDialog('addMenu')">取消</a>
					</div>
				</el-form>
    	</div>
    </center-dialog>
    <!-- 删除目录 -->
    <center-dialog ref="removeMenu" dialogTitle="删除目录" dialogWidth="500px" dialogHeight="540px">
    	<div slot="dialogContent">
    		<div class="removeMenuList">
    			<el-scrollbar>
    				<!-- <el-tree ref="delMenu" :data="editorMenu" show-checkbox node-key="id" default-expand-all :props="defaultProps"></el-tree> -->
            <zlpg-tree-node ref="delMenu" v-for="(item,index) in editorMenuArr" :key="index" :node="item" :show-checkbox="true">{{item.indexNumString + item.directoryName}}</zlpg-tree-node>
    			</el-scrollbar>
    		</div>
    		<div class="text-center">
    			<a href="javascript:;" class="search-btn" @click="delMenuFun">确认</a>
    			<a href="javascript:;" class="reset-btn" @click="closeDialog('removeMenu')">取消</a>
    		</div>
    	</div>
    </center-dialog>
    <!-- 鼠标右键菜单 -->
    <!--<ul class="handleMenuFun" v-show="handleMenu" ref="contextmenu">
      <li v-if="isRelation && lockFalg=='yes'" @click="customRelation">自定义关联</li>
      <li v-if="(!addRelation || !isRelation) && lockFalg=='yes'" @click="delRelationDialog($event)">删除当前关联</li>
      <li v-if="lockFalg=='yes'" @click="delRelationDialog($event)">删除本章节关联</li>
      <li v-if="!addRelation" @click="openRelationDetail">查看明细表</li>
    </ul>-->
    <!-- 删除关联确定弹窗 -->
    <center-dialog ref="removeRelation" dialogTitle="删除关联" dialogWidth="300px" dialogHeight="165px">
    	<div slot="dialogContent">
    		<div class="text-center marginTop10">
    			是否确定{{delRelationText}}？
    		</div>
    		<div class="text-center marginTop30">
    			<a href="javascript:;" class="search-btn" @click="delRelationFun">确认</a>
    			<a href="javascript:;" class="reset-btn" @click="closeDialog('removeRelation')">取消</a>
    		</div>
    	</div>
    </center-dialog>
  </div>
</template>

<script>
import centerDialog from "../../components/centerDialog";
import zlpgTreeNode from "@/page/fullPageModule/fullPageTreeNode";
//import E from "wangeditor";
import { mapActions,mapState } from "vuex";
import { setTimeout } from 'timers';
import '../../../static/ueditor/ueditor.config.js'
import '../../../static/ueditor/ueditor.all.js'
import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

export default {
  data() {
    return {
      editor: null,
      editorTit: "",
      thisIsEdit: true,
      diffDataArr: [],
      diffData: {},
      editorCont: "",
      thisNodeId: "",
      editorContent: "",
      editorMenuArr: this.editorMenu,
      addEditorMenuArr: this.dataLoop(
        JSON.parse(JSON.stringify(this.editorMenu)),
        1,
        true
      ),
      getCheckKeyArr: [],
      defaultExpandAll: true,
      defaultProps: {
        children: "children",
        label: "directoryName",
        value: "id"
      },
      catalogTitleFlag: true,
      //添加菜单
      addMenuForm: {
        parentMenuName: [],
        menuName: ""
      },
      addMenuSureFlag: false,
      addMenuNode: {
        menuName: [
          { required: true, message: "请输入目录名称", trigger: "blur" }
        ]
      },
      nowDate: "",
      autoSave: "",
      lockFalg: "yes",
      lockUserName: "",
      //保存的编辑状态
      readonly: this.$store.state.readonly,
      loading:false,
      loadTxt:' ',
      treeMask : true,
      handleMenu : false,  //右键菜单
      dangerLength : 0,    //初始化时danger的数量
      addRelation : false,   //是否插入关联的右键方法
      delRelationText : '',
      dangerElement : {},
      cursorBeforeNode : null,    //存储光标位置信息的对象
      cursorAddress : 0,    //光标在此对象中的偏移量
      // relationSign : this.$store.state.Relationsign,    //自定义关联的章节目录的标记
      isRelation : true,   //如果属性中存在isRelation则右键弹窗中只能删除，不能自定义和查看明细
      isClickMenu : false,
      isRefresh : false
    };
  },
  computed:{
    ...mapState(['investorId']),
  },
  mounted() {
    var _this = this;
    if (_this.editorMenu.length == 0) {
      _this.$messageError("暂无文件信息");
    } else {
      _this.thisNodeId = _this.editorMenu[0].id;
      _this.createdE();
      document.querySelectorAll(".catalog .el-tree-node__label")[0].classList.add("tree-actived");
      document.querySelectorAll(".catalog .el-tree-node__label")[0].parentNode.classList.add("tree_node_actived");
      this.$store.state.moduleChildId = document.querySelectorAll(
        ".catalog .el-tree-node__label"
      )[0].title;
      // 树结构添加title  方便查看全部内容
      let labelList = document.querySelectorAll(
        ".catalog .el-tree-node__label"
      );
      for (let i = 0; i < labelList.length; i++) {
        labelList[i].setAttribute("title", labelList[i].innerText);
      }
      _this.$store.state.handleNodeClick = function(node) {
        _this.handleNodeClick(node);
      };
      // // 插入关联
      _this.$store.state.insertRelationFun = function(html) {
        _this.insertRelationFun(html);
      };
      // 修改关联
      _this.$store.state.changeRelationFun = function(oldId,newId,tabId,source,val) {
        _this.changeRelationFun(oldId,newId,tabId,source,val);
      };
      _this.$store.state.saveContent = this.saveContent
    }
    // 为danger绑定右键菜单 
    $("#editor iframe").contents().on("contextmenu", "danger", this.handleRelation);
    $("#editor iframe").contents().on("contextmenu", "body", this.insertRelation);
    //$("#editorContent").on("contextmenu", "danger", this.handleRelation);
    // 关联数据添加样式
    $("#editor iframe").contents().find("danger").parent().css("margin","0 5px");
    //$("#editorContent danger").parent().css("margin","0 5px");
  },
  watch: {
    "$store.state.readonly"(newD,oldD){
      this.readonly = newD;
      //this.editor.$textElem.attr('contenteditable', newD)
      $("#editor iframe").contents().find("body").attr('contenteditable', newD);
    },
    editorMenu() {
      this.editorMenuArr = this.editorMenu;
      this.addEditorMenuArr = this.dataLoop(
        JSON.parse(JSON.stringify(this.editorMenu)),
        1,
        true
      );
      this.postFunction()
    },
    editorCont() {
      if(this.lockFalg === 'no') return;
      if(window.needRefresh){
        window.needRefresh();
        window.needRefresh = null
      }
      const timer = 12000000;
      this.nowDate = new Date().getTime();
      // 无操作一段时间后自动保存
      window.clearTimeout(this.autoSave);
      this.autoSave = setTimeout(() => {
        this.saveContent();
        window.needRefresh = ()=>{
          this.$messageError('页面超时，请刷新页面')
        }
      }, timer);
    },
    "$store.state.investorId"(){
    	this.isRefresh = true
    }
  },
  props: {
    editorMenu: Array
  },
  components: { centerDialog, zlpgTreeNode },
  methods: {
    // 保存光标位置
    saveCusorPos(){
      let sel;
      if (window.getSelection) {
        var frameId = "edui-editor-iframeholder";
	      var iframe = document.frames ? document.frames[frameId][0] : document.getElementsByClassName(frameId)[0].getElementsByTagName('iframe')[0];
	      var ifWin = iframe.contentWindow || iframe;
	      sel = ifWin.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          this.cursorBeforeNode = sel.getRangeAt(0).startContainer;   //光标前面的节点内容
          this.cursorAddress = sel.getRangeAt(0).startOffset;         //光标在当前节点中的位置
          //console.log(sel.getRangeAt(0))
        }
      }
    },
    // 处理已有关联
    handleRelation(e){
      e.stopPropagation();
      e.preventDefault();
      this.dangerElement = e.target;
      // 通过返回的属性，判断是否存在邮件菜单
      if(this.dangerElement.getAttribute("isRelation")){
        this.isRelation = false;
        return false;
      }else{
        this.isRelation = true;
      }
      this.handleMenu = true;
      this.addRelation = false;
      // }
    },
    // 插入关联右键菜单
    insertRelation(e){
      if(this.lockFalg == 'yes'){
        // e.stopPropagation();
        e.preventDefault();
        this.isRelation = true;
        this.handleMenu = true;
        this.saveCusorPos();   //保存当前光标位置
        this.dangerElement = '';
      }
      this.addRelation = true;
      // 右键弹窗的位置
      //this.contextmenuPosition(e);
    },
//  // 处理菜单弹出位置
//  contextmenuPosition(e){
//    let _this = this;
//    window.setTimeout(function(){
//      _this.$refs.contextmenu.style.left = e.pageX + "px";
//      if(($(window).height() - 120) < e.pageY){
//        _this.$refs.contextmenu.style.top = e.pageY-_this.$refs.contextmenu.clientHeight + "px";
//      }else{
//        _this.$refs.contextmenu.style.top = e.pageY + "px";
//      }
//    })
//  },
    // 自定义关联
    customRelation(){
      this.handleMenu = false;
      this.$store.commit('changeShowCommon');//固定
      this.$store.state.commonTitle = '数据关联'; //弹框名称
      // this.$store.state.commonBtn = '确认关联'; //按钮名称 （没有按钮传空）
      this.$store.state.componentsType = 'tableModule'; //要调用组件的名称
      this.$store.state.cprWidth = true; //重置弹窗的宽度
      if(this.dangerElement.getAttribute){
        this.$store.state.dataObj = { //需要传递的参数
          tabName : this.dangerElement.getAttribute("tabId"),
          id : this.dangerElement.id
        }
      }
    },
    // 插入关联的方法
    insertRelationFun(html){
      let _this=this,sel, range;
      _this.isRefresh = true;
      $("#editor iframe").contents().find("body").focus();
      var frameId = "edui-editor-iframeholder";
      var iframe = document.frames ? document.frames[frameId][0] : document.getElementsByClassName(frameId)[0].getElementsByTagName('iframe')[0];
      var ifWin = iframe.contentWindow || iframe;
      sel = ifWin.getSelection();
      //sel = window.getSelection();
      range = document.createRange();
      range.setStart(_this.cursorBeforeNode,_this.cursorAddress);   //还原之前保存的光标位置
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(), node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      
      // 重新生成编辑器中的内容，防止danger不能修改造成的问题
      _this.updataEditorContent();
      // 插入关联或修改关联后保存内容，防止F5刷新页面后造成的关联错误
      _this.saveContent(1);
    },
    // 修改关联
    changeRelationFun(oldId,newId,tabId,type,val){
    	this.isRefresh = true;
      $("#editor iframe").contents().find("span_"+oldId).after('<span_'+newId+'><danger contenteditable="false" tabId="'+ tabId +'" id="'+ newId +'" type="'+ type +'">'+val+'</danger></span_'+newId+'>')
      $("#editor iframe").contents().find("span_"+oldId).remove();
      //修改关联后保存内容，防止F5刷新页面后造成的关联错误
      this.saveContent(1);
    },
    // 打开删除关联的弹窗
    delRelationDialog(type){
      this.showDialog('removeRelation');
      this.delRelationText = type;
      this.handleMenu = false;
    },
    // 删除关联
    delRelationFun(){
      let params = {
        projectId : this.$store.state.projectId,
        investorId : this.$store.state.investorId
      };
      if(this.delRelationText == '删除当前关联'){   //删除某个关联
        // $("#editorContent span_"+this.dangerElement.id).after($("#editorContent span_"+this.dangerElement.id+" danger").html()).remove();
        params.uniqueId = this.dangerElement.id;
      }else{    //删除本章节全部关联
        // 根据正则将文本域中的字符串进行处理【删除关联元素外层的<span_a*/>、<danger/>标签】
        // this.editor.txt.html(this.editorContent.replace(/\<span_a.*?\>/g,'').replace(/\<danger.*?\>/g,'').replace(/\<\/danger\>/g,'').replace(/\<\/span_a.*?\>/g,''))
        // this.updataEditorContent();
        params.sign = this.$store.state.Relationsign;
        params.reportId = this.$store.state.reportId;
      }
      this.isRefresh = true;
      // 删除关联的接口
      this.$http.post('/api/reportRelation/deleteAssociation',params).then(res => {
        if(this.delRelationText == '删除当前关联'){   //删除某个关联
          $("#editor iframe").contents().find("span_"+this.dangerElement.id).after($("#editor iframe").contents().find("span_"+this.dangerElement.id+" danger").html()).remove();
          // params.uniqueId = this.dangerElement.id;
          this.updataEditorContent();
        }else{    //删除本章节全部关联
          // 根据正则将文本域中的字符串进行处理【删除关联元素外层的<span_a*/>、<danger/>标签】
          //this.editor.setContent(this.editorContent.replace(/\<span_a.*?\>/g,'').replace(/\<danger.*?\>/g,'').replace(/\<\/danger\>/g,'').replace(/\<\/span_a.*?\>/g,''))
          // params.sign = this.$store.state.Relationsign;
          this.updataEditorContent('deleteAll');
          // params.reportId = this.$store.state.reportId;
        }
        // 重新生成编辑器中的内容，防止danger不能修改造成的问题
        
      	this.updataEditorContent();
      	this.closeDialog('removeRelation');
        this.saveContent(1);
      }).catch(err => {
        this.$messageError(err);
      })
      
    },
    // 右键菜单中，重新生成编辑器中的内容，防止danger不能修改造成的问题
    updataEditorContent(type){
    	if(type){
    		 this.editor.setContent(this.editorContent.replace(/\<span_a.*?\>/g,'').replace(/\<danger.*?\>/g,'').replace(/\<\/danger\>/g,'').replace(/\<\/span_a.*?\>/g,''))
    	}else{
    		this.editor.setContent(this.editor.getContent());
    	}
      this.diffDataArr = this.createEditorArr(this.editor.getContent());
      this.editorContent = this.editor.getContent();
      this.dangerLength = $("#editor iframe").contents().find("danger").length;
      this.setDiffData(this.editorContent);
    },
    // 查看关联明细表
    openRelationDetail(){
      let getLeftTree = '';
      if(/projectReportAudit|projectIssuedVersion/g.test(this.$route.path)) {
				getLeftTree = "shenhe"; //审核
			} else if(/examineModification/g.test(this.$route.path)) {
				getLeftTree = "waishen" //外审修改
			} else if(/projectExternalAudit/g.test(this.$route.path)) {
				getLeftTree = "waishenshenqing" //线上外审修改申请
			} else {
				getLeftTree = "zuoye"; //作业
			}
      this.handleMenu = false;
      let routeData = this.$router.resolve({
        path: "/openRelationDetail",
        query:{tabName: this.dangerElement.getAttribute('tabId'),type : this.dangerElement.getAttribute("type"),investorId:this.$store.state.investorId,getLeftTree:getLeftTree}
      });
      window.open(routeData.href, "_blank");
    },
    // 循环设置显示内容
    loopSetDirName(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].directoryName = data[i].indexNumString + data[i].directoryName;
        this.loopSetDirName(data[i].children);
      }
      return data;
    },
    exportFile() {
      this.loading=true;
      this.getLoadingText()
      var _this = this;
      if(this.isGenerate == 0) {
        _this.$messageError("请先生成文件！");
        return;
      } else {
          // 评估报告
        if(_this.$route.params.tabId == "7") {
          _this.$http.post("/api/reportEvalDirectory/exportReport",
              {projectId:_this.$store.state.projectId,
              investorId:_this.$store.state.investorId,
              showLoading:false})
          .then((res)=>{
          if(res.data.filePath!=''){
            _this.loading=false;
              window.location.href="/api/file/downloadFile?token=" +
                    this.$getCookie("token")+
                    "&docsName="+
                    this.$filename(res.data.fileName)+
                    '&flag=2&alyPath='+
                    res.data.filePath
            }else{
              _this.$messageError('文件下载失败，请稍后再试')
              _this.loading=false;
            }}
            )
            .catch((error) => {
              console.log(error)
            });
        }else{
          //评估说明
          _this.$http.post("/api/reportDescDirectory/exportExplain",
              {projectId:_this.$store.state.projectId,
              investorId:_this.$store.state.investorId,
              showLoading:false})
          .then((res)=>{
            if(res.data.filePath!=''){
                _this.loading=false;
                window.location.href="/api/file/downloadFile?token=" +
                    this.$getCookie("token")+
                    "&docsName="+
                    this.$filename(res.data.fileName)+
                    '&flag=2&alyPath='+
                    res.data.filePath
            }else{
              _this.$messageError('文件下载失败，请稍后再试')
              _this.loading=false;
            }
          })
            .catch((error) => {
              console.log(error)
            });
        }

      }
    },
    //创建富文本
    createdE: function() {
      var _this = this;
//    this.editor = new E("#editorToolbar", "#editorContent");
//    this.editor.customConfig.menus = [
//      "fontSize",
//      "bold",
//      "fontName",
//      "italic",
//      "underline",
//      "strikeThrough",
//      "foreColor",
//      "backColor",
//      "link",
//      "list",
//      "justify",
//      "quote",
//      "image",
//      "table",
//      "undo",
//      "redo"
//    ];
//    // 是否忽略粘贴内容中的图片
//    this.editor.customConfig.pasteIgnoreImg = false;
//    // 自定义处理粘贴的文本内容
//    this.editor.customConfig.pasteTextHandle = function(content) {
//      return content + "</br>";
//    };
//    // 使用 base64 保存图片【打开上传图片tab】
//    this.editor.customConfig.uploadImgShowBase64 = true;
//    // 隐藏“网络图片”tab
//    this.editor.customConfig.showLinkImg = false;
//    // 自定义字体
//    this.editor.customConfig.fontNames = [
//      "宋体",
//      "仿宋_GB2312",
//      "微软雅黑",
//      "Arial",
//      "Tahoma",
//      "Verdana"
//    ];
//    this.editor.customConfig.onchange = html => {
//      if (this.editorCont == html) return;
//      this.setDiffData(html);
//    };
//    this.editor.customConfig.pasteFilterStyle = false;
//    this.editor.create();
//    this.editorTit = this.editorMenu[0].directoryName;
//    this.thisIsEdit = this.editorMenu[0].disabled;
//    // 获取第一条编辑框中的内容
			UE.delEditor('editor')
      this.editor = UE.getEditor('editor', {
				contextMenu: [
					[{
							label: '自定义关联',
							cmdName: 'cleardoc',
							icon: 'link',
							exec: () => {
								//this.execCommand( ‘cleardoc‘ );
								this.customRelation();
								//console.log(this.$store.state.queryUserSysFunction);
							}
						}
					],
					[{
							label: '删除当前关联',
							cmdName: 'cleardoc',
							icon: 'unlink',
							exec: () => {
								//this.execCommand( ‘cleardoc‘ );
								this.delRelationDialog('删除当前关联');
							}
						}						
					],
					[
						{
							label: '删除本章节关联',
							cmdName: 'cleardoc',
							icon: 'unlink',
							exec: () => {
								//this.execCommand( ‘cleardoc‘ );
								this.delRelationDialog('删除本章节关联');
							}
						}
					],
					[{
							label: '查看明细表',
							cmdName: 'cleardoc',
							icon: 'aligntd',
							exec: () => {
								//this.execCommand( ‘cleardoc‘ );
								this.openRelationDetail();
							}
						}
					],
				]
			})
      this.editor.ready(() => {
				this.editor.setHeight(500)
				this.editor.addListener('contentChange', () => {
					for(let i = 0; i <  $("#editor iframe").contents().find("danger").length; i++){
	        	if($("#editor iframe").contents().find("danger").eq(i).html() == ''){
	        		$("#editor iframe").contents().find("danger").eq(i).addClass('isNullValue');
	        	}
	        }
					var editor = _this.editor.getContent();
					if (_this.editorCont == editor || _this.editorCont == '' || _this.isRefresh){
						_this.isRefresh = false;
						return;
					} 
					if(_this.isClickMenu){
						_this.isClickMenu = false
					}else{
						_this.setDiffData(editor);
					}
				})
				this.editor.addListener('keyup', (type,e) => {
					//if(e.keyCode == 17 || e.keyCode == 8){
						_this.setDiffData(_this.editor.getContent())
					//}
				})
				_this.postFunction();
			});
    },
    //
    createEditorArr(json) {
      var jsonArr = [];
//    createEditorA(json);
//    function createEditorA(json) {
//      for (var i = 0; i < json.length; i++) {
//        if (json[i] && json[i].tag) {
//          if (json[i].tag == "danger") {
//            jsonArr.push(json[i].children[0]);
//          } else {
//            createEditorA(json[i].children);
//          }
//        }
//      }
//    }
      return $("#editor iframe").contents().find("danger");
    },
    //对比重要文件的内容
    setDiffData(html) {
      if ($("#editor iframe").contents().find("danger").length != this.dangerLength) {
        this.$messageError("当前数据已经锁定，不能修改");
        this.editor.setContent(this.editorCont);
        for(let i = 0; i <  $("#editor iframe").contents().find("danger").length; i++){
        	if($("#editor iframe").contents().find("danger").eq(i).html() == ''){
        		$("#editor iframe").contents().find("danger").eq(i).addClass('isNullValue');
        	}
        }
        return;
      } else {
        this.editorCont = html;
      }
    },
    // 点击编辑框中的不可修改内容
    disabledClick() {},
    // 请求内容的接口
    postFunction(node) {
      let _this = this,
        postUrl = "",
        paramsId = "";
      if (_this.$route.params.tabId == "7") {
        postUrl = "/api/reportEvalDirectory/getReportEvalDirectoryContent";
      } else {
        postUrl = "/api/reportDescDirectory/getReportDescDirectoryContent";
      }
      if (node) {
        paramsId = node.id;
      } else {
        paramsId = _this.editorMenu[0].id;
      }
      _this.thisNodeId = paramsId;
      _this.$http
        .post(postUrl, {
          id: paramsId,
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
        })
        .then(function(res) {
          // 删除多余数据中的danger标签
          _this.delDanger(res.data);
          //_this.editorContent = res.data.directoryContent;
          _this.editor.setContent(res.data.directoryContent)
          _this.html = res.data.directoryContent;
          _this.editorContent = res.data.directoryContent;
          //_this.editor.txt.html(_this.editorContent);
          // 向danger标签中添加contenteditable="false"属性
          //$("#editorContent danger").parent().attr("contenteditable","false").css("margin","0 2px");
          _this.dangerLength = $("#editor iframe").contents().find("danger").length;
          // 删除多余数据
          _this.delMoreData(res.data);
          _this.lockFalg = res.data.lockFalg;
          _this.lockUserName = res.data.lockUserName;
          if (_this.lockFalg == "yes" && _this.readonly) {
            _this.editor.setEnabled();
          } else{
            _this.editor.setDisabled();
          }
          if (node) {
            _this.treeMask = true;
            _this.thisNodeId = node.id;
            let nodeList = document.querySelectorAll(
              ".catalog .el-tree-node__label"
            );
            for (let i = 0; i < nodeList.length; i++) {
              if (
                node.indexNumString + node.directoryName ==
                nodeList[i].innerHTML
              ) {
                nodeList[i].classList.add("tree-actived");
                nodeList[i].parentNode.classList.add("tree_node_actived");
              } else {
                nodeList[i].classList.remove("tree-actived")
                nodeList[i].parentNode.classList.remove("tree_node_actived");
              }
            }
            _this.editorTit = node.directoryName;
            _this.thisIsEdit = node.disabled;
          }
          _this.diffDataArr = _this.createEditorArr(
            _this.editor.getContent()
          );
        	_this.editorCont = _this.editor.getContent();
        })
        .catch(function(error) {
          _this.treeMask = true;
          _this.$messageError(error);
        });
    },
    //树结构点击
    handleNodeClick: function(node) {
      var _this = this;
      // _this.treeMask = true;
      _this.$store.state.moduleChildId = node.indexNumString + node.directoryName;
      if(_this.treeMask){
        _this.treeMask = false;
        _this.isClickMenu = true;
        _this.saveContent("", () => _this.postFunction(node));
      }
      _this.catalogTitleFlag = true;
      _this.$store.state.Relationsign = node.sign;
    },
    // 编辑保存标题
    changeTitle() {
      if (this.editorTit != "") {
        this.saveNodeName({
          directoryName: this.editorTit,
          id: this.thisNodeId,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId
        });
      } else {
        this.$messageError("请输入目录名称");
      }
    },
    // 添加菜单【确定按钮】
    addMenuSure() {
      this.addMenuSureFlag = true;
      this.$refs.addMenuForm.validate(valid => {
        if (valid) {
          this.saveNodeName({
            // reportEvalDirectory : '',
            parentId:
              this.addMenuForm.parentMenuName[
                this.addMenuForm.parentMenuName.length - 1
              ] || 0,
            directoryName: this.addMenuForm.menuName,
            projectId: this.$store.state.projectId,
            investorId: this.$store.state.investorId,
          });
        }
      });
    },
    // 保存修改内容
    saveContent(isSfFlag, callback,investorId,paramsUrl) {
      if(this.lockFalg==='no'||!this.readonly) {
        if (callback && typeof callback === "function") {
          callback();
          return
        }else {
          return this.loading=false;
        }
      }
      investorId = investorId ? investorId : this.$store.state.investorId;
      this.loading=true;
      this.loadTxt="正在保存"
      let _this = this;
      window.clearTimeout(_this.autoSave);
      // if(_this.nowDate != ''){
      if (isSfFlag) {
        _this.saveNodeName(
          {
            directoryContent: this.editor.getContent(),//_this.editor.txt.html(),
            id: _this.thisNodeId,
            projectId: _this.$store.state.projectId,
            investorId,
            isSf: "1",
            showLoading:false
          },
          true,
          callback,
          paramsUrl
        );
      } else {
        _this.saveNodeName(
          {
            directoryContent:  this.editor.getContent(),//_this.editor.txt.html(),
            id: _this.thisNodeId,
            projectId: _this.$store.state.projectId,
            investorId,
            showLoading:false
          },
          true,
          callback,
          paramsUrl
        );
      }
      // }
    },
    // 添加菜单，修改标题、保存内容接口
    saveNodeName(params, flag, callback,paramsUrl) {
      let _this = this,
        postUrl = "";
      // if(!this.readonly){return}
      if (_this.$route.params.tabId == "7") {
        postUrl = "/api/" + (paramsUrl || "reportEvalDirectory/addReportCatalogTreeNode");
      } else {
        postUrl = "/api/" + (paramsUrl || "reportDescDirectory/addExplainCatalogTreeNode");
      }
      _this.$http
        .post(postUrl, params)
        .then(function(res) {
          _this.editorMenuArr = _this.dataLoop(res.data, 1);
        	_this.addEditorMenuArr = _this.dataLoop(
            JSON.parse(JSON.stringify(res.data)),
            1,
            true
          );
          if (_this.addMenuSureFlag) {
            _this.closeDialog("addMenu");
            _this.addMenuSureFlag = false;
          }
          if (params.isSf) {
            _this.$messageSuccess("操作成功!");
          }
          _this.catalogTitleFlag = true;
          _this.addMenuForm.parentMenuName = [];
          _this.addMenuForm.menuName = "";
          _this.loading=false;
          _this.loadTxt=""
          if (flag) {
            _this.nowDate = "";
          }
          if (callback && typeof callback === "function") {
            callback();
          }
        })
        .catch(function(error) {
          this.loading = false;
          _this.$messageError(error);
        });
    },
    // 循环数据，增加节点层级
    dataLoop(Arr, level, flag) {
      for (let i = 0; i < Arr.length; i++) {
        Arr[i]["level"] = level;
        Arr[i]["checked"] = "";
        if (flag) {
          Arr[i]["disabled"] = false;
          if (Arr[i]["children"].length == 0) {
            delete Arr[i]["children"];
          }
        }
        if (Arr[i].children != undefined) {
          this.dataLoop(Arr[i].children, level + 1, flag);
        }
      }
      return Arr;
    },
    // 循环获取数据
    getCheckKey(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].checked) {
          this.getCheckKeyArr.push(data[i].id);
        }
        this.getCheckKey(data[i].children);
      }
      return this.getCheckKeyArr;
    },
    delMenuFun() {
      var _this = this,
        postUrl = "";
      this.getCheckKeyArr = [];

      if (_this.$route.params.tabId == "7") {
        postUrl = "/api/reportEvalDirectory/delReportCatalogTreeNode";
      } else {
        postUrl = "/api/reportDescDirectory/delExplainCatalogTreeNode";
      }
      _this.$http
        .post(postUrl, {
          ids: _this.getCheckKey(_this.editorMenuArr).join(","),
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId
        })
        .then(function(res) {
          _this.editorMenuArr = _this.dataLoop(res.data, 1);
          _this.addEditorMenuArr = _this.dataLoop(
            JSON.parse(JSON.stringify(res.data)),
            1,
            true
          );
          document.querySelectorAll(".catalog .el-tree-node__label")[0].click();
          _this.closeDialog("removeMenu");
          _this.$messageSuccess("删除成功！");
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    //文件预览
    filePreview() {
      var investorId = this.$store.state.investorId;
      var tabId = this.$route.params.tabId;
      let routeData = this.$router.resolve({
        path: "/filePreview",
        query: { investorId:investorId, type: tabId=='7'?1:2 }
      });
      window.open(routeData.href, "_blank");
    },
    // 打开弹窗公共方法
    showDialog(refName, callback) {
      this.$refs[refName].showDialog(callback);
    },
    // 关闭弹窗
    closeDialog(refName) {
      this.$refs[refName].closeDialog();
    },
    //刷新
    flush() {
      var _this = this;
      let postUrl = "";
      this.loading  = true;
      this.loadTxt = ' ';
      var text = '<p class = "loading-head-text">正在更新...</p>大约需要等待30秒，请勿关闭当前页面<br/><p class="loading-head-text loading-content">亲，先去喝杯水吧~</p>';
      setTimeout(function(){
          var oLoading = document.querySelector('.el-loading-text');
          oLoading.innerHTML = text;
      },200)
      if (_this.$route.params.tabId == "7") {
        postUrl = "/api/reportEvalDirectory/getReportEvalDirectoryContent";
      } else {
        postUrl = "/api/reportDescDirectory/getReportDescDirectoryContent";
      }
      _this.$http
        .post(postUrl, {
          id: this.thisNodeId,
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          showLoading:false
        })
        .then(function(res) {
          _this.delDanger(res.data);
          _this.editorContent = res.data.directoryContent;
          _this.editor.setContent(_this.editorContent);
          // 删除多余数据
          _this.delMoreData(res.data);
          _this.diffDataArr = _this.createEditorArr(_this.editor.getContent());
          _this.editorCont = _this.editor.getContent();
          _this.lockFalg = res.data.lockFalg;
          _this.loading=false;
          _this.loadTxt=" ";
          if (_this.lockFalg == "yes") {
            _this.editor.setEnabled();
          } else{
            _this.editor.setDisabled();
          }
        });
    },
    // 如果需要删除的数据中存在danger标签，则先删除掉danger
    delDanger(data){
      const _this = this;
      if (_this.$route.params.tabId == '7') {
        if(data.sign == 'REPORT_DIRECTORY_CONTENT_3'){
          data.directoryContent.replace(/danger/g,'');
        }
      }
      if (_this.$route.params.tabId == '8') {
        if(data.sign == 'EXPLAIN_DIRECTORY_CONTENT_80'){
          data.directoryContent.replace(/danger/g,'');
        }
      }
    },
    // 删除多余数据
    delMoreData(data){
      const _this = this;
      if (_this.$route.params.tabId == '7') {
        if(data.sign == 'REPORT_DIRECTORY_CONTENT_7'){
          $("#editor iframe").contents().find("span_20104c9b13aab92866ed5c78a376ffde").remove();
        }
        if(data.sign == 'REPORT_DIRECTORY_CONTENT_3'){
          $("#editor iframe").contents().find("span_ef299e201b7c6546255be2ca8b16b9ea").remove();
        }
      }
      if (_this.$route.params.tabId == '8') {
        if(data.sign == 'EXPLAIN_DIRECTORY_CONTENT_110'){
          $("#editor iframe").contents().find("span_20104c9b13aab92866ed5c78a376ffde").remove();
        }
        if(data.sign == 'EXPLAIN_DIRECTORY_CONTENT_80'){
          $("#editor iframe").contents().find("span_ef299e201b7c6546255be2ca8b16b9ea").remove();
        }
      }
    },
    getLoadingText(type){
      this.loading  = true;
      this.loadTxt = ' ';
      var text = '<p class = "loading-head-text">正在导出...</p>大约需要30秒，请勿关闭当前页面<br/><p class="loading-head-text loading-content">亲，就要成功啦~</p>';
      setTimeout(function(){
          var oLoading = document.querySelector('.el-loading-text');
          oLoading.innerHTML = text;
      },100)

    },
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.zlpg-assessmentDescription {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .zlpg-assessmentDescription-left {
    float: left;
    width: 200px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    .btn_box {
      border-bottom: 1px solid #ececec;
      padding: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .catalog_box {
      position: absolute;
      top: 41px;
      bottom: 0;
      left: 0;
      right: 0;
      .tree-mask{
        height:100%; position:absolute; width:100%; left:0; top:0;z-index:1;
      }
      span {
        padding-left: 14px;
        line-height: 30px;
        display: block;
        padding-top: 10px;
        em {
          font-weight: bold;
          color: #3a80ec;
        }
      }
      .catalog {
        padding: 0 10px 10px;
        position: absolute;
        top: 20px;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
  .zlpg-assessmentDescription-right {
    padding-left: 210px;
    position: relative;
    height: 100%;
    .right-header {
      height: 35px;
      line-height: 35px;
      border: 1px solid #ececec;
      box-sizing: border-box;
      .catalog_tt span {
        width: 460px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .catalog_tt .lockFalg {
        width: 180px;
      }
      .save-btn {
        height: 23px;
        line-height: 21px;
      }
      .looking {
        margin: 4px 0 0;
      }
    }
    .editorBox {
      border: 1px solid #ececec;
      position: absolute;
      top: 40px;
      left: 210px;
      right: 0;
      bottom: 0;
      background-color: #f1f1f1;
      z-index: 999;
      /*#editorContent {
        background-color: #fff;
        border-top: 1px solid #ececec;
        position: absolute;
        left: 0;
        right: 0;
        top: 27px;
        bottom: 0;
        & > div {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          table {
            max-width: 100% !important;
          }
        }
      }*/
     .ueditor-con{
				width: 100%!important;
				height: 100%!important;
				/deep/ .edui-editor{
					width: 100%!important;
					height: 100%!important;
					border: none;
					.edui-editor-iframeholder{
						width: 100%!important;
						height: calc(100% - 55px)!important;
					}
				}
			}
      
    }
  }
  .handleMenuFun{
    position:fixed;
    z-index:100001;
    background:#fff;
    padding:5px 0;
    box-shadow:0 0 10px #ccc;
    border-radius:3px;
    li{
      width:130px; height:25px; line-height:25px; box-sizing:border-box;color:#262628; cursor:pointer; font-size:13px;padding-left:20px; margin:2px 0;
      &:hover{ background-color:#E2EFFF; color:#3A80EC;}
    }
    // &:before{
    //   width:0; height:0; position:absolute; display:block; content:''; border:8px solid #fff; top:-7px;box-shadow:4px 4px 8px #ddd; transform: rotate(-135deg);
    // }
  }
}
.addMenuContent {
  padding: 20px;
  box-sizing: border-box;
}
.removeMenuList {
  margin: 0 25px 30px;
  height: 400px;
}
.mini-btn {
  width: 45px;
  height: 20px;
  line-height: 18px;
  font-size: 12px;
  margin: 0 5px;
  box-sizing: border-box;
}
.save-btn {
  background-color: #f09237;
  display: inline-block;
  color: #fff;
  border-radius: 2px;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
  border: 1px solid #f09237;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease;
  }
}
/deep/ .blankSpaceC{ margin:0 5px;}
/deep/ danger {
  background-color: #ccc;
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 14.0pt;
  &.isNullValue{ padding:2px 25px;}
}
/deep/ .el-tree-node__label {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  margin-right: 5px;
}
/deep/ .el-cascader,
/deep/ .el-form-item__content,
/deep/ .el-form-item__label {
  line-height: 25px;
}
/deep/ .el-cascader {
  width: 100%;
}
/deep/ .el-cascader__label {
  padding: 0 15px 0 5px;
  font-size: 13px;
}
.noClick {
  pointer-events: none;
  border-color: #ccc !important;
  background-color: #ccc !important;
}
/deep/ .loading-upload-icon{background:url('../../../static/img/loading.gif');width: 188px;height: 148px;display:inline-block;transform: scale(.5)}
/deep/ .el-loading-mask{z-index: 100 !important;}
/deep/ .el-loading-spinner .el-loading-text{color: #50ADEE;margin-top:-36px;font-size: 13px}
/deep/ .el-loading-spinner{top:30%}
/deep/ .widget-pop-upload .layui-icon-close{font-weight: normal !important;}
/deep/ .widget-pop-upload .layui-icon-close:hover:after{color: #409EFF;border-color: #c6e2ff;background: #ecf5ff;opacity: 1;}
/deep/ .el-loading-spinner .el-loading-text .loading-head-text{margin-bottom:12px;color: #50ADEE;}
/deep/ .loading-content{line-height: 30px;}
</style>
