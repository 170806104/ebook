import { createStore } from 'vuex'
import book from './modules/book'
import getters from './getters'
import actions from './actions'

export default createStore({
modules: {book},
  getters,
  actions
})
