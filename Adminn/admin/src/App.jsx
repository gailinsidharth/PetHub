import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import DashboardMain from './pages/DashboardMain'
import ProductDash from './pages/ProductDash'
import AddProduct from './pages/AddProduct'
import CustomerDash from './pages/CustomerDash'
import SellerDash from './pages/SellerDash'
import BreederDash from './pages/BreederDash'
import OrderComponent from './pages/OrderComponent'
import OrderDash from './pages/OrderDash'
import CreateAccount from './pages/CreateAccount'
import CategoryDash from './pages/CategoryDash'



function App() {

  return (
 
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dash' element={<DashboardMain/>}/>
        <Route path='/product' element={<ProductDash/>}/>
        <Route path='/category' element={<CategoryDash/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/customers' element={<CustomerDash/>}/>
        <Route path='/seller' element={<SellerDash/>}/>
        <Route path='/breeder' element={<BreederDash/>}/>
        <Route path='/order' element={<OrderDash/>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>




       
      

      </Routes>
 
  )
}

export default App
