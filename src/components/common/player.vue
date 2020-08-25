<template>
  <div class="player_container">
    <div id="lrc_list" v-if="false"></div>
    <div
      class="player"
      :class="[
        isMaximization ? 'maximization' : 'minimization',
        playerInfoStore.extendClassName,
      ]"
    >
      <el-tooltip :content="callId" placement="top" offset="-20" effect="light">
        <div class="recordId" v-show="!isMaximization">
          {{ callId }}
        </div>
      </el-tooltip>
      <div class="player_btns">
        <!--<div class="deceleration circle" @click="setPlaybackRate(-1)">
          <i class="el-icon-d-arrow-left"></i>
        </div>-->
        <div ref="pausebtn" class="play circle" @click="controlState">
          <i class="el-icon-caret-right" v-if="playerState == '0'"></i>
          <i class="iconfont icon-222" v-else></i>
        </div>
        <!-- <div class="accelerate circle" @click="setPlaybackRate(+1)">
           <i class="el-icon-d-arrow-right"></i>
         </div>-->
      </div>
      <div class="speed" v-popover:speedPopover v-show="isMaximization">
        {{ rate | formatter }}
      </div>
      <div>
        <el-popover
          popper-class="speedPopover"
          ref="speedPopover"
          placement="bottom"
          width="80"
          trigger="click"
        >
          <div class="radio-group">
            <el-radio-group v-model="selectRate" @change="setPlaybackRate(selectRate)">
              <el-radio :label="-0.75">0.25X</el-radio>
              <el-radio :label="-0.5">0.5X</el-radio>
              <el-radio :label="-0.25">0.75X</el-radio>
              <el-radio :label="0.75">1.0X 正常</el-radio>
              <el-radio :label="1">1.25X</el-radio>
              <el-radio :label="1.25">1.5X</el-radio>
              <el-radio class="last-radio" :label="1.75">2.0X</el-radio>
            </el-radio-group>
          </div>
        </el-popover>
      </div>
      <div>
        <div class="curTime">{{ currentTime }}</div>
        <div id="waveform"></div>
        <div class="playProcess" v-show="!isMaximization">
          <el-slider v-model="displayPlayProcess" :show-tooltip="false"></el-slider>
        </div>
        <div class="voiceTotalTime">{{ totalTime }}</div>
      </div>
      <div class="player_volume" @click="toggleVolumeControl()"></div>
      <div class="maximize" v-show="!isMaximization" @click="maximizePage"></div>
      <div class="volume_container" v-show="volumeControl">
        <el-slider v-model="volume"> </el-slider>
      </div>
    </div>
  </div>
