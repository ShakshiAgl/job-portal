import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>Title</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs" variant="ghost">
              12 Positions
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs" variant="ghost">
              Part Time
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs" variant="ghost">
              24 LPA
            </Badge>
          </div>
        </div>
        <Button disabled={isApplied}
          className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0e7777] hover:bg-[#5b8888]'}`}>
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>
      <h1 className='border b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='my-1 font-medium text2xl'>Role: <span className='pl-4 font-normal text-gray-800'> Frontend Developer </span></h1>
        <h1 className='my-1 font-normal text-2xl'>Location: <span className='pl-4 font-normal text-gray-800'> Hyderabad </span></h1>
        <h1 className='my-1 font-normal text-2xl'>Description: <span className='pl-4 font-normal text-gray-800'> Please submit your resume  </span></h1>
        <h1 className='my-1 font-normal text-2xl'>Experience: <span className='pl-4 font-normal text-gray-800'> 2 yrs </span></h1>
        <h1 className='my-1 font-normal text-2xl'>Salary: <span className='pl-4 font-normal text-gray-800'> 12LPA </span></h1>
        <h1 className='my-1 font-normal text-2xl'>Total Application: <span className='pl-4 font-normal text-gray-800'> 4 </span></h1>
        <h1 className='my-1 font-normal text-2xl'>Posted Date: <span className='pl-4 font-normal text-gray-800'> 19-05-2025 </span></h1>
      </div>
    </div>
  )
}

export default JobDescription