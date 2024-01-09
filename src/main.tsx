import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StateProvider } from './StateProvider.tsx'
import reducer, { initialState } from './reducer.ts'
import { AppAction, AppState } from './utils/types.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider<AppState, AppAction>
      initialState={initialState}
      reducer={reducer}
    >
      <App />
    </StateProvider>
  </React.StrictMode>
)
