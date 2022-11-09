export function isPositive (num) {
  return (Math.sign(num) >= 0 ? true : false)
}

export function todaysDate () {
  let date = new Date()
  let dateArr = date.toString().split(' ')
  let shortDateArr = dateArr.splice(1,3)
  const convertMonth = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  }
  let monthNum = convertMonth[shortDateArr[0]]
  shortDateArr.shift()
  shortDateArr.unshift(monthNum)
  let year = shortDateArr.pop()
  shortDateArr.unshift(year)
  return shortDateArr
}

export function findNextDate(datesListObj) {
  let today = parseInt(todaysDate().join(''))
  let nextDateNum = 99999999
  let nextDate = ''
  for (const date in datesListObj) {
    let dateArr = date.split('-')
    let dateNum = parseInt(dateArr.join(''))
    if ((dateNum - today) > 0 && (dateNum < nextDateNum)) {
      nextDateNum = dateNum
      nextDate = date
    }
  }
  return nextDate
}

export function findLastDate(datesListObj) {
  let today = parseInt(todaysDate().join(''))
  let lastDateNum = 0
  let lastDate = ''
  for (const date in datesListObj) {
    let dateArr = date.split('-')
    let dateNum = parseInt(dateArr.join(''))
    if ((today - dateNum) >= 0 && (dateNum > lastDateNum)) {
      lastDateNum = dateNum
      lastDate = date
    }
  }
  return lastDate
}

