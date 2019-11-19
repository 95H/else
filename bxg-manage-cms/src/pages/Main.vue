<template>
  <div class="main">
  <Sider ref="side" hide-trigger class="sidebar-menu-con" collapsible :collapsed-width="0" v-model="isCollapsed" @on-collapse="onCollapse">
      <!-- 收起menu菜单的触发icon -->
      <Icon type="ios-menu" :class="rotateIcon" class="pack-up-icon" @click.native="collapsedSider"/>
      <div slot="top" class="logo-con">
        <img src="../assets/logo.png" key="max-logo">
      </div>
      <Menu ref="sideMenu" :class="menuitemClasses" :active-name="$route.name" :open-names="openedSubmenuArr" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
          <!-- <MenuItem v-if="item.type=='menu'" :name="item.children[0].name" :key="item.path">
            <Icon :type="item.icon" :size="20" :key="item.icon"></Icon>
            <span class="layout-text" :key="item.name">{{ item.children[0].meta.title }}</span>
          </MenuItem> -->
          <Submenu v-if="hasSomeAccess(item.meta.accessIdentity, item.meta.accessClient)" :name="item.name" :key="item.path">
            <template slot="title">
              <Icon :type="item.icon" :size="20"></Icon>
              <span class="layout-text">{{ item.meta.title }}</span>
            </template>
            <template v-for="child in item.children">
              <!-- <template v-if="child.qx">
                <template v-for="item in child.qx">
                  <MenuItem
                    v-if="userInfo.mail===item.mail"
                    :name="child.name"
                    :key="child.name"
                    style="padding-left: 28px;"
                  >
                    <Icon :type="child.icon" :size="14" :key="child.icon"></Icon>
                    <span class="layout-text" :key="child.path">{{child.meta.title}}</span>
                  </MenuItem>
                </template>
              </template> -->
              <MenuItem v-if="hasSomeAccess(child.meta.accessIdentity, child.meta.accessClient)" :name="child.name" :key="child.name" style="padding-left: 28px;">
                <Icon :type="child.icon" :size="14" :key="child.icon"></Icon>
                <span class="layout-text" :key="child.path">{{child.meta.title}}</span>
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </Menu>
  </Sider>
    <div class="main-header-con">
      <div class="main-header">
        <div class="navicon-con">
          <Icon :size="26" type="md-home"/>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <Breadcrumb>
              <BreadcrumbItem
                v-for="item in currentPath"
                :to="item.path"
                :key="item.name"
              >{{ item.title }}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
        <div class="header-avator-con">
          <!-- <div @click="showMessage" class="message-con">
                      <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
                          <Badge :count="value" dot>
                              <Icon type="md-notifications" :size="22"/>
                          </Badge>
                      </Tooltip>
          </div>-->
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userInfo.name }}</span>
                  <Icon type="md-arrow-dropdown"/>
                </a>
                <DropdownMenu slot="list">
                  <!--   <DropdownItem name="ownSpace">个人中心</DropdownItem> -->
                  <DropdownItem name="loginout">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
  <div class="single-page-con">
    <div class="single-page">
      <keep-alive :include="cachePage">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</div>
</template>

<script>
import tagsPageOpened from '@/components/tags-page-opened/tags-page-opened.vue'
import util from '@/util/util'
import { collectionToPayWater, infoReg } from '@/util/jurisdiction'
export default {
  data() {
    return {
      avatorPath: 'https://www.boxuegu.com/web/images/newLogo.png',
      value: 10,
      menuTheme: "dark",
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      isCollapsed: false
    };
  },
  components: {
    tagsPageOpened
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");

    this.handleCachePage(this.$route)
  },
  mounted() {
    this.init()
  },
  methods: {
    collapsedSider () {
      this.$refs.side.toggleCollapse();
    },
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name)
      this.$store.commit('updateMenulist')
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      let messageCount = 3
      this.messageCount = messageCount.toString()
      this.checkTag(this.$route.name)
      this.$store.commit('setMessageCount', 3)
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true
        }
      })
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        )
      }
    },
    handleClickUserDropdown(name) {
      if (name === 'loginout') {
        //退出
        localStorage.removeItem('userInfo')
        this.$store.state.keycloak.keycloak.logout()
      }
    },
    showMessage() {
      //消息
      /* this.$router.push({
        name: "message_index"
      }); */
    },

    handleCachePage(route) {
      if (route.meta.keepAlive != null) {
        let routeCompName = util.findCompNameByRoute(route)

        if (route.meta.keepAlive === true) {
          this.$store.commit('addCachePage', routeCompName)
        } else if (route.meta.keepAlive === false) {
          this.$store.commit('removeCachePage', routeCompName)

          this.$nextTick(() => {
            this.$store.commit('addCachePage', routeCompName)
          })
        }
      }
    },

    changeMenu(active) {
      this.$router.push({
        name: active
      });
    },

    onCollapse(isCollapsed) {
      const mainHeaderElem = document.querySelector('.main-header-con')
      const pageElem = document.querySelector('.single-page-con')

      if (isCollapsed) {
        mainHeaderElem.classList.add('main-header-con--collapsed')
        pageElem.classList.add('single-page-con--collapsed')
      } else {
        mainHeaderElem.classList.remove('main-header-con--collapsed')
        pageElem.classList.remove('single-page-con--collapsed')        
      }
    }
  },
  computed: {
    currentPath() {
      return this.$store.state.app.currentPath // 当前面包屑数组
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    },
    /**
     * 权限将来要改
     */
    menuList() { 
      let menuList = [...this.$store.state.app.menuList]
      // let email = this.userInfo.mail
      // let flag = true
      
      // 资讯人员特殊处理
      // if (infoReg.test(email)) {
      //   // if (!localStorage.getItem('info-person')) {
      //   //   this.isInfoPersonFirstIn = true
      //   //   localStorage.setItem('info-person', '1')
      //   //   this.$store.commit("clearAllTags")
      //   // }
      //   // tab
      //   return menuList.filter((m) => {
      //     return m.name == 'info-manage'
      //   })
      // }
      
      // localStorage.removeItem('info-person')

      // collectionToPayWater.forEach(item => {
      //   if (item.mail === email) {
      //     flag = true
      //   }
      // })
      // if (flag) {
      //  return menuList //导航数据
      // } else {
      //   return menuList.slice(0, menuList.length - 1)
      // }
      return menuList
    },
    cachePage() {
      return this.$store.state.app.cachePage
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || {name:'111'}; //获取用户信息
    },

    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    rotateIcon () {
      return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
  },
  updated() {
    this.$nextTick(() => {
      //刷新定位导航
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateActiveName()
        this.$refs.sideMenu.updateOpened()
      }
    })
  },
  watch: {
    $route(to) {
      this.$store.commit('setCurrentPageName', to.name)
      let pathArr = util.setCurrentPath(this, to.name)
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      
      this.handleCachePage(to)
    }
  }
}
</script>

