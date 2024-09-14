import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Checkout = () => {

  document.title = "Checkout"

  const total = useSelector((state) => state.cart.total);

  const [promoText, setPromoText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [btnText, setBtnText] = useState('Choose Method to Continue');

  let netTotal = total - discount;

  let paymentMethod = [
    {
      id: 1,
      name: "Credit / Debit Card",
      cName: "fa-solid fa-credit-card",
      itaTag: "",
      paymentName: "Credit/Debit Card"
    },
    {
      id: 2,
      name: "UPI",
      cName: "",
      itaTag: "UPI",
      paymentName: "UPI"
    },
    {
      id: 3,
      name: "Net-Banking",
      cName: "fa-solid fa-laptop",
      itaTag: "",
      paymentName: "NetBanking"
    },
    {
      id: 4,
      name: "PayPal",
      cName: "fa-brands fa-paypal",
      itaTag: "",
      paymentName: "PayPal"
    },
    {
      id: 5,
      name: "Pay With Rewards",
      cName: "fa-solid fa-coins",
      itaTag: "",
      paymentName: "Rewards"
    },
    {
      id: 6,
      name: "Binance",
      cName: "fa-brands fa-btc",
      itaTag: "",
      paymentName: "Binance"
    },
    {
      id: 7,
      name: "Cash On Delivery",
      cName: "fa-regular fa-money-bill-1",
      itaTag: "",
      paymentName: "COD"
    },
  ];

  const applyPromocode = (e) => {
    e.preventDefault();
    if (promoText) {
      setDiscount(promoText);
    } else {
      setDiscount(0);
    }
    setPromoText('');
  }

  const modalHandler = () => {
    if (netTotal > 0) {
      setModalShow(true);
    } else {
      if (window.confirm("Cart Total Is Zero. Please Add Product To Cart And Continue. Press Ok To Go To Cart")) {
        window.location.href = '/cart';
      }
    }
  }

  return (
    <>
      <div>
        <div className="container">
          <div className="flex justify-between items-center my-3">
            <h1 className='text-2xl font-semibold'>Checkout</h1>
            <p className='flex'>
              <NavLink className="nav-link text-blue-500" to="/">Home</NavLink>&nbsp; / &nbsp;<span>Checkout</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='container'>
          <div className='flex flex-wrap'>
            <div className='flex flex-col w-full md:w-1/2 bg-[#d9d3d2] p-3 mb-5 rounded-lg'>
              <h2 className='w-full font-semibold text-lg'>Contact Details</h2><br />
              <div className='flex flex-wrap'>
                <TextField id="outlined-basic" className="w-full md:w-1/2 mb-3 md:mb-0" label="First Name" variant="outlined" size='small' />
                <TextField id="outlined-basic" className='w-full md:w-1/2 mb-3 md:mb-0' label="Last Name" variant="outlined" size='small' />
              </div>
              <TextField id="outlined-basic" className='w-full mt-0' label="Mobile No" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='w-full mt-3' label="Email Address" variant="outlined" size='small' />
              <h6 className='w-full my-3 font-semibold text-lg'>Address</h6>
              <TextField id="outlined-basic" className='w-full' label="House / Flat / Block No" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='my-3 w-full' label="Apartment / Road / Area" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mb-3' label="Landmark" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="City" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='my-3 w-full' label="Taluka" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="State" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mt-3 w-full' label="Pincode" variant="outlined" size='small' />
              <h6 className='w-full my-3 font-semibold text-lg'>Any Messages</h6>
              <TextField id="standard-multiline-static" multiline rows={3} className='w-full' label="Messages Here" variant="outlined" size='small' />
              <button className="mt-3 px-2 py-1 bg-purple-500 text-white rounded-md w-full md:w-1/2 m-auto hover:bg-purple-600 transition-[background]">Save Details</button>
            </div>
            <div className='flex flex-col w-full md:w-1/2 px-3'>
              <h6 className='text-left font-semibold text-xl'>Order Summary</h6>
              <form onSubmit={applyPromocode} className='my-3 relative'>
                <TextField value={promoText} onChange={(e) => setPromoText(e.target.value)} id="outlined-basic" className='promoInput w-full' label="Have You , Promocode ?" variant="outlined" size='small' />
                <button className='promoBtn btn btn-primary absolute bottom-0 right-0' disabled={!netTotal > 0}>{netTotal > 0 ? "Apply Promocode" : "Cart is Empty"}</button>
              </form>
              <h6 className='flex justify-between mb-3 text-base font-semibold'>Sub Total : <span>$  {total ? total : "0"}</span></h6>
              <h6 className='flex justify-between mb-3 text-base font-semibold'>Discount : <span>$ {discount}</span></h6>
              <h6 className='flex justify-between mb-3 text-base font-semibold'>Net Payable : <span>$ {netTotal}</span></h6>
              <button className='btn btn-success w-full' disabled={!netTotal > 0} onClick={() => modalHandler()}>{netTotal > 0 ? `Pay $ ${netTotal}` : "Cart is Empty ! Add Products To Continue"}</button>
            </div>
          </div>
        </div>
      </div>
      {/*<div>
        <div className='container'>
          <div className='flex justify-between'>
            <div className="col col-1 col-sm-6 px-5 py-3 flex justify-between flex-wrap" style={{ backgroundColor: "#d9d3d2" }}>
              <h6 className='w-full mb-3'>Contact Details</h6>
              <TextField id="outlined-basic" className="w-1/2" label="First Name" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='w-1/2' label="Last Name" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mt-3 w-full' label="Mobile No" variant="outlined" size='small' /><br />
              <TextField id="outlined-basic" className='mt-3 w-full' label="Email Address" variant="outlined" size='small' />
              <h6 className='w-full my-3'>Address</h6>
              <TextField id="outlined-basic" className='w-full' label="House / Flat / Block No" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='my-3 w-full' label="Apartment / Road / Area" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mb-3' label="Landmark" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="City" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='my-3w-full' label="Taluka" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="State" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mt-3 w-full' label="Pincode" variant="outlined" size='small' />
              <h6 className='pt-2 w-full'>Any Messages</h6>
              <TextField id="standard-multiline-static" multiline rows={3} className='w-full' label="Messages Here" variant="outlined" size='small' />
            </div>
            <div className="col col-2 col-sm-5 mt-5 px-5 py-3">
              <h5 className='text-center pb-5'>Order Summary</h5>
              <div className='promoDiv pb-3'>
                <TextField value={promoText} onChange={(e) => setPromoText(e.target.value)} id="outlined-basic" className='promoInput w-full' label="Promocode" variant="outlined" size='small' />
                <button className='promoBtn btn btn-primary'>Apply Promocode</button>
              </div>
              <h6 className='flex justify-between'>Sub Total : <span>$  {total ? total : "0"}</span></h6>
              <h6 className='flex justify-between'>Discount : <span>$ {discount ? discount : '0'}</span></h6>
              <h6 className='flex justify-between'>Net Payable : <span>$ {netTotal ? netTotal : '0'}</span></h6>
              <h6>Choose Payment Method <i className="fa-solid fa-caret-down"></i></h6>
              <button className='btn btn-success my-5 w-full' onClick={() => modalHandler()}>Pay $ {netTotal}</button>
            </div>
          </div>
        </div>
      </div>*/}
      <Modal show={modalShow} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className='bg-dark text-white'>
          <h2 className='text-center flex justify-between text-white'>Payment <i onClick={() => setModalShow(false)} title='Close' className="d-flex text-danger justify-content-between fa-solid fa-xmark"></i></h2>
          <p className='text-secondary pt-3'>How Would You Like To Pay</p>
          {
            paymentMethod.map((val, ind) => {
              return (
                <div className='paymentMethod flex justify-between' onClick={() => setBtnText(`Pay $${netTotal} with ${val.paymentName}`)} id={val.id} key={ind}>
                  <h6>{val.name}</h6>
                  <i className={val.cName}>{val.itaTag}</i>
                </div>
              )
            })
          }
          <Button className='w-full' onClick={() => setModalShow(false)}>{btnText}</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Checkout
