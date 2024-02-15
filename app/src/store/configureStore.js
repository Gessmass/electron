import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga.js'
import rootReducer from "../reducers/rootReducer.js";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
