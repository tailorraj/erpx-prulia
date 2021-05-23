import Vue from 'vue'
import dayjs from '@/config/dayjs'

Vue.filter('formatDate', (date, format) => {
  return dayjs(date).format(format || 'DD MMM YYYY')
})

Vue.filter('formatCurrency', data => {
  return Number(data).toFixed(2)
})

Vue.filter('formatCalendar', (date, format) => {
  return dayjs(date).calendar(null, {
    sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
    lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
    sameElse: format || 'D MMM YYYY h:mm A' // Everything else ( 7/10/2011 )
  })
})
