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
        '/api/method/erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.add_attendance',
        data
      )
      .then(() => {
        return dispatch('load')
      })
  },
  updatePref({ dispatch }, data) {
    return axios
      .post(
        '/api/method/erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.update_event_attendee',
        data
      )
      .then(() => {
        return dispatch('load')
      })
  },
  load({ commit, rootGetters }) {
    let member = rootGetters['auth/member']
    let { position } = member || {}

    return Promise.all(
      [
        axios.get(
          `/api/method/erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.get_event_list_web`
        ),
        member &&
          axios.post(
            '/api/method/erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.get_lang',
            {
              position
            }
          )
      ].filter(Boolean)
    ).then(responses => {
      let { data } = responses[0]
      let { message } = data

      commit('SET_ALL', message || [])
      commit('SET_LANG', responses[1]?.data?.message || [])
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
