import Vue from 'vue'
import Vuex from 'vuex'
import { app } from './app.store'
import { room } from './room.store'
import { rooms } from './rooms.store'
import { user } from './user.store'
import { recent } from './recent.store'
import { transactions } from './transactions.store'
import { coins } from './coins.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    coins,
    recent,
    room,
    rooms,
    transactions,
    user
  }
})
