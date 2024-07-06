import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { addToCart, addToWish } from './Slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Search = () => {

    const { searchText } = useParams();
    const [searchProduct, setSearchProduct] = useState([]);
    const cart = useSelector((state) => state.cart.cart);
    const wish = useSelector((state) => state.cart.wish);


    useEffect(() => {
        if (searchText) {
            axios.get(`https://dummyjson.com/products/search?q=${searchText}`).then(res => setSearchProduct(res.data.products))
        }
    }, [searchText])

    const dispatch = useDispatch();
    const addCartHandler = (event, value) => {
        event.preventDefault();
        dispatch(addToCart(value));
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
            <div className='flex'>
                <div className="container">
                    <div className="flex justify-between items-center my-3">
                        <h1 className='text-2xl font-semibold'>Search Result for "{searchText}"</h1>
                        <div className="flex">
                            <NavLink className="nav-link text-purple-600" to="/">Home&nbsp;</NavLink>/&nbsp;<span>Search</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <div className='container'>
                    <div className='flex justify-center'>
                        {
                            searchProduct.length > 0 ?
                                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                                    {
                                        searchProduct.map((val, ind) => {
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
                                </div>
                                :
                                <div>
                                    <p className='font-semibold text-lg'>No Products Found Based On Your Search "{searchText}"</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
