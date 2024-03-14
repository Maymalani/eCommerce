import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TextField } from '@mui/material';

const Topnav = ({ setSearch, search }) => {

    const [modalShow, setModalShow] = useState(false);
    const [signIn, setSignIn] = useState(false);


    const searchHandler = (e) => {
        setSearch(e.target.value)
    };

    const totalItems = useSelector((state) => state.cart.totalItems);
    const wishTotalItems = useSelector((state) => state.cart.wishTotalItems);

    return (
        <>
            {/* <div className="bg-dark navDiv">
                <div className='container'> */}
            <nav className="navbar w-100 bg-dark bg-body-tertiary navbar-expand-lg text-white px-5" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">E-Commerce</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <form className="d-flex m-auto" role="search">
                            <input className="form-control w-100 border border-dark" value={search} onChange={searchHandler} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link cartDivNav" to="/cart">
                                    {/* <div className="d-flex cartDiv mx-2"> */}
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <i className="fa-solid fa-cart-shopping mx-1"></i> <span className='mx-1'>Cart</span>
                                    </div>
                                    <span style={{ display: totalItems > 0 ? "grid" : "none" }} className='cartCounter bg-danger text-white'>{totalItems}</span>
                                    {/* </div> */}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link wishlist" to="/wishlist">
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <i className="fa-solid fa-heart"></i> <span className='mx-1'>WishList</span>
                                    </div>
                                    <span style={{ display: wishTotalItems > 0 ? "grid" : "none" }} className="wishCounter bg-danger text-white">{wishTotalItems}</span>
                                </NavLink>
                            </li>
                            <button className="btn btn-primary pl-5" onClick={() => setModalShow(true)}>Log In / Sign Up</button>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* </div>
            </div> */}
            {/* <Navbar className='navBar' bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
                    <div className="searchBarDiv">
                        <input type="text" value={search} onChange={searchHandler} placeholder='Search' className="searchBar" />
                        <button className='searchBtn'>🔍</button>
                    </div>
                    <Nav className="ml-auto">
                        <NavLink className='nav-link text-white' to="/cart" title='cart'>
                            <div className="d-flex cartDiv mx-2">
                                <i className="fa-solid fa-cart-shopping fa-xl"></i>
                                <h6 style={{ display: totalItems > 0 ? "block" : "none" }} className='cartCounter bg-danger text-white'>{totalItems}</h6>
                            </div>
                        </NavLink>
                        <NavLink className='nav-link text-white mx-1 wishlist' to="/wishlist" title='Wishlist'>
                            <i className="fa-solid fa-heart fa-xl"></i>
                            <h6 style={{ display: wishTotalItems > 0 ? "block" : "none" }} className="cartCounter bg-danger text-white">{wishTotalItems}</h6>
                        </NavLink>
                        <button className="btn btn-primary pl-5" onClick={() => setModalShow(true)}>Log In / Sign Up</button>
                    </Nav>
                </Container>
            </Navbar> */}
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
                                <Button className='w-100' onClick={() => setModalShow(false)}>Sign Up</Button>
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
                                    <h6 className='pt-4 text-center' onClick={() => setSignIn(false)}>Back To <NavLink>Log In </NavLink>?</h6>
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
                                <Button className='w-100' onClick={() => setModalShow(false)}>Log In</Button>
                                <div className='d-flex justify-content-end pt-3 '>
                                    <NavLink>Forgot Password ?</NavLink>
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
                                    <h6 className='pt-4 text-center' onClick={() => setSignIn(true)}>Are You New User ? <NavLink> Sign Up </NavLink>Here</h6>
                                </div>
                            </Modal.Body>
                        </>)
                }
            </Modal>
        </>
    )
}

export default Topnav;
