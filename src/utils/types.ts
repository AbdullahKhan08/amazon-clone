export interface productProps {
  id: string
  title: string
  image: string
  price: number
  rating: number
  showButton?: boolean
}

export interface BasketItem {
  id: string
  title: string
  image: string
  price: number
  rating: number
}

export interface AppState {
  basket: BasketItem[]
}

export interface AppAction {
  id: string
  type: string
  item?: BasketItem
  // Add other action properties as needed
}
