import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  loaded: false,
  meta: null,
  metaLoaded: false
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
      .then(response => {
        console.log(response)
        dispatch('load')
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
