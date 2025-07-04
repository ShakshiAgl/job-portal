import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-4 sm:mx-6 md:mx-20 lg:mx-40 my-16">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-[#2b676b]">Current Openings</span> <span className='text-[#7f9697]'> You shouldn't miss</span>

      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {
          allJobs.length <= 0 ? (
            <span>No Jobs available</span>
          ) : (
            allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id || job.id} job={job} />
            ))
          )
        }
      </div>
    </div>
  );
}

export default LatestJobs;
