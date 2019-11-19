import Vue from 'vue'
import store from '@/store/index'

let util = {};
util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.findCompNameByRoute = function(route) {
    let _ = Vue.$_

    let findProp = _.pipe(
        _.find(o => {
          return o.path === route.path
        }),
        _.prop('components.default.name')
    )

    return findProp(route.matched)
};

util.handleTitle = function (vm, item) {
    return item.meta.title;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];

        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        // } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
        //     currentPathArr = [
        //         {
        //             title: '首页',
        //             path: '/home',
        //             name: 'home_index'
        //         },
        //         {
        //             title: currentPathObj.meta.title,
        //             path: '',
        //             name: name
        //         }
        //     ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.meta.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.meta.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }

    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
};

function makeKeyArray(keys) {
    const keysArray = []

    if (typeof keys == 'string') {
        keys = keys.split(',')
    }

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        keysArray.push(key)
    }

    return keysArray
}

util.hasSomeAccess = function(keys, client) {
    if (!keys) {
        return false
    }

    const keysArray = makeKeyArray(keys)
    const accessSet = store.getters.accessSet(client)
    
    for (let i = 0; i < keysArray.length; i++) {
        let key = keysArray[i]
        if (accessSet.has(key)) {
            return true
        }
    }

    return false
}

util.calcApiAccess = function(keys, client) {
    const keysArray = makeKeyArray(keys)
    const accessSet = store.getters.accessSet(client)
    
    const arr = []

    for (let i = 0; i < keysArray.length; i++) {
        let key = keysArray[i]
        if (accessSet.has(key)) {
            arr.push(key)
        }
    }

    return arr
}

util.disposeTime = function(date, fmt) {
/**
 * 时间转化
 *date时间戳
 * fmt转化格式
 */
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
};

//验证身份证号是否合法
util.checkCardId = function(sId) {
	let aCity = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	};
	var taiwaiPatt = /^[A-KM-QT-XZ]{1}[0-9]{9}$/;
	var HKPatt = /^[A-Z][0-9]{5,8}[0-9A]$/;
	var aomenPatt = /^[157][0-9]{6}[0-9]$/;
	if(taiwaiPatt.test(sId) || HKPatt.test(sId) || aomenPatt.test(sId)) {
		return true;
	} else if(!taiwaiPatt.test(sId) && !HKPatt.test(sId) && !aomenPatt.test(sId)) {
		let iSum = 0;
		if(!/^\d{17}(\d|x)$/i.test(sId)) return false;
		sId = sId.replace(/X$/, "a");
		if(aCity[parseInt(sId.substr(0, 2))] == null) return false; // "你的身份证地区非法";
		let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false; //"身份证上的出生日期非法";
		for(let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
		if(iSum % 11 != 1) return false; //"你输入的身份证号非法";
		return true; //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
	} else {
		return false;
	}
}

util.baseHeight=function(dom,nub){
  let n=dom.getBoundingClientRect().y;
  return (document.documentElement.clientHeight || document.body.clientHeight)-(n+nub)
};
export default util;
