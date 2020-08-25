/**
 * Created by renxiaoyi on 2018/10/18.
 */
/*
 * 折线图配置
 * */
const colorList = [
  '#1890FF',
  '#41D9C7',
  '#2FC25B',
  '#FACC14',
  '#E6965C',
  '#223273',
  '#7564CC',
  '#8543E0',
  '#5C8EE6',
  '#13C2C2',
  '#5CA3E6',
  '#3436C7',
  '#B381E6',
  '#F04864',
  '#D598D9',
]
let lineCharts = {
  color: colorList,
  title: {
    textStyle: {
      fontSize: '14',
    },
    left: 'left',
    text: '',
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '40',
    left: '5%',
    right: '5%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {},
  legend: {
    show: false,
    data: [],
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
  /* color: colorList,
  title: {
    textStyle: {
      fontSize: '14'
    },
    left: 'left',
    text: ''
  },
  xAxis: {},
  yAxis: {
    type: 'value'
  },
  grid: {
    top: '40',
    left: '10',
    right: '10',
    bottom: '10',
    containLabel: true
  },
  legend: {},
  tooltip: {},
  series: [] */
}
export default lineCharts
