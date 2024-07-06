import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { addToCart, addToWish } from './Slice';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const Products = ({ title, pagination }) => {

  const [data, setData] = useState([]);
  const [cartProductTitle, setCartProductTitle] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const wish = useSelector((state) => state.cart.wish);

  let docTitle = title;

  document.title = docTitle ? `${docTitle}` : "";

  useEffect(() => {
    if (title) {
      axios.get(`https://dummyjson.com/products/category/${title}`).then(res => setData(res.data.products))
    }
    else {
      axios.get(`https://dummyjson.com/products?skip=${pagination}&limit=12`).then(res => setData(res.data.products))
    }
  }, [title, pagination]);



  const addCartHandler = (event, value) => {
    event.preventDefault();
    dispatch(addToCart(value));
    setCartProductTitle(value.title)
  }

  const addWishHandler = (event, value) => {
    event.preventDefault();
    dispatch(addToWish(value));
  }

  const isInCart = (title) => {
    return cart.some(item => item.title === title)
  }

  const isInWish = (title) => {
    return wish.some(item => item.title === title)
  }

  return (
    <>
      {
        data.map((val, ind) => {
          return (
            <NavLink to={`/product/${val.id}`} className='cardBody nav-link card' key={ind}>
              <div className='imgFrame' title={val.title}>
                <img src={val.thumbnail} alt={val.title} />
              </div>
              <div className='d-flex justify-content-between py-2'>
                <h6 className='px-2'>{val.title}</h6>
              </div>
              <div className='flex justify-between items-center px-2 my-3'>
                <p>${val.price}</p>
                <h6 className='rating bg-white text-success'>{val.rating} <i className="fa-solid fa-star"></i></h6>
                <button onClick={(e) => addWishHandler(e, val)} disabled={isInWish(val.title)}><i className={`fa-solid fa-heart fa-xl wishIcon ${isInWish(val.title) ? "text-red-500" : "text-muted"}`}></i></button>
              </div>
              <button className={`m-2 ${isInCart(val.title) ? "bg-purple-400" : "bg-purple-600"}  text-white rounded-md py-1`} disabled={isInCart(val.title)} onClick={(e) => addCartHandler(e, val)}>{isInCart(val.title) ? "Item Added To Cart" : "Add To Cart"}</button>
            </NavLink>
          )
        })
      }
      <div className='my-5'><Toaster gutter={50} position='top-center' toastOptions={{ duration: 3000 }} /></div>
    </>
  )
}

export default Products
