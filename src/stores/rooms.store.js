import vm from '../main.js'
import Vue from 'vue'

const emit = (event, data) => {
  if (!vm) {
    setTimeout(() => { emit(event, data) }, 10)
  } else {
    vm.$socket.ROOM_SEARCH_SERVICE.emit(event, data)
  }
}

const actionsList = []
const actions = {
  GET_LIST: (obj, params) => {
    emit('GET_LIST', params)
  },
  REGISTER: (obj, params) => {
    emit('REGISTER', params)
  },
  ROOM_SEARCH_SERVICE_CONNECTED: ({ dispatch, state, rootState }, socketID) => {
    console.log('ROOM_SEARCH_SERVICE_CONNECTED', socketID)
    dispatch('REGISTER', rootState.user.slug);
  }
}
actionsList.forEach(action => {
  actions[action] = (obj, data) => emit(action, data)
})

export const rooms = {
  namespaced: true,
  state: {
    lists: {
      main: {
        loading: true,
        loaded: false,
        list: [],
        tag: null
      }
    }
  },
  mutations: {
    ROOM_SEARCH_SERVICE_GET_LIST: (state, { list, tag, type }) => {
      Vue.set(state.lists, tag, { tag, loading: false, loaded: true, list })
    }
  },
  actions
}
