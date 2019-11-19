<template>
    <div class="zlpg-home">
    	<div class="zlpg-home-header">
        	<ul class="list-group">
                <!--使用指令v-link进行导航-->
                <li><router-link to="homeAll">全部项目</router-link></li>
                <li><router-link to="myHome">我负责的</router-link></li>
               	<li><router-link to="contact">我参与的</router-link></li>
               	<li><router-link to="contact">我审核的</router-link></li>
               	<li><router-link to="contact">按机构查看</router-link></li>
               	<li class="list-right" @click="showfun"><createproject v-if="showProject"></createproject>快速创建项目</li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
	import createproject from '../../components/createProject.vue';
	export default {
        data () {
            return {
               // menuJson:menuJson,
                showProject:false
            };
        },
        created(){
            var _this=this;
            /*this.$http.post('projects/setupFindPageList',{
            	page: 1,
				rows: 10,
				sheetStatus: 0,
				tabFlag: 'all',
				aaa: JSON.stringify({
	            	page: 1,
					rows: 10,
					sheetStatus: 0,
					tabFlag: 'all'
	           })
			}).then(response => {
                _this.menuJson = response;
            }, response => {
                console.log('数据加载失败')
            })*/
            
        },
        methods:{
        	showfun(){
        		this.showProject = true;
        	}
        },
        components:{
        	createproject
        }
    }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.zlpg-home{
	.zlpg-home-header{
	    width: 100%; height: 35px;
	    .list-group{line-height: 34px;border:1px solid #ECECEC;overflow:hidden;background: #fff;
			li{float: left;margin-left:30px;
				a{position: relative;}
				a.is-active{display:block;color: #145FD2;}
				a.is-active:after{content:"";left:0;position: absolute;bottom: 0px; width: 100%;height: 2px;background: #145FD2;}
			}
	    	.list-right{
	    		float: right;
	    		cursor: pointer;
	    		width:120px;
				height:27px;
				background:rgba(58,128,236,1);
				border-radius:2px;
				line-height: 27px;
				font-size:13px;
				color:rgba(255,255,255,1);
				text-align: right;
				padding: 0 5px;
				margin-top: 4px;
	    	}
	    }
	}
}
</style>