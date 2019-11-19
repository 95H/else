import { isMobile } from '~/common/utils/index'

export default function(context) {
  let userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent

  if (process.server && !isMobile(userAgent)) {
    let pcPath = ''
    
    switch(process.env.PATH_TYPE) {
      case 'local':
        pcPath = 'http://online-dev.boxuegu.com'
        break
      case 'test':
        pcPath = 'http://online-test.boxuegu.com'
        break
      case 'ysc':
        pcPath = 'http://portal-ysc.boxuegu.com'
        break
      case 'prod':
        pcPath = 'http://www.boxuegu.com'
        break
    }

    let routPath = context.route.path
    
    if (routPath.indexOf('/live/') !== -1) {
      context.redirect(pcPath + '/web/html/construe.html?id=' + context.route.params.id)
    } else {
      context.redirect(pcPath)
    }
  }  
}

