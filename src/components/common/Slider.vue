<template>
  <div class="sidebar">
    <div class="silder-pos-content" style="width:100%;box-sizing:border-box;height:100%;">
      <div style="width:100%;height: 100%;overflow: auto" id="sliderNav">
        <el-menu
          ref="slider_menu"
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          unique-opened
          background-color="#334156"
          active-text-color="#20A0FF"
          text-color="#BFCBD9"
          style="margin-top:-3px;"
          @select="handleSelect"
          :router="routerActive"
        >
          <el-menu-item
            index="homepage"
            v-if="
              rolename.includes('超级管理员') ||
                rolename.includes('qa_suvs') ||
                rolename.includes('qa')
            "
          >
            <i class="iconfont icon-zuocelan-shouye" style="color:#BFCBD9;"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="seatHome" v-if="rolename.includes('seatman')">
            <i class="iconfont icon-zuocelan-shouye" style="color:#BFCBD9;"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            :index="slideritem.menuId + slideritem.parentId"
            v-for="slideritem in slider"
            v-if="slideritem.childs.length > 0"
          >
            <template slot="title">
              <i class="iconfont" :class="slideritem.icon"></i>
              <span>{{ slideritem.menuName }}</span>
            </template>
            <el-menu-item-group
              v-for="slideritemchild in slideritem.childs"
              v-if="slideritemchild.childs.length == 0"
              style="height:50px;"
            >
              <el-menu-item
                class="childBg"
                :index="slideritemchild.menuId + ',' + getUrl(slideritemchild.url)"
                :data-menuName="slideritemchild.menuName"
                >{{ slideritemchild.menuName }}</el-menu-item
              >
            </el-menu-item-group>
            <el-submenu
              :index="slideritemchild.menuId + slideritemchild.parentId"
              v-for="slideritemchild in slideritem.childs"
              v-if="slideritemchild.childs.length > 0"
            >
              <template slot="title">{{ slideritemchild.menuName }}</template>
              <el-menu-item
                class="childBg"
                :index="itemchild.menuId + ',' + getUrl(itemchild.url)"
                v-for="itemchild in slideritemchild.childs"
              >
                {{ itemchild.menuName }}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
