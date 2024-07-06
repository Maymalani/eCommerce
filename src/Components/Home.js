import React, { useState, Suspense } from 'react'
import Products from './Products'
import { useParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';

const Home = () => {

  let { title } = useParams();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(0);

  const paginationHandle = (event, value) => {
    setPage(value);
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
      <section className='my-3'>
        <div className='container'>
          <Suspense fallback={<Loading />}>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              <Products title={title} pagination={pagination} />
            </div>
          </Suspense>
          {
            !title ?
              <div className='w-full m-auto grid place-items-center mb-5'>
                <Stack spacing={0}>
                  <Pagination count={10} color='secondary' size='small' page={page} onChange={paginationHandle} />
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
