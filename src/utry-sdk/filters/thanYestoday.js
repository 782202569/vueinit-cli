export default function(today, yestoday) {
  let diff = (Math.abs(today - yestoday) / yestoday).toFixed(4) * 100 + '%'

  if (today == 0 || yestoday == 0) {
    return ' 无'
  }

  if (today - yestoday > 0) {
    return '↑' + diff
  }
  if (today - yestoday < 0) {
    return '↓' + diff
  }
}
