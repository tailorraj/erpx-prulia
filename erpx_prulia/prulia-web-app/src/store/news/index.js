import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: []
}

const getters = {
  ...make.getters(state),
  hasNews: getters => getters.all.length > 0
}
const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state),
  load({ commit }) {
    axios
      .get(
        `/api/method/erpx_prulia.prulia_news.doctype.prulia_newsletter.prulia_newsletter.get_newsletter_list`
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_ALL', message || [])
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
