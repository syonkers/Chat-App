import { createStore } from 'redux'
import reducer from './Reducers/reducer'
import initialState from './initialState'

const store = createStore(reducer, initialState, window.devToolsExtension && window.devToolsExtension())
export default store