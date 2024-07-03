import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  address: '',
  avatar: '',
  access_token: '',
  isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, phone, gender, dateOfBirth, address, avatar, access_token, _id, isAdmin } = action.payload
      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.gender = gender;
      state.dateOfBirth = dateOfBirth;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token
      state.isAdmin = isAdmin
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.gender = '';
      state.dateOfBirth = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer