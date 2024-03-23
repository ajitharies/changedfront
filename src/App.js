// import Navbar from "./Components/Navbar/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Shop from "./Pages/Shop";
// import Cart from "./Pages/Cart";
// import Product from "./Pages/Product";
// import Footer from "./Components/Footer/Footer";
// import ShopCategory from "./Pages/ShopCategory";
// import women_banner from "./Components/Assets/banner_women.png";
// import men_banner from "./Components/Assets/banner_mens.png";
// import kid_banner from "./Components/Assets/banner_kids.png";
// import LoginSignup from "./Pages/LoginSignup";
// import Search from "./Pages/Search";


// function App() {

  

//   return (
    
//     <div>
//       <Router>
//         <Navbar />
//         <Routes>
//             <Route path="/" element={<Shop gender="all" />} />
//             <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
//             <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
//             <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
//         <Route path='/product' element={<Product />}>
//         <Route path=':productId' element={<Product />} />
//         </Route>
//             <Route path="/search" element={<Search />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/login" element={<LoginSignup/>} />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
    
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import ShopCategory from './Pages/ShopCategory';
import women_banner from './Components/Assets/banner_women.png';
import men_banner from './Components/Assets/banner_mens.png';
import kid_banner from './Components/Assets/banner_kids.png';
import LoginSignup from './Pages/LoginSignup';
import Search from './Pages/Search';
import ProductList from './Components/SearchPage/SearchPage';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import Order from './Pages/Order';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import ExtraShopCategory from "./Pages/ExtraShopCategory";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop gender="all" />} />
        <Route path="/test" element={<PlaceOrder />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path="/shopcategory/:category" element={<ExtraShopCategory/>}/>
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route exact path="/" component={ProductList} />
        <Route path="/product/:productId" component={ProductDisplay} /> {/* Define route for product display page */}
        <Route path="/order" element={<Order />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
       
      </Routes>
      <FooterControl />
    </Router>
  );
}

function FooterControl() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/search'];

  if (hideFooterRoutes.includes(location.pathname)) {
    return null; // If the current route is in the hideFooterRoutes array, don't render the Footer
  }

  return <Footer />;
}

export default App;

