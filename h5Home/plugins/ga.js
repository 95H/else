/**
 * Created by admin on 2017/12/4.
 */
export default ({ app: { router }, store }) => {
  
  /* 每次路由变更时进行pv统计 */
  router.afterEach((to, from) => {
    /* 告诉增加一个PV */
    try {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d45632d7a3586ff682f4ce4683da70dc";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    } catch (e) {}
  })

}
