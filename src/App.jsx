import React, { useState } from 'react'
import Home from './page/Home/Home'
import Menu from './page/Menu/Menu'
import About from './page/About/About'
import Contact from './page/Contact/Contact'
import Admin from './page/Admin/Admin'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './page/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './page/PlaceOrder/PlaceOrder'
import MyOrders from './page/MyOrders/MyOrders'
import OrderConfirmation from './page/OrderConfirmation/OrderConfirmation'
import Profile from './page/Profile/Profile'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        {/* Admin route - standalone without navbar/footer */}
        <Route path='/admin' element={<Admin/>}/>

        {/* Regular routes with navbar and footer */}
        <Route path='/*' element={
          <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
            <div className="app">
              <Navbar
                setShowLogin={setShowLogin}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/menu' element={<Menu/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/order' element={<PlaceOrder/>}/>
                <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
                <Route path='/myorder' element={<MyOrders/>}/>
                <Route path='/profile' element={<Profile/>}/>
              </Routes>
            </div>
            <Footer />
            <ScrollToTop />
          </>
        }/>
      </Routes>
    </>
  )
}

export default App