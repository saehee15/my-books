import { all } from 'redux-saga/effects'
import { authSage } from './auth'

export default function* rootSaga() {
    yield all([
        //하위 사가들 가져오기
        authSage()
    ])
}