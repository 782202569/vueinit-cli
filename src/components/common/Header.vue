<template>
  <div class="header-nav">
    <div class="header-left">
      <span
        class="logo"
        @click="gotoHome"
        :style="{ 'background-image': 'url(' + logoData.logoUrl + ')' }"
      ></span>
      <div class="title" @click="gotoHome">{{ logoData.logoName }}</div>
    </div>
    <div class="header-right">
      <div class="personcenter">
        <el-popover ref="userCenter" placement="bottom" width="146" trigger="click">
          <el-button v-popover:userCenter class="avatar-btn" slot="reference">
            <img
              v-if="roleCodeId.includes('超级管理员')"
              src="../../assets/img/avatar/admin.png"
              class="avatar"
            />
            <img
              v-else-if="roleCodeId.includes('qa_suvs')"
              src="../../assets/img/avatar/qa_admin.png"
              class="avatar"
            />
            <img
              v-else-if="roleCodeId.includes('qa')&&roleCodeId.includes('qa_suvs')===false"
              src="../../assets/img/avatar/qa.png"
              class="avatar"
            />
            <img
              v-else-if="roleCodeId.includes('headman')"
              src="../../assets/img/avatar/headman.png"
              class="avatar"
            />
            <img
              v-else-if="roleCodeId.includes('seatman')"
              src="../../assets/img/avatar/seat.png"
              class="avatar"
            />
            <img
              v-else
              src="../../assets/img/avatar/customize.png"
              class="avatar"
            />
          </el-button>
          <div class="userInfo">
            <p class="userItem">{{ currentUserinfo }}</p>
            <p class="userItem">{{ this.role }}</p>
          </div>
          <div class="userSet">
            <p
              class="userItem"
              @click="sendMessage"
              v-if="roleCodeId.includes('qa_suvs')"
            >
              公告发件箱
            </p>
            <p class="userItem" @click="updataPwd">修改密码</p>
            <p class="layout" @click="signOut">退出</p>
          </div>
        </el-popover>
      </div>
      <!-- <el-button v-popover:infoCenter class="avatar-btn" slot="reference">
        <div class="infocenterWrap">
          <div class="infocenter">消息中心</div>
          <p class="infoTip" v-if="this.count != 0">
            <span class="conut">{{count}}</span>
          </p>
          <p class="infoTip infoTipW" v-if="this.count >99">
            <span class="conut">99+</span>
          </p>
        </div>
      </el-button>
      <el-popover
        popper-class="infolist"
        ref="infoCenter"
        placement="bottom"
        width="246"
        trigger="click">
        <div class="userInfoList">
          <div class="infoItemWrap">
            <div class="infoItem" v-for="item in userInfoList" @click="showInfoDec(item)">
              <p class="infoType">{{item.messageType === 1 ? '(系统消息)' : '(公告)'}}</p>
              <p class="infoContent">{{item.content}}</p>
            </div>
          </div>
          <div class="footer">
            <el-button class="avatar-btn" @click="toMyMessage"><span class="text">更多消息</span></el-button>
          </div>
        </div>
      </el-popover> -->
    </div>
    <!--修改密码弹窗弹窗-->
    <el-dialog title="修改密码" append-to-body :visible.sync="dialogFormVisible">
      <el-form :model="formPwd" :rules="rulePwd" ref="formPwd" labelPosition="left">
        <el-form-item
          class="pwd-err"
          label="原密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="formPwd.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="pwd-err"
          label="新密码"
          prop="newpassword"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="formPwd.newpassword"
            auto-complete="off"
            placeholder="6-20字符，密码必须包含数字、大写字母和小写字母"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="pwd-err"
          label="确认密码"
          prop="surePassword"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="formPwd.surePassword"
            auto-complete="off"
            placeholder="6-20字符，密码必须包含数字、大写字母和小写字母"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitpassword('formPwd')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看消息 -->
    <el-dialog
      class="dialog-wrap"
      append-to-body
      title="查看消息"
      :visible.sync="messageDetailVisible"
      :close-on-click-modal="false"
      :before-close="handleClosemessageDetail"
    >
      <div class="messageContent">
        <div class="massage_header">
          <h2>
            {{ detailMessage.content }}
          </h2>
          <div class="subtitle">
            <div>
              <label>
                消息类型：
              </label>
              <span>
                {{ detailMessage.messageType | dealMessageType }}
              </span>
            </div>
            <div>
              <label>
                消息时间：
              </label>
              <span>
                {{ detailMessage.createTime | dealTime }}
              </span>
            </div>
            <div>
              <label>
                发件人：
              </label>
              <span>
                {{ detailMessage.createUserName }}
              </span>
            </div>
          </div>
        </div>
        <p>
          {{ detailMessage.content }}
        </p>
        <div class="btns">
          <el-button @click="handleClosemessageDetail">取消</el-button>
          <el-button type="primary" @click="handleClosemessageDetail">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="titleShow"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div style="margin-left: 30px;margin-bottom: 30px;">
        您已超过三个月没有修改密码,是否修改密码?
      </div>

      <div class="btns">
        <el-button @click="nextShow">三个月以后提醒</el-button>
        <el-button type="primary" @click="pswChange">修改密码</el-button>
      </div>
    </el-dialog>

    <!-- <div class="announcement" v-show="showNotice">
       <span class="announcement-icon" @click="goToMessage"><img src="../../assets/img/header-notice.png" class="icon"></span>
       <marquee id="output" class="announcement-content" behavior="scroll" contenteditable="true" onstart="this.firstChild.innerHTML+=this.firstChild.innerHTML;" scrollamount="3" width="100" onmouseover="this.stop();" onmouseout="this.start();">
         <p>{{noticeContent}}</p>
       </marquee>
     </div>-->
  </div>
