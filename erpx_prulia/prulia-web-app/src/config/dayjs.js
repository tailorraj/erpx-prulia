import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import * as calendar from 'dayjs/plugin/calendar'

dayjs.extend(isLeapYear) // use plugin
dayjs.extend(calendar)

export default dayjs
