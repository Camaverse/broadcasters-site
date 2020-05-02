import vm from '../main.js'
import Vue from 'vue'

const emit = (event, data) => {
  if (!vm) {
    setTimeout(() => { emit(event, data) }, 10)
  } else {
    vm.$socket.COINS_SERVICE.emit(event, data)
  }
}

const actions = {
  COINS_SERVICE_CONNECTED: ({ dispatch, state, rootState }, socketID) => {
    console.log('COINS_SERVICE_CONNECTED', socketID)
  }
}

const actionsList = []
actionsList.forEach(action => {
    actions[action] = (obj, data) => emit(action, data)
})

export const coins = {
  namespaced: true,
  state: {

    service_connected: false
  },
  mutations: {},
  actions
}
