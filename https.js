import Vue from 'vue';
import axios from 'axios';
import Router from './admin/src/router';

//是axios请求的配置
const axiosInstance = axios.create({
	baseURL:'http://solar.qingzhoudata.com/api',
	headers:{
		// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    	//上面的一般是post请求的头部内容
    	'Content-Type': 'application/json',
    	//上面的这个请求头部是get请求头部配置内容
	},
	withCredentials:true,
	//是否跨域的处理，true是允许跨域请求，false是不允许跨域请求，默认的是false
	timeout:5000
	//请求的过期时间
});
//此处是后台响应的配置
axiosInstance.interceptors.response.use(
	response => {
		switch(response.data.code){
			case 1:
			 const date = JSON.parse(response.data.data);
			 //将数据转化为json数据，JSON.stringify()是将数据转化为字符串
			case 2:
				if(response.data.code ===2){
					alert('肖老头');
				}
			//
			break;//打断当前程序的停留
		}
		return response;
	},
	error => {
		if(response.data.errorCode === 0){
			console.log(error)
		}
		return Promise.reject(error);
	}
);
export default axiosInstance;