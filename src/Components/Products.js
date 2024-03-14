import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { addToCart , addToWish } from './Slice';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const Products = ({ title, search }) => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(0);
  const dispatch = useDispatch();

  let docTitle = title;

  document.title = docTitle ? `Products - ${docTitle}` : "";

  useEffect(() => {
    if (title) {
      axios.get(`https://dummyjson.com/products/category/${title}`).then(res => setData(res.data.products))
    } else if (search) {
      axios.get(`https://dummyjson.com/products/search?q=${search}`).then(res => setData(res.data.products));
    }
    else {
      axios.get(`https://dummyjson.com/products?skip=${pagination}&limit=9`).then(res => setData(res.data.products))
    }
  }, [title, pagination, search]);

  const paginationHandle = (event, value) => {
    setPage(value);
    let pageNo = value - 1;
    let skipApi = pageNo * 9;
    setPagination(skipApi);
  }

  const addCartHandler = (event, value) => {
    event.preventDefault();
    dispatch(addToCart(value));
  }

  const addWishHandler = (event, value) => {
    event.preventDefault();
    dispatch(addToWish(value));
  }

  return (
    <>
      {
        data.length > 0 ?
          (
            <>  {
              data.map((val, ind) => {
                return (
                  <NavLink to={`/product/${val.id}`} className='cardBody nav-link card' key={ind}>
                    <div className='imgFrame' title={val.title}>
                      <img src={val.thumbnail} alt={val.title} />
                    </div>
                    <div className='d-flex justify-content-between py-2'>
                      <h6 className='px-2'>{val.title}</h6>
                      <h6 className='rating bg-white text-success'>{val.rating} <i className="fa-solid fa-star"></i></h6>
                    </div>
                    <div className='priceDiv px-2 pb-2 d-flex justify-content-between'>
                      <p className="pt-3">${val.price}</p>
                      <div className="d-flex">
                        <i onClick={(e) => addWishHandler(e,val)} className="pt-4 fa-solid fa-heart fa-xl text-muted wishIcon"></i>
                        <button className='btn btn-primary m-2' onClick={(e) => addCartHandler(e, val)}>Add To cart</button>
                      </div>
                    </div>
                  </NavLink>
                )
              })
            }{
                !title && !search ? <Stack spacing={5} className='m-auto my-5'>
                  <Pagination count={10} color='primary' size='large' page={page} onChange={paginationHandle} />
                </Stack> : ""
              }
            </>) :
          <div className='w-100 mt-5 text-center align-items-center justify-content-center'>
            <h4><span className='text-danger'> OOPS </span>! No Products Found Based On Your Search "{search}"</h4>
            <h6 className="text-success">Please Search Another Keyword To Continue</h6>
          </div>
      }
      <div className='my-5'><Toaster gutter={50} position='top-center' toastOptions={{ duration: 3000 }} /></div>
    </>
  )
}

export default Products
