import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  snackbar: {
    status: false,
    text: '',
    type: 'default',
    timeout: 4000
  }
}

const getters = {
  ...make.getters(state),
  hasNews: getters => getters.all.length > 0,
  snackbar(state) {
    return state.snackbar
  }
}
const mutations = {
  ...make.mutations(state),
  TOGGLE_SNACKBAR(state, { text, type, timeout }) {
    state.snackbar.text = text
    state.snackbar.type = type
    state.snackbar.timeout = timeout
    state.snackbar.status = true
  },
  HIDE_SNACKBAR(state) {
    state.snackbar.status = false
  }
}

const actions = {
  ...make.actions(state),
  load({ commit }) {
    axios
      .get(
        `/api/method/erpx_prulia.prulia_news.doctype.prulia_home.prulia_home.get_home`
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_ALL', message?.content || [])
      })
  },
  showSnackbar(
    { commit },
    { text = null, message = null, type = null, status = null, timeout = null }
  ) {
    text =
      text || message || 'Sorry, there was an error in processing your request.'
    type = type || status || 'default'
    timeout = timeout || 4000
    commit('TOGGLE_SNACKBAR', { text, type, timeout })
  },

  hideSnackbar({ commit }) {
    commit('HIDE_SNACKBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
