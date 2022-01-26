import { Row, Col, Input, Button } from "antd"
import { useRef } from "react"
import { LoginReqType } from "../types"
import styles from "./Signin.module.css"



interface SigninProps {
    //로그인 함수의 모습
    login: (reqDate: LoginReqType) => void;

}

// SigninProps {} 괄호 안이랑 밑에 React.FC<SigninProps> = ({}) 의 {} 괄호는 children 제외하면
// 똑같이 되게됨

const Signin: React.FC<SigninProps> = ({ login }) => {
    const emailRef = useRef<Input>(null)
    const passwordRef = useRef<Input>(null)

    return (
        <Row align="middle" className={styles.signin_row}>
            <Col span={24}>
                <Row className={styles.signin_contents}>
                    <Col span={12}>
                        <img src="/bg_signin.png" alt="Signin" className={styles.signin_bg} />
                    </Col>
                    <Col span={12}>
                        <div className={styles.signin_title}>My Books</div>
                        <div className={styles.signin_subtitle}>Please Note Your Opinion</div>
                        <div className={styles.signin_underline} />
                        <div className={styles.email_title}>Email
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input
                                placeholder="Email" autoComplete="email" name="email" className={styles.input} ref={emailRef} />
                        </div>
                        <div className={styles.password_title}>Password
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input
                                type="password" autoComplete="current-password" className={styles.input} ref={passwordRef} />
                        </div>
                        <div className={styles.button_area}>
                            <Button size="large" className={styles.button} onClick={click}>Sign In</Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

    function click() {
        const email = emailRef.current!.state.value
        const password = passwordRef.current!.state.value

        login({ email, password })
    }
}

export default Signin