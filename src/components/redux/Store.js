import {billListReducer} from './Reducer.js'

import {createStore} from 'redux'

let store = createStore(billListReducer)

export default store;

