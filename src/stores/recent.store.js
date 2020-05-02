import Vue from 'vue'

const setLocal = (state) => {
  let _state = JSON.parse(JSON.stringify(state))
  delete _state.rooms.loaded
  _state = JSON.stringify(_state)
  localStorage.setItem('recent-data', _state)
}

export const recent = {
  namespaced: true,
  state: {
    rooms: {
      loaded: false,
      list: []
    }
  },
  actions: {
    init ({ state }) {
      const local = JSON.parse(localStorage.getItem('recent-data'))
      if (local) {
        local.rooms.loaded = true
        Vue.set(state, 'rooms', local.rooms)
      }
    },
    addRecent ({ state }, room) {
      // check for room in list
      const found = state.rooms.list.findIndex(item => item.slug === room.slug)

      // if found remove it
      if (found !== -1) {
        state.rooms.list.splice(found, 1)
      }

      // add room to the beginning of the array
      state.rooms.list.unshift(room)

      // if more than 10 recent remove last one
      if (state.rooms.list.length > 10) {
        state.rooms.list.pop()
      }

      // save to localstorage
      setLocal(state)
    }
  }
}
