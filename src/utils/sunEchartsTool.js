/**
 * Created by renxiaoyi on 2018/10/18.
 */
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
let sunOption = {
  title: {
    text: '',
    textStyle: {
      fontSize: 14,
      align: 'center',
    },
    subtextStyle: {
      align: 'center',
    },
  },
  grid: {
    top: '2%',
    left: '5%',
    right: '5%',
    bottom: '3%',
    containLabel: true,
  },
  color: colorList,
  series: {
    type: 'sunburst',
    highlightPolicy: 'ancestor',
    data: [],
    radius: [0, '95%'],
    sort: null,
    levels: [{}],
  },
}
export default sunOption
