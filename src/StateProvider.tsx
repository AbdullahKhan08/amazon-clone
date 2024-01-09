import { createContext, useContext, useReducer, ReactNode } from 'react'

//prepares the datalayer

// Define types for reducer and initialState
type Reducer<T, A> = (state: T, action: A) => T
type StateProviderProps<T, A> = {
  reducer: Reducer<T, A>
  initialState: T
  children: ReactNode
}

export const StateContext = createContext<any>(null)

// wrap our app and provide the data layer

export const StateProvider = <T, A>({
  reducer,
  initialState,
  children,
}: StateProviderProps<T, A>) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = <T, A>() =>
  useContext(StateContext) as [T, React.Dispatch<A>]
