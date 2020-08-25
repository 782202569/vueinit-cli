<template>
  <div style="height:100%;">
    <div style="position: fixed;width:100%;">
      <vHeader :logoData="logoData"></vHeader>
    </div>
    <div
      :class="
        withPlayerRecords ? 'slider_container_withRecordPlayer' : 'slider_container'
      "
    >
      <vSlider ref="$menuSlider"></vSlider>
    </div>
    <div
      id="menuContentWrap"
      style="margin-left:220px;height:100%;box-sizing: border-box;padding-top: 60px;"
    >
      <!--overflow: hidden;-->
      <div style="width:100%;height:100%;box-sizing: border-box;">
        <div id="content" style="width:100%;height:100%;overflow-y:auto">
          <v-player
            v-if="showPlayer && this.recordingPlayPage.from != 'myQaTasks'"
            ref="player"
          ></v-player>
          <v-playerMultiple
            v-if="showPlayer && this.recordingPlayPage.from === 'myQaTasks'"
            ref="player"
          ></v-playerMultiple>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from './Header'
import vSlider from './Slider'
import vPlayer from './player.vue'
import vPlayerMultiple from './playerMultiple.vue'
import bus from './bus.js'
import cache from '../../utils/cache.js'
import global from '../../global'
import funcFilter from '@/utils/funcFilter.js'
const hrmUrl = global.hrmApi
export default {
  components: {
    vHeader,
    vSlider,
    vPlayer,
    vPlayerMultiple,
  },
  data() {
    return {
      beforeUrl: '', // 从哪个url跳到当前页面
      currentUrl: '', // 当前页面的url
      logoData: {
        logoName: 'UTRY智能质检分析系统',
        logoUrl: '',
      },
    }
  },
  mounted() {
    bus.$on('closeToplayer', () => {
      this.$refs.player &&
        this.$refs.player.wavesurfer &&
        this.$refs.player.wavesurfer.destroy &&
        this.$refs.player.wavesurfer.destroy()
    })
    window.addEventListener('keydown', this.onEnterMain)
  },
  created() {
    this.initLogo()
    this.recordPlayCloseHandler()
    if (this.$route.query.from == 'kfzs') {
      cache.setItem('tgt_id', this.$route.query.token) // 保存登录的票据
      this.$store.commit('setToken', this.$route.query.token)
      this.getClientFrameInfo()
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onEnterMain)
  },
  methods: {
    getClientFrameInfo() {
      const self = this
      this.axios.get(hrmUrl + '/userLogin/getClientFrameInfo').then((response) => {
        let menu = response.data.menu || []
        menu = menu.filter(
          (item) =>
            item.menuName !== '机器人' && item.menuName !== '人机监控' && item.isClient
        )
        menu.forEach((item) => {
          item.childs = item.childs.filter((child) => child.isClient)
        })
        let sliderMenu = JSON.stringify(menu)
        self.$store.commit('setLoginUserinfo', response.data.userinfo)
        self.sliderMenu = sliderMenu
        cache.setItem('sliderMenu', sliderMenu)
        //cache.setItem('account', self.ruleForm.username)
        self.loading = false
        // 存储userInfo
        var userInfoStr = JSON.stringify(response.data.userinfo)
        cache.setItem('userInfo', userInfoStr)
        let roleNames = []
        let roleInfo = response.data.userinfo.role || []
        roleInfo.forEach((role) => {
          roleNames.push(role.role)
        })
        cache.setItem('roleInfo', roleNames.join(','))
        self.$router.push('/homepage')
        this.$refs.$menuSlider.updateMenu()
      })
    },
    onEnterMain(event) {
      if (event.keyCode == '13' && this.login) {
        this.handleSubmit()
      }
    },
    handleSubmit() {
      this.$router.push('/login')
    },
    changePlayInfo() {
      if (this.currentUrl != this.beforeUrl) {
        let playInfo = {}
        playInfo.isMaximization = true
        playInfo.exist = false
        this.$store.commit('setPlayerInfo', playInfo)
        this.$refs.player && this.$refs.player.wavesurfer.destroy()
      }
    },
    recordPlayCloseHandler: function() {
      this.$store.commit('setPlayerInfo', {
        exist: false,
        extendClassName: '',
        maxCallback: null,
      })
      bus.$emit('closeToplayer')
    },
    initLogo() {
      this.axios.get('/sys/logo/queryDescs.do?flag=2').then((res) => {
        let r = res.data
        if (r.code == 0) {
          const desc = (r.data && r.data.desc) || ''
          this.logoData.logoName = desc
          document.title = desc
        } else {
          this.$Message.error(r.message)
        }
      })
      this.axios.get('/sys/logo/queryLoginImg.do?flag=2').then((res) => {
        let r = res.data
        if (r.code == 0) {
          r.data && (this.logoData.logoUrl = 'data:image/png;base64,' + r.data.png)
        } else {
          this.$Message.error(r.message)
        }
      })
      this.axios.get('/oam/logo/queryLoginImg.do?flag=4').then((res) => {
        let r = res.data
        if (r.code == 0) {
          if (!r.data) return
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
    /* changePlayState () {
       if (this.currentUrl === 'recordingPlay') {
       // console.log('url到recordingPlay')
       // 还要重置播放器信息
       let playInfo = {}
       playInfo.isMaximization = true
       playInfo.exist = true
       this.$store.commit('setPlayerInfo', playInfo)
       } else if (this.playerInfo.exist === true && this.playerInfo.isMaximization === false) {
       // 关闭播放器界面时会将playerInfo的exist属性置为false，
       // 如果这个属性为true则可判定当前页面存在播放器对象，
       // 而sMaximization属性false，所以可以判定当前播放器界面处于最小化状态
       // 播放器最小化状态下，
       // console.log('点击了最小化')
       // 最小化状态下记录来源页面的url，供跳回时使用
       let obj = {}
       if (this.beforeUrl !== 'recordingPlay') {
       obj.searchModel = {}
       }
       obj.fromPage = this.currentUrl
       this.$store.commit('setRecordingPlayPage', obj)
       } else if (this.playerInfo.exist === true) {
       // 关闭播放器界面时会将playerInfo的exist属性置为false，
       // 如果这个属性为true则可判定当前页面存在播放器对象，
       // 如果播放器界面最小化了则isMaximization属性应为false，所以如果这个属性的值是true，则可以判定是在播放器界面直接点击了其他url，
       // 此时应将isMaximization属性应为true，即默认将播放器最小化
       // console.log('跳转到其他界面且没有关闭')
       let obj = {}
       obj.searchModel = {}
       obj.fromPage = this.currentUrl
       this.$store.commit('setRecordingPlayPage', obj)
       let playInfo = {}
       playInfo.isMaximization = false
       this.$store.commit('setPlayerInfo', playInfo)
       } else if (this.playerInfo.exist === false) {
       // console.log('关闭播放器')
       // 页面中不存在播放器，要将记录的跳转到播放器界面的界面信息清空（播放器信息已经在点击关闭按钮时被清空）
       let obj = {}
       obj.fromPage = this.currentUrl
       let callId = this.$route.query.callId
       let pageId = this.$route.query.pageId
       obj.callId = callId
       obj.pageId = pageId
       obj.orderNo = this.$route.query.orderNo
       obj.from = ''
       if (this.beforeUrl !== 'recordingPlay') {
       obj.searchModel = {}
       }
       this.$store.commit('setRecordingPlayPage', obj)
       this.$refs.player && this.$refs.player.wavesurfer.destroy()
       }
       } */
  },
  computed: {
    withPlayerRecords() {
      return !this.playerInfo.isMaximization
    },
    login() {
      return !this.$store.state.token
    },
    showPlayer() {
      return this.playerInfo.exist
    },
    recordingPlayPage() {
      return this.$store.state.recordingPlayPage
    },
    playerInfo() {
      return this.$store.state.playerInfo
    },
    menuId() {
      return this.$store.state.menuId
    },
    menuInfo() {
      return this.$store.state.menuInfo
    },
  },
  watch: {
    $route(val, old) {
      this.beforeUrl = old.path.slice(1)
      this.currentUrl = val.path.slice(1)
      this.changePlayInfo()
      this.$store.commit('setKeywordsHigh', null)
      localStorage.setItem('menuId', this.menuId)
      localStorage.setItem('routerPath', val.path)
      let path = val.path.replace('/', '')
      if (val.query && val.query.id) {
        let menuId = val.query.id
        funcFilter(menuId, path)
        return
      }

      const firstPage = [
        'IVSshensuguanli',
        'caseManage_new',
        'qaCalibration',
        'taskManage',
        'scoreResultInfo',
      ] // 从首页可以进入的页面
      if (path !== 'homepage' && firstPage.includes(path)) {
        if (firstPage.includes(path)) {
          this.menuInfo.map((item) => {
            item.map((val) => {
              if (val.url === path) {
                this.$store.commit('setMenuId', val.menuId)
                localStorage.setItem('menuId', val.menuId)
                funcFilter(val.menuId, path)
              }
            })
          })
        } else {
          funcFilter(this.menuId, path)
        }
      }
    },
  },
}
</script>
<style>
html,
body {
  height: 100%;
}

#content {
}

.slider_container {
  width: 220px;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.slider_container_withRecordPlayer {
  width: 220px;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 150px;
}

.el-message-box__message p {
  word-wrap: break-word;
}
</style>
