<template>
  <div class="homePage" id="homePage">
    <div
      class="content"
      v-bind:class="
        roleCodeId.includes('qa_suvs') && roleCodeId.includes('qa')
          ? 'autoContent'
          : 'flexContent'
      "
    >
      <div class="content-header">首页</div>
      <div class="totalBox fixedTotalBox" v-if="roleCodeId.includes('qa_suvs')">
        <div class="same-box publicBox">
          <div class="same-box-header align-center">
            <span class="same-box-header-title">未处理的申诉管理</span>
          </div>
          <div class="same-box-content small">
            <div class="myQaTask">
              <div class="qaTaskNums">
                <p>
                  <em @click="push('IVSshensuguanli')">{{ waitTask }}</em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="same-box publicBox">
          <div class="same-box-header align-center">
            <span class="same-box-header-title">待审核的案例</span>
          </div>
          <div class="same-box-content small">
            <div class="myQaTask">
              <div class="qaTaskNums">
                <p>
                  <em @click="push('caseManage_new')">{{ waitCheck }}</em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="same-box publicBox">
          <div class="same-box-header align-center">
            <span class="same-box-header-title">待制定的校准会标准成绩</span>
          </div>
          <div class="same-box-content small">
            <div class="myQaTask">
              <div class="qaTaskNums">
                <p>
                  <em @click="push('qaCalibration', 2)">{{ waitScore }}</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="totalBox select_box" v-if="roleCodeId.includes('qa_suvs')">
        <el-select v-model="timeSolt" @change="changeTimeSolt">
          <el-option
            v-for="item in timeSolts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="totalBox flexTotalBox" v-if="roleCodeId.includes('qa_suvs')">
        <div v-show="true" class="same-box publicBox middle">
          <div class="same-box-header">
            <span class="same-box-header-title">质检任务完成情况</span>
            <span class="same-box-header-more" @click="push('taskManage')"> </span>
          </div>
          <div class="same-box-content">
            <div style="width: 100%; height:100%;">
              <div id="qaTaskMonitor" style="width:100%; height: 100%;"></div>
            </div>
          </div>
        </div>
        <div v-show="true" class="same-box publicBox">
          <div class="same-box-header">
            <span class="same-box-header-title">质检成绩查看</span>
            <span class="same-box-header-more" @click="push('scoreResultInfo')"></span>
          </div>
          <div class="same-box-content">
            <div style="width: 100%; height: 100%;">
              <div id="scoreChart" style="width:100%; height: 100%;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="totalBox fixedTotalBox middle" v-if="roleCodeId.includes('qa')">
        <div v-show="true" class="same-box publicBox">
          <div class="same-box-header">
            <span class="same-box-header-title">初检任务(待完成)</span>
          </div>
          <div class="same-box-content middle">
            <div class="myQaTask">
              <ul class="qualityResults">
                <li v-for="(item, index) in fistQaTask" :key="index">
                  <span class="count-color" @click="push('myQaTasks', 1)">{{
                    item.projectName
                  }}</span
                  ><span class="projectName"
                    >{{ item.finish }}/{{ item.count }}({{ item.persent }})</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-show="true" class="same-box publicBox">
          <div class="same-box-header">
            <span class="same-box-header-title">复检任务(待完成)</span>
          </div>
          <div class="same-box-content middle">
            <div class="myQaTask">
              <ul class="qualityResults">
                <li v-for="(item, index) in secondQatask" :key="index">
                  <span class="count-color" @click="push('myQaTasks', 2)">{{
                    item.projectName
                  }}</span
                  ><span class="projectName"
                    >{{ item.finish }}/{{ item.count }}({{ item.persent }})</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-show="true" class="same-box publicBox">
          <div class="same-box-header">
            <span class="same-box-header-title">其他任务</span>
          </div>
          <div class="same-box-content middle">
            <div class="myQaTask">
              <ul class="qualityResults">
                <li>
                  复议任务<span
                    class="projectName count-color"
                    @click="push('myQaTasks', 3)"
                    >{{ otherTask1 }}</span
                  >
                </li>
                <li>
                  我的质检校准会<span
                    class="projectName count-color"
                    @click="push('qaCalibration', 2)"
                    >{{ otherTask2 }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="totalBox flexTotalBox" v-if="roleCodeId.includes('qa')">
        <div v-if="true" class="same-box publicBox large">
          <div class="same-box-header nobg">
            <span class="same-box-header-title">我的公告</span>
            <span class="same-box-header-more" @click="push('my_message')">
              全部公告>
            </span>
          </div>
          <div class="same-box-content large">
            <div class="table-box">
              <el-table :data="myMsgList" border>
                <el-table-column prop="content" label="公告标题">
                  <template scope="scope">
                    <el-button
                      type="text"
                      style="padding: 10px 0;"
                      @click="showDetail(scope.row.detailId)"
                    >
                      {{ scope.row.content }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  width="300"
                  :formatter="createTimeFilter"
                  sortable
                  label="创建时间"
                >
                </el-table-column>
              </el-table>
            </div>
            <div class="page-box">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="totalCount"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看消息 -->
    <el-dialog
      title="公告"
      :visible.sync="messageDetailVisible"
      :close-on-click-modal="false"
      :before-close="handleClosemessageDetail"
    >
      <div class="messageContent">
        <div class="massage_header">
          <h2>
            {{ detailMessage.content }}
          </h2>
        </div>
        <p>
          {{ detailMessage.messageContent }}
        </p>
        <div class="btns">
          <el-button @click="handleClosemessageDetail">取消</el-button>
          <el-button type="primary" @click="handleClosemessageDetail">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Qs from 'qs'
import moment from 'moment'
import global from '../../../global.js'
import cache from '../../../utils/cache.js'
let qualityUrl = global.qualityUrl
import matchRoleId from '../../../utils/matchRoleId'
// import formatDate from '../../../utils/formatdate.js'
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      role: '', // 角色
      roleId: '', // 角色Id
      roleCodeId: [], // 角色Id编码
      myMsgList: [],
      timeSolts: [
        {
          label: '昨天',
          value: 1,
        },
        {
          label: '最近一周',
          value: 2,
        },
      ],
      timeSolt: 1, // 时间范围，默认1：昨天，2：最近一周
      fistQaTask: [], // 待完成初检任务
      secondQatask: [], // 待完成复检任务
      otherTask1: 0, // 复议任务
      otherTask2: 0, // 我的质检校准会
      waitTask: 0, // 未处理的申诉管理
      waitCheck: 0, // 待审核的案例
      waitScore: 0, // 待处理的校准标准评分
      taskRate: [], // 质检任务完成情况
      ScoreRate: [], // 质检成绩查看
      messageDetailVisible: false,
      detailMessage: {},
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getMsgList()
    },
    createTimeFilter(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    push(url, qaType) {
      if (url === 'my_message') {
        localStorage.setItem('isFromHome', 'true')
      }
      if (url === 'myQaTasks') {
        let obj = {
          fromPage: 'homepage',
          qaScoreType: qaType,
        }
        this.$store.commit('setRecordingPlayPage', obj)
      } else if (url === 'qaCalibration') {
        let obj = {
          fromPage: 'homepage',
          calibrateTaskState: qaType,
        }
        this.$store.commit('setRecordingPlayPage', obj)
      } else if (url === 'caseManage_new') {
        let obj = {
          fromPage: 'homepage',
        }
        this.$store.commit('setRecordingPlayPage', obj)
      }
      this.$router.push('/' + url)
    },
    getIndexData() {
      let params = {
        timeSolt: this.timeSolt,
      }
      let that = this
      this.axios
        .post(qualityUrl + '/ipd/queryIndexData.do', Qs.stringify(params))
        .then((res) => {
          that.waitTask = res.data.waitTask
          that.waitCheck = res.data.waitCheck
          that.waitScore = res.data.waitScore
          that.otherTask1 = res.data.otherTask1
          that.otherTask2 = res.data.otherTask2
          that.fistQaTask = res.data.fistQaTask ? res.data.fistQaTask.data : []
          that.secondQatask = res.data.secondQatask ? res.data.secondQatask.data : []
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    qaUserLoginInfo() {
      let params = {}
      this.axios
        .post(qualityUrl + '/login/addQaUserLoginInfo.do', Qs.stringify(params))
        .then((res) => {
          if (res.data) {
            console.log('质检员信息录入成功')
          } else {
            console.log('质检员信息录入失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getMsgList() {
      let _this = this
      let params = {}
      params.pagesize = this.pageSize
      params.pageindex = this.pageIndex
      params.begin = 1
      params.end = 1
      this.axios
        .post(qualityUrl + '/AbcByLogin/queryInbox.do', Qs.stringify(params))
        .then(function(response) {
          _this.myMsgList = response.data.Data
          _this.totalCount = response.data.Count
        })
        .catch(function() {
          /* _this.$message({
            type: 'error',
            message: '获取公告列表出现问题'
          }) */
        })
    },
    changeTimeSolt(val) {
      this.timeSolt = val
      this.getIndexTaskData()
    },
    getIndexTaskData() {
      let params = {
        timeSolt: this.timeSolt,
      }
      let that = this
      this.axios
        .post(qualityUrl + '/ipd/findIndexDataByTimeSolt.do', Qs.stringify(params))
        .then((res) => {
          that.taskRate = res.data.taskRate
          that.ScoreRate = res.data.ScoreRate
          that.getTaskChart(res.data.taskRate)
          that.getScoreChart(res.data.ScoreRate)
        })
        .catch(function(error) {
          console.log(error)
        })
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
      let _this = this
      let ids = id.split(',')
      let parames = {
        code: global.roleCode.toString()
      }
      this.axios
        .post(qualityUrl + '/pageConstant/getRoleIdByCode.do', Qs.stringify(parames))
        .then((res) => {
          if (_this.role == '超级管理员') {
            _this.roleCodeId = '超级管理员'
          } else {
            let resdata = res.data
            _this.roleCodeId = matchRoleId.match(ids,resdata)
          }
          console.log('11111111++++pppppmmmm'+_this.roleCodeId)
          if (_this.roleCodeId.includes('seatman')) {
            _this.$router.push('/seatHome')
          } else if (_this.roleCodeId.includes('headman')) {
            _this.$router.push('/IVSshensuguanli')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getTaskChart(taskData) {
      let _this = this
      let qaTaskMonitor = _this.$echarts.init(document.getElementById('qaTaskMonitor'))
      let qaTaskMonitorOption = {
        backgroundColor: '#f3f3f3',
        color: ['#50b4ff', '#40e0b0', '#324157', '#a0a7e6', '#c4ebad', '#96dee8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          textStyle: {
            color: '#5e6d82',
            fontSize: 14,
            fontWieght: 'normal',
          },
        },
        grid: {
          top: '10',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '待质检',
            type: 'bar',
            barGap: 0,
            data: [],
            label: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: '已质检',
            type: 'bar',
            barGap: 0,
            data: [],
            label: {
              normal: {
                show: false,
              },
            },
          },
        ],
      }
      let x = []
      let todoData = []
      let doneData = []
      for (let key in taskData) {
        x.push(taskData[key].qaUser)
        todoData.push(taskData[key].noQaCount)
        doneData.push(taskData[key].hasQaCount)
      }
      qaTaskMonitorOption.xAxis.data = x
      qaTaskMonitorOption.series[0].data = todoData
      qaTaskMonitorOption.series[1].data = doneData
      qaTaskMonitor.setOption(qaTaskMonitorOption)
    },
    getScoreChart(scoreData) {
      let _this = this
      let scoreChart = _this.$echarts.init(document.getElementById('scoreChart'))
      let scoreChartOption = {
        backgroundColor: '#f3f3f3',
        color: ['#50b4ff', '#40e0b0', '#324157', '#a0a7e6', '#c4ebad', '#96dee8'],
        tooltip: {
          trigger: 'item',
        },
        title: {
          textStyle: {
            color: '#5e6d82',
            fontSize: 14,
            fontWieght: 'normal',
          },
        },
        grid: {
          top: '10',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'bottom',
          data: [],
        },
        series: [
          {
            type: 'pie',
            stillShowZeroSum: false,
            center: ['50%', '50%'],
            labelLine: {
              show: false,
            },
            label: {
              show: false,
              normal: {
                show: false,
              },
            },
            minAngle: 5,
            data: [],
          },
        ],
      }
      let x = []
      let seriesData = []
      // scoreData = [
      //   {'qaCount': null, 'qaUser': null, 'status': null, 'assignDate': null, 'startAssignDate': null, 'endAssignDate': null, 'scoreMin': 0.0, 'scoreMax': 10.0, 'description': '1-10', 'sum': 0},
      //   {'qaCount': null, 'qaUser': null, 'status': null, 'assignDate': null, 'startAssignDate': null, 'endAssignDate': null, 'scoreMin': 10.0, 'scoreMax': 20.0, 'description': '10-20', 'sum': 0},
      //   {'qaCount': null, 'qaUser': null, 'status': null, 'assignDate': null, 'startAssignDate': null, 'endAssignDate': null, 'scoreMin': 10.0, 'scoreMax': 20.0, 'description': '30-40', 'sum': 0},
      //   {'qaCount': null, 'qaUser': null, 'status': null, 'assignDate': null, 'startAssignDate': null, 'endAssignDate': null, 'scoreMin': 20.0, 'scoreMax': 30.0, 'description': '20-30', 'sum': 0}]
      for (let key in scoreData) {
        x.push(scoreData[key].description)
        let obj = {
          value: scoreData[key].sum,
          name: scoreData[key].description,
        }
        seriesData.push(obj)
      }
      scoreChartOption.legend.data = x
      scoreChartOption.series[0].data = seriesData
      scoreChart.setOption(scoreChartOption)
    },
    showDetail(id) {
      let _this = this
      let params = {}
      let url = qualityUrl + '/AbcByLogin/getMessageManageViewById.do'
      params.id = id
      this.axios
        .post(url, Qs.stringify(params))
        .then(function(response) {
          _this.messageDetailVisible = true
          _this.detailMessage = response.data
        })
        .catch(function() {
          _this.$message({
            type: 'error',
            message: '公告详情获取失败',
          })
        })
    },
    handleClosemessageDetail() {
      this.messageDetailVisible = false
    },
  },
  computed: {
    accountId() {
      return this.$store.state.loginUserinfo.accountId
    },
  },
  created() {
    if (this.$route.query.page && this.$route.query.page.toString() == 'assistant') {
      cache.setItem('sliderMenu', this.$route.query.sliderMenu)
      cache.setItem('account', this.$route.query.account)
      cache.setItem('userInfo', this.$route.query.userInfo)
      cache.setItem('token', this.$route.query.token)
      cache.setItem('tgt_id', this.$route.query.token)
      cache.setItem('roleInfo', this.$route.query.roleInfo)
      this.$store.commit('setLoginUserinfo', this.$route.query.userInfo)
      this.$store.commit('setToken', this.$route.query.token)
    }
    this.qaUserLoginInfo()
    this.initActRole()
    this.getIndexData()
    this.getIndexTaskData()
    this.getMsgList()
  },
}
</script>
<style scope="scope" lang="less">
.homePage {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  .content {
    .content-header {
      padding-bottom: 18px;
      font-size: 14px;
      color: #1f2d3d;
      font-weight: 600;
    }
    .totalBox {
      display: -webkit-flex; /* Safari */
      display: flex;
      // width: 100%;
      flex-wrap: wrap;
      justify-content: flex-start;
      &.select_box {
        justify-content: flex-end;
        padding-bottom: 20px;
      }
      .publicBox {
        margin-bottom: 20px;
        flex: 1;
        margin-right: 15px;
        &:last-child {
          margin-right: 0px;
        }
        &.large {
          flex: 1;
        }
        &.middle {
          flex: 2;
        }
      }
      .same-box {
        float: left;
        border: 1px solid #dfe6ec;
        .same-box-piecontent {
          width: 100%;
          height: 100%;
        }
        .same-box-content {
          height: 200px;
          overflow: auto;
          padding: 10px;
          &.small {
            height: 100px;
          }
          &.middle {
            height: 150px;
          }
          &.large {
            height: 450px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            .table-box {
              flex: 1;
              overflow: auto;
            }
            .page-box {
              height: 32px;
              text-align: right;
            }
          }
          .qualityResults {
            cursor: pointer;
            height: 100%;
            width: 90%;
            // margin-left: 15%;
            li {
              // border-bottom: 1px dashed #d1dbe5;
              height: 35px;
              line-height: 35px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              .projectName {
                display: inline-block;
                float: right;
              }
              .count-color {
                color: #20a0ff;
              }
            }
          }
          .myQaTask {
            float: left;
            width: 100%;
            height: 100%;
            .qaTaskNums {
              width: 100%;
              text-align: center;
              p {
                text-align: center;
                font-size: 18px;
                em {
                  color: #20a0ff;
                  font-size: 52px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .same-box-header {
          height: 44px;
          line-height: 44px;
          background: #eff2f7;
          &.align-center {
            text-align: center;
          }
          &.nobg {
            background: #fff;
            .same-box-header-more {
              background-image: none;
              width: 68px;
              color: #20a0ff;
              margin-top: 0;
              line-height: 44px;
            }
          }
          .same-box-header-more {
            background: url('../../../assets/img/home-more.png') center no-repeat;
            width: 12px;
            margin-top: 15px;
            cursor: pointer;
            height: 12px;
            float: right;
            padding-right: 10px;
            font-size: 14px;
          }
          .same-box-header-title {
            color: #5e6d82;
            font-size: 14px;
            font-weight: bold;
            padding-left: 10px;
          }
        }
      }
    }
  }
  .autoContent {
    overflow: auto;
    padding: 18px 18px 0px;
  }
  .flexContent {
    display: flex;
    flex-direction: column;
    padding: 0 !important;
    height: 100%;
    .content-header {
      height: 21px;
      padding: 18px;
    }
    .flexTotalBox {
      flex: 1;
      padding: 0px 18px;
      .publicBox {
        position: relative;
      }
      .same-box .same-box-content {
        top: 54px;
        position: absolute;
        height: auto !important;
        left: 10px;
        right: 10px;
        bottom: 10px;
      }
    }
    .fixedTotalBox {
      height: 186px;
      padding: 0px 18px;
      &.middle {
        height: 236px;
      }
    }
    .select_box {
      height: 40px;
      padding: 0px 18px;
    }
  }
  .btns {
    text-align: right;
  }
  .messageContent {
    .massage_header {
      h2 {
        text-align: center;
      }
    }
    p {
      padding: 10px 0px;
    }
  }
}
</style>
<style lang="less">
.homePage {
  .same-box-content .table-box .el-table__header th {
    background-color: #eff2f7;
    color: #475669;
    padding: 10px 0;
  }
}
</style>
