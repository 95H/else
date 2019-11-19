/**
 * 
 * @author wusq
 */
const routeOption = (route, key, value) => {
  return route.matched.some(m => {
    if (process.browser) {
      // Browser
      return Object.values(m.components).some(
        component => component.options && component.options[key] === value
      )
    } else {
      // SSR
      return Object.values(m.components).some(component =>
        Object.values(component._Ctor).some(
          ctor => ctor.options && ctor.options[key] === value
        )
      )
    }
  })
}

// 暂时手动维护页面...
let authUrl = ['/live', '/myregisfee']
let noneAuthUrl = ['login']

export default function({ store, route, redirect }) {
  const loggedIn = store.state.userModule.user
  
  // let matchUrl = authUrl.some((fullPath) => {
  //   return route.fullPath.trim().startsWith(fullPath)
  // })

  if (!loggedIn) {
    redirect('/loginRegister/login', { 'backurl': route.fullPath })
  }
}