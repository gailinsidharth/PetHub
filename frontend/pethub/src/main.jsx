import React from 'react'
import ReactDOM from 'react-dom/client'
import  {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ImageProvider } from './context/ImageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ImageProvider>
  <BrowserRouter>
    <App />
   </BrowserRouter>
   </ImageProvider>
)
