import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllJobs } from '@/redux/jobSlice';

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector(store => store.job);
  
  useEffect(() =>{
    dispatch(fetchAllJobs());
  },[dispatch]);
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className="flex gap-5">
          <div className='w-1/5'>
            <FilterCard />
          </div>
          {
            allJobs.length <= 0 ? <span>Job not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                  {
                    allJobs.map((job) => (
                      <div key={job._id} className='max-h-screen overflow-hidden'>
                        <Job job={job} />
                      </div>
                    ))

                  }
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Jobs