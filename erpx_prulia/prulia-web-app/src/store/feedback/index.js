import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  loaded: false
}

const getters = {
  ...make.getters(state)
}
const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state),
  submit({ rootGetters }, data) {
    const member = rootGetters['auth/member']

    return axios({
      url:
        '/api/method/erpx_prulia.prulia_members.doctype.prulia_feedback.prulia_feedback.submit_feedback',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: JSON.stringify({
        ...data,
        member: member.name,
        member_name: member.full_name
      })
    })
  },
  load({ commit }) {
    return axios
      .get(
        `/api/method/erpx_prulia.prulia_members.doctype.prulia_feedback_category.prulia_feedback_category.get_categories`
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
