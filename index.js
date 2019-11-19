import  model from './model.vue';
const message ={//此对象上面应该有一个install的方法 

}
message.install = function(Vue,option={delay:3000}){
   Vue.prototype.$message=function(msg,opt={}){
     if(message.el)return //如果已经存在 就不在走了 
      opt = {...option,...opt}
      //用传的参数覆盖默认参数 
      let V = Vue.extend(model);
      console.log(V)
      //会构建一个基于model的实例 
      let vm = new V;
      console.log(vm)
      let  el = document.createElement('div');
      //将实例挂载在dom元素上面
      vm.$mount(el);
     document.body.appendChild(vm.$el);
     message.el = vm.$el;
      vm.msg = msg;
      setTimeout(() => {
        document.body.removeChild(vm.$el); 
        message.el =null; //移除的同时清除 message.el 
      }, opt.delay);
  }
}


//导出此插件 
export default message