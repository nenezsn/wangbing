import React from 'react'
import ReactDom from 'react-dom'
import RouterConfig from './router'
import * as reducer from './reducer'
import { logger } from './applyMiddleware'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { PersistGate } from 'redux-persist/integration/react'

const rootRersistConfig = {
    key: 'root',
    storage: storageSession,
    // whitelist:['user']
}
const persistedReducer = persistReducer(rootRersistConfig, combineReducers(reducer))
let store = createStore(persistedReducer, applyMiddleware(logger(true)))
let persistor = persistStore(store)
// const store = createStore(combineReducers(reducer), '',applyMiddleware(logger(true)))

ReactDom.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        {RouterConfig()}
    </PersistGate>
</Provider>, document.getElementById('root'))
