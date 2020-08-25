<template>
  <div class="login-wrap">
    <div class="login-wrap-content" style="height:57%;width:61%;">
      <div class="fl w51 loginwrapLeft" style="height:100%;">
        <div style="position: absolute;top:47%;left:22%;transform: translate(-50%,-50%)">
          <p>{{ logoName }}</p>
        </div>
      </div>
      <div class="fl w51 loginwrapRight" style="position: relative;height:100%;">
        <div style="position: absolute;width:100%;top:46%;transform: translateY(-50%)">
          <div class="ms-logo" style="width:30%;margin-left:29%;margin-bottom:20px;">
            <img :src="logoUrl" alt="logo" />
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
            class="demo-ruleForm"
            style="margin-left:20%;"
          >
            <el-form-item prop="username">
              <el-input
                class="lgbtm"
                icon="my-user"
                v-model="ruleForm.username"
                placeholder="用户名"
                id="user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                id="pass"
                class="lgbtm"
                icon="my-lock"
                type="password"
                placeholder="密码"
                v-model="ruleForm.password"
                @keyup.enter.native="submitForm('ruleForm')"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="companyid" style="width:100%;">
              <el-select
                v-model="ruleForm.companyid"
                placeholder="请选择"
                style="width:60%"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.companyid"
                  :label="item.companyname"
                  :value="item.companyid"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="login-btn" style="width:60%;">
              <el-button
                id="log-in"
                type="primary"
                @click="submitForm('ruleForm')"
                :loading="loading"
                >登录</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Base64 from 'base-64'
import cache from '../../utils/cache.js'
import Cookie from 'vue-cookie'
import global from '../../global.js'
import qs from 'qs'
//   import store from '../../store'
let loginUrl = global.baseUrl
let hrmUrl = global.hrmApi
// let getSiteurl = sysConfig.getSiteurl
// axios.defaults.withCredentials = true
// axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded ;charset=UTF-8'}
export default {
  name: 'login',
  data: function() {
    return {
      urlImg: '',
      uuid: '',
      loading: false,
      companyList: [],
      ruleForm: {
        username: '',
        password: '',
        companyid: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        companyid: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      logoUrl: '',
      logoName: '智能质检分析系统',
    }
  },
  created: function() {
    this.initLogo()
    localStorage.clear()
  },
  methods: {
    getCompany() {
      this.axios.get(loginUrl + '/oam/api/company/getAllCompany', {}).then((res, req) => {
        this.companyList = res.data.data
        this.ruleForm.companyid = this.companyList[0].companyid
      })
    },
    getUUID() {
      let s = []
      let hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      let uuid = s.join('')
      return uuid
    },
    encodePWD(password) {
      let timestamp = new Date().getTime()
      let base64Pwd = timestamp + password
      let pwd = Base64.encode(base64Pwd)
      return pwd
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.loading = true
          let pwd = self.encodePWD(self.ruleForm.password)
          let loginParam = {
            username: '',
            password: '',
            companyId: '',
          }
          loginParam.username = self.ruleForm.username
          loginParam.password = pwd
          loginParam.companyId = self.ruleForm.companyid
          /* $.ajaxSetup({
             xhrFields: {
             withCredentials: true
             }
             }) */
          this.axios
            .post(loginUrl + '/gateway/login', loginParam, global.jsonHeader)
            .then((res) => {
              if (res.data.data) {
                cache.setItem('tgt_id', res.data.data) // 保存登录的票据
                Cookie.set('userNameHead', self.ruleForm.username, 7)
                this.$store.commit('setToken', res.data.data)
                this.axios
                  .get(hrmUrl + '/userLogin/getClientFrameInfo')
                  .then((response, req) => {
                    // if(response.status ==200 && response.data){
                    // 保存快捷菜单
                    // let quickMenu = JSON.stringify(response.data.quickMenu[0]);
                    // cache.setItem('quickMenu',quickMenu);
                    // 保存菜单
                    let menu = response.data.menu || []
                    menu = menu.filter(
                      (item) =>
                        item.menuName !== '机器人' &&
                        item.menuName !== '人机监控' &&
                        item.isClient
                    )
                    menu.forEach((item) => {
                      item.childs = item.childs.filter((child) => child.isClient)
                    })
                    let sliderMenu = JSON.stringify(menu)
                    let userInfo = response.data.userinfo
                    userInfo.account = self.ruleForm.username
                    self.$store.commit('setLoginUserinfo', userInfo)
                    cache.setItem('sliderMenu', sliderMenu)
                    cache.setItem('account', self.ruleForm.username)
                    self.$router.push('/homepage')
                    self.loading = false
                    // 存储userInfo
                    let userInfoStr = JSON.stringify(response.data.userinfo)
                    cache.setItem('userInfo', userInfoStr)
                    // 存储role
                    let roleNames = []
                    let roles = []
                    let roleInfo = response.data.userinfo.role || []
                    roleInfo.forEach((role) => {
                      roleNames.push(role.roleID)
                      roles.push(role.role)
                    })
                    self.matchActRoleId(roleNames)
                    cache.setItem('rolesName', roles.join(','))
                    console.log(cache.getItem('rolesName') + '++++++++++++++')
                    /* cache.setItem('roleInfo', roleNames.join(','))
                     */
                  })
              } else {
                self.loading = false
                this.$message({
                  type: 'error',
                  message: res.data.message,
                })
              }
            })
            .catch(function(error) {
              self.loading = false
              console.log(error)
            })
        }
      })
    },
    // 匹配角色ID
    matchActRoleId(ids) {
      let parames = {
        code: global.roleCode.toString(),
      }
      this.axios
        .post(
          global.qualityUrl + '/pageConstant/getRoleIdByCode.do',
          qs.stringify(parames)
        )
        .then((res) => {
          let arr = []
          if (ids === '' || ids === [] || ids === null) {
            arr.push('超级管理员')
          } else {
            let resdata = res.data
            for (var key in resdata) {
              ids.forEach(function(item) {
                if (resdata[key] == item) {
                  arr.push(key)
                }
              })
            }
          }
          cache.setItem('roleInfo', arr.join(','))
          console.log(cache.getItem('roleInfo') + '+++++++++++++++++')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initLogo() {
      this.axios.get('/oam/logo/queryDescs?flag=4').then((res) => {
        let r = res.data
        if (r.code == 0) {
          r.data && (this.logoName = r.data.desc)
          document.title = this.logoName
        } else {
          this.$Message.error(r.message)
        }
      })
      this.axios.get('/oam/logo/queryLoginImg.do?flag=4').then((res) => {
        let r = res.data
        if (r.code == 0) {
          if (!r.data) return
          this.logoUrl = 'data:image/png;base64,' + r.data.png
          let link =
            document.querySelector("link[rel*='icon']") || document.createElement('link')
          link.type = 'image/x-icon'
          link.rel = 'shortcut icon'
          link.href = 'data:image/png;base64,' + r.data.ico
          document.getElementsByTagName('head')[0].appendChild(link)
        } else {
          this.$Message.error(r.message)
        }
      })
    },
  },
  mounted: function() {
    this.getCompany()
  },
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login/bg.png) no-repeat center;
  background-size: 100% 100%;
}

.login-wrap .login-wrap-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background: url(../../assets/img/login/bg2.png) no-repeat center;
  background-size: 100% 100%;
}

.login-wrap-content .loginwrapLeft p {
  color: #fff;
  font-size: 32px;
  height: 62px;
}

#user,
#pass {
  width: 60%;
}

.login-btn .el-button {
  width: 100%;
}
</style>
