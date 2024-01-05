export const initialState = {
  basket: [],
}

const reducer = (state: any, action: any) => {
  console.log(action)

  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      }
  }
}

export default reducer
