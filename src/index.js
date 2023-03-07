import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import 'antd/dist/antd.min.css'
import { DraggableModalProvider } from 'ant-design-draggable-modal'
import { Global } from './context/Global'

ReactDOM.render(
  <React.StrictMode>
    <DraggableModalProvider>
      <Provider store={store}>
        <Global>
          <App />
        </Global>
      </Provider>
    </DraggableModalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals()
