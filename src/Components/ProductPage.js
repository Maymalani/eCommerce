import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWish } from './Slice';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const ProductPage = () => {

  const [products, setProducts] = useState(null);
  const [Image, setImage] = useState(products?.images);
  const cart = useSelector((state) => state.cart.cart);
  const wish = useSelector((state) => state.cart.wish);
  const dispatch = useDispatch();

  let { id } = useParams();
  const imageHandle = (id) => {
    setImage(products?.images[id])
  }



  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => setProducts(res?.data));
  }, [id]);

  const addCartHandle = (val) => {
    dispatch(addToCart(val))
  };

  const addWishHandle = (id) => {
    dispatch(addToWish(id));
  }

  const shareHandle = (item) => {
    if (navigator.share) {
      navigator.share({
        title: `${item.title}`,
        url: `${window.location.href}`,
        text: `${item.description}`
      })
    } else {
      alert('Not Supported')
    }
  }

  const isInCart = (title) => {
    return cart.some(item => item.title === title)
  }

  const isInWish = (title) => {
    return wish.some(item => item.title === title)
  }

  return (
    <>
      <Helmet>
        <title>{products?.title}</title>
        <meta name="description" content={products?.description} />
        <link rel="canonical" href={`https://e-commerceshop-mu.vercel.app/product/${id}`} />
        <meta name="robots" content="index, follow" />
        {/*open graph*/}
        <meta property="og:title" content={products?.title} />
        <meta property="og:description" content={products?.description} />
        <meta property="og:image" content={products?.images} />
        {/*open graph for twitter*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E-Commerce Project" />
        <meta name="twitter:description" content={products?.description} />
        <meta name="twitter:image" content={products?.images} />
        <meta name="twitter:url" content={`https://e-commerceshop-mu.vercel.app/product/${id}`} />
      </Helmet>
      <div className='my-3'>
        <div className='container'>
          <p className='d-flex'>
            <NavLink className="nav-link text-purple-600" to="/"> Home&nbsp;</NavLink> /<NavLink className="nav-link text-purple-600" to="/">&nbsp;Products&nbsp;</NavLink>/ {products?.title}
          </p>
        </div>
      </div>

      <div>
        <div className='container'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>{products?.title}</h1>
            <div className='cursor-pointer bg-gray-200 py-1 px-2 rounded-md' title='Share' onClick={() => shareHandle(products)}>
              <i className="fa-solid fa-share"></i> Share
            </div>
          </div>
        </div>
      </div>

      <div className='my-3'>
        <div className='container'>
          <div className='flex flex-wrap'>
            <div className='flex flex-col w-full m-auto sm:w-[80%] md:w-[50%] mb-4 md:mb-0'>
              <img src={Image ? `${Image}` : `${products?.thumbnail}`} alt={products?.title} className='m-auto w-full sm:w-[80%] h-[300px]' />
              <div className='w-full sm:w-[80%] mt-2 m-auto flex flex-wrap justify-start items-center gap-2'>
                {
                  products?.images.map((item, ind) => {
                    return (
                      <div key={ind} className="w-[96px] h-[110px] bg-gray-200 rounded-lg p-2">
                        <img onClick={() => imageHandle(ind)} alt="hi" src={item} className='w-full h-full object-cover' />
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='flex flex-col w-full mx-auto sm:w-[80%] md:w-[50%]'>
              <div className='w-full sm:w-[80%] mx-auto'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-medium'>{products?.title}</h2>
                <p className='my-3'>{products?.description}</p>
                <div className='flex justify-between sm:justify-start items-center'>
                  <h3 className='text-lg font-semibold'>$ {products?.price}</h3>&nbsp;
                  <span className='text-green-600'> &nbsp;{products?.discountPercentage} % Off</span>
                </div>
                <h6 className='w-20 px-3 py-1 rounded-full text-white gap-x-1 my-3 flex justify-between items-center' style={{ backgroundColor: products?.rating > 4 ? "green" : products?.rating > 3 ? "red" : products?.rating > 2 ? "orange" : "" }}>
                  {products?.rating} <i className="fa-solid fa-star"></i>
                </h6>
                <h6 className='text-muted'>{products?.stock} Pcs Available In Stock</h6>
                <div className='flex justify-center sm:justify-start items-center my-3 mb-2 gap-3'>
                  <button onClick={() => addWishHandle(products)} disabled={isInWish(products?.title)} className="flex justify-center items-center gap-x-1 btn btn-success w-1/2 sm:w-auto text-sm sm:text-xs lg:text-base">
                    <i className="fa-solid fa-heart"></i> <span className='uppercase'>{isInWish(products?.title) ? "Added To Wishlist" : "Add To Wishlist"}</span>
                  </button>
                  <button onClick={() => addCartHandle(products)} disabled={isInCart(products?.title)} className="flex justify-center items-center gap-x-1 btn btn-primary w-1/2 sm:w-auto text-sm sm:text-xs lg:text-base" >
                    <i className="fa-solid fa-cart-shopping"></i> <span className='uppercase'>{isInCart(products?.title) ? "Added To Cart" : "Add To Cart"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-5'><Toaster gutter={50} position='top-center' toastOptions={{ duration: 3000 }} /></div>

      {/*<div className='row'>
           <div className='col col-sm-2'>
            {
              products?.images.map((item, ind) => {
                return (
                  <NavLink key={ind} className="imageColumn">
                    <img onClick={() => imageHandle(ind)} alt="hi" src={item} width="80%" height="80px" style={{ objectFit: "cover", marginBottom: "10px" }} />
                  </NavLink>
                )
              })
            }
          </div>*/}
      {/*<div className='flex justify-between items-center my-3'>
            <h6 className='text-lg font-semibold'>{products?.title}</h6>
            <h6 className='text-muted' title='Share' style={{ cursor: "default" }} onClick={() => shareHandle(products)}>
              <i className="fa-solid fa-share"></i> Share
            </h6>
          </div>
          <div className='w-full sm:w-[80%] md:w-[50%] mx-auto h-300px px-3'>
            <img src={Image ? `${Image}` : `${products?.thumbnail}`} className='m-auto w-full h-full object-cover' alt={products?.title} />
            <div className='w-full sm:w-[100%] mt-2 m-auto flex justify-between items-center'>
              {
                products?.images.map((item, ind) => {
                  return (
                    <div key={ind} className="h-[110px] bg-gray-200 rounded-lg p-2">
                      <img onClick={() => imageHandle(ind)} alt="hi" src={item} className='w-full h-full object-cover' />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='w-full sm:w-[80%] md:w-[50%] mx-auto'>
            <p>{products?.description}</p>
            <div className='d-flex justify-center align-center'>
              <h3>${products?.price}</h3>&nbsp;
              <span className='pt-1 ml-5 text-success'> &nbsp;{products?.discountPercentage} % Off</span>
            </div>
            <h6 className='rating' style={{ backgroundColor: products?.rating > 4 ? "green" : products?.rating > 3 ? "red" : products?.rating > 2 ? "orange" : "" }}>
              {products?.rating} <i className="fa-solid fa-star"></i>
            </h6>
            <h6 className='text-muted'>{products?.stock} Pcs Available In Stock</h6>
            <div className='d-flex my-3 gap-3'>
              <button onClick={() => addWishHandle(products)} className="btn btn-success">
                <i className="fa-solid fa-heart"></i> ADD TO WISHLIST
              </button>
              <button onClick={() => addCartHandle(products)} className="btn btn-primary" >
                <i className="fa-solid fa-cart-shopping"></i> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='my-5'><Toaster gutter={50} position='top-center' toastOptions={{ duration: 3000 }} /></div>*/}

    </>
  )
}

export default ProductPage
