import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  loaded: false,
  lang: []
}

const getters = {
  ...make.getters(state)
}
const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state),
  register({ dispatch }, data) {
    return axios
      .post(
        '/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.add_attendance',
        data
      )
      .then(() => {
        return dispatch('load')
      })
  },
  updatePref({ dispatch }, data) {
    return axios
      .post(
        '/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.update_training_trainee',
        data
      )
      .then(() => {
        return dispatch('load')
      })
  },
  load({ commit }) {
    return axios
      .get(
        `/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.get_training_list_web`
      )
      .then(responses => {
        let { data } = responses
        let { message } = data

        commit('SET_ALL', message || [])
        commit('SET_LOADED', true)
        return true
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
