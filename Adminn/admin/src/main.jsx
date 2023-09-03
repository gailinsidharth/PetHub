import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import  {BrowserRouter} from 'react-router-dom'
import { ImageProvider } from './context/ImageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx';
import { CssBaseline } from '@mui/material';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
   <ImageProvider>
    <BrowserRouter>
    <CssBaseline />
    <App />
    </BrowserRouter>
    </ImageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
