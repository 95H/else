<template>
  <div class="centerBody">
    <div class="projectTop">
      <div class="projectName fl">人寿保险集团公司收购诚江保险项目</div>
      <div class="project-nature fr">
        <span>涉军</span>
        <span>A级</span>
        <span>整体</span>
        <span>非上市</span>
      </div>
    </div>
    <div class="projectMsg clear">
      <ul class="projectMsgLeft fl">
        <li>
          <i class="circular"></i>委托方：
          <span>一汽集团有限公司上海分公司上海分公司</span>
        </li>
        <li>
          <i class="circular"></i>第一签字评估师：
          <span>李明远</span>
        </li>
        <li>
          <i class="circular"></i>核数状态：
          <span>已核数</span>
        </li>
      </ul>
      <ul class="projectMsgRight fl">
		  <li>
          项目负责人：
          <span>一汽集团有限公司上海分公司上海分公司</span>
        </li>
        <li>
         第二签字评估师：
          <span>李明远</span>
        </li>
        <li>
          盖章状态：
          <span>未盖章</span>
        </li>
	  </ul>
    </div>
	<div class="company clear">
		<div class="companyList fl" :height="divTop">
			<el-tree :data="data" :props="companyList" @node-click="handleNodeClick"></el-tree>
		</div>
		<div class="companyMsg fl">
			<div class="companyMsgHead clear">
				<div class="companySection fl">
					<i class="circular"></i>国电南瑞有限公司<span class="status">已签发</span>
				</div>
				<div class="sealNumber fr">
					<i class="iconfont icon-seal"></i>
					盖章份数：{{112}}
				</div>
			</div>
			<ul class="companyMsgItems">
				<li><i>立项号</i><span>xxxxxxxxxxxxxxxxxxxxxxx</span></li>
				<li><i>报告号</i><span>xxxxxxxxxxxxxxxxxxxxxxx</span></li>
				<li><i>初审人</i><span>韩浩凯</span></li>
				<li><i>初审时间</i><span>2019-03.01 12:34:12</span></li>
				<li><i>复审人</i><span>韩浩凯</span></li>
				<li><i>复审时间</i><span>2019-03.01 12:34:12</span></li>
				<li><i>签发人</i><span>韩浩凯</span></li>
				<li><i>签发时间</i><span>2019-03.01 12:34:12</span></li>
				<li><i>核数人</i><span>韩浩凯</span></li>
				<li><i>签发时间</i><span>2019-03.01 12:34:12</span></li>
				<li><i>盖章人</i><span>韩浩凯</span></li>
				<li><i>签发时间</i><span>2019-03.01 12:34:12</span></li>
			</ul>
			<div class="line">
				<img src="@/assets/common/envelopeLine.png">
			</div>
			<div class="accessory clear">
				<div class="reportAccessory fl">
					<p class="title fl">
					报告附件
					</p>
					<ul>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href="" class="btn">全部下载</a>
					</ul>
				</div>
				<div class="previewAccessory fl">
					<p class="title fl">
					预览附件
					</p>
					<ul>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
						<a href=""><i class="iconfont icon-fujianwendang"></i>一汽集团矿产项目XXXX公司评估1111</a>
					</ul>
				</div>
			</div>
			<div class="operateRecord">
				<p class="title">操作记录</p>
				<div class="tableContainer">
					<table-tree :columns="columns" :tree-structure="true"></table-tree>
				</div>
			</div>
			<div class="footBtn">
				<a href="" class="">核数通过</a>
				<a href="" class="">核数拒绝</a>
			</div>
		</div>
		
	</div>
	
  </div>
