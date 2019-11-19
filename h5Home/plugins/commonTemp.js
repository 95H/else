/**
 * Created by admin on 2018/4/20.
 */
import Vue from 'vue'
//无数据组件
import emptyTemp from '../components/empty/emptyTemp'
//头部组件
import headBar from '../components/headBar/headBar'
import Logo from '../components/logo/Logo'
import titleTemp from '../components/titleTemp1/titleTemp'
import titleBack from '../components/titleTemp2/titleBack'
//底部组件
import  footerBar  from '../components/footerBar/footerBar'
//就业课程组件
import jobCourseTemp from '../components/cousrseTemp/jobCourseTemp'
//微课组件
import microCourseTemp from '../components/cousrseTemp/microCourseTemp'
//公开课组件
import publicCourseTemp from '../components/publicCourseTemp/publicCourseTemp'
//视频页 弹框
import videoDialogTemp from '../components/videoTemp/videoDialog'
Vue.component('emptyTemp',emptyTemp);
Vue.component('headBar',headBar);
Vue.component('Logo',Logo);
Vue.component('titleTemp',titleTemp);
Vue.component('titleBack',titleBack);
Vue.component('footerBar',footerBar);
Vue.component('jobCourseTemp',jobCourseTemp);
Vue.component('microCourseTemp',microCourseTemp);
Vue.component('publicCourseTemp',publicCourseTemp);
Vue.component('videoDialogTemp',videoDialogTemp);
