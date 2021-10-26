import Cookies from 'js-cookie'

const state = {
  token: '',
  opened: false
}

const mutations = {
  openSidebar: (state) => {
    state.opened = true;
  },
  closeSidebar: (state) => {
    state.opened = false;
  },
  setToken: (state, value) => {
    state.token = value;
    window.localStorage.setItem('app_token', value);
  },
  removeToken: (state) => {
    state.token = null;
    window.localStorage.removeItem('app_token');
  }
}

const actions = {
  openSidebar: ({ commit }) => {
    commit('openSidebar');
  },
  closeSidebar: ({ commit }) => {
    commit('closeSidebar');
  },
  setToken: ({ commit }, value) => {
    commit('setToken', value);
  },
  removeToken({ commit }) {
    commit('removeToken');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
