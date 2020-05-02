// TODO: switch vue resource calls to fecth
import Vue from 'vue'
import vm from '../main.js'

const emit = (event, data) => {
  if (!vm) {
    setTimeout(() => { emit(event, data) }, 10)
  } else {
    vm.$socket.CHAT_SERVICE.emit(event, data)
  }
}

const actions = {}
const actionsList = []
actionsList.forEach(action => {
    actions[action] = (obj, data) => emit(action, data)
})

export const room = {
  namespaced: true,
  state: {
    room: {}
  },
  mutations: {},
  actions
}
