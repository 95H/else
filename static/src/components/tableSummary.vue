<template>
	<div class="tableSummary">
		<div class="tableSummary-wrap">
			<div class="wrap-table-head" ref="tableHead">
				<table>
					<thead>
						<tr v-for="(tableH,tableHInd) in tableHeader" :key="tableHInd">
							<th v-for="(tableHVal,key) in tableH" :key="key" :align="tableHVal.align?tableHVal.align:'center'" :rowspan="tableHVal.rowspan?tableHVal.rowspan:1" :colspan="tableHVal.colspan?tableHVal.colspan:1">
								<div class="cell" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">{{tableHVal.label}}</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: [],
		data () {
			return {
				tableHeader:[{
					name:{label:"资产",minWidth:200,align:"center"},
					name1:{label:"序号",minWidth:60,align:"center"},
					name2:{label:"期初数",minWidth:100,align:"center"},
					name3:{label:"期末数",minWidth:100,align:"center"},
					name4:{label:"备注",minWidth:200,align:"center"},
					name5:{label:"负债及所有者权益",minWidth:200,align:"center"},
					name6:{label:"序号",minWidth:60,align:"center"},
					name7:{label:"期初数",minWidth:100,align:"center"},
					name8:{label:"期末数",minWidth:100,align:"center"},
					name9:{label:"备注",minWidth:200,align:"center"},
				}]
			};  
		}
	}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
	.tableSummary {
		.tableSummary-wrap {
			padding: 20px;
			height: 100%;
			.left {	/deep/ .el-input { .el-input__inner {text-align: left;} } }
			.center { /deep/ .el-input { .el-input__inner {text-align: center;} } }
			.right { /deep/ .el-input { .el-input__inner {text-align: right;} } }
			table {
				table-layout: fixed;
				tr {
					td,th {
						font-size: 13px;
						border: 1px solid #D7D7D7;
						.cell {
							display: -webkit-box;
							-webkit-box-orient: horizontal;
							-webkit-box-pack: center;
							-webkit-box-align: center;
						}
					}
				}
				thead {
					tr {
						height: 25px;
						th {
							.cell {
								height: 25px;
							}
						}
					}
				}
				tbody {
					tr {
						td {
							.cell {
								font-size: 12px;
								/deep/ .el-input {
									.el-input__inner {
										border-radius: 0;
										border-color: rgba(255, 255, 255, 0);
										;
										height: 20px!important;
										padding: 0 5px!important;
										background: none;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>