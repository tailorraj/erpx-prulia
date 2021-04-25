import Vue from 'vue'
import dayjs from '@/config/dayjs'

Vue.filter('formatDate', (date, format) => {
  return dayjs(date).format(format)
})

Vue.filter('formatCurrency', data => {
  return Number(data).toFixed(2)
})
