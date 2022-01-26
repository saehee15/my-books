import { Action, createActions, handleActions } from "redux-actions"
import { call, put, takeEvery } from "redux-saga/effects"
import UserService from "../../services/UserService"
import { LoginReqType } from "../../types"

// auth의 state를 구상
interface AuthState {
    // AuthState의 타입 작성
    token: string | null
    loading: boolean
    error: Error | null
}

// 초기값 지정
const initialState: AuthState = {
    token: null,
    loading: false,
    error: null
}

const prefix = 'my-books/auth'

// action생성 함수 만들기
export const { pending, success, fail } = createActions('PENDING', 'SUCCESS', 'FAIL', { prefix })

// reducer만들기
const reducer = handleActions<AuthState, string>({
    //PENDING은 새로운 객체리턴, 기존 state받음
    PENDING: (state) => ({
        ...state,
        loading: true,
        error: null
    }),
    SUCCESS: (state, action) => ({
        token: action.payload,
        loading: false,
        error: null
    }),
    FAIL: (state, action: any) => ({
        ...state,
        loading: false,
        error: action.payload
    }),
}, initialState, { prefix })

export default reducer

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix })

function* loginSaga(action: Action<LoginReqType>) {
    try {
        yield put(pending())
        const token: string = yield call(UserService.login, action.payload)
        // 받아온 토큰을 localstorage에도 넣어야 하고 동시에 redux의 state로도 셋팅을 해줘야함
        yield put(success(token))
        // 로그인이 정상적으로 되면 signin페이지에서 list페이지로 이동
        // push, 만약에 문제가 있으면 밑에서 error처리
    } catch (error) {
        yield put(fail(new Error(error?.respomse?.data?.error || 'UNKNOWN_ERROR')))
    }
}
function* logoutSaga() {

}

export function authSage() {
    yield takeEvery(`${prefix}/LOGIN`, loginSaga)
    yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}