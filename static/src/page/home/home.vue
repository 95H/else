<template>
	<div class="zlpg-content zlpg-home">
		<div class="zlpg-content-header">
			<ul class="list-group">
				<li v-for="(item,index) in headStatus" v-if="item.jump != '/home/4'" :key="index+'0'" @click="changeTab(item.jump.split('/')[2])" :class="{selected:item.jump.split('/')[2] == active}">{{ item.title }}</li>
				<li v-for="(item,index) in headStatus" v-if="item.jump == '/home/4'" :key="index+'1'" class="pv">
					<span @click="selectMechanism">按机构查看</span>
					<div v-show="mechanism" class="mask"></div>
					<div v-show="mechanism" class="pa mechanism">
						<div>
							<el-input placeholder="请输入机构关键字" v-model="filterText">
							</el-input>
							<el-scrollbar class="el-scrollbar">
								<el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="selectedMechanism" ref="mechanismTree">
								</el-tree>
							</el-scrollbar>
						</div>
						<div class="mechanism-btn-group">
							<span class="mechanism-btn search-btn" @click.stop="sureMechanism">确定</span>
							<span class="mechanism-btn mechanism-cancle-btn reset-btn" @click.stop="mechanism=!mechanism">取消</span>
						</div>
					</div>
				</li>
				<div class="fr">
					<label class="fs13">统计年限：</label>
					<el-select v-model="year" placeholder="请选择" @change="changeYear" class="marginRight10 width80">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<a class="list-right el-button--primary marginLeft10 marginRight10" @click="show" v-if="showPower"><img src="../../assets/common/create.png" />快速创建项目</a>
				</div>

			</ul>
		</div>
		<home-content ref="homeContent"></home-content>
	</div>
</template>

<script>
	import homeContent from './homeAll';
	export default {
		data() {
			return {
				headStatus: [],
				options: [],
				year: '',
				groupId: '',
				active: 0,
				mechanism: false,
				showPower: true,
				filterText: '',
				treeData: [],
				isExternalPower: '',
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				routerLink: []
			};
		},
		created() {
			if(JSON.parse(this.$getCookie("user"))) {
				this.isExternalPower = JSON.parse(this.$getCookie("user")).isExternal;
				if(this.isExternalPower == true) {
					this.showPower = false;
				}
			}

		},
		mounted() {
			let thisYear = new Date().getFullYear() * 1
			for(let i = 2018; i <=
				thisYear; i++) {
				this.options.push({
					value: i,
					label: i
				})
			}
			/*this.headStatus=[ {urlPrifex: "", name: "0", icon: "", title: "全部项目", jump: "/home/0"}, //{urlPrifex: "", name: "1", icon: "", title: "我负责的", jump: "/home/1"}, {urlPrifex: "", name: "2", icon: "", title: "我参与的", jump: "/home/2"}, {urlPrifex: "", name: "3", icon: "", title: "我审核的", jump: "/home/3"}, ]*/
			this.$store.state.queryUserSysFunction.forEach((val, key) => {
				if(val.title == "主页") {
					this.headStatus = val.list;
					if(this.headStatus.length) {
						let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
						if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
							this.active = searchCondition.type;
						}else{
							this.active = this.headStatus[0].jump.split('/')[2];
						}
						this.changeTab(this.active,true);
					}
				}
			})
		},
		methods: {
			changeTab(index,flag) {
				this.$store.state.rememberSearchCondition = flag ? true : false;
				this.year = this.$store.state.year;
				this.active = index;
				this.$refs.homeContent.init(index,flag);
			},
			selectMechanism() {
				let _this = this;
				this.filterText = '';
				this.$http.post('/api/sysgroup/sysGroupTreeByRole', {}).then(response => {
					this.treeData = response.data;
				}).catch(error => {
					_this.$messageError(error);
				});
				this.mechanism = true;
			},
			selectedMechanism(data) {
				this.groupId = data.id;
			},
			sureMechanism() {
				this.$store.state.groupId = this.groupId;
				this.$setCookie('groupId', this.groupId, 24 * 60 * 60);
				this.changeTab(this.active);
				this.mechanism = false;
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			show() {
				let _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '创建项目';
				this.$store.state.commonBtn = '创建';
				this.$store.state.componentsType = 'createproject';
				this.$store.state.refresh = function() {
					_this.changeTab(_this.active);
				};
			},
			changeYear() {
				this.$store.state.year = this.year;
				this.$setCookie('year', this.year, 24 * 60 * 60);
				this.$refs.homeContent.init('');
			}
		},
		components: {
			homeContent
		},
		watch: {
			filterText(val) {
				this.$refs.mechanismTree[0].filter(val);
				//this.$refs.mechanismTree.filter(val);
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
	.zlpg-content .zlpg-content-header .list-group li:hover {
		color: #145FD2;
	}

	.zlpg-content .zlpg-content-header .list-right {
		margin-right: 10px;
	}

	.mechanism {
		width: 400px;
		height: 335px;
		box-shadow: 0px 2px 7px 0px rgba(203, 202, 202, 0.5);
		z-index: 1111;
		background: #fff;
		top: 35px;
		left: 0;
		.el-input /deep/ {
			height: 35px;
			background: #F6FAFF;
			.el-input__inner {
				width: 200px;
				margin: 5px 10px;
			}
		}
		.el-scrollbar /deep/ {
			margin: 10px;
			height: 250px;
			border: 1px solid #E5E5E5;
			margin-bottom: 0;
			.el-scrollbar__wrap {
				height: calc(250px + 17px);
			}
			.filter-tree {
				padding: 10px;
			}
			.is-current * {
				background: none;
			}
			.is-current>.el-tree-node__content{
				background: #EDF5FF;
				.el-tree-node__label {
					color: #145FD2;
					border-radius: 2px;
					line-height: 16px;
					padding: 2px;
				}
			}
		}
		.mechanism-btn-group {
			text-align: center;
			.mechanism-btn {
				width: 70px;
				height: 25px;
				line-height: 23px;
				display: inline-block;
				color: #fff;
				background: #3A80EC;
				text-align: center;
				border-radius: 2px;
				margin: 5px;
			}
			.mechanism-cancle-btn {
				background: none;
				border: 1px solid #3A80EC;
				color: #606266;
			}
		}
	}

	.el-select-dropdown__item {
		font-size: 12px;
	}

	.el-select-dropdown__item,
	.selected {
		color: #145FD2;
	}
</style>