</template>
<script>
import tableTree from '@/components/tableTree.vue';
export default {
	name:"reportCheckNumberInfo",
			components:{
			tableTree
			},
	data(){
		return{
			divTop:"",
			columns: [{
						text: '操作状态',
						dataIndex: 'name',
						type: 'text',
					},
					{
						text: '操作人',
						dataIndex: 'sealOwnerNames',
						type: 'text',
					},
					{
						text: '操作时间',
						dataIndex: 'createTime',
						type: 'text',
					}
				],
			data:[{
				label:"国电南瑞有限公司",
				children:[{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},{
					label:"国电南瑞有限公司"
				},]
			}],
			companyList:{
					label:"label",
					children:"children"
				}
		}
	},
	methods:{
		handleNodeClick(data) {
        console.log(data);
      }
	}
};
</script>
<style scoped lang="scss">
.centerBody {
  padding: 20px;
   .title{
				 display:inline-block;
				font-size:12px;
				font-weight:400;
				color:rgba(106,106,106,1);
				width:56px;
		 }
  .projectTop {
    line-height: 40px;
    height: 40px;
    background: rgba(246, 250, 255, 1);
    border-radius: 2px 2px 0px 0px;
    border: 1px solid rgba(229, 229, 229, 1);
    .projectName {
      padding-left: 20px;
      font-weight: 500;
    }
    .project-nature {
      padding-right: 10px;
      span {
        height: 24px;
        padding: 0 10px;
        line-height: 24px;
        text-align: center;
        color: #98c268;
        background: #f1f8e8;
        border: 1px solid #c8deaf;
        border-radius: 2px;
        float: left;
        margin: 7px 5px;
        font-size: 12px;
      }
      :nth-child(2) {
        color: #f09237;
        background: #fff2e5;
        border: 1px solid #ffc68f;
      }
      :nth-child(3) {
        color: #7c9fee;
        background: #e9f0ff;
        border: 1px solid #bbd0ff;
      }
      :nth-child(4) {
        color: #50adee;
        background: #e6f5ff;
        border: 1px solid #9bd6ff;
      }
    }
  }
  .projectMsg {
	.projectMsgRight{
		&::before{
		  content:"";
		  display:inline-block;
		  width:2px;
		  height:86px;
		  background:#ECECEC;
		  float:left;
		  margin-top:15px;
		  margin-right:134px;
		  margin-left:84px;
	  }
	}
    padding: 33px 0 35px 71px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 0px 2px 2px;
    border: 1px solid rgba(229, 229, 229, 1);
	border-top: none;
      li {
		line-height: 36px;
		height:36px;
        font-size: 13px;
		color: #636363;
		width:300px;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
        .circular {
          width: 6px;
          height: 6px;
          float: left;
		  margin: 15px;
		  margin-right:10px;
          background: #f09237;
          border-radius: 100%;
		}
		span{
			color:#262628;
			
		}
      }
      li:nth-child(2) .circular {
        background: #57bfb2;
      }
      li:nth-child(3) .circular {
        background: #7c9fee;
      }
    
  }
  .company{
	  padding:11px 10px 14px;
	  margin-top:25px;
	  background:rgba(255,255,255,1);
	  border-radius:0px 0px 2px 2px;
	  border:1px solid rgba(229,229,229,1);
	  height:100%;
	  .companyList{
		height:703px;
		width:250px;
		border-radius:2px;
		padding-top:22px;
		border:1px solid rgba(236,236,236,1);
		margin-right:4px;
	  }
	  .companyMsg{
		  height:100%;
		  width:710px;
		  padding:25px 0 20px;
		  box-shadow:0px 3px 5px 0px rgba(189,189,189,0.5);
		  border:1px solid rgba(229,229,229,1);
		  .companyMsgHead{
			  padding-bottom:11px;
			  border-bottom:2px dashed #ECECEC;
			  	.companySection{
				  margin-left:40px;
				  font-size:14px;
				  .status{
						font-size:12px;
						color:#11BF6B;
						padding:0 4px 0 7px;
						line-height:18px;
						background:rgba(255,255,255,1);
						border-radius:3px;
						border:1px solid rgba(17,191,107,1);
						margin-left:9px;
				  }
				  .circular{
					   width: 6px;
						height: 6px;
						float: left;
						margin-top:5px;
						margin-right:10px;
						background: #f09237;
						border-radius: 100%;
				  }
			  }
			.sealNumber{
				margin-right:40px;	
				font-size:13px;
				.icon-seal{
					color:#E47474;
					font-size:14px;
					margin-right:2px;
				}
			}
		  }
		  .companyMsgItems{
			  padding:30px 40px;
			  display:flex;
			  flex-wrap: wrap;
			  li:nth-child(odd){
				  margin-right:66px;
			  }
			   li{
				   font-size:12px;
				   margin-bottom:15px;
				  i{
					display:inline-block;
					font-weight:400;
					color:rgba(106,106,106,1);
					width:67px;
				  }
				   
				  span{
					  color:rgba(38,38,40,1);
					  line-height:26px;
					  display:inline-block;
					  width:182px;
					  margin-left:31px;
					  border-bottom:1px solid #E1E1E1
				  }
			  }
			
		  }
		  .line{
			  width:100%;
			  font-size:0;
			  img{
				  width:100%;
				  height:100%;
			  }
		  }
		  .accessory{
			 padding:20px 40px 0;
			 font-size:12px;
			 .reportAccessory{
				 ul{
					 position:relative;
					 .btn{
						 position: absolute;
						 bottom:21px;
						 right:0;
						 width:68px;
						height:20px;
						background:rgba(255,255,255,1);
						border-radius:2px;
						border:1px solid rgba(58,128,236,1);
						font-size:12px;
						line-height:20px;
						color:rgba(58,128,236,1);
						text-align:center;
					 }
				 }
			 }
			 ul{
				 margin-left:19px;
				 display:flex;
				 flex-wrap: wrap;
				 padding-bottom:20px;
				 border-bottom:1px dashed #ECECEC;
				 margin-bottom:20px;
				 position:relative;
				 &::before{
						content:"";
						width:1px;
						height:70%;
						position:absolute;
						left:40%;
						top:0;
						background:#E2E2E2;
						display:block;
					}
				 a{
					 overflow:hidden;
					 text-overflow:ellipsis;
					 white-space:nowrap;
					 width:200px;
					 color:#3A80EC;
					 margin-bottom:8px;
				 }
				  a:nth-child(odd){
				  margin-right:63px;
			  	}
			 }
		  }
		  .operateRecord{
			  padding:0 40px;
			  .title{
				  margin-bottom:10px;
			  }
		  }
		  .footBtn{
			  display:flex;
			  font-size:14px;
			  justify-content: center;
			  margin-top:20px;
			  a{
				margin:0 33px;
				cursor: pointer;
				width: 100px;
				height: 28px;
				line-height:25px;
				background: #98C268;
				border-radius: 2px;
				line-height: 25px;
				font-size: 13px;
				color: white;
				text-align:center;
			  }
			  a:nth-child(2){
				  background:rgba(225, 6, 1, 1)
			  }
		  }
	  }
  }
}
</style>

