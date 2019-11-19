<template>
	<div class="zlpg-home clear">
		<div class="zlpg-home-header">
			<div class="zlpg-home-header-small">
				<span class="logo"></span>
				<i class="platform"></i>
				<span class="group">{{ groupName }}</span>
				<ul class="tab">
					<!--<li>{{ groupName }}</li>-->
					<li>企业代码：{{ groupCode }}</li>
				</ul>
				<!--<ul class="tab">
    			<li><i class="iconfont icon-gongzuotai"></i>工作台</li>
    			<li><i class="iconfont icon-xitongxiangdao"></i>系统向导</li>
    			<li><i class="iconfont icon-jigouguanjia"></i>机构管家</li>
    		</ul>-->
				<ul class="user-info">
					<li class="iconfont icon-xiaoxi" :class="{'hasNews':hasNews}" @click="showMessageDialog"></li>
					<li class="userName" :title="userName" @click="users">{{userName}}
						<div class="xgpwdBox">
							<div class="xgpwd" v-if="isamendPwd" @click="showamendPwd">修改密码</div>
						</div>
					</li>
					<li @click="logout">退出</li>
				</ul>
			</div>
		</div>
		<div class="zlpg-home-cont" ref="zlpgContent">
			<div class="zlpg-home-cont-sidebar">
				<div class="user-con">
					<div class="user-photo"></div>
					<div class="user-info">
						<div class="user-position fs12 textOverflow1" :title="position">{{position}}</div>
						<div class="user-name fs14 fw600 textOverflow1" :title="userName">{{userName}}</div>
					</div>
				</div>
				<ul class="list-group">
					<li v-for='(item,index) in menu' :key="index" v-if="item.id != 1 && item.id != 2 && item.id != 3 && item.id != 4 && item.id != 5">
						<router-link v-if="item.title == '主页' || item.title == '项目'" :to="'/zlpg'+item.jump" @click.native='deleteSearchCondition'><i :class="item.icon"></i>{{item.title}}</router-link>
						<router-link v-else :to="'/zlpg'+(item.list&&item.list.length>0?item.list[0].jump:item.jump)" @click.native='deleteSearchCondition' :class="{'is-active':$route.path.split('/')[2] === item.jump.split('/')[1]}"><i :class="item.icon"></i>{{item.title}}</router-link>
						<div class="hr" v-if="item.title == '待阅'"></div>
					</li>
				</ul>
			</div>
			<div class="zlpg-home-cont-content pv">
				<router-view></router-view>
				<div v-if="showCommon || showCommonOther" class="mask"></div>
				<transition name="fade" enter-class="fade-in-enter" enter-active-class="fade-in-active" leave-class="fade-out-enter" leave-active-class="fade-out-active">
					<commonContent v-if="showCommon"></commonContent>
				</transition>
				<transition name="fade" enter-class="fade-in-enter" enter-active-class="fade-in-active" leave-class="fade-out-enter" leave-active-class="fade-out-active">
					<commonContentOther v-if="showCommonOther"></commonContentOther>
				</transition>
			</div>
		</div>
		<center-dialog class="messageDialog" ref="messageDialog" dialogWidth='660px' dialogHeight="510px" dialogTitle="消息" titlePosition="left">
			<div slot="dialogContent" class="messageContent">
				<div class="messageType">
					<el-tabs v-model="handleOrRead">
						<el-tab-pane label="未读" name="2" :key="0"></el-tab-pane>
						<el-tab-pane label="已读" name="3" :key="1"></el-tab-pane>
					</el-tabs>
				</div>
				<div class="noData" v-if="!messageData.length">暂无数据</div>
				<el-scrollbar v-else>
					<ul class="messageList">
						<li class="message" v-for="(message,index) in messageData" :key="index">
							<div class="msgicon left">
								<img src="../assets/common/message.png" alt="">
								<span>消息</span>
							</div>
							<div class="msgCont left">
								<div class="contTxt left">
									<p class="title" v-if="message.title">{{message.title}}</p>
									<!--<p class="title">{{message.content}}</p>-->
									<p class="txt" :title="message.content">{{message.content}}</p>
									<p class="txt">{{message.createTime}}</p>
								</div>
								<div class="contBtn right">
									<a href="javascript:;" class="read" v-if="handleOrRead==='3'">阅</a>
									<a href="javascript:;" v-else @click="handleMessage(message,1)">阅</a>
									<a href="javascript:;" @click="handleMessage(message,2)">删除</a>
								</div>
							</div>
						</li>
					</ul>
				</el-scrollbar>
				<div class="pagination-container" v-if="messageCount">
					<el-pagination :page-size="rows" background layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page" :total="messageCount">
					</el-pagination>
				</div>
			</div>
		</center-dialog>
		<!--修改密码弹出窗-->
		<center-dialog ref="PwdcenterDialog" dialogWidth='350px' dialogHeight="250px" dialogTitle="修改密码" titlePosition="center" class="amend">
			<div slot="dialogContent">
				<el-form ref="form" :model="form" label-width="90px">
					<el-form-item label="当前密码：">
						<el-input class="term-input" type="password" v-model="password"></el-input>
					</el-form-item>
					<el-form-item label="新密码：">
						<el-input class="term-input" type="password" v-model="newPwd"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码：">
						<el-input class="term-input" type="password" v-model="notarize"></el-input>
					</el-form-item>
				</el-form>
				<div class="table-btns">
					<el-button type="primary" class="search-btn" size="mini" @click="keepPwd">保存</el-button>
					<el-button class="btnColor reset-btn" size="mini" @click="closeDialog">取消</el-button>
				</div>
			</div>
		</center-dialog>
	</div>
