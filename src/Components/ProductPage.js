import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, addToWish } from './Slice';
import { Toaster } from 'react-hot-toast';

const ProductPage = () => {

  const [products, setProducts] = useState(null);
  const [Image, setImage] = useState(products?.images);
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

  return (
    <>
      <div className='productPageDiv container centered'>
        <div className='row pt-2'>
          <p className='d-flex'>
            <NavLink className="nav-link" to="/"> Home&nbsp;</NavLink> /<NavLink className="nav-link" to="/">&nbsp;Products&nbsp;</NavLink>/ {products?.title}
          </p>
        </div>
        <div className='row'>
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
          </div>
          <div className='col col-sm-5'>
            <img width="100%" height="400px" src={Image ? `${Image}` : `${products?.thumbnail}`} style={{ objectFit: "cover" }} alt={products?.title} />
            <div className='d-flex my-3 gap-3'>
              <button onClick={() => addWishHandle(products)} className="btn btn-success">
                <i className="fa-solid fa-heart"></i> ADD TO WISHLIST
              </button>
              <button onClick={() => addCartHandle(products)} className="btn btn-primary" >                
                  <i className="fa-solid fa-cart-shopping"></i> ADD TO CART
              </button>
            </div>
          </div>
          <div className='col col-sm-4'>
            <div className='d-flex justify-content-between'>
              <h6>{products?.category}</h6>
              <h6 className='text-muted' title='Share' style={{ cursor: "default" }} onClick={() => shareHandle(products)}>
                <i className="fa-solid fa-share"></i> Share
              </h6>
            </div>
            <h2>{products?.title}</h2>
            <p>{products?.description}</p>
            <div className='d-flex justify-center align-center'>
              <h3>${products?.price}</h3>&nbsp;
              <span className='pt-1 ml-5 text-success'> &nbsp;{products?.discountPercentage} % Off</span>
            </div>
            <h6 className='rating' style={{ backgroundColor: products?.rating > 4 ? "green" : products?.rating > 3 ? "red" : products?.rating > 2 ? "orange" : "" }}>
              {products?.rating} <i className="fa-solid fa-star"></i>
            </h6>
            <h6 className='text-muted'>{products?.stock} Pcs Available In Stock</h6>
          </div>
        </div>
      </div>
      <div className='my-5'><Toaster gutter={50} position='top-center' toastOptions={{ duration: 3000 }} /></div>

    </>
  )
}

export default ProductPage
