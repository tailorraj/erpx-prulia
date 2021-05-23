import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  loaded: false,
  meta: null,
  metaLoaded: false,
  comments: []
}

const getters = {
  ...make.getters(state),
  hasPedia: getters => getters.all.length > 0
}
const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state),
  createPedia({ dispatch }, data) {
    axios
      .post(
        '/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.create_new_post',
        data
      )
      .then(() => {
        dispatch('load')
      })
  },
  addComment({ commit, getters }, data) {
    return axios
      .post(
        '/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.add_comment',
        data
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_COMMENTS', [message, ...getters['comments']] || [])
      })
  },
  loadComments({ commit }, id) {
    axios
      .post(
        `/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.get_pedia_comments`,
        { id }
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_COMMENTS', message || [])
      })
  },
  loadMeta({ commit }) {
    axios
      .get(
        `/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.get_pedia_meta`
      )
      .then(({ data }) => {
        let { message } = data
        commit('SET_META', message?.fields || [])
        commit('SET_META_LOADED', true)
      })
  },
  load({ commit }, search = '') {
    axios
      .post(
        `/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.get_pedia_posts`,
        {
          search
        }
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
