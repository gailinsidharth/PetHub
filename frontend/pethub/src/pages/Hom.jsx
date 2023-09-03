import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PetshopHom from './PetshopHom'
import SidebarCart from './SidebarCart'
import ProductContainer from './ProductContainer'
import SubcategoryList from './SubcategoryList'
import ProductHom from './ProductHom'
import Signin from './Signin'
import Signup from './Signup'
import ProductContainers from './ProductContainers'
import ProductListingPage from './ProductListingPage'

import UserHom from './UserHom'

import ManageAddresses from './ManageAddresses'
import HomeScreen from './HomeScreen'
import BecomeSellerComponent from './BecomeSellerComponent'
import ProductDetailsPage from './ProductDetailsPage'
import PopularBreedsForAdoption from './PopularBreedsForAdoption'
import PetDetails from './PetDetails'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import RegisterAsSeller from './RegisterAsSeller'
import RegisterBreeder from './RegisterBreeder'
import BreederLogin from './BreederLogin'
import SellerLogin from './SellerLogin'
import SellerDashboard from './SellerDashboard'
import { AddPet } from './AddPet'
import CheckAdoptedPets from './CheckAdoptedPets'
import BreederDashboard from './BreederDashboard'
import AddBreedForm from './AddBreedForm'
import ViewRequests from './ViewRequests'



const Hom = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<HomeScreen/>} /> 
        <Route path='/sign' element={<Signin/>} /> 
        <Route path='/pethom' element={<PetshopHom/>} /> 
        <Route path='/breeders' element={<MainPage/>} /> 
        <Route path='/profilepage/:userId' element={<ProfilePage/>} />
        <Route path='/becomesellerorbreeder' element={<BecomeSellerComponent/>} />
        <Route path='/registerasseller' element={<RegisterAsSeller/>} />
        <Route path='/registerbreeder' element={<RegisterBreeder/>} />
        <Route path='/breederlogin' element={<BreederLogin/>} />
        <Route path='/sellerlogin' element={<SellerLogin/>} />
        <Route path='/sellerdashboard' element={<SellerDashboard/>} />
        <Route path='/addpet' element={<AddPet/>} />
        <Route path='/CheckAdoptedPets' element={<CheckAdoptedPets/>} />
        <Route path='/breederdashboard' element={<BreederDashboard/>} />
        <Route path='/addbreed' element={<AddBreedForm/>} />
        <Route path='/viewrequest/:breederId' element={<ViewRequests/>} />
        <Route path="/pet/:petId" element={<PopularBreedsForAdoption/>} />
        <Route path="/pets/:petId" element={<PetDetails/>} />
        <Route path='/signup' element={<Signup/>} /> 
        <Route path='/cart' element={<SidebarCart/>} /> 
        <Route path='/product' element={<ProductContainer/>}/>
        <Route path="/category/:categoryId" element={<SubcategoryList/>}/>
        <Route path="/subcategory/:subcategoryid" element={<ProductContainer/>}/>
        <Route path="/productcon" element={<ProductContainers/>}/>
        <Route path="/producthom" element={<ProductHom/>}/>
        <Route path="/product/:category" element={<ProductListingPage/>}/>
        <Route path="/userdash" element={<UserHom/>}/>
        <Route path="/update-profile" element={<ManageAddresses/>}/>
        
       
        



        </Routes>
    </div>
  )
}

export default Hom