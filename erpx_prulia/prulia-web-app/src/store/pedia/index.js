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
  createPedia(opts, data) {
    return axios.post(
      '/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.create_new_post',
      data
    )
  },
  updatePedia(opts, data) {
    return axios.post(
      '/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.update_post',
      data
    )
  },
  uploadAttachment({ dispatch }, data) {
    return fetch('/', {
      headers: {
        accept: '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest'
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body:
        `from_form=1&is_private=0&cmd=uploadfile&doctype=PRULIA+Pedia&` +
        `docname=${data.docname}&attached_to_field=${data.fieldname}&filename=${
          data.filename
        }&file_url=&filedata=${encodeURIComponent(data.filedata)}&file_size=${
          data.file_size
        }`,
      method: 'POST',
      mode: 'cors',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(ret => {
        let { message } = ret
        let { file_url } = message

        return dispatch('updatePedia', {
          name: data.docname,
          [data.fieldname]: file_url
        })
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
