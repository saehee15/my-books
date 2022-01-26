import { combineReducers } from "redux";
import auth from './auth'

const reducer = combineReducers({
    //하위 리듀서들 설정
    auth
})

export default reducer