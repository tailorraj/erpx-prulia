import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  loaded: false,
  popups: [],
  showPopup: false
}

const getters = {
  ...make.getters(state),
  hasNews: state => state.all.length > 0,
  popups: (state, getters, rootState, rootGetters) =>
    state.popups.filter(function(news) {
      let filters = ['position', 'region', 'branch'],
        ret = true

      filters.forEach(function(filter) {
        let arr

        if (ret && news[filter].length) {
          if (rootGetters['auth/member']) {
            //if member exists, check if member match any of the filters
            arr = news[filter].map(function(el) {
              return el.name
            })
            if (arr.indexOf(rootGetters['auth/member'][filter]) === -1) {
              ret = false
            }
          }
          //if no member exists, and andy filter found on news shouldnt not show
          else {
            ret = false
          }
        }
      })

      return ret
    }),
  shouldShowPopup: (state, getters) => state.showPopup && getters.popups.length
}
const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state),
  togglePopup({ commit }, show) {
    commit('SET_SHOW_POPUP', show)
  },
  loadPopup({ commit }) {
    axios
      .get(
        `/api/method/erpx_prulia.prulia_news.doctype.prulia_newsletter.prulia_newsletter.get_newsletter_popup`
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_POPUPS', message || [])
      })
  },
  load({ commit }) {
    axios
      .get(
        `/api/method/erpx_prulia.prulia_news.doctype.prulia_newsletter.prulia_newsletter.get_newsletter_list`
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_ALL', message || [])
        commit('SET_LOADED', true)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
