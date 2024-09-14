import React, { useState, Suspense } from 'react'
import Products from './Products'
import { useParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';

const Home = () => {

  let { title } = useParams();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(0);

  const paginationHandle = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    let pageNo = value - 1;
    let skipApi = pageNo * 12;
    setPagination(skipApi);
  }

  const Loading = () => {
    return (
      <>
        <div className='flex justify-center items-center my-5'>
          <CircularProgress color='secondary' />
        </div>
      </>
    )
  }

  document.title = 'Home';

  return (
    <>
    <Helmet>
        <title>ECommerce Shop</title>
        <meta name="description" content="Latest ECommerce Shop" />
        <link rel="canonical" href={`https://e-commerceshop-mu.vercel.app/`} />
        <meta name="robots" content="index, follow" />
        {/*open graph*/}
        <meta property="og:title" content="E-Commerce Shop" />
        <meta property="og:description" content="All New Era and robust ecommerce website using latest technolgies like react and many more." />
        <meta property="og:image" content="https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg" />
        {/*open graph for twitter*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E-Commerce Project" />
        <meta name="twitter:description" content="E-Commerce Projects Made In ReactJs" />
        <meta name="twitter:image" content="https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg" />
        <meta name="twitter:url" content={`https://e-commerceshop-mu.vercel.app/product/`} />
      </Helmet>
      <section className='my-3'>
        <div className='container'>
          <Suspense fallback={<Loading />}>
            <h1 className='hidden'>E-Commerce Shop</h1>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              <Products title={title} pagination={pagination} />
            </div>
          </Suspense>
          {
            !title ?
              <div className='w-full m-auto grid place-items-center mb-5'>
                <Stack spacing={0}>
                  <Pagination count={10} color='secondary' shape='rounded' size='small' page={page} onChange={paginationHandle} />
                </Stack>
              </div>
              : ""
          }
        </div>
      </section>
    </>
  )
}

export default Home
