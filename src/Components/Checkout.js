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
  const [btnText, setBtnText] = useState('Choose Method to Continue');

  let discount = promoText;

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

  const modalHandler = () => {
    if(netTotal > 0){
      setModalShow(true);
    }else{
      if(window.confirm("Cart Total Is Zero. Please Add Product To Cart And Continue. Press Ok To Go To Cart")){
        window.location.href = '/cart';
      }
    }
  }

  return (
    <>
      <div className='d-flex'>
        <div className="container">
          <div className="d-flex pt-2">
            <NavLink className="nav-link" to="/">Home / </NavLink>&nbsp;Checkout
          </div>
        </div>
      </div>
      <div className='cartDiv py-3'>
        <div className='container'>
          <div className='d-flex justify-content-between'>
            <div className="col col-1 col-sm-6 px-5 py-3 d-flex justify-content-between flex-wrap" style={{ backgroundColor: "#d9d3d2" }}>
              <h6 className='w-100'>Contact Details</h6>
              <TextField id="outlined-basic" label="First Name" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="Last Name" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mt-3 w-100' label="Mobile No" variant="outlined" size='small' /><br />
              <TextField id="outlined-basic" className='mt-3 w-100' label="Email Address" variant="outlined" size='small' />
              <h6 className='pt-2 w-100'>Address</h6>
              <TextField id="outlined-basic" className='w-100' label="House / Flat / Block No" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='my-3 w-100' label="Apartment / Road / Area" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mb-3' label="Landmark" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="City" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='my-3w-100' label="Taluka" variant="outlined" size='small' />
              <TextField id="outlined-basic" label="State" variant="outlined" size='small' />
              <TextField id="outlined-basic" className='mt-3 w-100' label="Pincode" variant="outlined" size='small' />
              <h6 className='pt-2 w-100'>Any Messages</h6>
              <TextField id="standard-multiline-static" multiline rows={3} className='w-100' label="Messages Here" variant="outlined" size='small' />
            </div>
            <div className="col col-2 col-sm-5 mt-5 px-5 py-3">
              <h5 className='text-center pb-5'>Order Summary</h5>
              <div className='promoDiv pb-3'>
                <TextField value={promoText} onChange={(e) => setPromoText(e.target.value)} id="outlined-basic" className='promoInput w-100' label="Promocode" variant="outlined" size='small' />
                <button className='promoBtn btn btn-primary'>Apply Promocode</button>
              </div>
              <h6 className='d-flex justify-content-between'>Sub Total : <span>$  {total ? total : "0"}</span></h6>
              <h6 className='d-flex justify-content-between'>Discount : <span>$ {discount ? discount : '0'}</span></h6>
              <h6 className='d-flex justify-content-between'>Net Payable : <span>$ {netTotal ? netTotal : '0'}</span></h6>
              <h6>Choose Payment Method <i className="fa-solid fa-caret-down"></i></h6>
              <button className='btn btn-success my-5 w-100' onClick={() => modalHandler()}>Pay $ {netTotal}</button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalShow} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className='bg-dark text-white'>
          <h4 className='text-center d-flex justify-content-between text-white'>Payment <i onClick={() => setModalShow(false)} title='Close' className="d-flex text-danger justify-content-between fa-solid fa-xmark"></i></h4>
          <p className='text-secondary pt-3'>How Would You Like To Pay</p>
          {
            paymentMethod.map((val, ind) => {
              return (
                <div className='paymentMethod d-flex justify-content-between' onClick={() => setBtnText(`Pay $${netTotal} with ${val.paymentName}`)} id={val.id} key={ind}>
                  <h6>{val.name}</h6>
                  <i className={val.cName}>{val.itaTag}</i>
                </div>
              )
            })
          }
          <Button className='w-100' onClick={() => setModalShow(false)}>{btnText}</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Checkout
