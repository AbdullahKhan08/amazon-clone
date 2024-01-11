import { selector } from 'recoil'
import { basketState } from '../atoms/basket'

export const isBasketLoading = selector({
  key: 'basketLoadingState',
  get: ({ get }) => {
    const state = get(basketState)

    return state.isLoading
  },
})

export const basketDetails = selector({
  key: 'basketDetailsState',
  get: ({ get }) => {
    const state = get(basketState)

    return state.basket
  },
})