import cache from '../../utils/cache.js'
import global from '../../global.js'
import '../../utils/socket/websocket'
import matchRoleId from '../../utils/matchRoleId'
import qs from 'qs'
export default {
  data() {
    return {
      slider: [],
      routerActive: false,
      loading: false,
      qa_loading: false,
      rolename: [],
      defaultActive: 'homepage',
    }
  },
  computed: {
    pageInfo() {
      return this.$store.state.pageInfo.currentPage
    },
    accountId() {
      return this.$store.state.loginUserinfo.accountId
    },
    menuId() {
      return this.$store.state.menuId
    },
  },
  watch: {
    $route(val, old) {
      let routerPath = val.path
      let page = ''
      if (routerPath.startsWith('/')) {
        page = routerPath.substr(1, routerPath.length)
      } else {
        page = routerPath
      }
      this.$refs.slider_menu.activedIndex = page
      this.$store.commit('setPageInfo', { currentPage: page })
      if (val.query && val.query.id) {
        let menuId = val.query.id
        this.$refs.slider_menu.activeIndex = `${menuId},${page}`
        return
      }
      this.$refs.slider_menu.activeIndex = `${this.menuId},${page}`
    },
  },
  created() {
    if (this.$route.query.page && this.$route.query.page.toString() == 'assistant') {
      cache.setItem('roleInfo', this.$route.query.roleInfo)
    }
    this.initActRole()
    this.getFuncId()
    this.updateMenu()
  },
  methods: {
    getUrl(url) {
      if (!url) {
        return ''
      } else {
        let strUrl = url
        let strUrlarr = strUrl.split('/')
        for (let i = 0; i < strUrlarr.length; i++) {
          if (strUrlarr[i] === 'main.do' || strUrlarr[i] === 'manage.do') {
            strUrlarr.splice(i, 1)
            return strUrlarr[strUrlarr.length - 1]
          }
          if (strUrlarr[i].indexOf('manage.do?versionCode=') === 0) {
            return strUrlarr[strUrlarr.length - 1]
          }
        }
        return strUrlarr[strUrlarr.length - 1].split('.')[0]
      }
    },
    // 获取角色与角色ID
    initActRole() {
      let that = this
      this.axios
        .get(global.hrmApi + '/role/rolesForAccount.do?accountID=' + this.accountId, {})
        .then((res) => {
          that.role = res.data.Data
          that.roleId = res.data.IDS
          if (that.role == null || that.role == '') {
            that.role = '超级管理员'
            that.roleId = '超级管理员'
          }
          that.matchActRoleId(res.data.IDS)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 匹配角色ID
    matchActRoleId(id) {
      let ids = id.split(',')
      let _this = this
      let parames = {
        code: global.roleCode.toString(),
      }
      this.axios
        .post(
          global.qualityUrl + '/pageConstant/getRoleIdByCode.do',
          qs.stringify(parames)
        )
        .then((res) => {
          if (_this.role == '超级管理员') {
            _this.rolename.push('超级管理员')
          } else {
            let resdata = res.data
            _this.rolename = matchRoleId.match(ids, resdata)
          }
          console.log(_this.rolename)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSelect(key) {
      if (key.indexOf(',') !== -1) {
        let keys = key.split(',')
        this.$router.push(keys[1])
        this.$store.commit('setMenuId', keys[0])
      } else {
        this.$router.push('/homepage')
      }
    },
    toMyMessage() {
      this.$router.push('/my_message')
      localStorage.setItem('isFromHome', 'true')
    },
    toMyQA() {
      this.$router.push('/myQaTasks')
    },
    getFuncId: function() {
      this.axios
        .post(global.hrmApi + '/accountApi/accessible/getFuncIdByAccountId.do')
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i] == 'qa_loading') {
              this.qa_loading = true
            }
          }
        })
    },
    updateMenu() {
      this.$nextTick(() => {
        let myMenu = JSON.parse(cache.getItem('sliderMenu'))
        if (Array.isArray(myMenu)) {
          this.initActRole()
          this.slider = myMenu
          this.$store.commit('setMenuInfo', myMenu)
          this.$store.commit('setPageInfo', { currentPage: 'homepage' })
          this.defaultActive = this.pageInfo
        }
      })
    },
  },
}
</script>

<style lang="less">
.sidebar {
  width: 220px;
  height: 100%;
  background: #324157;
  box-sizing: border-box;
  .iconfont {
    font-size: 20px;
    color: #bfcbd9;
    -webkit-transition: font-size 0.25s ease-out 0s;
    -moz-transition: font-size 0.25s ease-out 0s;
    transition: font-size 0.25s ease-out 0s;
    margin-right: 4px;
  }
  // .el-icon-arrow-down:before {
  //   content: "\e64b";
  // }
  .m-r-n {
    margin-right: 0;
  }
  .announcement {
    width: 500px;
    height: 42px;
    line-height: 42px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 2px 2px 2px #d1d4d8;
    border-radius: 2px;
    .announcement-icon {
      float: left;
      width: 42px;
      height: 42px;
      display: inline-block;
      background-color: #c3ccd9;
      .icon {
        display: inline-block;
        width: 20px;
        margin: 12px 0 0 10px;
      }
    }
    .announcement-content {
      display: inline-block;
      float: left;
      width: 450px;
      height: 42px;
      line-height: 42px;
      padding-right: 25px;
      box-sizing: border-box;
      font-size: 18px;
      color: #9eadc2;
      &:focus {
        outline: none;
      }
    }
  }
}
.sidebar .silder-pos {
  padding: 0 10px;
  box-sizing: border-box;
}
.sidebar .sidebar-nav {
  border-bottom: 1px solid #42546b;
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100px;
}
.sidebar-nav img {
  padding: 20px 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}
.sidebar-nav span {
  height: 60px;
  padding: 20px 0px;
  width: 90px;
}
.sidebar-nav span .zhijian-name {
  color: #98a8bf;
}
.sidebar-nav .zhijian-icons {
  display: inline-block;
  width: 100px;
}
.mymessage {
  cursor: pointer;
  color: #91a2b7;
  font-size: 16px;
  height: 20px;
  line-height: 15px;
}
#sliderNav::-webkit-scrollbar {
  width: 0px;
  height: 14px;
  background-color: #f6f8fa;
  border-radius: 10px;
}
#sliderNav:hover::-webkit-scrollbar {
  width: 5px;
  height: 14px;
  background-color: #f6f8fa;
  border-radius: 10px;
}
/*el-badge样式添加*/
.el-badge.m-r-20 {
  margin-right: 20px;
}
/*el-dialog*/
.w-500 {
  .el-dialog {
    width: 500px;
    .el-dialog__body {
      max-height: 500px;
      overflow-y: auto;
    }
  }
}
/*menu*/
.el-menu-item-group__title {
  padding: 0;
}
.el-menu-item.childBg {
  background-color: #202e3c !important ;
  height: 56px !important;
  line-height: 56px !important;
  &:hover {
    color: #20a0ff !important;
  }
}
/*

    #sliderNav ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    #sliderNav ::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(255,0,0,0.4);
    }
    #sliderNav ::-webkit-scrollbar-track {
     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
     border-radius: 10px;
    }*/
</style>
