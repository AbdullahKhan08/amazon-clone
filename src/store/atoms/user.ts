import { atom } from 'recoil'

export interface User {
  isLoading: boolean
  email: string
  name: string
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    isLoading: true,
    email: '',
    name: '',
  },
})
