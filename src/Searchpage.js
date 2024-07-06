import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Components/Sidebar';
import { NavLink } from 'react-router-dom';

const Searchpage = ({ search }) => {

    const [searchData, setSearchdata] = useState([]);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/search?q=${search}`).then(res => setSearchdata(res.data.products));
    }, [search]);

    const isInCart = (title) => {
        return cart.some(item => item.title === title)
      }
    
      const isInWish = (title) => {
        return wish.some(item => item.title === title)
      }


    return (
        <>
            <div className='main d-flex'>
                <div>
                    <Sidebar />
                </div>
                <div className='productCardDiv'>
                    {
                        searchData.length > 0 ?
                            (
                                <>
                                    {
                                        searchData.map((val, ind) => {
                                            return (
                                                <NavLink to={`/product/${val.id}`} className='cardBody nav-link card' key={ind}>
                                                    <div className='imgFrame' title={val.title}>
                                                        <img src={val.thumbnail} alt={val.title} />
                                                    </div>
                                                    <div className='d-flex justify-content-between py-2'>
                                                        <h6 className='px-2'>{val.title}</h6>
                                                    </div>
                                                    <div className='priceDiv px-2 pb-2 d-flex justify-content-between'>
                                                        <p>${val.price}</p>
                                                        <h6 className='rating bg-white text-success'>{val.rating} <i className="fa-solid fa-star"></i></h6>
                                                    </div>
                                                </NavLink>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <div className='w-100 justify-content-center'>
                                    <h6>No product Found</h6>
                                </div>
                            )
                    }

                </div>
            </div>
        </>
    )
}

export default Searchpage
