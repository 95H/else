# y

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
#  目录结构
.mock 这个文件夹是放数据的
.src
   .api  这个是放所有请求的
   .components  这个放页面级组件
       home 首页
      list  列表页
      car 购物车
      my  我的
   .base 放公用组件
   .router  路由
   .assets  静态文件
   .vuex/store 放vuex 用的时候创建

   组件引入步骤：1.引入
                2.注册
                3.用标签形式使用
使用less
  npm install less less-loader
使用sass
  npm install node-sass sass-loader
路由激活样式
router-link-active
router-link-exact-active
通过slot插槽来解决头部显示问题
通过props传值控制返回箭头是否显示
v-show v-if
v-show 有没有都会渲染
display:none
ajax 请求使用axios
npm install axios -s
axios 是基于promise封装的

 export 会把当前模块的变量放在一个默认对象里导出
 * as T 把变量都放在一个有命名(例如T)对象里面 as后面是对象名字 *表示所有的
import * as T from '../api'
T.getBanner()

路由需要传参的 要有name
redirect 重定向
localhost:3000/list
 一页显示 5条
 localhost:3000/list?page=1
 1-5
 localhost:3000/list?page=2
 6-10

axios.get(`list?page=${page}`)

hasemore 是否有下一页
localhost:3000/list
 一页显示 5条

ref 获取原生dom 或者获取子组件的实例
js节流和防抖 _.debounce
            _.throttle
keep-alive 包裹动态组件 和transtion相似 内置组件
缓存的放在这里
<keep-alive>
   <router-view v-if="$route"
不缓存的放在这里

路由传参：
       1.params
         http://localhost:8080/#/detail/4
       2.query
         http://localhost:8080/#/detail?id=4
vuex
vuex使用
把vuex当做一个全局组件
state 相当于组件的data 通过$store.data.value(value：是要取的值) 拿到
actions mutations 相当于组件的methods
actions 是异步的 例如ajax
mutations 是同步的
actions 通过$store.dispatch 触发
mutations 通过$store.commit 触发
1.同步流程的写法：
  组件commit --> mutations --> 操作state
  组件(或者全局)触发commit() -> [写法：this.$store.commit('事件名',参数[可选项])] -> [mutations ->mutations里面写 和commit事件名同名的函数 参数state(必有的)和传的值(可选)] ->事件里面处理state
2.异步的流程
  组件dispatch -->actions commit -->mutations -->操作state
  组件触发dispatch() -> [写法：this.$store.dispatch('事件名'),参数[可选项]] -> actions 写一个同dispatch事件名相同的函数，参数是 {commit} 和传的值 --> 通过commit提交给mutations[写法：commit('事件名 一般会和actions的方法同名')] -->mutations写事件处理操作state

vue组件
       1.通过dispatch 提交到actions
       2.actions通过commit触发mutations
       3.mutation 负责修改state 所有组件就可以拿到state 进行渲染了
       4.actions 是异步的 用store.dispatch
       5.mutitions 是同步的 如果是同步的话直接用store.commit提交到mutations
       6.只有mutations能够修改state的状态
       7.getters 是vuex的计算属性 计算state相关的值 相当于组件的computed

dispatch和commit的传参问题
一个参数的时候可以直接传递 多个参数的时候需要用对象传递
1、this.$store.commit('addcount',{a:10,b:20})
2、this.$store.commit({type:'addcount'a:10,b:20})
type：为要提交的mutations函数

mapState,mapGetters,mapMutation,mapActions
辅助工具类
所有通过辅助函数拿到的 无论值还是方法 都会挂载在实例(this)上面
actions 需要注意的点
需要把commit通过结构赋值得到
通过commit提交到mutations的同名函数

*** 辅助函数运用时候的特点 ***
值 mapState mapGetters 放在computed 里面
函数 mapActions mapMutions 放在methods里面

<-moudle的注意事项->
有命名空间的 mapState 的时候 可以传递模块名
没有命名空间的不能传递模块名

没有命名空间的 actions 和 mutations 会注册在全局上 有命名空间的在自己的模块上
定义在开发环境(development)使用严格模式
在生产环境(production)中不使用严格模式

vuex书写的逻辑流程
1.先定义事件(mutations-type.js)
2.触发事件


localStorage 长期存在
sessionStorage 关闭会话就会清除
他们的方法：
1.setItem(key,value)设置
2getItem(key) 获取
3.removeItem(key) 移除单项
4.clear(key,value) 清空所有

组件的computed和vuex个getters 每一个值必须加return才能返回


webpack 有2个核心模块 loader和plugin
# build for production and view the bundle analyzer report
npm run build --report
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
