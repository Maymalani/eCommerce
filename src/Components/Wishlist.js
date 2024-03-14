import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { removeToWish, addToCart,emptyWish } from './Slice';

const Wishlist = () => {

    const wish = useSelector((state) => state.cart.wish);
    const wishTotalItems = useSelector((state) => state.cart.wishTotalItems);
    const dispatch = useDispatch();
    const goback = () => window.history.back();

    document.title = "WishList";

    const emptyWishHandle = () => {
        if(window.confirm("Are You Sure To Empty Your WishList ?")){
            dispatch(emptyWish());
          }
    }

    return (
        <>
            <div className='d-flex'>
                <div className="container">
                    <div className="d-flex py-2">
                        <NavLink className="nav-link" to="/">Home / </NavLink>&nbsp;Wishlist
                    </div>
                </div>
            </div>
            {
                wishTotalItems > 0 ? (
                    <>
                        <div className='cartDiv'>
                            <div className='container'>
                                <div className='d-flex'>
                                    <Table striped bordered hover className='table'>
                                        <thead>
                                            <tr>
                                                <th>Products</th>
                                                <th>Descriptions</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='tableBody'>
                                            {
                                                wish.map((val, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td width="200px">
                                                                <NavLink to={`/product/${val.id}`}>
                                                                    <img className='img-fluid cartImg px-2' src={val?.thumbnail} alt={val?.title} />
                                                                </NavLink>
                                                            </td>
                                                            <td>{val.title}</td>
                                                            <td>$ {val?.price}</td>
                                                            <td>
                                                                <button className='btn btn-success mx-1' onClick={() => dispatch(addToCart(val))}>Add To Cart</button>
                                                                <button className='btn btn-danger mx-1' onClick={() => dispatch(removeToWish(ind))}>Remove</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex cartBottom bg-secondary'>
                            <div className="container pt-2">
                                <div className='d-flex pt-1'>
                                    <div className='m-auto'>
                                        <button className='btn btn-danger mx-3' onClick={emptyWishHandle}>Empty WishList</button>
                                        <NavLink to="/cart" className='btn btn-success'>
                                            Go to Cart <i className="fa-solid fa-arrow-right"></i>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>) : <div className='d-flex w-100'>
                    <div className="container pt-2">
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', alignItems: 'center' }}>
                            <i className="emptyIcon pt-1 fa-solid fa-circle-xmark text-danger my-5"></i>
                            <h2>Your Wishlist Is Empty !</h2>
                            <br />
                            <button onClick={goback} className='btn btn-primary mx-1'>Continue To Shopping</button>
                            <NavLink to="/" className='mx-1 my-3'>Go To Home</NavLink>
                        </div>
                    </div>
                </div>

            }

        </>
    )
};

export default Wishlist;