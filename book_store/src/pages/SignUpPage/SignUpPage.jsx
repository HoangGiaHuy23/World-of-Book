import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, InputContainer, } from "./style";
import { Image } from "antd";
import ButonComponent from '../../components/ButtonComponent/ButonComponent';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import PasswordComponent from "../../components/PasswordComponent/PasswordComponent";
import WoB from "../../assets/images/WoB_logo.png";
import Background from "../../assets/images/bookstorebg.jpg";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  const handleOnChangeName = (value) => {
    setName(value)
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success()
      handleNavigateSignIn()
    } else if (isError && data?.status === 'ERR') {
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSignIn = () => {
    navigate('/signin')
  }

  const handleSignUp = () => {
    mutation.mutate({
      name,
      email,
      password,
      confirmPassword
    })
    console.log('mutation: ', mutation)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#CCC",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "550px",
          width: "700px",
          border: "1px solid #000",
          backgroundColor: "#F7F7F7",
        }}
      >
        <WrapperContainerLeft>
          <div>
            <Image
              src={Background}
              alt="background"
              preview={false}
              height="550px"
              width="329px"
            />
          </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <div style={{ margin: " 0px 45px" }}>
            <Image
              src={WoB}
              alt="weblogo"
              preview={false}
              height="80px"
              width="250px"
            />
          </div>
          <div style={{ margin: " 0px 37px" }}>
            <p style={{ fontSize: "14px" }}>Hello!</p>
            <h1>Tạo tài khoản của chính bạn</h1>
          </div>
          <InputContainer>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>Họ và tên</p>
              <InputFormComponent placeholder="Họ và tên" value={name} onChange={handleOnChangeName} />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>Email</p>
              <InputFormComponent placeholder="Email" value={email} onChange={handleOnChangeEmail} />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>Mật khẩu</p>
              <PasswordComponent placeholder="Password" value={password} onChange={handleOnChangePassword} />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>Xác nhận mật khẩu</p>
              <PasswordComponent placeholder="Password" value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
            </div>
            {data?.status === 'ERR' && <span style={{ color: 'red', fontSize: '1.4em' }}>{data?.message}</span>}
            <div style={{ textAlign: "center", paddingTop: "30px" }}>
              <Loading isLoading={isPending}>
                <ButonComponent
                  disabled={!name.length || !email.length || !password.length || !confirmPassword.length}
                  onClick={handleSignUp}
                  styleButton={{
                    width: '100%',
                    padding: '5px 50px',
                    background: '#EF6B4A',
                    border: '1px solid red',
                  }}
                  textButton={'Đăng ký'}
                  styleTextButton={{ color: '#FFF', }}
                >
                </ButonComponent>
              </Loading>
            </div>
            <div style={{ textAlign: "center", paddingTop: "10px" }} onClick={handleNavigateSignIn}>
              <ButonComponent
                styleButton={{
                  width: '100%',
                  padding: '5px 50px',
                  background: '#FFF',
                  border: '1px solid #6251DD',
                }}
                textButton={'Đăng nhập'}
                styleTextButton={{ color: '#6251DD', }}
              >
              </ButonComponent>
            </div>
          </InputContainer>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage