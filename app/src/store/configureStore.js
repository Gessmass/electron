import {createStore, applyMiddleware} from "redux/src";

import {helloSaga} from "../sagas/sagas.js";

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})