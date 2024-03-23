// const CartItems = () => {
//   const {products} = useContext(ShopContext);
//   const {cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);
//   const stripekey = "pk_test_51OdV2YSAc9LVRLLZD212ihUETHi7EwaoqRrzn841ewyh04wBPth7J6g4ig1qbQZKlvGlX3HCesOH8eE1jrHDA2YO00djIKh0ps"
//   const navigate = useNavigate();
  
//   const onToken = (token) => {
//     console.log(token)
//     alert('Your Payment has been processed');
//     navigate('/');
//   }

//   return (
//     <div className="cartitems">
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Size</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {products.map((e)=>{

//         if(cartItems[e.id]>0)
//         {
//           return  <div>
//                     <div className="cartitems-format">
//                       <img className="cartitems-product-icon" src={e.image} alt="" />
//                       <p cartitems-product-title>{e.name}</p>
//                       <p>₹{e.new_price}</p>
//                       <button className="cartitems-quatity">{cartItems[e.id]}</button>
//                       <p>₹{e.new_price*cartItems[e.id]}</p>
//                       <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
//                     </div>
//                      <hr />
//                   </div>;
//         }
//         return null;
//       })}



import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
// import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import PlaceOrder from '../PlaceOrder/PlaceOrder';

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount, updateCart } = useContext(ShopContext);
  // const stripekey = "pk_test_51OdV2YSAc9LVRLLZD212ihUETHi7EwaoqRrzn841ewyh04wBPth7J6g4ig1qbQZKlvGlX3HCesOH8eE1jrHDA2YO00djIKh0ps";
  const navigate = useNavigate();
  
  // const onToken = (token) => {
  //   console.log(token);
  //   alert('Your Payment has been processed');
  //   navigate('/');
  // };
const [modalopen,setModalOpen] = useState(false);
  const checkout = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Optional: Scroll behavior, smooth for smooth scrolling
  });
    setModalOpen(true);
  }
  const incrementQuantity = (productId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[productId] += 1;
    updateCart(updatedCartItems);
  };

  const decrementQuantity = (productId) => {
    const updatedCartItems = { ...cartItems };
    if (updatedCartItems[productId] > 1) {
      updatedCartItems[productId] -= 1;
      updateCart(updatedCartItems);
    }
  };

  

  

  return (
    <>{modalopen&&<PlaceOrder close={()=>setModalOpen(false)}/>}
        <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        {/* <p>Total</p> */}
        <p>Remove</p>
      </div>
      <hr />
      {/* {products.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format">
                <img className="cartitems-product-icon" src={product.image} alt="" />
                <p cartitems-product-title>{product.name}</p>
                <p>₹{product.new_price}</p>
                <p>{size}</p>
                <div className="cartitems-quantity-container">
                  <button onClick={() => decrementQuantity(product.id)}><span className="quantity-change">-</span></button>
                  <input
                    type="number"
                    className="cartitems-quantity"
                    value={cartItems[product.id]}
                    readOnly
                  />
                 <button onClick={() => incrementQuantity(product.id)}><span className="quantity-change">+</span></button>
                </div>
                <p>₹{product.new_price * cartItems[product.id]}</p>
                <img onClick={() => { removeFromCart(product.id) }} className="cartitems-remove-icon" src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })} */}

{Object.keys(cartItems).map((cartItemId) => {
        const [itemId, size] = cartItemId.split('-');
        const quantity = cartItems[cartItemId];
        const product = products.find((product) => product.id === Number(itemId));

        if (product && quantity > 0) {
          return (
            <div key={cartItemId}>
              <div className="cartitems-format">
                <img className="cartitems-product-icon" src={product.image} alt="" />
                <p cartitems-product-title>{product.name}</p>
                <p>₹{product.new_price}</p>
                <p>{size}</p>
                <div className="cartitems-quantity-container">
                  <button onClick={() => decrementQuantity(cartItemId)}><span className="quantity-change">-</span></button>
                  <input
                    type="number"
                    className="cartitems-quantity"
                    value={cartItems[cartItemId]}
                    readOnly
                  />
                 <button onClick={() => incrementQuantity(cartItemId)}><span className="quantity-change">+</span></button>
                </div>
                {/* <p>₹{product.new_price * quantity}</p> */}
                <img onClick={() => removeFromCart(cartItemId)} className="cartitems-remove-icon" src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}


      
    




      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          
          {/* <StripeCheckout
            name="Shoe Checkout"
            description="Please fill in the details below"
            amount={getTotalCartAmount() * 100}
            currency="INR"
            stripeKey={stripekey}
            token={onToken}
            billingAddress
          > */}
            <button onClick={checkout}>PROCEED TO CHECKOUT</button>
            {/* </StripeCheckout> */}
        </div>
        {/* <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div> */}
        {/* </div> */}
      </div>
    </div>
    </>
);
};

export default CartItems;