<style lang="less">
.main /deep/ .main-header .navicon-con{
  margin: 15px 0 0 52px;
}
.main /deep/ .main-header .header-middle-con{
  left: 60px;
}
.pack-up-icon,.rotate-icon{
  color: #fff;
  font-size: 18px;
  background: #001428;
  cursor: pointer;
  text-align: center;
  position: absolute;
  height: 32px;
  width: 42px;
  border-radius: 6px 6px 0 0;
  line-height: 32px;
  top: 20px;
  right: -36px;
  transform: rotate(90deg)
}
.rotate-icon{
  height: 42px;
  width: 32px;
  border-radius: 0 6px 6px 0;
  line-height: 42px;
  top: 15px;
  right: -32px;
  transform: rotate(0)
}
.lock-screen-back {
  border-radius: 50%;
  z-index: -1;
  box-shadow: 0 0 0 0 #667aa6 inset;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 3s;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  .unlock-con {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 11000;
  }

  .sidebar-menu-con {
    height: 100%;
    padding-bottom: 48px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
    transition: all .2s ease-in-out;
    width: 200px;
    background: #001528;

    .ivu-layout-sider-zero-width-trigger {
      top: 10px;
      width: 32px;
      right: -32px;
    }

    .ivu-layout-sider-children {
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    // .collapsed-menu ~ .side__btn--close {
    //   display: none;
    // }

    // .collapsed-menu ~ .side__btn--open {
    //   display: block;
    // }

    // .side__btn--close {
    //   position: absolute;
    //   top: 50%;
    //   left: 180px;
    //   display: block;
    // }

    // .side__btn--open {
    //   position: absolute;
    //   top: 50%;
    //   left: 0;
    //   display: none;
    //   color: #fff;
    // }
  }

  .main-header-con.main-header-con--collapsed {
    padding-left: 0;
  }

  .single-page-con.single-page-con--collapsed {
    left: 0;
  }

  .layout-text {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
  }
  .main-hide-text .layout-text {
    display: none;
  }
  &-content-container {
    position: relative;
  }
  &-header-con {
    box-sizing: border-box;
    position: fixed;
    display: block;
    padding-left: 200px;
    width: 100%;
    height: 100px;
    z-index: 20;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    transition: padding 0.3s;
  }
  &-breadcrumb {
    padding: 8px 15px 0;
  }
  &-menu-left {
    background: #464c5b;
    height: 100%;
  }
  &-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    position: relative;
    z-index: 11;
    .navicon-con {
      margin: 15px 0 0 32px;
      display: inline-block;
    }
    .header-middle-con {
      position: absolute;
      left: 40px;
      top: 0;
      right: 340px;
      bottom: 0;
      padding: 10px;
      overflow: hidden;
    }
    .header-avator-con {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 180px;
      .switch-theme-con {
        display: inline-block;
        width: 40px;
        height: 100%;
      }
      .message-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
      .change-skin {
        font-size: 14px;
        font-weight: 500;
        padding-right: 5px;
      }
      .switch-theme {
        height: 100%;
      }
      .user-dropdown {
        &-menu-con {
          position: absolute;
          right: 0;
          top: 0;
          width: 160px;
          height: 100%;
          .main-user-name {
            display: inline-block;
            width: 80px;
            word-break: keep-all;
            white-space: nowrap;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
          }
        }
        &-innercon {
          height: 100%;
          padding-right: 14px;
        }
      }
      .full-screen-btn-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
      .lock-screen-btn-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
    }
  }
  .single-page-con {
    position: absolute;
    top: 100px;
    left: 200px;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #f0f0f0;
    z-index: 1;
    transition: left 0.3s;
    .single-page {
      margin: 10px;
    }
  }
  &-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
}
.taglist-moving-animation-move {
  transition: transform 0.3s;
}
.logo-con {
  padding: 8px;
  text-align: center;
  img {
    height: 44px;
    width: auto;
  }
}
/*select-公共修改*/
.ivu-select{
  .ivu-select-item{
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.baseOption{
  .ivu-select{
    .ivu-select-dropdown{
      width:90%;
    }
  }
}
//menu样式,还有一部分在iview-theme文件夹里
.main /deep/ .ivu-menu-dark,
.main /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
.main /deep/ .ivu-layout-sider-trigger,
.main /deep/ .ivu-layout-sider-zero-width-trigger,
.main /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover
{
  background: #001428;
}
</style>

