// store를 만든는 역활

import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "./modules/reducer"
import createSagaMiddleware from "@redux-saga/core"
import rootSaga from "./modules/rootSaga"

const create = () => {
    //store 생성되기 전
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

    sagaMiddleware.run(rootSaga)
    return store;
}

export default create