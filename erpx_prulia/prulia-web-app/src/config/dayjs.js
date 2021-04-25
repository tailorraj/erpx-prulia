import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin

dayjs.extend(isLeapYear) // use plugin

export default dayjs
