export default function(today, yestoday) {
  if (today == 0 || yestoday == 0) {
    return ''
  }
  if (today - yestoday > 0) {
    return 'fc-red'
  }
  if (today - yestoday < 0) {
    return 'fc-green'
  }
}
