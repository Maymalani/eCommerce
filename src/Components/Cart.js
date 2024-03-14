import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { removeToCart, increment, decrement ,emptyCart} from './Slice';

const Cart = () => {

  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();
  const goback = () => {
    window.history.back();
  }

  const emptyCartHandle = () => {
    if(window.confirm("Are You Sure To Empty Your Cart ?")){
      dispatch(emptyCart());
    }
  }

  document.title = "Cart";

  return (
    <>
      <div className='d-flex'>
        <div className="container">
          <div className="d-flex py-2">
            <NavLink className="nav-link" to="/">Home / </NavLink>&nbsp;Cart
          </div>
        </div>
      </div>
      {
        totalItems > 0 ? (
          <>
            <div className='cartDiv'>
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
                              <td width="200px">
                                <NavLink to={`/product/${val.id}`}>
                                  <img className='img-fluid cartImg px-2' src={val?.thumbnail} alt={val?.title} />
                                </NavLink>
                              </td>
                              <td>{val.title}</td>
                              <td>
                                <div className='qtyDiv'>
                                  <button className='qtyBtn' onClick={() => dispatch(decrement(ind))}>-</button>
                                  <span className="">{val.qty}</span>
                                  <button className="qtyBtn" onClick={() => dispatch(increment(ind))}>+</button>
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
            </div>
            <div className='d-flex cartBottom bg-secondary'>
              <div className="container pt-2">
                <div className='d-flex justify-content-between pt-1'>
                  <h4 className="text-dark">Total : ${total ? total : total}</h4>
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
          <div className='d-flex w-100'>
            <div className="container pt-2">
              <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', alignItems: 'center' }}>
                <i className="emptyIcon fa-solid fa-circle-xmark text-danger pt-1 my-5"></i>
                <h2>Your Cart Is Empty !</h2>
                <br />
                <button onClick={goback} className='btn btn-primary mx-1'>Continue To Shopping</button>
                <NavLink to="/" className='mx-1 my-3'>Go To Home</NavLink>
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
