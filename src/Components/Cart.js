import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeToCart, increment, decrement, emptyCart } from './Slice';

const Cart = () => {

  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();
  const goback = () => {
    window.history.back();
  }

  const emptyCartHandle = () => {
    if (window.confirm("Are You Sure To Empty Your Cart ?")) {
      dispatch(emptyCart());
    }
  }

  document.title = "Cart";

  return (
    <>
      <div className='d-flex'>
        <div className="container">
          <div className="flex justify-between items-center my-3">
            <h1 className='text-2xl font-semibold'>Cart</h1>
            <div className="flex">
              <NavLink className="nav-link text-purple-600" to="/">Home&nbsp;</NavLink>/&nbsp;<span>Cart</span>
            </div>
          </div>
        </div>
      </div>
      {
        totalItems > 0 ? (
          <>
            <div className='mb-[100px]'>
              <div className='container'>
                <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {
                    cart.map((val, ind) => {
                      return (
                        <div key={ind} className='flex rounded-md bg-gray-300 overflow-hidden p-2'>
                          <div className='w-[40%]'>
                            <NavLink to={`/product/${val.id}`} className="w-full">
                              <img className='img-fluid cartImg w-full h-[90%]' src={val?.thumbnail} alt={val?.title} />
                            </NavLink>
                          </div>
                          <div className='w-[60%] flex flex-col justify-between p-2'>
                            <h2 className='font-semibold'>{val.title}</h2>
                            <div className='flex justify-between items-center my-3'>
                              <div className='bg-black text-white w-[80px] rounded-full flex justify-center items-center gap-x-2'>
                                <button onClick={() => dispatch(decrement(ind))}>-</button>
                                <span>{val.qty}</span>
                                <button onClick={() => dispatch(increment(ind))}>+</button>
                              </div>
                            </div>
                            <div className='flex justify-between items-center'>
                              <h3>$ {val?.price}</h3>
                              <button className='bg-red-500 text-white px-2 py-1 rounded-md ml-auto' onClick={() => dispatch(removeToCart(ind))}>
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
            <div className='bg-secondary fixed bottom-0 right-0 w-full'>
              <div className="container">
                <div className='flex flex-wrap justify-center md:justify-between items-center py-2'>
                  <h4 className="text-dark text-lg font-bold mb-2 sm:mb-0">Total : ${total ? total.toFixed(2) : 0}</h4>
                  <div>
                    <NavLink to="/wishlist" className='btn btn-success'>
                      <i className="fa-solid fa-arrow-left"></i> Go To Wishlist
                    </NavLink>
                    <button className='btn btn-danger mx-3' onClick={emptyCartHandle}>Empty Cart</button>
                    <NavLink to="/checkout" className='btn btn-success'>
                      CheckOut <i className="fa-solid fa-arrow-right"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </>) :
          <div>
            <div className="container">
              <div className='flex flex-col justify-between items-center'>
                <i className="fa-solid fa-circle-xmark text-danger text-7xl my-3"></i>
                <h2>Your Cart Is Empty !</h2>
                <br />
                <button onClick={goback} className='bg-purple-600 text-white px-4 py-2 rounded-md'>Continue To Shopping</button>
                <NavLink to="/" className='mx-1 my-3 text-purple-600 underline'>Go To Home</NavLink>
              </div>
            </div>
          </div>
      }
      {/* <div className='cartDiv'>
        <div className='container'>
          <div className='d-flex'>
            <Table striped bordered hover className='table'>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Descriptions</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='tableBody'>
                {
                  cart.map((val, ind) => {
                    return (
                      <tr key={ind}>
                        <td width="200px"><img className='img-fluid cartImg px-2' src={val?.thumbnail} alt={val?.title} /></td>
                        <td>{val.title}</td>
                        <td>
                          <div className='qtyDiv'>
                            <button className='qtyBtn'>-</button>
                            <span className="">{val?.qty}</span>
                            <button className="qtyBtn">+</button>
                          </div>
                        </td>
                        <td>$ {val?.price}</td>
                        <td>
                          <button className='btn btn-primary' onClick={() => dispatch(removeToCart(ind))}>Remove</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div> */}
      {/* <div className='d-flex cartBottom bg-secondary'>
        <div className="container pt-2">
          <div className='d-flex justify-content-between pt-1'>
            <h4 className="text-dark">Total : $ {total}</h4>
            <div>
              <button className='btn btn-danger mx-3'>Empty Cart</button>
              <NavLink to="/checkout" className='btn btn-success'>
                CheckOut <i className="fa-solid fa-arrow-right"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Cart