</template>

<script>
	import commonContent from '../components/commonContent.vue';
	import commonContentOther from '../components/commonContentOther.vue';
	import CenterDialog from "../components/centerDialog.vue";
	export default {
		components: {
			commonContent,
			commonContentOther,
			CenterDialog,

		},
		name: 'zlpg',
		data() {
			return {
				searchVal: '',
				optionData: {},
				showOk: false,
				menu: [],
				position: '',
				userName: '',
				groupCode: '',
				messageData: [],
				handleOrRead: '2',
				messageCount: 20,
				rows: 10,
				page: 1,
				isamendPwd: false,
				form: {},
				password: '', //当前密码
				newPwd: '', //新密码
				notarize: '', //确认新密码
				hasNews: false,
				isExternalPower: ''
			};
		},
		created() {
			/*let _this = this ;*/
			if(this.$store.state.queryUserSysFunction) {
				this.menu = this.$store.state.queryUserSysFunction
			}
			if(JSON.parse(this.$getCookie("user"))) {
				this.userName = JSON.parse(this.$getCookie("user")).userName;
				// this.position = JSON.parse(this.$getCookie("user")).sysroles[0].roleName;
				this.groupCode = JSON.parse(this.$getCookie("user")).groupNum;
				this.isExternalPower = JSON.parse(this.$getCookie("user")).isExternal;
				this.groupName = JSON.parse(this.$getCookie("user")).parentGroupName?JSON.parse(this.$getCookie("user")).parentGroupName:JSON.parse(this.$getCookie("user")).groupName;
			}
			window.onclick = (e) => {
				if(e.target.className != 'userName') {
					this.isamendPwd = false;
				}
			}
			this.getMessageData(this.setNews);
		},
		mounted(){
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.$refs.zlpgContent.style.minHeight = h-56+'px';
		},
		methods: {
			//点击用户名
			users() {
				this.isamendPwd = true;
			},
			//修改密码弹窗
			showamendPwd() {
				this.$refs.PwdcenterDialog.showDialog();
			},
			closeDialog() {
				this.$refs.PwdcenterDialog.closeDialog();
			},
			//保存修改
			keepPwd() {
				var _this = this
				if(this.password == '') {
					this.$messageError('当前密码不能为空')
				} else if(this.newPwd == '') {
					this.$messageError('新密码不能为空')
				} else if(this.password.length < 6 || this.newPwd.length < 6) {
					this.$messageError('请输入6位或6位以上字符')
				} else if(this.notarize == '') {
					this.$messageError('确认密码不能为空')
				} else {
					if(this.newPwd == this.notarize) {
					  let userInfo = JSON.parse(this.$getCookie('user'));
						this.$http.post('/api/app/update/password', {
							password: hex_md5(_this.password), //当前密码
							newPassword: hex_md5(_this.newPwd), //新密码
              userId: userInfo.id
						}).then(response => {
							if(response.code == 200) {
								this.$messageSuccess('修改成功');
								_this.closeDialog();
								_this.password = '';
								_this.newPwd = '';
								_this.notarize = '';
								window.localStorage.removeItem("logInfo");
							}
						}).catch(error => {
							_this.$messageError(error);
						})
					} else {
						this.$messageError('俩次密码输入不一致')
					}
				}
			},
			//退出登录
			logout() {
				let _this = this;
				if(/assessment/.test(_this.$route.path) && this.$store.state.saveContent) {
					_this.$store.state.saveContent();
					_this.$store.state.saveContent = null
				}
				this.$http.post('/api/logout', {}).then(function() {
					_this.$delAllCookie();
					sessionStorage.clear()
					_this.$router.push({
						path: '/login'
					})
				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			showMessageDialog() {
				this.hasNews = false;
				this.handleOrRead = '2';
				this.initMessageData();
				this.$refs.messageDialog.showDialog();
			},
			handleCurrentChange() {
				this.getMessageData()
			},
			getMessageData(cb) {
				let _this = this;
				const {
					page,
          rows,
          handleOrRead
				} = _this;
				this.$http.post('/api/message/findMessageList', {
					page,
					rows,
					handleOrRead
				}).then(response => {
					_this.messageCount = response.count * 1;
					_this.messageData = response.data;
					if(_this.messageData.length && handleOrRead === '2') {
						cb && cb()
					}
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			initMessageData() {
				this.page = 1;
				this.messageData = [];
				this.getMessageData()
			},
			handleMessage(message, deleOrUpdateType) {
				const {
					applyUserId,
					projectId,
					dataId,
					dataType
				} = message;
				this.$http.post('/api/message/deleOrUpdateMessage', {
					applyUserId,
					projectId,
					dataId,
					dataType,
					deleOrUpdateType
				}).then(response => {
					this.getMessageData()
				}).catch(error => {
					this.$messageError(error);
				})
			},
			setNews() {
				this.hasNews = true
			},
			deleteSearchCondition() {
				this.$delCookie("searchCondition");
				this.$store.state.rememberSearchCondition = false;
			}
		},
		computed: {
			showCommon() {
				return this.$store.state.showCommon
			},
			showCommonOther() {
				return this.$store.state.showCommonOther
			},
		},
		watch: {
			handleOrRead() {
				this.initMessageData()
			},
			$route(newPath,oldPath){
				if(newPath.fullPath == '/zlpg/project/projectCont/projectInformation'){
					this.ind = 0;
					localStorage.setItem("index",0);
				}
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>

@import url('//at.alicdn.com/t/font_812259_6g853lbm3am.css');
.zlpg-home{background: #F6F6F6; min-height: 100%;
	.zlpg-home-header{
      width: 100%; height: 36px; background: #145FD2; min-width:1200px;
	    .zlpg-home-header-small{width: 1200px;height: 36px;margin: 0 auto;
	    	.logo{width: 24px; height: 24px;background: url('../assets/common/logo.png');background-size: 24px;margin-top: 6px ;float: left;}
	    	.platform{width: 59px; height: 20px;background: url('../assets/common/platform.png') no-repeat right center;background-size: 59px 15px;margin: 8px 14px;float: left;}
	    	/*.group{width: 135px; height: 18px;background: url('../assets/common/group.png') no-repeat right center;background-size: 118px 13px;margin-top: 9px;float: left;border-left: 1px solid #fff;}*/
	    	.group{height: 18px; color: #fff; font-size: 13px; padding-left: 15px; line-height: 18px;margin-top: 9px;float: left;border-left: 1px solid #fff;}
	    	.tab{float: left;margin-left: 24px;color: #fff;
	    		li{float: left;line-height: 36px;margin-right: 24px;color: #fff;cursor: pointer;font-size: 12px;
	    			i{color: #fff; margin-right: 10px;}
	    		}
	    	}
	    	.user-info{float: right;
	    		li{position:relative;float: left;line-height: 36px;margin-left: 24px;color: #fff;cursor: pointer;font-size: 14px}
          .hasNews::after{
            content: '';
            width: 8px;
            height: 8px;
            position: absolute;
            right: 0;
            top: 8px;
            background-color: #FF5722;
            border-radius: 50%;
          }
	    	}
	    	a{color: #fff;}
	    }
	}
	.zlpg-home-cont{
		width: 1200px;margin: 0 auto; padding-top: 10px; display: -webkit-flex; display: flex;
	    .zlpg-home-cont-sidebar{width: 160px; background: #fff;border:1px solid #ECECEC;margin-right: 10px;
	    	.user-con{height:146px;background: url(../assets/common/photoBg.png) no-repeat top center;
	    			.user-photo{width: 52px;height: 52px;margin: 72px 8px 0 14px; float: left; border: 1px solid #fff;border-radius: 100%;box-shadow:0px 2px 4px 0px rgba(226,226,226,1);background: url(../assets/common/photo.png) no-repeat top center;background-size: contain;}
	    			.user-info{width: 80px;float: right;margin-top: 80px;
    					.user-position{ color: #fff;line-height: 17px; height: 17px;}
    					.user-name{color: #262628; line-height: 20px;margin-top: 4px;}
	    			}
	    	}
        .list-group{line-height: 39px;
        	li .iconfont{color:#939393;margin: 0 12px 0 34px; width: 18px; float: left;}
          li>a{font-size:14px;display: block;}
          li>a:hover{background: #145FD2;display:block;color: #fff;
          	.iconfont{color: #fff;}
          }
          .is-active{background: #145FD2;display:block;color: #fff;font-weight: 600;
          	.iconfont{color: #fff;font-weight:400;}
          }
        }
        .hr{height:1px;margin: 20px;background: #E1E1E1;}

	    }
	    .zlpg-home-cont-content{width: 1030px;}
	}
	.fade-in-active,
	.fade-out-active {
		transition: all 0.5s ease;
	}
	.fade-in-enter,
	.fade-out-active {
		width: 0;
	}
  /deep/ .messageDialog{overflow: hidden;
    .messageContent{
      border: 1px solid #ECECEC;
      padding: 10px;
    }
    .el-tabs__nav-scroll{
      .is-active{
        font-size: 13px;
        font-weight: 600;
        color: #145FD2;
      }
      .el-tabs__active-bar{
        width: 26px !important;
        background-color: #145FD2;
      }
      #tab-read{
        padding: 0;
      }
    }
    .el-scrollbar{
      width: 100%;height: 300px;
      .el-scrollbar__wrap{
        overflow-x: hidden;
        overflow-y: scroll;
        .messageList{
          .left{float: left}
          .right{float: right}
          .message{
            overflow: hidden;
            margin-top: 20px;
            .msgicon{
              margin-right: 20px;
              margin-top: 34px;
              text-align: center;
              img{
                width: 30px;
                display: block;
              }
              span{
                font-size: 13px;
              }
            }
            .msgCont{
              border: 1px solid #EDEDED;
              border-radius: 3px;
              padding: 2% 4%;
              width: 83%;
              background: rgba(249,249,249,1);
              .contTxt{
                height: 108px;
              }
              p{
                width: 400px;
                line-height: 36px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 13px;
                color: rgba(106,106,106,1);
                font-family: PingFangSC-Regular;
              }
              .title{
                font-size: 15px;
                color: rgba(49,49,51,1);
                font-family: PingFangSC-Medium;
              }
              .contBtn{
                margin-left: 70px;
                position: relative;
                a{
                  position: absolute;
                  top: 60px;
                  right: 0;
                  width: 44px;
                  height: 30px;
                  display: block;
                  font-size: 13px;
                  text-align: center;
                  line-height: 30px;
                  color: #ffffff;
                  background-color: #FDBD75;
                }
                a:first-child{
                  top: 20px;
                  right: 7px;
                  width: 30px;
                  border-radius: 50%;
                  background-color: #90CDFD;
                }
                a.read{
                  background-color: #dddddd;
                }
              }
            }
          }
        }
      }
    }
    .el-pagination{text-align: center;margin-top: 20px}
  }

}
.userName{
  position: relative;
  .xgpwdBox{
    .xgpwd{
      position: absolute;
      left:50%;
      top:90%;
      z-index:10;
      background:#fff;
      width:80px;
      text-align: center;
      box-shadow:0px 0px 4px 0px rgba(176,176,176,0.5);
      margin-left: -40px;
      font-size: 12px;
    }
  }

}
/deep/ .center-title{
  div{
    font-weight: 600;
  }
}
.amend{
	.el-form{
    width: 80%;
    margin-left: 8%;
}
.el-form-item{
  margin-bottom: 0;
}
/deep/ .el-form-item__label{
  padding-right:10px;
}
}

.table-btns{
        line-height: 25px;
        text-align: center;
        padding-top:20px;
        /deep/ .el-button{margin: 0;padding:0;width:70px;height:25px;}
        .btnColor{color:#3a8ee6; border-color:#3a8ee6;
            &.is-disabled{border-color: #ebeef5;color: #c0c4cc;}
        }
    }
</style>