</template>
<script>
import global from '@/global'
// import store from '../../store'
import Base64 from 'base-64'
import cache from '../../utils/cache'
import matchRoleId from '../../utils/matchRoleId'
import '../../utils/socket/websocket.js'
import Qs from 'qs'
import moment from 'moment'
let qualityUrl = global.qualityUrl
let hrmApi = global.hrmApi
let url = qualityUrl + '/AbcByLogin'
export default {
  props: {
    logoData: Object,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.$data.formPwd.newpassword !== '') {
          let reg = /[A-Z]{1,}/
          let result = reg.test(this.$data.formPwd.newpassword)
          if (
            result == true &&
            (this.$data.formPwd.newpassword.length >= 6 &&
              this.$data.formPwd.newpassword.length <= 20)
          ) {
            callback()
          } else {
            callback('请输入6-20位字符并且至少含有一个大写字母')
          }
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formPwd.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      showNotice: false,
      titleShow: false, // 密码过期提示框
      userInfoList: [
        /* {messageType: 1, content: '男方是否是否是否救死扶伤房间号放到沙发上发呆舒服舒服'},
           {messageType: 2, content: '男方是否是否是否救死扶伤房间号放到沙发上发呆舒服舒服'},
           {messageType: 1, content: '男方是否是否是否救死扶伤房间号放到沙发上发呆舒服舒服'},
           {messageType: 2, content: '男方是否是否是否救死扶伤房间号放到沙发上发呆舒服舒服'},
           {messageType: 1, content: '男方是否是否是否救死扶伤房间号放到沙发上发呆舒服舒服'} */
      ],
      role: '',
      roleId: '',
      roleCodeId: [],
      count: 0,
      noticeContent: '',
      // 密码修改弹窗
      dialogFormVisible: false, // 修改密码
      messageDetailVisible: false, // 查看消息
      detailMessage: {}, // 消息
      addMessageRules: {
        content: [
          { required: true, message: '消息标题不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '消息标题不能超过30个字', trigger: 'blur' },
        ],
        messageContent: [
          { required: true, message: '消息内容不能为空', trigger: 'blur' },
          { min: 1, max: 500, message: '消息内容不能超过500个字', trigger: 'blur' },
        ],
      },
      formPwd: {
        /* 密码修改 */
        password: '',
        newpassword: '',
        surePassword: '',
      },
      rulePwd: {
        password: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newpassword: [{ validator: validatePass, trigger: 'blur' }],
        surePassword: [{ validator: validatePass2, trigger: 'blur' }],
      },
      formLabelWidth: '80px',
    }
  },
  filters: {
    dealTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    dealMessageType(val) {
      if (val == '1') {
        return '系统消息'
      } else if (val == '2') {
        return '公告'
      }
    },
  },
  computed: {
    currentUserinfo() {
      return this.$store.state.loginUserinfo.realName
    },
    accountId() {
      return this.$store.state.loginUserinfo.accountId
    },
  },
  created() {
    this.queryAccount()
    this.noticeContent = ''
    this.$nextTick(function() {
      // 获取用户信息
      let userInfo = JSON.parse(cache.getItem('userInfo'))
      if (userInfo) {
        this.$store.commit('setLoginUserinfo', userInfo)
      }
    })
    // this.getInfoList() // 获取消息总数
    this.initActRole() // 获取用户角色
    // this.titleShow = true
  },
  watch: {
    noticeContent: {
      handler(curVal, oldVal) {
        let that = this
        if (curVal !== oldVal) {
          that.noticeContent = oldVal
        }
      },
      deep: true,
    },
  },
  methods: {
    queryAccount() {
      let _this = this
      let url = hrmApi + '/userLogin/pswOverdue.do'
      this.axios
        .post(url)
        .then(function(response) {
          _this.titleShow = response.data
        })
        .catch(function() {
          _this.$message({
            type: 'error',
            message: '获取失败',
          })
        })
    },
    nextShow() {
      this.titleShow = false
      this.axios.post(hrmApi + '/userLogin/changeHasremind.do')
    },
    pswChange() {
      this.titleShow = false
      this.dialogFormVisible = true
    },
    sendMessage() {
      this.$router.push('/sendMessage')
    },
    gotoHome() {
      this.$router.push('/HomePage')
    },
    gotoMyColList() {
      this.$router.push('/myColList')
    },
    signOut() {
      this.$confirm('你确定要退出登录么？', '退出登录确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let playInfo = {}
          playInfo.exist = false
          this.$store.commit('setPlayerInfo', playInfo)
          // 重置menuId，否则会影响不同用户
          this.$store.commit('setMenuId', '')
          this.$parent.$refs.player && this.$parent.$refs.player.wavesurfer.destroy()
          this.$router.push('/login')
          localStorage.clear()
          window.YYZJ_socket && window.YYZJ_socket.close()
          window.YYZJ_socket = null
          this.$store.commit('setPageInfo', null)
          this.$message({
            type: 'success',
            message: '退出成功!',
          })
        })
        .catch(() => {})
    },
    // 获取角色与角色ID
    initActRole() {
      let that = this
      this.axios
        .get(hrmApi + '/role/rolesForAccount.do?accountID=' + this.accountId, {})
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
        code: global.roleCode.toString()
      }
      this.axios
        .post(qualityUrl + '/pageConstant/getRoleIdByCode.do', Qs.stringify(parames))
        .then((res) => {
          if (_this.role == '超级管理员') {
            _this.roleCodeId.push('超级管理员')
          } else {
            let resdata = res.data
            _this.roleCodeId = matchRoleId.match(ids,resdata)
          }
          console.log(_this.roleCodeId)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /*
     * 获取消息总数
     * */
    getUserInfoCount() {
      let _this = this
      this.axios
        .post(url + '/getCountByLogin.do')
        .then((res) => {
          if (res.data) {
            _this.count = res.data.count
          } else {
            _this.count = 0
            this.$message({
              type: 'error',
              message: res.message,
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    /*
     * 获取消息列表
     * */
    getInfoList() {
      this.axios
        .post(url + '/getMessageByLogin.do')
        .then((res) => {
          if (res.data) {
            this.userInfoList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: '数据提交失败!',
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 消息详情
    showInfoDec(item) {
      this.messageDetailVisible = true
      this.detailMessage = item
    },
    handleClosemessageDetail() {
      this.messageDetailVisible = false
    },
    /*
     * 修改密码
     * */
    updataPwd() {
      let self = this
      setTimeout(() => {
        self.$refs.formPwd.resetFields()
        this.$data.formPwd.password = ''
        this.$data.formPwd.newpassword = ''
        this.$data.formPwd.surePassword = ''
      }, 200)
      this.dialogFormVisible = true
    },
    encodePWD(password) {
      let timestamp = new Date().getTime()
      let base64Pwd = timestamp + password
      let pwd = Base64.encode(base64Pwd)
      return pwd
    },
    submitpassword(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          let pwdOne = self.encodePWD(self.$data.formPwd.newpassword)
          let pwdTwo = self.encodePWD(self.$data.formPwd.surePassword)
          let prames = {
            password: self.$data.formPwd.password,
            newpassword: pwdOne,
            pwd: pwdTwo,
          }
          let that = this
          this.axios
            .post(global.hrmApi + '/staff/put/password.do', Qs.stringify(prames))
            .then(function(response) {
              if (response.data.flag === true) {
                that.dialogFormVisible = false
                that.$message({
                  type: 'success',
                  message: response.data.msg,
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      })
    },
    goToMessage() {
      this.$router.push('/my_message')
      this.showNotice = false
    },
  },
  mounted() {
    this.getUserInfoCount() // 我的总消息
  },
}
</script>
<style lang="less">
/* el-button*/
.el-button.avatar-btn {
  padding: 0;
  border: 0;
  background: none;
}

.userInfo {
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 16px;
}

.userSet {
  .layout {
    margin: 20px 0;
    cursor: pointer;
  }
}
.infolist {
  padding: 12px 0 12px;
}
.userInfoList {
  width: 100%;
  .infoItemWrap {
    max-height: 200px;
    overflow-y: auto;
    .infoItem {
      height: 30px;
      line-height: 30px;
      display: flex;
      flex-direction: row;
      padding: 0 15px;
      flex-wrap: nowrap;
      cursor: pointer;
      .infoType {
        width: 70px;
      }
      .infoContent {
        flex: 1;
        flex-wrap: nowrap;
        overflow: hidden;
      }
    }
  }
  .footer {
    padding-top: 15px;
    border-top: 1px solid #e4e4e4;
    display: flex;
    justify-content: flex-end;
    .text {
      font-size: 14px;
      padding-right: 15px;
    }
  }
}

.userItem {
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #475669;
  cursor: pointer;
}

.dialog-wrap {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
<style scoped lang="less">
@border-color: #d1dbe5;
.header-nav {
  position: relative;
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .header-left {
    float: left;
    .logo {
      float: left;
      display: inline-flex;
      width: 40px;
      height: 40px;
      margin-top: 8px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .title {
      float: left;
      display: inline-block;
      cursor: pointer;
      color: #5d7693;
      font-size: 14px;
    }
  }
  .header-right {
    float: right;
    margin-right: 46px;
    .infocenterWrap {
      position: relative;
      float: right;
      display: inline-block;
      .infocenter {
        color: #1f2d3d;
        font-size: 14px;
        &:hover {
          cursor: pointer;
        }
      }
      .infoTip {
        width: 18px;
        height: 18px;
        line-height: 16px;
        border-radius: 18px;
        background: #f00;
        position: absolute;
        top: -10px;
        right: -10px;
        .conut {
          color: #fff;
          font-size: 12px;
        }
        &.infoTipW {
          width: 30px;
          border-radius: 8px;
        }
      }
    }
    .personcenter {
      float: right;
      position: relative;
      display: inline-block;
      margin-left: 27px;
      .avatar {
        display: inline-block;
        width: 38px;
        height: 38px;
        // border-radius: 50%;
        margin-top: 11px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.btns {
  text-align: right;
}

.messageContent {
  .massage_header {
    border-bottom: 1px dashed @border-color;
    margin-bottom: 10px;
    h2 {
      text-align: center;
    }
  }
  .subtitle {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    div > span {
      margin-right: 10px;
    }
  }
  p {
    padding: 10px 0px;
  }
}
</style>
