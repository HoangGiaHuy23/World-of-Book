import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, InputContainer, } from "./style";
import { Image, Checkbox } from "antd";
import ButonComponent from '../../components/ButtonComponent/ButonComponent';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import PasswordComponent from "../../components/PasswordComponent/PasswordComponent"
import WoB from "../../assets/images/WoB_logo.png";
import Background from "../../assets/images/bookstorebg.jpg";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )

  const { data, isPending, isSuccess } = mutation

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleNavigateSignUp = () => {
    navigate('/signup')
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
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
          <div style={{ margin: " 0px 13px" }}>
            <p style={{ fontSize: "14px" }}>Welcome back!</p>
            <h1>Đăng nhập vào tài khoản của bạn</h1>
          </div>
          <InputContainer>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>Email</p>
              <InputFormComponent placeholder="Email" value={email} onChange={handleOnChangeEmail} />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>Mật khẩu</p>
              <PasswordComponent placeholder="Password" value={password} onChange={handleOnChangePassword} />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <Checkbox onChange={onChange} style={{ color: "#6251DD" }}>Remember Me</Checkbox>
            </div>
            {data?.status === 'ERR' && <span style={{ color: 'red', fontSize: '1.4em' }}>{data?.message}</span>}
            <div style={{ textAlign: "center", paddingTop: "30px" }}>
              <Loading isLoading={isPending}>
                <ButonComponent
                  disabled={!email.length || !password.length}
                  onClick={handleSignIn}
                  styleButton={{
                    width: '100%',
                    padding: '5px 50px',
                    background: '#EF6B4A',
                    border: '1px solid red',
                  }}
                  textButton={'Đăng nhập'}
                  styleTextButton={{ color: '#FFF', }}
                >
                </ButonComponent>
              </Loading>
            </div>
            <div style={{ textAlign: "center", paddingTop: "10px" }} onClick={handleNavigateSignUp}>
              <ButonComponent
                styleButton={{
                  width: '100%',
                  padding: '5px 50px',
                  background: '#FFF',
                  border: '1px solid #6251DD',
                }}
                textButton={'Đăng ký'}
                styleTextButton={{ color: '#6251DD', }}
              >
              </ButonComponent>
            </div>
          </InputContainer>
        </WrapperContainerRight>
      </div>
    </div>
  );
}

export default SignInPage;
