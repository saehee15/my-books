//api코드를 추상화해서 적어놓기
import axios from "axios";
import { LoginReqType } from "../types";

const USER_API_URL = 'http://api.marktube.tv/v1/me'

export default class UserService {
    public static async login(reqData: LoginReqType): Promise<string> {
        const response = await axios.post(USER_API_URL, reqData)
        // 정상적으로 호출 완료 됬을때, response가 데이터를 가지고 돌아올테니
        return response.data.token
    }

    // 로그아웃할떄는 기존에 로그인 되어 있는 token값을 보내서, USER_API_URL에 delete처리를 해줘야함
    // 그래서 token를 인자로 받음, 그리고 데이터로 받아야 하는건 아니라 void처리
    public static async logout(token: string): Promise<void> {
        await axios.delete(USER_API_URL, { headers: { Authorization: `Bearer ${token}` } })
    }
}