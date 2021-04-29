import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  member: null,
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
  getMember({ commit }) {
    return axios
      .get(
        '/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.mobile_member_login',
        {
          withCredentials: true
        }
      )
      .then(response => {
        let { data } = response
        let { message } = data

        commit('SET_MEMBER', message)
        return true
      })
      .finally(() => {
        commit('SET_LOADED', true)
      })
  },
  updateMemberDetails({ commit }, data) {
    return axios
      .post(
        '/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.update_member_pref',
        data
      )
      .then(response => {
        let { data } = response
        let { message } = data

        commit('SET_MEMBER', message)
        return true
      })
  },
  login({ dispatch }, params) {
    return fetch('/api/method/login', {
      headers: {
        accept: '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest'
      },
      body: `usr=${params.usr}&pwd=${params.pwd}&device=desktop`,
      method: 'POST',
      mode: 'cors',
      credentials: 'include'
    }).then(async response => {
      let data = await response.json()
      if (response.ok) {
        return dispatch('getMember')
      } else return Promise.reject({ response: { data } })
    })
  },
  logout({ commit }) {
    commit('SET_MEMBER', null)
    return axios.get(`/api/method/logout`)
  },
  load({ dispatch }) {
    return axios.get(`/api/method/frappe.auth.get_logged_user`).then(() => {
      return dispatch('getMember')
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
