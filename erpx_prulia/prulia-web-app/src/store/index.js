import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import news from './news'
import home from './home'
import auth from './auth'
import events from './events'
import training from './training'
import smartPartners from './smartPartners'
import feedback from './feedback'
import book from './book'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: {
    auth,
    home,
    news,
    events,
    training,
    smartPartners,
    feedback,
    book
  }
})
