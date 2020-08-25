/**
 * Created by renxiaoyi on 2018/10/18.
 */
/*
 * 关系图配置
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
let graphEcharts = {
  color: colorList,
  title: {
    text: '热词相关',
    textStyle: {
      fontSize: '14',
    },
    top: 'top',
    left: 'left',
  },
  tooltip: {},
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      zoom: 0.2,
      name: '热词相关',
      type: 'graph',
      layout: 'force',
      data: [],
      force: {
        // gravity: 0.1,
        // symbol: 'pin',
        edgeLength: [30, 200], // 线的长度，这个距离也会受 repulsion，支持设置成数组表达边长的范围
        repulsion: 200, // 节点之间的斥力因子。值越大则斥力越大
      },
      draggable: true, // 指示节点是否可以拖动
      links: [],
      categories: [],
      roam: true,
      focusNodeAdjacency: true,
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3,
      },
      emphasis: {
        lineStyle: {
          width: 10,
        },
      },
    },
  ],
}
export default graphEcharts
