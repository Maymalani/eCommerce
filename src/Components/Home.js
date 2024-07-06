import React, { useState } from 'react'
import Products from './Products'
import { useParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

  document.title = 'Home';

  return (
    <>
      <section className='my-3'>
        <div className='container'>
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              <Products title={title} pagination={pagination} />
            </div>
            {
              !title ?
                <div className='w-full m-auto grid place-items-center mb-5'>
                  <Stack spacing={0} className=''>
                    <Pagination count={10} color='primary' size='large' page={page} onChange={paginationHandle} />
                  </Stack>
                </div>
                : ""
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
