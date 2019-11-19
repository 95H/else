  父传子：
  父级的数据传递到子级中，父级和子级是嵌套关系， 父级将数据以属性的方式传递到子级
  加：则传什么类型的数据子级就接收什么类型的数据，不加： 则以字符串的方式进行接收
  子传父：
  子级中的数据传递到父级中 子级中用$emit()发送
  $emit()是vue实例下面的方法
  connst vue = new Vue({})
  Vue.prototype.$emit = function(){

  }
  var p =vue ()
  p.emit()
  父级中绑定子级组件的发送监听函数事件 相当于click事件 绑定的事件函数是父级组件中的监听响应函数
  template模板中永远操作的是本地data中的数据
  eventBus 是中间转换器 思想来源于java
  $emit() 只负责发送数据，接收两个参数，分别是发送数据的监听函数
  第二个是需要发送的数据
  $on()只负责接收数据 只在同级组件中传递数据时才用到
  $off()当数据发送完成后 立即释放(销毁)当前接收数据的监听函数
  页面销毁前可以发送数据
		可以发送数据
		  beforeDestroy
		  destroyed
	页面挂载前可以接受数据
	    可以接受数据
		  beforeCreate、
		  created、
		  beforeMount
