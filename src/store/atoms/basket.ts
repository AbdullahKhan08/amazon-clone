import { atom } from 'recoil'

export interface BasketItem {
  id: string
  title: string
  image: string
  price: number
  rating: number
}

interface BasketState {
  isLoading: boolean
  basket: BasketItem[]
}

export const basketState = atom<BasketState>({
  key: 'basketState',
  default: {
    isLoading: true,
    basket: [],
  },
})