</template>
<script>
import WaveSurfer from 'wavesurfer.js'
import Qs from 'qs'
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js'
// import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js'
import global from '../../global.js'
import cache from '../../utils/cache.js'
let qualityUrl = global.qualityUrl
export default {
  name: 'player',
  data() {
    return {
      wavesurfer: {}, // 播放器对象
      playerState: '0', // '1'为正在播放，'0'为暂停状态
      currentTime: '00:00',
      currentSS: 0, // 当前播放秒数
      volume: 100, // 音量
      volumeControl: false, // 音量调节是否展示
      displayPlayProcess: 0,
      rate: 1, // 播放速度，1是正常速度
      operateUnit: 0.25,
      selectRate: 0.75,
      playArray: [],
      voiceType: '.wav',
    }
  },
  methods: {
    controlState() {
      this.$nextTick(() => {
        if (this.playerState === '0') {
          this.wavesurfer.play(this.currentSS)
          this.playerState = '1'
        } else {
          this.wavesurfer.pause()
          this.playerState = '0'
        }
      })
    },
    // 获取录音格式
    initVoiceType() {
      let params = {
        confCode: 'music.type',
        siteCode: '',
      }
      this.axios
        .post(qualityUrl + '/pageConstant/getSysSenorVal.do', Qs.stringify(params))
        .then((res) => {
          if (res.data) {
            this.voiceType = res.data
            this.initWaveSurfer() // 获取录音wave
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    initWaveSurfer() {
      // 录音获取步骤
      // 1 获取录音名称  3播放

      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#4cf3a7',
        progressColor: 'green',
        height: 50,
        // backend: 'MediaElement'
      })
      this.wavesurfer.load(this.recordFileURL + '?accessToken=' + cache.getItem('tgt_id')) // 参数2 波形
      //    _this.wavesurfer.load(global.ivsUrl + '/wav/' + (_this.callId) + '.wav?accessToken=' + cache.getItem('tgt_id') + '&prefer-service-zone=test') // 本地测试使用
      this.wavesurfer.setVolume(this.volume / 100)
      this.wavesurfer.on('ready', () => {
        window.myinterVal = 0
        console.log('初始化计数器')
      })

      // 加载出错时的回调
      this.wavesurfer.on('error', (error) => {
        this.$message({
          type: 'error',
          message: error,
        })
      })

      this.wavesurfer.on('audioprocess', () => {
        if (!window.myinterVal) {
          this.currentSS = parseInt(this.wavesurfer.getCurrentTime())
        }
      })
      this.wavesurfer.on('finish', () => {
        this.currentSS = 0
      })
    },
    timeFilter(seconds) {
      let ss = parseInt(seconds) // 秒
      let mm = 0 // 分
      let hh = 0 // 小时
      if (ss > 60) {
        mm = parseInt(ss / 60)
        ss = parseInt(ss % 60)
      }
      if (mm > 60) {
        hh = parseInt(mm / 60)
        mm = parseInt(mm % 60)
      }
      let result = ('00' + parseInt(ss)).slice(-2)
      if (mm > 0) {
        result = ('00' + parseInt(mm)).slice(-2) + ':' + result
      } else {
        result = '00:' + result
      }
      if (hh > 0) {
        result = ('00' + parseInt(hh)).slice(-2) + ':' + result
      }
      return result
    },
    toggleVolumeControl() {
      this.$data.volumeControl = !this.$data.volumeControl
    },
    maximizePage() {
      this.$store.commit('setPlayerInfo', { isMaximization: true })
      this.$store.dispatch('triggerPlayerInfoMaxCallback')
      // this.$router.push('/recordingPlay')
    },
    setPlaybackRate(val) {
      let flag = 0
      val >= 0 ? (flag = 1) : (flag = -1)
      if (flag > 0) {
        let temp = val + flag * this.operateUnit
        if (temp <= 2) {
          this.wavesurfer.setPlaybackRate(temp)
          this.rate = temp
        }
      } else if (flag < 0) {
        let temp = (Math.round(val * 100) - 15) / 100
        let speed = 1 - val * flag
        if (Math.round(temp * 100 * -1) >= 40) {
          this.wavesurfer.setPlaybackRate(speed)
          this.rate = temp
        }
      }
    },
    /* setPlaybackRate (flag) {
        if (this.rate >= 1 && flag > 0) {
          let temp = this.rate + flag * this.operateUnit
          if (temp <= 2) {
            this.wavesurfer.setPlaybackRate(temp)
            this.rate = temp
          }
        } else if (this.rate <= 1 && flag < 0) {
          let temp = (Math.round(this.rate * 100) - 15) / 100
          if (Math.round(temp * 100) >= 40) {
            this.wavesurfer.setPlaybackRate(temp)
            this.rate = temp
          }
        } else if (this.rate > 1 && flag < 0) {
          let temp = (this.rate * 100 + flag * 25) / 100
          this.wavesurfer.setPlaybackRate(temp)
          this.rate = temp
        } else if (this.rate < 1 && flag > 0) {
          let temp = (Math.round(this.rate * 100) + 15) / 100
          this.wavesurfer.setPlaybackRate(temp)
          this.rate = temp
        }
      } */
  },
  watch: {
    recordFileURL: {
      immediate: true,
      handler: function(val) {
        if (val && val !== '') {
          this.$nextTick(() => this.initWaveSurfer())
        }
      },
    },

    callId(val) {
      let playerInfo = {
        isMaximization: true,
        voiceTotalTime: '',
        currentTime: '',
        timeSection: [],
      }
      this.$store.commit('setPlayerInfo', playerInfo)
      this.currentSS = 0
      this.wavesurfer && this.wavesurfer.destroy()
      this.$nextTick(() => this.initWaveSurfer())
    },
    currentSS(val) {
      this.currentTime = this.timeFilter(val)
      this.displayPlayProcess = (this.currentSS / this.voiceTotalTime) * 100
      let playInfo = {}
      playInfo.currentTime = val
      this.$store.commit('setPlayerInfo', playInfo)
    },
    volume(val) {
      this.wavesurfer.setVolume(val / 100)
    },
    displayPlayProcess(val, oldval) {
      if (this.playerState === '1') {
        let newval = Math.round(val * 100)
        let newTime = (newval / 10000) * this.voiceTotalTime
        let interval = val * 10000 - oldval * 10000
        let unit = (1 / this.voiceTotalTime) * 100 * 10000
        if (
          this.isMaximization === false &&
          ((interval > unit * 2 && interval > 0) ||
            (interval < -unit * 2 && interval < 0))
        ) {
          this.currentSS = newTime
          if (this.wavesurfer.isPlaying()) {
            this.wavesurfer.play(Math.round(newTime))
          }
        }
      }
    },
    timeSection(val) {
      // 处理时间格式
      if (val && val[1]) {
        this.wavesurfer.play(val[0] / 1000, val[1] / 1000)
      } else if (val && val[0]) {
        this.wavesurfer.play(val[0] / 1000)
      }
    },
    wavesurfer: {
      handler() {
        if (this.wavesurfer.isPlaying()) {
          this.playerState = '1'
        } else {
          this.playerState = '0'
        }
      },
      deep: true,
    },
    isMaximization(val) {
      this.volumeControl = false
    },
  },
  computed: {
    isMaximization() {
      return this.$store.state.playerInfo.isMaximization
    },
    voiceTotalTime() {
      let total = 0
      let time = this.$store.state.playerInfo.voiceTotalTime
      if (!time) {
        return total
      }
      let times = time.split(':')
      let ss = Math.ceil(times.pop())
      total += ss
      if (times.length !== 0) {
        let mm = parseInt(times.pop())
        total += mm * 60
      }
      if (times.length !== 0) {
        let hh = parseInt(times.pop())
        total += hh * 60 * 60
      }
      return total
    },
    totalTime() {
      return this.timeFilter(this.voiceTotalTime)
    },
    orderFlag() {
      return this.$store.state.recordingPlayPage.orderFlag
    },
    callId() {
      return this.$store.state.recordingPlayPage.callId
    },
    recordFileURL() {
      return this.$store.state.recordingPlayPage.recordFileURL
    },
    timeSection() {
      return this.$store.state.playerInfo.timeSection
    },
    playerInfoStore() {
      return this.$store.state.playerInfo
    },
  },
  mounted() {},
  filters: {
    formatter(val) {
      if (val === 1) {
        return '正常'
      } else if (val > 1) {
        return (val * 100) / 100 + 'X'
      } else if (val < 1) {
        let temp = Math.round(val * 100 * -1)
        if (temp === 90) {
          return '0.25X'
        } else if (temp === 65) {
          return '0.5X'
        } else if (temp === 40) {
          return '0.75X'
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
@playerHeight: 60px;
@controlBtnsHeight: 40px;
.maximization {
  position: absolute;
  right: 0;
  left: 0px;
  bottom: 0;
  height: @playerHeight;
  background: #324157;
  z-index: 1;
  #waveform {
    position: absolute;
    left: 290px;
    right: 230px;
    background: #1f2d3d;
    height: 60px;
  }
  .circle {
    width: @controlBtnsHeight;
    height: @controlBtnsHeight;
    line-height: @controlBtnsHeight;
    border-radius: 50%;
    border: 2px solid #cacaca;
    float: left;
    cursor: pointer;
    margin: 3px 10px;
    text-align: center;
    color: #cacaca;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      background: #2a3a4d;
    }
  }
  .curTime {
    color: #cacaca;
    line-height: @playerHeight;
    width: 60px;
    text-align: center;
    position: absolute;
    left: 230px;
  }
  .speed {
    color: #cacaca;
    width: 45px;
    text-align: center;
    position: absolute;
    top: 18px;
    left: 187px;
    height: 15px;
    line-height: 15px;
    border: 1px solid #cacaca;
    border-radius: 3px;
    cursor: pointer;
  }
  .voiceTotalTime {
    width: 60px;
    line-height: @playerHeight;
    position: absolute;
    right: 150px;
    color: #cacaca;
  }
  .player_volume {
    width: 45px;
    height: 45px;
    line-height: 45px;
    border-radius: 50%;
    position: absolute;
    right: 130px;
    text-align: center;
    color: #cacaca;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    margin-top: 3px;
    background: url('../../assets/img/volume-2.png') no-repeat;
    background-position: center;
    background-size: 30px;
    &:hover {
      opacity: 0.8;
    }
  }
  .volume_container {
    text-align: center;
    position: absolute;
    width: 100px;
    right: 30px;
    top: 5px;
  }
}

.minimization {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 220px;
  height: @playerHeight * 3;
  z-index: 2500;
  background: #293547;
  transform: translate(0%, 0%);
  .recordId {
    width: 100px;
    line-height: 45px;
    color: #cacaca;
    padding-left: 10px;
    overflow: hidden;
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  #waveform {
    position: absolute;
    left: 270px;
    right: 120px;
    background: #1f2d3d;
    display: none;
  }
  wave {
    display: none !important;
  }
  .player_btns {
    position: absolute;
    top: 40px;
    height: 50px;
    line-height: 50px;
    left: 15px;
  }
  .circle {
    float: none;
    width: @controlBtnsHeight - 5;
    height: @controlBtnsHeight - 5;
    line-height: @controlBtnsHeight - 5;
    border-radius: 50%;
    border: 2px solid #cacaca;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin: 3px 10px;
    text-align: center;
    color: #cacaca;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      background: #2a3a4d;
    }
  }
  .play {
    width: @controlBtnsHeight;
    height: @controlBtnsHeight;
    line-height: @controlBtnsHeight;
  }
  .curTime {
    color: #cacaca;
    line-height: 36px;
    width: 40px;
    text-align: center;
    position: absolute;
    bottom: 10px;
  }
  .voiceTotalTime {
    width: 40px;
    line-height: 36px;
    position: absolute;
    right: 0px;
    bottom: 10px;
    color: #cacaca;
  }
  .playProcess {
    position: absolute;
    left: 50px;
    right: 50px;
    bottom: 10px;
  }
  .player_volume {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 40px;
    text-align: center;
    color: #cacaca;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    top: 0px;
    background: url('../../assets/img/volume-2.png') no-repeat;
    background-position: center;
    background-size: 25px;
    &:hover {
      opacity: 0.8;
    }
  }
  .volume_container {
    text-align: center;
    position: absolute;
    width: 10px;
    right: 65px;
    bottom: 145px;
  }
  .maximize {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    text-align: center;
    color: #cacaca;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    top: 0px;
    background: url('../../assets/img/fullscreen.png') no-repeat;
    background-position: center;
    background-size: 24px;
    &:hover {
      opacity: 0.8;
    }
  }
}

// 扩展class
.player.maximization {
  @media only screen and (min-height: 776px) {
    &.recordingPlay {
      position: absolute;
      top: 46px;
      left: 50%;
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
      width: calc(~'100% - 40px');
      z-index: 9998;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
  @media only screen and (max-height: 776px) {
    &.recordingPlay {
      position: absolute;
      top: 46px;
      left: 50%;
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
      width: calc(~'100% - 40px');
      z-index: 9998;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
  /*@media only screen and (max-height: 776px) {
      &.recordingPlay {
        position: fixed;
        left: 50%;
        bottom: 0;
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 90%;
        z-index: 99999;
      }
    }*/
}
</style>
<style lang="less">
.el-popover.speedPopover {
  top: 100px !important;
  min-width: 80px !important;
}
.radio-group {
  .el-radio {
    display: block;
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
    margin: 0 0 30px 0;
    &.last-radio {
      margin: 0;
    }
    .el-radio__input {
      display: none;
    }
    .el-radio + .el-radio {
      margin: 0;
    }
  }
}
.el-message {
  z-index: 9999 !important;
}
</style>
