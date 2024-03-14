import React from 'react'
import Sidebar from './Sidebar'
import Products from './Products'
import { useParams } from 'react-router-dom'

const Home = ({search,set}) => {

  let { title } = useParams();

  document.title = 'Home';

  return (
    <>
      <div className='main d-flex'>
        <div>
          <Sidebar />
        </div>
        <div className='productCardDiv'>
          <Products title={title} search={search} />
        </div>
      </div>
    </>
  )
}

export default Home
