import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TextField } from '@mui/material';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

const Topnav = () => {

    const [modalShow, setModalShow] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [showSearchModel, setShowSearchModel] = useState(false);
    const [sideLink, setSideLink] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://dummyjson.com/products/category-list').then((res) => setSideLink(res.data));
    }, []);

    const totalItems = useSelector((state) => state.cart.totalItems);
    const wishTotalItems = useSelector((state) => state.cart.wishTotalItems);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`/search/${search}`);
            setSearch("");
            setShowSearchModel(false)
        } else {
            window.alert("Please Enter Keyword To Search")
        }
    }

    return (
        <>
            <header className='h-[68px] shadow-md'>
                <div className='container'>
                    <div className='flex justify-between items-center py-3'>
                        <div className='w-full md:w-auto flex justify-between items-center'>
                            <div className='flex items-center'>
                                <i className="fa-solid fa-bars cursor-pointer pt-2 text-purple-600" onClick={() => setShow(true)}></i>
                                <h1><NavLink to={"/"} className="text-2xl mx-2 text-purple-600">ecommerce</NavLink></h1>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <button onClick={() => setShowSearchModel(true)} className='outline-none border-none block md:hidden'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <NavLink to={"/cart"} className="block md:hidden relative">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span style={{ display: totalItems > 0 ? "flex" : "none" }} className='absolute w-[15px] h-[15px] flex justify-center items-center bg-red-500 -top-1 -right-1 rounded-full text-white text-[8px]'>{totalItems}</span>
                                </NavLink>
                                <NavLink to={"/wishlist"} className="block md:hidden relative">
                                    <i className="fa-solid fa-heart"></i>
                                    <span style={{ display: wishTotalItems > 0 ? "flex" : "none" }} className='absolute w-[15px] h-[15px] flex justify-center items-center bg-red-500 -top-1 -right-1 rounded-full text-white'>{wishTotalItems}</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className='hidden md:block'>
                            <div className='flex justify-between items-center text-white gap-x-2'>
                                <button onClick={() => setShowSearchModel(true)} className="hover:bg-gray-200 text-black hover:text-white py-1 px-2 rounded-md">
                                    <i className="fa-solid fa-magnifying-glass mx-1"></i><span className='mx-1 text-black'>Search</span>
                                </button>
                                <NavLink to={"/cart"} className="hover:bg-gray-200 text-black hover:text-white py-1 px-2 rounded-md relative">
                                    <i className="fa-solid fa-cart-shopping mx-1"></i> <span className='mx-1'>Cart</span>
                                    <span style={{ display: totalItems > 0 ? "flex" : "none" }} className='absolute w-[20px] h-[20px] flex justify-center items-center bg-red-500 top-0 right-0 rounded-full text-white'>{totalItems}</span>
                                </NavLink>
                                <NavLink to={"/wishlist"} className="hover:bg-gray-200 text-black hover:text-white py-1 px-2 rounded-md relative">
                                    <i className="fa-solid fa-heart"></i> <span className='mx-1'>WishList</span>
                                    <span style={{ display: wishTotalItems > 0 ? "flex" : "none" }} className='absolute w-[20px] h-[20px] flex justify-center items-center bg-red-500 top-0 right-0 rounded-full text-white'>{wishTotalItems}</span>
                                </NavLink>
                                <button className="bg-purple-600 text-white capitalize py-1 px-3 rounded-md" onClick={() => { setModalShow(true); setShow(false) }}>Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Modal show={modalShow} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                {

                    signIn ? (
                        <>
                            <Modal.Body className='text-dark'>
                                <h4 className='text-center'>Sign Up</h4>
                                <label>Name</label>
                                <TextField id="outlined-basic" className='w-100 my-1' label="Name" variant="outlined" size='small' />
                                <label>Mobile Number</label>
                                <TextField id="outlined-basic" className='w-100 my-1' label="Mobile" variant="outlined" size='small' />
                                <label>Email</label>
                                <TextField id="outlined-basic" className='w-100 my-1' label="Email" variant="outlined" size='small' />
                                <label>Password</label>
                                <TextField id="outlined-basic" className='w-100 my-1 mb-2' label="Password" variant="outlined" size='small' />
                                <Button className='w-100 bg-purple-500' onClick={() => setModalShow(false)}>Sign Up</Button>
                                <div className='w-100 mt-4'>
                                    <h6 className='text-center mb-4'>Also Sign Up With</h6>
                                    <div className='d-flex justify-content-evenly'>
                                        <div className="d-flex flex-column justify-content-evenly align-items-center">
                                            <i className="social rounded-circle fa-brands fa-google"></i>
                                            <span>Google</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-evenly align-items-center">
                                            <i className="social rounded-circle fa-brands fa-facebook"></i>
                                            <span>Facebook</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-evenly align-items-center">
                                            <i className="social rounded-circle fa-solid fa-phone"></i>
                                            <span>TrueCaller</span>
                                        </div>
                                    </div>
                                    <h6 className='pt-4 text-center' onClick={() => setSignIn(false)}>Back To <NavLink className="text-purple-600">Log In </NavLink>?</h6>
                                </div>
                            </Modal.Body>
                        </>) : (
                        <>
                            <Modal.Body className='text-dark'>
                                <h4 className='text-center'>Login</h4>
                                <label>Email/Phone</label>
                                <TextField id="outlined-basic" className='w-100 my-1' label="Email or Phone" variant="outlined" size='small' />
                                <label>Password</label>
                                <TextField id="outlined-basic" className='w-100 my-1 mb-2' label="Password" variant="outlined" size='small' />
                                <Button className='w-100 bg-purple-600' onClick={() => setModalShow(false)}>Log In</Button>
                                <div className='d-flex justify-content-end pt-3 '>
                                    <NavLink className="text-purple-600">Forgot Password ?</NavLink>
                                </div>
                                <div className='w-100 mt-4'>
                                    <h6 className='text-center mb-4'>Also Login With</h6>
                                    <div className='d-flex justify-content-evenly'>
                                        <div className="d-flex flex-column justify-content-evenly align-items-center">
                                            <i className="social rounded-circle fa-brands fa-google"></i>
                                            <span>Google</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-evenly align-items-center">
                                            <i className="social rounded-circle fa-brands fa-facebook"></i>
                                            <span>Facebook</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-evenly align-items-center">
                                            <i className="social rounded-circle fa-solid fa-phone"></i>
                                            <span>TrueCaller</span>
                                        </div>
                                    </div>
                                    <h6 className='pt-4 text-center' onClick={() => setSignIn(true)}>Are You New User ? <NavLink className="text-purple-600"> Sign Up </NavLink>Here</h6>
                                </div>
                            </Modal.Body>
                        </>)
                }
            </Modal>
            <Modal show={showSearchModel} onHide={() => setShowSearchModel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Products</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <p>Type Keyword and Press <kbd>Enter</kbd> To Search</p>
                        <div className='my-3 relative'>
                            <input type="text" value={search} className="w-full border-[1px] border-black outline-none px-2 py-2 text-lg rounded-md" onChange={(e) => setSearch(e.target.value)} placeholder='Search Products' />
                            <i className={`fa-solid fa-xmark absolute top-5 right-1 fa-xl cursor-pointer ${search ? "block" : "hidden"}`} onClick={() => setSearch("")}></i>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='px-4 py-2 bg-purple-500 text-white rounded-md'>Search</button>
                    </Modal.Footer>
                </form>
            </Modal>
            <Offcanvas show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>E-Commerce</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='flex flex-col w-[100%] m-auto my-2 md:hidden'>
                        <div className='flex justify-between items-center my-2 gap-x-2'>
                            <NavLink to={"/cart"} onClick={() => setShow(false)} className={`w-1/2 flex ${totalItems > 0 ? "justify-between" : "justify-center"} items-center bg-gray-200 text-black hover:text-white py-1 px-2 rounded-md`}>
                                <div><i className="fa-solid fa-cart-shopping mx-1"></i> <span className='mx-1'>Cart</span></div>
                                <span style={{ display: totalItems > 0 ? "flex" : "none" }} className=' w-[20px] h-[20px] flex justify-center items-center bg-red-500 top-[6px] right-1 rounded-full text-white'>{totalItems}</span>
                            </NavLink>
                            <NavLink to={"/wishlist"} onClick={() => setShow(false)} className={`w-1/2 flex ${wishTotalItems > 0 ? "justify-between" : "justify-center"} items-center bg-gray-200 text-black hover:text-white py-1 px-2 rounded-md`}>
                                <div><i className="fa-solid fa-heart"></i> <span className='mx-1'>WishList</span></div>
                                <span style={{ display: wishTotalItems > 0 ? "flex" : "none" }} className=' w-[20px] h-[20px] flex justify-center items-center bg-red-500 top-[6px] right-1 rounded-full text-white'>{wishTotalItems}</span>
                            </NavLink>
                        </div>
                        <button className="bg-purple-500 text-white capitalize py-1 px-3 rounded-md mb-1" onClick={() => { setModalShow(true); setShow(false) }}>Log In</button>
                        <button className="bg-purple-500 text-white capitalize py-1 px-3 rounded-md" onClick={() => { setModalShow(true); setShow(false); setSignIn(true) }}>Register</button>
                    </div>
                    <NavLink to="/" className="nav-link sideLink py-2 px-1 rounded-md" onClick={() => setShow(false)}>All Product</NavLink>
                    <p className='text-muted text-xs my-2'>Categories</p>
                    {
                        sideLink.map((val, ind) => {
                            return (
                                <NavLink to={`/${val}`} className='nav-link sideLink py-2 px-1 rounded-md mb-2' key={ind} onClick={() => setShow(false)}>{val}</NavLink>
                            )
                        })
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Topnav;
