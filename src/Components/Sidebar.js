import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const [data,setData] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category-list').then((res) => setData(res.data));
  },[]);

  return (
    <>
        <div className='sidebar'>
            <NavLink to="/" className="nav-link sideLink">All Product</NavLink>
            {
              data.map((val,ind) => {
                return(
                  <NavLink to={`/${val}`} className='nav-link sideLink' key={ind}>{val}</NavLink>
                )
              })
            }
        </div> 
    </>
  )
}

export default Sidebar
