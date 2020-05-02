import vm from '../main.js'
import Vue from 'vue'

const emit = (event, data) => {
  if (!vm) {
    setTimeout(() => { emit(event, data) }, 10)
  } else {
    vm.$socket.TRANSACTIONS_SERVICE.emit(event, data)
  }
}

const actions = {
  TRANSACTIONS_SERVICE_CONNECTED: ({ dispatch, state, rootState }, socketID) => {
    console.log('TRANSACTIONS_SERVICE_CONNECTED', socketID)
  }
}

for(const action in actions) {
    actions[action] = (obj, data) => emit(action, data)
}

export const transactions = {
  namespaced: true,
  state: {
    service_connected: false
  },
  mutations: {},
  actions
}
