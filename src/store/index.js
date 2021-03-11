import { createStore } from 'vuex'
import book from './modules/book'
import getters from './getters'

export default createStore({
modules: {book},
  getters
})
