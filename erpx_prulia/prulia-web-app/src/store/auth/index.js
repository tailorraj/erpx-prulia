import { make } from 'vuex-pathify'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

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
  forgotPassword(self, data) {
    return axios.post(
      '/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.forget_password',
      data
    )
  },
  changePassword(self, data) {
    return axios({
      url: '/api/method/frappe.core.doctype.user.user.update_password',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: JSON.stringify({
        ...data,
        logout_all_sessions: false
      })
    })
  },
  logout({ commit }) {
    commit('SET_MEMBER', null)
    return axios.get(`/api/method/logout`)
  },
  uploadPic({ commit, getters, dispatch }, data) {
    let member = cloneDeep(getters['member'])
    let member_name = member.name

    let { filedata, file_size, filename } = data

    return fetch('http://167.99.77.197', {
      headers: {
        accept: '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest'
      },
      referrer: 'http://167.99.77.197/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body:
        `from_form=1&is_private=0&cmd=uploadfile&doctype=PRULIA+Member&` +
        `docname=${member_name}&filename=${member_name +
          '_' +
          filename}&file_url=&filedata=${encodeURIComponent(
          filedata
        )}&file_size=${file_size}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'include'
    }).then(async response => {
      let data = await response.json()
      if (response.ok) {
        let { message } = data
        let { file_url } = message

        member.profile_photo = file_url
        commit('SET_MEMBER', member)

        return dispatch('updateMemberDetails', member)
      } else return Promise.reject({ response: { data } })
    })
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
