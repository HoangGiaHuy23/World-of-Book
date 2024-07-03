import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperBox, WrapperInput, WrapperLabel, WrapperSideBarLabel } from './style'
import { Radio } from 'antd'
import DateOfBirth from '../../components/DateOfBirthComponent/DateOfBirth'
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent'
import PasswordComponent from '../../components/PasswordComponent/PasswordComponent'
import ButonComponent from '../../components/ButtonComponent/ButonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from '../../components/LoadingComponent/Loading';
import * as message from "../../components/Message/Message";
import { updateUser } from '../../redux/slices/userSlice'

const ProfilePage = () => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState(true)
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutationHooks(
    (data) => {
      const { id, access_token, ...rests } = data
      const res = UserService.updateUser(id, rests, access_token)
      return res
    }
  )

  const dispatch = useDispatch()
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    setName(user?.name)
    setPhone(user?.phone)
    setEmail(user?.email)
    setGender(user?.gender || true)
    if (user?.dateOfBirth) {
      setDay(user?.dateOfBirth.split("/")[0]);
      setMonth(user?.dateOfBirth.split("/")[1]);
      setYear(user?.dateOfBirth.split("/")[2]);
    }
    else{
      setDay('');
      setMonth('');
      setYear('');
    }
    console.log("3")
  }, [user])

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success()
      handleGetDetailsUser(user?.id, user?.access_token)
    }
    else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleOnChangeName = (value) => {
    setName(value)
  }

  const handleOnChangePhone = (value) => {
    setPhone(value)
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangeGender = (e) => {
    setGender(e.target.value)
  }

  const handleOnChangeDateOfBirth = (Day, Month, Year) => {
    setDay(Day)
    setMonth(Month)
    setYear(Year)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeNewPassword = (value) => {
    setNewPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và mật khẩu xác nhận không khớp")
    }
    else if (password === '' && newPassword === '') {
      const dateOfBirthValue = day + "/" + month + "/" + year
      mutation.mutate({ id: user?.id, name, phone, email, gender, dateOfBirth: dateOfBirthValue, access_token: user?.access_token })
    }
    else if (password !== '' && newPassword !== '') {
      const dateOfBirthValue = day + "/" + month + "/" + year
      mutation.mutate({ id: user?.id, name, phone, email, gender, dateOfBirth: dateOfBirthValue, password, newPassword, access_token: user?.access_token })
    }
    else if (password !== '' && newPassword === '') {
      message.error("Vui lòng điền mật khẩu mới")
    }
    else {
      message.error("Cần có mật khẩu hiện tại để cập nhật mật khẩu mới")
    }
  }

  return (
    <WrapperContent>
      <WrapperBox span={5}>
        <h1 style={{ color: 'red', fontWeight: 'bold' }}>Tài khoản</h1>
        <hr />
        <div style={{ display: 'grid', gap: '10px', paddingTop: '10px' }}>
          <WrapperSideBarLabel>Bảng điều khiển</WrapperSideBarLabel>
          <WrapperSideBarLabel>Thông tin tài khoản</WrapperSideBarLabel>
          <WrapperSideBarLabel>Sổ địa chỉ</WrapperSideBarLabel>
          <WrapperSideBarLabel>Đơn hàng của tôi</WrapperSideBarLabel>
        </div>
      </WrapperBox>
      <WrapperBox span={18}>
        <h1 style={{ fontWeight: 'bold' }}>Thông tin tài khoản</h1>
        <Loading isLoading={isPending}>
          <WrapperInput>
            <WrapperLabel htmlFor='name'>Họ và tên: </WrapperLabel>
            <InputFormComponent id='name' style={{ border: '1px solid #000', background: '#FFF' }} placeholder="Họ và tên" value={name} onChange={handleOnChangeName} />
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px', }}>
            <WrapperLabel htmlFor='phone'>Số điện thoại: </WrapperLabel>
            <InputFormComponent id='phone' style={{ border: '1px solid #000', background: '#FFF' }} placeholder="Số điện thoại" value={phone} onChange={handleOnChangePhone} />
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px', }}>
            <WrapperLabel htmlFor='email'>Email: </WrapperLabel>
            <InputFormComponent id='email' style={{ border: '1px solid #000', background: '#FFF' }} placeholder="Email" value={email} onChange={handleOnChangeEmail} />
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px', }}>
            <WrapperLabel>Giới tính: </WrapperLabel>
            <div style={{ width: '100%' }}>
              <Radio.Group onChange={handleOnChangeGender} value={gender}>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </div>
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px' }}>
            <WrapperLabel>Ngày sinh: </WrapperLabel>
            <div style={{ width: '100%' }}>
              <DateOfBirth Day={day} Month={month} Year={year} onChange={handleOnChangeDateOfBirth} />
            </div>
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px', }}>
            <WrapperLabel htmlFor='password'>Mật khẩu hiện tại: </WrapperLabel>
            <div style={{ paddingTop: data?.status === 'ERR' ? '15px' : '0px', width: '100%', display: 'flex', flexDirection: 'column', }}>
              <PasswordComponent id='password' style={{ border: '1px solid #000', background: '#FFF' }} placeholder="Mật khẩu hiện tại" value={password} onChange={handleOnChangePassword} />
              {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
            </div>
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px', }}>
            <WrapperLabel htmlFor='newPassword'>Mật khẩu mới: </WrapperLabel>
            <PasswordComponent id='newPassword' style={{ border: '1px solid #000', background: '#FFF' }} placeholder="Mật khẩu mới" value={newPassword} onChange={handleOnChangeNewPassword} />
          </WrapperInput>
          <WrapperInput style={{ paddingTop: '20px', }}>
            <WrapperLabel htmlFor='confirmPassword'>Nhập lại mật khẩu: </WrapperLabel>
            <PasswordComponent id='confirmPassword' style={{ border: '1px solid #000', background: '#FFF' }} placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
          </WrapperInput>
          <ButonComponent
            onClick={handleUpdate}
            styleButton={{
              width: '200px',
              padding: '5px 50px',
              marginLeft: '40%',
              marginTop: '20px',
              background: '#C92127',
              border: '1px solid #C92127',
            }}
            textButton={'Lưu thay đổi'}
            styleTextButton={{ color: '#FFF', }}
          >
          </ButonComponent>
        </Loading>
      </WrapperBox>
    </WrapperContent>
  )
}

export default ProfilePage