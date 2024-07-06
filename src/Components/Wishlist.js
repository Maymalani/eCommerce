import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { removeToWish, emptyWish } from './Slice';

const Wishlist = () => {

    const wish = useSelector((state) => state.cart.wish);
    const wishTotalItems = useSelector((state) => state.cart.wishTotalItems);
    const dispatch = useDispatch();
    const goback = () => window.history.back();

    document.title = "WishList";

    const emptyWishHandle = () => {
        if (window.confirm("Are You Sure To Empty Your WishList ?")) {
            dispatch(emptyWish());
        }
    }

    return (
        <>
            <div className='d-flex'>
                <div className="container">
                    <div className="flex justify-between items-center my-3">
                        <h1 className='text-2xl font-semibold'>Wishlist</h1>
                        <div className="flex">
                            <NavLink className="nav-link text-blue-500" to="/">Home&nbsp;</NavLink>/&nbsp;<span>Wishlist</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                wishTotalItems > 0 ? (
                    <>
                        <div>
                            <div className='container'>
                                <div className='flex'>
                                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                        {
                                            wish.map((val, ind) => {
                                                return (
                                                    <div key={ind} className='flex rounded-md bg-gray-300 overflow-hidden p-2'>
                                                        <div className='w-[40%]'>
                                                            <NavLink to={`/product/${val.id}`} className="w-full">
                                                                <img className='img-fluid cartImg w-full h-[90%]' src={val?.thumbnail} alt={val?.title} />
                                                            </NavLink>
                                                        </div>
                                                        <div className='w-[60%] flex flex-col justify-between p-2'>
                                                            <h2 className='font-semibold'>{val.title}</h2>
                                                            <div className='flex justify-between items-center'>
                                                                <h3>$ {val?.price}</h3>
                                                                <button className='bg-red-500 text-white px-2 py-1 rounded-md ml-auto' onClick={() => dispatch(removeToWish(ind))}>
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-secondary fixed bottom-0 right-0 left-0'>
                            <div className="container">
                                <div className='flex justify-center items-center py-2'>
                                    <button className='btn btn-danger mx-3' onClick={emptyWishHandle}>Empty WishList</button>
                                    <NavLink to="/cart" className='btn btn-success'>
                                        Go to Cart &nbsp;<i className="fa-solid fa-arrow-right"></i>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                    </>) :
                    <div>
                        <div className="container">
                            <div className='flex flex-col justify-between items-center'>
                                <i className="emptyIcon fa-solid fa-circle-xmark text-danger text-7xl my-3"></i>
                                <h2>Your Wishlist Is Empty !</h2>
                                <br />
                                <button onClick={goback} className='btn btn-primary mx-1'>Continue To Shopping</button>
                                <NavLink to="/" className='mx-1 my-3 text-blue-500 underline'>Go To Home</NavLink>
                            </div>
                        </div>
                    </div>

            }

        </>
    )
};

export default Wishlist;