// 模板辅助方法
exports.withPartials = function(viewData) {
  return Object.assign({
    partials: {
      header: '../partials/header',
      footer: '../partials/footer'      
    }
  }, viewData)
}